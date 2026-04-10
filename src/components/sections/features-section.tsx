import { Shield, Brain, Database, Clock, BarChart, Lock } from 'lucide-react'

const FEATURES = [
  {
    icon: Shield,
    title: 'Automated PII Discovery',
    description: 'Scan databases automatically to find personal data like emails, SSNs, phone numbers, and home addresses with zero manual intervention.',
    color: 'teal',
  },
  {
    icon: Brain,
    title: 'AI-Powered Classification',
    description: 'Advanced machine learning models classify 100+ PII types with 99.7% accuracy, reducing false positives through deep contextual analysis.',
    color: 'indigo',
  },
  {
    icon: Database,
    title: '50+ Database Support',
    description: 'Seamless integration with PostgreSQL, MySQL, MongoDB, Snowflake, BigQuery, and modern cloud data warehouses via native connectors.',
    color: 'sky',
  },
  {
    icon: Clock,
    title: 'Real-Time Monitoring',
    description: 'Continuous scanning infrastructure detects new PII instances as data flows through your pipelines, ensuring non-stop protection.',
    color: 'teal',
  },
  {
    icon: BarChart,
    title: 'Compliance Dashboards',
    description: 'Generate DPDPA, GDPR, HIPAA, and CCPA compliance reports at your fingertips. Automated audit trails for every scan event.',
    color: 'indigo',
  },
  {
    icon: Lock,
    title: 'Data Masking & Encryption',
    description: 'Protect sensitive data immediately upon discovery with one-click masking, anonymization, and field-level encryption policies.',
    color: 'sky',
  },
]

const COLOR_MAP = {
  teal: {
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    hoverBorder: 'group-hover:border-teal-500/50',
    text: 'text-teal-400',
  },
  indigo: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    hoverBorder: 'group-hover:border-indigo-500/50',
    text: 'text-indigo-400',
  },
  sky: {
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    hoverBorder: 'group-hover:border-sky-500/50',
    text: 'text-sky-400',
  },
}

export function FeaturesSection() {
  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-24 px-6 md:px-12 bg-circuit overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <Shield className="absolute top-20 left-10 w-24 h-24 text-teal-500 rotate-12" />
        <Lock className="absolute top-1/4 right-20 w-20 h-20 text-sky-500 -rotate-12" />
        <Brain className="absolute bottom-1/3 left-1/4 w-16 h-16 text-indigo-500" />
        <Database className="absolute bottom-10 right-10 w-24 h-24 text-sky-500" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white inline-block relative">
            Enterprise-Grade PII Detection
            <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
          </h2>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-base lg:text-lg">
            Comprehensive scanning infrastructure designed to safeguard your most sensitive data
            assets across the entire enterprise ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature) => {
            const colors = COLOR_MAP[feature.color as keyof typeof COLOR_MAP]
            const Icon = feature.icon
            return (
              <div key={feature.title} className="glass-card p-6 rounded-xl transition-all group">
                <div
                  className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center mb-4 border ${colors.border} ${colors.hoverBorder} transition-colors`}
                >
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <h3 className="text-lg font-headline font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-16 space-y-1">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-30" />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-20" />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-10" />
      </div>
    </section>
  )
}
