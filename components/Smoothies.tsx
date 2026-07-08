import { SMOOTHIES } from "@/lib/data";
import { dict, type Locale } from "@/lib/i18n";

export default function Smoothies({ locale }: { locale: Locale }) {
  const t = dict[locale].smoothies;
  const fi = locale === "fi";
  return (
    <section className="smoothies" id="smoothies">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>
            {t.titlePre}<em>{t.titleEm}</em>
          </h2>
          <div className="rule"></div>
        </div>
        <div className="smoo-grid" id="smooGrid">
          {SMOOTHIES.map((s) => (
            <div className="smoothie" key={s.name}>
              <div className="shot-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="shot" src={s.img} alt={`${s.name} smoothie`} loading="lazy" decoding="async" />
              </div>
              <h3>{s.name}</h3>
              <div className="ing">{fi ? s.ingFi : s.ing}</div>
              <div className="pr">{s.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
