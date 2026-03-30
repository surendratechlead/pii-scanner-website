'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { MotionDiv } from '@/components/ui/motion-wrapper'
import { fadeInUp } from '@/lib/animations'

interface BlogPost {
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  href: string
}

const BLOG_POSTS: BlogPost[] = [
  {
    title: 'ChatGPT and Generative AI: DPDPA Data Protection Risks',
    excerpt: 'Exploring the data protection risks posed by generative AI tools like ChatGPT under India\'s DPDPA framework.',
    category: 'AI',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 31, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'DPDPA for HR: Employee Data Protection Guide',
    excerpt: 'Comprehensive guide for HR departments on handling employee personal data in compliance with DPDPA.',
    category: 'HR',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 30, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'AI and Machine Learning Compliance Under DPDPA',
    excerpt: 'How AI and ML systems must adapt to meet DPDPA requirements, including data processing, consent management, and algorithmic transparency.',
    category: 'AI/ML',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 29, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Cross-Border Data Transfer Under DPDPA: Complete Guide',
    excerpt: 'Understanding the rules and mechanisms for transferring personal data across international borders under DPDPA.',
    category: 'International',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 28, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'GDPR vs DPDPA vs CCPA: Complete Comparison',
    excerpt: 'A comprehensive analysis comparing three major global data protection frameworks and their implications for international organizations.',
    category: 'Global',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 27, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'DPDPA Penalties Explained: Up to Rs 250 Crore Fines',
    excerpt: 'Detailed breakdown of penalty provisions under DPDPA, including fine amounts and enforcement mechanisms.',
    category: 'Penalties',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 26, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'India-EU Data Adequacy: DPDPA vs GDPR Analysis',
    excerpt: 'Analyzing the potential for India-EU data adequacy decisions and how DPDPA compares with GDPR standards.',
    category: 'GDPR',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 25, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Facial Recognition Technology Under DPDPA India',
    excerpt: 'Legal implications and compliance requirements for facial recognition technology deployment under DPDPA.',
    category: 'Biometric',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 24, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: "Director's Personal Liability Under DPDPA: CXO Guide",
    excerpt: 'Understanding personal liability exposure for directors and CXOs under India\'s data protection law.',
    category: 'CXO',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 23, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Significant Data Fiduciary (SDF) Under DPDPA: Complete Guide',
    excerpt: 'Comprehensive guide to understanding SDF classification, obligations, and compliance requirements under DPDPA.',
    category: 'SDF',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 22, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Vendor Data Processing Agreement Template for DPDPA',
    excerpt: 'Template and guidance for creating DPDPA-compliant vendor data processing agreements.',
    category: 'Vendor',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 21, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'DPDPA Compliance Checklist 2026: Business Assessment',
    excerpt: 'A practical step-by-step checklist to help businesses assess and achieve compliance with DPDPA.',
    category: 'Checklist',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 20, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Data Protection Officer (DPO) Qualifications Under DPDPA',
    excerpt: 'Requirements, qualifications, and responsibilities for Data Protection Officers under DPDPA.',
    category: 'DPO',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 19, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'WhatsApp Business and DPDPA Compliance Guide',
    excerpt: 'How businesses using WhatsApp for customer communication can ensure DPDPA compliance.',
    category: 'Messaging',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 18, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'DPDPA 2027 Deadline: 12-Month Action Plan',
    excerpt: 'A structured 12-month action plan to achieve full DPDPA compliance before the 2027 deadline.',
    category: 'Deadline',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 17, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Data Protection Board of India: Powers and Procedures',
    excerpt: 'Understanding the powers, procedures, and enforcement role of the Data Protection Board of India.',
    category: 'DPBI',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 16, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'DPDPA-Compliant Privacy Policy Template Guide',
    excerpt: 'Step-by-step guide to creating a privacy policy that meets all DPDPA requirements.',
    category: 'Template',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 14, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Data Protection Audit Requirements for SDFs Under DPDPA',
    excerpt: 'Audit requirements and best practices for Significant Data Fiduciaries under DPDPA.',
    category: 'Audit',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 13, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'DPDPA for Healthcare: Hospital Compliance Guide',
    excerpt: 'Essential compliance guidance for healthcare organizations managing sensitive patient data under DPDPA.',
    category: 'Healthcare',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 11, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Data Principal vs Data Subject: DPDPA Terminology Explained',
    excerpt: 'Clarifying the key terminology differences between DPDPA and other global data protection frameworks.',
    category: 'Terminology',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 10, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'DPDPA for Banks and NBFCs: Financial Data Protection',
    excerpt: 'Industry-specific guidance for banking and financial institutions on safeguarding customer data under DPDPA.',
    category: 'Banking',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 8, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: '72-Hour Data Breach Response Plan Under DPDPA',
    excerpt: 'How to prepare and execute a 72-hour data breach notification and response plan as required by DPDPA.',
    category: 'Breach',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 7, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'DPDPA for E-commerce: Customer Data Compliance',
    excerpt: 'Compliance requirements for e-commerce platforms handling customer personal data under DPDPA.',
    category: 'E-commerce',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 5, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'How to Choose a Consent Management Platform for DPDPA',
    excerpt: 'Key features and evaluation criteria for selecting a DPDPA-compliant consent management platform.',
    category: 'CMP',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 4, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'DPDPA for EdTech: Student Data Protection Guide',
    excerpt: 'Guide for educational technology companies on protecting student personal data under DPDPA.',
    category: 'EdTech',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 2, 2026',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Data Erasure and Certification Under DPDPA',
    excerpt: 'Understanding data erasure requirements and certification processes mandated by DPDPA.',
    category: 'Erasure',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jul 15, 2025',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'The DPDPA Conundrum for Indian SMEs',
    excerpt: 'Challenges and practical solutions for small and medium enterprises navigating DPDPA compliance.',
    category: 'SME',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Apr 14, 2025',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Understanding the Role of Consent Manager Under DPDPA',
    excerpt: 'The role, responsibilities, and regulatory requirements for Consent Managers under DPDPA.',
    category: 'Consent',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 9, 2025',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Children of Illiterate Parents Banned from Social Media?',
    excerpt: 'Analysis of DPDPA provisions regarding children\'s data protection and parental consent requirements.',
    category: 'Children',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jan 6, 2025',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Demystifying DPIA in DPDPA 2023',
    excerpt: 'Understanding Data Protection Impact Assessments and their role in DPDPA compliance.',
    category: 'DPIA',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Dec 8, 2024',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Compensation for Victims of Data Breach Under DPDPA',
    excerpt: 'Legal provisions and mechanisms for victims of data breaches to seek compensation under DPDPA.',
    category: 'Compensation',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Dec 8, 2024',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Right to Access Personal Data Under DPDPA 2023',
    excerpt: 'Understanding the right of data principals to access their personal data held by data fiduciaries.',
    category: 'Rights',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Dec 2, 2024',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'How Fingerprint Scanners May Violate DPDPA',
    excerpt: 'Legal analysis of fingerprint scanner usage and potential DPDPA violations in biometric data collection.',
    category: 'Biometric',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Dec 1, 2024',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Criminal Liabilities for Data Theft and Breach in India',
    excerpt: 'Overview of criminal liability provisions for data theft and breaches under Indian law and DPDPA.',
    category: 'Criminal',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Nov 27, 2024',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Right to be Forgotten Under DPDPA - Case Laws Explained',
    excerpt: 'Exploring the right to be forgotten under DPDPA with relevant case law analysis.',
    category: 'Rights',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Nov 3, 2024',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Challenges and Implications of India\'s DPDPA',
    excerpt: 'Critical analysis of the challenges organizations face in implementing DPDPA requirements.',
    category: 'Challenges',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Oct 12, 2024',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Requirements for Drafting Compliance Privacy Notice',
    excerpt: 'Essential requirements and best practices for drafting a DPDPA-compliant privacy notice.',
    category: 'Notice',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Oct 12, 2024',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Data Breach Reporting in India',
    excerpt: 'Comprehensive guide to data breach reporting obligations and procedures in India under DPDPA.',
    category: 'Breach',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Oct 2, 2024',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Data Principal Rights Under DPDPA',
    excerpt: 'Complete overview of the rights granted to data principals under India\'s DPDPA.',
    category: 'Rights',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Sep 15, 2024',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Cookie Scanner Compliance Under DPDPA',
    excerpt: 'How cookie scanners and consent banners must comply with DPDPA data collection requirements.',
    category: 'Cookies',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Aug 22, 2024',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'CONSENT Under DPDPA - Comprehensive Understanding',
    excerpt: 'Deep dive into the consent framework under DPDPA including valid consent requirements and exceptions.',
    category: 'Consent',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Aug 2, 2024',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Opportunities for Small Business in DPDPA',
    excerpt: 'How small businesses can leverage DPDPA compliance as a competitive advantage.',
    category: 'Business',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jul 14, 2024',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'The Uniform Data Protection Dilemma',
    excerpt: 'Analysis of the challenges in creating uniform data protection standards across jurisdictions.',
    category: 'Policy',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jul 14, 2024',
    href: 'https://www.dpdpa.com/blog.html',
  },
  {
    title: 'Steps to Comply with DPDPA 2023 Guide',
    excerpt: 'Practical step-by-step guide for organizations beginning their DPDPA compliance journey.',
    category: 'Guide',
    author: 'Advocate (Dr.) Prashant Mali',
    date: 'Jun 12, 2024',
    href: 'https://www.dpdpa.com/blog.html',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  AI: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-400',
  'AI/ML': 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-400',
  HR: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400',
  International: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400',
  Global: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  Penalties: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
  GDPR: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  Biometric: 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-400',
  CXO: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  SDF: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400',
  Vendor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
  Checklist: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  DPO: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400',
  Messaging: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',
  Deadline: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
  DPBI: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400',
  Template: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  Audit: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400',
  Healthcare: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400',
  Terminology: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
  Banking: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  Breach: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
  'E-commerce': 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400',
  CMP: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-400',
  EdTech: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400',
  Erasure: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
  SME: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  Consent: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400',
  Children: 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-400',
  DPIA: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400',
  Compensation: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  Rights: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  Criminal: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
  Challenges: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400',
  Notice: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  Cookies: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400',
  Business: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  Policy: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
  Guide: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
}

const FILTER_GROUPS = [
  { label: 'All', value: 'all' },
  { label: 'Compliance', value: 'compliance' },
  { label: 'Industry', value: 'industry' },
  { label: 'Rights & Consent', value: 'rights' },
  { label: 'AI & Technology', value: 'tech' },
  { label: 'Risk & Breach', value: 'risk' },
]

const FILTER_MAP: Record<string, string[]> = {
  compliance: ['Checklist', 'Deadline', 'Template', 'Guide', 'Notice', 'Audit', 'SDF', 'DPO', 'DPBI', 'DPIA', 'Vendor', 'Policy', 'GDPR', 'Global', 'International'],
  industry: ['Banking', 'Healthcare', 'E-commerce', 'EdTech', 'HR', 'SME', 'Business', 'Messaging', 'CXO'],
  rights: ['Rights', 'Consent', 'Children', 'Cookies', 'Terminology', 'CMP', 'Erasure', 'Compensation'],
  tech: ['AI', 'AI/ML', 'Biometric'],
  risk: ['Breach', 'Criminal', 'Penalties', 'Challenges'],
}

const INITIAL_COUNT = 9

export function BlogSection() {
  const [showAll, setShowAll] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'all') return BLOG_POSTS
    const categories = FILTER_MAP[activeFilter] || []
    return BLOG_POSTS.filter(post => categories.includes(post.category))
  }, [activeFilter])

  const displayedPosts = showAll ? filteredPosts : filteredPosts.slice(0, INITIAL_COUNT)
  const hasMore = filteredPosts.length > INITIAL_COUNT

  return (
    <section id="blog" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <MotionDiv variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <Badge className="mb-3 md:mb-4" variant="outline">Insights & Updates</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            DPDPA Knowledge
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Hub</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Stay informed with expert insights on India&apos;s Digital Personal Data Protection Act — compliance, rights, and best practices.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            <span className="font-medium">{BLOG_POSTS.length}</span> articles from{' '}
            <a href="https://www.dpdpa.com/blog.html" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
              DPDPA.com
            </a>
          </p>
        </MotionDiv>

        <MotionDiv variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-2 mb-8 md:mb-10">
          {FILTER_GROUPS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => { setActiveFilter(filter.value); setShowAll(false); }}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.value
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-card border border-border text-muted-foreground hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-foreground'
              }`}
            >
              {filter.label}
              {filter.value !== 'all' && (
                <span className="ml-1 opacity-70">
                  ({filter.value === 'all' ? BLOG_POSTS.length : BLOG_POSTS.filter(p => (FILTER_MAP[filter.value] || []).includes(p.category)).length})
                </span>
              )}
            </button>
          ))}
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {displayedPosts.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.4) }}
                layout
              >
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full"
                >
                  <Card className="h-full border-2 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-5 md:p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
                          {post.category}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
                      </div>
                      <h3 className="font-semibold text-base md:text-lg mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                        <span className="truncate mr-2">{post.author}</span>
                        <span className="whitespace-nowrap">{post.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <div className="text-center mt-6 md:mt-8">
            <Button
              variant="outline"
              className="border-2 h-11 md:h-10 gap-2"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : `Show All ${filteredPosts.length} Articles`}
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        )}

        <MotionDiv variants={fadeInUp} className="text-center mt-6 md:mt-8">
          <a href="https://www.dpdpa.com/blog.html" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-2 h-11 md:h-10 gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-950/50 dark:hover:to-teal-950/50">
              View All Articles on DPDPA.com
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </MotionDiv>
      </div>
    </section>
  )
}
