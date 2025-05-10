#!/usr/bin/env python3
import requests
import json
from pathlib import Path

# ————————————————————————————————————————————————————————————————
# CONFIGURATION (all relative)
BASE_DIR    = Path(__file__).resolve().parent
DATA_DIR    = BASE_DIR.parent / "data"
DATA_DIR.mkdir(exist_ok=True)   # ensure folder exists
OUTPUT_PATH = DATA_DIR / "notification_output.json"

FETCHER_URL    = "http://localhost:8001/fetch"
INFERENCE_URL  = "http://localhost:8002/inference"
# ————————————————————————————————————————————————————————————————

def main():
    # 1) Fetch the enriched asset data
    resp_fetch = requests.get(FETCHER_URL)
    resp_fetch.raise_for_status()
    cp_data = resp_fetch.json()

    # 2) Run inference on it
    resp_inf = requests.post(INFERENCE_URL, json=cp_data)
    resp_inf.raise_for_status()
    inferred = resp_inf.json()

    # 3) Save to disk
    with OUTPUT_PATH.open("w", encoding="utf-8") as f:
        json.dump(inferred, f, indent=2)

    print(f"✅ Notification output saved to {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
