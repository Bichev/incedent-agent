'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Info, 
  Zap, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Shield,
  Layers,
  ArrowRight,
  CheckCircle,
  Building2,
  Headphones,
  Heart,
  Scale,
  Factory,
  ExternalLink
} from 'lucide-react'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 m-auto
                       w-[calc(100%-2rem)] max-w-4xl h-[85vh] min-h-[500px]
                       bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                       rounded-2xl shadow-2xl z-[60] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-700/50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg md:text-xl font-bold text-white truncate">AI Incident Agent</h2>
                  <p className="text-xs md:text-sm text-gray-400 truncate">Autonomous IT Service Management</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 md:space-y-8">
              {/* Hero Section */}
              <div className="text-center space-y-3">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Transform Your IT Operations with AI
                </h3>
                <p className="text-gray-300 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
                  Stop drowning in tickets. Let AI handle routine incidents automatically while your team focuses on what matters.
                </p>
              </div>

              {/* The Problem */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 md:p-5">
                <h4 className="text-base md:text-lg font-semibold text-red-400 mb-2 md:mb-3">The Problem</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    <span className="text-gray-300"><strong className="text-white">70% of L1 tickets</strong> are repetitive with known solutions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    <span className="text-gray-300"><strong className="text-white">2-4 hours</strong> average resolution for routine issues</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    <span className="text-gray-300"><strong className="text-white">$25-75 per ticket</strong> in labor costs, even for simple fixes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    <span className="text-gray-300"><strong className="text-white">SLA breaches</strong> cost millions in penalties annually</span>
                  </div>
                </div>
              </div>

              {/* The Solution */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 md:p-5">
                <h4 className="text-base md:text-lg font-semibold text-green-400 mb-3">The Solution: Autonomous AI Agents</h4>
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  <div className="space-y-1.5 md:space-y-2 text-center md:text-left">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-green-500/20 flex items-center justify-center mx-auto md:mx-0">
                      <Zap className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                    </div>
                    <h5 className="font-medium text-white text-xs md:text-sm">Instant Classification</h5>
                    <p className="text-[10px] md:text-sm text-gray-400 hidden md:block">AI analyzes incidents in milliseconds using GPT-4</p>
                  </div>
                  <div className="space-y-1.5 md:space-y-2 text-center md:text-left">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-green-500/20 flex items-center justify-center mx-auto md:mx-0">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                    </div>
                    <h5 className="font-medium text-white text-xs md:text-sm">Auto-Resolution</h5>
                    <p className="text-[10px] md:text-sm text-gray-400 hidden md:block">High-confidence incidents resolved automatically</p>
                  </div>
                  <div className="space-y-1.5 md:space-y-2 text-center md:text-left">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-green-500/20 flex items-center justify-center mx-auto md:mx-0">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                    </div>
                    <h5 className="font-medium text-white text-xs md:text-sm">Smart Escalation</h5>
                    <p className="text-[10px] md:text-sm text-gray-400 hidden md:block">Complex issues escalated with full context</p>
                  </div>
                </div>
              </div>

              {/* Impact Metrics */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Business Impact</h4>
                <div className="grid grid-cols-4 gap-2 md:gap-4">
                  <div className="bg-slate-800/50 rounded-xl p-2 md:p-4 text-center">
                    <Clock className="w-4 h-4 md:w-6 md:h-6 text-blue-400 mx-auto mb-1 md:mb-2" />
                    <div className="text-lg md:text-2xl font-bold text-white">85%</div>
                    <div className="text-[9px] md:text-xs text-gray-400">Faster</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-2 md:p-4 text-center">
                    <DollarSign className="w-4 h-4 md:w-6 md:h-6 text-green-400 mx-auto mb-1 md:mb-2" />
                    <div className="text-lg md:text-2xl font-bold text-white">$60+</div>
                    <div className="text-[9px] md:text-xs text-gray-400">Saved</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-2 md:p-4 text-center">
                    <Shield className="w-4 h-4 md:w-6 md:h-6 text-purple-400 mx-auto mb-1 md:mb-2" />
                    <div className="text-lg md:text-2xl font-bold text-white">99%</div>
                    <div className="text-[9px] md:text-xs text-gray-400">SLA</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-2 md:p-4 text-center">
                    <Layers className="w-4 h-4 md:w-6 md:h-6 text-orange-400 mx-auto mb-1 md:mb-2" />
                    <div className="text-lg md:text-2xl font-bold text-white">70%</div>
                    <div className="text-[9px] md:text-xs text-gray-400">Deflection</div>
                  </div>
                </div>
              </div>

              {/* Beyond IT */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Beyond IT: Universal Application</h4>
                <div className="grid grid-cols-5 gap-1.5 md:gap-3">
                  <div className="bg-slate-800/50 rounded-lg p-2 md:p-3 text-center">
                    <Headphones className="w-4 h-4 md:w-5 md:h-5 text-blue-400 mx-auto mb-0.5 md:mb-1" />
                    <div className="text-[9px] md:text-xs text-gray-300">Support</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2 md:p-3 text-center">
                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-400 mx-auto mb-0.5 md:mb-1" />
                    <div className="text-[9px] md:text-xs text-gray-300">Healthcare</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2 md:p-3 text-center">
                    <Building2 className="w-4 h-4 md:w-5 md:h-5 text-green-400 mx-auto mb-0.5 md:mb-1" />
                    <div className="text-[9px] md:text-xs text-gray-300">Finance</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2 md:p-3 text-center">
                    <Scale className="w-4 h-4 md:w-5 md:h-5 text-purple-400 mx-auto mb-0.5 md:mb-1" />
                    <div className="text-[9px] md:text-xs text-gray-300">Legal</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2 md:p-3 text-center">
                    <Factory className="w-4 h-4 md:w-5 md:h-5 text-orange-400 mx-auto mb-0.5 md:mb-1" />
                    <div className="text-[9px] md:text-xs text-gray-300">Industry</div>
                  </div>
                </div>
                <p className="text-gray-500 text-[10px] md:text-xs mt-2 md:mt-3 text-center italic">
                  Universal pattern: Classify → Decide → Execute → Learn
                </p>
              </div>

              {/* How It Works */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">How It Works</h4>
                <div className="grid grid-cols-5 gap-1 md:gap-2 text-xs md:text-sm">
                  <div className="flex flex-col items-center text-center gap-1 bg-slate-800/50 rounded-lg p-2 md:px-3 md:py-2">
                    <span className="text-blue-400 font-bold">1</span>
                    <span className="text-gray-300 text-[10px] md:text-xs">Incident</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1 bg-slate-800/50 rounded-lg p-2 md:px-3 md:py-2">
                    <span className="text-blue-400 font-bold">2</span>
                    <span className="text-gray-300 text-[10px] md:text-xs">Classify</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1 bg-slate-800/50 rounded-lg p-2 md:px-3 md:py-2">
                    <span className="text-blue-400 font-bold">3</span>
                    <span className="text-gray-300 text-[10px] md:text-xs">Search</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1 bg-slate-800/50 rounded-lg p-2 md:px-3 md:py-2">
                    <span className="text-blue-400 font-bold">4</span>
                    <span className="text-gray-300 text-[10px] md:text-xs">Decide</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1 bg-slate-800/50 rounded-lg p-2 md:px-3 md:py-2">
                    <span className="text-blue-400 font-bold">5</span>
                    <span className="text-gray-300 text-[10px] md:text-xs">Execute</span>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="bg-slate-800/30 rounded-xl p-3 md:p-5">
                <h4 className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 md:mb-3">Powered By</h4>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {['OpenAI', 'Pinecone', 'n8n', 'Next.js', 'Jira', 'Confluence', 'Slack', 'Vercel'].map(tech => (
                    <span key={tech} className="px-2 py-0.5 md:px-3 md:py-1 bg-slate-700/50 rounded-full text-[10px] md:text-xs text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-slate-700/50 bg-slate-900/50 flex-shrink-0">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-center sm:text-left">
                  <p className="text-xs md:text-sm text-gray-400">
                    Built by <a href="https://vladbichev.com" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-blue-400 transition-colors">Vlad Bichev</a>
                  </p>
                  <a 
                    href="https://www.linkedin.com/in/bichev/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    linkedin.com/in/bichev
                  </a>
                </div>
                <div className="flex gap-2 md:gap-3">
                  <a
                    href="https://github.com/Bichev/incedent-agent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs md:text-sm text-white transition-colors"
                  >
                    GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={onClose}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-xs md:text-sm font-medium text-white transition-colors"
                  >
                    Try Demo
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function AboutButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-gray-300 hover:text-white transition-all"
    >
      <Info className="w-4 h-4" />
      <span className="text-sm font-medium">About</span>
    </motion.button>
  )
}
