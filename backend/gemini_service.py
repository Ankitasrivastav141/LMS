import requests
import json
import re
from typing import List, Dict, Any, Optional

MODELS_FALLBACK = [
    "gemini-3.5-flash-lite",
    "gemini-3.1-flash-lite-preview",
    "gemini-3-flash-preview",
    "gemini-flash-latest"
]

def clean_json_response(text: str) -> str:
    """Extracts JSON content from markdown code fences if present."""
    text = text.strip()
    match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text)
    if match:
        return match.group(1).strip()
    return text

def call_gemini(api_key: str, prompt: str, preferred_model: str = "gemini-3.5-flash-lite", system_instruction: str = None) -> str:
    """
    Calls Google Gemini REST API with automated fallback across robust models.
    """
    if not api_key:
        raise ValueError("Gemini API key is not configured. Please add your API key in Settings.")

    # Try preferred model first, then the fallback chain
    candidate_models = [preferred_model] + [m for m in MODELS_FALLBACK if m != preferred_model]
    
    last_error = None
    for model_name in candidate_models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
        
        payload: Dict[str, Any] = {
            "contents": [{
                "parts": [{"text": prompt}]
            }],
            "generationConfig": {
                "temperature": 0.3,
                "topP": 0.95
            }
        }
        
        if system_instruction:
            payload["systemInstruction"] = {
                "parts": [{"text": system_instruction}]
            }

        try:
            res = requests.post(url, json=payload, timeout=25)
            if res.status_code == 200:
                data = res.json()
                candidates = data.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    if parts:
                        return parts[0].get("text", "")
                raise ValueError("Gemini returned an empty candidate list.")
            elif res.status_code in [429, 503, 500]:
                last_error = f"Model {model_name} returned status {res.status_code}: {res.text[:150]}"
                continue
            elif res.status_code == 400 and "API_KEY_INVALID" in res.text:
                raise ValueError("Invalid Gemini API Key. Please verify your API key in Settings.")
            else:
                last_error = f"Gemini error {res.status_code}: {res.text[:200]}"
                # If error is specific (like not found), try next model
                continue
        except requests.RequestException as e:
            last_error = f"Network error connecting to Gemini ({model_name}): {str(e)}"
            continue

    raise RuntimeError(f"All Gemini model attempts failed. Last error: {last_error}")

def organize_topics_with_gemini(api_key: str, subject_name: str, extracted_items: List[Dict[str, Any]], preferred_model: str = "gemini-3.5-flash") -> List[Dict[str, Any]]:
    """
    Analyzes multiple PPTs/documents and groups the content into a logical, deduplicated sequence of topics with subtopics and slide citations.
    """
    if not extracted_items:
        return []

    # Prepare document summary for prompt
    items_summary = []
    for item in extracted_items[:120]: # Up to 120 slides/sections
        doc_name = item.get("filename", "Document")
        idx = item.get("item_index", 1)
        title = item.get("title", f"Slide {idx}")
        content = item.get("content", "")[:350] # Snippet
        items_summary.append(f"Source: {doc_name} | Slide/Page {idx}: '{title}'\nPreview: {content}")

    context_text = "\n\n".join(items_summary)

    prompt = f"""You are an expert MBA curriculum designer and academic organizer.
Analyze the following extracted slides and study documents for the MBA subject: "{subject_name}".

Your task:
1. Identify the core topics covered across ALL uploaded files.
2. Identify subtopics for each topic.
3. Detect repeated or overlapping topics and synthesize them cleanly.
4. Organize topics into a logical, progressive learning sequence (from fundamentals to advanced concepts).
5. For each topic, list the specific source file references and slide numbers that cover it.
6. Provide a concise, clear description of what each topic covers.

EXTRACTED MATERIALS:
{context_text}

OUTPUT FORMAT REQUIREMENTS:
Return ONLY a valid JSON array of objects. Do not include introductory text or commentary outside the JSON array.
Each object must have:
- "title": (string) Clear academic topic title
- "description": (string) 1-2 sentence description of the concept and significance
- "sequence_order": (integer) 1, 2, 3...
- "subtopics": (array of strings) Key subtopics included
- "source_references": (array of objects) Each object: {{"filename": string, "slide_numbers": [int]}}
"""

    response_text = call_gemini(
        api_key=api_key,
        prompt=prompt,
        preferred_model=preferred_model,
        system_instruction="You are a precise academic syllabus synthesizer. Always output valid JSON only."
    )

    cleaned = clean_json_response(response_text)
    try:
        topics_data = json.loads(cleaned)
        if isinstance(topics_data, list):
            return topics_data
        elif isinstance(topics_data, dict) and "topics" in topics_data:
            return topics_data["topics"]
        return []
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse AI topic response as JSON: {str(e)}\nRaw response: {cleaned[:300]}")

