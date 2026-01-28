'use client'

import { useState, useEffect, useCallback } from 'react'

interface UseSLATimerReturn {
  elapsedSeconds: number
  remainingSeconds: number
  isRunning: boolean
  status: 'on_track' | 'at_risk' | 'breached'
  formattedElapsed: string
  formattedRemaining: string
  start: () => void
  stop: () => void
  reset: () => void
}

export function useSLATimer(slaTotalSeconds: number): UseSLATimerReturn {
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && startTime) {
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000
        setElapsedSeconds(elapsed)
      }, 100)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, startTime])

  const remainingSeconds = Math.max(0, slaTotalSeconds - elapsedSeconds)
  
  const status: 'on_track' | 'at_risk' | 'breached' = 
    remainingSeconds > slaTotalSeconds * 0.3 ? 'on_track' :
    remainingSeconds > 0 ? 'at_risk' : 'breached'

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const start = useCallback(() => {
    setStartTime(Date.now())
    setIsRunning(true)
  }, [])

  const stop = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setStartTime(null)
    setElapsedSeconds(0)
    setIsRunning(false)
  }, [])

  return {
    elapsedSeconds,
    remainingSeconds,
    isRunning,
    status,
    formattedElapsed: formatTime(elapsedSeconds),
    formattedRemaining: formatTime(remainingSeconds),
    start,
    stop,
    reset,
  }
}
