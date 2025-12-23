/**
 * HubSpot Serverless Function: Document Triage
 * Analyzes legal documents using Claude Vision + NLP
 */

const axios = require('axios');

exports.main = async (context, sendResponse) => {
    try {
        const { from, mediaUrl, mediaType, contactId } = context.body;

        // 1. Download media file
        const fileBuffer = await downloadMedia(mediaUrl, context.secrets.WHATSAPP_TOKEN);

        // 2. Convert to Base64
        const base64File = fileBuffer.toString('base64');

        // 3. Analyze with Claude Vision
        const visionAnalysis = await analyzeDocumentWithVision(
            base64File,
            mediaType,
            context.secrets.CLAUDE_API_KEY
        );

        // 4. Legal analysis
        const legalAnalysis = await analyzeLegalDocument(
            visionAnalysis.extractedText,
            context.secrets.CLAUDE_API_KEY
        );

        // 5. Create high-priority task
        await createHighPriorityTask(
            {
                contactId,
                title: `URGENTE: Analisar ${legalAnalysis.documentType} - ${from}`,
                description: legalAnalysis.executiveSummary,
                priority: 'HIGH',
                dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours
            },
            context.secrets
        );

        // 6. Add note to contact
        await addNoteToContact(contactId, {
            note: `## 📄 Documento Recebido\n\n${legalAnalysis.executiveSummary}`,
        }, context.secrets);

        sendResponse({
            statusCode: 200,
            body: { success: true, documentType: legalAnalysis.documentType },
        });
    } catch (error) {
        console.error('Document triage error:', error);
        sendResponse({ statusCode: 500, body: { error: error.message } });
    }
};

async function analyzeDocumentWithVision(base64File, mediaType, apiKey) {
    const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
            model: 'claude-sonnet-4-20250514',
            max_tokens: 4096,
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'image',
                            source: {
                                type: 'base64',
                                media_type: mediaType,
                                data: base64File,
                            },
                        },
                        {
                            type: 'text',
                            text: 'Extraia TODO o texto deste documento usando OCR. Identifique tipo de documento, datas, nomes, protocolos.',
                        },
                    ],
                },
            ],
        },
        {
            headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
            },
        }
    );

    return { extractedText: response.data.content[0].text };
}

async function analyzeLegalDocument(extractedText, apiKey) {
    const prompt = `Analise este documento jurídico:

${extractedText}

Retorne JSON:
{
  "documentType": "[Tipo]",
  "executiveSummary": "[Resumo 200-300 palavras]",
  "extractedData": {
    "datas_importantes": [],
    "partes_envolvidas": [],
    "valores_mencionados": [],
    "cid_diagnostico": "",
    "protocolos": []
  },
  "insights": "[Insights jurídicos]",
  "urgencia": "[Baixa|Média|Alta|Crítica]"
}`;

    const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2048,
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

async function downloadMedia(url, token) {
    // WhatsApp media download
    return Buffer.from(''); // Placeholder
}

async function createHighPriorityTask(data, secrets) {
    // HubSpot API implementation
}

async function addNoteToContact(contactId, note, secrets) {
    // HubSpot API implementation
}
