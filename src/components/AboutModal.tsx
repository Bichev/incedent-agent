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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                       md:w-[90vw] md:max-w-4xl md:max-h-[85vh] 
                       bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                       rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">AI Incident Agent</h2>
                  <p className="text-sm text-gray-400">Autonomous IT Service Management</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Hero Section */}
              <div className="text-center space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Transform Your IT Operations with AI
                </h3>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                  Stop drowning in tickets. Let AI handle routine incidents automatically while your team focuses on what matters.
                </p>
              </div>

              {/* The Problem */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
                <h4 className="text-lg font-semibold text-red-400 mb-3">The Problem</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
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
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">
                <h4 className="text-lg font-semibold text-green-400 mb-3">The Solution: Autonomous AI Agents</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-400" />
                    </div>
                    <h5 className="font-medium text-white">Instant Classification</h5>
                    <p className="text-sm text-gray-400">AI analyzes incidents in milliseconds using GPT-4 and semantic search</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <h5 className="font-medium text-white">Auto-Resolution</h5>
                    <p className="text-sm text-gray-400">High-confidence incidents resolved automatically without human intervention</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h5 className="font-medium text-white">Smart Escalation</h5>
                    <p className="text-sm text-gray-400">Complex issues escalated with full context and diagnostic hints</p>
                  </div>
                </div>
              </div>

              {/* Impact Metrics */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Business Impact</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">85%</div>
                    <div className="text-xs text-gray-400">Faster Resolution</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">$60-120</div>
                    <div className="text-xs text-gray-400">Saved Per Ticket</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <Shield className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">99.9%</div>
                    <div className="text-xs text-gray-400">SLA Compliance</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <Layers className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">70%</div>
                    <div className="text-xs text-gray-400">Ticket Deflection</div>
                  </div>
                </div>
              </div>

              {/* Beyond IT */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Beyond IT: Universal Application</h4>
                <p className="text-gray-400 text-sm mb-4">
                  The same AI-powered decision engine transforms any service domain:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                    <Headphones className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-300">Customer Support</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                    <Heart className="w-5 h-5 text-red-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-300">Healthcare</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                    <Building2 className="w-5 h-5 text-green-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-300">Financial Services</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                    <Scale className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-300">Legal & Compliance</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                    <Factory className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-300">Manufacturing</div>
                  </div>
                </div>
                <p className="text-gray-500 text-xs mt-3 text-center italic">
                  The pattern is universal: Classify → Decide → Execute → Learn
                </p>
              </div>

              {/* How It Works */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">How It Works</h4>
                <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm">
                  <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2">
                    <span className="text-blue-400 font-medium">1.</span>
                    <span className="text-gray-300">Incident Received</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 hidden md:block" />
                  <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2">
                    <span className="text-blue-400 font-medium">2.</span>
                    <span className="text-gray-300">AI Classification</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 hidden md:block" />
                  <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2">
                    <span className="text-blue-400 font-medium">3.</span>
                    <span className="text-gray-300">Similarity Search</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 hidden md:block" />
                  <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2">
                    <span className="text-blue-400 font-medium">4.</span>
                    <span className="text-gray-300">Decision Engine</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 hidden md:block" />
                  <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2">
                    <span className="text-blue-400 font-medium">5.</span>
                    <span className="text-gray-300">Execute & Notify</span>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="bg-slate-800/30 rounded-xl p-5">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Powered By</h4>
                <div className="flex flex-wrap gap-2">
                  {['OpenAI GPT-4o', 'Pinecone', 'n8n', 'Next.js', 'Jira', 'Confluence', 'Slack', 'Vercel'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-700/50 bg-slate-900/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-400">
                    Built by <span className="text-white font-medium">JAX AI Agency</span>
                  </p>
                  <a 
                    href="mailto:contact@jaxaiagency.com" 
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    contact@jaxaiagency.com
                  </a>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/Bichev/incedent-agent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition-colors"
                  >
                    GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-sm font-medium text-white transition-colors"
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
