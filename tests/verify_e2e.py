import os
import sys
import json
import requests
import io
import time
from pptx import Presentation
from pptx.util import Inches, Pt

sys.stdout.reconfigure(line_buffering=True)
sys.stderr.reconfigure(line_buffering=True)

BASE_URL = "http://127.0.0.1:8000/api"

def create_sample_pptx_bytes():
    prs = Presentation()
    
    # Slide 1: Porter's Five Forces
    slide_layout = prs.slide_layouts[1] # title and content
    slide1 = prs.slides.add_slide(slide_layout)
    slide1.shapes.title.text = "Porter's Five Forces Framework"
    tf1 = slide1.placeholders[1].text_frame
    tf1.text = "Strategic tool to analyze industry competition and market attractiveness."
    p1 = tf1.add_paragraph()
    p1.text = "1. Threat of New Entrants: Barriers to entry, capital requirements"
    p2 = tf1.add_paragraph()
    p2.text = "2. Bargaining Power of Buyers: Customer price sensitivity, substitution options"
    p3 = tf1.add_paragraph()
    p3.text = "3. Bargaining Power of Suppliers: Supplier concentration, input uniqueness"
    p4 = tf1.add_paragraph()
    p4.text = "4. Threat of Substitute Products: Relative price-performance ratio"
    p5 = tf1.add_paragraph()
    p5.text = "5. Industry Rivalry: Competition intensity and exit barriers"
    
    # Slide 2: VRIO Framework Table
    slide2 = prs.slides.add_slide(prs.slide_layouts[5]) # Title only
    slide2.shapes.title.text = "VRIO Framework for Internal Resource Analysis"
    # Add table
    rows, cols = 4, 3
    left, top, width, height = Inches(1), Inches(2), Inches(8), Inches(3)
    table = slide2.shapes.add_table(rows, cols, left, top, width, height).table
    table.columns[0].width = Inches(2.5)
    table.columns[1].width = Inches(2.5)
    table.columns[2].width = Inches(3.0)
    
    table.cell(0, 0).text = "VRIO Dimension"
    table.cell(0, 1).text = "Strategic Question"
    table.cell(0, 2).text = "Competitive Outcome"
    
    table.cell(1, 0).text = "Valuable (V)"
    table.cell(1, 1).text = "Does resource exploit opportunities?"
    table.cell(1, 2).text = "Competitive Parity if Yes, Disadvantage if No"
    
    table.cell(2, 0).text = "Rare (R)"
    table.cell(2, 1).text = "Is it controlled by few competitors?"
    table.cell(2, 2).text = "Temporary Competitive Advantage"
    
    table.cell(3, 0).text = "Inimitable (I)"
    table.cell(3, 1).text = "Is it costly to imitate?"
    table.cell(3, 2).text = "Sustained Competitive Advantage"
    
    # Slide 3: Blue Ocean Strategy
    slide3 = prs.slides.add_slide(slide_layout)
    slide3.shapes.title.text = "Blue Ocean Strategy & Value Innovation"
    tf3 = slide3.placeholders[1].text_frame
    tf3.text = "Creating uncontested market space making the competition irrelevant."
    p31 = tf3.add_paragraph()
    p31.text = "Red Ocean: Compete in existing market space, beat competition, exploit demand"
    p32 = tf3.add_paragraph()
    p32.text = "Blue Ocean: Create uncontested market, make competition irrelevant, create demand"
    p33 = tf3.add_paragraph()
    p33.text = "Value Innovation: Pursue differentiation AND low cost simultaneously"

    buf = io.BytesIO()
    prs.save(buf)
    buf.seek(0)
    return buf.getvalue()

