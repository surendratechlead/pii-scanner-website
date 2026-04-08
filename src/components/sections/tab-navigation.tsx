'use client'

import { useScrollSpy, scrollToSection } from '@/hooks/use-scroll-spy'
import { Info, Layers, Sparkles, DollarSign, BookOpen, FileText } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b transition-shadow duration-300 ${
        scrolled ? 'shadow-md border-slate-200' : 'border-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav
          className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label="Page sections"
          onKeyDown={(e) => {
            const currentIndex = TABS.findIndex((tab) => tab.id === activeId)
            let newIndex = currentIndex

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
              e.preventDefault()
              newIndex = (currentIndex + 1) % TABS.length
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
              e.preventDefault()
              newIndex = (currentIndex - 1 + TABS.length) % TABS.length
            } else if (e.key === 'Home') {
              e.preventDefault()
              newIndex = 0
            } else if (e.key === 'End') {
              e.preventDefault()
              newIndex = TABS.length - 1
            }

            if (newIndex !== currentIndex) {
              const newTab = TABS[newIndex]
              handleTabClick(newTab.id)
              setTimeout(() => {
                ;(containerRef.current?.querySelector(`[role="tab"][data-active="true"]`) as HTMLElement)?.focus()
              }, 100)
            }
          }}
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
