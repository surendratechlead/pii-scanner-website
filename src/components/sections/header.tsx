'use client'

import { useState } from 'react'
import { ShieldCheck, Menu, X } from 'lucide-react'

const TAB_LABELS = ['Home', 'Features', 'Databases', 'Pricing', 'Resources']

interface HeaderProps {
  activeTab: number
  onTabChange: (tab: number) => void
  onRequestDemo: () => void
}

export function Header({ activeTab, onTabChange, onRequestDemo }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleTabClick = (index: number) => {
    onTabChange(index)
    setMobileOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-teal-900/10">
      <div className="flex justify-between items-center px-6 lg:px-8 h-16 max-w-7xl mx-auto">
        <button onClick={() => onTabChange(0)} className="flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-teal-500" fill="currentColor" />
          <span className="text-xl font-black tracking-tighter text-white font-headline">
            PII Scanner
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1 text-sm font-medium tracking-tight">
          {TAB_LABELS.map((label, index) => (
            <button
              key={label}
              onClick={() => handleTabClick(index)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === index
                  ? 'text-teal-400 bg-teal-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onRequestDemo}
            className="hidden sm:inline-flex bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-teal-500/20 active:scale-95"
          >
            Request Demo
          </button>
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-lg border-t border-white/5 px-6 pb-6 pt-2">
          {TAB_LABELS.map((label, index) => (
            <button
              key={label}
              onClick={() => handleTabClick(index)}
              className={`block w-full text-left py-3 transition-colors font-medium ${
                activeTab === index
                  ? 'text-teal-400'
                  : 'text-slate-300 hover:text-teal-400'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => {
              onRequestDemo()
              setMobileOpen(false)
            }}
            className="mt-4 block w-full text-center bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Request Demo
          </button>
        </div>
      )}
    </nav>
  )
}
