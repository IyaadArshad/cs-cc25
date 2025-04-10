import { news } from './content';

export async function GET() {
    try {
//        const response = await fetch(
  //          "https://cdn.query.prod.cms.msn.com/cms/api/amp/search?%20$top=1000&$filter=%27$type%27eq%27article%27and%27_locale%27eq%27en-ae%27"
    //    );
            const response = await fetch(
          "https://cdn.query.prod.cms.msn.com/cms/api/amp/search?%20$top=5"
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

        // Format MSN API data to match the cleaner format in content.ts
        if (data && Array.isArray(data)) {
            data = data.map(item => {
                // Skip if the item doesn't have required fields
                if (!item._title) return null;
                
                // Format the date
                const publishedDate = item._lastPublishedDateTime ? 
                    new Date(item._lastPublishedDateTime).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }) : '';
                
                // Extract author name if available
                const author = item._authors && item._authors.length > 0 ? 
                    item._authors[0].name : null;
                
                // Generate a link using the ID or use a default
                const link = item._id ? 
                    `https://www.msn.com/article/${item._id}` : '#';
                
                // Extract source name from provider if possible
                const source = item._provider && item._provider.name ? 
                    item._provider.name : 'MSN News';
                
                return {
                    title: item._title,
                    link: link,
                    source: source,
                    date: publishedDate,
                    author: author,
                    position: null,
                    summary: item._abstract || ''
                };
            }).filter(Boolean); // Remove any null entries
            
            // Concatenate the news array with the formatted data from the API
            data = news.concat(data);
            
            // Sort the data array by date in descending order
            data.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
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