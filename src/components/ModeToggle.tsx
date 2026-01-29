'use client'

import { motion } from 'framer-motion'
import { PlayCircle, Wifi, WifiOff } from 'lucide-react'
import type { DemoMode } from '@/types'
import { isLiveModeAvailable } from '@/lib/n8n-client'

interface ModeToggleProps {
  mode: DemoMode
  onModeChange: (mode: DemoMode) => void
  disabled?: boolean
}

export function ModeToggle({ mode, onModeChange, disabled }: ModeToggleProps) {
  const liveAvailable = isLiveModeAvailable()

  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
      <span className="text-sm text-gray-400 hidden sm:inline">Mode:</span>
      <div className="flex items-center bg-slate-800/50 rounded-lg p-1">
        <button
          onClick={() => onModeChange('simulation')}
          disabled={disabled}
          className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
            mode === 'simulation'
              ? 'bg-slate-700 text-white'
              : 'text-gray-400 hover:text-gray-300'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <PlayCircle className="w-4 h-4" />
          <span className="hidden xs:inline">Simulation</span>
        </button>
        <button
          onClick={() => liveAvailable && onModeChange('live')}
          disabled={disabled || !liveAvailable}
          className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
            mode === 'live'
              ? 'bg-green-600/20 text-green-400'
              : 'text-gray-400 hover:text-gray-300'
          } ${disabled || !liveAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
          title={!liveAvailable ? 'Configure N8N_WEBHOOK_URL to enable live mode' : undefined}
        >
          {liveAvailable ? (
            <Wifi className="w-4 h-4" />
          ) : (
            <WifiOff className="w-4 h-4" />
          )}
          <span className="hidden xs:inline">Live</span>
        </button>
      </div>
      {mode === 'live' && liveAvailable && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden sm:flex items-center gap-1.5 text-xs text-green-400"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Connected
        </motion.span>
      )}
    </div>
  )
}
