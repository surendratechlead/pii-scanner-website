import {
  Fingerprint, Database, Lock, ShieldCheck, Key, Eye, Shield,
  ArrowRight, PlayCircle, BarChart3
} from 'lucide-react'

const STATS = [
  { value: '50+', label: 'Databases' },
  { value: '99.7%', label: 'Accuracy' },
  { value: '500+', label: 'Companies' },
  { value: '<5 Min', label: 'Setup' },
]

const SCAN_RESULTS = [
  { type: 'Email Addresses', compliance: 'GDPR Article 6', count: '2,847 found' },
  { type: 'Phone Numbers', compliance: 'DPDPA Section 4', count: '1,234 found' },
  { type: 'SSN / ID Numbers', compliance: 'HIPAA Privacy Rule', count: '456 found' },
]

interface HeroSectionProps {
  onStartTrial: () => void
  onWatchDemo: () => void
}

export function HeroSection({ onStartTrial, onWatchDemo }: HeroSectionProps) {
  return (
    <section className="relative h-full flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-circuit opacity-50" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="scanning-line" />
        <div className="absolute inset-0 pointer-events-none">
          <Fingerprint className="absolute top-[20%] left-[10%] text-slate-400 opacity-5 w-16 h-16 rotate-12" />
          <Database className="absolute top-[60%] left-[5%] text-slate-400 opacity-5 w-20 h-20 -rotate-12" />
          <Lock className="absolute top-[15%] left-[45%] text-slate-400 opacity-5 w-12 h-12" />
          <ShieldCheck className="absolute top-[80%] left-[30%] text-slate-400 opacity-5 w-24 h-24" />
          <Key className="absolute top-[40%] right-[10%] text-slate-400 opacity-5 w-16 h-16" />
          <Eye className="absolute top-[70%] right-[5%] text-slate-400 opacity-5 w-28 h-28" />
          <Shield className="absolute top-[10%] right-[30%] text-slate-400 opacity-5 w-12 h-12" />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-bold tracking-widest uppercase">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              AI-Powered Security
            </div>

            <h1 className="text-4xl md:text-6xl xl:text-7xl font-headline font-bold text-white leading-tight">
              Discover &amp; Protect{' '}
              <span className="text-teal-400">Personal Data</span> Across Every Database
            </h1>

            <p className="text-lg xl:text-xl text-slate-300 leading-relaxed max-w-xl">
              AI-powered PII detection that scans 50+ database types, identifies sensitive data
              in minutes, and helps you achieve DPDPA, GDPR &amp; HIPAA compliance.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onStartTrial}
                className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(20,184,166,0.4)] flex items-center gap-2 group active:scale-95"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onWatchDemo}
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur-sm flex items-center gap-2 active:scale-95"
              >
                <PlayCircle className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10">
              {STATS.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scan dashboard -- visible on lg+, simplified card on md */}
          <div className="relative group hidden md:block">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-sky-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
            <div className="relative glass-morphism border border-white/10 rounded-2xl p-6 xl:p-8 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                    <BarChart3 className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Active Scan: Production_DB</h3>
                    <p className="text-xs text-slate-500">Scanning 248.5 GB of encrypted data</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-teal-500/20 text-teal-400 text-[10px] font-bold rounded uppercase tracking-tighter">
                  In Progress
                </span>
              </div>

              <div className="space-y-3">
                {SCAN_RESULTS.map((result) => (
                  <div
                    key={result.type}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-teal-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-teal-500" fill="currentColor" />
                      <div>
                        <div className="text-sm font-medium text-slate-200">{result.type}</div>
                        <div className="text-xs text-slate-500">Compliance: {result.compliance}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-teal-400 font-mono font-bold text-sm">{result.count}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-end justify-between h-20 gap-2">
                {[40, 65, 90, 50, 100, 75, 30].map((h, i) => (
                  <div
                    key={i}
                    className="w-full rounded-t-sm"
                    style={{
                      height: `${h}%`,
                      backgroundColor: `rgba(20, 184, 166, ${0.1 + (h / 100) * 0.5})`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 glass-morphism p-3 border border-white/10 rounded-xl shadow-xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-teal-500" />
              <span className="text-xs font-bold text-white tracking-wider">THREAT LEVEL: LOW</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
