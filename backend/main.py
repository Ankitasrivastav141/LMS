import os
import uuid
import json
import shutil
from datetime import datetime
from typing import List, Optional, Dict, Any

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Query, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel

from database import init_db, get_db, log_activity, UPLOAD_DIR
from extractors import extract_content_from_file
from gemini_service import organize_topics_with_gemini, generate_notes_with_gemini, generate_quiz_with_gemini, call_gemini

# Load environment variables securely from .env if present
env_path = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(env_path):
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            if "=" in line and not line.strip().startswith("#"):
                k, v = line.strip().split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

USER_GEMINI_KEY = os.environ.get("GEMINI_API_KEY", "")

# Initialize SQLite database with user settings
init_db(default_gemini_key=USER_GEMINI_KEY)

app = FastAPI(title="My Learning Space - Personal AI-Powered LMS", version="1.0.0")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_current_gemini_key():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT gemini_api_key, preferred_model FROM user_settings WHERE id = 'default'")
    row = cursor.fetchone()
    conn.close()
    if row and row["gemini_api_key"]:
        return row["gemini_api_key"], row["preferred_model"]
    return USER_GEMINI_KEY, "gemini-3.5-flash"

# ----------------- SETTINGS & HEALTH -----------------

@app.get("/api/health")
def health_check():
    key, model = get_current_gemini_key()
    return {
        "status": "healthy",
        "app_name": "My Learning Space",
        "gemini_configured": bool(key),
        "model": model
    }

@app.get("/api/settings")
def get_settings():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user_settings WHERE id = 'default'")
    row = cursor.fetchone()
    conn.close()
    if not row:
        return {}
    d = dict(row)
    # Never expose any characters of the API key
    key = d.get("gemini_api_key") or ""
    d["gemini_api_key_configured"] = bool(key)
    d.pop("gemini_api_key", None)
    return d

class SettingsUpdate(BaseModel):
    gemini_api_key: Optional[str] = None
    preferred_model: Optional[str] = None
    theme: Optional[str] = None
    default_timer_minutes: Optional[int] = None
    pomodoro_study_minutes: Optional[int] = None
    pomodoro_short_break: Optional[int] = None
    pomodoro_long_break: Optional[int] = None

@app.post("/api/settings")
def update_settings(payload: SettingsUpdate):
    conn = get_db()
    cursor = conn.cursor()
    updates = []
    params = []
    if payload.gemini_api_key is not None and payload.gemini_api_key.strip():
        updates.append("gemini_api_key = ?")
        params.append(payload.gemini_api_key.strip())
    if payload.preferred_model is not None:
        updates.append("preferred_model = ?")
        params.append(payload.preferred_model)
    if payload.theme is not None:
        updates.append("theme = ?")
        params.append(payload.theme)
    if payload.default_timer_minutes is not None:
        updates.append("default_timer_minutes = ?")
        params.append(payload.default_timer_minutes)
    if payload.pomodoro_study_minutes is not None:
        updates.append("pomodoro_study_minutes = ?")
        params.append(payload.pomodoro_study_minutes)
    if payload.pomodoro_short_break is not None:
        updates.append("pomodoro_short_break = ?")
        params.append(payload.pomodoro_short_break)
    if payload.pomodoro_long_break is not None:
        updates.append("pomodoro_long_break = ?")
        params.append(payload.pomodoro_long_break)

    if updates:
        updates.append("updated_at = ?")
        params.append(datetime.now().isoformat())
        params.append("default")
        cursor.execute(f"UPDATE user_settings SET {', '.join(updates)} WHERE id = ?", params)
        conn.commit()
    conn.close()
    return {"message": "Settings updated successfully"}

@app.post("/api/settings/test")
def test_gemini_connection(payload: dict):
    test_key = payload.get("gemini_api_key")
    if not test_key:
        test_key, _ = get_current_gemini_key()
    if not test_key:
        raise HTTPException(status_code=400, detail="No Gemini API Key provided to test.")
    
    try:
        reply = call_gemini(api_key=test_key, prompt="Respond with 'Connected' if you receive this.", preferred_model="gemini-3.5-flash")
        return {"success": True, "message": "Successfully connected to Gemini API!", "response": reply.strip()}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Gemini test failed: {str(e)}")

# ----------------- DASHBOARD -----------------

