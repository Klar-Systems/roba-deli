import { REVIEWS } from "@/lib/data";
import { dict, type Locale } from "@/lib/i18n";

const TRIPADVISOR =
  "https://www.tripadvisor.com/Restaurant_Review-g189934-d34509442-Reviews-Roba_Deli-Helsinki_Uusimaa.html";
const GOOGLE = "https://www.google.com/maps/place/?q=place_id:ChIJBzxlKz0LkkYR-cH59jgnhic";

const COPY = {
  en: {
    lead: "We would rather send you to the reviews we cannot edit than print our own favourites here.",
    tripadvisor: "Read the reviews on Tripadvisor",
    google: "Read the reviews on Google",
  },
  fi: {
    lead: "Lähetämme sinut mieluummin arvosteluihin joita emme voi muokata kuin painamme tähän omat suosikkimme.",
    tripadvisor: "Lue arvostelut Tripadvisorissa",
    google: "Lue arvostelut Googlessa",
  },
} as const;

/**
 * Guest reviews.
 *
 * This section used to print three named five-star quotes from `REVIEWS` in
 * lib/data.ts, sourced "· Google". Nothing in the repo records where they came
 * from, and publishing a review a trader cannot show is genuine is a banned
 * commercial practice (Omnibus Directive, Annex I points 23b-23c; in Finland
 * kuluttajansuojalaki 2 luku). So the quotes are gone and the section now
 * points at the platforms that verify their own reviews.
 *
 * If the owner confirms those three quotes are real and can say which listing
 * and which date each came from, put them back in `REVIEWS` WITH that source
 * recorded beside them, and they will render again — the map below is still
 * here for exactly that. Until then it renders empty, which is the honest state.
 */
export default function Reviews({ locale }: { locale: Locale }) {
  const t = dict[locale].reviews;
  const c = COPY[locale];

  return (
    <section className="reviews" id="reviews">
      <div className="wrap">
        <div className="stars-top reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>
            {t.titlePre}
            <em>{t.titleEm}</em>
          </h2>
        </div>

        {REVIEWS.length > 0 && (
          <div className="rev-grid">
            {REVIEWS.map((r) => (
              <div className="rev reveal" key={r.who}>
                <p>&ldquo;{r.text}&rdquo;</p>
                <div className="who">
                  {r.who} <span>{t.source}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="rev-links reveal">
          <p>{c.lead}</p>
          <a href={TRIPADVISOR} target="_blank" rel="noopener noreferrer">
            {c.tripadvisor}
          </a>
          <a href={GOOGLE} target="_blank" rel="noopener noreferrer">
            {c.google}
          </a>
        </div>
      </div>
    </section>
  );
}
