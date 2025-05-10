from openai import OpenAI
from pathlib import Path
import json
from .helpers import load_api_key, load_system_prompt
from typing import Any, Dict

BASE_DIR           = Path(__file__).resolve().parent.parent
CONFIG             = BASE_DIR / "config"
API_PATH           = CONFIG / "api_keys.env"
KEY_NAME           = "NVIDIA_API_KEY"
SYSTEM_PROMPT_PATH = CONFIG / "system_prompt.txt"
MODEL_BASE_URL     = "https://integrate.api.nvidia.com/v1"
MODEL_TYPE         = "nvidia/llama-3.3-nemotron-super-49b-v1"

def run_sentiment_inference(fetcher_output: Any) -> Any:
    api_key = load_api_key(API_PATH, KEY_NAME)
    system_prompt = load_system_prompt(SYSTEM_PROMPT_PATH)

    client = OpenAI(base_url=MODEL_BASE_URL, api_key=api_key)
    completion = client.chat.completions.create(
        model=MODEL_TYPE,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": json.dumps(fetcher_output)}
        ],
        temperature=0.6,
        top_p=0.95,
        max_tokens=4096,
        stream=True
    )

    output = ""
    for chunk in completion:
        delta = chunk.choices[0].delta.content
        if delta:
            output += delta

    return json.loads(output)
