export const COMMANDS: Record<string, string> = {
  help: `Available commands:
  about     — Who I am
  career    — Career timeline
  skills    — Technical skills
  contact   — Get in touch
  projects  — Notable projects
  clear     — Clear terminal
  visual    — Scroll to visual section
  lab       — Go to AI Lab
  resume    — Download resume

Or just ask me anything — I'm powered by AI.`,

  about: `I'm Markandey Singh — Director of Engineering at MoneyView, one of India's top-10 fintech companies.

I lead Operations, Platform, and DevOps engineering. I've spent 10+ years building systems that serve millions of users — from power grids to fintech platforms.

On the side, I build AI systems: query routers, agent farms, RAG pipelines. This website itself runs on my own AI infrastructure.`,

  career: `Career Timeline:
  2014-2015  NTPC — Development Specialist (Power grid systems)
  2015-2017  SAP Labs — Developer (Enterprise platforms)
  2017       Opinio — Developer (First startup)
  2017-2019  CureFit — Lead Developer (Health-tech at scale)
  2019-now   MoneyView — IC → Lead → EM → Sr. EM → Director of Engineering`,

  skills: `Languages:    Java (primary), Python, TypeScript, C++
Cloud:        AWS (DynamoDB, Redshift, S3, EC2, Lambda)
Data:         Kafka, Storm, event-driven architectures
DevOps:       Docker, Kubernetes, Terraform, CI/CD
Frameworks:   Spring Boot, Node.js/Fastify, React
AI/ML:        LLM integration, MCP agents, RAG, vector search
Leadership:   Team building, strategy, hiring, org design`,

  contact: `Email:     markandey91@gmail.com
LinkedIn:  linkedin.com/in/zmarkz
GitHub:    github.com/markandey
Twitter:   @markandey`,

  projects: `Notable Projects:
  • AI Query Router — 93% local / 7% cloud routing. 76% cost savings.
  • MCP Agent Farm — Orchestration for AI agents with tool access.
  • RAG Knowledge Store — Vector search + semantic retrieval.
  • Portfolio Tracker — Full-stack investment dashboard with AI insights.
  • markandey.in — This website (you're looking at it).`,

  "sudo rm -rf /": `Nice try 😄 But this terminal is sandboxed. Your hacking skills are noted though.`,
};

export function isBuiltinCommand(input: string): boolean {
  const cmd = input.trim().toLowerCase();
  return cmd in COMMANDS || cmd === "clear" || cmd === "visual" || cmd === "lab" || cmd === "resume";
}

export function getCommandOutput(input: string): string | null {
  const cmd = input.trim().toLowerCase();
  return COMMANDS[cmd] ?? null;
}
