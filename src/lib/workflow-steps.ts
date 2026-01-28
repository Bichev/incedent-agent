import type { WorkflowStep } from '@/types'

// Using Lucide icon names for the StepCard component
export const workflowStepTemplates: Omit<WorkflowStep, 'status' | 'duration' | 'result'>[] = [
  {
    id: 'trigger',
    name: 'SAP Incident Trigger',
    description: 'Receiving incident from SAP system via webhook',
    icon: 'Webhook',
  },
  {
    id: 'jira-create',
    name: 'Create Jira Task',
    description: 'Creating incident ticket in Jira',
    icon: 'TicketPlus',
  },
  {
    id: 'ai-assessment',
    name: 'AI Assessment',
    description: 'Analyzing incident with GPT-4',
    icon: 'Brain',
  },
  {
    id: 'pinecone-search',
    name: 'Similar Incident Search',
    description: 'Searching Pinecone for similar historical incidents',
    icon: 'SearchCode',
  },
  {
    id: 'decision',
    name: 'Resolution Decision',
    description: 'Calculating confidence and determining resolution path',
    icon: 'GitBranch',
  },
  {
    id: 'jira-update',
    name: 'Update Jira',
    description: 'Updating ticket with resolution or assignment',
    icon: 'FileCheck',
  },
  {
    id: 'confluence',
    name: 'Create Confluence KB',
    description: 'Documenting resolution in knowledge base',
    icon: 'BookOpen',
  },
  {
    id: 'notifications',
    name: 'Send Notifications',
    description: 'Notifying via Slack, Email, and Google Sheets',
    icon: 'Bell',
  },
  {
    id: 'complete',
    name: 'Workflow Complete',
    description: 'All steps executed successfully',
    icon: 'PartyPopper',
  },
]

export function createInitialSteps(): WorkflowStep[] {
  return workflowStepTemplates.map(template => ({
    ...template,
    status: 'pending' as const,
  }))
}

// Simulated step durations in milliseconds
export const stepDurations: Record<string, { min: number; max: number }> = {
  'trigger': { min: 500, max: 1000 },
  'jira-create': { min: 1000, max: 2000 },
  'ai-assessment': { min: 2000, max: 4000 },
  'pinecone-search': { min: 800, max: 1500 },
  'decision': { min: 1500, max: 3000 },
  'jira-update': { min: 800, max: 1500 },
  'confluence': { min: 1000, max: 2000 },
  'notifications': { min: 1500, max: 2500 },
  'complete': { min: 300, max: 500 },
}

export function getRandomDuration(stepId: string): number {
  const range = stepDurations[stepId] || { min: 500, max: 1000 }
  return Math.random() * (range.max - range.min) + range.min
}
