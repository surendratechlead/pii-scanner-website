'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Brain, Zap, Layers, Shield, Sparkles, Cpu, Check } from 'lucide-react'
import { MotionDiv, MotionItem } from '@/components/ui/motion-wrapper'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const SCAN_MODES = [
  {
    name: 'Regex Mode',
    icon: <Zap className="w-5 h-5" />,
    description: 'Fast pattern matching with 120+ regex patterns',
    features: ['Sub-second scans', 'Minimal resources', 'High accuracy for structured data'],
    speed: 'Fastest',
    accuracy: 'High',
    useCase: 'Production scanning'
  },
  {
    name: 'NLP Mode',
    icon: <Brain className="w-5 h-5" />,
    description: 'Contextual AI-powered detection with LLMs',
    features: ['Contextual understanding', 'Detects unstructured PII', 'Multi-language support'],
    speed: 'Slower',
    accuracy: 'Highest',
    useCase: 'Deep analysis'
  },
  {
    name: 'Hybrid Mode',
    icon: <Layers className="w-5 h-5" />,
    description: 'Best of both worlds with confidence weighting',
    features: ['Regex + NLP combined', 'Confidence scoring', 'Automatic optimization'],
    speed: 'Balanced',
    accuracy: 'Highest',
    useCase: 'Recommended'
  }
]

const LLM_PROVIDERS = [
  { name: 'Ollama (Local)', description: 'Privacy-first, runs locally', icon: <Cpu className="w-4 h-4" /> },
  { name: 'OpenAI', description: 'GPT-4o, GPT-4o-mini', icon: <Sparkles className="w-4 h-4" /> },
  { name: 'Anthropic', description: 'Claude 3.5 Sonnet', icon: <Brain className="w-4 h-4" /> },
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
    <section id="ai-detection" className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-4">
        <MotionDiv variants={fadeInUp} className="max-w-6xl mx-auto mb-14">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <Badge className="mb-4 text-xs font-medium text-slate-500 border-slate-200" variant="outline">AI-Powered Detection</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-slate-900 tracking-tight">
                Intelligent Detection That Goes Beyond Pattern Matching
              </h2>
              <p className="text-base md:text-lg text-slate-500">
                From fast regex scans to deep AI analysis — select the mode that fits your needs.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/images/sections/ai-detection-dashboard.svg"
                alt="AI detection engine showing confidence scores and LLM providers"
                width={600}
                height={450}
                className="w-full h-auto rounded-xl shadow-lg border border-slate-200"
                priority
              />
            </div>
          </div>
        </MotionDiv>

        <MotionDiv variants={staggerContainer} className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-16">
          {SCAN_MODES.map((mode, i) => (
            <MotionItem key={i} variants={fadeInUp}>
              <div className={`relative bg-white rounded-xl p-6 h-full ${i === 2 ? 'border-2 border-emerald-500 ring-1 ring-emerald-500/10' : 'border border-slate-200'}`}>
                {i === 2 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-medium bg-emerald-600 text-white px-3 py-1 rounded-full">
                    Recommended
                  </span>
                )}
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 mb-4">
                  {mode.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{mode.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{mode.description}</p>
                <ul className="space-y-2 mb-5">
                  {mode.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-sm text-slate-600">
                      <Check className="w-3.5 h-3.5 mr-2 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between text-xs border-t border-slate-100 pt-4">
                  <div>
                    <span className="text-slate-400">Speed: </span>
                    <span className="font-medium text-slate-600">{mode.speed}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Accuracy: </span>
                    <span className="font-medium text-slate-600">{mode.accuracy}</span>
                  </div>
                </div>
              </div>
            </MotionItem>
          ))}
        </MotionDiv>

        <MotionDiv variants={fadeInUp} className="max-w-3xl mx-auto mb-16">
          <h3 className="text-lg font-semibold text-center mb-6 text-slate-900">Supported LLM Providers</h3>
          <div className="grid grid-cols-3 gap-4">
            {LLM_PROVIDERS.map((provider, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg p-4 text-center">
                <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                  {provider.icon}
                </div>
                <div className="font-medium text-sm text-slate-700">{provider.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{provider.description}</div>
              </div>
            ))}
          </div>
        </MotionDiv>

        <MotionDiv variants={fadeInUp} className="max-w-5xl mx-auto">
          <h3 className="text-lg font-semibold text-center mb-6 text-slate-900">
            120+ PII Patterns Supported
          </h3>
          <MotionDiv variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PII_TYPES.map((category, i) => (
              <MotionItem key={i} variants={fadeInUp}>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="font-medium text-sm mb-2 text-slate-700">{category.category}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.types.map((type, j) => (
                      <Badge key={j} variant="outline" className="text-xs text-slate-500 border-slate-200 font-normal">
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
