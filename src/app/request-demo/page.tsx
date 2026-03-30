'use client'

import { ShieldCheck, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DemoRequestForm } from '@/components/forms/demo-request-form'

export default function RequestDemoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-18">
            <a href="/pii-scanner-website/" className="flex items-center gap-2">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                PII Scanner
              </span>
            </a>
            <a href="/pii-scanner-website/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                Request a
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Demo</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">
                See PII Scanner in action. Fill out the form below and our team will reach out to schedule a personalized demo.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg">
              <DemoRequestForm />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PII Scanner. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
