# PII Scanner — Enterprise Data Privacy Protection

AI-powered PII scanning platform that detects, classifies, and protects personally identifiable information across your entire database infrastructure.

Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui**.

---

## Features

- **Intelligent Detection** — AI-powered pattern recognition across 50+ PII data types
- **Universal Database Support** — Native connectors for PostgreSQL, MySQL, MongoDB, Oracle, SQL Server, Snowflake, BigQuery, and more
- **Real-Time Scanning** — Continuous monitoring with instant alerts on new PII detections
- **Compliance Ready** — Built-in templates for GDPR, CCPA, HIPAA, PCI-DSS, and SOC 2
- **Risk Assessment** — Automated risk scoring and prioritization
- **Data Masking** — Automated masking, encryption, and anonymization policies
- **Responsive Design** — Mobile-first UI with adaptive modal/drawer components

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Radix UI primitives) |
| Language | TypeScript 5 (strict mode) |
| Forms | React Hook Form + Zod |
| State | Zustand + TanStack Query |
| Database | Prisma 6 (SQLite) |
| Auth | NextAuth 4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Linting | ESLint 9 (core-web-vitals + typescript) |

---

## Prerequisites

- **Node.js** 18.17 or later
- **npm** 9+ (or **bun** if preferred)
- **Git**

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/surendratechlead/pii-scanner-website.git
cd pii-scanner-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Configure the following in `.env`:

```env
# Database (SQLite used by default)
DATABASE_URL="file:./dev.db"

# NextAuth (required for authentication features)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
```

### 4. Initialize the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create production build (standalone output) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:reset` | Reset database |

---

## Project Structure

```
pii-scanner-website/
├── public/                     # Static assets
│   ├── favicon.svg             # Tab icon (emerald shield)
│   ├── logo.svg                # Company logo
│   └── robots.txt              # Crawler directives
├── prisma/
│   └── schema.prisma           # Database schema
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (fonts, metadata, toaster)
│   │   ├── page.tsx            # Home page (composes all sections)
│   │   ├── globals.css         # Global styles + Tailwind theme
│   │   └── api/
│   │       └── route.ts        # API endpoints
│   ├── components/
│   │   ├── sections/           # Page section components
│   │   │   ├── header.tsx      # Navigation bar with mobile menu
│   │   │   ├── hero-section.tsx
│   │   │   ├── features-section.tsx
│   │   │   ├── database-section.tsx
│   │   │   ├── pricing-section.tsx
│   │   │   ├── testimonials-section.tsx
│   │   │   ├── faq-section.tsx
│   │   │   ├── cta-section.tsx
│   │   │   └── footer.tsx
│   │   ├── forms/              # Form components
│   │   │   ├── signup-form.tsx
│   │   │   ├── demo-request-form.tsx
│   │   │   └── contact-sales-form.tsx
│   │   ├── ui/                 # shadcn/ui primitives (50+ components)
│   │   │   └── responsive-modal.tsx  # Dialog/Drawer adaptive wrapper
│   │   └── error-boundary.tsx  # React error boundary
│   ├── hooks/
│   │   ├── use-mobile.ts       # Mobile breakpoint detection
│   │   └── use-toast.ts        # Toast notification hook
│   └── lib/
│       ├── utils.ts            # cn() utility (clsx + tailwind-merge)
│       └── db.ts               # Prisma client singleton
├── .zscripts/                  # Build & deployment scripts
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind theme extensions
├── tsconfig.json               # TypeScript strict configuration
└── components.json             # shadcn/ui configuration
```

---

## Architecture Decisions

### Component Architecture

The landing page is decomposed into independent section components under `src/components/sections/`. Each section manages its own state (e.g., modal open/close) and is composed in `page.tsx` — keeping the root page to ~25 lines.

### Responsive Modals

A `ResponsiveModal` component automatically renders a `Dialog` on desktop and a `Drawer` on mobile (via the `useIsMobile` hook), providing a native feel on both platforms.

### Form Handling

Forms use controlled state with `useState` and submit via toast notifications. The architecture supports swapping to real API calls by replacing the `setTimeout` mock with `fetch` to the `/api/` routes.

### Styling

Tailwind CSS v4 with CSS custom properties for theming. The design system uses an emerald-to-teal gradient as the primary brand identity, with HSL-based CSS variables for light/dark mode support.

---

## Deployment

### GitHub Pages (Automatic)

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys to GitHub Pages on every push to `main`.

**Setup steps:**

1. Push this repository to GitHub
2. Go to **Settings > Pages**
3. Under **Source**, select **GitHub Actions**
4. Push to `main` — the workflow will build and deploy automatically

The site will be live at `https://<username>.github.io/pii-scanner-website/`

### Manual Production Build

```bash
npm run build
```

The project uses Next.js static export, producing optimized files in the `out/` directory. This output can be hosted on any static hosting provider (Vercel, Netlify, Cloudflare Pages, S3, etc.).

### Docker (via Caddy)

A `Caddyfile` is included for reverse proxy configuration:

```
:81 {
    reverse_proxy localhost:3000
}
```

### Environment Checklist

Before deploying, ensure these environment variables are set:

- `DATABASE_URL` — Production database connection string
- `NEXTAUTH_URL` — Your production domain
- `NEXTAUTH_SECRET` — A cryptographically secure random string

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

Proprietary — All rights reserved.
