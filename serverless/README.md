# CRM Jurídico MVP - Serverless Functions

This directory contains HubSpot serverless functions for AI integrations.

## Structure

```
serverless/
├── agents/
│   ├── sales-agent-whatsapp.js    # WhatsApp + Claude integration
│   └── document-triage.js         # Document analysis with Vision + Claude
├── ai/
│   ├── claude-client.js           # Claude API client
│   └── transcription-service.js   # Meeting transcription
└── utils/
    └── hubspot-client.js          # HubSpot API utilities
```

## Deployment

These functions are designed to be deployed to HubSpot Serverless Functions:
1. Go to HubSpot > Settings > CMS > Functions
2. Create new function for each file
3. Configure secrets (API keys)
4. Set up webhooks

## Environment Variables Needed

- `CLAUDE_API_KEY`: Anthropic Claude API key
- `HUBSPOT_ACCESS_TOKEN`: HubSpot Private App token
- `OPENAI_API_KEY`: OpenAI API key (for Whisper)
- `WHATSAPP_TOKEN`: WhatsApp Business API token

## Testing

Run locally using HubSpot CLI:
```bash
hs  project upload
hs functions test
```
