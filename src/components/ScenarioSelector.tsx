'use client'

import { motion } from 'framer-motion'
import { CheckCircle, UserCog, AlertOctagon, ChevronRight, type LucideIcon } from 'lucide-react'
import { GlowingCard } from './ui/GlowingCard'
import type { Scenario } from '@/types'

const iconMap: Record<string, LucideIcon> = {
  CheckCircle,
  UserCog,
  AlertOctagon,
}

interface ScenarioSelectorProps {
  scenarios: Scenario[]
  selectedScenario: Scenario | null
  onSelect: (scenario: Scenario) => void
  disabled?: boolean
}

export function ScenarioSelector({
  scenarios,
  selectedScenario,
  onSelect,
  disabled = false,
}: ScenarioSelectorProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Select Scenario</h2>
      {scenarios.map((scenario, index) => {
        const Icon = iconMap[scenario.icon] || CheckCircle
        const isSelected = selectedScenario?.id === scenario.id
        
        return (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlowingCard
              glowColor={scenario.color}
              isActive={isSelected}
              onClick={() => onSelect(scenario)}
              disabled={disabled}
              className="p-3"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  scenario.color === 'green' ? 'bg-gradient-to-br from-green-500/30 to-emerald-600/20' :
                  scenario.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500/30 to-orange-600/20' :
                  'bg-gradient-to-br from-red-500/30 to-rose-600/20'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    scenario.color === 'green' ? 'text-green-400' :
                    scenario.color === 'yellow' ? 'text-yellow-400' :
                    'text-red-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white text-sm">{scenario.name}</h3>
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-white rotate-90' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      scenario.color === 'green' ? 'bg-green-500/20 text-green-400' :
                      scenario.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {scenario.expectedConfidence}%
                    </span>
                    <span className="text-xs text-gray-500">
                      {scenario.incident.severity}
                    </span>
                  </div>
                </div>
              </div>
              
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-gray-700/50"
                >
                  <p className="text-xs text-gray-400 mb-3">{scenario.description}</p>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Error Code</span>
                      <span className="text-white font-mono bg-gray-800/50 px-1.5 py-0.5 rounded">{scenario.incident.error_code}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Component</span>
                      <span className="text-gray-300">{scenario.incident.component}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Expected Path</span>
                      <span className={`capitalize font-medium ${
                        scenario.expectedPath === 'auto_resolve' ? 'text-green-400' :
                        scenario.expectedPath === 'assisted' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {scenario.expectedPath.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </GlowingCard>
          </motion.div>
        )
      })}
    </div>
  )
}
