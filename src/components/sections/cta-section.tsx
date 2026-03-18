'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { ResponsiveModal } from '@/components/ui/responsive-modal'
import { SignupForm } from '@/components/forms/signup-form'
import { DemoRequestForm } from '@/components/forms/demo-request-form'

export function CTASection() {
  const [showSignup, setShowSignup] = useState(false)
  const [showDemo, setShowDemo] = useState(false)

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl md:rounded-3xl p-6 md:p-16 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:48px_48px]" />
          </div>

          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              Ready to Protect Your Sensitive Data?
            </h2>
            <p className="text-sm md:text-lg text-emerald-100 mb-6 md:mb-8">
              Join 500+ organizations using PII Scanner to achieve compliance and protect customer data.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50 px-6 md:px-8 h-12 md:h-14 text-base md:text-lg"
                onClick={() => setShowSignup(true)}
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white bg-transparent text-white hover:bg-white/10 px-6 md:px-8 h-12 md:h-14 text-base md:text-lg"
                onClick={() => setShowDemo(true)}
              >
                Schedule Demo
              </Button>
            </div>
            <p className="text-xs md:text-sm text-emerald-200 mt-4 md:mt-6">
              14-day free trial &bull; No credit card required &bull; Setup in 5 minutes
            </p>
          </div>
        </div>
      </div>

      <ResponsiveModal
        open={showSignup}
        onOpenChange={setShowSignup}
        title="Create Your Account"
        description="Start your 14-day free trial. No credit card required."
      >
        <SignupForm onSuccess={() => setShowSignup(false)} />
      </ResponsiveModal>

      <ResponsiveModal
        open={showDemo}
        onOpenChange={setShowDemo}
        title="Request a Demo"
        description="See PII Scanner in action. Our team will reach out within 24 hours."
      >
        <DemoRequestForm onSuccess={() => setShowDemo(false)} />
      </ResponsiveModal>
    </section>
  )
}
