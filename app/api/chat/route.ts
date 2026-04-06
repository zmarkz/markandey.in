import { NextRequest } from "next/server";

const AGENT_FARM_URL = process.env.AGENT_FARM_URL || "http://localhost:8082";
const AGENT_TEMPLATE_ID = process.env.AGENT_TEMPLATE_ID || "5";

export async function POST(request: NextRequest) {
  const { message, history } = await request.json();

  if (!message || typeof message !== "string") {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const agentRes = await fetch(`${AGENT_FARM_URL}/api/tasks/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        templateId: parseInt(AGENT_TEMPLATE_ID),
        input: {
          messages: [
            ...(history || []).slice(-10),
            { role: "user", content: message },
          ],
        },
        consumerId: "markandey-in",
        streaming: true,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!agentRes.ok || !agentRes.body) {
      throw new Error(`Agent Farm returned ${agentRes.status}`);
    }

    // Pipe the SSE stream through
    const stream = new ReadableStream({
      async start(controller) {
        const reader = agentRes.body!.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
        } catch {
          // Stream ended
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    // Fallback: return a friendly offline message
    const encoder = new TextEncoder();
    const fallbackStream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ token: "AI agent is currently offline. Try one of the built-in commands — type 'help' to see them!" })}\n\n`
          )
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(fallbackStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  }
}
