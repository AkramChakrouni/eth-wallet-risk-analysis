#!/usr/bin/env bash
set -e

# Activate your virtualenv
source .venv/bin/activate

# 1) Assets Fetch module (wallet → tokens) on port 8000
python -m uvicorn main:app \
    --app-dir assets_fetch_module \
    --port 8000 --reload &

# 2) Sentiment module (tokens → sentiment) on port 8001
python -m uvicorn main:app \
    --app-dir sentiment_module \
    --port 8001 --reload &

# 3) Notification module (sentiment → notifications) on port 8002
python -m uvicorn main:app \
    --app-dir notification_module \
    --port 8002 --reload &

# 4) Gateway (wallet → end-to-end) on port 8003
python -m uvicorn main:app \
    --app-dir gateway \
    --port 8003 --reload &

# Keep the script alive so Ctrl+C tears down all four services
wait

# TODO:
# After editting run in cmd: chmod +x start_services.sh
# Then to start the program: ./start_services.sh
# Input will be: curl -X POST http://127.0.0.1:8003/analyze \
#     -H "Content-Type: application/json" \
#     -d '{"address":"0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97"}'
