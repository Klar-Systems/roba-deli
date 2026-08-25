import { dict, type Locale } from "@/lib/i18n";

export default function Visit({ locale }: { locale: Locale }) {
  const t = dict[locale].visit;
  return (
    <section className="visit" id="visit">
      <div className="wrap grid">
        <div className="reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>
            {t.titlePre}<em>{t.titleEm}</em>
          </h2>
          <div className="inforow">
            <div className="k">{t.labelAddress}</div>
            <div className="v">
              Iso Roobertinkatu 1<br />00120 Helsinki
            </div>
          </div>
          <div className="inforow">
            <div className="k">{t.labelPhone}</div>
            <div className="v">
              <a href="tel:+358503797490">050 379 7490</a>
            </div>
          </div>
          <div className="inforow">
            <div className="k">{t.labelHours}</div>
            <div className="v">
              {t.hours.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          </div>
          <div className="tags">
            {t.pills.map((p) => (
              <span className="tag-pill" key={p}>{p}</span>
            ))}
          </div>
          <div className="socials">
            <a href="https://www.instagram.com/roba.deli/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.26.07 1.64.07 4.84s0 3.58-.07 4.84c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.64.07-4.85.07s-3.59 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.58.07-4.84c.05-1.17.25-1.81.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.41 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5 0-4.74.07-.9.04-1.38.19-1.7.31-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.27.8-.31 1.7C3.4 8.5 3.4 8.85 3.4 12s0 3.5.07 4.74c.04.9.19 1.38.31 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.27 1.7.31 1.24.07 1.59.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.19 1.7-.31.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.27-.8.31-1.7.07-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.04-.9-.19-1.38-.31-1.7a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.12-.8-.27-1.7-.31C15.5 4 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.88zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zM17.64 6a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/Robadeli26/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3-.04-1.27-.12-2.4-.12-2.37 0-4 1.45-4 4.1v2.3H7.8V13h2.55v8z" />
              </svg>
            </a>
            <a href="https://www.tiktok.com/@robadeli" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9v2.7c-1.3.1-2.5-.3-3.6-1v6.1c0 3.4-2.5 5.6-5.6 5.6A5.4 5.4 0 0 1 5.4 15c0-3.1 2.7-5.3 5.8-4.9v2.8c-.4-.1-.8-.2-1.2-.2-1.4 0-2.4 1-2.4 2.3 0 1.4 1.1 2.4 2.5 2.4 1.5 0 2.6-1.1 2.6-2.8V3z" />
              </svg>
            </a>
          </div>
          <div style={{ marginTop: 26 }}>
            <a className="btn btn-solid" href="tel:+358503797490">{t.cta}</a>
          </div>
        </div>
        <div className="map-card reveal">
          <iframe
            title="Roba Deli location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Roba%20Deli,%20Iso%20Roobertinkatu%201,%2000120%20Helsinki&z=16&output=embed"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
