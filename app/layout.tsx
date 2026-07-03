import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { restaurantJsonLd } from "@/lib/structured-data";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Roba Deli | Handcrafted sandwiches, salads & smoothies · Iso Roobertinkatu 1, Helsinki",
    template: "%s · Roba Deli",
  },
  description:
    "Roba Deli — Helsinki's newest sandwich deli on Iso Roobertinkatu. Handcrafted New York-style sandwiches, salads, smoothies & provisions. Hot, fresh, cheesy — from lunch to late night. ⭐ 5.0 on Google.",
  applicationName: "Roba Deli",
  keywords: [
    "Roba Deli",
    "sandwich deli Helsinki",
    "New York deli Helsinki",
    "Iso Roobertinkatu",
    "Punavuori",
    "subs Helsinki",
    "smoothies Helsinki",
    "salads",
    "takeaway Helsinki",
  ],
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Roba Deli",
    url: SITE_URL,
    locale: "en_US",
    title: "Roba Deli · Helsinki's newest sandwich deli",
    description:
      "Handcrafted sandwiches, salads & smoothies — from lunch to late night. Iso Roobertinkatu 1, Helsinki.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Roba Deli — Iso Roobertinkatu 1, Helsinki",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roba Deli · Helsinki's newest sandwich deli",
    description:
      "Handcrafted sandwiches, salads & smoothies — from lunch to late night. Iso Roobertinkatu 1, Helsinki.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0C09",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
