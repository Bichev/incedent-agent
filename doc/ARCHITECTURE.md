# Architecture Document
## SAP Incident Management AI Agent

**Version:** 1.0  
**Date:** January 2025  
**Author:** Vladamir Bichev, JAX AI Agency  

---

## 1. System Architecture Overview

### 1.1 High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         INCIDENT SOURCE                          │
│                    (Simulated SAP System)                        │
│                                                                  │
│                   [Postman/cURL] → HTTP POST                     │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             │ JSON Payload
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                      ORCHESTRATION LAYER                         │
│                           (n8n)                                  │
│                                                                  │
│  ┌────────────┐   ┌──────────────┐   ┌────────────────┐       │
│  │  Webhook   │──▶│ Workflow     │──▶│  Integration   │       │
│  │  Trigger   │   │ Orchestrator │   │    Nodes       │       │
│  └────────────┘   └──────────────┘   └────────────────┘       │
└────────────────────────────┬─────────────────────────────────────┘
                             │
               ┌─────────────┼──────────────┐
               │             │              │
               ▼             ▼              ▼
┌──────────────────┐ ┌─────────────┐ ┌──────────────┐
│   AI SERVICES    │ │  TICKET     │ │  KNOWLEDGE   │
│                  │ │  SYSTEM     │ │  BASE        │
│  ┌────────────┐  │ │             │ │              │
│  │  OpenAI    │  │ │   Jira      │ │  Confluence  │
│  │  - GPT-4   │  │ │   Cloud     │ │  Cloud       │
│  │  - Embed   │  │ │             │ │              │
│  └────────────┘  │ └─────────────┘ └──────────────┘
│                  │
│  ┌────────────┐  │
│  │ Pinecone   │  │
│  │ (Vectors)  │  │
│  └────────────┘  │
└──────────────────┘
               │
               │ Results
               ▼
┌──────────────────────────────────────────────────────────────────┐
│                      NOTIFICATION LAYER                          │
│                                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────────┐             │
│  │  Slack   │    │  Email   │    │ Google       │             │
│  │  Webhook │    │  SMTP    │    │ Sheets API   │             │
│  └──────────┘    └──────────┘    └──────────────┘             │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Architecture

### 2.1 n8n Workflow Engine

**Role:** Central orchestration and workflow management

**Capabilities:**
- HTTP webhook endpoint
- Visual workflow builder
- Native integrations (100+ services)
- Code execution (JavaScript/Python)
- Credential management
- Error handling and retries
- Scheduling and triggers

**Deployment:**
- Self-hosted on local machine
- Docker container OR npm install
- Port: 5678 (localhost)
- Data persistence: SQLite or PostgreSQL

**Configuration:**
```bash
# Environment Variables
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=<password>
N8N_HOST=localhost
N8N_PORT=5678
N8N_PROTOCOL=http
```

---

### 2.2 OpenAI API Integration

**Role:** AI-powered classification, analysis, and decision-making

**Models Used:**

**1. GPT-4 (gpt-4-turbo-preview)**
- **Use Case:** Classification and decision engine
- **Input:** Incident details + context
- **Output:** JSON structured responses
- **Cost:** ~$0.01 per 1K input tokens, ~$0.03 per 1K output tokens

**2. text-embedding-3-small**
- **Use Case:** Create vector embeddings for similarity search
- **Input:** Incident text (title + description + error code)
- **Output:** 1536-dimensional vector
- **Cost:** ~$0.00002 per 1K tokens

**API Configuration:**
```javascript
// n8n OpenAI Credential
{
  "api_key": "sk-proj-...",
  "organization_id": "" // optional
}

// Classification Request
{
  "model": "gpt-4-turbo-preview",
  "messages": [
    {
      "role": "system",
      "content": "You are an SAP incident analyst..."
    },
    {
      "role": "user",
      "content": "Analyze this incident: ..."
    }
  ],
  "temperature": 0.3, // Lower = more deterministic
  "response_format": { "type": "json_object" }
}

// Embedding Request
{
  "model": "text-embedding-3-small",
  "input": "User cannot login - authorization error DYNP 138",
  "encoding_format": "float"
}
```

