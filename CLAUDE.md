# markandey.in — Personal Website

## Overview
Personal website and AI-powered portfolio for Markandey Singh, Director of Engineering at MoneyView. Features an interactive terminal hero with AI chat (Qwen via Agent Farm), visual career journey with scroll animations, AI Lab with interactive demos, and a blog powered by MDX.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4 with @tailwindcss/typography
- **Animations**: Framer Motion 12.x
- **Blog**: MDX via next-mdx-remote + gray-matter
- **Icons**: Lucide React
- **AI**: Qwen 2.5 via Ollama, routed through MCP Agent Farm

## How to Run Locally
```bash
cd ~/Documents/claude/applications/markandey-in
nvm use 20
npm install
npm run dev          # http://localhost:3000
```

With AI chat (requires Agent Farm):
```bash
cd ~/Documents/claude/platform
docker compose up -d agent-farm
```

## Project Structure
```
app/                  # Next.js App Router pages
  api/chat/           # AI chat SSE proxy to Agent Farm
  api/status/         # Health check endpoint
  api/thoughts/       # Blog listing API
  lab/                # AI Lab demos (query-router, rag, agents)
  thoughts/           # Blog listing + [slug] MDX pages
  stack/              # Infrastructure transparency page
components/
  terminal/           # Interactive terminal (hero section)
  journey/            # Career scroll story sections
  lab/                # Lab demo components
  blog/               # Blog post components
  layout/             # Navigation, Footer
  shared/             # Reveal, Badge, GradientText, etc.
content/thoughts/     # MDX blog posts
lib/                  # Utilities (mdx parser, query classifier, constants)
types/                # TypeScript interfaces
```

## Database
None — this is a static site with AI chat proxied through Agent Farm.

## API Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| POST | /api/chat | AI chat (SSE proxy to Agent Farm) |
| GET | /api/status | System health check |
| GET | /api/thoughts | Blog post listing |

## Environment Variables
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| AGENT_FARM_URL | No | http://localhost:8082 | Agent Farm endpoint |
| AGENT_TEMPLATE_ID | No | 5 | Markandey AI agent template |
| SITE_URL | No | https://markandey.in | Canonical URL |
| KNOWLEDGE_STORE_URL | No | http://localhost:3010 | RAG service URL |

## Key Patterns & Conventions
- Dark theme only (bg-[#0a0a0f])
- JetBrains Mono for headings/code/terminal, Inter for body text
- Framer Motion for scroll-triggered animations
- Terminal commands are defined in `components/terminal/commands.ts`
- Career data is in `lib/constants.ts`
- Blog posts are MDX files in `content/thoughts/`
- AI chat gracefully degrades when Agent Farm is offline

## Integration Points
- **Agent Farm** (port 8082): AI chat via POST /api/tasks/stream
- **Knowledge Store** (port 3010): RAG playground (optional)
- **Ollama** (port 11434): Health check only (AI calls go through Agent Farm)

## Common Tasks
- **Add a blog post**: Create `.mdx` file in `content/thoughts/` with frontmatter
- **Add a terminal command**: Add to `components/terminal/commands.ts`
- **Add a career section**: Add to `CAREER` array in `lib/constants.ts`
- **Build for production**: `npm run build` (output: standalone)
- **Run in Docker**: `docker build -t markandey-in . && docker run -p 5175:5175 markandey-in`
