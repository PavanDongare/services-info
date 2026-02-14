import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsTracker } from "@/components/analytics-tracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrivacyStack | Privacy-First Analytics. Enterprise-Ready.",
  description:
    "Your complete stack for compliant analytics, consent management, and AI governance. Expert implementation of OneTrust, privacy-first analytics, and EU AI Act compliance.",
  keywords: [
    "privacy analytics",
    "GDPR compliance",
    "OneTrust implementation",
    "cookie consent",
    "server-side tracking",
    "EU AI Act",
    "CCPA compliance",
    "consent management",
    "privacy-first analytics",
    "data protection",
  ],
  authors: [{ name: "PrivacyStack" }],
  openGraph: {
    title: "PrivacyStack | Privacy-First Analytics. Enterprise-Ready.",
    description:
      "Your complete stack for compliant analytics, consent management, and AI governance.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrivacyStack | Privacy-First Analytics. Enterprise-Ready.",
    description:
      "Your complete stack for compliant analytics, consent management, and AI governance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AnalyticsTracker />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