**Rate Limits:**
- GPT-4: 10,000 tokens/min (sufficient for demo)
- Embeddings: 3,000,000 tokens/min

---

### 2.3 Pinecone Vector Database

**Role:** Semantic similarity search for historical incidents

**Index Configuration:**
```json
{
  "name": "sap-incidents",
  "dimension": 1536,
  "metric": "cosine",
  "pod_type": "starter",
  "pods": 1,
  "replicas": 1
}
```

**Vector Structure:**
```json
{
  "id": "INC000123",
  "values": [0.023, -0.891, 0.445, ...], // 1536 dimensions
  "metadata": {
    "title": "Authorization Error DYNP 138",
    "description": "User unable to access...",
    "error_code": "DYNP 138",
    "component": "SAP Authorization",
    "severity": "Medium",
    "resolution": "1. Open transaction SU01...",
    "root_cause": "Profile not synchronized...",
    "resolution_time": "30 minutes",
    "category": "Access/Authorization"
  }
}
```

**Query Operation:**
```javascript
// POST https://sap-incidents-abc123.svc.us-east-1-aws.pinecone.io/query
{
  "vector": [0.021, -0.889, 0.443, ...], // New incident embedding
  "topK": 3,
  "includeMetadata": true,
  "namespace": ""
}

// Response
{
  "matches": [
    {
      "id": "INC000123",
      "score": 0.95, // Cosine similarity (0-1)
      "metadata": { /* full metadata */ }
    },
    // ... top 3 matches
  ]
}
```

**Performance:**
- Query latency: <100ms (p99)
- Index size: 6 vectors (demo), scales to millions
- Free tier: 100K vectors, 1 pod

---

### 2.4 Jira Integration

**Role:** Incident ticket tracking and management

**API Endpoint:** `https://<your-domain>.atlassian.net/rest/api/3/`

**Authentication:**
```
Method: Basic Auth
Username: your-email@example.com
Password: <API Token from Atlassian Account>
```

**Key Operations:**

**1. Create Issue**
```json
// POST /rest/api/3/issue
{
  "fields": {
    "project": { "key": "SAP" },
    "issuetype": { "name": "Incident" },
    "summary": "Cannot access SAP GUI",
    "description": {
      "type": "doc",
      "version": 1,
      "content": [
        {
          "type": "paragraph",
          "content": [
            { "type": "text", "text": "Incident ID: INC001234..." }
          ]
        }
      ]
    },
    "priority": { "name": "Medium" },
    "customfield_10050": "DYNP 138" // Error Code
  }
}
```

**2. Update Issue**
```json
// PUT /rest/api/3/issue/{issueIdOrKey}
{
  "fields": {
    "status": { "name": "Resolved" },
    "resolution": { "name": "Done" },
    "customfield_10051": 92 // Confidence Score
  }
}
```

**3. Add Comment**
```json
// POST /rest/api/3/issue/{issueIdOrKey}/comment
{
  "body": {
    "type": "doc",
    "version": 1,
    "content": [
      {
        "type": "paragraph",
        "content": [
          { "type": "text", "text": "Auto-resolved by AI Agent..." }
        ]
      }
    ]
  }
}
```

**Custom Fields Required:**
- Error Code (Text)
- Component (Select)
- Severity (Select)
- Confidence Score (Number)
- AI Analysis (Text)

---

### 2.5 Confluence Integration

**Role:** Knowledge base documentation

**API Endpoint:** `https://<your-domain>.atlassian.net/wiki/rest/api/`

**Authentication:** Same as Jira (Basic Auth)

**Key Operations:**

**1. Create Page**
```json
// POST /rest/api/content
{
  "type": "page",
  "title": "INC000123 - Authorization Error DYNP 138",
  "space": { "key": "SAPKB" },
  "body": {
    "storage": {
      "value": "<h2>Incident Details</h2><ul><li>...</li></ul>...",
      "representation": "storage"
    }
  }
}
```

