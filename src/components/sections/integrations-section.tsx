import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageSquare, Send, Bell, Ticket, Users, Shield, ChevronRight } from 'lucide-react'

interface IntegrationInfo {
  name: string
  icon: React.ReactNode
  description: string
  category: 'notification' | 'ticketing' | 'identity'
}

const INTEGRATIONS: IntegrationInfo[] = [
  // Notifications
  { name: 'Slack', icon: <MessageSquare className="w-6 h-6 md:w-8 md:h-8" />, description: 'Real-time PII alerts', category: 'notification' },
  { name: 'Microsoft Teams', icon: <Users className="w-6 h-6 md:w-8 md:h-8" />, description: 'Adaptive Card notifications', category: 'notification' },
  { name: 'PagerDuty', icon: <Bell className="w-6 h-6 md:w-8 md:h-8" />, description: 'Incident management', category: 'notification' },
  { name: 'Email (SMTP)', icon: <Send className="w-6 h-6 md:w-8 md:h-8" />, description: 'Email notifications', category: 'notification' },

  // Ticketing
  { name: 'Jira', icon: <Ticket className="w-6 h-6 md:w-8 md:h-8" />, description: 'Auto-create tickets', category: 'ticketing' },
  { name: 'ServiceNow', icon: <Ticket className="w-6 h-6 md:w-8 md:h-8" />, description: 'ITSM integration', category: 'ticketing' },
  { name: 'GitHub Issues', icon: <Ticket className="w-6 h-6 md:w-8 md:h-8" />, description: 'Track findings', category: 'ticketing' },

  // Identity
  { name: 'Okta', icon: <Shield className="w-6 h-6 md:w-8 md:h-8" />, description: 'SSO & SCIM', category: 'identity' },
  { name: 'Azure AD', icon: <Users className="w-6 h-6 md:w-8 md:h-8" />, description: 'Microsoft Entra ID', category: 'identity' },
  { name: 'SAML 2.0', icon: <Shield className="w-6 h-6 md:w-8 md:h-8" />, description: 'Universal SSO', category: 'identity' },
]

const categoryLabels = {
  notification: 'Notifications',
  ticketing: 'Ticketing',
  identity: 'Identity'
}

const categoryColors = {
  notification: 'from-blue-600 to-cyan-600',
  ticketing: 'from-purple-600 to-pink-600',
  identity: 'from-amber-600 to-orange-600'
}

export function IntegrationsSection() {
  return (
    <section id="integrations" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <Badge className="mb-3 md:mb-4" variant="outline">Integrations</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Connect with
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Your Stack</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Seamlessly integrate with your existing tools for alerts, ticketing, and identity management.
          </p>
        </div>

        {(['notification', 'ticketing', 'identity'] as const).map((category) => (
          <div key={category} className="mb-8 md:mb-12">
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-center">
              <span className={`bg-gradient-to-r ${categoryColors[category]} bg-clip-text text-transparent`}>
                {categoryLabels[category]}
              </span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
              {INTEGRATIONS.filter(i => i.category === category).map((integration, i) => (
                <div
                  key={i}
                  className="group bg-card border-2 border-border rounded-lg md:rounded-xl p-4 md:p-6 text-center hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 rounded-lg md:rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:text-purple-600 group-hover:bg-purple-100 dark:group-hover:bg-purple-950 transition-colors">
                    {integration.icon}
                  </div>
                  <div className="font-medium text-sm md:text-base mb-1">{integration.name}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{integration.description}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-8 md:mt-12">
          <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
            Need a custom integration? We support webhooks and APIs.
          </p>
          <Button variant="outline" className="border-2 h-11 md:h-10">
            View All Integrations <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
