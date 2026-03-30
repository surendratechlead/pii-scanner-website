'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Brain, Zap, Shield, Layers, Sparkles, Cpu } from 'lucide-react'
import { MotionDiv, MotionItem } from '@/components/ui/motion-wrapper'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const SCAN_MODES = [
  {
    name: 'Regex Mode',
    icon: <Zap className="w-6 h-6" />,
    description: 'Fast pattern matching with 120+ regex patterns',
    features: ['Sub-second scans', 'Minimal resources', 'High accuracy for structured data'],
    speed: 'Fastest',
    accuracy: 'High',
    useCase: 'Production scanning'
  },
  {
    name: 'NLP Mode',
    icon: <Brain className="w-6 h-6" />,
    description: 'Contextual AI-powered detection with LLMs',
    features: ['Contextual understanding', 'Detects unstructured PII', 'Multi-language support'],
    speed: 'Slower',
    accuracy: 'Highest',
    useCase: 'Deep analysis'
  },
  {
    name: 'Hybrid Mode',
    icon: <Layers className="w-6 h-6" />,
    description: 'Best of both worlds with confidence weighting',
    features: ['Regex + NLP combined', 'Confidence scoring', 'Automatic optimization'],
    speed: 'Balanced',
    accuracy: 'Highest',
    useCase: 'Recommended for most cases'
  }
]

const LLM_PROVIDERS = [
  { name: 'Ollama (Local)', description: 'Privacy-first, runs locally', icon: <Cpu className="w-5 h-5" /> },
  { name: 'OpenAI', description: 'GPT-4o, GPT-4o-mini', icon: <Sparkles className="w-5 h-5" /> },
  { name: 'Anthropic', description: 'Claude 3.5 Sonnet', icon: <Brain className="w-5 h-5" /> },
]

const PII_TYPES = [
  { category: 'Contact', types: ['Email', 'Phone', 'Name', 'Address'] },
  { category: 'Financial', types: ['Credit Card', 'Bank Account', 'IBAN', 'SWIFT'] },
  { category: 'Government ID', types: ['SSN', 'Passport', 'Driver License', 'Tax ID'] },
  { category: 'Healthcare', types: ['NPI', 'MRN', 'DEA Number', 'Medical Records'] },
  { category: 'Technical', types: ['API Keys', 'AWS Keys', 'IP Address', 'MAC Address'] },
  { category: 'International', types: ['Aadhaar', 'PAN', 'SIN', 'NINO', 'CPF', 'CURP'] },
]

export function AIDetectionSection() {
  return (
    <section id="ai-detection" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <MotionDiv variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <Badge className="mb-3 md:mb-4" variant="outline">AI-Powered Detection</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Choose Your
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> Detection Mode</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            From fast regex scans to deep AI analysis, select the mode that fits your needs.
          </p>
        </MotionDiv>

        <MotionDiv variants={staggerContainer} className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-12 md:mb-16">
          {SCAN_MODES.map((mode, i) => (
            <MotionItem key={i} variants={fadeInUp}>
              <Card className={`relative overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${i === 2 ? 'border-violet-500 border-2 animate-pulse-glow' : 'border-border hover:border-violet-300 dark:hover:border-violet-700'}`}>
                {i === 2 && (
                  <Badge className="absolute top-3 right-3 bg-violet-500 text-white">Recommended</Badge>
                )}
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-violet-100 dark:bg-violet-950 flex items-center justify-center text-violet-600 mb-3">
                    {mode.icon}
                  </div>
                  <CardTitle className="text-lg md:text-xl">{mode.name}</CardTitle>
                  <CardDescription>{mode.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {mode.features.map((feature, j) => (
                      <li key={j} className="flex items-center text-sm text-muted-foreground">
                        <Shield className="w-4 h-4 mr-2 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between text-sm border-t pt-4">
                    <div>
                      <span className="text-muted-foreground">Speed:</span>
                      <span className="ml-1 font-medium">{mode.speed}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Accuracy:</span>
                      <span className="ml-1 font-medium">{mode.accuracy}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="text-muted-foreground">Best for:</span>
                    <span className="ml-1 font-medium text-violet-600">{mode.useCase}</span>
                  </div>
                </CardContent>
              </Card>
            </MotionItem>
          ))}
        </MotionDiv>

        <MotionDiv variants={fadeInUp} className="max-w-3xl mx-auto mb-12 md:mb-16">
          <h3 className="text-lg md:text-xl font-semibold text-center mb-4 md:mb-6">Supported LLM Providers</h3>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {LLM_PROVIDERS.map((provider, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-3 md:p-4 text-center hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  {provider.icon}
                </div>
                <div className="font-medium text-sm md:text-base">{provider.name}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{provider.description}</div>
              </div>
            ))}
          </div>
        </MotionDiv>

        <MotionDiv variants={fadeInUp} className="max-w-5xl mx-auto">
          <h3 className="text-lg md:text-xl font-semibold text-center mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              120+ PII Patterns
            </span>
          </h3>
          <MotionDiv variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {PII_TYPES.map((category, i) => (
              <MotionItem key={i} variants={fadeInUp}>
                <div className="bg-card border border-border rounded-lg p-3 md:p-4 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all duration-300">
                  <div className="font-medium text-sm md:text-base mb-2 text-emerald-600">{category.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {category.types.map((type, j) => (
                      <Badge key={j} variant="outline" className="text-[10px] md:text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </MotionItem>
            ))}
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  )
}
