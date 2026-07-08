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
    <svg className="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" key="1">
      <path d="M7 31 H41 V17 a2 2 0 0 0-1-1.7 Z" />
      <circle cx="32" cy="27" r="1.5" />
      <circle cx="35.5" cy="23" r="1.2" />
      <circle cx="27" cy="28.5" r="1.3" />
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
