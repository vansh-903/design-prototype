export const NAME = "[NAME]";
export const EMAIL = "[EMAIL]";

export const nav = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "demo", label: "Demo" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  headline: ["I build AI agents", "that pick up", "the phone."],
  sub: "Forward deployed engineer. I build AI that does the work.",
  chip: "FDE · Available for work",
  rotating: ["voice agents", "automations", "websites"],
  facts: ["Voice agents", "Automations", "Websites"],
};

export type DemoEvent =
  | { kind: "turn"; who: "agent" | "caller"; text: string }
  | { kind: "tool"; label: string };

export type Lang = "en" | "hi" | "te" | "es";

export const languages: { id: Lang; label: string }[] = [
  { id: "en", label: "English" },
  { id: "hi", label: "हिन्दी" },
  { id: "te", label: "తెలుగు" },
  { id: "es", label: "Español" },
];

export const demoScripts: Record<Lang, DemoEvent[]> = {
  en: [
    { kind: "turn", who: "agent", text: "Hi, you've reached the clinic front desk. How can I help?" },
    { kind: "turn", who: "caller", text: "I need to see a dentist this week. Tuesday evening if possible." },
    { kind: "tool", label: "Checked calendar" },
    { kind: "turn", who: "agent", text: "Tuesday has 4:30 PM or 6:00 PM open. Which works for you?" },
    { kind: "turn", who: "caller", text: "4:30 is good." },
    { kind: "tool", label: "Booked Tue 4:30 PM" },
    { kind: "turn", who: "agent", text: "Done. You're booked for Tuesday at 4:30 PM. I'm texting you a confirmation now." },
    { kind: "tool", label: "Sent SMS confirmation" },
  ],
  hi: [
    { kind: "turn", who: "agent", text: "नमस्ते, आप क्लिनिक के फ्रंट डेस्क से बात कर रहे हैं। मैं क्या मदद कर सकती हूँ?" },
    { kind: "turn", who: "caller", text: "मुझे इस हफ़्ते डेंटिस्ट से मिलना है। हो सके तो मंगलवार शाम।" },
    { kind: "tool", label: "Checked calendar" },
    { kind: "turn", who: "agent", text: "मंगलवार को 4:30 या 6:00 बजे जगह है। कौन-सा ठीक रहेगा?" },
    { kind: "turn", who: "caller", text: "4:30 ठीक है।" },
    { kind: "tool", label: "Booked Tue 4:30 PM" },
    { kind: "turn", who: "agent", text: "हो गया। मंगलवार 4:30 बजे आपकी अपॉइंटमेंट पक्की है। कन्फ़र्मेशन SMS भेज रही हूँ।" },
    { kind: "tool", label: "Sent SMS confirmation" },
  ],
  te: [
    { kind: "turn", who: "agent", text: "నమస్కారం, క్లినిక్ ఫ్రంట్ డెస్క్ నుండి మాట్లాడుతున్నాం. మీకు ఎలా సహాయం చేయగలను?" },
    { kind: "turn", who: "caller", text: "ఈ వారం డెంటిస్ట్‌ని కలవాలి. వీలైతే మంగళవారం సాయంత్రం." },
    { kind: "tool", label: "Checked calendar" },
    { kind: "turn", who: "agent", text: "మంగళవారం 4:30 లేదా 6:00కి ఖాళీ ఉంది. ఏది సరిపోతుంది?" },
    { kind: "turn", who: "caller", text: "4:30 బాగుంది." },
    { kind: "tool", label: "Booked Tue 4:30 PM" },
    { kind: "turn", who: "agent", text: "అయిపోయింది. మంగళవారం 4:30కి మీ అపాయింట్‌మెంట్ బుక్ అయింది. కన్ఫర్మేషన్ SMS పంపుతున్నాను." },
    { kind: "tool", label: "Sent SMS confirmation" },
  ],
  es: [
    { kind: "turn", who: "agent", text: "Hola, habla la recepción de la clínica. ¿En qué puedo ayudarle?" },
    { kind: "turn", who: "caller", text: "Necesito ver al dentista esta semana. El martes por la tarde, si se puede." },
    { kind: "tool", label: "Checked calendar" },
    { kind: "turn", who: "agent", text: "El martes hay hueco a las 4:30 o a las 6:00. ¿Cuál le viene mejor?" },
    { kind: "turn", who: "caller", text: "A las 4:30, perfecto." },
    { kind: "tool", label: "Booked Tue 4:30 PM" },
    { kind: "turn", who: "agent", text: "Listo. Queda reservado el martes a las 4:30. Le envío la confirmación por SMS." },
    { kind: "tool", label: "Sent SMS confirmation" },
  ],
};

export const demoSummary = [
  { k: "Outcome", v: "Appointment booked" },
  { k: "Duration", v: "0:48" },
  { k: "Sentiment", v: "Positive" },
  { k: "Next step", v: "Reminder SMS on Monday, 6 PM" },
];

export const builds = [
  {
    title: "Voice agents",
    what: "Phone and web agents that answer, qualify, book and follow up.",
    get: "Calls handled around the clock, each one transcribed and scored.",
  },
  {
    title: "Automations",
    what: "Workflows that move data between your tools and use an LLM where a judgement call is needed.",
    get: "The repetitive steps run without someone watching them.",
  },
  {
    title: "Websites",
    what: "Marketing sites and internal dashboards in Next.js.",
    get: "A fast site you can edit, deployed and monitored.",
  },
  {
    title: "AI evaluation",
    what: "Test suites that score prompts and models on accuracy, relevance and cost.",
    get: "Numbers to pick a model with, instead of guesses.",
  },
];

