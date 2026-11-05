# My Learning Space - Personal AI-Powered LMS

A modern, intelligent, and private Personal Learning Management System (LMS) built for MBA studies with a playful Mickey Mouse-inspired visual theme.

Powered by **Google Gemini AI**, **FastAPI**, **SQLite**, and **React (Vite + Tailwind CSS)**.

---

## 🌟 Key Features

1. **Clean Initial Empty State**:
   - Zero mock/dummy records or fake statistics.
   - Everything rendered reflects your real MBA subjects, uploaded presentations, and learning activities.

2. **Mickey Mouse-Inspired Design**:
   - Palette of classic Mickey crimson red (`#E52521`), onyx charcoal (`#191A23`), canary yellow (`#FDB813`), and light background surfaces.
   - Rounded cards, smooth transitions, playful custom icons and celebratory confetti.

3. **Multiple PPT/Document Upload & Persistent Storage**:
   - Upload multiple `.pptx`, `.ppt`, `.pdf`, or `.docx` presentations simultaneously.
   - Full content extraction: slide titles, text, bullet points, tables, and slide numbers.
   - Persistent file storage and database records.

4. **AI Topic Organization (Gemini)**:
   - Analyzes all presentations across a subject to synthesize a logical syllabus sequence.
   - Identifies topics, subtopics, and exact slide citations.

5. **AI Notes Generation (Gemini)**:
   - Comprehensive, structured MBA study notes with:
     - Topic Introduction
     - Basic & Detailed Explanations
     - Important Definitions
     - Practical Examples & Real-World Applications
     - Exam Points, Quick Revision, and Key Takeaways
   - Table of Contents, in-note search, editing, clipboard copying, and PDF/Print export.

6. **Self Notes Module**:
   - Personal rich note-taking linked to your MBA subjects with automatic real-time saving and saved indicator.

7. **10-MCQ AI Quiz Center & Drill-down History**:
   - Practice quizzes with strictly 10 MCQs grounded in your lecture slides.
   - 1-by-1 question stepper with timer.
   - Instant scoring, percentage calculation, and complete question-by-question review with detailed explanations.
   - Full Quiz History tracking past performance over time.

8. **Study Timer with Pomodoro Mode**:
   - Large circular animated SVG countdown timer.
   - Presets (15, 25, 30, 45, 60 mins), custom duration, and Pomodoro cycles (Study 25m, Short Break 5m, Long Break 15m).
   - Subject-wise tracking and persistent state that survives navigation and page refresh.
   - Completion celebration and permanent logging to database.

9. **Dynamic Learning Analytics**:
   - Strictly calculated from database records: study hours, average quiz scores, topic completion rates, and visual daily trends.

10. **Global Instant Search (`Ctrl + K`)**:
    - Real-time search across subjects, documents, AI notes, self notes, and topics.

---

## 🚀 How to Run

### Method 1: One-Click Launch (Windows Batch File)
Double click `start.bat` or run in terminal:
```cmd
start.bat
```
Then open your browser at **http://localhost:8000**

---

### Method 2: Manual Start
From the project root:
```bash
python run_app.py
```
Then open your browser at **http://localhost:8000**

---

### Method 3: Deploying on Vercel
1. Import your GitHub repository `Ankitasrivastav141/LMS` into Vercel.
2. In your Vercel Project Settings -> **Environment Variables**, add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key
3. Vercel automatically deploys the frontend static assets and mounts the Python API serverless function via `vercel.json` and `api/index.py`.
