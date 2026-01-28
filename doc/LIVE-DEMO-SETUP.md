# Live Demo Setup Guide

This guide walks you through setting up all the real APIs and integrations for the AI Incident Agent live demo.

## Overview

Since you don't have a SAP instance, we'll emulate the SAP trigger using the web app's "Live Mode" which sends a webhook to n8n. All other integrations will be real:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Web App       │────▶│      n8n        │────▶│   Real APIs     │
│  (Trigger)      │     │  (Orchestrator) │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
         ┌──────────┐    ┌──────────┐    ┌──────────┐
         │  OpenAI  │    │ Pinecone │    │  Jira    │
         │  GPT-4   │    │ Vectors  │    │  Cloud   │
         └──────────┘    └──────────┘    └──────────┘
                ▼               ▼               ▼
         ┌──────────┐    ┌──────────┐    ┌──────────┐
         │  Slack   │    │  Email   │    │ Sheets   │
         │ Webhook  │    │  SMTP    │    │   API    │
         └──────────┘    └──────────┘    └──────────┘
                                ▼
                         ┌──────────┐
                         │Confluence│
                         │   Wiki   │
                         └──────────┘
```

---

## Required Accounts & APIs

| Service | Purpose | Cost | Time to Setup |
|---------|---------|------|---------------|
| n8n | Workflow orchestration | Free (self-hosted) or $20/mo (cloud) | 10 min |
| OpenAI | AI classification + embeddings | ~$0.50 for demo | 5 min |
| Pinecone | Vector similarity search | Free tier | 10 min |
| Atlassian | Jira + Confluence | Free tier (10 users) | 15 min |
| Slack | Team notifications | Free | 5 min |
| Gmail | Email notifications | Free | 5 min |
| Google Cloud | Sheets API | Free | 10 min |

**Total estimated setup time: ~1 hour**
**Total estimated cost: < $1 for demo**

---

## Step 1: n8n Setup (Orchestrator)

### Option A: n8n Cloud (Easiest)
1. Go to https://n8n.io
2. Sign up for free trial
3. Create a new workflow
4. Your webhook URL will be: `https://your-instance.app.n8n.cloud/webhook/incident-agent`

### Option B: Self-Hosted (Docker)
```bash
# Run n8n with Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Access at http://localhost:5678
```

### Option C: Local Install (npm)
```bash
npm install n8n -g
n8n start
# Access at http://localhost:5678
```

**Save your n8n webhook URL** - you'll need it for the web app configuration.

---

## Step 2: OpenAI API

1. Go to https://platform.openai.com
2. Sign up / Log in
3. Navigate to API Keys: https://platform.openai.com/api-keys
4. Click "Create new secret key"
5. Name it "incident-agent"
6. Copy and save the key (starts with `sk-`)

**Required Models:**
- `gpt-4-turbo-preview` - For classification and decision-making
- `text-embedding-3-small` - For vector embeddings

**Estimated Cost:**
- ~$0.01 per incident for GPT-4
- ~$0.00002 per embedding
- Total for demo: < $0.50

---

## Step 3: Pinecone (Vector Database)

1. Go to https://www.pinecone.io
2. Sign up for free account
3. Create a new index:
   - **Index name:** `sap-incidents`
   - **Dimensions:** `1536` (for text-embedding-3-small)
   - **Metric:** `cosine`
   - **Cloud:** AWS
   - **Region:** us-east-1 (or closest)

4. Get your API credentials:
   - Go to API Keys in the dashboard
   - Copy your **API Key**
   - Note your **Environment** (e.g., `us-east-1-aws`)

5. Get your index host URL from the index dashboard

**Free Tier Limits:**
- 100,000 vectors
- 1 index
- Perfect for demo

---

## Step 4: Atlassian (Jira + Confluence)

### Create Atlassian Account
1. Go to https://www.atlassian.com/try/cloud/signup
2. Sign up with your email
3. Create a new site (e.g., `your-company.atlassian.net`)

### Setup Jira Project
1. Go to your Jira: `https://your-site.atlassian.net/jira`
2. Create a new project:
   - Template: **Kanban** or **Scrum**
   - Name: **SAP Incidents**
   - Key: **SAP**
3. Create issue type "Incident" if not exists

