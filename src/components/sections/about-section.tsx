'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ShieldCheck, Search, Brain, BarChart3, AlertTriangle, CheckCircle, Lock, Users, Scale, FileSearch } from 'lucide-react'
import { MotionDiv, MotionItem } from '@/components/ui/motion-wrapper'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'

const EXPERTISE = [
  { icon: <Lock className="w-5 h-5" />, label: 'Information Security' },
  { icon: <ShieldCheck className="w-5 h-5" />, label: 'Data Privacy & Governance' },
  { icon: <Scale className="w-5 h-5" />, label: 'Regulatory Compliance' },
  { icon: <FileSearch className="w-5 h-5" />, label: 'Risk & Audit Management' },
]

const CAPABILITIES = [
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Discover',
    description: 'Automatically discover PII across files, databases, emails, endpoints, and cloud storage.',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Classify',
    description: 'Classify sensitive data using intelligent detection and customizable rules.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Assess Risk',
    description: 'Assess risk through clear dashboards and reports.',
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: 'Respond',
    description: 'Respond proactively to data exposure and compliance gaps.',
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Meet Requirements',
    description: 'Meet regulatory requirements with confidence.',
  },
]

const COMPLIANCE_FRAMEWORKS = ['DPDP Act (India)', 'GDPR', 'ISO 27001', 'SOC 2', 'HIPAA', 'PCI-DSS']

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <MotionDiv variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Badge className="mb-3 md:mb-4" variant="outline">About Us</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Helping Organizations Protect What Matters Most —
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Personal Data</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            In today&apos;s data-driven world, organizations collect and process vast amounts of personal information.
            With rising privacy regulations, increasing data breaches, and evolving cyber threats, protecting
            Personally Identifiable Information (PII) is no longer optional — it&apos;s critical.
          </p>
          <p className="text-base md:text-lg text-muted-foreground mt-4">
            We are a data security and privacy solutions company dedicated to helping organizations discover,
            understand, and safeguard sensitive personal data across their digital environment.
          </p>
        </MotionDiv>

        {/* Who We Are */}
        <MotionDiv variants={fadeInUp} className="max-w-5xl mx-auto mb-12 md:mb-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4">
            Who We Are
          </h3>
          <p className="text-base md:text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-6 md:mb-8">
            We specialize in PII scanning, data discovery, and information risk management. Our platform enables
            enterprises to gain complete visibility into where personal data resides, how it is used, and how to
            protect it effectively.
          </p>
          <MotionDiv variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {EXPERTISE.map((item, i) => (
              <MotionItem key={i} variants={fadeInUp}>
                <Card className="border-2 hover:border-emerald-300 dark:hover:border-emerald-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 md:p-6 flex flex-col items-center text-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                      {item.icon}
                    </div>
                    <span className="text-sm md:text-base font-medium">{item.label}</span>
                  </CardContent>
                </Card>
              </MotionItem>
            ))}
          </MotionDiv>
          <p className="text-sm md:text-base text-muted-foreground text-center mt-4 md:mt-6">
            We design solutions that are practical, scalable, and audit-ready, supporting organizations across
            industries such as banking, IT services, healthcare, insurance, and SaaS.
          </p>
        </MotionDiv>

        {/* Our Mission */}
        <MotionDiv variants={scaleIn} className="max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl md:rounded-3xl p-6 md:p-12 text-white text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:48px_48px]" />
            </div>
            <div className="relative">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">Our Mission</h3>
              <p className="text-base md:text-xl text-emerald-100 max-w-2xl mx-auto">
                To empower organizations to protect personal data through visibility, intelligence, and control.
              </p>
              <p className="text-sm md:text-base text-emerald-200 mt-3 md:mt-4 max-w-2xl mx-auto">
                We aim to make PII discovery and protection simple, accurate, and actionable — without disrupting
                business operations.
              </p>
            </div>
          </div>
        </MotionDiv>

        {/* What We Do */}
        <MotionDiv variants={fadeInUp} className="max-w-5xl mx-auto mb-12 md:mb-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4">
            What We Do
          </h3>
          <p className="text-base md:text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-6 md:mb-8">
            Our PII scanning platform helps organizations:
          </p>
          <MotionDiv variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {CAPABILITIES.map((cap, i) => (
              <MotionItem key={i} variants={fadeInUp}>
                <Card className="group border-2 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-4 md:p-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                      {cap.icon}
                    </div>
                    <h4 className="font-semibold text-base md:text-lg mb-2">{cap.title}</h4>
                    <p className="text-sm md:text-base text-muted-foreground">{cap.description}</p>
                  </CardContent>
                </Card>
              </MotionItem>
            ))}
          </MotionDiv>
          <div className="mt-6 md:mt-8 text-center">
            <p className="text-sm md:text-base text-muted-foreground mb-3">
              We support compliance with global and regional privacy frameworks, including:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {COMPLIANCE_FRAMEWORKS.map((framework, i) => (
                <Badge key={i} variant="outline" className="text-xs md:text-sm py-1 px-3">
                  {framework}
                </Badge>
              ))}
            </div>
          </div>
        </MotionDiv>

        {/* Trust & Responsibility */}
        <MotionDiv variants={fadeInUp} className="max-w-3xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">
            Trust & Responsibility
          </h3>
          <p className="text-base md:text-lg text-muted-foreground">
            We understand the sensitivity of personal data. That&apos;s why security, privacy, and ethical
            responsibility are embedded in everything we do — from product design to customer support.
          </p>
          <p className="text-base md:text-lg text-muted-foreground mt-4">
            Our solutions are built to work within your environment, ensuring you remain in control of your
            data at all times.
          </p>
        </MotionDiv>
      </div>
    </section>
  )
}
