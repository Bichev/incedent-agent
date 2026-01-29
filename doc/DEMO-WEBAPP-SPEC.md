# AI Incident Agent Demo - Web Application Specification

**Version:** 1.0  
**Date:** January 2025  
**Author:** Vladamir Bichev, JAX AI Agency

---

## 1. Overview

This document specifies the web application that demonstrates the SAP Incident Management AI Agent workflow. The application is a single-page React app deployed on Vercel that visualizes the complete incident resolution workflow with animated transitions.

### 1.1 Purpose

- Provide a visually impressive demonstration of AI-powered incident management
- Show real-time workflow execution with step-by-step animations
- Support both simulation mode (offline demo) and live mode (n8n integration)
- Display SLA tracking, confidence scores, and cost savings metrics

### 1.2 Key Features

- **3 Demo Scenarios**: Auto-resolve, Assisted Resolution, Escalation
- **9-Step Workflow Visualization**: Animated step-by-step execution
- **Dual Mode Operation**: Simulation (mock data) or Live (n8n webhook)
- **Real-time Metrics**: SLA countdown, confidence scores, cost savings
- **Integration Previews**: Jira, Confluence, Slack, Email

---

## 2. Technical Architecture

### 2.1 Tech Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js (App Router) | 14.2.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.4.x |
| Animation | Framer Motion | 11.x |
| Icons | Lucide React | 0.300.x |
| Deployment | Vercel | - |

### 2.2 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main demo page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── WorkflowVisualizer.tsx    # Workflow animation
│   ├── ScenarioSelector.tsx      # Scenario picker
│   ├── StepCard.tsx              # Individual step display
│   ├── ResultsPanel.tsx          # Integration results
│   ├── SLADashboard.tsx          # Metrics display
│   ├── ModeToggle.tsx            # Sim/Live toggle
│   └── ui/                       # UI primitives
├── lib/
│   ├── scenarios.ts              # Scenario definitions
│   ├── workflow-steps.ts         # Step configurations
│   ├── simulation-engine.ts      # Mock execution
│   └── n8n-client.ts             # n8n integration
├── hooks/
│   ├── useWorkflowExecution.ts   # Execution state
│   └── useSLATimer.ts            # SLA tracking
└── types/
    └── index.ts                  # TypeScript types
