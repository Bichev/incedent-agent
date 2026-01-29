'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import type { 
  Scenario, 
  WorkflowStep, 
  ExecutionMetrics, 
  IntegrationResults,
  DemoMode 
} from '@/types'
import { createInitialSteps } from '@/lib/workflow-steps'
import { simulateStep, generateIntegrationResults } from '@/lib/simulation-engine'
import { triggerN8nWorkflow } from '@/lib/n8n-client'

interface UseWorkflowExecutionReturn {
  steps: WorkflowStep[]
  currentStepIndex: number
  isRunning: boolean
  results: IntegrationResults | null
  metrics: ExecutionMetrics
  startExecution: () => void
  resetExecution: () => void
}

const initialMetrics: ExecutionMetrics = {
  startTime: null,
  endTime: null,
  totalDuration: 0,
  confidenceScore: 0,
  resolutionPath: null,
  costSaved: '$0',
  timeSaved: '0 min',
  slaStatus: 'on_track',
  slaRemainingSeconds: 0,
}

export function useWorkflowExecution(
  scenario: Scenario | null,
  mode: DemoMode
): UseWorkflowExecutionReturn {
  const [steps, setSteps] = useState<WorkflowStep[]>(createInitialSteps())
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<IntegrationResults | null>(null)
  const [metrics, setMetrics] = useState<ExecutionMetrics>(initialMetrics)
  
  const executionRef = useRef<{ cancelled: boolean }>({ cancelled: false })
  const slaIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // SLA timer effect
  useEffect(() => {
    if (isRunning && scenario) {
      const startTime = Date.now()
      const slaSeconds = scenario.slaMinutes * 60
      
      slaIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000
        const remaining = Math.max(0, slaSeconds - elapsed)
        
        setMetrics(prev => ({
          ...prev,
          slaRemainingSeconds: remaining,
          slaStatus: remaining > slaSeconds * 0.3 ? 'on_track' :
                    remaining > 0 ? 'at_risk' : 'breached',
          totalDuration: elapsed,
        }))
      }, 100)
      
      return () => {
        if (slaIntervalRef.current) {
          clearInterval(slaIntervalRef.current)
        }
      }
    }
  }, [isRunning, scenario])

  const resetExecution = useCallback(() => {
    executionRef.current.cancelled = true
    if (slaIntervalRef.current) {
      clearInterval(slaIntervalRef.current)
    }
    setSteps(createInitialSteps())
    setCurrentStepIndex(-1)
    setIsRunning(false)
    setResults(null)
    setMetrics(initialMetrics)
  }, [])

  const startExecution = useCallback(async () => {
    if (!scenario || isRunning) return
    
    executionRef.current.cancelled = false
    setIsRunning(true)
    setResults(null)
    
    const startTime = Date.now()
    setMetrics(prev => ({
      ...prev,
      startTime,
      slaRemainingSeconds: scenario.slaMinutes * 60,
      slaStatus: 'on_track',
    }))

    const updatedSteps = createInitialSteps()
    setSteps(updatedSteps)

    // Execute each step
    for (let i = 0; i < updatedSteps.length; i++) {
      if (executionRef.current.cancelled) break
      
      setCurrentStepIndex(i)
      
      // Mark current step as running
      setSteps(prev => prev.map((step, idx) => 
        idx === i ? { ...step, status: 'running' as const } : step
      ))

      try {
        if (mode === 'simulation') {
          // Simulation mode - use mock data
          const { duration, result } = await simulateStep(updatedSteps[i].id, scenario)
          
          if (executionRef.current.cancelled) break
          
          // Update step with result
          setSteps(prev => prev.map((step, idx) => 
            idx === i ? { 
              ...step, 
              status: 'completed' as const, 
              duration,
              result 
            } : step
          ))

          // Update metrics on decision step
          if (updatedSteps[i].id === 'decision') {
            setMetrics(prev => ({
              ...prev,
              confidenceScore: scenario.expectedConfidence,
              resolutionPath: scenario.expectedPath,
            }))
          }
        } else {
          // Live mode - trigger actual n8n workflow
          if (i === 0) {
            // Fire off n8n workflow without blocking UI progression
            triggerN8nWorkflow(scenario)
              .then(response => {
                console.log('n8n workflow completed:', response)
                if (response.success && response.data) {
                  setMetrics(prev => ({
                    ...prev,
                    confidenceScore: response.data?.confidenceScore || scenario.expectedConfidence,
                    resolutionPath: (response.data?.resolutionPath as typeof prev.resolutionPath) || scenario.expectedPath,
                  }))
                }
              })
              .catch(error => {
                console.error('n8n workflow error:', error)
              })
          }
          
          // Simulate the visual steps with appropriate delays
          const stepDelay = i === 2 || i === 4 ? 1500 : 800 // Longer for AI steps
          await new Promise(resolve => setTimeout(resolve, stepDelay))
          
          if (executionRef.current.cancelled) break
          
          setSteps(prev => prev.map((step, idx) => 
            idx === i ? { 
              ...step, 
              status: 'completed' as const,
              duration: stepDelay,
            } : step
          ))

          // Update metrics on decision step
          if (updatedSteps[i].id === 'decision') {
            setMetrics(prev => ({
              ...prev,
              confidenceScore: prev.confidenceScore || scenario.expectedConfidence,
              resolutionPath: prev.resolutionPath || scenario.expectedPath,
            }))
          }
        }
      } catch (error) {
        console.error(`Error in step ${updatedSteps[i].id}:`, error)
        setSteps(prev => prev.map((step, idx) => 
          idx === i ? { ...step, status: 'failed' as const } : step
        ))
        break
      }
    }

    if (!executionRef.current.cancelled) {
      const endTime = Date.now()
      const totalDuration = (endTime - startTime) / 1000
      
      // Generate final results
      const finalResults = generateIntegrationResults(scenario)
      setResults(finalResults)
      
      setMetrics(prev => ({
        ...prev,
        endTime,
        totalDuration,
        costSaved: scenario.costSaved,
        timeSaved: scenario.timeSaved,
      }))
    }

    setIsRunning(false)
  }, [scenario, isRunning, mode])

  return {
    steps,
    currentStepIndex,
    isRunning,
    results,
    metrics,
    startExecution,
    resetExecution,
  }
}
