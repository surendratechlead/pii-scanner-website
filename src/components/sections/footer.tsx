'use client'

import { ShieldCheck } from 'lucide-react'
import { MotionDiv } from '@/components/ui/motion-wrapper'
import { fadeInUp } from '@/lib/animations'

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'AI Detection', href: '#ai-detection' },
    { label: 'Databases', href: '#databases' },
    { label: 'Integrations', href: '#integrations' },
  ],
  Resources: [
    { label: 'Blogs', href: '#blog' },
    { label: 'Case Studies', href: '#' },
    { label: 'Whitepapers', href: '#' },
    { label: 'DPDPA Blog', href: 'https://www.dpdpa.com/blog.html', external: true },
    { label: 'Documentation', href: '#' },
    { label: 'Support', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#' },
    { label: 'Partners', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
} as const

const SOCIAL_LINKS = [
  {
    label: 'Twitter',
    path: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z',
  },
  {
    label: 'GitHub',
    path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
  {
    label: 'LinkedIn',
    path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
]

export function Footer() {
  return (
    <MotionDiv variants={fadeInUp}>
      <footer className="bg-muted/50 border-t border-border py-12 md:py-16 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-8 mb-8 md:mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <ShieldCheck className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  PII Scanner
                </span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 max-w-sm">
                Enterprise-grade PII detection and protection for all your databases. Stay compliant, stay secure.
              </p>
              <div className="flex items-center gap-3 md:gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a key={social.label} href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors p-1" aria-label={social.label}>
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">{title}</h4>
                <ul className="space-y-2 md:space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...('external' in link && link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="relative text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:w-0 after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-6 md:pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
              &copy; {new Date().getFullYear()} PII Scanner. All rights reserved.
            </p>
            <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors relative after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:w-0 after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors relative after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:w-0 after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors relative after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:w-0 after:bg-emerald-500 after:transition-all after:duration-300 hover:after:w-full hidden sm:inline">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </MotionDiv>
  )
}
