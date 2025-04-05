import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Base system prompt for Abu Dhabi assistant
const baseSystemPrompt = `Guide individuals who are transitioning to life in Abu Dhabi, UAE, with short, practical, actionable advice. Your role is to assist new residents in settling into their new home quickly and efficiently.
- Use a friendly and supportive tone.
- Provide concise, practical advice focusing on the transition and settling process.
- Use humor and emojis at all times 😊
- Never provide links or URLs, regardless of the context.
YOU MUST USE EMOJIS IN ALL MESSAGES. That is an order. Ensure all messages are under 125 words.
Responses should consist of clear, practical advice in 1 sentence that can fit onto a mobile chat screen. Your responses should be oriented towards getting the user finished with a task they are trying to achieve or something from their tasks in their context.
- Ensure information is accurate and current concerning Abu Dhabi and the process of settling in.`;

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

    // Build personalized context from cookies
    let personalContext = "";

    if (cookies && cookies.id) {
      const { name, location, comingFrom } = cookies.id;
      personalContext += `\n\n# User Profile\nName: ${name}\nMoving to: ${location}\nComing from: ${comingFrom}\n`;
    }

    // Process task statuses
    if (cookies && cookies.tasks) {
      const tasks = cookies.tasks;
      personalContext += `\n# User's Current Status\n`;

      // Ignore setup task as requested

      // Visa status
      if (tasks.visa !== "visa-not-confirmed") {
        const visaStatus =
          tasks.visa === "visa-work"
            ? "Has a Work Visa"
            : tasks.visa === "visa-tourist"
            ? "Has a Tourist Visa"
            : "Has another type of visa";
        personalContext += `- Visa: ${visaStatus}\n`;
      }

      // School status
      if (tasks.school !== "school-not-confirmed") {
        const schoolStatus =
          tasks.school === "school-confirmed"
            ? "Has confirmed school for child"
            : tasks.school === "school-nochild"
            ? "Doesn't have children"
            : "Currently finding a school for child";
        personalContext += `- School: ${schoolStatus}\n`;
      }

      // Driver's license status
      if (tasks.dlicense !== "dlicense-not-confirmed") {
        const licenseStatus =
          tasks.dlicense === "dlicense-confirmed"
            ? "Has a UAE driving license"
            : tasks.dlicense === "dlicense-none"
            ? "Doesn't have a driving license"
            : "In process of getting a driving license";
        personalContext += `- Driving: ${licenseStatus}\n`;
      }

      // Insurance status
      if (tasks.insurance !== "insurance-not-confirmed") {
        const insuranceStatus =
          tasks.insurance === "insurance-confirmed"
            ? "Has medical insurance"
            : "Doesn't have medical insurance";
        personalContext += `- Insurance: ${insuranceStatus}\n`;
      }

      // SIM card status
      if (tasks.sim !== "sim-not-confirmed") {
        const simStatus =
          tasks.sim === "sim-confirmed"
            ? "Has a UAE SIM card"
            : tasks.sim === "sim-none"
            ? "Doesn't have a UAE SIM card"
            : "Wants to get a UAE SIM card";
        personalContext += `- Mobile: ${simStatus}\n`;
      }

      // Bank account status
      if (tasks.bank !== "bank-not-confirmed") {
        const bankStatus =
          tasks.bank === "bank-confirmed"
            ? "Has a UAE bank account"
            : tasks.bank === "bank-mid"
            ? "Doesn't have a UAE bank account"
            : "In process of setting up a UAE bank account";
        personalContext += `- Banking: ${bankStatus}\n`;
      }

      // Culture interest
      if (tasks.culture !== "culture-not-confirmed") {
        const cultureStatus =
          tasks.culture === "workshops"
            ? "Interested in cultural workshops"
            : tasks.culture === "events"
            ? "Interested in cultural events"
            : "Interested in combined cultural learning";
        personalContext += `- Culture: ${cultureStatus}\n`;
      }

      // Infrastructure interest
      if (tasks.infrastructure !== "infrastructure-not-confirmed") {
        const infraStatus =
          tasks.infrastructure === "local"
            ? "Focused on local area information"
            : tasks.infrastructure === "city"
            ? "Interested in citywide information"
            : "Interested in transport routes";
        personalContext += `- Infrastructure: ${infraStatus}\n`;
      }
    }

    // Combine base prompt with personalized context
    const enhancedSystemPrompt = `${baseSystemPrompt}${personalContext}`;

    // Format the messages for OpenAI
    const formattedMessages = [
      {
        role: "system",
        content: enhancedSystemPrompt,
      },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-search-preview",
      messages: formattedMessages,
      response_format: {
        type: "text",
      },
      web_search_options: {
        search_context_size: "medium",
        user_location: {
          type: "approximate",
          approximate: {
            country: "AE",
            region: "Abu Dhabi",
            city: "Abu Dhabi",
          },
        },
      },
      store: false,
    });

    // Extract and return the assistant's message
    const assistantMessage = response.choices[0].message.content;

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}