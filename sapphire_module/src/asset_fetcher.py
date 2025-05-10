import os
import requests
from pathlib import Path
from dotenv import load_dotenv
from typing import Dict, Any, List

#─── CONFIG ────────────────────────────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent.parent
API_PATH = BASE_DIR / "config" / "api_keys.env"
KEY_NAME = "COVALENT_API_KEY"
CHAIN_ID = "1"
#───────────────────────────────────────────────────────────────────────────────

def load_api_key() -> str:
    """Load Covalent API key from .env"""
    load_dotenv(API_PATH)
    key = os.getenv(KEY_NAME)
    if not key:
        raise RuntimeError(f"Missing {KEY_NAME} in {API_PATH}")
    return key

def fetch_tokens(address: str) -> Dict[str, Any]:
    """
    Query Covalent for token balances above $5 USD.
    Returns: {"address": ..., "tokens":[{symbol,address,usd_value},...]}
    """
    api_key = load_api_key()
    url = (
        f"https://api.covalenthq.com/v1/{CHAIN_ID}/"
        f"address/{address}/balances_v2/?key={api_key}"
    )
    resp = requests.get(url)
    try:
        data = resp.json()
    except Exception as e:
        raise RuntimeError("Invalid JSON from Covalent") from e

    items = data.get("data", {}).get("items", [])
    tokens: List[Dict[str, Any]] = []
    for item in items:
        quote = item.get("quote") or 0.0
        if quote > 5:
            tokens.append({
                "symbol": item.get("contract_ticker_symbol", "UNKNOWN"),
                "address": item.get("contract_address", ""),
                "usd_value": round(quote, 2)
            })

    return {"address": address, "tokens": tokens}
