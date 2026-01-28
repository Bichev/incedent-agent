import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Incident Agent Demo',
  description: 'SAP Incident Management AI Agent - Automated Triage and Resolution',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
