import { matchTasks } from "./matchTasks";

export async function POST(request: Request) {
  const { cookies } = await request.json();
  const { id, tasks }: { id: { name: string; location: string; comingFrom: string }, tasks: { visa: keyof typeof matchTasks.visa, school: keyof typeof matchTasks.school, dlicense: keyof typeof matchTasks.dlicense, insurance: keyof typeof matchTasks.insurance, sim: keyof typeof matchTasks.sim, bank: keyof typeof matchTasks.bank } } = cookies;

  const taskDescriptions: Record<string, string> = {
    visa: matchTasks.visa[tasks.visa],
    school: matchTasks.school[tasks.school],
    dlicense: matchTasks.dlicense[tasks.dlicense],
    insurance: matchTasks.insurance[tasks.insurance],
    sim: matchTasks.sim[tasks.sim],
    bank: matchTasks.bank[tasks.bank],
  };

  const responseText = `The user's details:
    - Name: ${id.name}
    - Location: ${id.location}
    - Coming from ${id.comingFrom}
    The user has completed the following tasks:
    - Visa Status: ${taskDescriptions.visa}
    - School Setup: ${taskDescriptions.school}
    - Drivers license: ${taskDescriptions.dlicense}
    - Medical insurance: ${taskDescriptions.insurance}
    - SIM: ${taskDescriptions.sim}
    - Bank account: ${taskDescriptions.bank}`;


}