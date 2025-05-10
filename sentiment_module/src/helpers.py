import json, os
from pathlib import Path
from dotenv import load_dotenv
from typing import Any, Dict, List

def load_api_key(env_path: Path, key_name: str) -> str:
    load_dotenv(env_path)
    val = os.getenv(key_name)
    if not val:
        raise RuntimeError(f"Missing {key_name} in {env_path}")
    return val

def load_system_prompt(path: Path) -> str:
    return path.read_text(encoding="utf-8")

def load_symbols_from_token_list(data: Dict[str, Any]) -> List[str]:
    tokens = data.get("tokens", [])
    return [t["symbol"] for t in tokens if "symbol" in t]
