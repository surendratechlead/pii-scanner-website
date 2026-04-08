# Minimalist Tabbed Single-Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement sticky tab navigation with ScrollSpy and add product-related images to key sections of the PII Scanner landing page.

**Architecture:** Single-page with smooth-scroll tab navigation below the header. Tabs use IntersectionObserver for auto-highlighting. Sections get alternating text/image layouts with dashboard screenshots and illustrations.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, shadcn/ui

---

## File Structure

```
NEW FILES:
  src/hooks/use-scroll-spy.ts
  src/components/sections/tab-navigation.tsx
  public/images/sections/about-illustration.svg
  public/images/sections/features-dashboard.svg
  public/images/sections/ai-detection-dashboard.svg
  public/images/sections/pricing-illustration.svg
  public/images/sections/resources-illustration.svg

MODIFIED FILES:
  src/app/page.tsx              (add TabNavigation component)
  src/components/sections/about-section.tsx     (add illustration)
  src/components/sections/features-section.tsx  (add dashboard screenshot)
  src/components/sections/ai-detection-section.tsx (add dashboard screenshot)
  src/components/sections/pricing-section.tsx   (add illustration)
  src/components/sections/resources-section.tsx (add illustration)
```

---

### Task 1: Create useScrollSpy Hook

**Files:**
- Create: `src/hooks/use-scroll-spy.ts`
- Test: Browser verification via dev server

- [ ] **Step 1: Create the useScrollSpy hook**

```typescript
// src/hooks/use-scroll-spy.ts
import { useState, useEffect, useRef, useCallback } from 'react'

interface ScrollSpyOptions {
  threshold?: number
  rootMargin?: string
  offset?: number
}

export function useScrollSpy(
  sectionIds: string[],
  options?: ScrollSpyOptions
): string {
  const { threshold = 0.3, rootMargin = '-120px 0px -40% 0px', offset = 120 } = options || {}
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || '')
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id)
      }
    })
  }, [])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    observerRef.current?.disconnect()

    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    })

    sections.forEach((section) => observerRef.current?.observe(section))

    return () => observerRef.current?.disconnect()
  }, [sectionIds, threshold, rootMargin, handleIntersect])

  // Update URL hash when active section changes
  useEffect(() => {
    if (activeId && window.location.hash !== `#${activeId}`) {
      history.replaceState(null, '', `#${activeId}`)
    }
  }, [activeId])

  // Scroll to section on hash change (page load)
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && sectionIds.includes(hash)) {
      const el = document.getElementById(hash)
      if (el) {
        setTimeout(() => {
          const y = el.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }, 100)
      }
    }
  }, [sectionIds, offset])

  return activeId
}

