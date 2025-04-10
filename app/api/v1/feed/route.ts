export async function GET() {
    try {
        const response = await fetch(
            "https://cdn.query.prod.cms.msn.com/cms/api/amp/search?%20$top=100&$filter=%27$type%27eq%27article%27and%27_locale%27eq%27en-ae%27"
        );
        
        if (!response.ok) {
            return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
                status: response.status,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        
        const data = await response.json();
        
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}