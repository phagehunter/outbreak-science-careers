import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  absUrl,
} from "@/lib/site";

/** Alt text for the share card, which carries the wordmark and the headline. */
const SHARE_IMAGE_ALT =
  "Outbreak Science Careers: your path into the fight against the next outbreak. Ten career tracks and 100+ roles, career guidance and funding.";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#5A65E5",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [AUTHOR],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  category: "education",
  alternates: { canonical: absUrl("/") },
  manifest: absUrl("/site.webmanifest"),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: absUrl("/"),
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{
      url: absUrl("/opengraph-image.png"),
      width: 1200,
      height: 630,
      alt: SHARE_IMAGE_ALT,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: absUrl("/opengraph-image.png"), alt: SHARE_IMAGE_ALT }],
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
  image: absUrl("/opengraph-image.png"),
  author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
  publisher: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
  potentialAction: { "@type": "ReadAction", target: absUrl("/roles/") },
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
