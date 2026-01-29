import type { 
  Scenario, 
  WorkflowStep, 
  StepResult, 
  IntegrationResults,
  SimilarIncident,
  AIAssessment,
  DecisionResult,
  Incident
} from '@/types'
import { getRandomDuration } from './workflow-steps'

// Simulated similar incidents for each scenario
const similarIncidentsMap: Record<string, SimilarIncident[]> = {
  'auto-resolve': [
    {
      id: 'INC000123',
      title: 'Authorization Error DYNP 138 - Profile Sync',
      similarity: 0.95,
      resolution: 'Regenerated user profile via SU01',
      component: 'SAP Authorization',
    },
    {
      id: 'INC000089',
      title: 'User Profile Not Synchronized After Role Change',
      similarity: 0.87,
      resolution: 'Profile comparison and regeneration',
      component: 'SAP Authorization',
    },
    {
      id: 'INC000156',
      title: 'DYNP Authorization Popup on Login',
      similarity: 0.82,
      resolution: 'Buffer refresh and profile regeneration',
      component: 'SAP Authorization',
    },
  ],
  'assisted': [
    {
      id: 'INC000201',
      title: 'VA01 Slow After Index Rebuild',
      similarity: 0.72,
      resolution: 'Index optimization on VBAK table',
      component: 'SAP SD',
    },
    {
      id: 'INC000178',
      title: 'Sales Order Timeout in Peak Hours',
      similarity: 0.65,
      resolution: 'Database statistics refresh required',
      component: 'SAP SD',
    },
  ],
  'escalate': [
    {
      id: 'INC000045',
      title: 'Extended Memory Exhaustion',
      similarity: 0.58,
      resolution: 'Memory parameters adjusted by Basis team',
      component: 'SAP Basis',
    },
  ],
}

// Generate step result based on step and scenario
export function generateStepResult(stepId: string, scenario: Scenario, generatedIncident?: Incident): StepResult {
  const timestamp = new Date().toISOString()
  const incident = generatedIncident || scenario.incident
  
  switch (stepId) {
    case 'generate':
      return {
        success: true,
        message: `Generated unique incident: ${incident.id}`,
        data: {
          incidentId: incident.id,
          title: incident.title,
          error_code: incident.error_code,
        },
      }
    
    case 'trigger':
      return {
        success: true,
        message: `Incident ${incident.id} sent to workflow`,
        data: {
          incidentId: incident.id,
          title: incident.title,
          severity: incident.severity,
          timestamp,
        },
      }
    
    case 'jira-create':
      return {
        success: true,
        message: `Jira ticket SAP-${Math.floor(Math.random() * 1000) + 100} created`,
        link: 'https://jira.atlassian.net/browse/SAP-123',
        data: {
          ticketId: `SAP-${Math.floor(Math.random() * 1000) + 100}`,
          status: 'To Do',
          priority: scenario.incident.severity,
        },
      }
    
    case 'ai-assessment':
      const assessment: AIAssessment = {
        category: scenario.incident.component,
        urgency: scenario.incident.severity === 'Critical' ? 'Immediate' : 
                 scenario.incident.severity === 'High' ? 'High' : 'Normal',
        complexity: scenario.expectedPath === 'auto_resolve' ? 'Routine' :
                    scenario.expectedPath === 'assisted' ? 'Moderate' : 'Complex',
        probableCause: scenario.expectedPath === 'auto_resolve' 
          ? 'User profile not synchronized after authorization change'
          : scenario.expectedPath === 'assisted'
          ? 'Database performance degradation after transport'
          : 'System memory exhaustion due to batch processing',
        keywords: [scenario.incident.error_code, scenario.incident.component],
      }
      return {
        success: true,
        message: `Classification: ${assessment.complexity} - ${assessment.category}`,
        data: assessment as unknown as Record<string, unknown>,
      }
    
    case 'pinecone-search':
      const similarIncidents = similarIncidentsMap[scenario.id] || []
      return {
        success: true,
        message: `Found ${similarIncidents.length} similar incidents`,
        data: {
          topMatch: similarIncidents[0]?.similarity || 0,
          matches: similarIncidents,
        },
      }
    
    case 'decision': {
      const decision: DecisionResult = {
        confidenceScore: scenario.expectedConfidence,
        recommendedAction: scenario.expectedPath,
        reasoning: scenario.expectedPath === 'auto_resolve'
          ? `High similarity (${scenario.expectedConfidence}%) to previously auto-resolved incident INC000123. Same error code and component.`
          : scenario.expectedPath === 'assisted'
          ? `Moderate confidence (${scenario.expectedConfidence}%). Performance issue requires analyst verification of transport impact.`
          : `Low confidence (${scenario.expectedConfidence}%). Critical system issue requires immediate expert attention.`,
        resolutionSteps: scenario.resolution,
        diagnosticHints: scenario.diagnosticHints,
        estimatedResolutionTime: scenario.expectedPath === 'auto_resolve' ? '30 minutes' :
                                  scenario.expectedPath === 'assisted' ? '2 hours' : '4+ hours',
      }
      return {
        success: true,
        message: `Decision: ${decision.recommendedAction.replace('_', ' ').toUpperCase()} (${decision.confidenceScore}%)`,
        data: decision as unknown as Record<string, unknown>,
      }
    }
    
    case 'jira-update':
      const status = scenario.expectedPath === 'auto_resolve' ? 'Resolved' :
                     scenario.expectedPath === 'assisted' ? 'In Progress' : 'Escalated'
      return {
        success: true,
        message: `Ticket updated: ${status}`,
        link: 'https://jira.atlassian.net/browse/SAP-123',
        data: {
          status,
          resolution: scenario.expectedPath === 'auto_resolve' ? 'Auto-resolved by AI Agent' : undefined,
          assignee: scenario.expectedPath === 'assisted' ? 'L2 Analyst' : 
                    scenario.expectedPath === 'escalate' ? 'Basis Team' : undefined,
        },
      }
    
    case 'confluence':
      if (scenario.expectedPath !== 'auto_resolve') {
        return {
          success: true,
          message: 'KB article skipped (not auto-resolved)',
          data: { skipped: true },
        }
      }
      return {
        success: true,
        message: 'KB article created in SAPKB space',
        link: 'https://confluence.atlassian.net/wiki/spaces/SAPKB/pages/123456',
        data: {
          pageId: '123456',
          title: `${scenario.incident.id} - ${scenario.incident.error_code} Resolution`,
          space: 'SAPKB',
        },
      }
    
    case 'notifications':
      return {
        success: true,
        message: 'Notifications sent: Slack, Email',
        data: {
          slack: { sent: true, channel: '#incident-alerts' },
          email: { sent: true, to: scenario.incident.user_email },
        },
      }
    
    case 'complete':
      return {
        success: true,
        message: `Workflow completed in ${scenario.timeSaved} saved`,
        data: {
          totalTime: '18 seconds',
          costSaved: scenario.costSaved,
          timeSaved: scenario.timeSaved,
        },
      }
    
    default:
      return { success: true, message: 'Step completed' }
  }
}

