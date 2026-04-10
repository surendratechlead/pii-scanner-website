import { Zap, Check, ArrowRight, Brain, Fingerprint, Database } from 'lucide-react'

const CAPABILITIES = [
  'Context-aware detection using neural embeddings',
  'Custom PII type training for industry-specific data',
  'Multi-language support for global operations',
  'Zero false positive mode for mission-critical workflows',
]

export function AIDetectionSection() {
  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-label uppercase tracking-widest">
              <Zap className="w-4 h-4" />
              Advanced Intelligence
            </div>

            <h2 className="text-3xl md:text-4xl font-headline font-bold text-white leading-tight">
              AI That Understands <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400">
                Your Data Context
              </span>
            </h2>

            <p className="text-slate-400 text-base leading-relaxed">
              Our Natural Language Processing (NLP) engine goes beyond simple regex. It analyzes the
              context surrounding data points to distinguish between a casual number and a sensitive
              identifier, ensuring your security measures are both robust and precise.
            </p>

            <ul className="space-y-3">
              {CAPABILITIES.map((item) => (
                <li key={item} className="flex items-center gap-4 text-slate-200">
                  <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-sky-400" />
                  </span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button className="flex items-center gap-2 text-white font-bold group">
              Learn about our AI architecture
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
            <div className="relative bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden aspect-[4/3] flex items-center justify-center">
              <div className="absolute inset-0 z-0">
                <img
                  alt="Neural network visualization"
                  className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY9rNZEXFiq4MkzIbh7FNP4R0qqtENpjVcxElOLoB8dlNy9Bo4QRSkiStB7_4pTZ79oxAgupIbYLXosiW9tyGyAcoAOTpdFd0c0-ZGD-SZD17CAPmXE8FItYnJ5Go-nGFkhRG1kBGRB-PXZ2LXwmmq0Aj3-g0UqIktvFnCqExd1MOoHfCU1n5CUiq-R_FRj41UEHFr9dD8pkob_CVd7UTm83R8UUL_ac3Y73-YtxWNylTYcytm5SKQGjhuiMy3F1DqhV8xUlyatk2Q"
                />
              </div>
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="relative w-64 h-64 border-2 border-teal-500/20 rounded-full animate-pulse flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-sky-500/20 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-tr from-teal-500 via-sky-500 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl shadow-sky-500/50">
                      <Brain className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 glass-card px-3 py-1 rounded-lg border border-teal-500/50 text-xs font-bold text-teal-400">
                    ANALYZING...
                  </div>
                  <div className="absolute bottom-10 right-0 glass-card p-3 rounded-xl border border-indigo-500/50">
                    <Fingerprint className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="absolute top-20 left-0 glass-card p-3 rounded-xl border border-sky-500/50">
                    <Database className="w-5 h-5 text-sky-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
