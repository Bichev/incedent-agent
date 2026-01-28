# n8n Setup Guide - SAP Incident Agent

This guide walks you through setting up n8n and connecting it to the web app.

## Table of Contents

1. [n8n Installation Options](#1-n8n-installation-options)
2. [Import the Workflow](#2-import-the-workflow)
3. [Configure Credentials](#3-configure-credentials)
4. [Update Placeholders](#4-update-placeholders)
5. [Activate the Webhook](#5-activate-the-webhook)
6. [Connect to Web App](#6-connect-to-web-app)
7. [Testing](#7-testing)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. n8n Installation Options

### Option A: n8n Cloud (Recommended for Demo)

1. Go to [n8n.io](https://n8n.io) and sign up for free trial
2. Your instance URL will be: `https://your-name.app.n8n.cloud`
3. No installation required

### Option B: Docker (Self-Hosted)

```bash
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  n8nio/n8n
```

Access at: `http://localhost:5678`

### Option C: npm (Development)

```bash
npm install -g n8n
n8n start
```

---

## 2. Import the Workflow

1. Open n8n dashboard
2. Click **"Add Workflow"** → **"Import from File"**
3. Select: `n8n/workflow-sap-incident-agent.json`
4. The workflow will appear with warning icons (credentials needed)

---

## 3. Configure Credentials

You need to create 6 credentials in n8n. Go to **Settings** → **Credentials** → **Add Credential**.

### 3.1 OpenAI API

| Field | Value |
|-------|-------|
| Name | `OpenAI` |
| API Key | Your OpenAI API key |

### 3.2 Jira Software Cloud

| Field | Value |
|-------|-------|
| Name | `Jira Cloud` |
| Email | Your Atlassian email |
| API Token | Your Atlassian API token |
| Domain | `yourcompany.atlassian.net` |

### 3.3 Confluence Cloud

| Field | Value |
|-------|-------|
| Name | `Confluence Cloud` |
| Email | Your Atlassian email |
| API Token | Your Atlassian API token (same as Jira) |
| Domain | `yourcompany.atlassian.net` |

### 3.4 Slack

Two options:

**Option A: Webhook (Simpler)**
- Use Slack Webhook credential type
- Paste your Incoming Webhook URL

**Option B: OAuth (More Features)**
- Create Slack App at api.slack.com
- Use OAuth credential type

### 3.5 Gmail SMTP

| Field | Value |
|-------|-------|
| Name | `Gmail SMTP` |
| User | your-email@gmail.com |
| Password | Gmail App Password (16 chars) |
| Host | smtp.gmail.com |
| Port | 587 |
| SSL/TLS | STARTTLS |

### 3.6 Google Sheets

| Field | Value |
|-------|-------|
| Name | `Google Sheets` |
| Type | OAuth2 |

Click "Sign in with Google" and authorize.

---

## 4. Update Placeholders

After importing, you need to update several placeholder values in the workflow nodes.

### 4.1 Click each node and update:

#### Jira - Create Issue
- `projectId`: Change from `"SAP"` to your actual Jira project key

#### Pinecone - Find Similar (HTTP Request)
Update the URL:
```
https://YOUR_INDEX_HOST/query
```
Replace with your actual Pinecone index host, e.g.:
```
https://sap-incidents-abc123.svc.us-east-1-aws.pinecone.io/query
```

Update the header `Api-Key` value with your Pinecone API key.

#### Confluence - Create KB Article
- `space`: Change from `"SAPKB"` to your Confluence space key

#### Jira - Assign Analyst
- `assigneeId`: Replace `"L2_ANALYST_ID"` with actual Jira user account ID

#### Slack - Send Notification
- `channel`: Update `#incident-alerts` to your channel

#### Email - Notify User
- `fromEmail`: Update `support@yourdomain.com` to your email

#### Sheets - Log Incident
- Update the spreadsheet document ID

#### All Atlassian URLs
Search for `YOUR_DOMAIN.atlassian.net` and replace with your actual domain.

---

## 5. Activate the Webhook

1. Click on the **"Webhook - Receive Incident"** node
2. Note the **Webhook URL** shown (e.g., `https://your-instance.app.n8n.cloud/webhook/incident-agent`)
3. Click **"Listen for Test Event"** to test, or...
4. Click **"Active"** toggle in top-right to activate the workflow

The webhook URL format is:
```
https://[your-n8n-instance]/webhook/incident-agent
```

For production:
- Cloud: `https://yourname.app.n8n.cloud/webhook/incident-agent`
- Self-hosted: `https://your-domain.com/webhook/incident-agent`

---

## 6. Connect to Web App

### 6.1 Update .env.local

```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-instance.app.n8n.cloud/webhook/incident-agent
NEXT_PUBLIC_MODE=live
```

### 6.2 Update the Web App API Route

The web app needs an API route to call n8n. Create/update:

**File: `src/app/api/trigger-incident/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const incident = await request.json();
    
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    
    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'N8N webhook URL not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(incident),
    });

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error triggering incident:', error);
    return NextResponse.json(
      { error: 'Failed to trigger incident workflow' },
      { status: 500 }
    );
  }
}
```

### 6.3 Webhook Payload Format

The n8n webhook expects this JSON structure:

```json
{
  "incident_id": "INC-2024-001",
  "title": "SAP FI: GL Account Posting Error",
  "description": "Users unable to post to GL accounts...",
  "error_code": "BK-7829",
  "component": "SAP ECC FI Module",
  "severity": "High",
  "user_email": "user@company.com",
  "timestamp": "2024-01-27T10:30:00Z"
}
```

---

## 7. Testing

### Step 1: Test n8n Workflow Independently

1. In n8n, click **"Webhook - Receive Incident"**
2. Click **"Listen for Test Event"**
3. Use curl or Postman to send a test request:

```bash
curl -X POST https://your-instance.app.n8n.cloud/webhook-test/incident-agent \
  -H "Content-Type: application/json" \
  -d '{
    "incident_id": "TEST-001",
    "title": "Test Incident",
    "description": "Testing the workflow",
    "error_code": "TEST-ERR",
    "component": "SAP Test",
    "severity": "Medium",
    "user_email": "test@example.com",
    "timestamp": "2024-01-27T12:00:00Z"
  }'
```

### Step 2: Verify Each Node

Watch the execution in n8n:
- ✅ Jira ticket created
- ✅ OpenAI classification returned
- ✅ Pinecone similar incidents found
- ✅ Decision made
- ✅ Appropriate branch taken
- ✅ Slack notification sent
- ✅ Email sent
- ✅ Google Sheets row added
- ✅ Webhook response returned

### Step 3: Test from Web App

1. Start the dev server: `npm run dev`
2. Toggle to **Live Mode**
3. Select a scenario
4. Click **Start Demo**
5. Watch real integrations fire

---

## 8. Troubleshooting

### "?" Icon on Nodes

**Cause:** Missing or invalid credentials
**Fix:** Click the node, go to Credentials dropdown, select/create the credential

### Confluence Node Shows Error

**Cause:** Confluence API requires specific permissions
**Fix:** Ensure your Atlassian API token has:
- Confluence space: Read & Write
- Create content permission

### Pinecone Returns Empty Results

**Cause:** Index is empty or wrong host
**Fix:**
1. Run the seeding script first: `npx ts-node scripts/seed-pinecone.ts`
2. Verify index host URL is correct

### Jira Status Update Fails

**Cause:** Invalid status transition or missing status ID
**Fix:**
1. Get valid status IDs from your Jira project
2. Update `statusId` values in Jira update nodes
3. Common IDs: `10001` (Open), `10002` (Done), `10003` (In Progress)

### Slack Notification Not Received

**Cause:** Wrong channel or webhook URL
**Fix:**
1. Verify webhook URL is active
2. Check channel name includes `#`
3. Ensure bot is added to the channel

### Google Sheets Permission Denied

**Cause:** Service account not authorized
**Fix:**
1. Share the spreadsheet with the service account email
2. Or re-authorize OAuth connection

### Email Not Sending

**Cause:** Gmail blocking app
**Fix:**
1. Use App Password (not regular password)
2. Enable 2FA on Google account first
3. Generate 16-character app password

---

## Quick Reference

| Service | n8n Node Type | Credential Type |
|---------|---------------|-----------------|
| OpenAI | `@n8n/n8n-nodes-langchain.openAi` | OpenAI API |
| Jira | `n8n-nodes-base.jira` | Jira Software Cloud |
| Confluence | `n8n-nodes-base.confluence` | Confluence Cloud |
| Slack | `n8n-nodes-base.slack` | Slack API / Webhook |
| Gmail | `n8n-nodes-base.emailSend` | SMTP |
| Sheets | `n8n-nodes-base.googleSheets` | Google Sheets OAuth2 |
| Pinecone | `n8n-nodes-base.httpRequest` | None (API key in header) |

---

## Next Steps

Once your n8n workflow is working:

1. **Seed Pinecone** with historical incidents
2. **Test each scenario** (auto-resolve, assisted, escalate)
3. **Deploy to Vercel** with live mode enabled
4. **Run your demo!**