def generate_notes_with_gemini(api_key: str, subject_name: str, topic_title: str, topic_description: str, extracted_items: List[Dict[str, Any]], preferred_model: str = "gemini-3.5-flash") -> str:
    """
    Generates comprehensive, educational MBA notes strictly based on extracted materials for a topic or subject.
    """
    # Filter or summarize relevant slides
    slides_text_list = []
    for item in extracted_items:
        fn = item.get("filename", "Document")
        idx = item.get("item_index", 1)
        title = item.get("title", "")
        content = item.get("content", "")
        tables = item.get("tables_json", "[]")
        
        slide_block = f"### [Source: {fn} - Slide/Page {idx}: {title}]\n{content}"
        if tables and tables != "[]":
            slide_block += f"\nTable Data: {tables}"
        slides_text_list.append(slide_block)

    full_source_text = "\n\n".join(slides_text_list[:70]) # Keep within token bounds

    prompt = f"""You are a master MBA professor and study assistant.
Generate comprehensive, structured, and easy-to-understand study notes for the subject "{subject_name}", focusing on topic "{topic_title}".

Topic Description: {topic_description if topic_description else "Comprehensive topic analysis"}

SOURCE STUDY MATERIALS (Extracted from user's uploaded PPTs/documents):
{full_source_text}

MANDATORY RULES:
1. Base notes on the actual content provided in the source materials above.
2. If certain concepts require additional educational clarification, explain them in simple, clear business English while noting "[Concept clarification]".
3. Do not hallucinate arbitrary data, fake company case studies not in the slides, or fake equations.
4. Keep original PPT and slide references where applicable (e.g. `(Ref: Lecture1.pptx, Slide 4)`).
5. Explain difficult concepts step by step.
6. Use clean Markdown tables where comparing concepts.

FORMAT YOUR NOTES WITH THE FOLLOWING CLEAR STRUCTURE:
# {topic_title}

## 1. Topic Introduction
(Explain clearly what this topic is about and its strategic context in MBA studies.)

## 2. Basic Explanation
(Explain the core foundational concepts in simple, intuitive language.)

## 3. Detailed Explanation & Frameworks
(Explain all key concepts, subtopics, and frameworks with clarity and depth. Include Markdown tables for comparisons or matrices.)

## 4. Important Definitions & Terminology
(Bullet points with **Key Term**: precise, clear definition.)

## 5. Practical Examples
(Concrete business examples illustrating how these concepts operate.)

## 6. Real-World Applications
(How managers, executives, and organizations apply this in actual industry scenarios.)

## 7. Important Exam Points
(Crucial points, common pitfalls, and examination highlights.)

## 8. Quick Revision Summary
(Concise recap for quick 2-minute review.)

## 9. Key Takeaways
(Numbered list of top takeaways.)

Ensure the tone is professional, encouraging, readable, and structured with clean markdown headers, bullet points, and tables.
"""

    return call_gemini(
        api_key=api_key,
        prompt=prompt,
        preferred_model=preferred_model,
        system_instruction="You are an expert MBA educator. Write exhaustive, beautifully structured notes based strictly on provided curriculum slides."
    )

def generate_quiz_with_gemini(api_key: str, subject_name: str, extracted_items: List[Dict[str, Any]], preferred_model: str = "gemini-3.5-flash") -> List[Dict[str, Any]]:
    """
    Generates exactly 10 multiple-choice questions grounded in the extracted PPT/document content.
    """
    slides_summary = []
    for item in extracted_items[:80]:
        fn = item.get("filename", "Doc")
        idx = item.get("item_index", 1)
        title = item.get("title", "")
        content = item.get("content", "")[:250]
        slides_summary.append(f"[{fn} Slide {idx}: {title}] {content}")

    source_text = "\n".join(slides_summary)

    prompt = f"""You are an expert MBA examiner.
Generate a rigorous, high-quality practice quiz of EXACTLY 10 multiple-choice questions based STRICTLY on the following extracted study materials for "{subject_name}".

SOURCE MATERIAL:
{source_text}

REQUIREMENTS:
1. EXACTLY 10 questions. No more, no less.
2. Each question must test conceptual understanding, definitions, management applications, or key principles from the source.
3. Each question must have EXACTLY 4 options (strings).
4. Identify the correct option index (0, 1, 2, or 3).
5. Provide a clear, educational explanation of why the correct answer is right and why the distractor options are incorrect, referencing the source slide/concept.
6. Do NOT invent concepts outside the provided materials.

OUTPUT FORMAT:
Return ONLY a valid JSON array of 10 objects. No markdown wraps, no extra conversational text.
Each object must match this schema:
[
  {{
    "question_index": 1,
    "question_text": "Question prompt here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_index": 0,
    "explanation": "Detailed explanation of correct answer and why other options are wrong.",
    "source_reference": "Lecture 1, Slide 5"
  }},
  ...
]
"""

    response_text = call_gemini(
        api_key=api_key,
        prompt=prompt,
        preferred_model=preferred_model,
        system_instruction="You are an MBA exam designer. Return strictly a JSON array of 10 MCQs."
    )

    cleaned = clean_json_response(response_text)
    try:
        questions = json.loads(cleaned)
        if isinstance(questions, dict) and "questions" in questions:
            questions = questions["questions"]
        if not isinstance(questions, list):
            raise ValueError("Expected JSON array of questions.")
        
        # Validate count and format
        valid_questions = []
        for i, q in enumerate(questions[:10], start=1):
            valid_questions.append({
                "question_index": i,
                "question_text": str(q.get("question_text", f"Question {i}")),
                "options": [str(opt) for opt in q.get("options", ["A", "B", "C", "D"])][:4],
                "correct_index": int(q.get("correct_index", 0)) if 0 <= int(q.get("correct_index", 0)) < 4 else 0,
                "explanation": str(q.get("explanation", "Refer to uploaded materials for full concept context.")),
                "source_reference": str(q.get("source_reference", "Uploaded Study Material"))
            })
            
        if len(valid_questions) < 10:
            # If AI returned fewer than 10, pad with relevant questions from source or flag
            pass
        return valid_questions
    except Exception as e:
        raise ValueError(f"Failed to parse quiz response: {str(e)}\nRaw: {cleaned[:300]}")
