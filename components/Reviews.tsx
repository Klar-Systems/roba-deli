import { REVIEWS } from "@/lib/data";
import { dict, type Locale } from "@/lib/i18n";

export default function Reviews({ locale }: { locale: Locale }) {
  const t = dict[locale].reviews;
  return (
    <section className="reviews" id="reviews">
      <div className="wrap">
        <div className="stars-top reveal">
          <div className="big">5.0</div>
          <div className="st">★★★★★</div>
          <div className="sub">{t.sub}</div>
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
