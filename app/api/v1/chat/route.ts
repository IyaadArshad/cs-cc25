import { matchTasks } from "./matchTasks";
import OpenAI from "openai";
import { getSystemPrompt } from "./systemPrompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { cookies } = await request.json();
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

  return new Response(systemPrompt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}