**2. Get Page URL**
```javascript
// Response includes links
{
  "id": "123456",
  "_links": {
    "base": "https://your-domain.atlassian.net/wiki",
    "webui": "/spaces/SAPKB/pages/123456/INC000123",
    "self": "https://your-domain.atlassian.net/wiki/rest/api/content/123456"
  }
}
```

**HTML Content Structure:**
```html
<h2>📋 Incident Details</h2>
<ul>
  <li><strong>Incident ID:</strong> INC000123</li>
  <li><strong>Error Code:</strong> DYNP 138</li>
</ul>

<h2>🔍 Problem Description</h2>
<p>User unable to access SAP GUI...</p>

<h2>✅ Resolution Steps</h2>
<ol>
  <li>Open transaction SU01</li>
  <li>Enter username</li>
  <li>...</li>
</ol>
```

---

### 2.6 Slack Integration

**Role:** Real-time team notifications

**Integration Type:** Incoming Webhook

**Setup:**
1. Create Slack workspace (free)
2. Create channel (e.g., #incident-alerts)
3. Add Incoming Webhook app
4. Get webhook URL: `https://hooks.slack.com/services/T00/B00/XXX`

**Message Format (Slack Block Kit):**
```json
{
  "channel": "#incident-alerts",
  "username": "SAP Incident Agent",
  "icon_emoji": ":robot_face:",
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*✅ Auto-Resolved:* INC001234\n\n*Incident:* Cannot access SAP GUI\n*Confidence:* 92%"
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Resolution Applied:*\n1. Open transaction SU01\n2. Enter username\n..."
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": { "type": "plain_text", "text": "View Ticket" },
          "url": "https://jira.atlassian.net/browse/SAP-123"
        },
        {
          "type": "button",
          "text": { "type": "plain_text", "text": "View KB" },
          "url": "https://confluence.atlassian.net/wiki/..."
        }
      ]
    }
  ]
}
```

**Message Types:**
- **Auto-Resolved:** Green emoji, success message
- **Assisted:** Yellow emoji, analyst assignment
- **Escalated:** Red emoji, urgent alert with @mentions

---

### 2.7 Email Integration

**Role:** User communication and notifications

**Protocol:** SMTP (Gmail recommended for demo)

**Gmail Configuration:**
```javascript
// n8n SMTP Credential
{
  "user": "your-email@gmail.com",
  "password": "<App Password>", // Not regular password
  "host": "smtp.gmail.com",
  "port": 587,
  "secure": false, // Use STARTTLS
  "auth_type": "LOGIN"
}
```

**Email Template:**
```html
Subject: Incident {{incident_id}} - Resolved

<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif;">
  <h2>Your incident has been resolved</h2>
  
  <p><strong>Incident ID:</strong> {{incident_id}}</p>
  <p><strong>Title:</strong> {{title}}</p>
  
  <h3>Resolution Steps:</h3>
  <ol>
    {{#each resolution_steps}}
    <li>{{this}}</li>
    {{/each}}
  </ol>
  
  <p><strong>Estimated Time:</strong> {{resolution_time}}</p>
  
  <p>
    <a href="{{jira_link}}">View Ticket</a> | 
    <a href="{{kb_link}}">View Documentation</a>
  </p>
  
  <p>If you need further assistance, please reply to this email.</p>
  
  <p>Best regards,<br>IT Support Team</p>
</body>
</html>
```

---

### 2.8 Google Sheets Integration

**Role:** Metrics logging and reporting

**API:** Google Sheets API v4

**Authentication:** OAuth 2.0 (n8n handles flow)

**Spreadsheet Structure:**
```
| Timestamp           | Incident ID | Title              | Component | Severity | Status        | Confidence | Resolution Time | Cost Saved |
|---------------------|-------------|--------------------|-----------| ---------|---------------|------------|----------------|-----------|
| 2025-01-27 10:30:00 | INC001234   | Cannot access SAP  | Auth      | Medium   | Auto-Resolved | 92%        | 30 minutes     | $60       |
| 2025-01-27 10:35:00 | INC001235   | VA01 slow          | SD        | High     | Assisted      | 65%        | 2 hours        | $45       |
```

**Append Operation:**
```javascript
// POST https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:append
{
  "range": "Sheet1!A:I",
  "values": [
    [
      new Date().toISOString(),
      "INC001234",
      "Cannot access SAP GUI",
      "SAP Authorization",
      "Medium",
      "Auto-Resolved",
      "92%",
      "30 minutes",
      "$60"
    ]
  ]
}
```

**Dashboard Formulas:**
```excel
// Total Incidents
=COUNTA(B2:B1000)

// Auto-Resolved Count
=COUNTIF(F2:F1000,"Auto-Resolved")

// Total Cost Saved
=SUMPRODUCT(VALUE(SUBSTITUTE(I2:I1000,"$","")))

// Average Confidence
=AVERAGE(VALUE(SUBSTITUTE(G2:G1000,"%","")))
```

---

## 3. Data Flow Architecture

### 3.1 Detailed Workflow Sequence

**Step-by-Step Data Flow:**

```
1. WEBHOOK RECEIVE
   Input: JSON payload via HTTP POST
   Output: Parsed incident object
   Duration: <1 second
   
2. JIRA CREATE
   Input: Incident object
   API: POST /rest/api/3/issue
   Output: Jira issue key (e.g., "SAP-123")
   Duration: 1-2 seconds
   
3. OPENAI CLASSIFICATION
   Input: Incident title + description
   API: POST /v1/chat/completions (GPT-4)
   Output: Category, urgency, complexity, reasoning
   Duration: 3-5 seconds
   
4. OPENAI EMBEDDING
   Input: Incident text
   API: POST /v1/embeddings
   Output: 1536-dimensional vector
   Duration: 1 second
   
5. PINECONE SEARCH
   Input: Vector embedding
   API: POST /query
   Output: Top 3 similar incidents with scores
   Duration: <1 second
   
6. OPENAI DECISION
   Input: Incident + Classification + Similar cases
   API: POST /v1/chat/completions (GPT-4)
   Output: Confidence score, action, resolution/diagnostics
   Duration: 5-8 seconds
   
7. ROUTING LOGIC (IF Node)
   Input: Confidence score
   Logic:
     - IF confidence > 80 → Branch A (Auto-Resolve)
     - ELSE IF confidence >= 50 → Branch B (Assisted)
     - ELSE → Branch C (Escalate)
   Duration: <1 second
   
8A. AUTO-RESOLVE PATH
   - Update Jira: Status = Resolved
   - Create Confluence page
   - Calculate ROI
   - Send Slack notification (success)
   - Send email to user
   - Log to Google Sheets
   Duration: 3-5 seconds
   
8B. ASSISTED PATH
   - Update Jira: Status = In Progress, assign analyst
   - Send Slack notification (guidance)
   - Log to Google Sheets
   Duration: 2-3 seconds
   
8C. ESCALATE PATH
   - Update Jira: Status = Escalated, priority = Highest
   - Send Slack notification (urgent)
   - Send email to on-call team
   - Log to Google Sheets
   Duration: 2-3 seconds
   
TOTAL END-TO-END: 15-25 seconds
```

---

### 3.2 Data Transformation Examples

**Example 1: Webhook Input → Jira Ticket**

**Input (Webhook):**
```json
{
  "incident_id": "INC001234",
  "title": "Cannot access SAP GUI",
  "description": "User getting authorization error DYNP 138",
  "component": "SAP Authorization",
  "severity": "Medium",
  "user_email": "john.doe@company.com",
  "error_code": "DYNP 138"
}
```

**Output (Jira Ticket):**
```json
{
  "key": "SAP-123",
  "fields": {
    "summary": "Cannot access SAP GUI",
    "description": "Incident ID: INC001234\n\nUser getting authorization error DYNP 138",
    "priority": "Medium",
    "status": "To Do",
    "customfield_10050": "DYNP 138"
  }
}
```

---

**Example 2: Incident Text → Vector Embedding**

**Input:**
```
"Cannot access SAP GUI - User getting authorization error DYNP 138 when trying to login"
```

**Output:**
```json
{
  "embedding": [
    0.023456,
    -0.891234,
    0.445678,
    // ... 1533 more values
  ]
}
```

---

**Example 3: Pinecone Results → Decision Context**

**Input to Decision Engine:**
```json
{
  "current_incident": {
    "title": "Cannot access SAP GUI",
    "error_code": "DYNP 138"
  },
  "similar_incidents": [
    {
      "id": "INC000123",
      "score": 0.95,
      "title": "Authorization Error DYNP 138",
      "resolution": "Regenerate user profile via SU01"
    },
    {
      "id": "INC000126",
      "score": 0.87,
      "title": "Password Reset - Account Locked",
      "resolution": "Unlock account and reset password"
    }
  ]
}
```

**Output (Decision):**
```json
{
  "confidence_score": 92,
  "recommended_action": "auto_resolve",
  "reasoning": "Highly similar to INC000123 (95% match) which was successfully auto-resolved. Same error code and symptoms.",
  "resolution_steps": [
    "Open transaction SU01",
    "Enter username",
    "Navigate to Roles tab",
    "Click User Compare button",
    "Execute profile regeneration",
    "Run transaction SU25",
    "Test login"
  ],
  "estimated_resolution_time": "30 minutes"
}
```

---

## 4. Security Architecture

### 4.1 Credential Management

**n8n Credentials Store:**
- All API keys/tokens stored encrypted
- AES-256 encryption
- Never exposed in workflow JSON
- Referenced by credential ID only

**Stored Credentials:**
```
1. OpenAI API Key
2. Pinecone API Key
3. Atlassian Email + API Token (for Jira/Confluence)
4. Slack Webhook URL
5. Gmail SMTP credentials
6. Google Sheets OAuth token
```

---

### 4.2 API Security

**Authentication Methods:**

| Service | Auth Type | Credential |
|---------|-----------|-----------|
| OpenAI | Bearer Token | API Key in header |
| Pinecone | API Key | Header: Api-Key |
| Jira/Confluence | Basic Auth | Base64(email:token) |
| Slack | Webhook URL | Pre-authenticated URL |
| Gmail | SMTP Auth | Username + App Password |
| Google Sheets | OAuth 2.0 | Access token (auto-refresh) |

**HTTPS Enforcement:**
- All external API calls use HTTPS
- Webhook endpoint uses HTTP (localhost only)
- Production would use HTTPS with SSL cert

---

### 4.3 Data Privacy

**Sensitive Data Handling:**
- User emails: Only used for notifications, not logged
- Error messages: May contain internal system info
- Incident descriptions: Treated as confidential

**Data Retention:**
- n8n execution data: 168 hours (7 days) by default
- Google Sheets: Persistent (manual cleanup)
- Jira/Confluence: Persistent per Atlassian retention
- Pinecone: Persistent (vectors remain until deleted)

---

## 5. Error Handling & Resilience

### 5.1 Retry Logic

**n8n Retry Configuration:**
```javascript
// Per node retry settings
{
  "retryOnFail": true,
  "maxTries": 3,
  "waitBetweenTries": 1000 // 1 second
}
```

**Retry Strategy:**
- API failures: 3 attempts with exponential backoff
- Network timeouts: 2 attempts
- Rate limits: Wait + retry (up to 2 attempts)

---

### 5.2 Fallback Behavior

**If AI Services Fail:**
- Classification fails → Use severity from input, escalate
- Embedding fails → Skip similarity search, escalate
- Pinecone fails → Proceed without similar cases
- Decision engine fails → Default to escalation path

**If Integration Fails:**
- Jira fails → Log error, continue (can create manually)
- Confluence fails → Skip KB article, continue
- Slack fails → Log error, continue
- Email fails → Log error, continue
- Sheets fails → Log error, continue

**Philosophy:** Degrade gracefully, never block entire workflow

---

### 5.3 Monitoring & Logging

**n8n Execution Log:**
- Each workflow execution logged with ID
- Execution time tracked per node
- Error messages captured with stack traces
- Success/failure status recorded

**Custom Logging (If Implemented):**
```javascript
// Function node for logging
console.log(JSON.stringify({
  timestamp: new Date().toISOString(),
  incident_id: $json.incident_id,
  status: "processing",
  node: "OpenAI Classification",
  duration_ms: $executionTime
}));
```

---

## 6. Performance Optimization

### 6.1 Bottleneck Analysis

**Slowest Operations:**
1. OpenAI Decision Engine: 5-8 seconds (AI inference)
2. OpenAI Classification: 3-5 seconds (AI inference)
3. Jira API calls: 1-2 seconds each (network + processing)
4. Confluence create page: 1-2 seconds (network + processing)

**Optimization Strategies:**
- Run independent operations in parallel where possible
- Cache OpenAI prompts if reusing exact same input
- Batch Jira updates if processing multiple incidents
- Use smaller embedding model (already using "small")

---

### 6.2 Parallel Execution

**n8n Parallel Nodes:**
Some outputs can run in parallel:

```
Decision Engine
    ↓
Update Jira ──┬── Create Confluence ──┬── Send Slack
              ├── Send Email         ─┤
              └── Log to Sheets      ─┘
```

However, for demo clarity, sequential execution is acceptable.

---

## 7. Scalability Considerations

### 7.1 Current Capacity

**Demo Scale:**
- Incidents processed: 10-20 per demo session
- Concurrent executions: 1-2
- Knowledge base: 6 vectors
- Response time: 15-25 seconds per incident

**Free Tier Limits:**
- OpenAI: 3,500 req/min (way more than needed)
- Pinecone: 100K vectors (sufficient for production pilot)
- Jira: 10 users (sufficient for demo)
- Confluence: Unlimited pages (on free tier)
- Slack: Unlimited messages
- Gmail: 500 emails/day (sufficient)
- Sheets: 10M cells (sufficient)

---

### 7.2 Production Scaling

**For Production (1000 incidents/day):**

**Infrastructure:**
- n8n: Cloud-hosted (n8n.cloud) or self-hosted with load balancer
- Database: PostgreSQL for workflow data
- Queue: Redis for job queue (handle spikes)

**AI Services:**
- OpenAI: Upgrade to higher tier if needed
- Pinecone: Paid tier for more vectors (1M+)
- Caching: Redis cache for repeated queries

**Estimated Costs (Production):**
- OpenAI: ~$200/month (1000 incidents/day)
- Pinecone: ~$70/month (standard pod)
- n8n Cloud: ~$50/month (starter plan)
- Atlassian: ~$15/month (10 users)
- **Total: ~$335/month**

---

## 8. Deployment Architecture

### 8.1 Demo Deployment

**Components:**
- **n8n:** Local Docker container OR npm install
- **Postman:** Desktop app for triggering webhooks
- **Browser:** Multiple tabs for Jira, Confluence, Slack, Sheets

**Network:**
```
localhost:5678 (n8n)
    ↓
    → api.openai.com (HTTPS)
    → <project>.svc.pinecone.io (HTTPS)
    → <domain>.atlassian.net (HTTPS)
    → hooks.slack.com (HTTPS)
    → smtp.gmail.com (SMTP/TLS)
    → sheets.googleapis.com (HTTPS)
```

---

### 8.2 Production Deployment (Future)

**Architecture:**
```
Internet → Load Balancer → n8n Cloud
                ↓
           Webhook Queue (Redis)
                ↓
           Worker Nodes (n8n)
                ↓
           External APIs
```

**High Availability:**
- Multiple n8n instances
- Database replication
- API retry logic
- Health monitoring
- Auto-scaling based on queue depth

---

## 9. Testing Architecture

### 9.1 Test Strategy

**Unit Tests:**
- Each n8n node tested independently
- Mock API responses
- Validate data transformations

**Integration Tests:**
- End-to-end workflow execution
- All 3 scenarios (auto-resolve, assisted, escalate)
- Verify all integrations respond

**Performance Tests:**
- Measure execution time per node
- Total end-to-end time
- API response times

---

### 9.2 Test Data

**Mock Incidents:**
```json
// Scenario 1: Auto-Resolve
{
  "incident_id": "INC001234",
  "title": "Cannot access SAP GUI",
  "description": "User getting authorization error DYNP 138...",
  "error_code": "DYNP 138",
  "expected_confidence": ">80%",
  "expected_path": "auto_resolve"
}

// Scenario 2: Assisted
{
  "incident_id": "INC001235",
  "title": "Transaction VA01 timeout",
  "description": "Sales order creation timing out...",
  "error_code": "TIMEOUT",
  "expected_confidence": "50-80%",
  "expected_path": "assisted"
}

// Scenario 3: Escalate
{
  "incident_id": "INC001236",
  "title": "ABAP memory dump",
  "description": "TSV_TNEW_PAGE_ALLOC_FAILED affecting 50+ users...",
  "error_code": "TSV_TNEW_PAGE_ALLOC_FAILED",
  "expected_confidence": "<50%",
  "expected_path": "escalate"
}
```

---

## 10. Documentation Architecture

### 10.1 Document Structure

**Technical Documentation:**
1. **OVERVIEW.md** - High-level summary, business value
2. **PRD.md** - Requirements, features, acceptance criteria
3. **ARCHITECTURE.md** - This document (technical details)
4. **DEMO-SCRIPT.md** - Step-by-step demo walkthrough

**Code Documentation:**
- n8n workflow: Node names, descriptions
- Python scripts: Inline comments
- Configuration files: Comments explaining settings

---

## 11. Appendix

### 11.1 Technology Stack Summary

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Orchestration | n8n | Latest | Workflow automation |
| AI Services | OpenAI API | GPT-4 / Embeddings | Intelligence |
| Vector DB | Pinecone | Latest | Similarity search |
| Ticketing | Jira Cloud | REST API v3 | Incident management |
| Knowledge | Confluence Cloud | REST API | Documentation |
| Notifications | Slack | Webhooks | Team alerts |
| Email | Gmail | SMTP | User communication |
| Reporting | Google Sheets | API v4 | Metrics logging |
| Testing | Postman | Latest | Webhook testing |

---

### 11.2 API Endpoints Reference

**OpenAI:**
- Chat: `https://api.openai.com/v1/chat/completions`
- Embeddings: `https://api.openai.com/v1/embeddings`

**Pinecone:**
- Query: `https://<index>-<project>.svc.<region>.pinecone.io/query`
- Upsert: `https://<index>-<project>.svc.<region>.pinecone.io/vectors/upsert`

**Jira:**
- Base: `https://<domain>.atlassian.net/rest/api/3/`
- Create: `POST /issue`
- Update: `PUT /issue/{issueIdOrKey}`
- Comment: `POST /issue/{issueIdOrKey}/comment`

**Confluence:**
- Base: `https://<domain>.atlassian.net/wiki/rest/api/`
- Create: `POST /content`
- Update: `PUT /content/{id}`

**Slack:**
- Webhook: `https://hooks.slack.com/services/{T}/{B}/{token}`

**Gmail:**
- SMTP: `smtp.gmail.com:587` (STARTTLS)

**Google Sheets:**
- Append: `https://sheets.googleapis.com/v4/spreadsheets/{id}/values/{range}:append`

---

### 11.3 Diagram: Complete Node Structure

```
n8n Workflow Nodes (18 total):

1. Webhook Trigger
2. Create Jira Issue
3. OpenAI Classification
4. OpenAI Create Embedding
5. HTTP Request - Pinecone Query
6. OpenAI Decision Engine
7. Function - Parse Decision
8. IF - Route by Confidence
   ├─ 9A. Update Jira - Resolved
   ├─ 10A. Create Confluence Page
   ├─ 11A. Function - Calculate ROI
   ├─ 12A. Slack - Success Notification
   ├─ 13A. Send Email - User
   ├─ 14A. Google Sheets - Log
   ├─ 9B. Update Jira - In Progress
   ├─ 10B. Slack - Assisted Notification
   ├─ 11B. Google Sheets - Log
   ├─ 9C. Update Jira - Escalated
   ├─ 10C. Slack - Urgent Notification
   └─ 11C. Google Sheets - Log
```

---

**END OF ARCHITECTURE DOCUMENT**
