'use client'

import { ArrowRight, Database, Network } from 'lucide-react'

const BASE = '/pii-scanner-website'

const DATABASES = [
  { name: 'PostgreSQL', logo: '/db-logos/postgresql.svg', color: 'from-blue-600/20 to-indigo-600/20', border: 'hover:border-blue-500/50' },
  { name: 'MySQL', logo: '/db-logos/mysql.svg', color: 'from-orange-500/20 to-yellow-500/20', border: 'hover:border-orange-500/50' },
  { name: 'MongoDB', logo: '/db-logos/mongodb.svg', color: 'from-green-500/20 to-emerald-500/20', border: 'hover:border-green-500/50' },
  { name: 'SQL Server', logo: '/db-logos/sqlserver.svg', color: 'from-red-500/20 to-rose-500/20', border: 'hover:border-red-500/50' },
  { name: 'Snowflake', logo: '/db-logos/snowflake.svg', color: 'from-sky-400/20 to-cyan-400/20', border: 'hover:border-sky-400/50' },
  { name: 'BigQuery', logo: '/db-logos/bigquery.svg', color: 'from-blue-500/20 to-blue-400/20', border: 'hover:border-blue-400/50' },
  { name: 'Redis', logo: '/db-logos/redis.svg', color: 'from-red-500/20 to-orange-500/20', border: 'hover:border-red-400/50' },
  { name: 'Elasticsearch', logo: '/db-logos/elasticsearch.svg', color: 'from-yellow-500/20 to-teal-500/20', border: 'hover:border-yellow-500/50' },
]

export function DatabaseSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden bg-grid-pattern py-16 md:py-20 lg:py-24">
      <div className="absolute top-20 left-10 opacity-10 pointer-events-none">
        <Database className="w-28 h-28 text-teal-500" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 pointer-events-none rotate-12">
        <Network className="w-36 h-36 text-sky-500" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Scan Any <span className="text-sky-400">Database</span>, Anywhere
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Native connectors for cloud-native and legacy infrastructure. Deploy in minutes with
            zero-trust architecture.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {DATABASES.map((db) => (
            <div
              key={db.name}
              className={`group relative bg-slate-950/40 backdrop-blur-md border border-slate-800 p-6 rounded-xl transition-all duration-300 text-center ${db.border}`}
            >
              <div className={`mb-4 mx-auto w-14 h-14 rounded-xl bg-gradient-to-br ${db.color} flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${BASE}${db.logo}`} alt={`${db.name} logo`} className="w-full h-full" />
              </div>
              <h4 className="font-label font-bold text-white">{db.name}</h4>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-500">And 40+ more databases supported</p>
          <button className="text-teal-400 hover:text-teal-300 font-bold flex items-center justify-center gap-1 mt-2 group mx-auto">
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
