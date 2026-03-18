'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Play, Sparkles, Scan, FileSearch, Shield, Check } from 'lucide-react'
import { ResponsiveModal } from '@/components/ui/responsive-modal'
import { SignupForm } from '@/components/forms/signup-form'
import { DemoRequestForm } from '@/components/forms/demo-request-form'

const STATS = [
  { value: '50B+', label: 'Records Scanned' },
  { value: '500+', label: 'Enterprise Clients' },
  { value: '99.9%', label: 'Detection Accuracy' },
  { value: '<1s', label: 'Avg Scan Speed' },
]

const PII_TYPES = ['SSN: 3,456', 'Email: 5,678', 'Phone: 2,234', 'Credit Card: 1,088']
const QUICK_ACTIONS = ['Generate Report', 'Apply Masking', 'Set Alerts', 'Export Data']

export function HeroSection() {
  const [showSignup, setShowSignup] = useState(false)
  const [showDemo, setShowDemo] = useState(false)

  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-transparent to-transparent dark:from-emerald-950/20" />
      <div className="absolute top-20 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 mb-6 md:mb-8">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
            <span className="text-xs md:text-sm font-medium text-emerald-700 dark:text-emerald-400">Trusted by 500+ enterprises worldwide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 md:mb-6 px-2">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Protect Sensitive Data
            </span>
            <br />
            <span className="text-foreground">Across All Your Databases</span>
          </h1>

          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-10 px-4">
            AI-powered PII scanning that automatically detects, classifies, and helps you protect
            personally identifiable information across your entire database infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16 px-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl shadow-emerald-500/25 px-6 md:px-8 h-12 md:h-14 text-base md:text-lg"
              onClick={() => setShowSignup(true)}
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-6 md:px-8 h-12 md:h-14 text-base md:text-lg border-2"
              onClick={() => setShowDemo(true)}
            >
              <Play className="mr-2 w-4 h-4 md:w-5 md:h-5" />
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto px-2">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center p-3 md:p-4 rounded-xl bg-background/50 backdrop-blur-sm">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-12 md:mt-20 relative px-2 md:px-4">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="relative bg-gradient-to-b from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-xl md:rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-2xl overflow-hidden">
            <div className="p-2 border-b border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400" />
            </div>
            <div className="p-4 md:p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-white dark:bg-gray-900 rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                      <Scan className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                    </div>
                    <div className="font-semibold text-sm md:text-base">Scan Summary</div>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Records</span>
                      <span className="font-medium">2,456,789</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">PII Detected</span>
                      <span className="font-medium text-amber-600">12,456</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Risk Score</span>
                      <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-xs">High</Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                      <FileSearch className="w-4 h-4 md:w-5 md:h-5 text-teal-600" />
                    </div>
                    <div className="font-semibold text-sm md:text-base">PII Types Found</div>
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    {PII_TYPES.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs md:text-sm">
                        <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center">
                      <Shield className="w-4 h-4 md:w-5 md:h-5 text-cyan-600" />
                    </div>
                    <div className="font-semibold text-sm md:text-base">Quick Actions</div>
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    {QUICK_ACTIONS.map((action, i) => (
                      <Button key={i} variant="outline" size="sm" className="w-full justify-start h-8 md:h-9 text-xs md:text-sm">
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
