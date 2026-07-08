import { REVIEWS } from "@/lib/data";
import { dict, type Locale } from "@/lib/i18n";

export default function Reviews({ locale }: { locale: Locale }) {
  const t = dict[locale].reviews;
  return (
    <section className="reviews" id="reviews">
      <div className="wrap">
        <div className="stars-top reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>{t.titlePre}<em>{t.titleEm}</em></h2>
        </div>
        <div className="rev-grid">
          {REVIEWS.map((r) => (
            <div className="rev reveal" key={r.who}>
              <div className="st">★★★★★</div>
              <p>“{r.text}”</p>
              <div className="who">
                {r.who} <span>{t.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
