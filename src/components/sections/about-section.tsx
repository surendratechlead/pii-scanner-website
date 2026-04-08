'use client'

import { Badge } from '@/components/ui/badge'
import { Lock, ShieldCheck, Scale, FileSearch, Search, Brain, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react'
import { MotionDiv, MotionItem } from '@/components/ui/motion-wrapper'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Image from 'next/image'

const EXPERTISE = [
  { icon: <Lock className="w-5 h-5" />, label: 'Information Security' },
  { icon: <ShieldCheck className="w-5 h-5" />, label: 'Data Privacy & Governance' },
  { icon: <Scale className="w-5 h-5" />, label: 'Regulatory Compliance' },
  { icon: <FileSearch className="w-5 h-5" />, label: 'Risk & Audit Management' },
]

const CAPABILITIES = [
  { icon: <Search className="w-5 h-5" />, title: 'Discover', description: 'Automatically discover PII across files, databases, emails, endpoints, and cloud storage.' },
  { icon: <Brain className="w-5 h-5" />, title: 'Classify', description: 'Classify sensitive data using intelligent detection and customizable rules.' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Assess Risk', description: 'Assess risk through clear dashboards and reports.' },
  { icon: <AlertTriangle className="w-5 h-5" />, title: 'Respond', description: 'Respond proactively to data exposure and compliance gaps.' },
  { icon: <CheckCircle className="w-5 h-5" />, title: 'Meet Requirements', description: 'Meet regulatory requirements with confidence.' },
]

const COMPLIANCE_FRAMEWORKS = ['DPDP Act (India)', 'GDPR', 'ISO 27001', 'SOC 2', 'HIPAA', 'PCI-DSS']

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

        <MotionDiv variants={fadeInUp} className="max-w-5xl mx-auto mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-3 text-slate-900">What We Do</h3>
          <p className="text-base text-slate-500 text-center max-w-2xl mx-auto mb-10">
            Our PII scanning platform helps organizations:
          </p>

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-px bg-slate-200" />
            {CAPABILITIES.map((cap, i) => (
              <div key={i} className="relative flex flex-col items-center text-center flex-1 px-2">
                <div className="w-11 h-11 rounded-full bg-slate-900 flex items-center justify-center text-white mb-3 relative z-10">
                  {cap.icon}
                </div>
                <h4 className="font-semibold text-sm text-slate-900 mb-1">{cap.title}</h4>
                <p className="text-xs text-slate-500 max-w-[160px]">{cap.description}</p>
              </div>
            ))}
          </div>
        </MotionDiv>

        <MotionDiv variants={fadeInUp} className="text-center">
          <p className="text-sm text-slate-500 mb-4">
            We support compliance with global and regional privacy frameworks
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {COMPLIANCE_FRAMEWORKS.map((framework, i) => (
              <Badge key={i} variant="outline" className="text-xs py-1 px-3 text-slate-500 border-slate-200 font-normal">
                {framework}
              </Badge>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}
