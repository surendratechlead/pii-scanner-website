'use client'

import { useState, useRef, useCallback } from 'react'
import { Header } from '@/components/sections/header'
import { HeroSection } from '@/components/sections/hero-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { AIDetectionSection } from '@/components/sections/ai-detection-section'
import { DatabaseSection } from '@/components/sections/database-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { CTASection } from '@/components/sections/cta-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { FAQSection } from '@/components/sections/faq-section'
import { BlogSection } from '@/components/sections/blog-section'
import { Footer } from '@/components/sections/footer'
import { FormModal } from '@/components/form-modal'

type ModalType = 'demo' | 'trial' | 'contact' | null

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [modal, setModal] = useState<ModalType>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleTabChange = useCallback((tab: number) => {
    setActiveTab(tab)
    scrollRef.current?.scrollTo({ top: 0 })
  }, [])

  const openDemo = useCallback(() => setModal('demo'), [])
  const openTrial = useCallback(() => setModal('trial'), [])
  const openContact = useCallback(() => setModal('contact'), [])

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-300 overflow-hidden">
      <Header activeTab={activeTab} onTabChange={handleTabChange} onRequestDemo={openDemo} />

      <main className="flex-1 pt-16 overflow-hidden">
        <div ref={scrollRef} className="h-full overflow-y-auto scrollbar-thin">
          <div className={`tab-panel ${activeTab === 0 ? 'tab-panel-active' : ''}`}>
            {activeTab === 0 && <HeroSection onStartTrial={openTrial} onWatchDemo={openDemo} />}
          </div>
          <div className={`tab-panel ${activeTab === 1 ? 'tab-panel-active' : ''}`}>
            {activeTab === 1 && (
              <>
                <FeaturesSection />
                <AIDetectionSection />
              </>
            )}
          </div>
          <div className={`tab-panel ${activeTab === 2 ? 'tab-panel-active' : ''}`}>
            {activeTab === 2 && <DatabaseSection />}
          </div>
          <div className={`tab-panel ${activeTab === 3 ? 'tab-panel-active' : ''}`}>
            {activeTab === 3 && (
              <>
                <PricingSection onStartTrial={openTrial} onContactSales={openContact} />
                <CTASection onStartTrial={openTrial} onScheduleDemo={openDemo} />
              </>
            )}
          </div>
          <div className={`tab-panel ${activeTab === 4 ? 'tab-panel-active' : ''}`}>
            {activeTab === 4 && (
              <>
                <TestimonialsSection />
                <FAQSection />
                <BlogSection />
                <Footer onNavigate={handleTabChange} />
              </>
            )}
          </div>
        </div>
      </main>

      {modal && <FormModal type={modal} onClose={() => setModal(null)} />}
    </div>
  )
}
