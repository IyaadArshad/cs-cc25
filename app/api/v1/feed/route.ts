import { news } from './content';

export async function GET() {
    try {
        // Simply return the news array from content.ts without any MSN data
        return new Response(JSON.stringify(news), {
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