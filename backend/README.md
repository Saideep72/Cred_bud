# FinV2 Backend

FastAPI backend for FinV2 application.

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in the values.

## Run

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
