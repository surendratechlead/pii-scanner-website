'use client'

import { ErrorBoundary } from '@/components/error-boundary'
import { Header } from '@/components/sections/header'
import { CountdownBanner } from '@/components/sections/countdown-banner'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSection } from '@/components/sections/about-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { DatabaseSection } from '@/components/sections/database-section'
import { AIDetectionSection } from '@/components/sections/ai-detection-section'
import { IntegrationsSection } from '@/components/sections/integrations-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ResourcesSection } from '@/components/sections/resources-section'
import { BlogSection } from '@/components/sections/blog-section'
import { FAQSection } from '@/components/sections/faq-section'
import { CTASection } from '@/components/sections/cta-section'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Header />
        <CountdownBanner />
        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <FeaturesSection />
          <AIDetectionSection />
          <DatabaseSection />
          <IntegrationsSection />
          <PricingSection />
          <TestimonialsSection />
          <ResourcesSection />
          <BlogSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