### Setup Confluence Space
1. Go to Confluence: `https://your-site.atlassian.net/wiki`
2. Create a new space:
   - Name: **SAP Knowledge Base**
   - Key: **SAPKB**

### Get API Token
1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
2. Click "Create API token"
3. Label: "incident-agent"
4. Copy the token

**Credentials needed:**
- Email: Your Atlassian email
- API Token: The token you just created
- Domain: `your-site.atlassian.net`

---

## Step 5: Slack Webhook

1. Go to https://api.slack.com/apps
2. Click "Create New App"
3. Choose "From scratch"
4. Name: "SAP Incident Agent"
5. Select your workspace

### Enable Incoming Webhooks
1. In your app settings, go to "Incoming Webhooks"
2. Toggle "Activate Incoming Webhooks" ON
3. Click "Add New Webhook to Workspace"
4. Select channel: Create `#incident-alerts` first
5. Copy the Webhook URL

**Webhook URL format:** The URL will look like `hooks.slack.com/services/...` with your workspace and channel tokens.

---

## Step 6: Gmail SMTP (Email)

### Enable App Password
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification (if not already)
3. Go to App passwords: https://myaccount.google.com/apppasswords
4. Select app: "Mail"
5. Select device: "Other" → Name it "n8n"
6. Click "Generate"
7. Copy the 16-character password

**SMTP Settings:**
- Host: `smtp.gmail.com`
- Port: `587`
- User: Your Gmail address
- Password: The App Password (not your regular password)

---

## Step 7: Google Sheets API

### Create a Google Cloud Project
1. Go to https://console.cloud.google.com
2. Create a new project: "Incident Agent"
3. Enable APIs:
   - Google Sheets API
   - Google Drive API

### Create Service Account (Recommended for n8n)
1. Go to IAM & Admin → Service Accounts
2. Create Service Account:
   - Name: "incident-agent"
   - Grant role: "Editor"
3. Create Key (JSON)
4. Download the JSON file

### Create the Spreadsheet
1. Go to https://sheets.google.com
2. Create new spreadsheet: "Incident Log"
3. Add headers in Row 1:
   ```
   Timestamp | Incident ID | Title | Component | Severity | Status | Confidence | Resolution Time | Cost Saved
   ```
4. Share the spreadsheet with your service account email

---

## Step 8: Load Sample Data into Pinecone

Before the demo, you need to populate Pinecone with historical incidents. Create a script or use the n8n workflow to add these vectors:

```javascript
// Sample incidents to embed and store in Pinecone
const historicalIncidents = [
  {
    id: "INC000123",
    title: "Authorization Error DYNP 138 - Profile Sync",
    description: "User unable to access SAP GUI due to authorization popup DYNP 138. Profile not synchronized after role change.",
    error_code: "DYNP 138",
    component: "SAP Authorization",
    resolution: "1. Open SU01\n2. Enter username\n3. Go to Roles tab\n4. Click User Compare\n5. Execute profile regeneration\n6. Test login",
    resolution_time: "30 minutes"
  },
  {
    id: "INC000089",
    title: "User Profile Not Synchronized After Role Change",
    description: "After assigning new roles in PFCG, user cannot access new transactions. Authorization check failing.",
    error_code: "AUTH_SYNC",
    component: "SAP Authorization", 
    resolution: "1. Run SU01 for user\n2. Execute User Compare\n3. Run PFUD to adjust profiles\n4. Verify with SU53",
    resolution_time: "45 minutes"
  },
  {
    id: "INC000201",
    title: "VA01 Performance Degradation After Transport",
    description: "Sales order creation taking over 60 seconds. Started after transport K900123. Database statistics may be stale.",
    error_code: "TIMEOUT",
    component: "SAP SD",
    resolution: "1. Check DB02 for table statistics\n2. Run DB20 to update statistics on VBAK, VBAP\n3. Review transport contents\n4. Check ST05 SQL trace",
    resolution_time: "2 hours"
  },
  {
    id: "INC000178",
    title: "Sales Order Timeout in Peak Hours",
    description: "Transaction VA01 and VA02 experiencing timeouts during peak hours 9-11 AM. Multiple users affected.",
    error_code: "TIMEOUT",
    component: "SAP SD",
    resolution: "1. Increase dialog work processes\n2. Check for table locks in SM12\n3. Analyze DB performance in ST04\n4. Consider index optimization",
    resolution_time: "3 hours"
  },
  {
    id: "INC000045",
    title: "Extended Memory Exhaustion - ABAP Dumps",
    description: "TSV_TNEW_PAGE_ALLOC_FAILED dumps occurring. Extended memory parameters need adjustment. Batch jobs consuming excess memory.",
    error_code: "TSV_TNEW_PAGE_ALLOC_FAILED",
    component: "SAP Basis",
    resolution: "1. Check ST02 for memory usage\n2. Increase em/initial_size_MB in RZ10\n3. Reschedule batch jobs\n4. Restart application server",
    resolution_time: "4 hours"
  },
  {
    id: "INC000156",
    title: "DYNP Authorization Popup on Login",
    description: "Users getting authorization popup with DYNP error when logging into SAP GUI. Recently changed password.",
    error_code: "DYNP 138",
    component: "SAP Authorization",
    resolution: "1. Clear user buffer with SU10\n2. Regenerate profile in SU01\n3. Check profile parameters",
    resolution_time: "20 minutes"
  }
];
```

