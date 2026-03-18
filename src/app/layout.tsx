import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PII Scanner - Enterprise Data Privacy Protection",
  description: "Comprehensive PII scanning solution for all databases. Detect, classify, and protect sensitive data across your entire infrastructure with AI-powered scanning technology.",
  keywords: ["PII Scanner", "Data Privacy", "GDPR Compliance", "CCPA Compliance", "Data Protection", "Sensitive Data", "Database Security", "Privacy Compliance"],
  authors: [{ name: "PII Scanner Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "PII Scanner - Enterprise Data Privacy Protection",
    description: "Comprehensive PII scanning solution for all databases. Detect, classify, and protect sensitive data.",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
