'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { MotionDiv, MotionItem } from '@/components/ui/motion-wrapper'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  avatar: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "PII Scanner helped us identify over 2 million sensitive records we didn't know existed. Essential for compliance.",
    author: 'Sarah Chen',
    role: 'Chief Privacy Officer',
    company: 'FinTech Corp',
    avatar: 'SC',
  },
  {
    quote: "The real-time scanning feature alone has saved us countless hours of manual auditing. ROI was visible within the first month.",
    author: 'Michael Rodriguez',
    role: 'VP of Engineering',
    company: 'HealthTech Inc',
    avatar: 'MR',
  },
  {
    quote: "We passed our SOC 2 audit with flying colors thanks to PII Scanner's comprehensive reporting.",
    author: 'Emily Watson',
    role: 'Compliance Director',
    company: 'CloudScale',
    avatar: 'EW',
  },
]

const TRUST_LOGOS = ['Microsoft', 'Google Cloud', 'AWS', 'Oracle', 'Snowflake', 'MongoDB']

function StarRating() {
  return (
    <div className="flex items-center gap-1 mb-3 md:mb-4">
      {Array.from({ length: 5 }).map((_, j) => (
        <svg key={j} className="w-4 h-4 md:w-5 md:h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <MotionDiv variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <Badge className="mb-3 md:mb-4" variant="outline">Testimonials</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Trusted by
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Industry Leaders</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            See why security professionals choose PII Scanner.
          </p>
        </MotionDiv>

        <MotionDiv variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          {TESTIMONIALS.map((testimonial, i) => (
            <MotionItem key={i} variants={fadeInUp}>
              <Card className="border-2 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 md:p-6 pt-4 md:pt-6">
                  <StarRating />
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-medium text-sm md:text-base">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-sm md:text-base">{testimonial.author}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionItem>
          ))}
        </MotionDiv>

        <MotionDiv variants={fadeInUp} className="text-center">
          <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">Trusted integrations with</p>
          <div className="overflow-hidden relative">
            <div className="flex items-center gap-8 md:gap-12 animate-marquee whitespace-nowrap">
              {[...TRUST_LOGOS, ...TRUST_LOGOS].map((logo, i) => (
                <span key={i} className="text-sm md:text-xl font-bold text-muted-foreground/60 inline-block">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}
