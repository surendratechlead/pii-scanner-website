import { Shield } from 'lucide-react'

interface CTASectionProps {
  onStartTrial: () => void
  onScheduleDemo: () => void
}

export function CTASection({ onStartTrial, onScheduleDemo }: CTASectionProps) {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-sky-600 to-indigo-600 opacity-90" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center opacity-10 pointer-events-none">
        <Shield className="w-96 h-96" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
          Ready to Secure Your Data?
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto font-medium">
          Trusted by 500+ security-first companies globally. Get comprehensive PII visibility in
          minutes.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button
            onClick={onStartTrial}
            className="w-full md:w-auto px-8 py-4 bg-white text-teal-600 font-black rounded-xl text-base hover:bg-slate-100 transition-transform hover:-translate-y-1 shadow-2xl shadow-white/10 active:scale-95"
          >
            Start Free Trial
          </button>
          <button
            onClick={onScheduleDemo}
            className="w-full md:w-auto px-8 py-4 bg-transparent border-2 border-white/30 text-white font-black rounded-xl text-base hover:bg-white/10 transition-transform hover:-translate-y-1 active:scale-95"
          >
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  )
}
