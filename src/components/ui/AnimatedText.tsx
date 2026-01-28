'use client'

import { motion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
  const words = text.split(' ')

  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.05,
            ease: 'easeOut',
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

interface CountUpProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function CountUp({ value, duration = 1, prefix = '', suffix = '', className }: CountUpProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {prefix}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration }}
      >
        {value}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: duration }}
      >
        {suffix}
      </motion.span>
    </motion.span>
  )
}

interface StatusBadgeProps {
  status: 'pending' | 'running' | 'completed' | 'failed'
  text?: string
}

export function StatusBadge({ status, text }: StatusBadgeProps) {
  const statusConfig = {
    pending: {
      bg: 'bg-gray-500/20',
      text: 'text-gray-400',
      dot: 'bg-gray-400',
      label: text || 'Pending',
    },
    running: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-400',
      dot: 'bg-blue-400',
      label: text || 'Running',
    },
    completed: {
      bg: 'bg-green-500/20',
      text: 'text-green-400',
      dot: 'bg-green-400',
      label: text || 'Completed',
    },
    failed: {
      bg: 'bg-red-500/20',
      text: 'text-red-400',
      dot: 'bg-red-400',
      label: text || 'Failed',
    },
  }

  const config = statusConfig[status]

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${status === 'running' ? 'animate-pulse' : ''}`} />
      {config.label}
    </motion.span>
  )
}
