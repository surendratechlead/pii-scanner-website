import { CheckCircle } from 'lucide-react'

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    period: '/mo trial',
    features: ['5 DB Connections', '1,000 Scans', 'Email Support'],
    action: 'trial' as const,
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$299',
    period: '/mo',
    features: ['25 DB Connections', 'Unlimited Scans', 'API Access', 'Custom Entity Types'],
    action: 'trial' as const,
    cta: 'Upgrade Now',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Unlimited DBs', 'Dedicated Support', 'Custom SLA', 'On-premise Deployment'],
    action: 'contact' as const,
    cta: 'Contact Sales',
    highlighted: false,
  },
]

interface PricingSectionProps {
  onStartTrial: () => void
  onContactSales: () => void
}

export function PricingSection({ onStartTrial, onContactSales }: PricingSectionProps) {
  const handleClick = (action: 'trial' | 'contact') => {
    if (action === 'contact') onContactSales()
    else onStartTrial()
  }

  return (
    <section className="py-12 bg-slate-950/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400">Scale your security with your infrastructure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col p-8 rounded-2xl relative ${
                plan.highlighted
                  ? 'bg-slate-900/80 backdrop-blur-xl border-2 border-teal-500 shadow-[0_0_40px_-10px_rgba(20,184,166,0.3)]'
                  : 'bg-slate-900/50 backdrop-blur-lg border border-slate-800'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-500 text-slate-950 text-xs font-black px-4 py-1 rounded-full tracking-widest uppercase">
                  POPULAR
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-slate-400">{plan.period}</span>}
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.highlighted ? (
                <button
                  onClick={() => handleClick(plan.action)}
                  className="w-full py-4 rounded-xl bg-teal-500 text-slate-950 font-black hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20 active:scale-[0.98]"
                >
                  {plan.cta}
                </button>
              ) : (
                <button
                  onClick={() => handleClick(plan.action)}
                  className="w-full py-3 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 transition-colors active:scale-[0.98]"
                >
                  {plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
