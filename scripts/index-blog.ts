/**
 * Index blog content and static knowledge into Knowledge Store for RAG.
 *
 * Usage: npx tsx scripts/index-blog.ts
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const KNOWLEDGE_STORE_URL =
  process.env.KNOWLEDGE_STORE_URL || "http://localhost:3010";
const APP_ID = "markandey-in";
const CONTENT_DIR = path.join(process.cwd(), "content", "thoughts");

async function clearExisting() {
  // The Knowledge Store doesn't have a bulk delete endpoint,
  // so we'll rely on the fact that duplicate entries with same title
  // are acceptable (semantic search ranks by relevance anyway).
  // On re-runs, new entries are added but old ones with same content
  // won't cause issues since embeddings are identical.
  console.log("Note: Re-indexing will add new entries. Duplicates are harmless for search.");
}

async function storeEntry(entry: {
  category: string;
  title: string;
  content: string;
  metadata?: Record<string, unknown>;
}) {
  const res = await fetch(`${KNOWLEDGE_STORE_URL}/store`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      appId: APP_ID,
      ...entry,
      source: "blog-indexer",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to store "${entry.title}": ${res.status} ${text}`);
  }

  const data = await res.json();
  return data;
}

async function indexBlogPosts() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log("No content/thoughts/ directory found. Skipping blog posts.");
    return 0;
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  let count = 0;

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data: frontmatter, content } = matter(raw);

    await storeEntry({
      category: "blog",
      title: frontmatter.title || slug,
      content: content.trim(),
      metadata: {
        slug,
        date: frontmatter.date,
        tags: frontmatter.tags,
        summary: frontmatter.summary,
      },
    });

    console.log(`  Indexed blog: "${frontmatter.title}" (${slug})`);
    count++;
  }

  return count;
}

async function indexStaticKnowledge() {
  const entries = [
    {
      category: "career",
      title: "Markandey Singh — Career Overview",
      content: `Markandey Singh is the Director of Engineering at MoneyView, a top-10 Indian fintech company. He leads Operations, Platform Engineering, and DevOps teams.

Career journey:
- NTPC (2014-2015): Development Specialist — Power grid systems, embedded systems, zero-downtime environments
- SAP Labs India (2015-2017): Developer — Enterprise platforms serving Fortune 500 clients, global-scale software
- Opinio (2017): Developer — First startup experience, full-stack development
- CureFit / cult.fit (2017-2019): Lead Developer — Designed and built backend systems for a health-tech unicorn. Event-driven architecture, microservices at scale with Kafka.
- MoneyView (2019-present): Grew from Individual Contributor → Lead → Engineering Manager → Senior Engineering Manager → Director of Engineering. 7+ years of deepening ownership.

Education: B.Tech in Electronics & Communications Engineering from VIT Vellore (2014).`,
      metadata: { type: "bio" },
    },
    {
      category: "skills",
      title: "Markandey Singh — Technical Skills",
      content: `Technical expertise:
- Cloud: AWS (DynamoDB, Redshift, S3, EC2, RDS, Lambda), Docker, Kubernetes
- Data: Apache Kafka, Apache Storm, event-driven architectures, real-time pipelines
- Languages: Java (primary), Python, JavaScript/TypeScript, C++
- Frameworks: Spring Boot, Node.js/Fastify, React
- DevOps: CI/CD, Terraform, monitoring, incident management
- AI/ML: LLM integration (Claude, Qwen via Ollama), MCP Agent Farm, RAG pipelines with pgvector, intelligent query routing
- Leadership: Team building, hiring, org design, strategy, stakeholder management`,
      metadata: { type: "skills" },
    },
    {
      category: "projects",
      title: "Markandey Singh — AI Projects",
      content: `AI projects built by Markandey:

1. AI Query Routing System: Classifies queries as COMPLEX or SIMPLE using keyword matching. Routes 93% of queries to Qwen 2.5 running locally via Ollama (free), 7% to Claude Sonnet (paid). Achieves 76% cost savings compared to routing everything to Claude. Monthly AI cost: approximately ₹28.

2. MCP Agent Farm: An orchestration layer for AI agents built with Node.js, Fastify, and BullMQ. Manages multiple agent templates, each with different models, system prompts, and tool configurations. Supports streaming SSE responses, async task queuing, and webhook delivery.

3. Knowledge Store with RAG: A semantic search service using pgvector for vector embeddings (nomic-embed-text via Ollama). Stores knowledge entries, supports cosine similarity search, caching, and pre-computed digests.

4. Portfolio Tracker: Full-stack investment dashboard (Spring Boot + React) with AI-powered portfolio analysis, tradebook import, multi-broker support, and structured AI responses.

5. markandey.in: Personal website with interactive terminal hero, AI chat powered by Qwen via Agent Farm, visual career journey, AI Lab demos, and MDX blog.`,
      metadata: { type: "projects" },
    },
    {
      category: "contact",
      title: "Markandey Singh — Contact Information",
      content: `Contact Markandey Singh:
- Email: markandey91@gmail.com
- LinkedIn: linkedin.com/in/zmarkz
- GitHub: github.com/markandey
- Twitter/X: @markandey
- Website: markandey.in
- Location: Bangalore, India`,
      metadata: { type: "contact" },
    },
  ];

  let count = 0;
  for (const entry of entries) {
    await storeEntry(entry);
    console.log(`  Indexed knowledge: "${entry.title}"`);
    count++;
  }

  return count;
}

async function main() {
  console.log(`\nIndexing content into Knowledge Store at ${KNOWLEDGE_STORE_URL}`);
  console.log(`App ID: ${APP_ID}\n`);

  await clearExisting();

  console.log("Indexing blog posts...");
  const blogCount = await indexBlogPosts();

  console.log("\nIndexing static knowledge...");
  const knowledgeCount = await indexStaticKnowledge();

  console.log(
    `\nDone! Indexed ${blogCount} blog posts + ${knowledgeCount} knowledge entries = ${blogCount + knowledgeCount} total.`
  );

  // Verify with a test query
  console.log("\nVerifying with test query...");
  const testRes = await fetch(`${KNOWLEDGE_STORE_URL}/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: "What does Markandey do?",
      appId: APP_ID,
      limit: 3,
    }),
  });
  const testData = await testRes.json();
  console.log(
    `  Search returned ${testData.results?.length || 0} results. Top match: "${testData.results?.[0]?.title}" (${(testData.results?.[0]?.similarity * 100)?.toFixed(0)}% match)`
  );
}

main().catch((err) => {
  console.error("Indexing failed:", err);
  process.exit(1);
});
