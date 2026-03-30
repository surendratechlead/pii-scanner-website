#!/usr/bin/env node

/**
 * Scrapes blog posts from https://www.dpdpa.com/blog.html and writes them
 * to src/data/blogs.json. Designed to run on a schedule (GitHub Actions cron)
 * so that new posts are picked up automatically without manual edits.
 *
 * Usage:  node scripts/sync-blogs.mjs
 * Exit 0 = success (file written, may or may not have changes)
 */

import { writeFileSync, readFileSync, existsSync, appendFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = resolve(__dirname, '..', 'src', 'data', 'blogs.json')
const BLOG_URL = 'https://www.dpdpa.com/blog.html'

const FILTER_MAP = {
  compliance: ['Checklist', 'Deadline', 'Template', 'Guide', 'Notice', 'Audit', 'SDF', 'DPO', 'DPBI', 'DPIA', 'Vendor', 'Policy', 'GDPR', 'Global', 'International'],
  industry: ['Banking', 'Healthcare', 'E-commerce', 'EdTech', 'HR', 'SME', 'Business', 'Messaging', 'CXO'],
  rights: ['Rights', 'Consent', 'Children', 'Cookies', 'Terminology', 'CMP', 'Erasure', 'Compensation'],
  tech: ['AI', 'AI/ML', 'Biometric'],
  risk: ['Breach', 'Criminal', 'Penalties', 'Challenges'],
}

function resolveFilterGroup(category) {
  for (const [group, cats] of Object.entries(FILTER_MAP)) {
    if (cats.includes(category)) return group
  }
  return 'compliance'
}

function parseDate(dateStr) {
  const d = new Date(dateStr)
  return isNaN(d.getTime()) ? 0 : d.getTime()
}

async function fetchBlogPage() {
  const res = await fetch(BLOG_URL)
  if (!res.ok) throw new Error(`Failed to fetch blog page: ${res.status} ${res.statusText}`)
  return res.text()
}

function extractBlogs(html) {
  const blogs = []

  const splits = html.split(/class="blog-card"/)
  for (let i = 1; i < splits.length; i++) {
    const chunk = splits[i].substring(0, 2000)

    const hrefMatch = chunk.match(/href="(https:\/\/www\.dpdpa\.com\/blogs\/[^"]+)"/)
    const titleMatch = chunk.match(/<h3[^>]*>\s*<a[^>]*>([^<]+)<\/a>\s*<\/h3>/)
    const tagMatch = chunk.match(/<span\s+class="blog-tag">([^<]+)<\/span>/)
    const metaMatch = chunk.match(/<div\s+class="blog-meta">\s*<span>([^<]+)<\/span>\s*<span>([^<]+)<\/span>/)

    if (!hrefMatch || !titleMatch) continue

    const title = titleMatch[1].trim()
    const href = hrefMatch[1].trim()
    const category = tagMatch ? tagMatch[1].trim() : 'General'
    const author = metaMatch ? metaMatch[1].trim() : 'Advocate (Dr.) Prashant Mali'
    const date = metaMatch ? metaMatch[2].trim() : ''

    blogs.push({
      title,
      excerpt: '',
      category,
      filterGroup: resolveFilterGroup(category),
      author,
      date,
      href,
    })
  }

  blogs.sort((a, b) => parseDate(b.date) - parseDate(a.date))
  return blogs
}

function generateExcerpt(title, category) {
  const templates = {
    AI: `Exploring ${title.toLowerCase().includes('risk') ? 'risks and' : ''} implications of ${title.split(':')[0]} under India's DPDPA framework.`,
    'AI/ML': `How ${title.split(':')[0].toLowerCase()} must adapt to meet DPDPA requirements.`,
    Biometric: `Legal analysis and compliance requirements for ${title.split(':')[0].toLowerCase()} under DPDPA.`,
    Rights: `Understanding ${title.split('-')[0].toLowerCase().trim()} and its implications under DPDPA.`,
    Consent: `Deep dive into ${title.split(':')[0].toLowerCase()} and regulatory requirements under DPDPA.`,
    Breach: `${title.split(':')[0]} — obligations, procedures, and best practices under DPDPA.`,
    Penalties: `Detailed breakdown of ${title.split(':')[0].toLowerCase()} including enforcement mechanisms.`,
    Criminal: `Overview of ${title.split(':')[0].toLowerCase()} under Indian law and DPDPA.`,
  }
  return templates[category] || `Expert insights on ${title.split(':')[0].toLowerCase()} — compliance guidance under India's DPDPA.`
}

function mergeWithExisting(freshBlogs) {
  let existing = []
  if (existsSync(OUTPUT_PATH)) {
    try {
      existing = JSON.parse(readFileSync(OUTPUT_PATH, 'utf-8'))
    } catch { /* start fresh */ }
  }

  const existingByHref = new Map(existing.map(b => [b.href, b]))

  return freshBlogs.map(blog => {
    const prev = existingByHref.get(blog.href)
    return {
      ...blog,
      excerpt: (prev?.excerpt) || generateExcerpt(blog.title, blog.category),
    }
  })
}

async function main() {
  console.log(`Fetching blogs from ${BLOG_URL} ...`)
  const html = await fetchBlogPage()

  const blogs = extractBlogs(html)
  console.log(`Parsed ${blogs.length} blog posts`)

  if (blogs.length === 0) {
    console.error('No blogs parsed — aborting to avoid data loss.')
    process.exit(1)
  }

  const merged = mergeWithExisting(blogs)
  const json = JSON.stringify(merged, null, 2)

  let changed = true
  if (existsSync(OUTPUT_PATH)) {
    const prev = readFileSync(OUTPUT_PATH, 'utf-8')
    changed = prev.trim() !== json.trim()
  }

  writeFileSync(OUTPUT_PATH, json + '\n', 'utf-8')
  console.log(changed ? `blogs.json updated (${merged.length} posts)` : 'No changes detected')

  if (process.env.GITHUB_OUTPUT) {
    const summary = `SYNC_RESULT=${changed ? 'changed' : 'unchanged'}\nBLOG_COUNT=${merged.length}`
    appendFileSync(process.env.GITHUB_OUTPUT, summary + '\n')
  }
}

main().catch(err => {
  console.error('Blog sync failed:', err)
  process.exit(1)
})
