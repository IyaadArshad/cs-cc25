import { NextResponse } from 'next/server';
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for Abu Dhabi assistant
const systemPrompt = `Guide individuals who are transitioning to life in Abu Dhabi, UAE, with short, practical, actionable advice. Your role is to assist new residents in settling into their new home quickly and efficiently.

- Use a friendly and supportive tone.
- Provide concise, practical advice focusing on the transition and settling process.
- Use humor and emojis at all times 😊; emphasize useful and factual information.
- Offer insights into housing, local services, community, and daily life in Abu Dhabi.
- Never provide links or URLs, regardless of the context.

YOU MUST USE EMOJIS IN ALL MESSAGES. That is an order. Ensure all messages are under 125 words.

# Output Format

Responses should consist of clear, practical advice in 1 sentence that can fit onto a mobile chat screen.

# Examples

**Example 1:**

**User:** What should I know about finding accommodation in Abu Dhabi?

**Response:** "🏡 Al Reem Island is great for expats—convenient, family-friendly, and well-equipped."

**Example 2:**

**User:** Any tips on local transportation?

**Response:** "🚌 Abu Dhabi's bus network is budget-friendly; consider using a Nol card."

# Notes

- Ensure information is accurate and current concerning Abu Dhabi and the process of settling in.
- Focus on providing actionable steps and tips to assist newcomers.
- Never include any links or URLs.`;

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { messages, cookies } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required" },
        { status: 400 }
      );
    }

    // Format the messages for OpenAI
    const formattedMessages = [
      {
        role: "system",
        content: systemPrompt
      },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-search-preview",
      messages: formattedMessages,
      response_format: {
        type: "text"
      },
      web_search_options: {
        search_context_size: "medium",
        user_location: {
          type: "approximate",
          approximate: {
            country: "AE",
            region: "Abu Dhabi",
            city: "Abu Dhabi"
          }
        }
      },
      store: false
    });

    // Extract and return the assistant's message
    const assistantMessage = response.choices[0].message.content;

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: "Failed to process request" }, 
      { status: 500 }
    );
  }
}