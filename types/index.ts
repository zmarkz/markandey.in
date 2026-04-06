export interface TerminalMessage {
  type: "input" | "output" | "system" | "error";
  content: string;
  isTyping?: boolean;
}

export interface CareerEntry {
  company: string;
  role: string;
  description: string;
  tags: string[];
  period?: string;
}

export interface JourneySection {
  number: string;
  label: string;
  heading: string;
  body: string;
  cards: CareerEntry[];
  stats?: { label: string; value: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  content: string;
}

export interface SystemStatus {
  website: string;
  agentFarm: string;
  ollama: string;
  ragService: string;
  uptime?: string;
  lastChecked: string;
}
