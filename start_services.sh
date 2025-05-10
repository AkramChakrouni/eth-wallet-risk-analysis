#!/usr/bin/env bash
set -e

# 1) Activate your virtualenv (adjust path if needed)
source .venv/bin/activate

# 2) Sapphire module (wallet → tokens) on port 8000
python -m uvicorn main:app \
    --app-dir sapphire_module \
    --port 8000 --reload &

# 3) Sentiment module (tokens → sentiment) on port 8001
python -m uvicorn main:app \
    --app-dir sentiment_module \
    --port 8001 --reload &

# 4) Gateway (wallet → sentiment) on port 8003
python -m uvicorn main:app \
    --app-dir gateway \
    --port 8003 --reload &

# 5) Wait so Ctrl+C tears down all three
wait

# TODO:
# After editting run in cmd: chmod +x start_services.sh
# Then to start the program: ./start_services.sh
# Input will be: curl -X POST http://127.0.0.1:8003/analyze \
#     -H "Content-Type: application/json" \
#     -d '{"address":"0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97"}'
