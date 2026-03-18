'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Menu, X } from 'lucide-react'
import { ResponsiveModal } from '@/components/ui/responsive-modal'
import { SignupForm } from '@/components/forms/signup-form'
import { DemoRequestForm } from '@/components/forms/demo-request-form'

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#databases', label: 'Databases' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#faq', label: 'FAQ' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showDemo, setShowDemo] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-18">
            <a href="#" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent whitespace-nowrap">
                PII Scanner
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                onClick={() => setShowDemo(true)}
              >
                Request Demo
              </Button>
              <Button
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25"
                onClick={() => setShowSignup(true)}
              >
                Get Started Free
              </Button>
            </div>

            <button
              className="lg:hidden p-2 -mr-2 touch-manipulation"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-200">
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-base text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-muted"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-12 text-base"
                  onClick={() => { setShowDemo(true); setIsMenuOpen(false); }}
                >
                  Request Demo
                </Button>
                <Button
                  size="lg"
                  className="w-full h-12 text-base bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                  onClick={() => { setShowSignup(true); setIsMenuOpen(false); }}
                >
                  Get Started Free
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

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
    </>
  )
}
