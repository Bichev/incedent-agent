'use client'

import { motion } from 'framer-motion'
import { Timer, Brain, Coins, Zap, TrendingUp, ArrowRight } from 'lucide-react'
import type { ExecutionMetrics, Scenario } from '@/types'

interface SLADashboardProps {
  metrics: ExecutionMetrics
  isRunning: boolean
  scenario: Scenario | null
}

export function SLADashboard({ metrics, isRunning, scenario }: SLADashboardProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getConfidenceBg = (score: number) => {
    if (score >= 80) return 'from-green-500/20 to-emerald-600/10'
    if (score >= 50) return 'from-yellow-500/20 to-orange-600/10'
    return 'from-red-500/20 to-rose-600/10'
  }

  const getSLAStatusColor = (status: string) => {
    switch (status) {
      case 'on_track': return 'text-green-400 bg-green-500/10'
      case 'at_risk': return 'text-yellow-400 bg-yellow-500/10'
      case 'breached': return 'text-red-400 bg-red-500/10'
      default: return 'text-gray-400 bg-gray-500/10'
    }
  }

  const getSLAProgressColor = (status: string) => {
    switch (status) {
      case 'on_track': return 'bg-gradient-to-r from-green-500 to-emerald-400'
      case 'at_risk': return 'bg-gradient-to-r from-yellow-500 to-orange-400'
      case 'breached': return 'bg-gradient-to-r from-red-500 to-rose-400'
      default: return 'bg-gray-500'
    }
  }

  const slaProgress = scenario 
    ? Math.min(100, ((scenario.slaMinutes * 60 - metrics.slaRemainingSeconds) / (scenario.slaMinutes * 60)) * 100)
    : 0

  return (
    <div className="glass-card p-4">
      <h2 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2">
        <TrendingUp className="w-4 h-4" />
        Live Metrics
      </h2>

      <div className="space-y-3">
        {/* SLA Timer */}
        <div className="p-3 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/50 border border-slate-700/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-gray-400">SLA Countdown</span>
            </div>
            <span className={`text-xs uppercase font-medium px-2 py-0.5 rounded-full ${getSLAStatusColor(metrics.slaStatus)}`}>
              {metrics.slaStatus.replace('_', ' ')}
            </span>
          </div>
          <div className="text-2xl font-mono text-white mb-2 tracking-wider">
            {scenario ? formatTime(metrics.slaRemainingSeconds) : '--:--'}
          </div>
          <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${getSLAProgressColor(metrics.slaStatus)}`}
              initial={{ width: 0 }}
              animate={{ width: `${slaProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          {scenario && (
            <p className="text-xs text-gray-600 mt-1.5">
              Target: {scenario.slaMinutes} min
            </p>
          )}
        </div>

        {/* Confidence Score */}
        <div className={`p-3 rounded-xl bg-gradient-to-br ${metrics.confidenceScore > 0 ? getConfidenceBg(metrics.confidenceScore) : 'from-slate-800/80 to-slate-900/50'} border border-slate-700/30`}>
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-400">AI Confidence</span>
          </div>
          <div className="flex items-end gap-1">
            <span className={`text-2xl font-bold ${metrics.confidenceScore > 0 ? getConfidenceColor(metrics.confidenceScore) : 'text-gray-600'}`}>
              {metrics.confidenceScore > 0 ? metrics.confidenceScore : '--'}
            </span>
            {metrics.confidenceScore > 0 && (
              <span className="text-sm text-gray-500 mb-0.5">%</span>
            )}
          </div>
          {metrics.resolutionPath && (
            <div className={`flex items-center gap-1 text-xs mt-1.5 ${
              metrics.resolutionPath === 'auto_resolve' ? 'text-green-400' :
              metrics.resolutionPath === 'assisted' ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              <ArrowRight className="w-3 h-3" />
              <span className="capitalize">{metrics.resolutionPath.replace('_', ' ')}</span>
            </div>
          )}
        </div>

        {/* Cost Savings & Time */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-600/5 border border-green-500/20">
            <div className="flex items-center gap-1.5 mb-1">
              <Coins className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs text-gray-500">Savings</span>
            </div>
            <div className="text-lg font-bold text-green-400">
              {metrics.costSaved !== '$0' ? metrics.costSaved : '--'}
            </div>
          </div>
          
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-600/5 border border-blue-500/20">
            <div className="flex items-center gap-1.5 mb-1">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs text-gray-500">Time</span>
            </div>
            <div className="text-lg font-mono text-white">
              {metrics.totalDuration > 0 
                ? `${metrics.totalDuration.toFixed(1)}s`
                : '--'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
