'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Search, Brain, Layers, BarChart3, Cloud, Shield } from 'lucide-react'
import { MotionDiv, MotionItem } from '@/components/ui/motion-wrapper'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  items: string[]
  footnote?: string
}

const FEATURES: Feature[] = [
  {
    icon: <Search className="w-5 h-5" />,
    title: 'Automated PII Discovery',
    description: 'Automatically locate Personally Identifiable Information across:',
    items: [
      'File servers and shared drives',
      'Databases (structured data)',
      'Emails and attachments',
      'Cloud storage (OneDrive, SharePoint, S3)',
      'Endpoints and user workstations',
    ],
    footnote: 'Scans can be run on-demand, scheduled, or continuously.',
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: 'Rule-Based Classification',
    description: 'Detects PII using deterministic patterns, configurable rules, and jurisdiction-specific identifiers.',
    items: [
      'Names and contact details',
      'Aadhaar, PAN, SSN, Passport numbers',
      'Financial data (bank accounts, credit cards)',
      'Date of birth and addresses',
      'Employee and customer identifiers',
    ],
    footnote: 'Supports country-specific IDs and custom patterns.',
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: 'Structured & Unstructured Data',
    description: 'Detect PII in both structured and unstructured data:',
    items: [
      'Databases and application tables',
      'Logs and audit trails',
      'PDFs, Word, Excel files',
      'Emails and chat exports',
    ],
    footnote: 'No blind spots — visibility across all major formats.',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Risk-Based Dashboards',
    description: 'Get instant, actionable insights through dashboards that show:',
    items: [
      'Types of PII detected',
      'High-risk locations and users',
      'Data age and exposure levels',
      'Compliance posture by regulation',
    ],
    footnote: 'Reports are audit-ready and exportable.',
  },
  {
    icon: <Cloud className="w-5 h-5" />,
    title: 'Flexible Deployment',
    description: 'Deploy in the environment that fits your security requirements:',
    items: [
      'On-premise',
      'Private cloud',
      'Public cloud',
      'Hybrid environments',
    ],
    footnote: 'Full data control and privacy within your environment.',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Compliance Enablement',
    description: 'Align with major privacy and security frameworks:',
    items: [
      'DPDP Act (India)',
      'GDPR',
      'ISO 27001 / SOC 2',
      'HIPAA / PCI-DSS',
    ],
    footnote: 'Supports DSARs, right to erasure, and audit evidence.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-4">
        <MotionDiv variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-14">
          <Badge className="mb-4 text-xs font-medium text-slate-500 border-slate-200" variant="outline">Features</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
            Powerful PII Discovery. Intelligent Risk Visibility. Real Protection.
          </h2>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed">
            Find, understand, and protect personal data across your entire digital ecosystem — accurately, continuously, and at scale.
          </p>
        </MotionDiv>

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

        <MotionDiv variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <MotionItem key={i} variants={fadeInUp}>
              <div className="h-full bg-white rounded-xl border border-slate-200 p-6 md:p-7">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{feature.description}</p>
                <ul className="space-y-2 mb-4">
                  {feature.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span className="mt-2 w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
                {feature.footnote && (
                  <p className="text-xs text-slate-400 pt-3 border-t border-slate-100">
                    {feature.footnote}
                  </p>
                )}
              </div>
            </MotionItem>
          ))}
        </MotionDiv>
      </div>
    </section>
  )
}