```

---

## 3. User Interface

### 3.1 Layout

The application uses a 3-column responsive layout:

```
+--------------------------------------------------+
|  Header: "AI Incident Agent"    [Mode Toggle]    |
+--------------------------------------------------+
|  Left (3 cols)  |  Center (5 cols)  |  Right (4) |
|                 |                    |            |
|  Scenarios      |  Workflow          |  Results   |
|  - Auto-Resolve |  - Step 1: Trigger |  - Jira    |
|  - Assisted     |  - Step 2: Jira    |  - Conf    |
|  - Escalate     |  - Step 3: AI      |  - Slack   |
|                 |  - Step 4: Search  |  - Email   |
|  SLA Dashboard  |  - Step 5: Decide  |            |
|  - Timer        |  - Step 6: Update  |            |
|  - Confidence   |  - Step 7: KB      |            |
|  - Savings      |  - Step 8: Notify  |            |
|                 |  - Step 9: Done    |            |
|  [Start] [Reset]|                    |            |
+--------------------------------------------------+
```

### 3.2 Responsive Behavior

- **Desktop (lg+)**: 3-column layout as shown above
- **Tablet (md)**: 2-column layout, results panel stacks below
- **Mobile (sm)**: Single column, all sections stack vertically

### 3.3 Visual Design

- **Background**: Animated aurora gradients with floating particles
- **Cards**: Glass-morphism effect with blur and subtle borders
- **Colors**:
  - Success/Auto-resolve: Green (#22c55e)
  - Warning/Assisted: Yellow (#eab308)
  - Error/Escalate: Red (#ef4444)
  - Accent: Blue (#3b82f6) and Purple (#a855f7)

---

## 4. Components

### 4.1 ScenarioSelector

Displays 3 scenario cards with glowing borders on selection.

**Props:**
- `scenarios`: Array of Scenario objects
- `selectedScenario`: Currently selected scenario
- `onSelect`: Callback when scenario is selected
- `disabled`: Disable selection (during execution)

**Features:**
- Bounce animation on hover
- Glowing border based on scenario color
- Expandable details when selected

### 4.2 WorkflowVisualizer

Main workflow display with animated step progression.

**Props:**
- `steps`: Array of WorkflowStep objects
- `currentStepIndex`: Currently executing step
- `isRunning`: Whether workflow is executing
- `scenario`: Selected scenario for context

**Features:**
- Sequential step animation
- Status indicators (pending, running, completed, failed)
- Duration tracking per step
- Result preview for completed steps

### 4.3 StepCard

Individual workflow step display.

**Props:**
- `step`: WorkflowStep object
- `index`: Step position
- `isActive`: Currently executing
- `isComplete`: Workflow finished

**Features:**
- Pulsing animation when active
- Status badge with color coding
- Expandable result section

### 4.4 SLADashboard

Real-time metrics display.

**Metrics Shown:**
- SLA countdown timer with progress bar
- AI confidence score (0-100%)
- Resolution path indicator
- Cost savings calculation
- Total execution time

### 4.5 ResultsPanel

Tabbed display of integration results.

**Tabs:**
1. **Jira**: Ticket preview with status, priority, resolution
2. **Confluence**: KB article preview (auto-resolve only)
3. **Slack**: Message preview with formatting
4. **Email**: Email preview with body content

### 4.6 ModeToggle

Switch between simulation and live mode.

**Modes:**
- **Simulation**: Uses mock data, no external calls
- **Live**: Triggers actual n8n webhook (requires configuration)

---

## 5. Data Models

### 5.1 Scenario

```typescript
interface Scenario {
  id: string
  name: string
  description: string
  icon: string
  color: 'green' | 'yellow' | 'red'
  incident: Incident
  expectedConfidence: number
  expectedPath: 'auto_resolve' | 'assisted' | 'escalate'
  resolution?: string[]
  diagnosticHints?: string[]
  timeSaved: string
  costSaved: string
  slaMinutes: number
}
```

### 5.2 WorkflowStep

```typescript
interface WorkflowStep {
  id: string
  name: string
  description: string
  icon: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  duration?: number
  result?: StepResult
}
```

### 5.3 ExecutionMetrics

```typescript
interface ExecutionMetrics {
  startTime: number | null
  endTime: number | null
  totalDuration: number
  confidenceScore: number
  resolutionPath: string | null
  costSaved: string
  timeSaved: string
  slaStatus: 'on_track' | 'at_risk' | 'breached'
  slaRemainingSeconds: number
}
```

---

## 6. Workflow Steps

The demo visualizes 9 workflow steps:

| # | ID | Name | Description | Sim Duration |
|---|----|------|-------------|--------------|
| 1 | trigger | SAP Incident Trigger | Receive incident via webhook | 0.5-1s |
| 2 | jira-create | Create Jira Task | Create incident ticket | 1-2s |
| 3 | ai-assessment | AI Assessment | GPT-4 classification | 2-4s |
| 4 | pinecone-search | Similar Incident Search | Vector similarity search | 0.8-1.5s |
| 5 | decision | Resolution Decision | Calculate confidence | 1.5-3s |
| 6 | jira-update | Update Jira | Update ticket status | 0.8-1.5s |
| 7 | confluence | Create Confluence KB | Document resolution | 1-2s |
| 8 | notifications | Send Notifications | Slack, Email | 1.5-2.5s |
| 9 | complete | Workflow Complete | Summary and metrics | 0.3-0.5s |

---

## 7. Scenarios

### 7.1 Auto-Resolve (Green)

- **Incident**: Cannot access SAP GUI - DYNP 138 error
- **Component**: SAP Authorization
- **Severity**: Medium
- **Expected Confidence**: 92%
- **Resolution**: Profile regeneration via SU01
- **Time Saved**: 2 hours
- **Cost Saved**: $60

### 7.2 Assisted Resolution (Yellow)

- **Incident**: Transaction VA01 timeout after transport
- **Component**: SAP SD
- **Severity**: High
- **Expected Confidence**: 65%
- **Outcome**: Assigned to L2 analyst with diagnostic hints
- **Time Saved**: 45 minutes
- **Cost Saved**: $45

### 7.3 Escalation Required (Red)

- **Incident**: ABAP memory dump affecting production
- **Component**: SAP Basis
- **Severity**: Critical
- **Expected Confidence**: 35%
- **Outcome**: Escalated to Basis team with context
- **Time Saved**: 30 minutes
- **Cost Saved**: $30

---

## 8. Configuration

### 8.1 Environment Variables

```bash
# N8N webhook URL for live mode
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance/webhook/xxx

# Default mode (optional)
NEXT_PUBLIC_MODE=simulation
```

### 8.2 Vercel Deployment

1. Connect repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy (automatic on push to main)

---

## 9. Usage Guide

### 9.1 Running the Demo

1. **Select Scenario**: Click one of the 3 scenario cards
2. **Review Details**: See incident details, expected outcome
3. **Start Demo**: Click "Start Demo" button
4. **Watch Execution**: Steps animate in sequence
5. **View Results**: Check each integration tab
6. **Reset**: Click "Reset" to run another scenario

### 9.2 Demo Tips

- Allow 15-25 seconds for full workflow execution
- Point out SLA timer during execution
- Highlight confidence score when decision is made
- Show integration results after completion
- Compare outcomes between different scenarios

---

## 10. Future Enhancements

### 10.1 Planned Features

- [ ] Pause/Resume workflow execution
- [ ] Speed control (0.5x, 1x, 2x)
- [ ] Custom scenario editor
- [ ] Dark/Light theme toggle
- [ ] Export demo as video/GIF
- [ ] Real n8n execution tracking

### 10.2 Integration Improvements

- [ ] Live Jira ticket creation preview
- [ ] Actual Slack message formatting
- [ ] Real-time webhook status
- [ ] Error recovery handling

---

## 11. Appendix

### 11.1 Dependencies

```json
{
  "next": "^14.2.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "framer-motion": "^11.0.0",
  "lucide-react": "^0.300.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

### 11.2 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 11.3 Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Performance: > 90

---

**END OF SPECIFICATION**
