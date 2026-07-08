import { dict, type Locale } from "@/lib/i18n";

const ICONS = [
  (
    <svg className="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" key="0">
      <path d="M6 30c0-9 8-16 18-16s18 7 18 16" />
      <path d="M4 30h40v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
      <path d="M18 12c0-3 12-3 12 0" />
    </svg>
  ),
  (
    <svg className="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" key="1">
      <path d="M10 14h28l-3 24a4 4 0 0 1-4 3H17a4 4 0 0 1-4-3z" />
      <path d="M16 14c0-6 16-6 16 0" />
      <path d="M22 22v10M28 22v10" />
    </svg>
  ),
  (
    <svg className="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" key="2">
      <path d="M24 6c6 8 10 13 10 20a10 10 0 0 1-20 0c0-7 4-12 10-20z" />
    </svg>
  ),
  (
    <svg className="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" key="3">
      <circle cx="24" cy="24" r="18" />
      <path d="M24 13v11l8 5" />
    </svg>
  ),
];

export default function Craft({ locale }: { locale: Locale }) {
  const t = dict[locale].craft;
  return (
    <section className="craft">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>
            {t.titlePre}<em>{t.titleEm}</em>
          </h2>
          <div className="rule"></div>
        </div>
        <div className="grid">
          {t.items.map((it, i) => (
            <div className="c reveal" key={it.title}>
              {ICONS[i]}
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
