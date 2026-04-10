import { useState } from 'react'
import { ArrowRight, ExternalLink } from 'lucide-react'
import blogs from '@/data/blogs.json'

const FILTER_GROUPS = [
  { key: 'all', label: 'All' },
  { key: 'compliance', label: 'Compliance' },
  { key: 'industry', label: 'Industry' },
  { key: 'rights', label: 'Rights' },
  { key: 'tech', label: 'Technology' },
  { key: 'risk', label: 'Risk' },
]

const CATEGORY_COLORS: Record<string, string> = {
  AI: 'bg-violet-500/80 text-white',
  'AI/ML': 'bg-violet-500/80 text-white',
  International: 'bg-sky-500/80 text-white',
  GDPR: 'bg-blue-500/80 text-white',
  Global: 'bg-blue-500/80 text-white',
  Penalties: 'bg-red-500/80 text-white',
  CXO: 'bg-amber-500/80 text-slate-950',
  SDF: 'bg-teal-500/80 text-slate-950',
  DPO: 'bg-emerald-500/80 text-white',
  DPBI: 'bg-cyan-500/80 text-slate-950',
  Checklist: 'bg-teal-500/80 text-slate-950',
  Biometric: 'bg-rose-500/80 text-white',
  Vendor: 'bg-orange-500/80 text-white',
  Deadline: 'bg-red-500/80 text-white',
  Template: 'bg-indigo-500/80 text-white',
  Audit: 'bg-amber-500/80 text-slate-950',
  Healthcare: 'bg-pink-500/80 text-white',
  Terminology: 'bg-slate-500/80 text-white',
  Breach: 'bg-red-600/80 text-white',
  Banking: 'bg-yellow-500/80 text-slate-950',
  CMP: 'bg-teal-500/80 text-slate-950',
  'E-commerce': 'bg-orange-500/80 text-white',
  EdTech: 'bg-purple-500/80 text-white',
  HR: 'bg-blue-500/80 text-white',
  Messaging: 'bg-green-500/80 text-slate-950',
  Consent: 'bg-emerald-500/80 text-white',
  Children: 'bg-pink-500/80 text-white',
  Rights: 'bg-sky-500/80 text-white',
  DPIA: 'bg-indigo-500/80 text-white',
  Compensation: 'bg-amber-500/80 text-slate-950',
  Criminal: 'bg-red-600/80 text-white',
  SME: 'bg-orange-500/80 text-white',
  Erasure: 'bg-teal-500/80 text-slate-950',
  Challenges: 'bg-rose-500/80 text-white',
  Notice: 'bg-slate-500/80 text-white',
  Cookies: 'bg-amber-500/80 text-slate-950',
  Business: 'bg-emerald-500/80 text-white',
  Policy: 'bg-indigo-500/80 text-white',
  Guide: 'bg-teal-500/80 text-slate-950',
}

const VISIBLE_COUNT = 9

export function BlogSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showAll, setShowAll] = useState(false)

  const filtered = activeFilter === 'all'
    ? blogs
    : blogs.filter((b) => b.filterGroup === activeFilter)

  const displayed = showAll ? filtered : filtered.slice(0, VISIBLE_COUNT)

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute -right-64 top-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-headline font-bold text-white mb-4">
            DPDPA Knowledge Hub
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Expert insights on India&apos;s Digital Personal Data Protection Act from{' '}
            <a
              href="https://www.dpdpa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 transition-colors"
            >
              DPDPA.com
            </a>
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTER_GROUPS.map((group) => (
            <button
              key={group.key}
              onClick={() => { setActiveFilter(group.key); setShowAll(false) }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === group.key
                  ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                  : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10 hover:text-white'
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((post) => (
            <a
              key={post.href}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold font-label ${
                    CATEGORY_COLORS[post.category] || 'bg-teal-500/80 text-slate-950'
                  }`}
                >
                  {post.category}
                </span>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors" />
              </div>

              <div className="px-5 pb-5 flex-1 flex flex-col">
                <h3 className="text-lg font-headline font-bold text-white mb-2 group-hover:text-teal-400 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2 flex-1">{post.excerpt}</p>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <p className="text-xs text-slate-500 font-label">{post.date}</p>
                  <p className="text-xs text-slate-600 font-label truncate ml-4">{post.author}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Show more / View all on dpdpa.com */}
        {filtered.length > VISIBLE_COUNT && !showAll && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold transition-all active:scale-95"
            >
              Show More
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="mt-10 text-center">
          <a
            href="https://www.dpdpa.com/blog.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-bold transition-colors"
          >
            View All {blogs.length} Articles on DPDPA.com
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
