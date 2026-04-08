'use client'

import { useScrollSpy, scrollToSection } from '@/hooks/use-scroll-spy'
import { Info, Layers, Sparkles, DollarSign, BookOpen, FileText } from 'lucide-react'
import { useRef, useEffect } from 'react'

const TABS = [
  { id: 'about', label: 'About', icon: Info },
  { id: 'features', label: 'Features', icon: Layers },
  { id: 'ai-detection', label: 'AI Detection', icon: Sparkles },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'resources', label: 'Resources', icon: BookOpen },
  { id: 'blog', label: 'Blog', icon: FileText },
]

const SCROLL_OFFSET = 120

export function TabNavigation() {
  const sectionIds = TABS.map((tab) => tab.id)
  const activeId = useScrollSpy(sectionIds, { offset: SCROLL_OFFSET })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTabClick = (id: string) => {
    scrollToSection(id, SCROLL_OFFSET)
  }

  // Scroll active tab into view on mobile
  useEffect(() => {
    const activeTab = containerRef.current?.querySelector('[data-active="true"]')
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeId])

  return (
    <div
      ref={containerRef}
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
    >
      <div className="container mx-auto px-4">
        <nav
          className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label="Page sections"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = tab.id === activeId
            return (
              <button
                key={tab.id}
                role="tab"
                data-active={isActive}
                aria-selected={isActive}
                aria-controls={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  whitespace-nowrap transition-all duration-150
                  ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
