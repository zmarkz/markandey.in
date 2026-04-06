import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Markandey Singh — Director of Engineering | markandey.in",
    template: "%s | markandey.in",
  },
  description:
    "Director of Engineering at MoneyView. Building systems that scale and AI that thinks.",
  metadataBase: new URL("https://markandey.in"),
  openGraph: {
    title: "Markandey Singh — Director of Engineering",
    description:
      "Director of Engineering at MoneyView. Building systems that scale and AI that thinks.",
    url: "https://markandey.in",
    siteName: "markandey.in",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Markandey Singh — Director of Engineering",
    description:
      "Director of Engineering at MoneyView. Building systems that scale and AI that thinks.",
    creator: "@markandey",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#0a0a0f] text-zinc-200 font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Markandey Singh",
              jobTitle: "Director of Engineering",
              worksFor: {
                "@type": "Organization",
                name: "MoneyView",
              },
              url: "https://markandey.in",
              sameAs: [
                "https://linkedin.com/in/zmarkz",
                "https://github.com/markandey",
                "https://twitter.com/markandey",
              ],
              email: "markandey91@gmail.com",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "VIT Vellore",
              },
              knowsAbout: [
                "Software Engineering",
                "AI/ML Systems",
                "Platform Engineering",
                "DevOps",
                "Distributed Systems",
              ],
            }),
          }}
        />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