export type CaseVisualKind = "review" | "roleplay" | "latency" | "models";

export const cases: {
  descriptor: string;
  title: string;
  context: string;
  built: string;
  result: string;
  metric: { from?: number; to: number; prefix?: string; suffix: string; label: string; text?: string };
  stack: string[];
  visual: CaseVisualKind;
}[] = [
  {
    descriptor: "B2B sales platform",
    title: "Sales-call review in 2 minutes",
    context: "Managers spent hours listening back to recorded sales calls.",
    built: "An automated assessment that scores talk ratio, pace and filler words against an LLM competency rubric.",
    result: "Each call gets a scored review in about 2 minutes, with no manager time.",
    metric: { to: 2, suffix: " min", label: "per review, down from hours" },
    stack: ["OpenAI", "TypeScript", "Postgres"],
    visual: "review",
  },
  {
    descriptor: "B2B sales platform",
    title: "Role-play agents for sales practice",
    context: "Reps needed realistic buyers to practise on before live calls.",
    built: "ElevenLabs voice agents with custom personas, plus an evaluation suite that scores conversation quality and scenario adherence.",
    result: "Reps practise against realistic buyers, and each call is scored on quality and scenario adherence.",
    metric: { to: 2, suffix: " scores", label: "per practice call" },
    stack: ["ElevenLabs", "OpenAI", "Next.js", "Supabase"],
    visual: "roleplay",
  },
  {
    descriptor: "B2B sales platform",
    title: "P95 latency from 30s to 3s",
    context: "Three dashboard endpoints took 30 seconds at P95.",
    built: "Removed N+1 Prisma queries and moved the aggregation into Postgres.",
    result: "The same endpoints answer in 3 seconds at P95.",
    metric: { from: 30, to: 3, suffix: "s", label: "P95, down from 30s" },
    stack: ["Prisma", "Postgres", "Node"],
    visual: "latency",
  },
  {
    descriptor: "B2B sales platform",
    title: "Model analytics on 8 KPIs",
    context: "The team was choosing models without data.",
    built: "A dashboard comparing GPT-5.1, o3 and o4-mini on 8 KPIs with daily and monthly aggregation, plus a PromptFoo suite benchmarking GPT, Claude and Gemini.",
    result: "Model choices are made on accuracy, relevance and cost numbers.",
    metric: { to: 8, suffix: " KPIs", label: "tracked per model" },
    stack: ["PromptFoo", "OpenAI", "Claude", "Gemini"],
    visual: "models",
  },
];

export const projects = [
  {
    name: "MCP Context Bridge",
    line: "An MCP server and Chrome extension that moves conversation memory between ChatGPT, Claude and Gemini.",
    meta: "vansh-903/context-mcp · TypeScript · 80–85% compression · versioned snapshots",
    href: "https://github.com/vansh-903/context-mcp",
  },
  {
    name: "Alpha",
    line: "A local-first AI app builder that runs on multiple LLM providers, including Ollama.",
    meta: "vansh-903/alpha · Ollama · Supabase",
    href: "https://github.com/vansh-903",
  },
  {
    name: "LocateME",
    line: "Real-time location tracking over WebSockets on Google Maps.",
    meta: "vansh-903/locateme · WebSockets · Google Maps",
    href: "https://github.com/vansh-903",
  },
  {
    name: "GoBeyond",
    line: "A travel itinerary planner.",
    meta: "vansh-903/gobeyond · Firebase",
    href: "https://github.com/vansh-903",
  },
];

export const services = [
  {
    name: "Consult",
    line: "I map one workflow and tell you what an agent can take over.",
    included: ["Workflow walkthrough with your team", "Feasibility and running-cost estimate", "Build plan"],
    get: "A written plan you can act on, with or without me.",
    first: "A 30-minute call",
  },
  {
    name: "Build",
    line: "I build the agent or automation inside your stack.",
    included: ["Prototype on your real data", "Integrations with your tools", "Evaluation suite", "Deployment"],
    get: "A working system in production, with tests.",
    first: "A scoped prototype",
  },
  {
    name: "Run",
    line: "I stay on to monitor, tune and extend it.",
    included: ["Call and output review", "Prompt and model updates", "Cost tracking", "New features"],
    get: "A system that keeps improving after launch.",
    first: "A monthly check-in",
  },
];

export const steps = [
  { title: "Map the workflow", line: "I sit with the people who do the work and write down every step." },
  { title: "Prototype in days", line: "A working version on real data, so you judge it on results." },
  { title: "Ship into your stack", line: "Connected to your phone system, CRM and tools, with tests." },
  { title: "Run and improve", line: "Every call and run is logged and scored. I fix what the scores show." },
];

export const stack = [
  "ElevenLabs",
  "OpenAI",
  "Claude",
  "Gemini",
  "Next.js",
  "TypeScript",
  "Supabase",
  "Postgres",
  "Pinecone",
  "PromptFoo",
];

export const about = [
  "I'm a forward deployed engineer.",
  "Forward deployed means I work inside your team's actual workflow, not from a spec passed over a wall.",
  "I build voice agents because a lot of business still happens on the phone, and most calls follow a script an agent can learn.",
  "Before this I was a founding engineer at a B2B sales platform, where I shipped voice agents and LLM evaluation to production.",
];

export const contact = {
  headline: ["Have a workflow that", "should run itself?"],
  needs: ["Consult", "Build", "Run", "Not sure"],
};

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/im-vansharora" },
  { label: "GitHub", href: "https://github.com/vansh-903" },
];
