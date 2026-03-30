'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { MotionDiv } from '@/components/ui/motion-wrapper'
import { fadeInUp } from '@/lib/animations'
import blogsData from '@/data/blogs.json'

interface BlogPost {
  title: string
  excerpt: string
  category: string
  filterGroup?: string
  author: string
  date: string
  href: string
}

const BLOG_POSTS: BlogPost[] = blogsData as BlogPost[]

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
