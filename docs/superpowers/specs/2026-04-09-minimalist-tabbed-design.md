# Minimalist Tabbed Single-Page Design

**Date**: 2026-04-09
**Status**: Draft — Pending User Review

---

## Overview

Redesign the PII Scanner landing page from a traditional scroll-heavy single page to a **minimalist single-page with sticky tab navigation**. Users navigate between key sections via pill-shaped tabs below the header, with smooth scrolling and auto-highlighting (ScrollSpy pattern). Product-related images (dashboard screenshots and illustrations) are added throughout to create a visually rich, professional experience.

---

## Design Decisions

### Tab Navigation Pattern (Approach A)
- **Why**: Most user-friendly, maintains SEO benefits of single-page, familiar UX pattern
- **Alternative Considered**: Fade transitions (Approach B) — rejected due to worse discoverability and SEO
- **Alternative Considered**: Horizontal scrollable sections (Approach C) — rejected due to non-standard behavior

### Image Strategy (Mixed Approach)
- **Dashboard Screenshots**: For technical sections (Features, AI Detection) — shows actual product capabilities
- **Illustrations**: For marketing sections (About, Pricing, Resources) — lighter, more approachable
- **Why**: Balances professionalism with visual variety, prevents visual fatigue

### Tab Styling (Minimalist Pills)
- **Why**: Clean, modern, on-brand with emerald theme
- **Alternative Considered**: Icon + Text tabs — rejected as too busy for minimalist vision
- **Alternative Considered**: Simple underline — rejected as too subtle for clear navigation

---

## Architecture

### Component Hierarchy

```
Header (existing, no changes)
└── TabNavigation (NEW)
    ├── useScrollSpy hook (NEW)
    └── 6 tab buttons → smooth scroll to sections
    
Main Page Sections:
├── Hero Section (keep as-is, no tab)
├── About Section (MODIFIED — ADD illustration)
├── Features Section (MODIFIED — ADD dashboard screenshot)
├── AI Detection Section (MODIFIED — ADD dashboard screenshot)
├── Pricing Section (MODIFIED — ADD illustration)
├── Resources Section (MODIFIED — ADD illustration)
├── Blog Section (keep current layout, no image changes)
├── Testimonials Section (no tab, scroll-through)
├── FAQ Section (no tab, scroll-through)
├── CTA Section (no tab, scroll-through)
└── Footer (no changes)
```

### File Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── tab-navigation.tsx    (NEW)
│   │   ├── about-section.tsx     (MODIFIED)
│   │   ├── features-section.tsx  (MODIFIED)
│   │   ├── ai-detection-section.tsx (MODIFIED)
│   │   ├── pricing-section.tsx   (MODIFIED)
│   │   ├── resources-section.tsx (MODIFIED)
│   │   └── ... (unchanged)
├── hooks/
│   └── use-scroll-spy.ts         (NEW)
└── app/
    └── page.tsx                  (MODIFIED — add TabNavigation)

public/
└── images/
    └── sections/                 (NEW)
        ├── about-illustration.webp
        ├── features-dashboard.webp
        ├── ai-detection-dashboard.webp
        ├── pricing-illustration.webp
        └── resources-illustration.webp
```

---

## Tab Navigation Specification

### Tabs (6 Total)

| Tab Label | Target Section | Icon (Lucide) | Hash |
|-----------|---------------|---------------|------|
| About | About Section | `Info` | `#about` |
| Features | Features Section | `Layers` | `#features` |
| AI Detection | AI Detection Section | `Sparkles` | `#ai-detection` |
| Pricing | Pricing Section | `DollarSign` | `#pricing` |
| Resources | Resources Section | `BookOpen` | `#resources` |
| Blog | Blog Section | `FileText` | `#blog` |

### Tab Container Styling

```css
/* Sticky positioning */
position: sticky;
top: 0; /* Below header, managed via z-index */
z-index: 40; /* Below header (z-50), above content */

/* Visual design */
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(12px);
border-bottom: 1px solid rgb(226, 232, 240); /* slate-200 */
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
```

### Tab Button Styling

**Default State**:
```css
padding: 8px 16px; /* px-4 py-2 */
border-radius: 9999px; /* rounded-full */
font-size: 14px; /* text-sm */
font-weight: 500; /* font-medium */
color: rgb(71, 85, 105); /* slate-600 */
transition: all 150ms ease;
```

**Hover State**:
```css
color: rgb(15, 23, 42); /* slate-900 */
background: rgb(241, 245, 249); /* slate-100 */
```

**Active State**:
```css
background: rgb(5, 150, 105); /* emerald-600 */
color: white;
```

### ScrollSpy Behavior

**Implementation**: `IntersectionObserver` API

