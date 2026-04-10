import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote:
      'PII Scanner reduced our manual auditing time by 90%. The accuracy of the AI-driven classification is unparalleled in the market.',
    name: 'David Chen',
    role: 'CTO, CloudScale AI',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDz29YYa3qNmzLxME9qhRsJvGztnreU7dHXY05o1YDrnZoVb-HxcKi-rGgLGSnpJZgT6YfYGTpPdG0AF4InJ2Db5OJu-hi3NpXFzCPgie98fzfdGlKbsUfulQikZuf-rWz549SO-dVAd0WjWkYClhJvnR8hAo6srF2f2knMiYU17HYnYNQEhnu2DCB2OMM7SVVqvZNkDOi4O6mAKlKm3wLwcsiLMvobysDqkkBSyEVHW6vrARS3LiUQVeh2HHLD9ngAU-uyt-C77zX0',
  },
  {
    quote:
      'The real-time compliance dashboards changed how we report to the board. We finally have a clear view of our data exposure risk.',
    name: 'Sarah Jenkins',
    role: 'CISO, Nexus Financial',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDK6xoRCg1sZr7iYOcbCp-QjjVyjHFrisXknjheFx9zr2mQ29xN6GS-x0R-LbFmDDpojwEqz4-l2zySRd0H65EzxzIWb-HYJq8ulO2BdHZA96tw6uGoJFuvUIJNQ5WbFi8QzyiRJMkTh80VZ4poSB5bMuvawpPMZ0HzLfgFjIJxNPLvuUVkwWED8Qt4zfc6ft86Yn8Rq86OYTJDQzynPvMdUUH722f2eUlomq6akN4kuMpFAv6naY61IRm0kL40my4-PFAJuM2jX7L6',
  },
  {
    quote:
      "Integrating PII Scanner into our CI/CD pipeline was seamless. It's now a non-negotiable part of our security stack.",
    name: 'Marcus Thorne',
    role: 'VP Engineering, DataFlow Inc.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuByYQ0Os0DdlOW6hGbsG6yXuMXh-ByDXFoko7sAeIbnX4UTl771LcdtlkWqIx3Va9ZXM0GvK0X6VzG9U2p0KbGGQ_Owitsnltd7FawS1iy-ARjE3DIWZAmEw4U62tyxZ84pbzSzxt-OcNos7Sy_62mNn1-4-EagnQ1ySysmrhkxp-IER16qLiUNM6rcJJqzyM7axOngPg0_hYNzEtpmNY3z5eokv6WzGas46hIdq1o3MIIoyhfMsYT7_BmOk0Isq1yd-1zCZrBlQaQS',
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L10 12V25C10 38.8 30 55 30 55C30 55 50 38.8 50 25V12L30 5Z' fill='none' stroke='%2314b8a6' stroke-width='1' stroke-opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-white mb-4">
            Trusted by Security Teams Worldwide
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Enterprise-grade PII detection helping the world&apos;s most innovative companies stay
            compliant and secure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="glass-card p-8 rounded-2xl flex flex-col h-full hover:border-teal-500/30 transition-all duration-500"
            >
              <div className="flex gap-1 mb-6 text-teal-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-lg text-slate-200 mb-8 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-500/20">
                  <img
                    alt={`Portrait of ${t.name}`}
                    src={t.image}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-sm text-teal-400 font-label">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-20" />
    </section>
  )
}