@app.get("/api/dashboard")
def get_dashboard():
    conn = get_db()
    cursor = conn.cursor()

    # 1. Total Subjects
    cursor.execute("SELECT COUNT(*) as count FROM subjects")
    total_subjects = cursor.fetchone()["count"]

    # 2. Total Study Materials
    cursor.execute("SELECT COUNT(*) as count FROM study_materials")
    total_materials = cursor.fetchone()["count"]

    # 3. Total AI Notes
    cursor.execute("SELECT COUNT(*) as count FROM ai_notes")
    total_ai_notes = cursor.fetchone()["count"]

    # 4. Total Quizzes Attempted
    cursor.execute("SELECT COUNT(*) as count FROM quiz_attempts")
    total_quizzes_attempted = cursor.fetchone()["count"]

    # 5. Average Quiz Score
    cursor.execute("SELECT AVG(percentage) as avg_score FROM quiz_attempts")
    avg_score_row = cursor.fetchone()
    avg_quiz_score = round(avg_score_row["avg_score"], 1) if avg_score_row["avg_score"] is not None else 0

    # 6. Total Study Time (seconds)
    cursor.execute("SELECT SUM(duration_seconds) as total_seconds FROM study_sessions WHERE status = 'completed'")
    total_sec_row = cursor.fetchone()
    total_study_seconds = total_sec_row["total_seconds"] or 0

    # Recent Subjects with their actual counters
    cursor.execute("""
    SELECT s.*,
           (SELECT COUNT(*) FROM study_materials WHERE subject_id = s.id) as materials_count,
           (SELECT COUNT(*) FROM ai_notes WHERE subject_id = s.id) as notes_count,
           (SELECT COUNT(*) FROM quiz_attempts WHERE subject_id = s.id) as quiz_count,
           (SELECT COUNT(*) FROM topics WHERE subject_id = s.id) as total_topics,
           (SELECT COUNT(*) FROM topics WHERE subject_id = s.id AND is_completed = 1) as completed_topics
    FROM subjects s
    ORDER BY s.updated_at DESC
    LIMIT 6
    """)
    recent_subjects = [dict(row) for row in cursor.fetchall()]

    # Calculate actual progress for each subject
    for s in recent_subjects:
        tot_top = s.get("total_topics", 0)
        comp_top = s.get("completed_topics", 0)
        if tot_top > 0:
            s["progress"] = round((comp_top / tot_top) * 100)
        elif s.get("materials_count", 0) > 0 and s.get("notes_count", 0) > 0:
            s["progress"] = 25
        elif s.get("materials_count", 0) > 0:
            s["progress"] = 10
        else:
            s["progress"] = 0

    # Recent Activities (Actual)
    cursor.execute("SELECT * FROM activity_logs ORDER BY timestamp DESC LIMIT 8")
    recent_activities = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return {
        "overview": {
            "total_subjects": total_subjects,
            "total_materials": total_materials,
            "total_ai_notes": total_ai_notes,
            "total_quizzes_attempted": total_quizzes_attempted,
            "average_quiz_score": avg_quiz_score,
            "total_study_seconds": total_study_seconds,
            "total_study_hours": round(total_study_seconds / 3600, 1)
        },
        "recent_subjects": recent_subjects,
        "recent_activities": recent_activities
    }

# ----------------- SUBJECTS -----------------

class SubjectCreate(BaseModel):
    name: str
    description: Optional[str] = ""
    color: Optional[str] = "#E52521"
    icon: Optional[str] = "BookOpen"

@app.get("/api/subjects")
def list_subjects(search: Optional[str] = None, sort: Optional[str] = "recent"):
    conn = get_db()
    cursor = conn.cursor()
    query = """
    SELECT s.*,
           (SELECT COUNT(*) FROM study_materials WHERE subject_id = s.id) as materials_count,
           (SELECT COUNT(*) FROM ai_notes WHERE subject_id = s.id) as notes_count,
           (SELECT COUNT(*) FROM quiz_attempts WHERE subject_id = s.id) as quiz_count,
           (SELECT COUNT(*) FROM topics WHERE subject_id = s.id) as total_topics,
           (SELECT COUNT(*) FROM topics WHERE subject_id = s.id AND is_completed = 1) as completed_topics,
           (SELECT MAX(completed_at) FROM study_sessions WHERE subject_id = s.id) as last_studied
    FROM subjects s
    """
    params = []
    if search:
        query += " WHERE s.name LIKE ? OR s.description LIKE ?"
        params.extend([f"%{search}%", f"%{search}%"])

    if sort == "name":
        query += " ORDER BY s.name ASC"
    elif sort == "oldest":
        query += " ORDER BY s.created_at ASC"
    else:
        query += " ORDER BY s.updated_at DESC"

    cursor.execute(query, params)
    subjects = [dict(row) for row in cursor.fetchall()]

    for s in subjects:
        tot = s.get("total_topics", 0)
        comp = s.get("completed_topics", 0)
        if tot > 0:
            s["progress"] = round((comp / tot) * 100)
        elif s.get("materials_count", 0) > 0 and s.get("notes_count", 0) > 0:
            s["progress"] = 25
        elif s.get("materials_count", 0) > 0:
            s["progress"] = 10
        else:
            s["progress"] = 0

    conn.close()
    return subjects

@app.post("/api/subjects")
def create_subject(payload: SubjectCreate):
    if not payload.name.strip():
        raise HTTPException(status_code=400, detail="Subject name is required.")
    
    subject_id = str(uuid.uuid4())
    now = datetime.now().isoformat()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO subjects (id, name, description, color, icon, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (subject_id, payload.name.strip(), payload.description.strip() if payload.description else "", payload.color, payload.icon, now, now))
    conn.commit()
    conn.close()

    log_activity("subject_created", f"Created subject: {payload.name.strip()}", subject_id=subject_id)
    return {"id": subject_id, "name": payload.name, "message": "Subject created successfully"}

