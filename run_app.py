import os
import sys
import webbrowser
import subprocess

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(base_dir, "backend")
    
    print("=" * 60)
    print("Launching My Learning Space (Personal AI LMS)...")
    print("Server URL: http://localhost:8000")
    print("=" * 60)
    
    # Open browser
    try:
        webbrowser.open("http://localhost:8000")
    except Exception:
        pass

    # Start uvicorn
    cmd = [sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"]
    subprocess.run(cmd, cwd=backend_dir)

if __name__ == "__main__":
    main()
