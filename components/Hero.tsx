import { dict, type Locale } from "@/lib/i18n";
import OrderCta from "@/components/OrderCta";

export default function Hero({ locale }: { locale: Locale }) {
  const t = dict[locale].hero;
  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-scrape-real.webp"
          alt="Raclette cheese scraped molten over a Roba Deli pastrami sandwich"
          fetchPriority="high"
        />
      </div>
      <div className="hero-veil"></div>
      <div className="hero-content">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1>
          {t.title1}<br />{t.title2}<em>{t.titleEm}</em>
        </h1>
        <p>{t.intro}</p>
        <div className="hero-cta">
          {/* Same target either way — #menu is where ordering starts, because
              the basket is built from the dishes. Only the promise changes. */}
          <OrderCta className="btn btn-solid" orderLabel={t.ctaOrder} fallbackLabel={t.cta1} fallbackHref="#menu" />
          <a className="btn btn-ghost" href="#visit">{t.cta2}</a>
        </div>
      </div>
    </section>
  );
}
