import { useState, useEffect, useRef, useCallback } from 'react'

interface ScrollSpyOptions {
  threshold?: number
  rootMargin?: string
  offset?: number
}

export function useScrollSpy(
  sectionIds: string[],
  options?: ScrollSpyOptions
): string {
  const { threshold = 0.3, rootMargin = '-120px 0px -40% 0px', offset = 120 } = options || {}
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || '')
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id)
      }
    })
  }, [])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    observerRef.current?.disconnect()

    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    })

    sections.forEach((section) => observerRef.current?.observe(section))

    return () => observerRef.current?.disconnect()
  }, [sectionIds, threshold, rootMargin, handleIntersect])

  // Update URL hash when active section changes
  useEffect(() => {
    if (activeId && window.location.hash !== `#${activeId}`) {
      history.replaceState(null, '', `#${activeId}`)
    }
  }, [activeId])

  // Scroll to section on hash change (page load)
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && sectionIds.includes(hash)) {
      const el = document.getElementById(hash)
      if (el) {
        setTimeout(() => {
          const y = el.getBoundingClientRect().top + window.scrollY - offset
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          window.scrollTo({ top: y, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
        }, 100)
      }
    }
  }, [sectionIds, offset])

  return activeId
}

// Utility to scroll to a section smoothly
export function scrollToSection(sectionId: string, offset = 120): void {
  const el = document.getElementById(sectionId)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: y,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }
}