- Observe all 6 tabbed sections
- Threshold: 0.3 (section is 30% visible = active)
- Root margin: `-120px 0px -40% 0px` (account for header + tabs, favor top of viewport)
- Return active section ID
- Update URL hash (without scroll jump) via `history.replaceState`
- Debounce updates to prevent flickering

**Hook Interface**:

```typescript
function useScrollSpy(sectionIds: string[], options?: ScrollSpyOptions): string
```

- Input: Array of section IDs to observe
- Output: Currently active section ID
- Options: threshold, rootMargin, offset

### Smooth Scroll Behavior

- On tab click: `element.scrollIntoView({ behavior: 'smooth', block: 'start' })`
- Offset: 120px (header height + tab bar height)
- CSS fallback: `scroll-behavior: smooth` on `html`
- Fallback for older browsers: Programmatic scroll with `requestAnimationFrame`

---

## Section Layouts with Images

### About Section

**Layout**: Two-column (text left, illustration right)
**Image**: Abstract data shield illustration with emerald/teal gradient
**Responsive**: Image stacks below text on mobile

```
┌─────────────────────────────────────────┐
│  About Heading (left 50%)               │
│  About Description                      │
│  Key stats/bullet points                │
│                                         │
│              Illustration (right 50%)   │
│              [Gradient + geometric]     │
└─────────────────────────────────────────┘
```

### Features Section

**Layout**: Full-width with dashboard screenshot as background/hero
**Image**: High-fidelity dashboard mockup (scan results, PII chart, risk scores)
**Overlay**: Feature cards floating on top of or below screenshot

```
┌─────────────────────────────────────────┐
│  Features Heading (centered)            │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │   Dashboard Screenshot (full)     │  │
│  │   [Scan summary, PII types, etc] │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Feature cards grid (below)             │
└─────────────────────────────────────────┘
```

### AI Detection Section

**Layout**: Two-column (text left, dashboard screenshot right)
**Image**: Close-up of AI detection panel (pattern recognition, confidence scores)
**Background**: Dark (slate-900) to match dashboard theme

```
┌─────────────────────────────────────────┐
│  AI Detection Heading (left 50%)        │
│  How AI works description               │
│  Detection capabilities list            │
│                                         │
│              Dashboard Screenshot       │
│              [AI detection panel]       │
└─────────────────────────────────────────┘
```

### Pricing Section

**Layout**: Centered pricing cards with illustration above
**Image**: Minimalist "protection layers" concept illustration
**Responsive**: 3-column on desktop, stacked on mobile

```
┌─────────────────────────────────────────┐
│  Pricing Heading (centered)             │
│  Illustration (centered, medium width)  │
│                                         │
│  ┌──────┐  ┌──────┐  ┌──────┐          │
│  │Basic │  │ Pro  │  │Enterprise│      │
│  │      │  │      │  │      │          │
│  └──────┘  └──────┘  └──────┘          │
└─────────────────────────────────────────┘
```

### Resources Section

**Layout**: Grid of resource cards with small icons
**Image**: Book/documentation illustration with code snippets
**Responsive**: 2-3 column grid on desktop, single column on mobile

```
┌─────────────────────────────────────────┐
│  Resources Heading (centered)           │
│  Illustration (right side or above)     │
│                                         │
│  ┌─────┐  ┌─────┐  ┌─────┐             │
│  │Docs │  │API  │  │Guides│            │
│  └─────┘  └─────┘  └─────┘             │
│  ┌─────┐  ┌─────┐  ┌─────┐             │
│  │Blog │  │FAQ  │  │Support│           │
│  └─────┘  └─────┘  └─────┘             │
└─────────────────────────────────────────┘
```

### Blog Section

**Layout**: Keep current implementation (blog post cards)
**Images**: No additional imagery needed — blog posts have their own thumbnails
**No changes to existing layout**

---

## Image Specifications

### File Format
- **Primary**: WebP (supported by Next.js Image component)
- **Fallback**: PNG (for browsers without WebP support, handled by Next.js)

### Dimensions

| Image | Desktop Width | Mobile Width | Aspect Ratio | Format |
|-------|--------------|--------------|--------------|--------|
| About Illustration | 500px | 100vw | 4:3 | WebP |
| Features Dashboard | 1200px | 100vw | 16:9 | WebP |
| AI Detection Dashboard | 600px | 100vw | 4:3 | WebP |
| Pricing Illustration | 400px | 80vw | 16:9 | WebP |
| Resources Illustration | 500px | 100vw | 4:3 | WebP |

### Optimization
- Use Next.js `<Image>` component with `priority` prop for above-the-fold images
- Lazy loading for below-the-fold images (default behavior)
- Automatic srcset generation for responsive images
- Quality: 80% (good balance of size/quality)

