import { matchTasks } from "./matchTasks";
import OpenAI from "openai";
import { getSystemPrompt } from "./systemPrompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages, cookies } = await request.json();
    const {
      id,
      tasks,
    }: {
      id: { name: string; location: string; comingFrom: string };
      tasks: {
        visa: keyof typeof matchTasks.visa;
        school: keyof typeof matchTasks.school;
        dlicense: keyof typeof matchTasks.dlicense;
        insurance: keyof typeof matchTasks.insurance;
        sim: keyof typeof matchTasks.sim;
        bank: keyof typeof matchTasks.bank;
      };
    } = cookies;

    const taskDescriptions: Record<string, string> = {
      visa: matchTasks.visa[tasks.visa],
      school: matchTasks.school[tasks.school],
      dlicense: matchTasks.dlicense[tasks.dlicense],
      insurance: matchTasks.insurance[tasks.insurance],
      sim: matchTasks.sim[tasks.sim],
      bank: matchTasks.bank[tasks.bank],
    };

    const systemPrompt = getSystemPrompt(id, taskDescriptions);
    console.log(systemPrompt);

    const allMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: allMessages,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "api_response",
          schema: {
            type: "object",
            required: ["response", "function_calls"],
            properties: {
              response: {
                type: "string",
                description: "Your response",
              },
              function_calls: {
                type: "array",
                items: {
                  enum: [
                    "open_app_talabat",
                    "open_app_careem",
                    "open_app_zomato",
                    "open_app_entertainer",
                    "open_app_tripadvisor",
                    "open_app_visitabudhabi",
                    "open_app_adpolice",
                    "open_app_darb",
                    "open_discover_page",
                    "open_apps",
                    "open_home",
                  ],
                  type: "string",
                },
                description: "A list of functions that you may want to call",
              },
            },
            additionalProperties: false,
          },
          strict: true,
        },
      },
      temperature: 1,
      max_completion_tokens: 16000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return new Response(JSON.stringify(response.choices[0].message), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}