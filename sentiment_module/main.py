from fastapi import FastAPI, Request, HTTPException
from src.crypto_panic_scraper import fetch_news_for_symbols
from src.model_inference      import run_sentiment_inference

app = FastAPI()

@app.post("/sentiment")
async def sentiment_endpoint(req: Request):
    """
    Expects JSON (output of Sapphire):
      { "address": "...", "tokens": [ ... ] }
    Returns JSON: news + LLM inference.
    """
    body = await req.json()
    tokens = body.get("tokens")
    if tokens is None:
        raise HTTPException(status_code=400, detail="Missing tokens in payload")

    # 1) In-memory fetch of CryptoPanic data
    fetched = fetch_news_for_symbols(body)

    # 2) In-memory LLM inference
    try:
        result = run_sentiment_inference(fetched)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

    return result
