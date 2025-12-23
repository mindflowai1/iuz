# 🚀 CRM Jurídico MVP

## Advocacia com Inteligência Artificial 24/7

Sistema completo de CRM jurídico com IA integrada, desenvolvido com Next.js, HubSpot, e Claude Sonnet 4.5.

### ✨ Features

- 🤖 **Atendimento 24/7 via IA** - Claude Sonnet 4.5 para qualificação automática de leads
- 📄 **Análise de Documentos** - OCR + IA para processar laudos, B.Os, contratos
- 🎤 **Transcrição de Reuniões** - Resumos executivos automáticos com IA
- 📊 **Dashboard HubSpot** - CRM completo com custom objects e automações
- 💬 **Integração WhatsApp** - Resposta instantânea via IA
- 🎨 **Landing Page Premium** - Design moderno com Magic UI e animações

### 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, TailwindCSS
- **UI/UX:** Magic UI, Framer Motion, Glassmorphism  
- **CRM:** HubSpot (Custom Objects, Workflows, Serverless Functions)
- **IA:** Anthropic Claude Sonnet 4.5, Claude Vision, OpenAI Whisper
- **Integrações:** WhatsApp Business API, Google Calendar

### 📁 Project Structure

```
crm-juridico/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── page.tsx                 # Landing page principal
│   │   ├── layout.tsx               # Layout com SEO
│   │   └── globals.css              # Estilos globais
│   ├── components/
│   │   ├── sections/                # Seções da landing page
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AreasAtuacaoSection.tsx
│   │   │   ├── DiferenciaisSection.tsx
│   │   │   ├── ComoFuncionaSection.tsx
│   │   │   └── ContatoSection.tsx
│   │   ├── magicui/                 # Magic UI components
│   │   │   ├── animated-gradient.tsx
│   │   │   ├── bento-grid.tsx
│   │   │   └── floating-particles.tsx
│   │   ├── HubSpotContactForm.tsx   # Formulário integrado
│   │   └── Footer.tsx
│   └── lib/
│       ├── utils.ts                 # Utilities
│       └── hubspot.ts               # HubSpot API client
├── serverless/                      # HubSpot Serverless Functions
│   ├── agents/
│   │   ├── sales-agent-whatsapp.js  # Agente IA WhatsApp
│   │   └── document-triage.js       # Análise de documentos
│   └── ai/
│       └── transcription-service.js # Transcrição de reuniões
├── docs/
│   └── env-template.txt             # Template de variáveis de ambiente
├── DEPLOYMENT.md                    # Guia de deploy
└── README.md                        # Este arquivo
```

### 🚀 Quick Start

#### 1. Instalação

```bash
cd crm-juridico
npm install
```

#### 2. Configuração de Ambiente

Copie o template e preencha as variáveis:

```bash
cp docs/env-template.txt .env.local
```

Variáveis necessárias:
- `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`
- `NEXT_PUBLIC_HUBSPOT_FORM_ID`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

#### 3. Executar Localmente

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

#### 4. Build para Produção

```bash
npm run build
npm start
```

### 📋 Configuração HubSpot

Siga o guia completo em `DEPLOYMENT.md` para:

1. Criar Custom Objects (Caso Jurídico, Qualificação)
2. Configurar Pipeline de Negócios
3. Deploy de Serverless Functions
4. Configurar Workflows de automação

### 🎨 Design Highlights

- **Hero Section:** Gradient animado com partículas flutuantes
- **Bento Grid:** Cards com glassmorphism e hover effects
- **Timeline Interativa:** Processo passo a passo animado
- **Formulário Premium:** Validação em tempo real + WhatsApp redirect
- **Mobile-First:** Totalmente responsivo

### 🧪 Testing

```bash
# Run tests
npm test

# Check build
npm run build

# Test serverless functions (requires HubSpot CLI)
cd serverless
hs functions test
```

### 📊 Metrics & KPIs

- ⏱️ Tempo de Resposta: < 5 minutos
- 🎯 Taxa de Conversão: > 30%
- 😊 Satisfação: NPS > 70

### 🔐 Security & Compliance

- ✅ LGPD compliant (consentimento explícito)
- ✅ API keys em variáveis de ambiente
- ✅ HTTPS obrigatório em produção
- ✅ Criptografia de dados sensíveis

### 📚 Documentation

- [Implementation Plan](../implementation_plan.md) - Plano técnico completo
- [Deployment Guide](DEPLOYMENT.md) - Guia de deploy passo a passo
- [Serverless Functions](serverless/README.md) - Documentação de funções IA

### 🤝 Contributing

Este é um MVP. Para melhorias:
1. Revisar implementation_plan.md
2. Criar branch feature
3. Testar localmente
4. Abrir PR com descrição detalhada

### 📞 Support

Para dúvidas técnicas:
- HubSpot API: [developers.hubspot.com](https://developers.hubspot.com)
- Claude AI: [docs.anthropic.com](https://docs.anthropic.com)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)

---

**Desenvolvido com ❤️ e IA Claude Sonnet 4.5**

**Status:** ✅ MVP Ready for Deployment
