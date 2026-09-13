import { REVIEWS } from "@/lib/data";
import { dict, type Locale } from "@/lib/i18n";

/**
 * Guest reviews.
 *
 * Reverted 2026-09-08 to render exactly as it did before that day's legal pass:
 * three quotes, five stars, "· Google". The link-out panel that briefly replaced
 * them has been removed so the page is visually unchanged.
 *
 * The open concern lives with the data, in lib/data.ts — no provenance exists
 * for these three quotes. The schema.org Review markup built from them has NOT
 * been restored, because that is invisible to a visitor; see
 * lib/structured-data.ts.
 */
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