---

## Step 9: n8n Workflow Configuration

### Import the Workflow
I'll provide you with an n8n workflow JSON that you can import. The workflow will:

1. **Webhook Trigger** - Receive incident from web app
2. **Create Jira Issue** - Create ticket immediately
3. **OpenAI Classification** - Analyze incident
4. **Create Embedding** - Generate vector
5. **Pinecone Query** - Find similar incidents
6. **OpenAI Decision** - Determine resolution path
7. **Route by Confidence** - IF node for branching
8. **Update Jira** - Set status and resolution
9. **Create Confluence Page** - Document (auto-resolve only)
10. **Send Slack** - Team notification
11. **Send Email** - User notification
12. **Log to Sheets** - Record metrics

### Credentials to Configure in n8n
1. **OpenAI** - API Key
2. **Pinecone** - API Key + Environment
3. **Jira/Confluence** - Email + API Token + Domain
4. **Slack** - Webhook URL
5. **Gmail** - Email + App Password
6. **Google Sheets** - OAuth or Service Account

---

## Step 10: Web App Configuration

Update your `.env.local` file:

```bash
# n8n Webhook URL
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance/webhook/incident-agent

# Enable live mode
NEXT_PUBLIC_MODE=live
```

---

## Verification Checklist

Before running the live demo:

- [ ] n8n is running and webhook is active
- [ ] OpenAI API key is valid (test with curl)
- [ ] Pinecone index exists with sample data
- [ ] Jira project "SAP" is accessible
- [ ] Confluence space "SAPKB" is accessible
- [ ] Slack webhook posts to #incident-alerts
- [ ] Gmail can send emails
- [ ] Google Sheets is shared and accessible
- [ ] Web app is configured with n8n webhook URL
- [ ] Test run completed successfully

---

## Quick Test Commands

### Test OpenAI
```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Test Pinecone
```bash
curl "https://YOUR_INDEX-YOUR_PROJECT.svc.YOUR_REGION.pinecone.io/describe_index_stats" \
  -H "Api-Key: YOUR_API_KEY"
```

### Test Slack Webhook
```bash
curl -X POST YOUR_SLACK_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"text": "Test from Incident Agent!"}'
```

---

## Next Steps

1. Set up each service following the steps above
2. Configure n8n credentials
3. Import the n8n workflow (I'll provide this)
4. Load sample data into Pinecone
5. Test each integration individually
6. Run end-to-end test
7. Deploy web app to Vercel with live webhook URL

---

## Troubleshooting

### Common Issues

**n8n webhook not responding:**
- Ensure workflow is "Active" (toggle in top right)
- Check webhook URL matches exactly

**OpenAI timeout:**
- Check API key is valid
- Verify you have credits
- Try with gpt-3.5-turbo first

**Pinecone returns no results:**
- Ensure vectors are populated
- Check dimension matches (1536)
- Verify index name is correct

**Jira 401 error:**
- API token may have expired
- Ensure using email, not username
- Check domain format

**Slack not posting:**
- Webhook URL may be invalid
- Channel might be archived
- App may need reinstallation

---

**Ready to proceed?** Let me know which service you want to set up first, and I'll provide more detailed guidance!