### Image Sources
- Dashboard screenshots: Export from current hero-section mockup at higher resolution
- Illustrations: Can be created with:
  - Abstract SVG components (geometric shapes + gradients)
  - AI-generated images (Midjourney, DALL-E)
  - Stock illustration libraries (undraw.co, humaaans.com)

---

## Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Desktop | >1024px | All 6 tabs visible, two-column layouts |
| Tablet | 768px-1024px | Tabs may need horizontal scroll, images resize |
| Mobile | <768px | Horizontal scrollable tab strip, single-column layouts |
| Small Mobile | <640px | Tabs scroll horizontally, some images hidden or reduced |

### Mobile Tab Bar

```css
/* Horizontal scroll on mobile */
overflow-x: auto;
scroll-snap-type: x mandatory;
-webkit-overflow-scrolling: touch;
scrollbar-width: none; /* Firefox */

&::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
```

---

## Performance Considerations

1. **IntersectionObserver**: Lightweight, native browser API — no library overhead
2. **Image Loading**: Lazy loading below fold, priority loading above fold
3. **Smooth Scroll**: CSS `scroll-behavior: smooth` — hardware accelerated
4. **Tab State**: Minimal re-renders — only active tab ID changes
5. **Bundle Size**: New components are small, no new dependencies needed
6. **SEO**: Single page, all content in DOM — no impact on crawlability

---

## Accessibility

1. **Keyboard Navigation**: Tabs are focusable, Enter/Space activates
2. **ARIA Labels**: `aria-selected` on tabs, `role="tablist"` on container
3. **Scroll Reduction**: Respect `prefers-reduced-motion` media query
   - Disable smooth scroll animation
   - Disable scroll-based animations
4. **Color Contrast**: Active tab text on emerald background meets WCAG AA
5. **Focus Indicators**: Visible focus ring on tab buttons

---

## State Management

### useScrollSpy Hook

```typescript
interface ScrollSpyOptions {
  threshold?: number;        // Default: 0.3
  rootMargin?: string;       // Default: '-120px 0px -40% 0px'
  offset?: number;           // Scroll offset for tab click, default: 120
}

function useScrollSpy(
  sectionIds: string[], 
  options?: ScrollSpyOptions
): string {
  // Returns active section ID
  // Updates on scroll (debounced)
  // Updates URL hash via history.replaceState
}
```

### Tab Click Handler

```typescript
function handleTabClick(sectionId: string) {
  // 1. Update active tab state
  // 2. Smooth scroll to section
  // 3. Update URL hash (history.pushState)
  // 4. Focus section for accessibility
}
```

---

## Error Handling

1. **Section Not Found**: Tab click with invalid section ID — no-op, log warning
2. **Observer Error**: IntersectionObserver unsupported — fallback to scroll event listener
3. **Image Load Failure**: Broken images show alt text, graceful degradation
4. **Hash on Load**: If URL hash matches a tab, scroll to it on page load

---

## Testing Strategy

1. **Unit Tests**:
   - `useScrollSpy` hook — verify active section detection
   - Tab click handlers — verify scroll behavior
   - URL hash updates — verify history API calls

2. **Integration Tests**:
   - Click tab → correct section scrolls into view
   - Scroll page → active tab updates correctly
   - Mobile tab scroll behavior — horizontal scroll works

3. **Visual Tests**:
   - Screenshot comparison for each section layout
   - Tab active state styling at each breakpoint
   - Image loading and lazy loading behavior

4. **Accessibility Tests**:
   - Keyboard navigation through tabs
   - Screen reader announces active tab changes
   - Color contrast meets WCAG AA

5. **Performance Tests**:
   - Lighthouse score for performance (target: >90)
   - Image loading metrics (LCP < 2.5s)
   - Bundle size impact (<10KB increase)

---

## Implementation Phases

### Phase 1: Core Infrastructure
- Create `useScrollSpy` hook
- Create `TabNavigation` component
- Wire up tabs to existing sections in `page.tsx`

### Phase 2: Section Layouts
- Add image containers to About, Features, AI Detection, Pricing, Resources
- Implement alternating left/right layouts
- Add responsive breakpoints

### Phase 3: Images
- Create/export dashboard screenshots
- Create/add illustrations
- Optimize and place in `/public/images/sections/`

### Phase 4: Polish
- Smooth scroll offsets and timing
- Mobile tab scroll behavior
- Accessibility audit and fixes
- Performance optimization

### Phase 5: Testing & QA
- Run test suite
- Cross-browser testing
- Mobile device testing
- Lighthouse audit

---

## Success Criteria

1. **UX**: Users can navigate to any section in 1 click
2. **Performance**: Lighthouse performance score > 90
3. **Accessibility**: WCAG AA compliance, no critical a11y issues
4. **SEO**: No regression in page rank/indexing
5. **Visual**: Professional, modern design matching brand guidelines
6. **Responsive**: Fully functional on mobile, tablet, and desktop
