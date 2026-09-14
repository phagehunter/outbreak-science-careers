import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  absUrl,
} from "@/lib/site";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [AUTHOR],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  keywords: [
    "outbreak science careers",
    "biosecurity careers",
    "epidemiology careers",
    "public health careers",
    "pandemic preparedness jobs",
    "biodefense careers",
    "global health security",
    "One Health careers",
    "biosecurity fellowships",
    "biodefense graduate programs",
    "epidemic intelligence service",
    "outbreak response training",
  ],
  category: "education",
  alternates: { canonical: absUrl("/") },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: absUrl("/"),
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: "Biosecurity Careers",
  url: absUrl("/"),
  description: SITE_DESCRIPTION,
  inLanguage: "en-US",
  author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
  publisher: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