@app.get("/api/subjects/{subject_id}")
def get_subject_details(subject_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT s.*,
           (SELECT COUNT(*) FROM study_materials WHERE subject_id = s.id) as materials_count,
           (SELECT COUNT(*) FROM ai_notes WHERE subject_id = s.id) as notes_count,
           (SELECT COUNT(*) FROM self_notes WHERE subject_id = s.id) as self_notes_count,
           (SELECT COUNT(*) FROM quiz_attempts WHERE subject_id = s.id) as quiz_count,
           (SELECT COUNT(*) FROM topics WHERE subject_id = s.id) as total_topics,
           (SELECT COUNT(*) FROM topics WHERE subject_id = s.id AND is_completed = 1) as completed_topics,
           (SELECT SUM(duration_seconds) FROM study_sessions WHERE subject_id = s.id AND status = 'completed') as study_seconds
    FROM subjects s
    WHERE s.id = ?
    """, (subject_id,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    data = dict(row)
    tot = data.get("total_topics", 0)
    comp = data.get("completed_topics", 0)
    if tot > 0:
        data["progress"] = round((comp / tot) * 100)
    elif data.get("materials_count", 0) > 0 and data.get("notes_count", 0) > 0:
        data["progress"] = 25
    elif data.get("materials_count", 0) > 0:
        data["progress"] = 10
    else:
        data["progress"] = 0

    return data

@app.put("/api/subjects/{subject_id}")
def update_subject(subject_id: str, payload: SubjectCreate):
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().isoformat()
    cursor.execute("""
    UPDATE subjects
    SET name = ?, description = ?, color = ?, icon = ?, updated_at = ?
    WHERE id = ?
    """, (payload.name.strip(), payload.description.strip(), payload.color, payload.icon, now, subject_id))
    conn.commit()
    conn.close()
    return {"message": "Subject updated successfully"}

@app.delete("/api/subjects/{subject_id}")
def delete_subject(subject_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM subjects WHERE id = ?", (subject_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Subject not found")
    name = row["name"]

    # Delete subject folder on disk if exists
    subject_upload_dir = os.path.join(UPLOAD_DIR, subject_id)
    if os.path.exists(subject_upload_dir):
        shutil.rmtree(subject_upload_dir, ignore_errors=True)

    cursor.execute("DELETE FROM subjects WHERE id = ?", (subject_id,))
    conn.commit()
    conn.close()

    log_activity("subject_deleted", f"Deleted subject: {name}")
    return {"message": f"Subject '{name}' deleted successfully"}

# ----------------- STUDY MATERIALS & EXTRACTION -----------------

def process_file_extraction(material_id: str, file_path: str, file_type: str, subject_id: str):
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute("UPDATE study_materials SET processing_status = 'processing' WHERE id = ?", (material_id,))
        conn.commit()

        # Run extraction
        extracted = extract_content_from_file(file_path, file_type)
        slide_count = extracted.get("slide_count", 0)
        summary = extracted.get("summary", "")

        # Save items into extracted_content
        now = datetime.now().isoformat()
        for item in extracted.get("items", []):
            item_id = str(uuid.uuid4())
            cursor.execute("""
            INSERT INTO extracted_content (id, material_id, subject_id, item_type, item_index, title, content, tables_json, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (item_id, material_id, subject_id, item["item_type"], item["item_index"], item["title"], item["content"], item.get("tables_json", "[]"), now))

        cursor.execute("""
        UPDATE study_materials
        SET processing_status = 'processed', slide_count = ?, summary = ?, error_message = NULL
        WHERE id = ?
        """, (slide_count, summary, material_id))
        conn.commit()
        
    except Exception as e:
        cursor.execute("""
        UPDATE study_materials
        SET processing_status = 'failed', error_message = ?
        WHERE id = ?
        """, (str(e), material_id))
        conn.commit()
    finally:
        conn.close()

@app.get("/api/subjects/{subject_id}/materials")
def list_subject_materials(subject_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM study_materials
    WHERE subject_id = ?
    ORDER BY upload_date DESC
    """, (subject_id,))
    items = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return items

@app.post("/api/subjects/{subject_id}/materials/upload")
async def upload_materials(subject_id: str, background_tasks: BackgroundTasks, files: List[UploadFile] = File(...)):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM subjects WHERE id = ?", (subject_id,))
    subject_row = cursor.fetchone()
    if not subject_row:
        conn.close()
        raise HTTPException(status_code=404, detail="Subject not found")

    subject_upload_dir = os.path.join(UPLOAD_DIR, subject_id)
    os.makedirs(subject_upload_dir, exist_ok=True)

    uploaded_records = []
    allowed_exts = {"pptx", "ppt", "pdf", "docx"}

    for file in files:
        original_name = file.filename
        ext = original_name.split(".")[-1].lower() if "." in original_name else ""
        if ext not in allowed_exts:
            continue

        file_id = str(uuid.uuid4())
        safe_name = f"{file_id}_{original_name}"
        saved_path = os.path.join(subject_upload_dir, safe_name)

        # Write to disk
        with open(saved_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        file_size = os.path.getsize(saved_path)
        now = datetime.now().isoformat()

        cursor.execute("""
        INSERT INTO study_materials (id, subject_id, filename, file_path, file_size, file_type, upload_date, processing_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'uploaded')
        """, (file_id, subject_id, original_name, saved_path, file_size, ext, now))
        conn.commit()

        # Enqueue extraction in background
        background_tasks.add_task(process_file_extraction, file_id, saved_path, ext, subject_id)

        uploaded_records.append({
            "id": file_id,
            "filename": original_name,
            "file_size": file_size,
            "file_type": ext,
            "upload_date": now,
            "processing_status": "processing"
        })

    conn.close()

    if uploaded_records:
        log_activity("file_uploaded", f"Uploaded {len(uploaded_records)} study documents to {subject_row['name']}", subject_id=subject_id)

    return {"uploaded": uploaded_records, "message": f"Uploaded {len(uploaded_records)} files. Content extraction in progress."}

@app.get("/api/materials/{material_id}/download")
def download_material(material_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM study_materials WHERE id = ?", (material_id,))
    row = cursor.fetchone()
    conn.close()
    if not row or not os.path.exists(row["file_path"]):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(path=row["file_path"], filename=row["filename"], media_type="application/octet-stream")

@app.get("/api/materials/{material_id}/content")
def get_extracted_content(material_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM extracted_content
    WHERE material_id = ?
    ORDER BY item_index ASC
    """, (material_id,))
    items = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return items

@app.post("/api/materials/{material_id}/retry")
def retry_material_extraction(material_id: str, background_tasks: BackgroundTasks):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM study_materials WHERE id = ?", (material_id,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Material not found")
    if not os.path.exists(row["file_path"]):
        raise HTTPException(status_code=400, detail="Underlying file missing on disk.")

    background_tasks.add_task(process_file_extraction, row["id"], row["file_path"], row["file_type"], row["subject_id"])
    return {"message": "Retry queued for content extraction."}

