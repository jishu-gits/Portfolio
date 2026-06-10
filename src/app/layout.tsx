import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SoundProvider } from "@/components/layout/sound-provider";
import { GsapReveals } from "@/components/visuals/gsap-reveals";
import { portfolioContent } from "@/lib/content";

const { profile } = portfolioContent;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || profile.seo.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: profile.seo.title,
    template: `%s | ${profile.name}`
  },
  description: profile.seo.description,
  keywords: [
    "Unity",
    "XR",
    "AR",
    "VR",
    "procedural generation",
    "graphics systems",
    "adaptive rendering",
    "computer science engineer"
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    title: profile.seo.title,
    description: profile.seo.description,
    url: siteUrl,
    siteName: `${profile.name} Portfolio`,
    images: [
      {
        url: profile.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${profile.name} portfolio Open Graph image`
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: profile.seo.title,
    description: profile.seo.description,
    images: [profile.seo.ogImage]
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body className="font-sans antialiased">
        <SoundProvider>
          <GsapReveals />
          <SiteHeader name={profile.name} />
          {children}
          <SiteFooter profile={profile} />
        </SoundProvider>
      </body>
    </html>
  );
}
