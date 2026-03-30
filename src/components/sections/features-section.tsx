'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Brain, Layers, BarChart3, Cloud, Shield } from 'lucide-react'
import { MotionDiv, MotionItem } from '@/components/ui/motion-wrapper'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  items: string[]
  footnote?: string
  color: string
}

const FEATURES: Feature[] = [
  {
    icon: <Search className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Automated PII Discovery',
    description: 'Automatically locate Personally Identifiable Information across:',
    items: [
      'File servers and shared drives',
      'Databases (structured data)',
      'Emails and attachments',
      'Cloud storage (OneDrive, SharePoint, S3, etc.)',
      'Endpoints and user workstations',
    ],
    footnote: 'Scans can be run on-demand, scheduled, or continuously, ensuring new and existing data is always monitored.',
    color: 'emerald',
  },
  {
    icon: <Brain className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Rule-Based & Pattern-Driven Classification',
    description: 'Detects PII using deterministic patterns, configurable rules, and jurisdiction-specific identifiers to ensure consistent and explainable results.',
    items: [
      'Names and contact details',
      'Aadhaar, PAN, SSN, Passport numbers',
      'Financial data (bank accounts, credit cards)',
      'Date of birth and addresses',
      'Employee and customer identifiers',
    ],
    footnote: 'Supports country-specific IDs and custom patterns to match your organization\'s business context.',
    color: 'teal',
  },
  {
    icon: <Layers className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Structured & Unstructured Data Coverage',
    description: 'Detect PII in both structured and unstructured data:',
    items: [
      'Databases and application tables',
      'Logs and audit trails',
      'PDFs, Word, Excel files',
      'Emails and chat exports',
      'Scanned documents (where supported)',
    ],
    footnote: 'No blind spots — visibility across all major data formats.',
    color: 'cyan',
  },
  {
    icon: <BarChart3 className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Risk-Based Dashboards & Reports',
    description: 'Get instant, actionable insights through dashboards and reports that show:',
    items: [
      'Types of PII detected',
      'High-risk locations and users',
      'Data age and exposure levels',
      'Compliance posture by regulation',
      'Trends over time',
    ],
    footnote: 'Reports are designed to be audit-ready and exportable for compliance and management review.',
    color: 'amber',
  },
  {
    icon: <Cloud className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Flexible Deployment Options',
    description: 'Deploy in the environment that fits your security requirements:',
    items: [
      'On-premise',
      'Private cloud',
      'Public cloud',
      'Hybrid environments',
    ],
    footnote: 'Scans can be performed within your environment, ensuring full data control and privacy.',
    color: 'rose',
  },
  {
    icon: <Shield className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Compliance & Privacy Enablement',
    description: 'Align with major privacy and security frameworks, including:',
    items: [
      'DPDP Act (India)',
      'GDPR',
      'ISO 27001 / SOC 2',
      'HIPAA / PCI-DSS',
    ],
    footnote: 'Supports data inventory and mapping, data subject access requests (DSARs), right to erasure and minimization, and evidence collection for audits.',
    color: 'violet',
  },
]

const COLOR_CLASSES: Record<string, { bg: string; text: string }> = {
  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-950', text: 'text-emerald-600' },
  teal: { bg: 'bg-teal-100 dark:bg-teal-950', text: 'text-teal-600' },
  cyan: { bg: 'bg-cyan-100 dark:bg-cyan-950', text: 'text-cyan-600' },
  amber: { bg: 'bg-amber-100 dark:bg-amber-950', text: 'text-amber-600' },
  rose: { bg: 'bg-rose-100 dark:bg-rose-950', text: 'text-rose-600' },
  violet: { bg: 'bg-violet-100 dark:bg-violet-950', text: 'text-violet-600' },
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <MotionDiv variants={fadeInUp} className="text-center max-w-4xl mx-auto mb-10 md:mb-16">
          <Badge className="mb-3 md:mb-4" variant="outline">Features</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Powerful PII Discovery. Intelligent Risk Visibility.
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Real Protection.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Our PII Scanning platform is designed to help organizations find, understand, and protect personal
            data across their entire digital ecosystem — accurately, continuously, and at scale.
          </p>
        </MotionDiv>

        <MotionDiv variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {FEATURES.map((feature, i) => {
            const colors = COLOR_CLASSES[feature.color]
            return (
              <MotionItem key={i} variants={fadeInUp}>
                <Card className="group h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-emerald-200 dark:hover:border-emerald-800">
                  <CardHeader className="p-4 md:p-6">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${colors.bg} flex items-center justify-center ${colors.text} mb-3 md:mb-4 group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg md:text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0 space-y-3">
                    <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
                    <ul className="space-y-1.5">
                      {feature.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm md:text-base">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colors.bg} ${colors.text} flex-shrink-0 ring-2 ring-current`} />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                    {feature.footnote && (
                      <p className="text-xs md:text-sm text-muted-foreground/80 italic pt-1 border-t border-border">
                        {feature.footnote}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </MotionItem>
            )
          })}
        </MotionDiv>
      </div>
    </section>
  )
}
