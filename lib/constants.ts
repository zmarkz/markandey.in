export const SITE = {
  name: "markandey.in",
  title: "Markandey Singh — Director of Engineering",
  description:
    "Director of Engineering at MoneyView. Building systems that scale and AI that thinks.",
  url: "https://markandey.in",
  email: "markandey91@gmail.com",
  linkedin: "https://linkedin.com/in/zmarkz",
  github: "https://github.com/markandey",
  twitter: "https://twitter.com/markandey",
};

export const NAV_LINKS = [
  { href: "/lab", label: "Lab" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/stack", label: "Stack" },
];

export const CAREER: {
  number: string;
  label: string;
  heading: string;
  body: string;
  cards: {
    company: string;
    role: string;
    description: string;
    tags: string[];
  }[];
  stats?: { label: string; value: string }[];
}[] = [
  {
    number: "01",
    label: "THE FOUNDATION",
    heading: "Where I learned how large systems work",
    body: "Started at NTPC, where India's power grid runs on legacy systems that cannot afford to fail. Moved to SAP Labs, building enterprise software at global scale. This is where I developed an obsession with reliability, uptime, and systems that serve millions without anyone noticing.",
    cards: [
      {
        company: "NTPC",
        role: "Development Specialist",
        description: "Power grid systems. Zero margin for error.",
        tags: ["C++", "SCADA", "Embedded"],
      },
      {
        company: "SAP Labs",
        role: "Developer",
        description: "Enterprise platforms serving Fortune 500.",
        tags: ["Java", "ABAP", "Enterprise"],
      },
      {
        company: "Opinio",
        role: "Developer",
        description: "First startup. First taste of building from zero.",
        tags: ["Full-stack", "Node.js"],
      },
    ],
  },
  {
    number: "02",
    label: "THE STARTUP ENGINE",
    heading: "Where I learned to build fast and ship fearlessly",
    body: "CureFit (now cult.fit) was a rocket ship. Backend systems for a health-tech platform scaling to millions of users across fitness, food, and mental wellness. This is where I learned that speed and quality aren't opposites — they're both functions of good architecture.",
    cards: [
      {
        company: "CureFit",
        role: "Lead Developer",
        description:
          "Designed and built backend systems from the ground up.",
        tags: ["Java", "Microservices", "AWS", "Kafka"],
      },
    ],
  },
  {
    number: "03",
    label: "THE SCALE MACHINE",
    heading: "Building the platform that powers India's lending",
    body: "MoneyView is a top-10 Indian fintech. I've grown from IC to Director of Engineering, now leading Operations, Platform, and DevOps. Our systems process millions of loan applications, handle financial data with zero tolerance for errors, and serve users across India.",
    cards: [
      {
        company: "MoneyView",
        role: "Platform Engineering",
        description:
          "Scalability, availability, and cost-efficiency at fintech scale.",
        tags: ["AWS", "DynamoDB", "Redshift"],
      },
      {
        company: "MoneyView",
        role: "DevOps & SRE",
        description:
          "CI/CD pipelines, monitoring, incident response for financial systems.",
        tags: ["Docker", "K8s", "Terraform"],
      },
      {
        company: "MoneyView",
        role: "Engineering Leadership",
        description:
          "Grew from IC → Lead → Manager → Senior Manager → Director.",
        tags: ["Team Building", "Strategy", "Hiring"],
      },
    ],
    stats: [
      { label: "Years at MoneyView", value: "7+" },
      { label: "Growth", value: "IC → Director" },
      { label: "Users served", value: "Millions" },
    ],
  },
  {
    number: "04",
    label: "THE AI LAYER",
    heading: "Where systems learn to think",
    body: "AI isn't a buzzword in my world — it's running in production. I've built intelligent query routing systems that classify user intent and route to the right model (93% to free local models, 7% to paid APIs — saving 76% on costs). I run an MCP Agent Farm for orchestrating AI tools, a RAG pipeline with vector search, and I believe the future of engineering leadership includes knowing how to architect AI-native systems.",
    cards: [
      {
        company: "Personal",
        role: "AI Query Routing",
        description:
          "Smart classification: 93% local, 7% cloud. 76% cost savings.",
        tags: ["Qwen", "Claude", "NLP"],
      },
      {
        company: "Personal",
        role: "MCP Agent Farm",
        description:
          "Orchestration layer for AI agents with tool access.",
        tags: ["MCP", "Agents", "Orchestration"],
      },
      {
        company: "Personal",
        role: "RAG + Knowledge Store",
        description:
          "Vector search over curated knowledge. Semantic retrieval.",
        tags: ["pgvector", "Embeddings", "Ollama"],
      },
    ],
  },
];

export const COMPLEX_KEYWORDS = [
  "analyze",
  "sell",
  "buy",
  "recommend",
  "rebalance",
  "should I",
  "compare",
  "risk",
  "strategy",
  "tax",
  "harvest",
  "what-if",
  "which stock",
  "best",
  "worst",
  "portfolio health",
  "deep dive",
  "outlook",
  "forecast",
  "action plan",
];

export const SIMPLE_KEYWORDS = [
  "what is",
  "how many",
  "show me",
  "list",
  "allocation",
  "explain",
  "define",
  "total value",
  "how much",
  "summary",
  "what does",
  "meaning",
  "sector",
  "count",
];
