import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { apps, contact, founder, site, social } from "@/lib/data";
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

const title = `${site.name} — ${site.headline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "app development studio",
    "mobile app company",
    "React Native",
    "voice AI",
    "Awaz Khata",
    "Revive app",
    "Hydro app",
    "Pakistan app studio",
    "Muneeb Azam",
  ],
  authors: [{ name: founder.name }],
  creator: founder.name,
  publisher: site.name,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0c0d" },
  ],
};

/**
 * Structured data so search engines resolve Crafter.io as an organisation with
 * a named founder and a product catalogue, rather than a generic page.
 * `sameAs` is omitted entirely when no external profile is configured.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  slogan: site.tagline,
  email: contact.email,
  telephone: contact.phone,
  founder: {
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.role,
    description: founder.bio,
    ...(social.linkedin ? { sameAs: [social.linkedin] } : {}),
  },
  ...(social.playStore || social.linkedin
    ? {
        sameAs: [social.linkedin, social.playStore].filter(
          (url): url is string => Boolean(url),
        ),
      }
    : {}),
  makesOffer: apps.map((app) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "MobileApplication",
      name: app.name,
      description: app.description,
      applicationCategory: app.category,
      operatingSystem: app.platform,
    },
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
