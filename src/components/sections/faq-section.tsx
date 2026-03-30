'use client'

import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { MotionDiv, MotionItem } from '@/components/ui/motion-wrapper'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface FAQ {
  question: string
  answer: string
}

const FAQS: FAQ[] = [
  {
    question: 'How does PII Scanner detect sensitive data?',
    answer: 'PII Scanner uses a combination of AI-powered pattern recognition, machine learning models, and regex patterns to identify over 50 types of PII. Our AI continuously learns from new data patterns to improve detection accuracy.',
  },
  {
    question: 'Is my data secure during scanning?',
    answer: "Absolutely. PII Scanner operates with a read-only connection to your databases. We never store your actual data - only metadata about detected PII. All connections are encrypted, and we're SOC 2 Type II certified.",
  },
  {
    question: 'How long does a typical scan take?',
    answer: 'Scan time depends on database size and complexity. On average, we scan about 1 million records per second. A typical enterprise database can be fully scanned in under an hour.',
  },
  {
    question: 'Can I customize what PII types to detect?',
    answer: "Yes! You can enable or disable specific PII types, create custom detection rules for your organization's unique data formats, and set sensitivity thresholds for different data categories.",
  },
  {
    question: 'Do you support on-premise deployment?',
    answer: 'Yes, our Enterprise plan includes on-premise deployment options. This allows you to run PII Scanner entirely within your own infrastructure for maximum data security.',
  },
  {
    question: 'What compliance standards do you support?',
    answer: 'PII Scanner helps you comply with GDPR, CCPA, HIPAA, PCI-DSS, SOC 2, ISO 27001, and many more. We provide pre-built compliance templates and automated reporting for each standard.',
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <MotionDiv variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <Badge className="mb-3 md:mb-4" variant="outline">FAQ</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Frequently Asked
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Questions</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Everything you need to know about PII Scanner.
          </p>
        </MotionDiv>

        <MotionDiv variants={staggerContainer} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
            {FAQS.map((faq, i) => (
              <MotionItem key={i} variants={fadeInUp}>
                <AccordionItem value={`item-${i}`} className="bg-card border-2 rounded-lg px-4 md:px-6 hover:shadow-md transition-shadow">
                  <AccordionTrigger className="text-left font-medium text-sm md:text-base hover:text-emerald-600 py-4 md:py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs md:text-base text-muted-foreground pb-4 md:pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </MotionItem>
            ))}
          </Accordion>
        </MotionDiv>
      </div>
    </section>
  )
}
