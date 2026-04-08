'use client'

import { ErrorBoundary } from '@/components/error-boundary'
import { Header } from '@/components/sections/header'
import { TabNavigation } from '@/components/sections/tab-navigation'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSection } from '@/components/sections/about-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { AIDetectionSection } from '@/components/sections/ai-detection-section'
import { DatabaseSection } from '@/components/sections/database-section'
import { IntegrationsSection } from '@/components/sections/integrations-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { FAQSection } from '@/components/sections/faq-section'
import { ResourcesSection } from '@/components/sections/resources-section'
import { BlogSection } from '@/components/sections/blog-section'
import { CTASection } from '@/components/sections/cta-section'
import { Footer } from '@/components/sections/footer'
import { CountdownBanner } from '@/components/sections/countdown-banner'

function SafeSection({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CountdownBanner />
      <TabNavigation />
      <main className="flex-1">
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
