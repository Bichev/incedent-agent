'use client'

import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface GlowingCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
  isActive?: boolean
  onClick?: () => void
  disabled?: boolean
}

const glowClasses = {
  blue: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] border-blue-500/30',
  green: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] border-green-500/30',
  yellow: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] border-yellow-500/30',
  red: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] border-red-500/30',
  purple: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] border-purple-500/30',
}

const activeGlowClasses = {
  blue: 'shadow-[0_0_30px_rgba(59,130,246,0.4)] border-blue-500/50',
  green: 'shadow-[0_0_30px_rgba(34,197,94,0.4)] border-green-500/50',
  yellow: 'shadow-[0_0_30px_rgba(234,179,8,0.4)] border-yellow-500/50',
  red: 'shadow-[0_0_30px_rgba(239,68,68,0.4)] border-red-500/50',
  purple: 'shadow-[0_0_30px_rgba(168,85,247,0.4)] border-purple-500/50',
}

export function GlowingCard({
  children,
  className,
  glowColor = 'blue',
  isActive = false,
  onClick,
  disabled = false,
}: GlowingCardProps) {
  return (
    <motion.div
      className={clsx(
        'relative rounded-xl border bg-slate-900/80 backdrop-blur-sm transition-all duration-300',
        glowClasses[glowColor],
        isActive && activeGlowClasses[glowColor],
        onClick && !disabled && 'cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={disabled ? undefined : onClick}
      whileHover={onClick && !disabled ? { scale: 1.02 } : undefined}
      whileTap={onClick && !disabled ? { scale: 0.98 } : undefined}
    >
      {children}
    </motion.div>
  )
}
