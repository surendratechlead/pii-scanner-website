'use client'

import { ErrorBoundary } from '@/components/error-boundary'
import { Header } from '@/components/sections/header'
import { HeroSection } from '@/components/sections/hero-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { DatabaseSection } from '@/components/sections/database-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { FAQSection } from '@/components/sections/faq-section'
import { CTASection } from '@/components/sections/cta-section'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <FeaturesSection />
          <DatabaseSection />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
