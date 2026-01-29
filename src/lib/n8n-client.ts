import type { Scenario, Incident, ResolutionPath } from '@/types'

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

export interface GeneratedIncidentResponse {
  incident: Incident
  error?: string
}

export async function generateIncident(
  scenarioType: ResolutionPath,
  baseIncident: Incident
): Promise<GeneratedIncidentResponse> {
  try {
    const response = await fetch('/api/generate-incident', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scenarioType,
        baseIncident,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return { incident: data.incident }
  } catch (error) {
    console.error('Error generating incident:', error)
    // Fallback to base incident
    return {
      incident: baseIncident,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export async function triggerN8nWorkflow(
  scenario: Scenario,
  customIncident?: Incident
): Promise<N8nResponse> {
  const incident = customIncident || scenario.incident
  if (!N8N_WEBHOOK_URL) {
    console.warn('N8N_WEBHOOK_URL not configured, using simulation mode')
    return {
      success: false,
      error: 'N8N webhook URL not configured. Please set NEXT_PUBLIC_N8N_WEBHOOK_URL environment variable.',
    }
  }

  try {
    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000) // 60 second timeout

    console.log('Triggering n8n workflow:', N8N_WEBHOOK_URL)
    
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        incident_id: incident.id,
        title: incident.title,
        description: incident.description,
        component: incident.component,
        severity: incident.severity,
        user_email: incident.user_email,
        error_code: incident.error_code,
        user_impact: incident.user_impact,
        timestamp: new Date().toISOString(),
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('n8n response error:', response.status, errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('n8n workflow response:', data)
    
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
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('n8n workflow timed out after 60 seconds')
      return {
        success: false,
        error: 'Workflow timed out. The n8n workflow may still be running.',
      }
    }
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
