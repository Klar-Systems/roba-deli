import { dict, type Locale } from "@/lib/i18n";

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
          <a className="btn btn-solid" href="#menu">{t.cta1}</a>
          <a className="btn btn-ghost" href="#visit">{t.cta2}</a>
        </div>
      </div>
    </section>
  );
}
