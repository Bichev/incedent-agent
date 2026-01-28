# Demo Script
## SAP Incident Management AI Agent

**Presenter:** Vladamir Bichev, JAX AI Agency  
**Audience:** Sunil Kumar Eda  
**Duration:** 7-8 minutes  
**Date:** January 2025

---

## Pre-Demo Setup Checklist (30 minutes before)

### Environment Setup

**✅ Open Required Applications:**
- [ ] n8n workflow (localhost:5678) - **MAIN SCREEN**
- [ ] Jira board (`https://your-domain.atlassian.net/jira/`)
- [ ] Confluence space (`https://your-domain.atlassian.net/wiki/spaces/SAPKB`)
- [ ] Slack channel (#incident-alerts)
- [ ] Gmail inbox
- [ ] Google Sheets logging spreadsheet
- [ ] Postman with 3 test scenarios ready

**✅ Verify n8n Workflow:**
- [ ] Workflow is **ACTIVE** (toggle at top-right is ON)
- [ ] Click "Execute Workflow" to activate webhook
- [ ] Webhook URL is visible and accessible
- [ ] All credentials are configured (green checkmarks)

**✅ Test Run (Critical!):**
- [ ] Send Scenario 1 via Postman
- [ ] Verify complete execution (all green nodes)
- [ ] Check Jira ticket created
- [ ] Check Slack message received
- [ ] Check Google Sheets row added
- [ ] **Clear test data from Slack channel**
- [ ] **Archive or delete test Jira ticket**

**✅ Screen Layout:**
```
┌─────────────────────┬─────────────────────┐
│                     │                     │
│    Main Screen      │   Secondary Screen  │
│    (n8n workflow)   │   (Browser tabs)    │
│                     │                     │
│  [Large, centered]  │  - Jira             │
│                     │  - Confluence       │
│                     │  - Slack            │
│                     │  - Gmail            │
│                     │  - Google Sheets    │
│                     │  - Postman          │
└─────────────────────┴─────────────────────┘
```

**✅ Backup Plan:**
- [ ] Screen recording of successful execution saved
- [ ] Screenshots of key outputs ready
- [ ] This script printed or on tablet

---

## Opening (1 minute)

### Introduction

**[Smile, make eye contact]**

**YOU:**  
*"Sunil, thanks for your time today. You mentioned you're working on analyzing and resolving SAP incidents, and I wanted to show you something I built that might be relevant."*

**[Pause for acknowledgment]**

**YOU:**  
*"What I'm going to demonstrate is an intelligent AI agent that automatically triages SAP incidents, resolves routine issues without human intervention, and accelerates complex resolutions by doing the research upfront."*

**[Gesture to screen]**

**YOU:**  
*"This is a working demo - everything you're about to see is real. The AI makes actual decisions, creates actual Jira tickets, writes actual documentation in Confluence, and notifies teams in real-time via Slack."*

**[Set expectations]**

**YOU:**  
*"I'll show you three scenarios: a routine incident that gets auto-resolved, a complex issue that gets analyst assistance, and a critical problem that gets escalated. The whole demo takes about 7 minutes."*

**[Confirm readiness]**

**YOU:**  
*"Ready to dive in?"*

**[Wait for "yes" - don't rush]**

---

## Part 1: System Overview (1 minute)

### Show the Workflow

**[Switch to n8n screen]**

**YOU:**  
*"This is the workflow engine - n8n. It orchestrates everything. Let me walk you through what happens when an incident comes in."*

**[Trace the flow with cursor/hand]**

**YOU:**  
*"An incident arrives here via webhook..."*  
**[Point to Webhook node]**

*"...we immediately create a Jira ticket..."*  
**[Point to Jira node]**

*"...then the AI analyzes it..."*  
**[Point to OpenAI Classification]**

*"...searches our knowledge base for similar historical incidents..."*  
**[Point to Pinecone Search]**

*"...and makes an intelligent decision about how to handle it."*  
**[Point to Decision Engine]**

*"Based on confidence level, it routes to one of three paths: auto-resolve, assisted resolution, or escalation."*  
**[Point to IF node and three branches]**

**[Pause - let it sink in]**

**YOU:**  
*"The entire process takes about 15-20 seconds. Let me show you it in action."*

---

## Part 2: Scenario 1 - Auto-Resolve (2.5 minutes)

### Setup the Scenario

**[Switch to Postman]**

**YOU:**  
*"First scenario: a user can't log into SAP. They're getting authorization error DYNP 138. This is a routine issue - password resets, profile synchronization - happens multiple times per day."*

**[Show the JSON payload in Postman]**

**YOU:**  
*"In production, this would come directly from your SAP system or ServiceNow. For the demo, I'm simulating it by sending this JSON payload."*

**[Briefly show key fields - don't read them all]**

**YOU:**  
*"Notice: incident ID, error code DYNP 138, component is SAP Authorization, severity is Medium."*

---

### Execute Scenario 1

**[Arrange screens: n8n visible, Jira/Slack/Sheets tabs ready to switch]**

**YOU:**  
*"Watch what happens when I send this..."*

**[Click "Send" in Postman]**

**[Immediately switch to n8n workflow]**

**YOU:**  
*"See the nodes lighting up? Each one is executing in real-time."*

**[Narrate as nodes execute - speak naturally, not rushed]**

*"Webhook received... Jira ticket created... AI is analyzing the incident... searching the knowledge base... found similar cases... calculating confidence... and deciding..."*

**[When it reaches the routing node]**

**YOU:**  
*"Watch - it's routing to the auto-resolve path. The AI is confident it can handle this."*

**[Let the rest execute - 3-5 more seconds]**

---

### Show the Results

**[Switch to Jira]**

**YOU:**  
*"Let's see what happened. Here's the Jira ticket that was just created..."*

**[Click to open the ticket]**

*"Status: Resolved. The AI closed it automatically."*

**[Scroll to show resolution in comments or description]**

*"And here are the resolution steps it provided: regenerate the user profile, run transaction SU01, synchronize authorization objects."*

**[Show confidence score custom field if visible]**

*"Confidence score: 92%. The AI was very certain this was the right solution."*

---

**[Switch to Confluence]**

**YOU:**  
*"It also created a knowledge base article automatically."*

**[Navigate to the newly created page]**

*"Full documentation: problem description, symptoms, resolution steps, estimated time. Everything is captured."*

**[Quickly scroll to show structure - don't read it all]**

*"Next time this error happens, the system is even smarter because it has this documented case."*

---

**[Switch to Slack]**

**YOU:**  
*"And the team was notified in real-time."*

**[Show the Slack message]**

*"Green checkmark - auto-resolved. Links to both Jira and Confluence. Confidence score shown. Resolution applied."*

**[Point to links]**

*"One click takes them to the ticket or documentation."*

---

**[Switch to Google Sheets]**

**YOU:**  
*"Finally, everything is logged for reporting."*

**[Show the new row in spreadsheet]**

*"Timestamp, incident details, status, confidence, resolution time. Management can see metrics in real-time."*

**[Optional: Show calculated savings if you implemented it]**

*"And this particular incident saved 2 hours of analyst time - about $60 in labor cost."*

---

### Drive Home the Value

**[Pause, make eye contact]**

**YOU:**  
*"That entire process took 18 seconds from start to finish. Without the AI, your L1 analyst would spend 2 hours on this: looking up the error code, searching for similar tickets, following the runbook, documenting the solution, notifying the user."*

**[Let that sink in - 2-3 second pause]**

*"Now multiply that by 60% of your incident volume - all the routine password resets, access requests, common configuration errors. That's the auto-resolve capability."*

---

## Part 3: Scenario 2 - Assisted Resolution (1.5 minutes)

### Setup the Scenario

**YOU:**  
*"Second scenario: a performance issue. Transaction VA01 - sales order creation - is timing out. This is more complex. It started after a transport was applied yesterday."*

**[Switch to Postman, show Scenario 2]**

**YOU:**  
*"This isn't routine. It needs someone with SD module expertise to investigate."*

---

### Execute Scenario 2

**[Send the request]**

**[Watch n8n execute - narrate briefly]**

**YOU:**  
*"Same process... analyzing... searching... but watch the confidence score..."*

**[When it routes]**

*"There - assisted resolution path. The AI knows it can't auto-resolve this, but it can help."*

---

### Show the Results

**[Switch to Jira]**

**YOU:**  
*"Ticket created, status is In Progress, assigned to L2 analyst."*

**[Show the ticket content]**

*"But look at what the AI provided..."*

**[Point to diagnostic hints or analysis]**

*"Diagnostic guidance: check database indexes, review the transport contents, analyze table statistics. The AI did 45 minutes of research instantly."*

---

**[Switch to Slack]**

**YOU:**  
*"Slack notification - yellow indicator for assisted resolution."*

**[Show message]**

*"It tells the analyst: here's what we know, here's what to check, here are similar past incidents. The analyst starts with context instead of from scratch."*

---

**[Make eye contact]**

**YOU:**  
*"This doesn't replace your expert analysts. It amplifies them. They get to focus on solving the problem instead of researching it. 45-minute head start on every complex incident."*

---

## Part 4: Scenario 3 - Escalation (1.5 minutes)

### Setup the Scenario

**YOU:**  
*"Third scenario: a critical issue. ABAP memory dump in production, affecting 50+ users. This needs your Basis team immediately."*

**[Show Scenario 3 in Postman]**

**YOU:**  
*"Error code TSV_TNEW_PAGE_ALLOC_FAILED - extended memory exhaustion. System instability."*

---

### Execute Scenario 3

**[Send the request]**

**[Watch execution]**

**YOU:**  
*"Watch the routing..."*

**[When it escalates]**

*"Escalation path. The AI recognized this is beyond routine repair - it needs expert attention immediately."*

---

### Show the Results

**[Switch to Jira]**

**YOU:**  
*"Ticket marked Critical, status Escalated, priority Highest."*

**[Show the content]**

*"But notice - the AI didn't just pass it along. It provided context."*

**[Point to analysis]**

*"Probable causes ranked by likelihood. Immediate actions recommended: check memory parameters, review batch jobs, analyze dumps. Everything your Basis team needs to start troubleshooting immediately."*

---

**[Switch to Slack]**

**YOU:**  
*"And the urgent alert..."*

**[Show red indicator message]**

*"Red flag, severity critical, expert team tagged. Full diagnostic context included."*

**[Point to the analysis in message]**

*"What would take your team 30-45 minutes to gather - system state, recent changes, similar historical issues - delivered instantly."*

---

**[Make eye contact]**

**YOU:**  
*"This is about reducing Mean Time To Resolution. Not by automating the fix - you can't automate complex system issues - but by eliminating the research delay. Your experts get to start fixing immediately."*

---

## Part 5: Value Proposition (1 minute)

### Quantify the Benefits

**[Switch to Google Sheets or prepare to discuss verbally]**

**YOU:**  
*"Let's talk about impact. We just processed 3 incidents in about 5 minutes."*

**[Reference the spreadsheet or use general numbers]**

*"First one: auto-resolved in 18 seconds. Saved 2 hours of L1 time - $60."*

*"Second one: analyst saved 45 minutes of research - $45."*

*"Third one: Basis team got a 30-minute head start - $30."*

**[Pause]**

*"That's $135 in labor savings from 3 incidents. Now scale that."*

---

### Scale the Vision

**YOU:**  
*"If you process 100 incidents per day, and 60% are routine like our first example..."*

**[Use hand gestures to illustrate]**

*"60 auto-resolved: saves 120 hours per day."*

*"30 assisted: saves 22 hours of research per day."*

*"10 escalated: saves 5 hours of information gathering."*

**[Sum it up]**

*"Total: 147 hours saved per day. That's the equivalent of 18 full-time analysts."*

**[Let that sink in - pause 2-3 seconds]**

**YOU:**  
*"And this isn't just about cost. It's about SLA compliance - instant triage means no queue delays. It's about knowledge retention - every resolution is documented. It's about analyst satisfaction - your people work on meaningful problems instead of password resets."*

---

### Show the Integration Ecosystem

**YOU:**  
*"And it all works with tools you already have."*

**[Gesture to tabs/screens]**

*"Jira for ticketing. Confluence for knowledge base. Slack for communication. Email for users. It plugs into your existing workflow - doesn't replace it."*

---

## Part 6: The Intelligence Behind It (30 seconds)

### Explain the AI (Keep it Simple)

**[Switch to n8n workflow]**

**YOU:**  
*"Quick word on how this works. The AI doesn't just match keywords."*

**[Point to Pinecone node]**

*"It uses semantic search - understands meaning, not just exact phrases. So if a user says 'permission denied' instead of 'authorization error,' it still finds the right historical cases."*

**[Point to Decision Engine]**

*"And it doesn't blindly auto-resolve everything. It calculates confidence based on similarity to past successful resolutions. Conservative thresholds - only acts when it's sure."*

**[Optional: Show one AI response if there's time]**

*"It even explains its reasoning..."*

**[Show the reasoning field from one of the results]**

*"'This matches 2 historical incidents with identical error codes that were successfully resolved.' Transparency in decision-making."*

---

## Closing (1 minute)

### Transition to Next Steps

**YOU:**  
*"So that's the demo. An AI agent that handles routine incidents automatically, accelerates complex resolutions, and ensures critical issues get expert attention immediately - all while documenting everything and improving continuously."*

**[Pause - gauge reaction]**

---

### Address Questions/Objections Proactively

**YOU:**  
*"I know you might be wondering about a few things..."*

**[Address common concerns before he asks]**

**Accuracy:**  
*"'What if it makes a mistake?' Conservative confidence thresholds. We'd start at 85-90% for auto-resolve in production, adjust based on your comfort level. And every action is logged - full audit trail."*

**Integration:**  
*"'How hard is it to connect to our actual SAP system?' ServiceNow and SAP Solution Manager both have webhook capabilities. We'd configure the webhook during implementation - usually takes about 30 minutes. The workflow stays the same."*

**Knowledge Base:**  
*"'What about our specific incidents?' We'd load your historical resolutions from your current ticket system. The more history we have, the smarter it gets. Starts useful on day one, gets better every day."*

---

### Ask for Feedback

**YOU:**  
*"What resonates with you? What would you want to see different?"*

**[STOP TALKING - let him respond]**

**[Listen actively, take notes]**

---

### Offer Next Steps

**[Based on his response, suggest:]**

**If interested:**  
**YOU:**  
*"Would you like to see this adapted to your specific use cases? I could build a version using actual incident examples from your environment."*

**If needs to discuss with team:**  
**YOU:**  
*"I can put together a more detailed technical doc for your team. What specific questions would they have?"*

**If wants pilot:**  
**YOU:**  
*"We could start with a 4-week pilot. Connect to your dev/test SAP system, load your historical incidents, process real tickets with human-in-the-loop review. Prove the value before full production."*

---

### Thank & Close

**YOU:**  
*"Sunil, thank you for your time. This was great to share with you. I'll follow up with the documentation we discussed and any additional materials."*

**[Offer contact]**

*"Feel free to reach out with any questions - happy to dive deeper into any part of this."*

**[Handshake/professional close]**

---

## Post-Demo Follow-Up

### Within 24 Hours

**✅ Send Email:**
```
Subject: SAP Incident Management AI Agent - Demo Follow-Up

Hi Sunil,

Thanks for taking the time to see the demo today. As discussed, 
I'm attaching the complete technical documentation:

- OVERVIEW.md - Executive summary and business value
- PRD.md - Detailed requirements and features
- ARCHITECTURE.md - Technical architecture and integrations
- DEMO-SCRIPT.md - The walkthrough from today

Key takeaways:
- 60% auto-resolution rate for routine incidents
- 45-minute research acceleration for complex issues
- 18 FTE equivalent in labor savings (based on 100 incidents/day)
- Integrates with existing tools (Jira, Confluence, Slack)

Next Steps:
[Customize based on his interest level]

Looking forward to continuing the conversation.

Best,
Vlad

JAX AI Agency
[contact info]
```

**✅ Attachments:**
- All 4 documentation files
- Optional: Screen recording of successful demo
- Optional: One-page ROI calculator

---

## Troubleshooting Guide (If Things Go Wrong During Demo)

### Issue: Webhook Not Responding

**Symptom:** Postman request times out or gets 404

**Fix:**
1. Check n8n workflow is ACTIVE (toggle at top)
2. Click "Execute Workflow" to activate webhook
3. Verify webhook URL matches Postman URL
4. Try test URL instead of production URL

**Backup:** Show pre-recorded video, explain "network issue, let me show you the recording"

---

### Issue: OpenAI API Timeout

**Symptom:** Workflow stops at OpenAI node, times out

**Fix:**
1. Wait for retry (configured for 3 attempts)
2. Check OpenAI API status at status.openai.com
3. If persists, manually execute workflow again

**Backup:** Explain "AI service timeout, happens occasionally" and show previous successful execution in Google Sheets

---

### Issue: Jira/Confluence Not Creating Resources

**Symptom:** Node fails with authentication error

**Fix:**
1. Check credentials in n8n are still valid
2. Verify API token hasn't expired
3. Test connection in credential settings

**Backup:** Continue demo without Jira creation, focus on AI decision-making. Show screenshots of previous successful tickets.

---

### Issue: Slack Message Not Appearing

**Symptom:** Workflow completes but no Slack message

**Fix:**
1. Check Slack webhook URL is correct
2. Verify channel exists
3. Check Slack workspace is accessible

**Backup:** Show Gmail notification instead, or Google Sheets logging. Explain "notification delivered via email as backup"

---

### Issue: Everything Breaks

**Symptom:** Complete workflow failure

**Fix:**
1. Don't panic - smile
2. Say: "Let me show you the recording of a successful run while we troubleshoot"
3. Play backup video
4. Narrate over the video as if it were live
5. Continue with value prop and Q&A

**Important:** Technical issues happen. How you handle them matters. Stay calm, confident, professional.

---

## Tips for Success

### Body Language
- ✅ Make eye contact when speaking (not always at screen)
- ✅ Use hand gestures to emphasize points
- ✅ Smile and show enthusiasm (but not over-the-top)
- ✅ Stand or sit up straight (confident posture)

### Pacing
- ✅ Speak clearly, not too fast
- ✅ Pause after key points (let them sink in)
- ✅ Don't rush through execution (let him see it work)
- ✅ If he asks questions mid-demo, stop and answer fully

### Engagement
- ✅ Check for understanding: "Does that make sense?"
- ✅ Invite questions: "Any questions so far?"
- ✅ Read the room: if he's excited, emphasize features; if skeptical, emphasize safeguards

### What NOT to Do
- ❌ Don't apologize for technical limitations ("Sorry it's slow")
- ❌ Don't oversell ("This will solve everything!")
- ❌ Don't get too technical unless he asks
- ❌ Don't talk over him if he interrupts
- ❌ Don't rush the close (let him decide pace)

---

## Key Messages to Reinforce

**Throughout the demo, weave in these themes:**

1. **Intelligence, Not Just Automation**  
   *"This isn't just scripted automation - it's adaptive AI that learns and improves."*

2. **Augmentation, Not Replacement**  
   *"We're not replacing your analysts. We're giving them superpowers."*

3. **Measurable Value**  
   *"Every incident processed shows time saved, cost saved, documented."*

4. **Seamless Integration**  
   *"Works with your existing tools. Doesn't disrupt your workflow."*

5. **Continuous Improvement**  
   *"Gets smarter every day as it learns from new resolutions."*

6. **Transparency**  
   *"You always see why the AI made a decision. No black box."*

---

## Final Checklist Before Demo Starts

**Deep breath. You've got this.**

- [ ] All applications open and tested
- [ ] Workflow active and webhook responding
- [ ] Postman scenarios ready
- [ ] Screen layout optimized
- [ ] Backup video accessible
- [ ] This script available for reference
- [ ] Water/coffee nearby
- [ ] Phone on silent
- [ ] Confident mindset activated

**Remember:** You're not just selling a tool. You're solving his problem. Focus on his pain points (high volume, slow resolution, knowledge loss) and show how this addresses them.

**Go crush it!** 🚀

---

**END OF DEMO SCRIPT**