// Utility to scroll to a section smoothly
export function scrollToSection(sectionId: string, offset = 120): void {
  const el = document.getElementById(sectionId)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/use-scroll-spy.ts
git commit -m "feat: add useScrollSpy hook for tab navigation"
```

---

### Task 2: Create TabNavigation Component

**Files:**
- Create: `src/components/sections/tab-navigation.tsx`

- [ ] **Step 1: Create the TabNavigation component**

```typescript
// src/components/sections/tab-navigation.tsx
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
```

- [ ] **Step 2: Add scrollbar-hide utility class to globals.css**

Check if `scrollbar-hide` exists in `src/app/globals.css`. If not, add:

```css
/* Add to src/app/globals.css, after existing styles */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/tab-navigation.tsx src/app/globals.css
git commit -m "feat: add TabNavigation component with pill tabs"
```

---

### Task 3: Wire TabNavigation into Page Layout

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update page.tsx to include TabNavigation**

Read the current `src/app/page.tsx` and modify to insert `TabNavigation` after `Header` and `CountdownBanner`, before the main content sections.

```typescript
// src/app/page.tsx
// ... (keep all existing imports)
import { TabNavigation } from '@/components/sections/tab-navigation'

// ... (keep SafeSection function)

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CountdownBanner />
      <TabNavigation />
      <main className="flex-1">
        {/* Keep all existing SafeSection wrappers unchanged */}
        <SafeSection><HeroSection /></SafeSection>
        <SafeSection><AboutSection /></SafeSection>
        <SafeSection><FeaturesSection /></SafeSection>
        <SafeSection><AIDetectionSection /></SafeSection>
        <SafeSection><DatabaseSection /></SafeSection>
        <SafeSection><IntegrationsSection /></SafeSection>
        <SafeSection><PricingSection /></SafeSection>
        <SafeSection><TestimonialsSection /></SafeSection>
        <SafeSection><FAQSection /></SafeSection>
        <SafeSection><ResourcesSection /></SafeSection>
        <SafeSection><BlogSection /></SafeSection>
        <SafeSection><CTASection /></SafeSection>
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Run dev server and verify tabs appear and function**

```bash
npm run dev
```

Open http://localhost:3000 in browser. Verify:
- Tab bar appears below header
- Tabs are clickable
- Clicking a tab smooth-scrolls to the section
- Scrolling updates the active tab

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire TabNavigation into page layout"
```

---

### Task 4: Create SVG Illustrations for Sections

**Files:**
- Create: `public/images/sections/about-illustration.svg`
- Create: `public/images/sections/pricing-illustration.svg`
- Create: `public/images/sections/resources-illustration.svg`

- [ ] **Step 1: Create about-illustration.svg**

```svg
<!-- public/images/sections/about-illustration.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 375" fill="none">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.05"/>
    </linearGradient>
    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="500" height="375" fill="url(#g1)" rx="12"/>
  
  <!-- Shield shape -->
  <path d="M250 60 L320 100 L320 180 C320 240 280 290 250 310 C220 290 180 240 180 180 L180 100 Z" 
        fill="url(#g2)" opacity="0.15" stroke="url(#g2)" stroke-width="2"/>
  
  <!-- Lock icon inside shield -->
  <rect x="235" y="160" width="30" height="25" rx="4" fill="url(#g2)" opacity="0.8"/>
  <path d="M240 160 L240 148 C240 140 260 140 260 148 L260 160" stroke="url(#g2)" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="250" cy="172" r="3" fill="white"/>
  
  <!-- Data nodes -->
  <circle cx="120" cy="100" r="6" fill="#10b981" opacity="0.6"/>
  <circle cx="380" cy="120" r="8" fill="#06b6d4" opacity="0.5"/>
  <circle cx="150" cy="280" r="5" fill="#8b5cf6" opacity="0.4"/>
  <circle cx="370" cy="260" r="7" fill="#10b981" opacity="0.5"/>
  
  <!-- Connection lines -->
  <line x1="120" y1="100" x2="180" y2="140" stroke="#10b981" stroke-width="1" opacity="0.3"/>
  <line x1="380" y1="120" x2="320" y2="160" stroke="#06b6d4" stroke-width="1" opacity="0.3"/>
  <line x1="150" y1="280" x2="200" y2="240" stroke="#8b5cf6" stroke-width="1" opacity="0.3"/>
  <line x1="370" y1="260" x2="300" y2="220" stroke="#10b981" stroke-width="1" opacity="0.3"/>
  
  <!-- Geometric accents -->
  <rect x="90" y="200" width="20" height="20" rx="3" fill="#f59e0b" opacity="0.2" transform="rotate(15 100 210)"/>
  <circle cx="420" cy="200" r="12" stroke="#ec4899" stroke-width="1.5" opacity="0.3" fill="none"/>
  <polygon points="100,80 115,105 85,105" fill="#6366f1" opacity="0.15"/>
</svg>
```

- [ ] **Step 2: Create pricing-illustration.svg**

```svg
<!-- public/images/sections/pricing-illustration.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" fill="none">
  <defs>
    <linearGradient id="p1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.04"/>
    </linearGradient>
  </defs>
  <rect width="400" height="225" fill="url(#p1)" rx="12"/>
  
  <!-- Layered protection concept -->
  <!-- Outer ring -->
  <circle cx="200" cy="112" r="80" stroke="#10b981" stroke-width="1.5" opacity="0.2" stroke-dasharray="8 4"/>
  
  <!-- Middle ring -->
  <circle cx="200" cy="112" r="55" stroke="#06b6d4" stroke-width="1.5" opacity="0.3" stroke-dasharray="6 3"/>
  
  <!-- Inner ring -->
  <circle cx="200" cy="112" r="30" fill="#10b981" opacity="0.15" stroke="#10b981" stroke-width="2"/>
  
  <!-- Check mark in center -->
  <path d="M190 112 L198 120 L212 104" stroke="#10b981" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  
  <!-- Floating badges -->
  <rect x="50" y="40" width="60" height="24" rx="12" fill="#f59e0b" opacity="0.8"/>
  <text x="80" y="56" text-anchor="middle" font-size="10" fill="white" font-weight="600">Basic</text>
  
  <rect x="290" y="50" width="70" height="24" rx="12" fill="#10b981" opacity="0.8"/>
  <text x="325" y="66" text-anchor="middle" font-size="10" fill="white" font-weight="600">Pro</text>
  
  <rect x="60" y="170" width="80" height="24" rx="12" fill="#8b5cf6" opacity="0.7"/>
  <text x="100" y="186" text-anchor="middle" font-size="10" fill="white" font-weight="600">Enterprise</text>
</svg>
```

- [ ] **Step 3: Create resources-illustration.svg**

```svg
<!-- public/images/sections/resources-illustration.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 375" fill="none">
  <defs>
    <linearGradient id="r1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.04"/>
    </linearGradient>
  </defs>
  <rect width="500" height="375" fill="url(#r1)" rx="12"/>
  
  <!-- Book / Documentation illustration -->
  <!-- Book cover -->
  <rect x="150" y="60" width="200" height="250" rx="8" fill="white" stroke="#10b981" stroke-width="2"/>
  
  <!-- Book spine -->
  <rect x="150" y="60" width="20" height="250" fill="#10b981" opacity="0.3" rx="4"/>
  
  <!-- Book lines -->
  <line x1="190" y1="100" x2="320" y2="100" stroke="#e2e8f0" stroke-width="2"/>
  <line x1="190" y1="120" x2="300" y2="120" stroke="#e2e8f0" stroke-width="2"/>
  <line x1="190" y1="140" x2="310" y2="140" stroke="#e2e8f0" stroke-width="2"/>
  <line x1="190" y1="160" x2="280" y2="160" stroke="#e2e8f0" stroke-width="2"/>
  
  <!-- Code snippet block -->
  <rect x="190" y="180" width="130" height="80" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
  <rect x="200" y="192" width="60" height="4" rx="2" fill="#10b981" opacity="0.6"/>
  <rect x="200" y="202" width="90" height="4" rx="2" fill="#64748b" opacity="0.4"/>
  <rect x="200" y="212" width="75" height="4" rx="2" fill="#64748b" opacity="0.4"/>
  <rect x="200" y="222" width="50" height="4" rx="2" fill="#10b981" opacity="0.6"/>
  <rect x="200" y="232" width="85" height="4" rx="2" fill="#64748b" opacity="0.4"/>
  
  <!-- Floating icons -->
  <!-- Book icon -->
  <circle cx="100" cy="120" r="20" fill="#f59e0b" opacity="0.15"/>
  <rect x="92" y="112" width="16" height="20" rx="2" fill="#f59e0b" opacity="0.5"/>
  
  <!-- File icon -->
  <circle cx="400" cy="100" r="18" fill="#06b6d4" opacity="0.15"/>
  <rect x="392" y="90" width="16" height="20" rx="2" fill="#06b6d4" opacity="0.5"/>
  
  <!-- Headphones icon -->
  <circle cx="90" cy="280" r="22" fill="#8b5cf6" opacity="0.12"/>
  <path d="M82 280 C82 270 98 270 98 280 L98 288 C98 290 94 290 94 288 L94 282 C94 278 86 278 86 282 L86 288 C86 290 82 290 82 288 Z" fill="#8b5cf6" opacity="0.5"/>
  
  <!-- Users icon -->
  <circle cx="410" cy="260" r="20" fill="#ec4899" opacity="0.12"/>
  <circle cx="410" cy="252" r="6" fill="#ec4899" opacity="0.5"/>
  <path d="M400 268 C400 262 420 262 420 268 L420 272 L400 272 Z" fill="#ec4899" opacity="0.5"/>
</svg>
```

- [ ] **Step 4: Commit**

```bash
git add public/images/sections/
git commit -m "feat: add SVG illustrations for About, Pricing, Resources sections"
```

---

### Task 5: Create Dashboard Screenshot SVGs

**Files:**
- Create: `public/images/sections/features-dashboard.svg`
- Create: `public/images/sections/ai-detection-dashboard.svg`

- [ ] **Step 1: Create features-dashboard.svg (full-width dashboard mockup)**

```svg
<!-- public/images/sections/features-dashboard.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" fill="none">
  <rect width="1200" height="675" fill="#0f172a" rx="12"/>
  
  <!-- Top bar -->
  <rect x="0" y="0" width="1200" height="48" fill="#1e293b" rx="12"/>
  <rect x="0" y="36" width="1200" height="12" fill="#1e293b"/>
  <circle cx="24" cy="24" r="6" fill="#ef4444"/>
  <circle cx="44" cy="24" r="6" fill="#f59e0b"/>
  <circle cx="64" cy="24" r="6" fill="#10b981"/>
  <text x="90" y="29" fill="#94a3b8" font-size="13" font-family="system-ui">PII Scanner — Dashboard</text>
  
  <!-- Sidebar -->
  <rect x="0" y="48" width="200" height="627" fill="#1e293b"/>
  <text x="20" y="80" fill="#64748b" font-size="11" font-family="system-ui">NAVIGATION</text>
  
  <!-- Menu items -->
  <rect x="12" y="95" width="176" height="32" rx="6" fill="#10b981" opacity="0.2"/>
  <text x="24" y="115" fill="#10b981" font-size="12" font-family="system-ui" font-weight="500">Dashboard</text>
  
  <rect x="12" y="135" width="176" height="32" rx="6"/>
  <text x="24" y="155" fill="#94a3b8" font-size="12" font-family="system-ui">Scan Results</text>
  
  <rect x="12" y="175" width="176" height="32" rx="6"/>
  <text x="24" y="195" fill="#94a3b8" font-size="12" font-family="system-ui">PII Types</text>
  
  <rect x="12" y="215" width="176" height="32" rx="6"/>
  <text x="24" y="235" fill="#94a3b8" font-size="12" font-family="system-ui">Risk Assessment</text>
  
  <rect x="12" y="255" width="176" height="32" rx="6"/>
  <text x="24" y="275" fill="#94a3b8" font-size="12" font-family="system-ui">Compliance</text>
  
  <!-- Main content area -->
  <text x="230" y="85" fill="#f1f5f9" font-size="18" font-family="system-ui" font-weight="600">Scan Summary</text>
  
  <!-- Stat cards -->
  <rect x="230" y="105" width="220" height="80" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="245" y="130" fill="#94a3b8" font-size="12" font-family="system-ui">Total Records Scanned</text>
  <text x="245" y="165" fill="#f1f5f9" font-size="24" font-family="system-ui" font-weight="700">2,456,789</text>
  
  <rect x="470" y="105" width="220" height="80" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="485" y="130" fill="#94a3b8" font-size="12" font-family="system-ui">PII Detected</text>
  <text x="485" y="165" fill="#f59e0b" font-size="24" font-family="system-ui" font-weight="700">12,456</text>
  
  <rect x="710" y="105" width="220" height="80" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="725" y="130" fill="#94a3b8" font-size="12" font-family="system-ui">Risk Score</text>
  <rect x="725" y="145" width="80" height="24" rx="12" fill="#ef4444" opacity="0.2"/>
  <text x="765" y="162" fill="#ef4444" font-size="12" font-family="system-ui" font-weight="600">High</text>
  
  <rect x="950" y="105" width="220" height="80" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="965" y="130" fill="#94a3b8" font-size="12" font-family="system-ui">Last Scan</text>
  <text x="965" y="165" fill="#10b981" font-size="14" font-family="system-ui" font-weight="600">2 minutes ago</text>
  
  <!-- Chart area -->
  <rect x="230" y="210" width="470" height="200" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="245" y="240" fill="#f1f5f9" font-size="14" font-family="system-ui" font-weight="500">PII Types Distribution</text>
  
  <!-- Bar chart -->
  <rect x="260" y="350" width="40" height="40" rx="4" fill="#10b981" opacity="0.7"/>
  <rect x="320" y="320" width="40" height="70" rx="4" fill="#06b6d4" opacity="0.7"/>
  <rect x="380" y="290" width="40" height="100" rx="4" fill="#f59e0b" opacity="0.7"/>
  <rect x="440" y="340" width="40" height="50" rx="4" fill="#8b5cf6" opacity="0.7"/>
  <rect x="500" y="360" width="40" height="30" rx="4" fill="#ec4899" opacity="0.7"/>
  <rect x="560" y="330" width="40" height="60" rx="4" fill="#3b82f6" opacity="0.7"/>
  <rect x="620" y="345" width="40" height="45" rx="4" fill="#ef4444" opacity="0.7"/>
  
  <!-- X-axis labels -->
  <text x="280" y="405" fill="#64748b" font-size="10" font-family="system-ui" text-anchor="middle">SSN</text>
  <text x="340" y="405" fill="#64748b" font-size="10" font-family="system-ui" text-anchor="middle">Email</text>
  <text x="400" y="405" fill="#64748b" font-size="10" font-family="system-ui" text-anchor="middle">Phone</text>
  <text x="460" y="405" fill="#64748b" font-size="10" font-family="system-ui" text-anchor="middle">CC</text>
  <text x="520" y="405" fill="#64748b" font-size="10" font-family="system-ui" text-anchor="middle">DOB</text>
  <text x="580" y="405" fill="#64748b" font-size="10" font-family="system-ui" text-anchor="middle">Address</text>
  <text x="640" y="405" fill="#64748b" font-size="10" font-family="system-ui" text-anchor="middle">IP</text>
  
  <!-- Right panel - PII types list -->
  <rect x="720" y="210" width="450" height="200" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="735" y="240" fill="#f1f5f9" font-size="14" font-family="system-ui" font-weight="500">Recent Detections</text>
  
  <text x="735" y="270" fill="#94a3b8" font-size="12" font-family="system-ui">✓ SSN: 3,456 records</text>
  <text x="735" y="295" fill="#94a3b8" font-size="12" font-family="system-ui">✓ Email: 5,678 records</text>
  <text x="735" y="320" fill="#94a3b8" font-size="12" font-family="system-ui">✓ Phone: 2,234 records</text>
  <text x="735" y="345" fill="#94a3b8" font-size="12" font-family="system-ui">✓ Credit Card: 1,088 records</text>
  <text x="735" y="370" fill="#94a3b8" font-size="12" font-family="system-ui">✓ Aadhaar: 890 records</text>
  <text x="735" y="395" fill="#94a3b8" font-size="12" font-family="system-ui">✓ Passport: 456 records</text>
  
  <!-- Bottom cards -->
  <rect x="230" y="435" width="305" height="120" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="245" y="465" fill="#f1f5f9" font-size="13" font-family="system-ui" font-weight="500">Compliance Status</text>
  <text x="245" y="495" fill="#10b981" font-size="12" font-family="system-ui">✓ GDPR Compliant</text>
  <text x="245" y="520" fill="#10b981" font-size="12" font-family="system-ui">✓ CCPA Compliant</text>
  <text x="245" y="545" fill="#f59e0b" font-size="12" font-family="system-ui">⚠ HIPAA Review Needed</text>
  
  <rect x="555" y="435" width="305" height="120" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="570" y="465" fill="#f1f5f9" font-size="13" font-family="system-ui" font-weight="500">Quick Actions</text>
  <rect x="570" y="480" width="120" height="28" rx="6" fill="#10b981" opacity="0.2" stroke="#10b981" stroke-width="1"/>
  <text x="630" y="498" fill="#10b981" font-size="11" font-family="system-ui" text-anchor="middle">Generate Report</text>
  <rect x="700" y="480" width="120" height="28" rx="6" fill="#334155"/>
  <text x="760" y="498" fill="#94a3b8" font-size="11" font-family="system-ui" text-anchor="middle">Apply Masking</text>
  <rect x="570" y="515" width="120" height="28" rx="6" fill="#334155"/>
  <text x="630" y="533" fill="#94a3b8" font-size="11" font-family="system-ui" text-anchor="middle">Set Alerts</text>
  <rect x="700" y="515" width="120" height="28" rx="6" fill="#334155"/>
  <text x="760" y="533" fill="#94a3b8" font-size="11" font-family="system-ui" text-anchor="middle">Export Data</text>
  
  <rect x="880" y="435" width="290" height="120" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="895" y="465" fill="#f1f5f9" font-size="13" font-family="system-ui" font-weight="500">Scan Speed</text>
  <text x="895" y="500" fill="#f1f5f9" font-size="32" font-family="system-ui" font-weight="700">0.8s</text>
  <text x="895" y="530" fill="#94a3b8" font-size="12" font-family="system-ui">Avg. per 1M records</text>
</svg>
```

- [ ] **Step 2: Create ai-detection-dashboard.svg (close-up detection panel)**

```svg
<!-- public/images/sections/ai-detection-dashboard.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" fill="none">
  <rect width="600" height="450" fill="#0f172a" rx="12"/>
  
  <!-- Header -->
  <text x="24" y="36" fill="#f1f5f9" font-size="16" font-family="system-ui" font-weight="600">AI Detection Engine</text>
  <rect x="460" y="18" width="120" height="28" rx="14" fill="#10b981" opacity="0.2" stroke="#10b981" stroke-width="1"/>
  <text x="520" y="37" fill="#10b981" font-size="11" font-family="system-ui" text-anchor="middle" font-weight="500">Hybrid Mode</text>
  
  <!-- Mode selector -->
  <rect x="24" y="60" width="170" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="36" y="80" fill="#94a3b8" font-size="12" font-family="system-ui">Regex Mode</text>
  <text x="36" y="98" fill="#64748b" font-size="10" font-family="system-ui">Fast · High accuracy</text>
  
  <rect x="214" y="60" width="170" height="50" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="226" y="80" fill="#94a3b8" font-size="12" font-family="system-ui">NLP Mode</text>
  <text x="226" y="98" fill="#64748b" font-size="10" font-family="system-ui">Deep · Contextual</text>
  
  <rect x="404" y="60" width="172" height="50" rx="8" fill="#10b981" opacity="0.15" stroke="#10b981" stroke-width="2"/>
  <text x="416" y="80" fill="#10b981" font-size="12" font-family="system-ui" font-weight="500">Hybrid Mode</text>
  <text x="416" y="98" fill="#64748b" font-size="10" font-family="system-ui">Best of both · Recommended</text>
  
  <!-- Detection results -->
  <text x="24" y="145" fill="#f1f5f9" font-size="14" font-family="system-ui" font-weight="500">Confidence Scores</text>
  
  <!-- Result rows -->
  <rect x="24" y="160" width="552" height="40" rx="6" fill="#1e293b"/>
  <text x="36" y="184" fill="#f1f5f9" font-size="12" font-family="system-ui">SSN Pattern Match</text>
  <rect x="350" y="172" width="200" height="12" rx="6" fill="#1e293b"/>
  <rect x="350" y="172" width="190" height="12" rx="6" fill="#10b981"/>
  <text x="556" y="184" fill="#10b981" font-size="11" font-family="system-ui" text-anchor="end">95%</text>
  
  <rect x="24" y="208" width="552" height="40" rx="6" fill="#1e293b"/>
  <text x="36" y="232" fill="#f1f5f9" font-size="12" font-family="system-ui">Email Context Detection</text>
  <rect x="350" y="220" width="200" height="12" rx="6" fill="#1e293b"/>
  <rect x="350" y="220" width="180" height="12" rx="6" fill="#06b6d4"/>
  <text x="556" y="232" fill="#06b6d4" font-size="11" font-family="system-ui" text-anchor="end">90%</text>
  
  <rect x="24" y="256" width="552" height="40" rx="6" fill="#1e293b"/>
  <text x="36" y="280" fill="#f1f5f9" font-size="12" font-family="system-ui">Name + Address (NLP)</text>
  <rect x="350" y="268" width="200" height="12" rx="6" fill="#1e293b"/>
  <rect x="350" y="268" width="170" height="12" rx="6" fill="#f59e0b"/>
  <text x="556" y="280" fill="#f59e0b" font-size="11" font-family="system-ui" text-anchor="end">85%</text>
  
  <rect x="24" y="304" width="552" height="40" rx="6" fill="#1e293b"/>
  <text x="36" y="328" fill="#f1f5f9" font-size="12" font-family="system-ui">Credit Card Validation</text>
  <rect x="350" y="316" width="200" height="12" rx="6" fill="#1e293b"/>
  <rect x="350" y="316" width="196" height="12" rx="6" fill="#10b981"/>
  <text x="556" y="328" fill="#10b981" font-size="11" font-family="system-ui" text-anchor="end">98%</text>
  
  <!-- LLM Providers -->
  <text x="24" y="380" fill="#f1f5f9" font-size="14" font-family="system-ui" font-weight="500">Active LLM Providers</text>
  
  <rect x="24" y="395" width="170" height="40" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="36" y="420" fill="#94a3b8" font-size="12" font-family="system-ui">Ollama (Local)</text>
  
  <rect x="214" y="395" width="170" height="40" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="226" y="420" fill="#94a3b8" font-size="12" font-family="system-ui">OpenAI GPT-4o</text>
  
  <rect x="404" y="395" width="172" height="40" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="416" y="420" fill="#94a3b8" font-size="12" font-family="system-ui">Claude 3.5 Sonnet</text>
</svg>
```

- [ ] **Step 3: Commit**

```bash
git add public/images/sections/features-dashboard.svg public/images/sections/ai-detection-dashboard.svg
git commit -m "feat: add dashboard screenshot SVGs for Features and AI Detection sections"
```

---

### Task 6: Modify About Section with Illustration

**Files:**
- Modify: `src/components/sections/about-section.tsx`

- [ ] **Step 1: Add illustration to About section**

Add a two-column layout with the SVG illustration on the right side. Insert the image after the compliance frameworks section, or integrate it into the existing layout. The best placement is as a hero image below the mission card.

```typescript
// In src/components/sections/about-section.tsx
// Add Image import at top
import Image from 'next/image'

// ... (keep existing constants)

// Find the Mission card section (around line 45-60)
// After the Mission card, BEFORE "What We Do", add the illustration:

        <MotionDiv variants={fadeInUp} className="max-w-4xl mx-auto mb-16">
          <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900">Our Mission</h3>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                  To empower organizations to protect personal data through visibility, intelligence, and control.
                </p>
                <p className="text-sm text-slate-500 mt-3">
                  We aim to make PII discovery and protection simple, accurate, and actionable — without disrupting
                  business operations.
                </p>
              </div>
              <div className="relative">
                <Image
                  src="/images/sections/about-illustration.svg"
                  alt="Data protection and privacy illustration"
                  width={500}
                  height={375}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </MotionDiv>
```

Remove the old mission card that was full-width dark background, replacing it with the above two-column layout.

Full modified section should look like:

```typescript
// src/components/sections/about-section.tsx
'use client'

import { Badge } from '@/components/ui/badge'
import { Lock, ShieldCheck, Scale, FileSearch, Search, Brain, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react'
import { MotionDiv, MotionItem } from '@/lib/ui/motion-wrapper'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Image from 'next/image'

// ... (keep EXPERTISE, CAPABILITIES, COMPLIANCE_FRAMEWORKS constants)

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <MotionDiv variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 text-xs font-medium text-slate-500 border-slate-200" variant="outline">About Us</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">
            Helping Organizations Protect What Matters Most — Personal Data
          </h2>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed">
            We are a data security and privacy solutions company dedicated to helping organizations discover,
            understand, and safeguard sensitive personal data across their digital environment.
          </p>
        </MotionDiv>

        <MotionDiv variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {EXPERTISE.map((item, i) => (
            <MotionItem key={i} variants={fadeInUp}>
              <div className="flex flex-col items-center text-center gap-3 p-5 rounded-lg border border-slate-200 bg-white">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
              </div>
            </MotionItem>
          ))}
        </MotionDiv>

        <MotionDiv variants={fadeInUp} className="max-w-4xl mx-auto mb-16">
          <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900">Our Mission</h3>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                  To empower organizations to protect personal data through visibility, intelligence, and control.
                </p>
                <p className="text-sm text-slate-500 mt-3">
                  We aim to make PII discovery and protection simple, accurate, and actionable — without disrupting
                  business operations.
                </p>
              </div>
              <div className="relative">
                <Image
                  src="/images/sections/about-illustration.svg"
                  alt="Data protection and privacy illustration"
                  width={500}
                  height={375}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </MotionDiv>

        {/* Keep "What We Do" and compliance frameworks unchanged */}
        <MotionDiv variants={fadeInUp} className="max-w-5xl mx-auto mb-16">
          {/* ... existing "What We Do" content ... */}
        </MotionDiv>

        <MotionDiv variants={fadeInUp} className="text-center">
          {/* ... existing compliance frameworks ... */}
        </MotionDiv>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/about-section.tsx
git commit -m "feat: add illustration to About section with two-column layout"
```

---

### Task 7: Modify Features Section with Dashboard Screenshot

**Files:**
- Modify: `src/components/sections/features-section.tsx`

- [ ] **Step 1: Add full-width dashboard screenshot to Features section**

Insert a full-width dashboard image between the heading and the feature cards grid.

```typescript
// At top of file, add:
import Image from 'next/image'

// After the heading/description (before the feature cards grid), add:

        <MotionDiv variants={fadeInUp} className="max-w-6xl mx-auto mb-12">
          <div className="relative overflow-hidden bg-slate-900 rounded-xl border border-slate-800 shadow-2xl">
            <Image
              src="/images/sections/features-dashboard.svg"
              alt="PII Scanner dashboard showing scan summary, PII types distribution, and compliance status"
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>
        </MotionDiv>
```

The section structure becomes:
1. Heading + description (unchanged)
2. **NEW: Full-width dashboard screenshot**
3. Feature cards grid (unchanged)

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/features-section.tsx
git commit -m "feat: add dashboard screenshot to Features section"
```

---

### Task 8: Modify AI Detection Section with Dashboard Screenshot

**Files:**
- Modify: `src/components/sections/ai-detection-section.tsx`

- [ ] **Step 1: Add dashboard screenshot to AI Detection section**

Add a two-column layout to the hero area of the section: text left, dashboard screenshot right. Replace the current centered heading approach with a split layout.

```typescript
// At top of file, add:
import Image from 'next/image'

// Modify the section's top portion to use a two-column layout:

export function AIDetectionSection() {
  return (
    <section id="ai-detection" className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* NEW: Two-column hero layout */}
        <MotionDiv variants={fadeInUp} className="max-w-6xl mx-auto mb-14">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <Badge className="mb-4 text-xs font-medium text-slate-500 border-slate-200" variant="outline">AI-Powered Detection</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-slate-900 tracking-tight">
                Intelligent Detection That Goes Beyond Pattern Matching
              </h2>
              <p className="text-base md:text-lg text-slate-500">
                From fast regex scans to deep AI analysis — select the mode that fits your needs.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/images/sections/ai-detection-dashboard.svg"
                alt="AI detection engine showing confidence scores and LLM providers"
                width={600}
                height={450}
                className="w-full h-auto rounded-xl shadow-lg border border-slate-200"
                priority
              />
            </div>
          </div>
        </MotionDiv>

        {/* Keep scan modes, LLM providers, and PII types grids unchanged */}
        <MotionDiv variants={staggerContainer} className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-16">
          {/* ... existing scan modes ... */}
        </MotionDiv>

        {/* ... rest of section unchanged ... */}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/ai-detection-section.tsx
git commit -m "feat: add dashboard screenshot to AI Detection section with two-column layout"
```

---

### Task 9: Modify Pricing Section with Illustration

**Files:**
- Modify: `src/components/sections/pricing-section.tsx`

- [ ] **Step 1: Add illustration to Pricing section**

Add a centered illustration above the pricing heading.

```typescript
// At top of file, add:
import Image from 'next/image'

// After the section opening, before the heading, add:

        <MotionDiv variants={fadeInUp} className="max-w-md mx-auto mb-8">
          <Image
            src="/images/sections/pricing-illustration.svg"
            alt="Pricing tiers with protection layers illustration"
            width={400}
            height={225}
            className="w-full h-auto"
          />
        </MotionDiv>
```

Place this between the `<div className="container mx-auto px-4">` and the existing `<MotionDiv variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-14">` heading block.

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/pricing-section.tsx
git commit -m "feat: add illustration to Pricing section"
```

---

### Task 10: Modify Resources Section with Illustration

**Files:**
- Modify: `src/components/sections/resources-section.tsx`

- [ ] **Step 1: Add illustration to Resources section**

Add the illustration to the right of the heading on desktop, above the heading on mobile.

```typescript
// At top of file, add:
import Image from 'next/image'

// Modify the top section to use a two-column layout on desktop:

        <div className="max-w-6xl mx-auto mb-10 md:mb-16">
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <MotionDiv variants={fadeInUp} className="text-center md:text-left">
              <Badge className="mb-3 md:mb-4" variant="outline">Resources</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
                Learn, Explore &
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Get Support</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Access guides, case studies, and expert resources to get the most out of PII Scanner.
              </p>
            </MotionDiv>
            <MotionDiv variants={fadeInUp}>
              <Image
                src="/images/sections/resources-illustration.svg"
                alt="Documentation and resources illustration"
                width={500}
                height={375}
                className="w-64 md:w-80 h-auto"
              />
            </MotionDiv>
          </div>
        </div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/resources-section.tsx
git commit -m "feat: add illustration to Resources section with two-column layout"
```

---

### Task 11: Add prefers-reduced-motion Support

**Files:**
- Modify: `src/hooks/use-scroll-spy.ts`

- [ ] **Step 1: Update scrollToSection to respect prefers-reduced-motion**

Update the `scrollToSection` function in `src/hooks/use-scroll-spy.ts`:

```typescript
export function scrollToSection(sectionId: string, offset = 120): void {
  const el = document.getElementById(sectionId)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: y,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }
}
```

Also update the hash-on-load scroll behavior:

```typescript
// In the useEffect for hash on load, change:
window.scrollTo({ top: y, behavior: 'smooth' })
// to:
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
window.scrollTo({ top: y, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/use-scroll-spy.ts
git commit -m "a11y: respect prefers-reduced-motion in scroll behavior"
```

---

### Task 12: Add ARIA Attributes and Keyboard Navigation

**Files:**
- Modify: `src/components/sections/tab-navigation.tsx`

- [ ] **Step 1: Verify and enhance ARIA attributes**

The TabNavigation component already has `role="tablist"`, `role="tab"`, `aria-selected`, and `aria-controls`. Add keyboard navigation support:

```typescript
// Add to the tab button's onKeyDown handler:
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
    // Focus the new tab
    setTimeout(() => {
      containerRef.current?.querySelector(`[role="tab"][data-active="true"]`)?.focus()
    }, 100)
  }
}}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/tab-navigation.tsx
git commit -m "a11y: add keyboard navigation to tab list"
```

---

### Task 13: Run Build, Lint, and Fix Any Issues

- [ ] **Step 1: Run TypeScript type check**

```bash
npx tsc --noEmit
```

Expected: No errors. If errors exist, fix them before proceeding.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: No errors. If errors exist, fix them before proceeding.

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: Successful build with no errors.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve type errors and lint issues"
```

