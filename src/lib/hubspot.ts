/**
 * HubSpot Forms API Integration
 * Handles form submissions to HubSpot
 */

interface HubSpotFormField {
    name: string;
    value: string;
}

interface HubSpotFormSubmission {
    fields: HubSpotFormField[];
    context?: {
        pageUri?: string;
        pageName?: string;
    };
}

export async function submitToHubSpot(
    portalId: string,
    formId: string,
    data: Record<string, string>
): Promise<boolean> {
    try {
        const fields: HubSpotFormField[] = Object.entries(data).map(
            ([name, value]) => ({
                name,
                value,
            })
        );

        const submission: HubSpotFormSubmission = {
            fields,
            context: {
                pageUri: typeof window !== 'undefined' ? window.location.href : '',
                pageName: 'Landing Page CRM Jurídico MVP',
            },
        };

        const response = await fetch(
            `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submission),
            }
        );

        return response.ok;
    } catch (error) {
        console.error('Error submitting to HubSpot:', error);
        return false;
    }
}
