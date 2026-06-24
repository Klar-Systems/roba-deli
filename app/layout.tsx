import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

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
  title: "Roba Deli | Handcrafted sandwiches, salads & smoothies · Iso Roobertinkatu 1, Helsinki",
  description:
    "Roba Deli — Helsinki's newest sandwich deli on Iso Roobertinkatu. Handcrafted New York-style sandwiches, salads, smoothies & provisions. Hot, fresh, cheesy — from lunch to late night. ⭐ 5.0 on Google.",
  openGraph: {
    title: "Roba Deli · Helsinki's newest sandwich deli",
    description:
      "Handcrafted sandwiches, salads & provisions — from lunch to late night. Iso Roobertinkatu 1, Helsinki.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
