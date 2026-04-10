'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const FAQ_ITEMS = [
  {
    question: 'How does PII scanning work?',
    answer:
      'PII Scanner uses advanced AI and machine learning models to analyze your database schemas and data content. It identifies patterns matching known PII types (emails, SSNs, phone numbers, etc.) while also using contextual analysis to detect non-obvious sensitive data. The entire process runs securely within your infrastructure.',
  },
  {
    question: 'What databases are supported?',
    answer:
      'We support a wide range of structured and unstructured data sources including PostgreSQL, MySQL, MongoDB, Snowflake, Databricks, and cloud storage like AWS S3 and Google Cloud Storage.',
  },
  {
    question: 'How accurate is the detection?',
    answer:
      'Our AI-powered classification achieves 99.7% accuracy across 100+ PII types. We continuously train our models on anonymized datasets and offer a zero false-positive mode for mission-critical workflows where precision is paramount.',
  },
  {
    question: 'Is my data secure during scanning?',
    answer:
      'Absolutely. PII Scanner operates within your infrastructure using read-only connections. No data ever leaves your environment. All scan metadata is encrypted at rest and in transit with AES-256 and TLS 1.3.',
  },
  {
    question: 'Can I define custom PII types?',
    answer:
      'Yes. The Pro and Enterprise plans allow you to train custom classifiers for industry-specific PII types. You can define patterns, provide sample data, and fine-tune detection thresholds to match your exact compliance requirements.',
  },
  {
    question: 'Which compliance standards are supported?',
    answer:
      'PII Scanner generates automated compliance reports for DPDPA, GDPR, HIPAA, CCPA, SOC 2, and PCI DSS. Our dashboards provide real-time visibility into your compliance posture with exportable audit trails.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(1)

  return (
    <section
      className="py-16 md:py-20 lg:py-24 relative"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='20' fill='%230ea5e9' fill-opacity='0.03' font-family='monospace' font-size='10'%3E01101 10101%3C/text%3E%3Ctext x='40' y='50' fill='%230ea5e9' fill-opacity='0.03' font-family='monospace' font-size='10'%3E11001 00110%3C/text%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-headline font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400">
            Everything you need to know about PII Scanner and modern data privacy.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={item.question}
                className={`rounded-xl overflow-hidden border transition-colors ${
                  isOpen
                    ? 'glass-card border-teal-500/20 bg-teal-500/5'
                    : 'glass-card border-white/5'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span
                    className={`text-lg font-medium ${
                      isOpen ? 'text-teal-400' : 'text-slate-200'
                    }`}
                  >
                    {item.question}
                  </span>
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-slate-400 leading-relaxed">{item.answer}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
