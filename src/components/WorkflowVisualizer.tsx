'use client'

import { motion } from 'framer-motion'
import { Activity, CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react'
import { StepCard } from './StepCard'
import type { WorkflowStep, Scenario } from '@/types'

interface WorkflowVisualizerProps {
  steps: WorkflowStep[]
  currentStepIndex: number
  isRunning: boolean
  scenario: Scenario | null
}

const severityConfig = {
  Critical: { bg: 'bg-red-500/20', text: 'text-red-400', icon: XCircle },
  High: { bg: 'bg-orange-500/20', text: 'text-orange-400', icon: AlertTriangle },
  Medium: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: Activity },
  Low: { bg: 'bg-gray-500/20', text: 'text-gray-400', icon: Activity },
}

export function WorkflowVisualizer({
  steps,
  currentStepIndex,
  isRunning,
  scenario,
}: WorkflowVisualizerProps) {
  const isComplete = currentStepIndex >= steps.length
  const completedSteps = steps.filter(s => s.status === 'completed').length

  return (
    <div className="glass-card p-5 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-white">Workflow Execution</h2>
          {scenario && (
            <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full">
              {completedSteps}/{steps.length} steps
            </span>
          )}
        </div>
        {isRunning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs text-blue-400 font-medium">Processing</span>
          </motion.div>
        )}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30"
          >
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-xs text-green-400 font-medium">Complete</span>
          </motion.div>
        )}
      </div>

      {/* Content */}
      {!scenario ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-4"
          >
            <ArrowRight className="w-8 h-8 text-gray-600" />
          </motion.div>
          <p className="text-gray-400 font-medium">Select a scenario to begin</p>
          <p className="text-sm text-gray-600 mt-2">
            Choose from Auto-Resolve, Assisted, or Escalation
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-0">
          {/* Incident Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-slate-800/80 to-slate-900/50 rounded-xl p-4 border border-slate-700/30 flex-shrink-0"
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                scenario.color === 'green' ? 'bg-gradient-to-br from-green-500/30 to-emerald-600/20' :
                scenario.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500/30 to-orange-600/20' :
                'bg-gradient-to-br from-red-500/30 to-rose-600/20'
              }`}>
                {(() => {
                  const config = severityConfig[scenario.incident.severity]
                  const Icon = config.icon
                  return <Icon className={`w-5 h-5 ${config.text}`} />
                })()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white text-sm leading-tight">{scenario.incident.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5 font-mono">{scenario.incident.id}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${severityConfig[scenario.incident.severity].bg} ${severityConfig[scenario.incident.severity].text}`}>
                    {scenario.incident.severity}
                  </span>
                  <span className="text-xs text-gray-500 font-mono bg-gray-800/50 px-2 py-0.5 rounded">
                    {scenario.incident.error_code}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Workflow Steps */}
          <div className="space-y-2">
            {steps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                isActive={index === currentStepIndex}
                isComplete={isComplete}
              />
            ))}
          </div>

          {/* Completion Summary */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-xl bg-gradient-to-r from-green-500/15 to-emerald-500/5 border border-green-500/30 flex-shrink-0"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 text-sm">Workflow Complete</h4>
                  <p className="text-xs text-gray-400">
                    Path: <span className="text-white capitalize">{scenario.expectedPath.replace('_', ' ')}</span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-900/50 rounded-lg p-2">
                  <span className="text-gray-500 block">Time Saved</span>
                  <span className="text-white font-medium">{scenario.timeSaved}</span>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-2">
                  <span className="text-gray-500 block">Cost Saved</span>
                  <span className="text-green-400 font-medium">{scenario.costSaved}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
