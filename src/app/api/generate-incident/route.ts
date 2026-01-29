import { NextRequest, NextResponse } from 'next/server'
import type { Incident, ResolutionPath } from '@/types'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

interface GenerateRequest {
  scenarioType: ResolutionPath
  baseIncident: Incident
}

const scenarioPrompts: Record<ResolutionPath, string> = {
  auto_resolve: `Generate a ROUTINE SAP incident that can be auto-resolved. 
    This should be a common, well-documented issue like:
    - Authorization/login errors (DYNP errors)
    - User profile synchronization issues
    - Password reset requests
    - Role assignment problems
    - Buffer/cache issues
    The incident should have HIGH confidence for auto-resolution (80-95%).`,
  
  assisted: `Generate a MODERATE complexity SAP incident that needs analyst assistance.
    This should be a performance or configuration issue like:
    - Transaction timeouts after transport/upgrade
    - Database performance degradation
    - Report/query slowness
    - Integration sync issues
    - Batch job failures
    The incident should have MEDIUM confidence (50-75%).`,
  
  escalate: `Generate a CRITICAL SAP incident requiring immediate expert escalation.
    This should be a severe system issue like:
    - Memory dumps (TSV_TNEW_PAGE_ALLOC_FAILED, etc.)
    - System crashes affecting many users
    - Data corruption concerns
    - Security breaches
    - Complete module failures
    The incident should have LOW confidence (20-45%) requiring expert review.`,
}

export async function POST(request: NextRequest) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    )
  }

  try {
    const { scenarioType, baseIncident }: GenerateRequest = await request.json()

    const prompt = `${scenarioPrompts[scenarioType]}

Based on the scenario type "${scenarioType}", generate a unique SAP incident.
Use the component type: ${baseIncident.component}

Return a JSON object with EXACTLY these fields:
{
  "id": "INC" followed by 6 random digits,
  "title": "Brief incident title (max 60 chars)",
  "description": "Detailed description of the issue (2-3 sentences describing the problem, when it started, and impact)",
  "error_code": "Realistic SAP error code",
  "component": "SAP module/component name",
  "severity": "${baseIncident.severity}",
  "user_email": "realistic.user@company.com",
  "user_impact": "Description of who/how many are affected"
}

Make the incident realistic and unique. Use real SAP terminology and error codes.
Return ONLY the JSON object, no additional text.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an SAP incident generator. Generate realistic SAP system incidents for demo purposes. Always respond with valid JSON only.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', response.status, errorText)
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('No content in OpenAI response')
    }

    // Parse the JSON from the response
    const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim()
    const generatedIncident: Incident = JSON.parse(cleanedContent)

    // Ensure all required fields are present
    const incident: Incident = {
      id: generatedIncident.id || `INC${Math.floor(Math.random() * 900000) + 100000}`,
      title: generatedIncident.title || baseIncident.title,
      description: generatedIncident.description || baseIncident.description,
      error_code: generatedIncident.error_code || baseIncident.error_code,
      component: generatedIncident.component || baseIncident.component,
      severity: baseIncident.severity, // Keep original severity
      user_email: generatedIncident.user_email || baseIncident.user_email,
      user_impact: generatedIncident.user_impact || baseIncident.user_impact,
    }

    return NextResponse.json({ incident })
  } catch (error) {
    console.error('Error generating incident:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate incident' },
      { status: 500 }
    )
  }
}
