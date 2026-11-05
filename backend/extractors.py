import os
import json
from typing import List, Dict, Any

def extract_content_from_file(file_path: str, file_type: str) -> Dict[str, Any]:
    """
    Extracts structured content from PPTX, PPT, PDF, and DOCX files.
    Returns:
    {
        "slide_count": int,
        "summary": str,
        "items": [
            {
                "item_type": "slide" | "page" | "section",
                "item_index": int,
                "title": str,
                "content": str,
                "tables_json": str
            }
        ]
    }
    """
    file_type = file_type.lower().replace(".", "")
    
    if file_type == "pptx":
        return extract_pptx(file_path)
    elif file_type == "pdf":
        return extract_pdf(file_path)
    elif file_type == "docx":
        return extract_docx(file_path)
    elif file_type == "ppt":
        # Attempt fallback or extraction
        return extract_legacy_ppt(file_path)
    else:
        raise ValueError(f"Unsupported file format: .{file_type}. Supported: PPTX, PPT, PDF, DOCX")

def extract_pptx(file_path: str) -> Dict[str, Any]:
    from pptx import Presentation
    
    prs = Presentation(file_path)
    items = []
    
    for idx, slide in enumerate(prs.slides, start=1):
        slide_title = ""
        slide_texts = []
        tables_data = []
        
        # Check shapes
        for shape in slide.shapes:
            if shape.has_text_frame:
                text_frame = shape.text_frame
                text = text_frame.text.strip()
                if not text:
                    continue
                
                # Identify title
                if shape == slide.shapes.title:
                    slide_title = text
                else:
                    # Collect paragraphs with bullet levels
                    for paragraph in text_frame.paragraphs:
                        p_text = paragraph.text.strip()
                        if p_text:
                            indent = "  " * paragraph.level
                            bullet = "- " if paragraph.level > 0 else ""
                            slide_texts.append(f"{indent}{bullet}{p_text}")
            
            # Check for tables
            if shape.has_table:
                table = shape.table
                table_matrix = []
                for row in table.rows:
                    row_cells = [cell.text.strip().replace("\n", " ") for cell in row.cells]
                    table_matrix.append(row_cells)
                if table_matrix:
                    tables_data.append(table_matrix)
        
        # Fallback for title if not explicit title shape
        if not slide_title and slide_texts:
            first_line = slide_texts[0].lstrip("- ").strip()
            if len(first_line) < 100:
                slide_title = first_line
        
        if not slide_title:
            slide_title = f"Slide {idx}"

        # Speaker notes if present
        notes_text = ""
        try:
            if slide.has_notes_slide and slide.notes_slide.notes_text_frame:
                nt = slide.notes_slide.notes_text_frame.text.strip()
                if nt:
                    notes_text = f"\n[Speaker Notes: {nt}]"
        except Exception:
            pass

        content_body = "\n".join(slide_texts) + notes_text
        if tables_data:
            content_body += "\n[Tables included in slide]"

        items.append({
            "item_type": "slide",
            "item_index": idx,
            "title": slide_title,
            "content": content_body.strip(),
            "tables_json": json.dumps(tables_data) if tables_data else "[]"
        })
        
    summary = f"PowerPoint presentation with {len(items)} slides."
    return {
        "slide_count": len(items),
        "summary": summary,
        "items": items
    }

def extract_pdf(file_path: str) -> Dict[str, Any]:
    from pypdf import PdfReader
    
    reader = PdfReader(file_path)
    items = []
    
    for idx, page in enumerate(reader.pages, start=1):
        text = page.extract_text() or ""
        text = text.strip()
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        title = lines[0][:100] if lines else f"Page {idx}"
        
        items.append({
            "item_type": "page",
            "item_index": idx,
            "title": title,
            "content": text,
            "tables_json": "[]"
        })
        
    return {
        "slide_count": len(items),
        "summary": f"PDF document with {len(items)} pages.",
        "items": items
    }

def extract_docx(file_path: str) -> Dict[str, Any]:
    import docx
    
    doc = docx.Document(file_path)
    items = []
    current_section_title = "Document Overview"
    current_paragraphs = []
    tables_data = []
    section_index = 1
    
    for p in doc.paragraphs:
        t = p.text.strip()
        if not t:
            continue
        # If heading style
        if p.style.name.startswith("Heading"):
            if current_paragraphs:
                items.append({
                    "item_type": "section",
                    "item_index": section_index,
                    "title": current_section_title,
                    "content": "\n".join(current_paragraphs),
                    "tables_json": json.dumps(tables_data) if tables_data else "[]"
                })
                section_index += 1
                current_paragraphs = []
                tables_data = []
            current_section_title = t
        else:
            current_paragraphs.append(t)
            
    # Extract tables
    for tbl in doc.tables:
        t_matrix = []
        for row in tbl.rows:
            r_cells = [c.text.strip().replace("\n", " ") for c in row.cells]
            t_matrix.append(r_cells)
        if t_matrix:
            tables_data.append(t_matrix)
            
    if current_paragraphs or not items:
        items.append({
            "item_type": "section",
            "item_index": section_index,
            "title": current_section_title,
            "content": "\n".join(current_paragraphs) if current_paragraphs else "(No text content)",
            "tables_json": json.dumps(tables_data) if tables_data else "[]"
        })
        
    return {
        "slide_count": len(items),
        "summary": f"Word document with {len(items)} sections.",
        "items": items
    }

def extract_legacy_ppt(file_path: str) -> Dict[str, Any]:
    # Legacy PPT binary format. Check if we can extract basic ASCII/UTF-8 strings or advise user.
    # We will attempt string extraction or provide a friendly fallback.
    try:
        with open(file_path, "rb") as f:
            data = f.read()
        
        # Simple extraction of printable strings
        import re
        strings = re.findall(rb'[\x20-\x7E\s]{4,}', data)
        extracted = [s.decode('latin-1', errors='ignore').strip() for s in strings if len(s.strip()) > 5]
        # filter out system binary noise
        useful_text = [s for s in extracted if not s.startswith("Current User") and not s.startswith("PowerPoint Document") and len(s) > 10]
        
        if useful_text:
            content = "\n".join(useful_text[:200])
            return {
                "slide_count": 1,
                "summary": "Legacy PPT binary presentation. Extracted readable text content.",
                "items": [{
                    "item_type": "slide",
                    "item_index": 1,
                    "title": "Legacy PPT Extracted Content",
                    "content": content,
                    "tables_json": "[]"
                }]
            }
        else:
            raise Exception("No readable text found in binary PPT file. Please convert to .pptx format.")
    except Exception as e:
        raise ValueError(f"Failed to extract legacy PPT file: {str(e)}. Tip: Save as .pptx for full slide structure.")
