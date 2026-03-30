'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { ResponsiveModal } from '@/components/ui/responsive-modal'
import { SignupForm } from '@/components/forms/signup-form'
import { ContactSalesForm } from '@/components/forms/contact-sales-form'
import { MotionDiv, MotionItem } from '@/components/ui/motion-wrapper'
import { fadeInUp, scaleIn, staggerContainer } from '@/lib/animations'

interface Plan {
  name: string
  description: string
  price: number | string
  period: string
  features: string[]
  cta: string
  popular: boolean
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    description: 'Perfect for small teams',
    price: 99,
    period: 'month',
    features: [
      'Up to 3 database connections',
      '1 million records scanned/month',
      'Basic PII detection',
      'Email support',
      'Standard reports',
      'API access',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    description: 'Ideal for growing organizations',
    price: 299,
    period: 'month',
    features: [
      'Up to 10 database connections',
      '10 million records scanned/month',
      'Advanced AI detection',
      'Priority support',
      'Custom reports',
      'API access',
      'Real-time alerts',
      'Data masking tools',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    price: 'Custom',
    period: '',
    features: [
      'Unlimited database connections',
      'Unlimited records scanned',
      'Custom AI models',
      '24/7 dedicated support',
      'On-premise deployment',
      'SSO & SAML',
      'Custom integrations',
      'SLA guarantees',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export function PricingSection() {
  const [showPurchase, setShowPurchase] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')

  const currentPlan = PLANS.find(p => p.name === selectedPlan)
  const isCustom = currentPlan?.price === 'Custom'

  return (
    <section id="pricing" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <MotionDiv variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <Badge className="mb-3 md:mb-4" variant="outline">Pricing</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Simple, Transparent
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Pricing</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </MotionDiv>

        <MotionDiv variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan, i) => (
            <MotionItem key={i} variants={scaleIn}>
              <Card
                className={`relative overflow-hidden hover:-translate-y-1 transition-all duration-300 ${plan.popular ? 'border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 animate-pulse-glow hover:shadow-2xl' : 'border-2 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs md:text-sm font-medium py-1 text-center">
                    Most Popular
                  </div>
                )}
                <CardHeader className={plan.popular ? 'pt-8' : ''}>
                  <CardTitle className="text-xl md:text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-xs md:text-sm">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  <div className="flex items-baseline gap-1">
                    {typeof plan.price === 'number' ? (
                      <>
                        <span className="text-3xl md:text-4xl font-bold">${plan.price}</span>
                        <span className="text-sm text-muted-foreground">/{plan.period}</span>
                      </>
                    ) : (
                      <span className="text-3xl md:text-4xl font-bold">{plan.price}</span>
                    )}
                  </div>
                  <ul className="space-y-2 md:space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs md:text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-4 md:p-6 pt-0">
                  <Button
                    className={`w-full h-11 md:h-10 text-sm md:text-base ${plan.popular ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => {
                      setSelectedPlan(plan.name)
                      setShowPurchase(true)
                    }}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </MotionItem>
          ))}
        </MotionDiv>

        <MotionDiv variants={fadeInUp} className="text-center mt-8 md:mt-12">
          <p className="text-sm md:text-base text-muted-foreground">
            Need a custom plan? <a href="#" className="text-emerald-600 hover:underline">Contact us</a> for enterprise pricing.
          </p>
        </MotionDiv>
      </div>

      <ResponsiveModal
        open={showPurchase}
        onOpenChange={(open) => {
          setShowPurchase(open)
          if (!open) setSelectedPlan('')
        }}
        title={`Get Started with ${selectedPlan}`}
        description={
          isCustom
            ? 'Our sales team will contact you within 24 hours.'
            : 'Start your 14-day free trial. No credit card required.'
        }
      >
        {isCustom ? (
          <ContactSalesForm onSuccess={() => setShowPurchase(false)} />
        ) : (
          <SignupForm onSuccess={() => setShowPurchase(false)} />
        )}
      </ResponsiveModal>
    </section>
  )
}
