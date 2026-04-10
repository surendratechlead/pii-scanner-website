'use client'

import { useState } from 'react'
import { X, CheckCircle, Loader2 } from 'lucide-react'

type ModalType = 'demo' | 'trial' | 'contact'

interface FormModalProps {
  type: ModalType
  onClose: () => void
}

const CONFIG: Record<ModalType, { title: string; subtitle: string; cta: string }> = {
  demo: {
    title: 'Request a Demo',
    subtitle: 'See PII Scanner in action. Our team will schedule a personalized walkthrough.',
    cta: 'Schedule Demo',
  },
  trial: {
    title: 'Start Free Trial',
    subtitle: 'Get instant access to PII Scanner with 5 free database connections.',
    cta: 'Create Account',
  },
  contact: {
    title: 'Contact Sales',
    subtitle: 'Let us craft a custom Enterprise plan tailored to your infrastructure.',
    cta: 'Send Message',
  },
}

export function FormModal({ type, onClose }: FormModalProps) {
  const [state, setState] = useState<'form' | 'loading' | 'success'>('form')
  const config = CONFIG[type]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    setTimeout(() => setState('success'), 1500)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg glass-morphism border border-white/10 rounded-2xl shadow-2xl shadow-teal-500/10 animate-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {state === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-2xl font-headline font-bold text-white mb-3">
                {type === 'trial' ? 'Welcome aboard!' : "We'll be in touch!"}
              </h3>
              <p className="text-slate-400 mb-8">
                {type === 'trial'
                  ? 'Check your email for login credentials and setup instructions.'
                  : 'Our team will reach out within 24 hours to schedule your session.'}
              </p>
              <button
                onClick={onClose}
                className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-3 rounded-xl font-bold transition-colors"
              >
                Got it
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-headline font-bold text-white mb-2">
                {config.title}
              </h3>
              <p className="text-slate-400 text-sm mb-6">{config.subtitle}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      First Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Last Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Smith"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Work Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="jane@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Company
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Acme Inc."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-colors"
                  />
                </div>

                {type === 'contact' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your requirements..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-colors resize-none"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="w-full py-3 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {state === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    config.cta
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center">
                  By submitting, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
