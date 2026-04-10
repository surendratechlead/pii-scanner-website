import {
  HardDrive, Brackets, GitBranch, Database, Cloud, BarChart3,
  Zap, Search, ArrowRight, Network
} from 'lucide-react'

const DATABASES = [
  { name: 'PostgreSQL', icon: HardDrive },
  { name: 'MySQL', icon: Brackets },
  { name: 'MongoDB', icon: GitBranch },
  { name: 'SQL Server', icon: Database },
  { name: 'Snowflake', icon: Cloud },
  { name: 'BigQuery', icon: BarChart3 },
  { name: 'Redis', icon: Zap },
  { name: 'Elasticsearch', icon: Search },
]

export function DatabaseSection() {
  return (
    <section className="relative h-full flex flex-col justify-center overflow-hidden bg-grid-pattern py-12">
      <div className="absolute top-20 left-10 opacity-10 pointer-events-none">
        <Database className="w-28 h-28 text-teal-500" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 pointer-events-none rotate-12">
        <Network className="w-36 h-36 text-sky-500" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Scan Any <span className="text-sky-400">Database</span>, Anywhere
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Native connectors for cloud-native and legacy infrastructure. Deploy in minutes with
            zero-trust architecture.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {DATABASES.map((db) => {
            const Icon = db.icon
            return (
              <div
                key={db.name}
                className="group relative bg-slate-950/40 backdrop-blur-md border border-slate-800 p-6 rounded-xl hover:border-sky-500/50 transition-all duration-300 text-center"
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-label font-bold text-white">{db.name}</h4>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
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
