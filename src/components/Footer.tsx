'use client'

import { motion } from 'framer-motion'
import { Globe, Linkedin, Github, Heart } from 'lucide-react'

const links = [
  {
    icon: Globe,
    label: 'Website',
    href: 'https://vladbichev.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/vladbichev',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/vladbichev',
  },
]

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-800/50 bg-slate-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left - Branding */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Built with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>
            <span>by</span>
            <a
              href="https://vladbichev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white hover:text-blue-400 transition-colors"
            >
              Vlad Bichev
            </a>
          </div>

          {/* Center - Tech Stack */}
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
            <span className="px-2 py-1 rounded bg-gray-800/50">Next.js</span>
            <span className="px-2 py-1 rounded bg-gray-800/50">n8n</span>
            <span className="px-2 py-1 rounded bg-gray-800/50">OpenAI</span>
            <span className="px-2 py-1 rounded bg-gray-800/50">Pinecone</span>
          </div>

          {/* Right - Social Links */}
          <div className="flex items-center gap-1">
            {links.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
                title={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
