'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, RotateCcw, Zap } from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { ScenarioSelector } from '@/components/ScenarioSelector'
import { WorkflowVisualizer } from '@/components/WorkflowVisualizer'
import { SLADashboard } from '@/components/SLADashboard'
import { ResultsPanel } from '@/components/ResultsPanel'
import { ModeToggle } from '@/components/ModeToggle'
import { Footer } from '@/components/Footer'
import { AboutModal, AboutButton } from '@/components/AboutModal'
import { useWorkflowExecution } from '@/hooks/useWorkflowExecution'
import { scenarios } from '@/lib/scenarios'
import type { Scenario, DemoMode } from '@/types'

export default function Home() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null)
  const [mode, setMode] = useState<DemoMode>('simulation')
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  
  // Show About modal on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('ai-incident-agent-visited')
    if (!hasVisited) {
      setIsAboutOpen(true)
      localStorage.setItem('ai-incident-agent-visited', 'true')
    }
  }, [])
  
  const {
    steps,
    currentStepIndex,
    isRunning,
    results,
    metrics,
    generatedIncident,
    startExecution,
    resetExecution,
  } = useWorkflowExecution(selectedScenario, mode)

  const handleScenarioSelect = (scenario: Scenario) => {
    if (isRunning) return
    setSelectedScenario(scenario)
    resetExecution()
  }

  const handleStart = () => {
    if (selectedScenario && !isRunning) {
      startExecution()
    }
  }

  const handleReset = () => {
    resetExecution()
  }

  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col container mx-auto px-4 py-6">
        {/* Header with Controls */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold gradient-text">
                AI Incident Agent
              </h1>
              <p className="text-sm text-gray-400">
                SAP Incident Management - Automated Triage & Resolution
              </p>
            </div>
          </div>
          
          {/* Controls Row */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto overflow-x-auto">
            <AboutButton onClick={() => setIsAboutOpen(true)} />
            <ModeToggle mode={mode} onModeChange={setMode} disabled={isRunning} />
            
            <div className="flex items-center gap-2 ml-auto sm:ml-0 flex-shrink-0">
              <motion.button
                onClick={handleReset}
                disabled={!selectedScenario || isRunning}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 sm:p-2.5 rounded-lg transition-all ${
                  !selectedScenario || isRunning
                    ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
                title="Reset"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              
              <motion.button
                onClick={handleStart}
                disabled={!selectedScenario || isRunning}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 sm:gap-2 py-2 px-3 sm:py-2.5 sm:px-5 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                  !selectedScenario || isRunning
                    ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25'
                }`}
              >
                {isRunning ? (
                  <>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                    <span className="hidden xs:inline">Running...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Start</span>
                    <span className="hidden sm:inline">Demo</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </header>

        {/* Main Grid - Flex grow to fill space */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-0">
          {/* Left Sidebar - Scenario Selection & SLA */}
          <div className="lg:col-span-3 flex flex-col gap-5 min-h-0">
            <div className="flex-shrink-0">
              <ScenarioSelector
                scenarios={scenarios}
                selectedScenario={selectedScenario}
                onSelect={handleScenarioSelect}
                disabled={isRunning}
              />
            </div>
            
            <div className="flex-shrink-0">
              <SLADashboard
                metrics={metrics}
                isRunning={isRunning}
                scenario={selectedScenario}
              />
            </div>
          </div>

          {/* Center - Workflow Visualizer */}
          <div className="lg:col-span-5 min-h-0">
            <WorkflowVisualizer
              steps={steps}
              currentStepIndex={currentStepIndex}
              isRunning={isRunning}
              scenario={selectedScenario}
              generatedIncident={generatedIncident}
            />
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-4 min-h-0">
            <ResultsPanel
              results={results}
              scenario={selectedScenario}
              isComplete={results !== null}
              generatedIncident={generatedIncident}
            />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* About Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </main>
  )
}
