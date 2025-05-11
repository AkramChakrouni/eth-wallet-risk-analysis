# OnyxGuard: Ethereum Wallet Risk Analysis - backend

## Overview
OnyxGuard is a comprehensive risk analysis system for Ethereum wallets that monitors your crypto assets and provides real-time sentiment analysis and risk assessment. The system analyzes social sentiment, market data, and emerging trends to help you make informed decisions about your crypto portfolio.

![OnyxGuard](logo.png)

## Features
- **Asset Discovery**: Automatically detects tokens in your Ethereum wallet
- **Sentiment Analysis**: Monitors news and social sentiment for your held assets
- **Risk Assessment**: Provides risk ratings (LOW, MEDIUM, HIGH) based on current data
- **Notification System**: Alerts you about potential risks and opportunities

## Architecture
The backend consists of three microservices:
1. **Assets Fetch Module**: Retrieves token balances from Ethereum wallets using Covalent API
2. **Sentiment Module**: Analyzes crypto news from CryptoPanic and processes with NVIDIA's AI
3. **Notification Module**: Processes and delivers risk assessments

These services are coordinated through a gateway API that handles the flow of information between them.

## Installation & Setup

### Prerequisites
- Python 3.10+
- Git

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/AkramChakrouni/eth-wallet-risk-analysis
cd eth-wallet-risk-analysis

# Install uv for dependency management
pip install uv

# Install dependencies
uv sync

# Make the startup script executable
chmod +x start_services.sh

# Start all microservices
./start_services.sh
```

The backend services will run on:
- Gateway: http://localhost:8080
- Assets Fetch Module: http://localhost:8000
- Sentiment Module: http://localhost:8001
- Notification Module: http://localhost:8002

### API Keys
The system uses the following APIs:
- Covalent API (for wallet analysis)
- NVIDIA AI API (for sentiment processing)
- CryptoPanic API (for crypto news)

API keys are stored in `config/api_keys.env` files in each module.

### Frontend Setup
The frontend for OnyxGuard is available in a separate repository:
```bash
git clone https://github.com/AkramChakrouni/onyxguard-risk-pulse-ui
```

Follow the instructions in the frontend repository to connect it to your running backend.

## How It Works

1. **Wallet Analysis**: Enter your Ethereum address to discover tokens worth more than $5 USD
2. **News Extraction**: The system pulls recent news for each token in your wallet
3. **Sentiment Analysis**: Advanced AI assesses news sentiment and risk factors
4. **Risk Assessment**: Generates risk levels, notifications, and action recommendations

## API Endpoints

The gateway service exposes two main endpoints:
- `POST /analyze`: Takes an Ethereum address and returns a complete risk analysis
- `GET /notifications`: Retrieves the latest notifications and alerts
