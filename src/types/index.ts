// Demo mode types
export type DemoMode = 'simulation' | 'live'

// Incident severity levels
export type Severity = 'Critical' | 'High' | 'Medium' | 'Low'

// Resolution paths
export type ResolutionPath = 'auto_resolve' | 'assisted' | 'escalate'

// Step execution status
export type StepStatus = 'pending' | 'running' | 'completed' | 'failed'

// Incident data structure
export interface Incident {
  id: string
  title: string
  description: string
  error_code: string
  component: string
  severity: Severity
  user_email?: string
  user_impact?: string
  timestamp?: string
}

// Scenario definition
export interface Scenario {
  id: string
  name: string
  description: string
  icon: string
  color: 'green' | 'yellow' | 'red'
  incident: Incident
  expectedConfidence: number
  expectedPath: ResolutionPath
  resolution?: string[]
  diagnosticHints?: string[]
  timeSaved: string
  costSaved: string
  slaMinutes: number
}

// Workflow step definition
export interface WorkflowStep {
  id: string
  name: string
  description: string
  icon: string
  status: StepStatus
  duration?: number
  result?: StepResult
}

// Step result data
export interface StepResult {
  success: boolean
  data?: Record<string, unknown> | unknown[]
  message?: string
  link?: string
}

// Execution metrics
export interface ExecutionMetrics {
  startTime: number | null
  endTime: number | null
  totalDuration: number
  confidenceScore: number
  resolutionPath: ResolutionPath | null
  costSaved: string
  timeSaved: string
  slaStatus: 'on_track' | 'at_risk' | 'breached'
  slaRemainingSeconds: number
}

// Integration results
export interface IntegrationResults {
  jira: JiraResult | null
  confluence: ConfluenceResult | null
  slack: SlackResult | null
  email: EmailResult | null
}

export interface JiraResult {
  ticketId: string
  ticketUrl: string
  status: string
  priority: string
  assignee?: string
}

export interface ConfluenceResult {
  pageId: string
  pageUrl: string
  title: string
  space: string
}

export interface SlackResult {
  channel: string
  messageType: 'success' | 'warning' | 'error'
  timestamp: string
}

export interface EmailResult {
  to: string
  subject: string
  sent: boolean
}

// Similar incident from Pinecone
export interface SimilarIncident {
  id: string
  title: string
  similarity: number
  resolution: string
  component: string
}

// AI Assessment result
export interface AIAssessment {
  category: string
  urgency: string
  complexity: string
  probableCause: string
  keywords: string[]
}

// Decision engine result
export interface DecisionResult {
  confidenceScore: number
  recommendedAction: ResolutionPath
  reasoning: string
  resolutionSteps?: string[]
  diagnosticHints?: string[]
  estimatedResolutionTime: string
}
