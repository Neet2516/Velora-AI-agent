import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://velora.ai"
  ),
  title: {
    default: "Velora AI — Real-Time AI Trading Signals (Beta)",
    template: "%s | Velora AI",
  },
  description:
    "Velora AI delivers high-precision trading signals directly from our Telegram and backend intelligence pipeline to your live dashboard in near real time.",
  keywords: [
    "AI trading signals",
    "crypto signals",
    "forex signals",
    "Telegram signals",
    "Velora AI",
    "real-time trading telemetry",
  ],
  authors: [{ name: "Velora AI Team" }],
  creator: "Velora AI",
  publisher: "Velora AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://velora.ai",
    siteName: "Velora AI",
    title: "Velora AI — Real-Time AI Trading Signals (Beta)",
    description:
      "High-precision trading signals dispatched from Telegram & backend intelligence directly to a live streaming web dashboard.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velora AI — Real-Time AI Trading Signals (Beta)",
    description:
      "High-precision trading signals dispatched from Telegram & backend intelligence directly to a live streaming web dashboard.",
    creator: "@VeloraAI",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#050A1F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('velora-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.setAttribute('data-theme','dark');document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.setAttribute('data-theme','light');document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-[#5B7CFF] selection:text-white transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
