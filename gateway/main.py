from fastapi import FastAPI, Request, HTTPException
import requests

app = FastAPI()

# URLs of your upstream services
SAPPHIRE_URL   = "http://localhost:8000/assets"
SENTIMENT_URL  = "http://localhost:8001/sentiment"

@app.post("/analyze")
async def analyze(req: Request):
    """
    1) Accepts JSON: { "address": "0x..." }
    2) Calls Sapphire service to get tokens
    3) Calls Sentiment service to get analysis
    4) Returns the final sentiment JSON
    """
    body = await req.json()
    address = body.get("address")
    if not address:
        raise HTTPException(status_code=400, detail="`address` field required")

    try:
        # Step 1: fetch token list
        resp_tokens = requests.post(SAPPHIRE_URL, json={"address": address})
        resp_tokens.raise_for_status()
        tokens_payload = resp_tokens.json()

        # Step 2: fetch sentiment analysis
        resp_sent = requests.post(SENTIMENT_URL, json=tokens_payload)
        resp_sent.raise_for_status()
        sentiment_payload = resp_sent.json()

        return sentiment_payload

    except requests.exceptions.RequestException as e:
        # Propagate any network or HTTP errors as a 502 Bad Gateway
        raise HTTPException(status_code=502, detail=str(e))
