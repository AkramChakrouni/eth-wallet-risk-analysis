from fastapi import FastAPI, Request, HTTPException
from src.asset_fetcher import fetch_tokens

app = FastAPI()

@app.post("/assets")
async def assets_endpoint(req: Request):
    """
    Expects JSON: { "address": "0x..." }
    Returns: output of fetch_tokens()
    """
    body = await req.json()
    address = body.get("address")
    if not address:
        raise HTTPException(status_code=400, detail="`address` field required")

    try:
        return fetch_tokens(address)
    except RuntimeError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Internal error")
