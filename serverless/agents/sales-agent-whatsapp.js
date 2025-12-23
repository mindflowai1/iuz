/**
 * HubSpot Serverless Function: Sales Agent WhatsApp
 * Integrates WhatsApp messages with Claude AI for lead qualification
 */

const axios = require('axios');

exports.main = async (context, sendResponse) => {
    try {
        // 1. Extract webhook data
        const { from, message, timestamp } = context.body;

        // 2. Find or create contact in HubSpot
        const contact = await findOrCreateContact(from, context.secrets);

        // 3. Analyze message with Claude AI
        const analysis = await analyzeWithClaude(message, context.secrets.CLAUDE_API_KEY);

        // 4. Update contact properties
        await updateContactProperties(contact.id, {
            area_do_direito: analysis.area_do_direito,
            ultimo_contato: timestamp,
        }, context.secrets);

        // 5. Create Qualificação object
        await createQualificacao({
            contactId: contact.id,
            origem_lead: 'WhatsApp',
            classificacao_dor: analysis.classificacao_dor,
            urgencia_cliente: analysis.urgencia,
            score_qualificacao: analysis.score_qualificacao,
            notas_ia: analysis.insights,
        }, context.secrets);

        // 6. Create Deal if score >= 70
        if (analysis.score_qualificacao >= 70) {
            await createDeal({
                contactId: contact.id,
                pipeline: 'Pipeline Jurídico MVP',
                stage: 'Qualificado',
                area_do_direito: analysis.area_do_direito,
            }, context.secrets);
        }

        // 7. Generate and send response
        const responseMessage = await generateResponse(analysis, context.secrets.CLAUDE_API_KEY);
        await sendWhatsAppMessage(from, responseMessage, context.secrets.WHATSAPP_TOKEN);

        sendResponse({ statusCode: 200, body: { success: true } });
    } catch (error) {
        console.error('Sales agent error:', error);
        sendResponse({ statusCode: 500, body: { error: error.message } });
    }
};

// Utility Functions

async function analyzeWithClaude(message, apiKey) {
    const prompt = `Você é um assistente de qualificação de leads para advocacia.

Analise esta mensagem e retorne JSON:

MENSAGEM: "${message}"

RETORNE:
{
  "area_do_direito": "[Familia|Trabalhista|Previdenciário|Cível|Criminal|Empresarial]",
  "classificacao_dor": "[Descrição sintética]",
  "urgencia": "[Imediata|Curto Prazo|Médio Prazo|Longo Prazo]",
  "score_qualificacao": [0-100],
  "insights": "[Insights sobre o cliente]",
  "proximos_passos": "[Sugestão de próximos passos]"
}`;

    const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1024,
            messages: [{ role: 'user', content: prompt }],
        },
        {
            headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
            },
        }
    );

    return JSON.parse(response.data.content[0].text);
}

async function findOrCreateContact(phoneNumber, secrets) {
    // HubSpot API call to search/create contact
    // Implementation details in implementation_plan.md
    return { id: 'contact_123' }; // Placeholder
}

async function updateContactProperties(contactId, properties, secrets) {
    // HubSpot API call to update contact
    // Implementation details in implementation_plan.md
}

async function createQualificacao(data, secrets) {
    // HubSpot API call to create custom object
    // Implementation details in implementation_plan.md
}

async function createDeal(data, secrets) {
    // HubSpot API call to create deal
    // Implementation details in implementation_plan.md
}

async function generateResponse(analysis, apiKey) {
    // Claude API call to generate friendly response
    return `Olá! Entendemos sua situação sobre ${analysis.area_do_direito}. Um advogado especializado entrará em contato em até 24 horas.`;
}

async function sendWhatsAppMessage(to, message, token) {
    // WhatsApp Business API call
    // Implementation details in implementation_plan.md
}
