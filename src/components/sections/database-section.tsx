'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Database, Server, Cloud, HardDrive, ChevronRight, Layers, Box, Sparkles } from 'lucide-react'
import { MotionDiv, MotionItem } from '@/components/ui/motion-wrapper'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface DatabaseInfo {
  name: string
  icon: React.ReactNode
  popular?: boolean
  category: 'rdbms' | 'cloud' | 'nosql' | 'vector' | 'object'
}

const DATABASES: DatabaseInfo[] = [
  { name: 'PostgreSQL', icon: <Server className="w-6 h-6 md:w-8 md:h-8" />, popular: true, category: 'rdbms' },
  { name: 'MySQL', icon: <Database className="w-6 h-6 md:w-8 md:h-8" />, popular: true, category: 'rdbms' },
  { name: 'SQL Server', icon: <Server className="w-6 h-6 md:w-8 md:h-8" />, category: 'rdbms' },
  { name: 'Oracle', icon: <Database className="w-6 h-6 md:w-8 md:h-8" />, category: 'rdbms' },
  { name: 'Snowflake', icon: <Cloud className="w-6 h-6 md:w-8 md:h-8" />, popular: true, category: 'cloud' },
  { name: 'BigQuery', icon: <Cloud className="w-6 h-6 md:w-8 md:h-8" />, popular: true, category: 'cloud' },
  { name: 'Redshift', icon: <Server className="w-6 h-6 md:w-8 md:h-8" />, category: 'cloud' },
  { name: 'MongoDB', icon: <HardDrive className="w-6 h-6 md:w-8 md:h-8" />, popular: true, category: 'nosql' },
  { name: 'Cassandra', icon: <Database className="w-6 h-6 md:w-8 md:h-8" />, category: 'nosql' },
  { name: 'DynamoDB', icon: <Cloud className="w-6 h-6 md:w-8 md:h-8" />, category: 'nosql' },
  { name: 'Qdrant', icon: <Layers className="w-6 h-6 md:w-8 md:h-8" />, popular: true, category: 'vector' },
  { name: 'Milvus', icon: <Layers className="w-6 h-6 md:w-8 md:h-8" />, category: 'vector' },
  { name: 'Pinecone', icon: <Sparkles className="w-6 h-6 md:w-8 md:h-8" />, category: 'vector' },
  { name: 'S3', icon: <Box className="w-6 h-6 md:w-8 md:h-8" />, category: 'object' },
  { name: 'GCS', icon: <Cloud className="w-6 h-6 md:w-8 md:h-8" />, category: 'object' },
  { name: 'Azure Blob', icon: <Box className="w-6 h-6 md:w-8 md:h-8" />, category: 'object' },
]

export function DatabaseSection() {
  return (
    <section id="databases" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <MotionDiv variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <Badge className="mb-3 md:mb-4" variant="outline">Database Support</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Works with
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> All Major Databases</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Native connectors for every major database platform - RDBMS, Cloud Warehouses, NoSQL, Vector DBs, and Object Storage.
          </p>
        </MotionDiv>

        <MotionDiv variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
          {DATABASES.map((db, i) => (
            <MotionItem key={i} variants={fadeInUp}>
              <div className="group relative bg-card border-2 border-border rounded-lg md:rounded-xl p-4 md:p-6 text-center hover:border-emerald-400 dark:hover:border-emerald-600 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-emerald-400/20 transition-all duration-300">
                {db.popular && (
                  <Badge className="absolute -top-2 right-2 bg-emerald-500 text-white text-[10px] md:text-xs px-2">Popular</Badge>
                )}
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 rounded-lg md:rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:text-emerald-600 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950 transition-colors">
                  {db.icon}
                </div>
                <div className="font-medium text-sm md:text-base">{db.name}</div>
              </div>
            </MotionItem>
          ))}
        </MotionDiv>

        <MotionDiv variants={fadeInUp} className="text-center mt-8 md:mt-12">
          <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
            Don&apos;t see your database? We support 50+ database types.
          </p>
          <Button variant="outline" className="border-2 h-11 md:h-10">
            View All Supported Databases <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </MotionDiv>
      </div>
    </section>
  )
}
