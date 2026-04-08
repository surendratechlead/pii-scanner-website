'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import { ResponsiveModal } from '@/components/ui/responsive-modal'
import { SignupForm } from '@/components/forms/signup-form'
import { ContactSalesForm } from '@/components/forms/contact-sales-form'
import { MotionDiv, MotionItem } from '@/components/ui/motion-wrapper'
import { fadeInUp, staggerContainer } from '@/lib/animations'

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
    <section id="pricing" className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-4">
        <MotionDiv variants={fadeInUp} className="max-w-md mx-auto mb-8">
          <Image
            src="/images/sections/pricing-illustration.svg"
            alt="Pricing tiers with protection layers illustration"
            width={400}
            height={225}
            className="w-full h-auto"
          />
        </MotionDiv>

        <MotionDiv variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-14">
          <Badge className="mb-4 text-xs font-medium text-slate-500 border-slate-200" variant="outline">Pricing</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-base md:text-lg text-slate-500">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </MotionDiv>

        <MotionDiv variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <MotionItem key={i} variants={fadeInUp}>
              <div className={`relative bg-white rounded-xl p-6 md:p-7 h-full flex flex-col ${plan.popular ? 'border-2 border-emerald-500 ring-1 ring-emerald-500/10' : 'border border-slate-200'}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-medium bg-emerald-600 text-white px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{plan.description}</p>
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  {typeof plan.price === 'number' ? (
                    <>
                      <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                      <span className="text-sm text-slate-400">/{plan.period}</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full h-11 text-sm ${plan.popular ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedPlan(plan.name)
                    setShowPurchase(true)
                  }}
                >
                  {plan.cta}
                </Button>
              </div>
            </MotionItem>
          ))}
        </MotionDiv>

        <MotionDiv variants={fadeInUp} className="text-center mt-10">
          <p className="text-sm text-slate-400">
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
