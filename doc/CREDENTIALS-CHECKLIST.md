# Credentials Checklist for Live Demo

## Quick Setup (You have most accounts already!)

### 1. n8n Cloud Setup (10 min)

1. Go to https://app.n8n.cloud/register
2. Sign up with email
3. Create a new workflow named "SAP Incident Agent"
4. Your webhook URL will be visible when you add a Webhook node

**Your n8n Webhook URL:** `___________________________________`

---

### 2. OpenAI API Key (2 min)

1. Go to https://platform.openai.com/api-keys
2. Create new key named "incident-agent"
3. Copy the key (starts with `sk-`)

**Your OpenAI API Key:** `sk-________________________________`

---

### 3. Pinecone Setup (NEW - 10 min)

1. Go to https://www.pinecone.io
2. Sign up for free account
3. Create index:
   - Name: `sap-incidents`
   - Dimensions: `1536`
   - Metric: `cosine`
   - Cloud: `aws` / Region: `us-east-1`
4. Go to API Keys and copy your key

**Your Pinecone API Key:** `___________________________________`
**Your Pinecone Index Host:** `sap-incidents-xxxxx.svc.xxx.pinecone.io`

---

### 4. Atlassian Credentials (5 min)

1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
2. Create API token named "incident-agent"
3. Note your Atlassian domain

**Your Atlassian Email:** `___________________________________`
**Your Atlassian API Token:** `___________________________________`
**Your Atlassian Domain:** `___________.atlassian.net`

**Jira Project Key:** `SAP` (create if needed)
**Confluence Space Key:** `SAPKB` (create if needed)

---

### 5. Slack Webhook (5 min)

1. Go to https://api.slack.com/apps
2. Create app → From scratch → Name: "SAP Incident Agent"
3. Enable Incoming Webhooks
4. Add webhook to channel `#incident-alerts`

**Your Slack Webhook URL:** `https://hooks.slack.com/services/_______________`

---

### 6. Gmail App Password (5 min)

1. Go to https://myaccount.google.com/apppasswords
2. (Enable 2FA first if needed)
3. Generate app password for "Mail" / "Other (n8n)"

**Your Gmail Address:** `___________________________________`
**Your Gmail App Password:** `________________` (16 chars, no spaces)

---

### 7. Google Sheets (5 min)

1. Create spreadsheet: https://sheets.google.com/create
2. Name it: "Incident Agent Log"
3. Add headers: `Timestamp | Incident ID | Title | Component | Severity | Status | Confidence | Resolution Time | Cost Saved`
4. Copy spreadsheet ID from URL

**Your Spreadsheet ID:** `___________________________________`
(From URL: `docs.google.com/spreadsheets/d/[THIS-IS-THE-ID]/edit`)

---

## Summary of All Credentials

| Service | Credential | Value |
|---------|-----------|-------|
| n8n | Webhook URL | |
| OpenAI | API Key | |
| Pinecone | API Key | |
| Pinecone | Index Host | |
| Atlassian | Email | |
| Atlassian | API Token | |
| Atlassian | Domain | |
| Slack | Webhook URL | |
| Gmail | Email | |
| Gmail | App Password | |
| Google Sheets | Spreadsheet ID | |

---

## Next Step

Once you have all credentials, we'll:
1. Import the n8n workflow
2. Configure all credentials in n8n
3. Load sample data into Pinecone
4. Test end-to-end
5. Connect web app to n8n

Let me know when you have the credentials ready!
