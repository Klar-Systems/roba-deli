import { dict, type Locale } from "@/lib/i18n";

/**
 * Oiva food-control result for Roba Deli. Food business operators must show
 * their latest Oiva report or link to it (elintarvikelaki 297/2021 §16).
 *
 * Measured 2026-09-13 from the oivahymy.fi search API, not typed from memory:
 *   GET https://www.oivahymy.fi/api/haku/pika?input=Roba%20Deli
 *   → nimi "Roba Deli", toimija "SubHub Oy", Iso Roobertinkatu 1, 00120 Helsinki,
 *     kohdetoimintatunnus 1153693, oivat[0] = { kokonaisarvosana "A",
 *     tapahtumapaiva "2026-06-25", oivatapahtumatunnus 254984 }
 * oivahymy.fi itself links every report as api/raportti/<oivatapahtumatunnus>;
 * the endpoint serves oivaraportti_254984.pdf. When the next inspection lands,
 * change the id and the date together.
 */
export const OIVA_REPORT_URL = "https://www.oivahymy.fi/api/raportti/254984";
export const OIVA_REPORT_DATE = "25.6.2026";

export default function OivaBadge({ locale }: { locale: Locale }) {
  const t = dict[locale].footer;
  return (
    <a
      className="oiva"
      href={OIVA_REPORT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.oiva} ${OIVA_REPORT_DATE} (PDF)`}
    >
      {/* The Oivallinen smiley is an outline face (see the report itself),
          drawn here in the Trustpilot green already used in this row. */}
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <circle cx="16" cy="16" r="14" fill="none" stroke="#00B67A" strokeWidth="2.4" />
        <circle cx="11.3" cy="12.6" r="2" fill="#00B67A" />
        <circle cx="20.7" cy="12.6" r="2" fill="#00B67A" />
        <path
          d="M9.2 18.6 Q16 26.2 22.8 18.6"
          fill="none"
          stroke="#00B67A"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span>
        {t.oiva} <small>{OIVA_REPORT_DATE}</small>
      </span>
    </a>
  );
}
