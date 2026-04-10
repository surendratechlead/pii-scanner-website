import { AtSign, Globe, Terminal } from 'lucide-react'

const TAB_MAP: Record<string, number> = {
  Features: 1,
  Pricing: 3,
  Enterprise: 3,
  Blog: 4,
  'Contact Us': -1,
}

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Enterprise', 'Changelog'],
  Company: ['About Us', 'Careers', 'Blog', 'Partners'],
  'Legal & Support': ['Privacy Policy', 'Terms of Service', 'Security Audit', 'Contact Us'],
}

interface FooterProps {
  onNavigate: (tab: number) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (link: string) => {
    const tab = TAB_MAP[link]
    if (tab !== undefined && tab >= 0) {
      onNavigate(tab)
    }
  }

  return (
    <footer className="bg-slate-950 w-full relative border-t-4 border-teal-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <div className="space-y-5">
          <button onClick={() => onNavigate(0)} className="text-lg font-bold text-teal-400 font-headline uppercase tracking-widest">
            PII Scanner
          </button>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Securing the world&apos;s most sensitive data with AI-powered discovery and protection.
            Built for scale, trusted for accuracy.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-500 hover:text-teal-400 transition-all" aria-label="Email">
              <AtSign className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-500 hover:text-teal-400 transition-all" aria-label="Website">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-500 hover:text-teal-400 transition-all" aria-label="Terminal">
              <Terminal className="w-5 h-5" />
            </a>
          </div>
        </div>

        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-white font-bold mb-5 text-sm">{title}</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="text-xs text-slate-500 hover:text-white transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xs text-slate-500 font-light">
          &copy; {new Date().getFullYear()} PII Scanner Security. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-[10px] text-teal-500 font-label">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            All Systems Operational
          </span>
        </div>
      </div>
    </footer>
  )
}