@app.delete("/api/materials/{material_id}")
def delete_material(material_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM study_materials WHERE id = ?", (material_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Material not found")

    file_path = row["file_path"]
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
        except Exception:
            pass

    cursor.execute("DELETE FROM study_materials WHERE id = ?", (material_id,))
    conn.commit()
    conn.close()
    return {"message": "Material deleted successfully"}

# ----------------- TOPIC ORGANIZATION -----------------

@app.get("/api/subjects/{subject_id}/topics")
def list_topics(subject_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM topics
    WHERE subject_id = ?
    ORDER BY sequence_order ASC
    """, (subject_id,))
    topics = [dict(row) for row in cursor.fetchall()]
    for t in topics:
        try:
            t["subtopics"] = json.loads(t["subtopics_json"]) if t["subtopics_json"] else []
        except Exception:
            t["subtopics"] = []
        try:
            t["source_references"] = json.loads(t["source_references_json"]) if t["source_references_json"] else []
        except Exception:
            t["source_references"] = []
    conn.close()
    return topics

@app.post("/api/subjects/{subject_id}/topics/organize")
def auto_organize_topics(subject_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM subjects WHERE id = ?", (subject_id,))
    sub_row = cursor.fetchone()
    if not sub_row:
        conn.close()
        raise HTTPException(status_code=404, detail="Subject not found")

    # Fetch all successfully extracted items with their file names
    cursor.execute("""
    SELECT ec.*, sm.filename
    FROM extracted_content ec
    JOIN study_materials sm ON ec.material_id = sm.id
    WHERE ec.subject_id = ?
    ORDER BY sm.filename, ec.item_index
    """, (subject_id,))
    extracted_items = [dict(row) for row in cursor.fetchall()]

    if not extracted_items:
        conn.close()
        raise HTTPException(status_code=400, detail="No processed study materials available. Please upload PPTs or study documents first.")

    api_key, model = get_current_gemini_key()
    try:
        organized = organize_topics_with_gemini(api_key, sub_row["name"], extracted_items, preferred_model=model)
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Topic Organization failed: {str(e)}")

    # Clear old auto-topics and replace with organized sequence
    cursor.execute("DELETE FROM topics WHERE subject_id = ?", (subject_id,))
    now = datetime.now().isoformat()

    saved_topics = []
    for idx, top in enumerate(organized, start=1):
        top_id = str(uuid.uuid4())
        title = top.get("title", f"Topic {idx}")
        desc = top.get("description", "")
        seq = top.get("sequence_order", idx)
        sub_json = json.dumps(top.get("subtopics", []))
        ref_json = json.dumps(top.get("source_references", []))

        cursor.execute("""
        INSERT INTO topics (id, subject_id, title, description, sequence_order, subtopics_json, source_references_json, is_completed, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?)
        """, (top_id, subject_id, title, desc, seq, sub_json, ref_json, now, now))
        saved_topics.append({
            "id": top_id,
            "title": title,
            "description": desc,
            "sequence_order": seq,
            "subtopics": top.get("subtopics", []),
            "source_references": top.get("source_references", []),
            "is_completed": 0
        })

    conn.commit()
    conn.close()

    log_activity("topics_organized", f"AI organized {len(saved_topics)} topics for {sub_row['name']}", subject_id=subject_id)
    return {"topics": saved_topics, "message": f"Successfully organized {len(saved_topics)} topics using Gemini AI."}

class TopicUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    sequence_order: Optional[int] = None
    is_completed: Optional[int] = None

@app.put("/api/topics/{topic_id}")
def update_topic(topic_id: str, payload: TopicUpdate):
    conn = get_db()
    cursor = conn.cursor()
    updates = []
    params = []
    if payload.title is not None:
        updates.append("title = ?")
        params.append(payload.title)
    if payload.description is not None:
        updates.append("description = ?")
        params.append(payload.description)
    if payload.sequence_order is not None:
        updates.append("sequence_order = ?")
        params.append(payload.sequence_order)
    if payload.is_completed is not None:
        updates.append("is_completed = ?")
        params.append(payload.is_completed)

    if updates:
        updates.append("updated_at = ?")
        params.append(datetime.now().isoformat())
        params.append(topic_id)
        cursor.execute(f"UPDATE topics SET {', '.join(updates)} WHERE id = ?", params)
        conn.commit()

    conn.close()
    return {"message": "Topic updated"}

@app.delete("/api/topics/{topic_id}")
def delete_topic(topic_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM topics WHERE id = ?", (topic_id,))
    conn.commit()
    conn.close()
    return {"message": "Topic deleted"}

# ----------------- AI NOTES GENERATION -----------------

@app.get("/api/subjects/{subject_id}/notes")
def list_ai_notes(subject_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT an.*, t.title as topic_title
    FROM ai_notes an
    LEFT JOIN topics t ON an.topic_id = t.id
    WHERE an.subject_id = ?
    ORDER BY an.updated_at DESC
    """, (subject_id,))
    notes = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return notes

class GenerateNotesRequest(BaseModel):
    topic_id: Optional[str] = None
    custom_title: Optional[str] = None

