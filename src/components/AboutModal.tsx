'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Info, 
  Zap, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Brain,
  Search,
  GitBranch,
  Bell,
  Database,
  Workflow,
  ArrowDown
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
              {/* Overview */}
              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-semibold text-white">Overview</h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  AI Incident Agent is an autonomous IT service management system that uses AI to classify, 
                  analyze, and resolve incidents without human intervention. It replaces repetitive 
                  decision-making with intelligent automation using confidence-based routing.
                </p>
              </div>

              {/* Architecture Flow */}
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-semibold text-white">Architecture</h3>
                
                {/* Flow Steps */}
                <div className="space-y-3">
                  {/* Step 1: Ingestion */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Workflow className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white text-sm md:text-base">1. Incident Ingestion</h4>
                        <p className="text-xs md:text-sm text-gray-400 mt-1">
                          Receives incidents via Email, API, Chat, or Webhook triggers
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowDown className="w-4 h-4 text-slate-600" />
                  </div>

                  {/* Step 2: Classification */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white text-sm md:text-base">2. AI Classification Engine</h4>
                        <p className="text-xs md:text-sm text-gray-400 mt-1">
                          GPT-4o analyzes incident details, extracts category, urgency, complexity, and probable cause. 
                          Generates semantic embeddings for similarity search.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowDown className="w-4 h-4 text-slate-600" />
                  </div>

                  {/* Step 3: Vector Search */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <Database className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white text-sm md:text-base">3. Vector Similarity Search</h4>
                        <p className="text-xs md:text-sm text-gray-400 mt-1">
                          Pinecone searches historical incident database, returns top similar incidents 
                          with their resolutions to provide context for decision-making.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowDown className="w-4 h-4 text-slate-600" />
                  </div>

                  {/* Step 4: Decision Engine */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <GitBranch className="w-4 h-4 text-orange-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white text-sm md:text-base">4. AI Decision Engine</h4>
                        <p className="text-xs md:text-sm text-gray-400 mt-1">
                          Evaluates incident + classification + similar cases. Calculates confidence score (0-100%) 
                          and determines resolution path based on thresholds.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowDown className="w-4 h-4 text-slate-600" />
                  </div>

                  {/* Resolution Paths */}
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 md:p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs md:text-sm font-medium text-green-400">Auto-Resolve</span>
                      </div>
                      <p className="text-[10px] md:text-xs text-gray-400">
                        Confidence ≥80%: Execute resolution, update ticket, create KB article
                      </p>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 md:p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs md:text-sm font-medium text-yellow-400">Assisted</span>
                      </div>
                      <p className="text-[10px] md:text-xs text-gray-400">
                        50-79%: Assign to analyst with diagnostic hints and context
                      </p>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 md:p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="w-4 h-4 text-red-400" />
                        <span className="text-xs md:text-sm font-medium text-red-400">Escalate</span>
                      </div>
                      <p className="text-[10px] md:text-xs text-gray-400">
                        &lt;50%: Priority escalation to expert team with full context
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technology Stack */}
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-semibold text-white">Technology Stack</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-slate-800/30 rounded-xl p-4">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Core AI/ML</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                        <span><strong className="text-white">OpenAI GPT-4o-mini</strong> — Classification & decisions</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                        <span><strong className="text-white">text-embedding-3-small</strong> — Semantic embeddings</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                        <span><strong className="text-white">Pinecone</strong> — Vector database</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-4">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Orchestration & Integrations</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        <span><strong className="text-white">n8n</strong> — Workflow automation</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        <span><strong className="text-white">Jira & Confluence</strong> — Ticket & KB management</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        <span><strong className="text-white">Slack & Email</strong> — Notifications</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-slate-800/30 rounded-xl p-4">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Frontend & Infrastructure</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'].map(tech => (
                      <span key={tech} className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Principle */}
              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-slate-700/50 rounded-xl p-4">
                <p className="text-center text-sm md:text-base text-gray-300">
                  <span className="font-medium text-white">Universal Pattern:</span>{' '}
                  <span className="text-blue-400">Classify</span> → <span className="text-purple-400">Decide</span> → <span className="text-pink-400">Execute</span> → <span className="text-green-400">Learn</span>
                </p>
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
