from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from src.processor import process_notifications
from typing import Any, List, Dict

app = FastAPI()

# Allow your frontend/gateway to talk here
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    # tighten in prod
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/notify")
async def notify_endpoint(req: Request) -> List[Dict[str, Any]]:
    """
    Receive JSON (currently from sentiment), process it,
    and return exactly the same (or enriched) notifications.
    """
    try:
        payload: Any = await req.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON")

    result = process_notifications(payload)
    return result
