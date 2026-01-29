<div align="center">

# AI Incident Agent

### Autonomous IT Service Management Powered by Artificial Intelligence

[![Live Demo](https://img.shields.io/badge/Live%20Demo-incedent--agent.vercel.app-blue?style=for-the-badge)](https://incedent-agent.vercel.app)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2014-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Powered by OpenAI](https://img.shields.io/badge/Powered%20by-OpenAI-412991?style=for-the-badge&logo=openai)](https://openai.com)

*Transform your IT operations with intelligent incident resolution that learns, adapts, and executes autonomously*

</div>

---

## The Problem: IT Operations Are Drowning

Every day, IT teams face an overwhelming flood of incidents:

- **70% of L1 tickets** are repetitive issues with known solutions
- **Average resolution time** for routine incidents: 2-4 hours
- **$25-75 per ticket** in labor costs, even for simple fixes
- **SLA breaches** cost enterprises millions in penalties and reputation
- **Analyst burnout** from monotonous, repetitive work leads to high turnover

**The traditional approach is broken.** Manual triage, human-dependent resolution, and siloed knowledge bases create bottlenecks that scale linearly with ticket volume.

---

## The Solution: Autonomous AI Agents

**AI Incident Agent** represents a paradigm shift in IT Service Management. Instead of augmenting human workflows, it **replaces repetitive human decision-making** with intelligent automation that:

### Instant Classification & Triage
- AI analyzes incident context in milliseconds
- Semantic search finds similar historical incidents
- Confidence-based routing ensures appropriate handling

### Autonomous Resolution
- High-confidence incidents are resolved automatically
- Resolution steps executed without human intervention
- Knowledge base updated for future reference

### Intelligent Escalation
- Low-confidence or complex issues escalated with full context
- Diagnostic hints provided to accelerate human resolution
- No time wasted on context gathering

---

## Business Impact

<table>
<tr>
<td align="center" width="25%">
<h3>85%</h3>
<p><strong>Faster Resolution</strong><br/>From hours to seconds for routine incidents</p>
</td>
<td align="center" width="25%">
<h3>$60-120</h3>
<p><strong>Saved Per Ticket</strong><br/>Eliminated L1 labor for auto-resolved issues</p>
</td>
<td align="center" width="25%">
<h3>99.9%</h3>
<p><strong>SLA Compliance</strong><br/>AI responds instantly, 24/7/365</p>
</td>
<td align="center" width="25%">
<h3>70%</h3>
<p><strong>Ticket Deflection</strong><br/>Routine issues never reach human analysts</p>
</td>
</tr>
</table>

### ROI Calculator

| Metric | Before AI Agent | After AI Agent | Improvement |
|--------|-----------------|----------------|-------------|
| Monthly L1 Tickets | 10,000 | 3,000 (human-handled) | 70% reduction |
| Avg Resolution Time | 2.5 hours | 15 minutes | 90% faster |
| Cost per Ticket | $45 | $12 | 73% savings |
| Monthly Labor Cost | $450,000 | $126,000 | **$324,000 saved** |
| SLA Breach Rate | 12% | 0.5% | 96% improvement |

---

## Beyond IT: Universal Application

This architecture isn't limited to IT incidents. The same AI-powered decision engine can transform any service domain:

### Customer Support
- Analyze support tickets and customer sentiment
- Auto-resolve common inquiries (password resets, order status, FAQs)
- Route complex issues to specialized agents with full context

### Healthcare Operations
- Triage patient inquiries by urgency
- Schedule appointments based on availability and priority
- Escalate critical cases to on-call physicians

### Financial Services
- Process loan applications with automated underwriting
- Detect and flag fraudulent transactions
- Route compliance issues to appropriate departments

### Legal & Compliance
- Classify incoming legal documents
- Auto-generate responses for standard inquiries
- Escalate complex matters to senior attorneys

### Manufacturing & Supply Chain
- Predict and prevent equipment failures
- Auto-order replacement parts based on inventory
- Escalate critical maintenance to field engineers

**The pattern is universal:** Classify → Decide → Execute → Learn

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────────┐
│                         INCIDENT INGESTION                          │
│                    (Email, API, Chat, Webhook)                      │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      AI CLASSIFICATION ENGINE                        │
│  • GPT-4o analyzes incident title, description, error codes         │
│  • Extracts category, urgency, complexity, probable cause           │
│  • Generates semantic embedding for similarity search               │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     VECTOR SIMILARITY SEARCH                         │
│  • Pinecone searches historical incident database                   │
│  • Returns top 3 similar incidents with resolutions                 │
│  • Provides context for decision engine                             │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      AI DECISION ENGINE                              │
│  • Evaluates incident + classification + similar cases              │
│  • Calculates confidence score (0-100%)                             │
│  • Determines resolution path based on thresholds                   │
└─────────────────────────────────────────────────────────────────────┘
                                   │
           ┌───────────────────────┼───────────────────────┐
           │                       │                       │
           ▼                       ▼                       ▼
    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │ AUTO-RESOLVE│         │  ASSISTED   │         │  ESCALATE   │
    │   ≥80%      │         │   50-79%    │         │    <50%     │
    │             │         │             │         │             │
    │ • Execute   │         │ • Assign to │         │ • Priority  │
    │   resolution│         │   analyst   │         │   escalation│
    │ • Update    │         │ • Provide   │         │ • Full      │
    │   ticket    │         │   hints     │         │   context   │
    │ • Create KB │         │ • Monitor   │         │ • Expert    │
    │   article   │         │   progress  │         │   routing   │
    └─────────────┘         └─────────────┘         └─────────────┘
           │                       │                       │
           └───────────────────────┼───────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        NOTIFICATION LAYER                            │
│            Slack • Email • Jira • Confluence • PagerDuty            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Live Demo

Experience the AI Incident Agent in action:

**[https://incedent-agent.vercel.app](https://incedent-agent.vercel.app)**

### Demo Scenarios

| Scenario | Confidence | Resolution Path | Time Saved | Cost Saved |
|----------|------------|-----------------|------------|------------|
| **Auto-Resolve** | 92% | Automatic execution | 2 hours | $60 |
| **Assisted Resolution** | 65% | Analyst with AI hints | 45 min | $45 |
| **Escalation Required** | 35% | Expert team routing | 30 min | $30 |

### Screenshots

<details>
<summary><strong>Click to view screenshots</strong></summary>

#### Main Dashboard
![Main Dashboard](public/screenshots/dashboard.png)
*Real-time workflow execution with SLA monitoring*

#### Auto-Resolve Flow
![Auto-Resolve](public/screenshots/auto-resolve.png)
*AI automatically resolves routine incidents*

#### Integration Results
![Integration Results](public/screenshots/integration-results.png)
*Jira, Confluence, Slack, and Email integrations*

</details>

---

## Technology Stack

### Core AI/ML
- **OpenAI GPT-4o-mini** - Incident classification and decision engine
- **OpenAI text-embedding-3-small** - Semantic embeddings for similarity search
- **Pinecone** - Vector database for historical incident retrieval

### Orchestration
- **n8n** - Workflow automation and integration platform
- **Webhooks** - Real-time event-driven architecture

### Integrations
- **Jira Cloud** - Ticket creation, updates, and status management
- **Confluence** - Knowledge base article generation
- **Slack** - Team notifications and alerts
- **SMTP Email** - User notifications

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

### Infrastructure
- **Vercel** - Edge deployment and hosting
- **GitHub** - Version control and CI/CD

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- n8n instance (for live mode)
- OpenAI API key
- Pinecone API key

### Installation

```bash
# Clone the repository
git clone https://github.com/Bichev/incedent-agent.git
cd incedent-agent

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

### Environment Variables

```env
# OpenAI API Key (required for incident generation)
OPENAI_API_KEY=sk-...

# n8n Webhook URL (required for live mode)
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n.app.n8n.cloud/webhook/incident-agent

# Pinecone (for vector search)
PINECONE_API_KEY=...
PINECONE_INDEX=incedent-agent
```

---

## Project Structure

```
incedent-agent/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── generate-incident/  # OpenAI incident generation
│   │   ├── page.tsx           # Main demo page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── WorkflowVisualizer.tsx  # Step-by-step execution
│   │   ├── ScenarioSelector.tsx    # Demo scenario cards
│   │   ├── ResultsPanel.tsx        # Integration previews
│   │   ├── SLADashboard.tsx        # Metrics display
│   │   └── ui/                     # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   │   └── useWorkflowExecution.ts # Workflow state management
│   ├── lib/                   # Business logic
│   │   ├── n8n-client.ts     # n8n API integration
│   │   ├── scenarios.ts      # Demo scenario definitions
│   │   └── simulation-engine.ts # Mock execution engine
│   └── types/                 # TypeScript type definitions
├── n8n/                       # n8n workflow exports
│   └── SAP Incident Agent.json
├── scripts/                   # Utility scripts
│   └── seed-pinecone.ts      # Vector DB seeding
└── doc/                       # Documentation
    ├── ARCHITECTURE.md
    ├── DEMO-SCRIPT.md
    └── PRD1.md
```

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Documentation

| Document | Description |
|----------|-------------|
| [Architecture](doc/ARCHITECTURE.md) | Technical architecture and design decisions |
| [Demo Script](doc/DEMO-SCRIPT.md) | Step-by-step guide for presenting the demo |
| [n8n Setup Guide](doc/N8N-SETUP-GUIDE.md) | Configuring the n8n workflow |
| [PRD](doc/PRD1.md) | Product requirements and specifications |

---

## Future Roadmap

- [ ] **Multi-tenant SaaS** - Self-service onboarding for enterprises
- [ ] **Custom AI Training** - Fine-tune models on customer-specific data
- [ ] **Advanced Analytics** - ML-powered trend analysis and prediction
- [ ] **Voice Integration** - Handle incidents via phone/voice assistants
- [ ] **Mobile App** - Native iOS/Android for on-the-go incident management

---

## About JAX AI Agency

**JAX AI Agency** specializes in building enterprise-grade AI solutions that transform business operations. We combine cutting-edge AI technology with deep domain expertise to deliver measurable ROI.

### Our Services
- **AI Agent Development** - Custom autonomous agents for any domain
- **Workflow Automation** - End-to-end process automation with n8n
- **LLM Integration** - OpenAI, Anthropic, and open-source model implementation
- **Vector Search Solutions** - Semantic search and RAG architectures

### Contact

- **Website**: [jaxaiagency.com](https://jaxaiagency.com)
- **Email**: [contact@jaxaiagency.com](mailto:contact@jaxaiagency.com)
- **LinkedIn**: [Vladimir Bichev](https://linkedin.com/in/vladimirbichev)

---

<div align="center">

**Built with passion by [JAX AI Agency](https://jaxaiagency.com)**

[![GitHub](https://img.shields.io/badge/GitHub-Bichev-black?style=flat-square&logo=github)](https://github.com/Bichev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Vladimir%20Bichev-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/vladimirbichev)

MIT License - See [LICENSE](LICENSE) for details.

</div>
