import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Database, Zap, Shield, BarChart3, Lock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

const FEATURES: Feature[] = [
  {
    icon: <Search className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Intelligent Detection',
    description: 'AI-powered pattern recognition identifies PII across 50+ data types including SSN, credit cards, emails, and custom formats.',
    color: 'emerald',
  },
  {
    icon: <Database className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Universal Database Support',
    description: 'Scan PostgreSQL, MySQL, MongoDB, Oracle, SQL Server, Snowflake, BigQuery, and more with native connectors.',
    color: 'teal',
  },
  {
    icon: <Zap className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Real-Time Scanning',
    description: 'Continuous monitoring with real-time alerts when new PII is detected or data patterns change.',
    color: 'cyan',
  },
  {
    icon: <Shield className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Compliance Ready',
    description: 'Built-in templates for GDPR, CCPA, HIPAA, PCI-DSS, and SOC 2 compliance requirements.',
    color: 'amber',
  },
  {
    icon: <BarChart3 className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Risk Assessment',
    description: 'Automated risk scoring and prioritization helps you focus on the most critical data exposures.',
    color: 'rose',
  },
  {
    icon: <Lock className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Data Masking',
    description: 'Apply automated masking, encryption, or anonymization policies directly from the dashboard.',
    color: 'violet',
  },
]

const COLOR_CLASSES: Record<string, { bg: string; text: string }> = {
  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-950', text: 'text-emerald-600' },
  teal: { bg: 'bg-teal-100 dark:bg-teal-950', text: 'text-teal-600' },
  cyan: { bg: 'bg-cyan-100 dark:bg-cyan-950', text: 'text-cyan-600' },
  amber: { bg: 'bg-amber-100 dark:bg-amber-950', text: 'text-amber-600' },
  rose: { bg: 'bg-rose-100 dark:bg-rose-950', text: 'text-rose-600' },
  violet: { bg: 'bg-violet-100 dark:bg-violet-950', text: 'text-violet-600' },
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <Badge className="mb-3 md:mb-4" variant="outline">Features</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Everything You Need for
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Data Privacy</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Comprehensive tools to discover, classify, and protect sensitive data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {FEATURES.map((feature, i) => {
            const colors = COLOR_CLASSES[feature.color]
            return (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-emerald-200 dark:hover:border-emerald-800">
                <CardHeader className="p-4 md:p-6">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${colors.bg} flex items-center justify-center ${colors.text} mb-3 md:mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg md:text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <CardDescription className="text-sm md:text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