@app.post("/api/subjects/{subject_id}/notes/generate")
def generate_ai_notes(subject_id: str, payload: GenerateNotesRequest):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM subjects WHERE id = ?", (subject_id,))
    sub_row = cursor.fetchone()
    if not sub_row:
        conn.close()
        raise HTTPException(status_code=404, detail="Subject not found")

    subject_name = sub_row["name"]
    topic_title = payload.custom_title or "Comprehensive Learning Notes"
    topic_desc = ""

    if payload.topic_id:
        cursor.execute("SELECT title, description FROM topics WHERE id = ?", (payload.topic_id,))
        top_row = cursor.fetchone()
        if top_row:
            topic_title = top_row["title"]
            topic_desc = top_row["description"] or ""

    # Fetch extracted items
    cursor.execute("""
    SELECT ec.*, sm.filename
    FROM extracted_content ec
    JOIN study_materials sm ON ec.material_id = sm.id
    WHERE ec.subject_id = ?
    ORDER BY sm.filename, ec.item_index
    """, (subject_id,))
    extracted_items = [dict(row) for row in cursor.fetchall()]

    if not extracted_items:
        conn.close()
        raise HTTPException(status_code=400, detail="No extracted study material available for this subject. Please upload PPTs first.")

    api_key, model = get_current_gemini_key()
    try:
        notes_content = generate_notes_with_gemini(
            api_key=api_key,
            subject_name=subject_name,
            topic_title=topic_title,
            topic_description=topic_desc,
            extracted_items=extracted_items,
            preferred_model=model
        )
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Notes generation failed: {str(e)}")

    # Distinct source file names
    source_files = list(set([item["filename"] for item in extracted_items]))
    now = datetime.now().isoformat()
    note_id = str(uuid.uuid4())

    cursor.execute("""
    INSERT INTO ai_notes (id, subject_id, topic_id, title, content, source_files_json, version, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
    """, (note_id, subject_id, payload.topic_id, topic_title, notes_content, json.dumps(source_files), now, now))
    conn.commit()
    conn.close()

    log_activity("notes_generated", f"Generated AI notes for '{topic_title}' in {subject_name}", subject_id=subject_id)
    return {
        "id": note_id,
        "title": topic_title,
        "content": notes_content,
        "source_files": source_files,
        "created_at": now
    }

class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None

@app.put("/api/notes/{note_id}")
def update_ai_note(note_id: str, payload: NoteUpdate):
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().isoformat()
    updates = []
    params = []
    if payload.title is not None:
        updates.append("title = ?")
        params.append(payload.title)
    if payload.content is not None:
        updates.append("content = ?")
        params.append(payload.content)
    if updates:
        updates.append("updated_at = ?")
        params.append(now)
        updates.append("version = version + 1")
        params.append(note_id)
        cursor.execute(f"UPDATE ai_notes SET {', '.join(updates)} WHERE id = ?", params)
        conn.commit()
    conn.close()
    return {"message": "Note updated"}

