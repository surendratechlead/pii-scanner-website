import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PII Scanner - Enterprise Data Privacy Protection",
  description:
    "Comprehensive PII scanning solution for all databases. Detect, classify, and protect sensitive data across your entire infrastructure with AI-powered scanning technology.",
  keywords: [
    "PII Scanner",
    "Data Privacy",
    "GDPR Compliance",
    "CCPA Compliance",
    "Data Protection",
    "Sensitive Data",
    "Database Security",
    "Privacy Compliance",
  ],
  authors: [{ name: "PII Scanner Team" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "PII Scanner - Enterprise Data Privacy Protection",
    description:
      "Comprehensive PII scanning solution for all databases. Detect, classify, and protect sensitive data.",
    url: "https://piiscanner.com",
    siteName: "PII Scanner",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PII Scanner - Enterprise Data Privacy Protection",
    description: "Comprehensive PII scanning solution for all databases",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexSans.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
