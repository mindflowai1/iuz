# CRM Jurídico MVP - Deployment Guide

## 🚀 Quick Start

### 1. Landing Page Deployment

#### Option A: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd crm-juridico
vercel
```

#### Option B: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod
```

### 2. Environment Variables Setup

Create `.env.local` file in the project root:

```bash
# Copy from docs/env-template.txt
cp docs/env-template.txt .env.local
```

Fill in the actual values:
- Get `HUBSPOT_PORTAL_ID` from HubSpot Settings > Account
- Get `HUBSPOT_FORM_ID` by creating a form in HubSpot
- Update `WHATSAPP_NUMBER` with your business number

### 3. HubSpot Configuration

#### Create Custom Objects

1. Go to HubSpot > Settings > Data Management > Objects
2. Click "Create custom object"

**Caso Jurídico:**
- Name: Caso Jurídico
- Add properties from `implementation_plan.md` section 1

**Qualificação:**
- Name: Qualificação
- Add properties from `implementation_plan.md` section 2

#### Create Pipeline

1. Go to Sales > Pipelines
2. Create new pipeline: "Pipeline Jurídico MVP"
3. Add stages as defined in implementation plan

#### Deploy Serverless Functions

1. Install HubSpot CLI:
```bash
npm install -g @hubspot/cli
hs init
```

2. Upload functions:
```bash
hs project upload --folder serverless
```

3. Configure secrets in HubSpot:
   - CLAUDE_API_KEY
   - OPENAI_API_KEY
   - WHATSAPP_TOKEN

### 4. WhatsApp Integration

#### Using Twilio
1. Create account at twilio.com/whatsapp
2. Get credentials (Account SID, Auth Token)
3. Configure webhook pointing to HubSpot serverless function
4. Update environment variables

### 5. Testing

#### Local Development
```bash
npm run dev
```

Visit `http://localhost:3000`

#### Test Form Submission
1. Fill out the contact form
2. Check HubSpot for new contact
3. Verify WhatsApp redirect works

#### Test Serverless Functions
```bash
# Using HubSpot CLI
hs functions test sales-agent-whatsapp --payload '{"from":"5511999999999","message":"Preciso de um advogado de família"}'
```

## 📊 Monitoring

### HubSpot
- Check Workflows > History for automation logs
- Monitor Custom Objects for data creation
- Review Contact timeline for AI notes

### Application
- Use Vercel Analytics (automatic)
- Add Google Analytics if needed

## 🔐 Security Checklist

- [ ] All API keys stored as secrets (not in code)
- [ ] HubSpot Private App has minimal scopes
- [ ] LGPD compliance: Privacy policy added
- [ ] Form has consent checkbox
- [ ] HTTPS enabled on production
- [ ] WhatsApp webhook uses authentication

## 🎯 Post-Launch Tasks

1. Test complete user journey (form → WhatsApp → HubSpot)
2. Train team on HubSpot interface
3. Monitor Claude API usage and costs
4. Set up backups for HubSpot data
5. Create dashboards for KPIs

## 📞 Support

For issues or questions, refer to:
- Implementation Plan: `implementation_plan.md`
- HubSpot Docs: developers.hubspot.com
- Anthropic Docs: docs.anthropic.com

---

**Ready to transform your law office into an AI-powered sales machine! 🚀⚖️**
