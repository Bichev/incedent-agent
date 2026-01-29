'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ExternalLink, 
  CheckCircle,
  Ticket,
  BookOpen,
  MessageCircle,
  Mail,
  Hourglass
} from 'lucide-react'
import type { IntegrationResults, Scenario } from '@/types'

interface ResultsPanelProps {
  results: IntegrationResults | null
  scenario: Scenario | null
  isComplete: boolean
}

type TabId = 'jira' | 'confluence' | 'slack' | 'email'

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'jira', label: 'Jira', icon: <Ticket className="w-4 h-4" /> },
  { id: 'confluence', label: 'Confluence', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'slack', label: 'Slack', icon: <MessageCircle className="w-4 h-4" /> },
  { id: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
]

export function ResultsPanel({ results, scenario, isComplete }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>('jira')

  if (!scenario) {
    return (
      <div className="glass-card p-6 h-full flex flex-col items-center justify-center text-center">
        <span className="text-4xl mb-4">📊</span>
        <h3 className="text-lg font-medium text-gray-300 mb-2">Integration Results</h3>
        <p className="text-sm text-gray-500">
          Results from Jira, Confluence, Slack, and Email will appear here
        </p>
      </div>
    )
  }

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white mb-4">Integration Results</h2>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 p-1 bg-slate-800/50 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-slate-700 text-white'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full text-center py-12"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center mb-4">
                <Hourglass className="w-7 h-7 text-gray-500" />
              </div>
              <p className="text-gray-400 text-sm">Waiting for workflow completion...</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {activeTab === 'jira' && results?.jira && (
                <JiraPreview result={results.jira} scenario={scenario} />
              )}
              {activeTab === 'confluence' && (
                <ConfluencePreview result={results?.confluence ?? null} scenario={scenario} />
              )}
              {activeTab === 'slack' && results?.slack && (
                <SlackPreview result={results.slack} scenario={scenario} />
              )}
              {activeTab === 'email' && results?.email && (
                <EmailPreview result={results.email} scenario={scenario} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function JiraPreview({ result, scenario }: { result: NonNullable<IntegrationResults['jira']>; scenario: Scenario }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="font-medium text-white">Ticket Created</span>
        </div>
        <a
          href={result.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
        >
          Open <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-blue-400">{result.ticketId}</span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            result.status === 'Resolved' ? 'bg-green-500/20 text-green-400' :
            result.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {result.status}
          </span>
        </div>
        
        <h3 className="text-white font-medium">{scenario.incident.title}</h3>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-400">Priority:</span>
            <span className="text-white ml-2">{result.priority}</span>
          </div>
          {result.assignee && (
            <div>
              <span className="text-gray-400">Assignee:</span>
              <span className="text-white ml-2">{result.assignee}</span>
            </div>
          )}
        </div>

        {scenario.expectedPath === 'auto_resolve' && scenario.resolution && (
          <div className="pt-3 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-2">Resolution Steps:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
              {scenario.resolution.slice(0, 4).map((step, i) => (
                <li key={i}>{step}</li>
              ))}
              {scenario.resolution.length > 4 && (
                <li className="text-gray-500">...and {scenario.resolution.length - 4} more</li>
              )}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}

function ConfluencePreview({ result, scenario }: { result: IntegrationResults['confluence']; scenario: Scenario }) {
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <span className="text-3xl mb-3">📝</span>
        <p className="text-gray-400">KB article not created</p>
        <p className="text-sm text-gray-500 mt-1">
          Only auto-resolved incidents generate documentation
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="font-medium text-white">KB Article Created</span>
        </div>
        <a
          href={result.pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
        >
          Open <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">
            {result.space}
          </span>
        </div>
        <h3 className="text-white font-medium mb-4">{result.title}</h3>
        
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-slate-900/50 rounded border-l-2 border-blue-500">
            <p className="text-gray-400 mb-1">Incident Details</p>
            <p className="text-gray-300">ID: {scenario.incident.id}</p>
            <p className="text-gray-300">Error: {scenario.incident.error_code}</p>
          </div>
          
          {scenario.resolution && (
            <div className="p-3 bg-slate-900/50 rounded border-l-2 border-green-500">
              <p className="text-gray-400 mb-1">Resolution Steps</p>
              <ol className="list-decimal list-inside text-gray-300">
                {scenario.resolution.slice(0, 3).map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SlackPreview({ result, scenario }: { result: NonNullable<IntegrationResults['slack']>; scenario: Scenario }) {
  const getMessageStyle = () => {
    switch (result.messageType) {
      case 'success': return 'border-l-green-500 bg-green-500/5'
      case 'warning': return 'border-l-yellow-500 bg-yellow-500/5'
      case 'error': return 'border-l-red-500 bg-red-500/5'
    }
  }

  const getEmoji = () => {
    switch (result.messageType) {
      case 'success': return '✅'
      case 'warning': return '🟡'
      case 'error': return '🔴'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-400" />
        <span className="font-medium text-white">Message Sent</span>
        <span className="text-sm text-gray-500">{result.channel}</span>
      </div>

      <div className={`bg-slate-800/50 rounded-lg p-4 border-l-4 ${getMessageStyle()}`}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold">
            AI
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-white">SAP Incident Agent</span>
              <span className="text-xs text-gray-500">APP</span>
            </div>
            <div className="text-sm text-gray-300 space-y-2">
              <p>
                <span className="text-lg mr-1">{getEmoji()}</span>
                <strong>
                  {result.messageType === 'success' ? 'Auto-Resolved: ' :
                   result.messageType === 'warning' ? 'Assisted Resolution: ' :
                   'Escalated: '}
                </strong>
                {scenario.incident.id}
              </p>
              <p><strong>Incident:</strong> {scenario.incident.title}</p>
              <p><strong>Confidence:</strong> {scenario.expectedConfidence}%</p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-slate-700 rounded text-xs">View Ticket</span>
                {scenario.expectedPath === 'auto_resolve' && (
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs">View KB</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmailPreview({ result, scenario }: { result: NonNullable<IntegrationResults['email']>; scenario: Scenario }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-400" />
        <span className="font-medium text-white">Email Sent</span>
      </div>

      <div className="bg-slate-800/50 rounded-lg overflow-hidden">
        <div className="bg-slate-900/50 p-3 border-b border-gray-700">
          <div className="grid grid-cols-[60px_1fr] gap-2 text-sm">
            <span className="text-gray-500">To:</span>
            <span className="text-gray-300">{result.to}</span>
            <span className="text-gray-500">Subject:</span>
            <span className="text-white font-medium">{result.subject}</span>
          </div>
        </div>
        
        <div className="p-4 text-sm text-gray-300 space-y-3">
          <p>Dear User,</p>
          <p>
            Your incident <strong className="text-white">{scenario.incident.id}</strong> has been 
            {scenario.expectedPath === 'auto_resolve' 
              ? ' automatically resolved by our AI system.'
              : scenario.expectedPath === 'assisted'
              ? ' assigned to a specialist for investigation.'
              : ' escalated to our expert team for immediate attention.'}
          </p>
          {scenario.expectedPath === 'auto_resolve' && scenario.resolution && (
            <div>
              <p className="mb-2">Resolution steps:</p>
              <ol className="list-decimal list-inside pl-2 space-y-1">
                {scenario.resolution.slice(0, 3).map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          )}
          <p className="text-gray-500 pt-2">Best regards,<br />IT Support Team</p>
        </div>
      </div>
    </div>
  )
}

