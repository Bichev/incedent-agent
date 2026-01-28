import type { Scenario, IntegrationResults } from '@/types'

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

export interface N8nResponse {
  success: boolean
  data?: {
    jiraTicket?: string
    confluencePage?: string
    confidenceScore?: number
    resolutionPath?: string
    message?: string
  }
  error?: string
}

export async function triggerN8nWorkflow(scenario: Scenario): Promise<N8nResponse> {
  if (!N8N_WEBHOOK_URL) {
    console.warn('N8N_WEBHOOK_URL not configured, using simulation mode')
    return {
      success: false,
      error: 'N8N webhook URL not configured. Please set NEXT_PUBLIC_N8N_WEBHOOK_URL environment variable.',
    }
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        incident_id: scenario.incident.id,
        title: scenario.incident.title,
        description: scenario.incident.description,
        component: scenario.incident.component,
        severity: scenario.incident.severity,
        user_email: scenario.incident.user_email,
        error_code: scenario.incident.error_code,
        user_impact: scenario.incident.user_impact,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    return {
      success: true,
      data: {
        jiraTicket: data.jiraTicket || data.ticketId,
        confluencePage: data.confluencePage || data.pageUrl,
        confidenceScore: data.confidenceScore || data.confidence,
        resolutionPath: data.resolutionPath || data.action,
        message: data.message,
      },
    }
  } catch (error) {
    console.error('Error triggering n8n workflow:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export function isLiveModeAvailable(): boolean {
  return !!N8N_WEBHOOK_URL
}
