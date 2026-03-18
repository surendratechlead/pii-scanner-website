import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Database, Server, Cloud, HardDrive, Search, Zap, ChevronRight } from 'lucide-react'

interface DatabaseInfo {
  name: string
  icon: React.ReactNode
  popular?: boolean
}

const DATABASES: DatabaseInfo[] = [
  { name: 'PostgreSQL', icon: <Server className="w-6 h-6 md:w-8 md:h-8" />, popular: true },
  { name: 'MySQL', icon: <Database className="w-6 h-6 md:w-8 md:h-8" />, popular: true },
  { name: 'MongoDB', icon: <HardDrive className="w-6 h-6 md:w-8 md:h-8" />, popular: true },
  { name: 'Oracle', icon: <Server className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'SQL Server', icon: <Database className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'Snowflake', icon: <Cloud className="w-6 h-6 md:w-8 md:h-8" />, popular: true },
  { name: 'BigQuery', icon: <Cloud className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'Redis', icon: <Zap className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'Elasticsearch', icon: <Search className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'DynamoDB', icon: <Cloud className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'Cassandra', icon: <Database className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'MariaDB', icon: <Database className="w-6 h-6 md:w-8 md:h-8" /> },
]

export function DatabaseSection() {
  return (
    <section id="databases" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <Badge className="mb-3 md:mb-4" variant="outline">Database Support</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Works with
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> All Major Databases</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Native connectors for every major database platform.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
          {DATABASES.map((db, i) => (
            <div
              key={i}
              className="group relative bg-card border-2 border-border rounded-lg md:rounded-xl p-4 md:p-6 text-center hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-lg"
            >
              {db.popular && (
                <Badge className="absolute -top-2 right-2 bg-emerald-500 text-white text-[10px] md:text-xs px-2">Popular</Badge>
              )}
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 rounded-lg md:rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:text-emerald-600 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950 transition-colors">
                {db.icon}
              </div>
              <div className="font-medium text-sm md:text-base">{db.name}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
            Don&apos;t see your database? We support 50+ database types.
          </p>
          <Button variant="outline" className="border-2 h-11 md:h-10">
            View All Supported Databases <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
