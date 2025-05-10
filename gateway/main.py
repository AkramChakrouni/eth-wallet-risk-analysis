from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Lock this down in production to your frontend domain
    allow_methods=["*"],
    allow_headers=["*"],
)

# Service URLs
SAPPHIRE_URL  = "http://localhost:8000/assets"
SENTIMENT_URL = "http://localhost:8001/sentiment"
NOTIFY_URL    = "http://localhost:8002/notify"

@app.post("/analyze")
async def analyze(req: Request):
    body = await req.json()
    address = body.get("address")
    if not address:
        raise HTTPException(status_code=400, detail="`address` field required")

    try:
        # 1) Fetch wallet assets from Sapphire
        resp_tokens = requests.post(SAPPHIRE_URL, json={"address": address})
        resp_tokens.raise_for_status()
        tokens_payload = resp_tokens.json()

        # 2) Analyze sentiment
        resp_sent = requests.post(SENTIMENT_URL, json=tokens_payload)
        resp_sent.raise_for_status()
        sentiment_payload = resp_sent.json()

        # 3) Forward to notification module
        resp_notify = requests.post(NOTIFY_URL, json=sentiment_payload)
        resp_notify.raise_for_status()
        final_output = resp_notify.json()

        return final_output

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail=str(e))

@app.get("/notifications")
async def notifications():
    """
    Fetch the latest notifications directly from the notification module.
    """
    try:
        resp = requests.get(NOTIFY_URL.replace("/notify", "/notifications"))
        resp.raise_for_status()
        return resp.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail=str(e))
