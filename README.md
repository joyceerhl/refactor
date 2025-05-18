# Refactor

A Chrome extension that provides concise, fact-based summaries of CNN news articles using Llama 4 Scout, running at [2600 tokens/s](https://inference-docs.cerebras.ai/introduction) via the Cerebras AI API.

## Demo

This demo is not sped up, and caching was not used.

![Demo of using Refactor to generate summaries for two CNN articles](demo.gif)

## Features

- Automatically detects when you're reading a CNN article
- Extracts the article content
- Generates a concise, fact-based summary (under 50 words)
- Displays the summary at the top of the article

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode" in the top right
5. Click "Load unpacked" and select this project's directory

## Configuration

Before using the extension, you need to configure your Cerebras AI API key:

1. Get your API key from [Cerebras AI](https://www.cerebras.ai/)
2. Replace `<YOUR-API-KEY>` in `src/background.js` with your actual API key

## Development

To serve the extension over HTTPS during development:
```bash
npm run serve
```

To clean build and reinstall dependencies:
```bash
npm run clean
```

## Technical Details

- Built with Chrome Extensions Manifest V3
- Uses content scripts to inject summaries into CNN articles
- Leverages Cerebras AI's llama-4-scout-17b model for high-quality summaries
- Background service worker handles API communication
- Zero-configuration setup (after API key is added)