def run_tests():
    print("="*60)
    print("STARTING E2E VERIFICATION FOR PERSONAL AI LMS")
    print("="*60)

    # 1. Health check
    res = requests.get(f"{BASE_URL}/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    health = res.json()
    print(f"[OK] Health: {health}")
    assert health["gemini_configured"] is True, "Gemini API key should be configured"

    # 2. Settings check
    res = requests.get(f"{BASE_URL}/settings")
    assert res.status_code == 200
    settings = res.json()
    print(f"[OK] Settings loaded. Masked key: {settings.get('gemini_api_key_masked')}")
    assert "AQ." in settings.get("gemini_api_key_masked", ""), "Masked key should show partial prefix"

    # 3. Test Gemini API connection endpoint
    res = requests.post(f"{BASE_URL}/settings/test", json={})
    assert res.status_code == 200, f"Gemini connection test failed: {res.text}"
    print(f"[OK] Gemini Connection Test: {res.json()['message']}")

    # 4. Create Subject
    res = requests.post(f"{BASE_URL}/subjects", json={
        "name": "Strategic Management (MBA)",
        "description": "Core MBA Strategy curriculum covering Porter's Five Forces, VRIO, and Blue Ocean Strategy.",
        "color": "#E52521",
        "icon": "BookOpen"
    })
    assert res.status_code == 200, f"Subject create failed: {res.text}"
    sub_id = res.json()["id"]
    print(f"[OK] Created Subject: id={sub_id}")

    # Verify Subject Details
    res = requests.get(f"{BASE_URL}/subjects/{sub_id}")
    assert res.status_code == 200
    sub_details = res.json()
    print(f"[OK] Subject Details: {sub_details['name']}, Progress: {sub_details['progress']}%")

    # 5. Upload PPTX
    pptx_bytes = create_sample_pptx_bytes()
    files = [("files", ("MBA_Lecture_Strategy.pptx", pptx_bytes, "application/vnd.openxmlformats-officedocument.presentationml.presentation"))]
    res = requests.post(f"{BASE_URL}/subjects/{sub_id}/materials/upload", files=files)
    assert res.status_code == 200, f"Upload failed: {res.text}"
    print(f"[OK] Uploaded PPTX: {res.json()['message']}")

    # Wait 2 seconds for background extraction
    import time
    time.sleep(2)

    # Check Materials
    res = requests.get(f"{BASE_URL}/subjects/{sub_id}/materials")
    assert res.status_code == 200
    materials = res.json()
    assert len(materials) == 1, "Expected 1 uploaded material"
    mat = materials[0]
    print(f"[OK] Material record: {mat['filename']}, status={mat['processing_status']}, slide_count={mat['slide_count']}")
    assert mat["slide_count"] == 3, f"Expected 3 slides extracted, got {mat['slide_count']}"

    # Verify extracted slides content
    res = requests.get(f"{BASE_URL}/materials/{mat['id']}/content")
    assert res.status_code == 200
    slides = res.json()
    assert len(slides) == 3, f"Expected 3 extracted items, got {len(slides)}"
    print(f"[OK] Slide 1: {slides[0]['title']}")
    print(f"[OK] Slide 2: {slides[1]['title']}")
    print(f"[OK] Slide 3: {slides[2]['title']}")

    # 6. Organize Topics with Gemini
    print("Testing AI Topic Organization with Gemini...")
    res = requests.post(f"{BASE_URL}/subjects/{sub_id}/topics/organize")
    assert res.status_code == 200, f"Topic organization failed: {res.text}"
    topics_res = res.json()
    topics = topics_res.get("topics", [])
    print(f"[OK] AI organized {len(topics)} topics:")
    for t in topics:
        print(f"   - {t['sequence_order']}. {t['title']} ({len(t.get('subtopics', []))} subtopics)")
    assert len(topics) > 0, "Expected at least 1 organized topic"

    # Toggle completion of topic 1
    top_id = topics[0]["id"]
    res = requests.put(f"{BASE_URL}/topics/{top_id}", json={"is_completed": 1})
    assert res.status_code == 200
    print("[OK] Toggled topic 1 completion")

    # 7. Generate AI Notes with Gemini
    print("Testing AI Notes Generation with Gemini...")
    res = requests.post(f"{BASE_URL}/subjects/{sub_id}/notes/generate", json={
        "topic_id": top_id,
        "custom_title": "Competitive Strategy & Frameworks"
    })
    assert res.status_code == 200, f"Notes generation failed: {res.text}"
    note = res.json()
    print(f"[OK] Generated AI Note: '{note['title']}', length={len(note['content'])} chars")
    assert "Porter" in note["content"] or "Strategy" in note["content"] or "VRIO" in note["content"], "Notes should reflect slide content"

    # 8. Self Notes
    res = requests.post(f"{BASE_URL}/self-notes", json={
        "subject_id": sub_id,
        "title": "My Personal Exam Highlights",
        "content": "Remember: VRIO sustained advantage requires Inimitability. Porter 5 forces determines industry profitability."
    })
    assert res.status_code == 200
    self_note_id = res.json()["id"]
    print(f"[OK] Created Self Note: id={self_note_id}")

    # 9. AI Quiz Generation (Exactly 10 MCQs)
    print("Testing 10-MCQ Practice Quiz Generation with Gemini...")
    res = requests.post(f"{BASE_URL}/subjects/{sub_id}/quizzes/generate")
    assert res.status_code == 200, f"Quiz generation failed: {res.text}"
    quiz_info = res.json()
    quiz_id = quiz_info["quiz_id"]
    print(f"[OK] Generated Quiz: id={quiz_id}, questions={quiz_info['total_questions']}")
    assert quiz_info["total_questions"] == 10, f"Expected strictly 10 questions, got {quiz_info['total_questions']}"

    # Get quiz for attempt
    res = requests.get(f"{BASE_URL}/quizzes/{quiz_id}")
    assert res.status_code == 200
    quiz_detail = res.json()
    questions = quiz_detail["questions"]
    assert len(questions) == 10, f"Expected 10 questions in quiz detail, got {len(questions)}"
    for q in questions[:2]:
        print(f"   Q{q['question_index']}: {q['question_text'][:70]}... ({len(q['options'])} options)")

    # Submit Quiz Attempt
    answers = {q["id"]: 0 for q in questions} # Select option 0 for all
    res = requests.post(f"{BASE_URL}/quizzes/{quiz_id}/attempt", json={
        "answers": answers,
        "time_taken_seconds": 185
    })
    assert res.status_code == 200
    attempt_res = res.json()
    print(f"[OK] Quiz Attempt Result: Score={attempt_res['score']}/10 ({attempt_res['percentage']}%), Correct={attempt_res['correct_count']}, Incorrect={attempt_res['incorrect_count']}")

    # Verify Quiz History & Detailed Drill-Down Review
    res = requests.get(f"{BASE_URL}/quiz-history")
    assert res.status_code == 200
    history = res.json()
    assert len(history) >= 1
    print(f"[OK] Quiz History: {len(history)} attempts recorded")

    res = requests.get(f"{BASE_URL}/quiz-history/{attempt_res['attempt_id']}")
    assert res.status_code == 200
    drill_down = res.json()
    assert len(drill_down["questions"]) == 10
    print(f"[OK] Drill-down Review: verified 10 questions with explanations. Sample explanation: {drill_down['questions'][0]['explanation'][:80]}...")

    # 10. Study Timer
    res = requests.post(f"{BASE_URL}/timer/session", json={
        "subject_id": sub_id,
        "duration_seconds": 1500, # 25 mins
        "mode": "standard",
        "started_at": "2026-11-05T20:00:00",
        "completed_at": "2026-11-05T20:25:00",
        "status": "completed"
    })
    assert res.status_code == 200
    print("[OK] Logged 25-minute Study Session")

    # 11. Analytics
    res = requests.get(f"{BASE_URL}/analytics")
    assert res.status_code == 200
    analytics = res.json()
    print(f"[OK] Analytics: Total Study Hours={analytics['overview']['total_hours']}, Avg Quiz Score={analytics['overview']['avg_score']}%")

    # 12. Global Search
    res = requests.get(f"{BASE_URL}/search?q=Porter")
    assert res.status_code == 200
    search_res = res.json()
    print(f"[OK] Global Search for 'Porter': found {search_res['total_results']} matching items")
    assert search_res["total_results"] > 0, "Search should return matching items"

    print("="*60)
    print("ALL 12 MODULES VERIFIED END-TO-END WITH REAL GEMINI AI!")
    print("="*60)

    # Clean up test subject so user starts with a clean, empty workspace as requested:
    # "MOST IMPORTANT RULE: DO NOT ADD ANY FAKE OR DUMMY DATA... The application should initially show a clean, empty state with options to add subjects and upload study materials."
    print("Cleaning up test subject for a pristine initial empty state...")
    del_res = requests.delete(f"{BASE_URL}/subjects/{sub_id}")
    assert del_res.status_code == 200
    print("[OK] Test subject safely removed. Database is now in clean empty state.")

if __name__ == "__main__":
    run_tests()