// N8n response data for live mode
export interface N8nResultData {
  jiraTicket?: string
  confluencePage?: string | null
  resolutionPath?: string
}

// Generate integration results for the results panel
export function generateIntegrationResults(
  scenario: Scenario, 
  n8nData?: N8nResultData
): IntegrationResults {
  // Use actual n8n data if available, otherwise generate mock data
  const ticketId = n8nData?.jiraTicket || `SAP-${Math.floor(Math.random() * 1000) + 100}`
  const jiraBaseUrl = 'https://jira.atlassian.net/browse'
  
  const resolutionPath = n8nData?.resolutionPath || scenario.expectedPath
  
  return {
    jira: {
      ticketId,
      ticketUrl: `${jiraBaseUrl}/${ticketId}`,
      status: resolutionPath === 'auto_resolve' ? 'Resolved' :
              resolutionPath === 'assisted' ? 'Review' : 'Escalated',
      priority: scenario.incident.severity,
      assignee: resolutionPath === 'assisted' ? 'L2 Analyst' :
                resolutionPath === 'escalate' ? 'Basis Team' : undefined,
    },
    confluence: resolutionPath === 'auto_resolve' ? {
      pageId: n8nData?.confluencePage ? 'live' : '123456',
      pageUrl: n8nData?.confluencePage || 'https://confluence.atlassian.net/wiki/spaces/SAPKB/pages/123456',
      title: `${scenario.incident.id} - ${scenario.incident.error_code} Resolution`,
      space: 'SAPKB',
    } : null,
    slack: {
      channel: '#incident-alerts',
      messageType: resolutionPath === 'auto_resolve' ? 'success' :
                   resolutionPath === 'assisted' ? 'warning' : 'error',
      timestamp: new Date().toISOString(),
    },
    email: {
      to: scenario.incident.user_email || 'user@company.com',
      subject: `Incident ${scenario.incident.id} - ${
        resolutionPath === 'auto_resolve' ? 'Resolved' :
        resolutionPath === 'assisted' ? 'Under Investigation' : 'Escalated'
      }`,
      sent: true,
    },
  }
}

// Simulate step execution with realistic timing
export async function simulateStep(
  stepId: string, 
  scenario: Scenario
): Promise<{ duration: number; result: StepResult }> {
  const duration = getRandomDuration(stepId)
  
  await new Promise(resolve => setTimeout(resolve, duration))
  
  const result = generateStepResult(stepId, scenario)
  
  return { duration, result }
}
