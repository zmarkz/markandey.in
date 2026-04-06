import { NextResponse } from "next/server";

const AGENT_FARM_URL = process.env.AGENT_FARM_URL || "http://localhost:8082";
const KNOWLEDGE_STORE_URL = process.env.KNOWLEDGE_STORE_URL || "http://localhost:3010";

async function checkHealth(url: string, timeout = 3000): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    return res.ok;
  } catch {
    return false;
  }
}

export async function GET() {
  const [agentFarm, ollama, ragService] = await Promise.all([
    checkHealth(`${AGENT_FARM_URL}/health`),
    checkHealth("http://localhost:11434/api/tags"),
    checkHealth(`${KNOWLEDGE_STORE_URL}/health`),
  ]);

  return NextResponse.json(
    {
      website: "online",
      agentFarm: agentFarm ? "online" : "offline",
      ollama: ollama ? "online" : "offline",
      ragService: ragService ? "online" : "offline",
      lastChecked: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    }
  );
}
