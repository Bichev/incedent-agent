'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  Check, 
  Loader2, 
  AlertCircle, 
  Clock,
  Webhook,
  Ticket,
  Brain,
  Search,
  GitBranch,
  FileCheck,
  BookOpen,
  Bell,
  Sparkles,
  type LucideIcon
} from 'lucide-react'
import type { WorkflowStep } from '@/types'
import { StatusBadge } from './ui/AnimatedText'

// Map icon names to components
const iconMap: Record<string, LucideIcon> = {
  Webhook,
  TicketPlus: Ticket,
  Brain,
  SearchCode: Search,
  GitBranch,
  FileCheck,
  BookOpen,
  Bell,
  PartyPopper: Sparkles,
}

interface StepCardProps {
  step: WorkflowStep
  index: number
  isActive: boolean
  isComplete: boolean
}

export function StepCard({ step, index, isActive, isComplete }: StepCardProps) {
  const StepIcon = iconMap[step.icon] || Clock
  
  const getStatusIcon = () => {
    switch (step.status) {
      case 'completed':
        return <Check className="w-4 h-4 text-green-400" />
      case 'running':
        return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getBorderColor = () => {
    switch (step.status) {
      case 'completed':
        return 'border-green-500/40'
      case 'running':
        return 'border-blue-500/50'
      case 'failed':
        return 'border-red-500/40'
      default:
        return 'border-gray-800/50'
    }
  }

  const getBackgroundColor = () => {
    switch (step.status) {
      case 'completed':
        return 'bg-gradient-to-r from-green-500/10 to-transparent'
      case 'running':
        return 'bg-gradient-to-r from-blue-500/15 to-transparent'
      case 'failed':
        return 'bg-gradient-to-r from-red-500/10 to-transparent'
      default:
        return 'bg-slate-900/30'
    }
  }

  const getIconBgColor = () => {
    switch (step.status) {
      case 'completed':
        return 'bg-gradient-to-br from-green-500/30 to-emerald-600/20 text-green-400'
      case 'running':
        return 'bg-gradient-to-br from-blue-500/30 to-purple-600/20 text-blue-400'
      case 'failed':
        return 'bg-gradient-to-br from-red-500/30 to-orange-600/20 text-red-400'
      default:
        return 'bg-gray-800/50 text-gray-500'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        scale: isActive ? 1.01 : 1,
      }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className={`relative rounded-xl border p-3 transition-all duration-300 ${getBorderColor()} ${getBackgroundColor()}`}
    >
      {/* Active indicator pulse */}
      {isActive && step.status === 'running' && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-blue-500/50"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      <div className="flex items-start gap-3">
        {/* Step icon */}
        <motion.div 
          className={`relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${getIconBgColor()}`}
          animate={step.status === 'running' ? { rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 0.5, repeat: step.status === 'running' ? Infinity : 0, repeatDelay: 0.5 }}
        >
          <StepIcon className="w-5 h-5" />
          {step.status === 'completed' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"
            >
              <Check className="w-2.5 h-2.5 text-white" />
            </motion.div>
          )}
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <h3 className={`font-medium text-sm ${
              step.status === 'pending' ? 'text-gray-500' : 'text-white'
            }`}>
              {step.name}
            </h3>
            {getStatusIcon()}
          </div>
          
          <p className="text-xs text-gray-500 mb-2 line-clamp-1">{step.description}</p>

          {/* Status and duration */}
          <div className="flex items-center gap-2">
            <StatusBadge status={step.status} />
            {step.duration && (
              <span className="text-xs text-gray-500 font-mono">
                {(step.duration / 1000).toFixed(1)}s
              </span>
            )}
          </div>

          {/* Result preview */}
          <AnimatePresence>
            {step.result && step.status === 'completed' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 pt-2 border-t border-gray-700/30"
              >
                <p className="text-xs text-gray-400">{step.result.message}</p>
                {step.result.link && (
                  <a 
                    href={step.result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 mt-1 inline-flex items-center gap-1"
                  >
                    View details
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
