from typing import List, Dict, Any
from datetime import datetime, timedelta, timezone
import time, requests
from pathlib import Path
from .helpers import load_api_key, load_symbols_from_token_list

BASE_DIR    = Path(__file__).resolve().parent.parent
CONFIG      = BASE_DIR / "config"
API_PATH    = CONFIG / "api_keys.env"
KEY_NAME    = "CRYPTO_PANIC_API_KEY"
BASE_URL    = "https://cryptopanic.com/api/v1/posts/"
MAX_PER     = 5
DAYS_BACK   = 7

def get_recent_articles(symbol: str, filter_type: str) -> List[Dict[str, Any]]:
    api_key = load_api_key(API_PATH, KEY_NAME)
    r = requests.get(BASE_URL, params={
        "auth_token": api_key,
        "currencies": symbol,
        "filter": filter_type
    })
    if r.status_code != 200:
        return []
    cutoff = datetime.now(timezone.utc) - timedelta(days=DAYS_BACK)
    out: List[Dict[str, Any]] = []
    for post in r.json().get("results", []):
        try:
            pub = datetime.strptime(post["published_at"], "%Y-%m-%dT%H:%M:%S%z")
        except:
            continue
        if pub >= cutoff:
            out.append({
                "text": post["title"],
                "source": post["url"],
                "published_at": pub.isoformat()
            })
        if len(out) >= MAX_PER:
            break
    return out

def fetch_news_for_symbols(input_data: Dict[str, Any]) -> List[Dict[str, Any]]:
    symbols = load_symbols_from_token_list(input_data)
    results: List[Dict[str, Any]] = []
    cutoff_iso = (datetime.utcnow() - timedelta(days=DAYS_BACK)).isoformat()
    for sym in symbols:
        arts = get_recent_articles(sym, "hot") or get_recent_articles(sym, "new")
        if arts:
            results.append({"asset_name": sym, "status": "analyzed", "texts": arts})
        else:
            results.append({
                "asset_name": sym,
                "status": "no_recent_data",
                "texts": [],
                "risk_level": None,
                "reason": f"No qualifying articles after {cutoff_iso}",
                "priority": None
            })
        time.sleep(1)
    return results