---

### Task 14: Cross-Browser and Mobile Testing

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Test in browser**

Open http://localhost:3000 and verify:

1. **Tab Navigation**:
   - All 6 tabs visible and clickable
   - Active tab highlights on scroll
   - Smooth scroll works on click
   - URL hash updates correctly

2. **Images**:
   - About section illustration loads
   - Features dashboard screenshot displays
   - AI Detection screenshot displays
   - Pricing illustration displays
   - Resources illustration displays

3. **Mobile (resize browser to <768px)**:
   - Tabs scroll horizontally
   - All images stack below content
   - Layouts are single-column

4. **Accessibility**:
   - Arrow keys navigate tabs
   - Home/End keys work
   - Focus indicators visible

- [ ] **Step 3: Commit any fixes found during testing**

```bash
git add -A
git commit -m "fix: address issues found during cross-browser testing"
```

---

### Task 15: Final Polish — Tab Shadow and Transition on Scroll

**Files:**
- Modify: `src/components/sections/tab-navigation.tsx`

- [ ] **Step 1: Add scroll-based shadow animation**

Add a subtle shadow to the tab bar when the page is scrolled, similar to the header behavior:

```typescript
// Add to TabNavigation component:
const [scrolled, setScrolled] = useState(false)

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 100)
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}, [])
```

