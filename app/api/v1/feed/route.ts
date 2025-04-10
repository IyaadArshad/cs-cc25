import { news } from './content';

export async function GET() {
    try {
//        const response = await fetch(
  //          "https://cdn.query.prod.cms.msn.com/cms/api/amp/search?%20$top=1000&$filter=%27$type%27eq%27article%27and%27_locale%27eq%27en-ae%27"
    //    );
            const response = await fetch(
          "https://cdn.query.prod.cms.msn.com/cms/api/amp/search?%20$top=200"
        );
        
        if (!response.ok) {
            return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
                status: response.status,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        
        let data = await response.json();

        // Concatenate the news array with the data from the API
        if (data && Array.isArray(data)) {
            data = news.concat(data);
            
            // Sort the data array by _lastPublishedDateTime in descending order
            data.sort((a, b) => {
                const dateA = new Date(a._lastPublishedDateTime || a.date);
                const dateB = new Date(b._lastPublishedDateTime || b.date);
                return dateB.getTime() - dateA.getTime(); // Sort in descending order
            });
        }
        
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