@app.delete("/api/notes/{note_id}")
def delete_ai_note(note_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM ai_notes WHERE id = ?", (note_id,))
    conn.commit()
    conn.close()
    return {"message": "Note deleted"}

# ----------------- SELF NOTES -----------------

class SelfNoteCreate(BaseModel):
    subject_id: str
    title: str
    content: str
    is_favorite: Optional[int] = 0

@app.get("/api/self-notes")
def list_self_notes(subject_id: Optional[str] = None, search: Optional[str] = None, favorites_only: Optional[bool] = False):
    conn = get_db()
    cursor = conn.cursor()
    query = """
    SELECT sn.*, s.name as subject_name, s.color as subject_color
    FROM self_notes sn
    JOIN subjects s ON sn.subject_id = s.id
    WHERE 1=1
    """
    params = []
    if subject_id:
        query += " AND sn.subject_id = ?"
        params.append(subject_id)
    if favorites_only:
        query += " AND sn.is_favorite = 1"
    if search:
        query += " AND (sn.title LIKE ? OR sn.content LIKE ?)"
        params.extend([f"%{search}%", f"%{search}%"])

    query += " ORDER BY sn.updated_at DESC"
    cursor.execute(query, params)
    notes = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return notes

@app.post("/api/self-notes")
def create_self_note(payload: SelfNoteCreate):
    if not payload.title.strip():
        raise HTTPException(status_code=400, detail="Note title is required.")
    note_id = str(uuid.uuid4())
    now = datetime.now().isoformat()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO self_notes (id, subject_id, title, content, is_favorite, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (note_id, payload.subject_id, payload.title.strip(), payload.content, payload.is_favorite or 0, now, now))
    conn.commit()
    conn.close()

    log_activity("self_note_created", f"Created personal note: '{payload.title.strip()}'", subject_id=payload.subject_id)
    return {"id": note_id, "title": payload.title, "message": "Self note created"}

class SelfNoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    is_favorite: Optional[int] = None

@app.put("/api/self-notes/{note_id}")
def update_self_note(note_id: str, payload: SelfNoteUpdate):
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().isoformat()
    updates = []
    params = []
    if payload.title is not None:
        updates.append("title = ?")
        params.append(payload.title.strip())
    if payload.content is not None:
        updates.append("content = ?")
        params.append(payload.content)
    if payload.is_favorite is not None:
        updates.append("is_favorite = ?")
        params.append(payload.is_favorite)

    if updates:
        updates.append("updated_at = ?")
        params.append(now)
        params.append(note_id)
        cursor.execute(f"UPDATE self_notes SET {', '.join(updates)} WHERE id = ?", params)
        conn.commit()
    conn.close()
    return {"message": "Self note autosaved successfully", "updated_at": now}

@app.delete("/api/self-notes/{note_id}")
def delete_self_note(note_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM self_notes WHERE id = ?", (note_id,))
    conn.commit()
    conn.close()
    return {"message": "Self note deleted"}

# ----------------- AI QUIZ CENTER -----------------

@app.get("/api/subjects/{subject_id}/quizzes")
def list_subject_quizzes(subject_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT q.*,
           (SELECT COUNT(*) FROM quiz_attempts WHERE quiz_id = q.id) as attempts_count,
           (SELECT MAX(score) FROM quiz_attempts WHERE quiz_id = q.id) as best_score
    FROM quizzes q
    WHERE q.subject_id = ?
    ORDER BY q.created_at DESC
    """, (subject_id,))
    quizzes = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return quizzes

@app.post("/api/subjects/{subject_id}/quizzes/generate")
def generate_quiz(subject_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM subjects WHERE id = ?", (subject_id,))
    sub_row = cursor.fetchone()
    if not sub_row:
        conn.close()
        raise HTTPException(status_code=404, detail="Subject not found")

    cursor.execute("""
    SELECT ec.*, sm.filename
    FROM extracted_content ec
    JOIN study_materials sm ON ec.material_id = sm.id
    WHERE ec.subject_id = ?
    ORDER BY sm.filename, ec.item_index
    """, (subject_id,))
    extracted_items = [dict(row) for row in cursor.fetchall()]

    if not extracted_items:
        conn.close()
        raise HTTPException(status_code=400, detail="No extracted study material available. Please upload PPTs or study documents first.")

    api_key, model = get_current_gemini_key()
    try:
        questions = generate_quiz_with_gemini(api_key, sub_row["name"], extracted_items, preferred_model=model)
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Quiz generation failed: {str(e)}")

    quiz_id = str(uuid.uuid4())
    now = datetime.now().isoformat()
    title = f"{sub_row['name']} - 10 MCQ Practice Quiz"

    cursor.execute("""
    INSERT INTO quizzes (id, subject_id, title, description, total_questions, created_at)
    VALUES (?, ?, ?, 'Curated 10 Multiple-Choice Questions from uploaded PPTs', 10, ?)
    """, (quiz_id, subject_id, title, now))

    for q in questions:
        q_id = str(uuid.uuid4())
        cursor.execute("""
        INSERT INTO quiz_questions (id, quiz_id, question_index, question_text, options_json, correct_index, explanation, source_reference)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (q_id, quiz_id, q["question_index"], q["question_text"], json.dumps(q["options"]), q["correct_index"], q["explanation"], q["source_reference"]))

    conn.commit()
    conn.close()

    log_activity("quiz_generated", f"Generated 10-MCQ Quiz for {sub_row['name']}", subject_id=subject_id)
    return {"quiz_id": quiz_id, "title": title, "total_questions": len(questions)}

@app.get("/api/quizzes/{quiz_id}")
def get_quiz_for_attempt(quiz_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT q.*, s.name as subject_name FROM quizzes q JOIN subjects s ON q.subject_id = s.id WHERE q.id = ?", (quiz_id,))
    quiz = cursor.fetchone()
    if not quiz:
        conn.close()
        raise HTTPException(status_code=404, detail="Quiz not found")

    cursor.execute("SELECT id, question_index, question_text, options_json FROM quiz_questions WHERE quiz_id = ? ORDER BY question_index ASC", (quiz_id,))
    questions = []
    for row in cursor.fetchall():
        d = dict(row)
        d["options"] = json.loads(d["options_json"])
        d.pop("options_json", None)
        questions.append(d)

    conn.close()
    res = dict(quiz)
    res["questions"] = questions
    return res

class QuizAttemptSubmit(BaseModel):
    answers: Dict[str, int] # question_id -> selected_index (-1 if unanswered)
    time_taken_seconds: int

@app.post("/api/quizzes/{quiz_id}/attempt")
def submit_quiz_attempt(quiz_id: str, payload: QuizAttemptSubmit):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT q.*, s.name as subject_name FROM quizzes q JOIN subjects s ON q.subject_id = s.id WHERE q.id = ?", (quiz_id,))
    quiz = cursor.fetchone()
    if not quiz:
        conn.close()
        raise HTTPException(status_code=404, detail="Quiz not found")

    cursor.execute("SELECT id, question_index, correct_index FROM quiz_questions WHERE quiz_id = ?", (quiz_id,))
    questions = {row["id"]: row["correct_index"] for row in cursor.fetchall()}

    correct_count = 0
    incorrect_count = 0
    unanswered_count = 0

    attempt_id = str(uuid.uuid4())
    now = datetime.now().isoformat()

    # Pre-record answers
    answer_rows = []
    for q_id, correct_idx in questions.items():
        user_choice = payload.answers.get(q_id, -1)
        if user_choice == -1:
            unanswered_count += 1
            is_corr = 0
        elif user_choice == correct_idx:
            correct_count += 1
            is_corr = 1
        else:
            incorrect_count += 1
            is_corr = 0

        ans_id = str(uuid.uuid4())
        answer_rows.append((ans_id, attempt_id, q_id, user_choice, is_corr))

    score = correct_count
    total_q = len(questions) or 10
    percentage = round((score / total_q) * 100, 1)

    cursor.execute("""
    INSERT INTO quiz_attempts (id, quiz_id, subject_id, score, percentage, correct_count, incorrect_count, unanswered_count, time_taken_seconds, attempted_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (attempt_id, quiz_id, quiz["subject_id"], score, percentage, correct_count, incorrect_count, unanswered_count, payload.time_taken_seconds, now))

    for row in answer_rows:
        cursor.execute("""
        INSERT INTO quiz_answers (id, attempt_id, question_id, selected_index, is_correct)
        VALUES (?, ?, ?, ?, ?)
        """, row)

    conn.commit()
    conn.close()

    log_activity("quiz_attempted", f"Scored {score}/{total_q} ({percentage}%) on {quiz['title']}", subject_id=quiz["subject_id"])

    return {
        "attempt_id": attempt_id,
        "score": score,
        "percentage": percentage,
        "correct_count": correct_count,
        "incorrect_count": incorrect_count,
        "unanswered_count": unanswered_count,
        "time_taken_seconds": payload.time_taken_seconds,
        "attempted_at": now
    }

# ----------------- QUIZ HISTORY & DETAILED REVIEW -----------------

@app.get("/api/quiz-history")
def list_quiz_history(subject_id: Optional[str] = None):
    conn = get_db()
    cursor = conn.cursor()
    query = """
    SELECT qa.*, q.title as quiz_title, s.name as subject_name, s.color as subject_color
    FROM quiz_attempts qa
    JOIN quizzes q ON qa.quiz_id = q.id
    JOIN subjects s ON qa.subject_id = s.id
    """
    params = []
    if subject_id:
        query += " WHERE qa.subject_id = ?"
        params.append(subject_id)
    query += " ORDER BY qa.attempted_at DESC"
    cursor.execute(query, params)
    history = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return history

@app.get("/api/quiz-history/{attempt_id}")
def get_quiz_attempt_review(attempt_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT qa.*, q.title as quiz_title, s.name as subject_name, s.color as subject_color
    FROM quiz_attempts qa
    JOIN quizzes q ON qa.quiz_id = q.id
    JOIN subjects s ON qa.subject_id = s.id
    WHERE qa.id = ?
    """, (attempt_id,))
    attempt = cursor.fetchone()
    if not attempt:
        conn.close()
        raise HTTPException(status_code=404, detail="Attempt record not found")

    cursor.execute("""
    SELECT qq.id as question_id, qq.question_index, qq.question_text, qq.options_json,
           qq.correct_index, qq.explanation, qq.source_reference,
           ans.selected_index, ans.is_correct
    FROM quiz_answers ans
    JOIN quiz_questions qq ON ans.question_id = qq.id
    WHERE ans.attempt_id = ?
    ORDER BY qq.question_index ASC
    """, (attempt_id,))
    
    questions_review = []
    for row in cursor.fetchall():
        d = dict(row)
        d["options"] = json.loads(d["options_json"])
        d.pop("options_json", None)
        questions_review.append(d)

    conn.close()
    result = dict(attempt)
    result["questions"] = questions_review
    return result

# ----------------- STUDY TIMER & SESSIONS -----------------

class StudySessionCreate(BaseModel):
    subject_id: Optional[str] = None
    duration_seconds: int
    mode: str = "standard" # standard | pomodoro_study | pomodoro_break
    started_at: str
    completed_at: str
    status: str = "completed"

@app.post("/api/timer/session")
def save_study_session(payload: StudySessionCreate):
    session_id = str(uuid.uuid4())
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO study_sessions (id, subject_id, duration_seconds, mode, started_at, completed_at, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (session_id, payload.subject_id, payload.duration_seconds, payload.mode, payload.started_at, payload.completed_at, payload.status))
    conn.commit()

    sub_name = "General Study"
    if payload.subject_id:
        cursor.execute("SELECT name FROM subjects WHERE id = ?", (payload.subject_id,))
        r = cursor.fetchone()
        if r:
            sub_name = r["name"]

    conn.close()

    mins = round(payload.duration_seconds / 60)
    log_activity("study_session", f"Completed {mins}-minute study session for {sub_name}", subject_id=payload.subject_id)
    return {"id": session_id, "message": "Study session logged successfully"}

@app.get("/api/timer/recent")
def list_recent_study_sessions():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT ss.*, s.name as subject_name, s.color as subject_color
    FROM study_sessions ss
    LEFT JOIN subjects s ON ss.subject_id = s.id
    ORDER BY ss.completed_at DESC
    LIMIT 10
    """)
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return rows

# ----------------- ANALYTICS -----------------

@app.get("/api/analytics")
def get_analytics():
    conn = get_db()
    cursor = conn.cursor()

    # 1. Overall Metrics
    cursor.execute("SELECT COUNT(*) as c FROM subjects")
    total_subjects = cursor.fetchone()["c"]

    cursor.execute("SELECT COUNT(*) as c FROM study_materials")
    total_materials = cursor.fetchone()["c"]

    cursor.execute("SELECT COUNT(*) as c FROM ai_notes")
    total_notes = cursor.fetchone()["c"]

    cursor.execute("SELECT COUNT(*) as c FROM quiz_attempts")
    total_attempts = cursor.fetchone()["c"]

    cursor.execute("SELECT AVG(percentage) as avg_p FROM quiz_attempts")
    avg_row = cursor.fetchone()
    avg_score = round(avg_row["avg_p"], 1) if avg_row["avg_p"] is not None else 0

    cursor.execute("SELECT SUM(duration_seconds) as total_sec FROM study_sessions WHERE status = 'completed'")
    total_sec = cursor.fetchone()["total_sec"] or 0
    total_hours = round(total_sec / 3600, 1)

    cursor.execute("SELECT COUNT(*) as c FROM topics WHERE is_completed = 1")
    completed_topics = cursor.fetchone()["c"]

    cursor.execute("SELECT COUNT(*) as c FROM topics WHERE is_completed = 0")
    pending_topics = cursor.fetchone()["c"]

    # 2. Subject-wise breakdown
    cursor.execute("""
    SELECT s.id, s.name, s.color,
           (SELECT COUNT(*) FROM study_materials WHERE subject_id = s.id) as materials_count,
           (SELECT COUNT(*) FROM topics WHERE subject_id = s.id) as topics_count,
           (SELECT COUNT(*) FROM topics WHERE subject_id = s.id AND is_completed = 1) as completed_topics,
           (SELECT COUNT(*) FROM ai_notes WHERE subject_id = s.id) as notes_count,
           (SELECT COUNT(*) FROM quiz_attempts WHERE subject_id = s.id) as quiz_attempts,
           (SELECT AVG(percentage) FROM quiz_attempts WHERE subject_id = s.id) as avg_quiz_score,
           (SELECT SUM(duration_seconds) FROM study_sessions WHERE subject_id = s.id AND status = 'completed') as total_study_seconds
    FROM subjects s
    ORDER BY s.name ASC
    """)
    subject_stats = []
    for r in cursor.fetchall():
        d = dict(r)
        d["total_study_seconds"] = d["total_study_seconds"] or 0
        d["total_study_minutes"] = round(d["total_study_seconds"] / 60)
        d["avg_quiz_score"] = round(d["avg_quiz_score"], 1) if d["avg_quiz_score"] is not None else 0
        tot = d["topics_count"]
        comp = d["completed_topics"]
        d["completion_percentage"] = round((comp / tot) * 100) if tot > 0 else 0
        subject_stats.append(d)

    # 3. Quiz Score History over time (for visual chart)
    cursor.execute("""
    SELECT qa.id, qa.score, qa.percentage, qa.attempted_at, q.title as quiz_title, s.name as subject_name
    FROM quiz_attempts qa
    JOIN quizzes q ON qa.quiz_id = q.id
    JOIN subjects s ON qa.subject_id = s.id
    ORDER BY qa.attempted_at ASC
    LIMIT 20
    """)
    quiz_trend = [dict(row) for row in cursor.fetchall()]

    # 4. Study Time Trend (grouped by day)
    cursor.execute("""
    SELECT DATE(completed_at) as study_date, SUM(duration_seconds) as seconds
    FROM study_sessions
    WHERE status = 'completed'
    GROUP BY DATE(completed_at)
    ORDER BY study_date DESC
    LIMIT 14
    """)
    study_trend = [dict(row) for row in cursor.fetchall()]
    # reverse so it's chronological
    study_trend.reverse()
    for item in study_trend:
        item["minutes"] = round(item["seconds"] / 60)

    conn.close()

    return {
        "overview": {
            "total_subjects": total_subjects,
            "total_materials": total_materials,
            "total_notes": total_notes,
            "total_attempts": total_attempts,
            "avg_score": avg_score,
            "total_hours": total_hours,
            "total_seconds": total_sec,
            "completed_topics": completed_topics,
            "pending_topics": pending_topics
        },
        "subject_stats": subject_stats,
        "quiz_trend": quiz_trend,
        "study_trend": study_trend
    }

# ----------------- GLOBAL SEARCH -----------------

@app.get("/api/search")
def global_search(q: str = Query(..., min_length=1)):
    term = f"%{q.strip()}%"
    conn = get_db()
    cursor = conn.cursor()

    # Subjects
    cursor.execute("SELECT id, name, description, color FROM subjects WHERE name LIKE ? OR description LIKE ?", (term, term))
    subjects = [dict(row) for row in cursor.fetchall()]

    # Study Materials
    cursor.execute("""
    SELECT sm.id, sm.filename, sm.file_type, sm.subject_id, s.name as subject_name
    FROM study_materials sm
    JOIN subjects s ON sm.subject_id = s.id
    WHERE sm.filename LIKE ?
    """, (term,))
    materials = [dict(row) for row in cursor.fetchall()]

    # AI Notes
    cursor.execute("""
    SELECT an.id, an.title, an.subject_id, s.name as subject_name
    FROM ai_notes an
    JOIN subjects s ON an.subject_id = s.id
    WHERE an.title LIKE ? OR an.content LIKE ?
    LIMIT 10
    """, (term, term))
    ai_notes = [dict(row) for row in cursor.fetchall()]

    # Self Notes
    cursor.execute("""
    SELECT sn.id, sn.title, sn.subject_id, s.name as subject_name
    FROM self_notes sn
    JOIN subjects s ON sn.subject_id = s.id
    WHERE sn.title LIKE ? OR sn.content LIKE ?
    LIMIT 10
    """, (term, term))
    self_notes = [dict(row) for row in cursor.fetchall()]

    # Topics
    cursor.execute("""
    SELECT t.id, t.title, t.subject_id, s.name as subject_name
    FROM topics t
    JOIN subjects s ON t.subject_id = s.id
    WHERE t.title LIKE ? OR t.description LIKE ?
    LIMIT 10
    """, (term, term))
    topics = [dict(row) for row in cursor.fetchall()]

    conn.close()

    total_results = len(subjects) + len(materials) + len(ai_notes) + len(self_notes) + len(topics)

    return {
        "query": q,
        "total_results": total_results,
        "results": {
            "subjects": subjects,
            "materials": materials,
            "ai_notes": ai_notes,
            "self_notes": self_notes,
            "topics": topics
        }
    }

# ----------------- STATIC CLIENT MOUNT -----------------
from fastapi.staticfiles import StaticFiles

client_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "client", "dist"))
if os.path.exists(client_dist):
    app.mount("/", StaticFiles(directory=client_dist, html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    print(f"Starting My Learning Space server on http://localhost:8000 ...")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

