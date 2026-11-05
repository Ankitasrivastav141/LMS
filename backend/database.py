import sqlite3
import os
import json
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "lms.db")
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn

def init_db(default_gemini_key=""):
    conn = get_db()
    cursor = conn.cursor()

    # 1. Subjects
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS subjects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        color TEXT DEFAULT '#E52521',
        icon TEXT DEFAULT 'BookOpen',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
    );
    """)

    # 2. Study Materials
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS study_materials (
        id TEXT PRIMARY KEY,
        subject_id TEXT NOT NULL,
        filename TEXT NOT NULL,
        file_path TEXT NOT NULL,
        file_size INTEGER NOT NULL,
        file_type TEXT NOT NULL,
        upload_date TEXT NOT NULL,
        processing_status TEXT NOT NULL DEFAULT 'uploaded',
        error_message TEXT,
        slide_count INTEGER DEFAULT 0,
        summary TEXT,
        FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
    );
    """)

    # 3. Extracted Content
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS extracted_content (
        id TEXT PRIMARY KEY,
        material_id TEXT NOT NULL,
        subject_id TEXT NOT NULL,
        item_type TEXT NOT NULL,
        item_index INTEGER NOT NULL,
        title TEXT,
        content TEXT NOT NULL,
        tables_json TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY (material_id) REFERENCES study_materials(id) ON DELETE CASCADE,
        FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
    );
    """)

    # 4. Topics
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS topics (
        id TEXT PRIMARY KEY,
        subject_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        sequence_order INTEGER NOT NULL DEFAULT 1,
        subtopics_json TEXT,
        source_references_json TEXT,
        is_completed INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
    );
    """)

    # 5. AI Notes
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS ai_notes (
        id TEXT PRIMARY KEY,
        subject_id TEXT NOT NULL,
        topic_id TEXT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        source_files_json TEXT,
        version INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
        FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE SET NULL
    );
    """)

    # 6. Self Notes
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS self_notes (
        id TEXT PRIMARY KEY,
        subject_id TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        is_favorite INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
    );
    """)

    # 7. Quizzes
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS quizzes (
        id TEXT PRIMARY KEY,
        subject_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        total_questions INTEGER NOT NULL DEFAULT 10,
        created_at TEXT NOT NULL,
        FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
    );
    """)

    # 8. Quiz Questions
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS quiz_questions (
        id TEXT PRIMARY KEY,
        quiz_id TEXT NOT NULL,
        question_index INTEGER NOT NULL,
        question_text TEXT NOT NULL,
        options_json TEXT NOT NULL,
        correct_index INTEGER NOT NULL,
        explanation TEXT NOT NULL,
        source_reference TEXT,
        FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
    );
    """)

    # 9. Quiz Attempts
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS quiz_attempts (
        id TEXT PRIMARY KEY,
        quiz_id TEXT NOT NULL,
        subject_id TEXT NOT NULL,
        score INTEGER NOT NULL,
        percentage REAL NOT NULL,
        correct_count INTEGER NOT NULL,
        incorrect_count INTEGER NOT NULL,
        unanswered_count INTEGER NOT NULL,
        time_taken_seconds INTEGER NOT NULL,
        attempted_at TEXT NOT NULL,
        FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
        FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
    );
    """)

    # 10. Quiz Answers
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS quiz_answers (
        id TEXT PRIMARY KEY,
        attempt_id TEXT NOT NULL,
        question_id TEXT NOT NULL,
        selected_index INTEGER NOT NULL,
        is_correct INTEGER NOT NULL,
        FOREIGN KEY (attempt_id) REFERENCES quiz_attempts(id) ON DELETE CASCADE,
        FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE
    );
    """)

    # 11. Study Sessions
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS study_sessions (
        id TEXT PRIMARY KEY,
        subject_id TEXT,
        duration_seconds INTEGER NOT NULL,
        mode TEXT NOT NULL,
        started_at TEXT NOT NULL,
        completed_at TEXT NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL
    );
    """)

    # 12. User Settings
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_settings (
        id TEXT PRIMARY KEY,
        gemini_api_key TEXT,
        preferred_model TEXT DEFAULT 'gemini-3.8-flash',
        theme TEXT DEFAULT 'mickey-light',
        default_timer_minutes INTEGER DEFAULT 25,
        pomodoro_study_minutes INTEGER DEFAULT 25,
        pomodoro_short_break INTEGER DEFAULT 5,
        pomodoro_long_break INTEGER DEFAULT 15,
        updated_at TEXT NOT NULL
    );
    """)

    # 13. Activity Logs
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS activity_logs (
        id TEXT PRIMARY KEY,
        subject_id TEXT,
        activity_type TEXT NOT NULL,
        title TEXT NOT NULL,
        details TEXT,
        timestamp TEXT NOT NULL,
        FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
    );
    """)

    conn.commit()

    # Pre-seed user_settings if not present
    cursor.execute("SELECT id FROM user_settings WHERE id = 'default'")
    row = cursor.fetchone()
    now_iso = datetime.now().isoformat()
    if not row:
        cursor.execute("""
        INSERT INTO user_settings (id, gemini_api_key, preferred_model, theme, default_timer_minutes, pomodoro_study_minutes, pomodoro_short_break, pomodoro_long_break, updated_at)
        VALUES ('default', ?, 'gemini-3.5-flash', 'mickey-light', 25, 25, 5, 15, ?)
        """, (default_gemini_key, now_iso))
        conn.commit()
    elif default_gemini_key:
        cursor.execute("UPDATE user_settings SET gemini_api_key = ? WHERE id = 'default' AND (gemini_api_key IS NULL OR gemini_api_key = '')", (default_gemini_key,))
        conn.commit()

    conn.close()

def log_activity(activity_type: str, title: str, details: str = "", subject_id: str = None):
    conn = get_db()
    cursor = conn.cursor()
    import uuid
    cursor.execute("""
    INSERT INTO activity_logs (id, subject_id, activity_type, title, details, timestamp)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (str(uuid.uuid4()), subject_id, activity_type, title, details, datetime.now().isoformat()))
    conn.commit()
    conn.close()
