import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, FileText, File, Users, BookMarked, Headphones, ClipboardList } from 'lucide-react'

interface Resource {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  color: string
}

const RESOURCES: Resource[] = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Blogs',
    description: 'Insights, best practices, and thought leadership on data privacy and PII protection.',
    href: '#',
    color: 'emerald',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Case Studies',
    description: 'Real-world success stories from organizations that trust PII Scanner.',
    href: '#',
    color: 'teal',
  },
  {
    icon: <File className="w-6 h-6" />,
    title: 'Whitepapers',
    description: 'In-depth research and technical papers on data security and compliance.',
    href: '#',
    color: 'cyan',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'CIO Connection',
    description: 'Executive insights and strategic guidance for technology leaders.',
    href: '#',
    color: 'violet',
  },
  {
    icon: <BookMarked className="w-6 h-6" />,
    title: 'Documentation',
    description: 'Technical guides, API references, and getting started tutorials.',
    href: '#',
    color: 'amber',
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: 'Support',
    description: 'Get help from our team with setup, configuration, and troubleshooting.',
    href: '#',
    color: 'rose',
  },
  {
    icon: <ClipboardList className="w-6 h-6" />,
    title: 'Reports',
    description: 'Industry reports, compliance benchmarks, and data privacy trends.',
    href: '#',
    color: 'blue',
  },
]

const COLOR_CLASSES: Record<string, { bg: string; text: string }> = {
  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-950', text: 'text-emerald-600' },
  teal: { bg: 'bg-teal-100 dark:bg-teal-950', text: 'text-teal-600' },
  cyan: { bg: 'bg-cyan-100 dark:bg-cyan-950', text: 'text-cyan-600' },
  violet: { bg: 'bg-violet-100 dark:bg-violet-950', text: 'text-violet-600' },
  amber: { bg: 'bg-amber-100 dark:bg-amber-950', text: 'text-amber-600' },
  rose: { bg: 'bg-rose-100 dark:bg-rose-950', text: 'text-rose-600' },
  blue: { bg: 'bg-blue-100 dark:bg-blue-950', text: 'text-blue-600' },
}

export function ResourcesSection() {
  return (
    <section id="resources" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <Badge className="mb-3 md:mb-4" variant="outline">Resources</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Learn, Explore &
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Get Support</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Access guides, case studies, and expert resources to get the most out of PII Scanner.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {RESOURCES.map((resource, i) => {
            const colors = COLOR_CLASSES[resource.color]
            return (
              <a key={i} href={resource.href} className="group">
                <Card className="h-full border-2 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 md:p-6">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${colors.bg} flex items-center justify-center ${colors.text} mb-3 md:mb-4 group-hover:scale-110 transition-transform`}>
                      {resource.icon}
                    </div>
                    <h3 className="font-semibold text-base md:text-lg mb-2 group-hover:text-emerald-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">{resource.description}</p>
                  </CardContent>
                </Card>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
