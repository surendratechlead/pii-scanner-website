'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { MotionDiv, MotionItem } from '@/components/ui/motion-wrapper'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const BASE = '/pii-scanner-website'

interface DatabaseInfo {
  name: string
  logo: string
  popular?: boolean
  category: 'rdbms' | 'cloud' | 'nosql' | 'vector' | 'object'
}

const DATABASES: DatabaseInfo[] = [
  { name: 'PostgreSQL', logo: `${BASE}/logos/postgresql.svg`, popular: true, category: 'rdbms' },
  { name: 'MySQL', logo: `${BASE}/logos/mysql.svg`, popular: true, category: 'rdbms' },
  { name: 'SQL Server', logo: `${BASE}/logos/sqlserver.svg`, category: 'rdbms' },
  { name: 'Oracle', logo: `${BASE}/logos/oracle.svg`, category: 'rdbms' },
  { name: 'Snowflake', logo: `${BASE}/logos/snowflake.svg`, popular: true, category: 'cloud' },
  { name: 'BigQuery', logo: `${BASE}/logos/bigquery.svg`, popular: true, category: 'cloud' },
  { name: 'Redshift', logo: `${BASE}/logos/redshift.svg`, category: 'cloud' },
  { name: 'MongoDB', logo: `${BASE}/logos/mongodb.svg`, popular: true, category: 'nosql' },
  { name: 'Cassandra', logo: `${BASE}/logos/cassandra.svg`, category: 'nosql' },
  { name: 'DynamoDB', logo: `${BASE}/logos/dynamodb.svg`, category: 'nosql' },
  { name: 'Qdrant', logo: `${BASE}/logos/qdrant.svg`, popular: true, category: 'vector' },
  { name: 'Milvus', logo: `${BASE}/logos/milvus.svg`, category: 'vector' },
  { name: 'Pinecone', logo: `${BASE}/logos/pinecone.svg`, category: 'vector' },
  { name: 'S3', logo: `${BASE}/logos/s3.svg`, category: 'object' },
  { name: 'GCS', logo: `${BASE}/logos/gcs.svg`, category: 'object' },
  { name: 'Azure Blob', logo: `${BASE}/logos/azureblob.svg`, category: 'object' },
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
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 rounded-lg md:rounded-xl bg-muted flex items-center justify-center group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50 transition-colors">
                  <Image
                    src={db.logo}
                    alt={`${db.name} logo`}
                    width={40}
                    height={40}
                    className="w-7 h-7 md:w-10 md:h-10 object-contain"
                    unoptimized
                  />
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
