import { dict, type Locale } from "@/lib/i18n";

export default function About({ locale }: { locale: Locale }) {
  const t = dict[locale].about;
  return (
    <section className="about" id="about">
      <div className="wrap grid">
        <div className="media reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/about-sub.webp" alt="Roba Deli handcrafted sub wrapped in deli paper" loading="lazy" decoding="async" />
          <span className="tag">{t.mediaTag}</span>
        </div>
        <div className="reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>
            {t.titlePre}<em>{t.titleEm}</em>{t.titlePost}
          </h2>
          <p>{t.body}</p>
          <ul className="proof">
            {t.proof.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <a className="btn" href="#menu">{t.cta}</a>
        </div>
      </div>
    </section>
  );
}
