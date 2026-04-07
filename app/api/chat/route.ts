import { NextRequest } from "next/server";

const AGENT_FARM_URL = process.env.AGENT_FARM_URL || "http://localhost:8082";
const AGENT_TEMPLATE_ID = process.env.AGENT_TEMPLATE_ID || "5";
const AGENT_FARM_KEY = process.env.AGENT_FARM_KEY || "admin-secret";

export async function POST(request: NextRequest) {
  const { message, history } = await request.json();

  if (!message || typeof message !== "string") {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  // Build context from history for the input prompt
  const contextLines = (history || [])
    .slice(-10)
    .map((m: { role: string; content: string }) =>
      m.role === "user" ? `User: ${m.content}` : `Assistant: ${m.content}`
    );
  contextLines.push(`User: ${message}`);
  const inputPrompt = contextLines.join("\n");

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const agentRes = await fetch(`${AGENT_FARM_URL}/api/tasks/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AGENT_FARM_KEY}`,
      },
      body: JSON.stringify({
        agentTemplateId: parseInt(AGENT_TEMPLATE_ID),
        inputPrompt,
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
      async start(streamController) {
        const reader = agentRes.body!.getReader();
        const encoder = new TextEncoder();
        try {
          const decoder = new TextDecoder();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            // Parse SSE events from Agent Farm and re-emit as our format
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const token = line.slice(6);
                streamController.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ token })}\n\n`
                  )
                );
              }
            }
          }
        } catch {
          // Stream ended
        } finally {
          streamController.enqueue(
            encoder.encode("data: [DONE]\n\n")
          );
          streamController.close();
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
            `data: ${JSON.stringify({ token: "AI is offline right now. But I can still help — try these:\n\n  about     → Who I am\n  career    → My journey so far\n  skills    → What I work with\n  projects  → Things I've built\n  contact   → Get in touch\n  lab       → Interactive AI demos" })}\n\n`
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
