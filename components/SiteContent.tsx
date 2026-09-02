import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Deals from "@/components/Deals";
import Menu from "@/components/Menu";
import KlarOrder from "@/components/KlarOrder";
import Craft from "@/components/Craft";
import Smoothies from "@/components/Smoothies";
import Reviews from "@/components/Reviews";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";
import ScrollFX from "@/components/ScrollFX";
import { type Locale } from "@/lib/i18n";

export default function SiteContent({ locale }: { locale: Locale }) {
  return (
    <>
      <TopBar locale={locale} />
      <Nav locale={locale} />
      <main>
        <Hero locale={locale} />
        <About locale={locale} />
        <Deals locale={locale} />
        <Menu locale={locale} />
        <KlarOrder locale={locale} />
        <Craft locale={locale} />
        <Smoothies locale={locale} />
        <Reviews locale={locale} />
        <Visit locale={locale} />
      </main>
      <Footer locale={locale} />
      <ScrollFX />
    </>
  );
}