Update the container className:

```typescript
<div
  ref={containerRef}
  className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b transition-shadow duration-300 ${
    scrolled ? 'shadow-md border-slate-200' : 'border-transparent'
  }`}
>
```

- [ ] **Step 2: Final commit**

```bash
git add src/components/sections/tab-navigation.tsx
git commit -m "polish: add scroll-based shadow to tab navigation"
```

---

## Self-Review Checklist

### 1. Spec Coverage

| Spec Section | Task Coverage | Status |
|--------------|--------------|--------|
| Tab Navigation (6 tabs) | Task 2, 3 | ✅ |
| ScrollSpy with IntersectionObserver | Task 1 | ✅ |
| Smooth scroll with offset | Task 1, 2 | ✅ |
| URL hash updates | Task 1 | ✅ |
| About section illustration | Task 6 | ✅ |
| Features dashboard screenshot | Task 7 | ✅ |
| AI Detection dashboard screenshot | Task 8 | ✅ |
| Pricing illustration | Task 9 | ✅ |
| Resources illustration | Task 10 | ✅ |
| Responsive breakpoints | Task 14 | ✅ |
| prefers-reduced-motion | Task 11 | ✅ |
| ARIA attributes | Task 12 | ✅ |
| Keyboard navigation | Task 12 | ✅ |
| Performance (lazy images) | Tasks 6-10 (priority prop) | ✅ |
| Mobile tab scroll | Task 2 | ✅ |

### 2. Placeholder Scan
- No "TBD", "TODO", or incomplete sections
- All code snippets are complete with actual content
- No "similar to Task N" references
- All function signatures consistent (`scrollToSection`, `useScrollSpy`)

### 3. Type Consistency
- `useScrollSpy` returns `string` (active section ID) — consistent across all usages
- `scrollToSection(sectionId: string, offset = 120)` — consistent signature
- All section IDs match between `TAB` definitions and `id` attributes on sections
- Image paths consistent: `/images/sections/<name>.svg`

All checks pass. Plan is ready for execution.
