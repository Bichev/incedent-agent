# AI Incident Agent Demo

A visually impressive single-page demo application showcasing an AI-powered SAP Incident Management workflow. Built with Next.js 14, Tailwind CSS, and Framer Motion.

![Demo Preview](doc/preview.png)

## Features

- **3 Demo Scenarios**: Auto-resolve, Assisted Resolution, Escalation
- **9-Step Animated Workflow**: Watch each step execute in real-time
- **Dual Mode**: Simulation (offline) or Live (n8n integration)
- **SLA Dashboard**: Real-time countdown, confidence scores, cost savings
- **Integration Previews**: Jira, Confluence, Slack, Email, Google Sheets

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the demo.

## Demo Scenarios

### 1. Auto-Resolve (Green)
- **Incident**: SAP GUI authorization error (DYNP 138)
- **Confidence**: 92%
- **Outcome**: Automatic resolution with KB documentation
- **Savings**: $60 (2 hours L1 time)

### 2. Assisted Resolution (Yellow)
- **Incident**: Transaction VA01 performance timeout
- **Confidence**: 65%
- **Outcome**: Assigned to L2 analyst with diagnostic hints
- **Savings**: $45 (45 min research time)

### 3. Escalation Required (Red)
- **Incident**: ABAP memory dump in production
- **Confidence**: 35%
- **Outcome**: Escalated to Basis team with full context
- **Savings**: $30 (30 min context gathering)

## Configuration

### Environment Variables

Create a `.env.local` file:

```env
# N8N webhook URL for live mode (optional)
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance/webhook/xxx

# Default mode: 'simulation' or 'live'
NEXT_PUBLIC_MODE=simulation
```

### Live Mode

To enable live n8n integration:

1. Set up your n8n workflow with a webhook trigger
2. Configure the webhook URL in environment variables
3. Toggle to "Live" mode in the UI

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

```bash
# Or deploy via CLI
npx vercel
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── WorkflowVisualizer  # Main workflow display
│   ├── ScenarioSelector    # Scenario cards
│   ├── StepCard            # Individual step
│   ├── ResultsPanel        # Integration results
│   ├── SLADashboard        # Metrics display
│   └── ui/                 # UI primitives
├── lib/                    # Business logic
│   ├── scenarios.ts        # Scenario definitions
│   ├── simulation-engine   # Mock execution
│   └── n8n-client.ts       # Live integration
├── hooks/                  # Custom React hooks
└── types/                  # TypeScript types
```

## Documentation

- [Overview](doc/OVERVIEW.md) - Executive summary and business value
- [Architecture](doc/ARCHITECTURE.md) - Technical architecture details
- [Demo Script](doc/DEMO-SCRIPT.md) - Step-by-step demo walkthrough
- [PRD](doc/PRD1.md) - Product requirements document
- [Web App Spec](doc/DEMO-WEBAPP-SPEC.md) - This application's specification

## License

MIT License - See [LICENSE](LICENSE) for details.

---

**Built by JAX AI Agency** | [Vladimir Bichev](mailto:contact@jaxai.agency)
