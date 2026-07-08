import { DEALS } from "@/lib/data";
import { dict, type Locale } from "@/lib/i18n";

export default function Deals({ locale }: { locale: Locale }) {
  const t = dict[locale].deals;
  const fi = locale === "fi";
  return (
    <section className="deals" id="deals">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>
            {t.titlePre}<em>{t.titleEm}</em>
          </h2>
          <div className="rule"></div>
        </div>
        <div className="grid">
          {DEALS.map((d) => (
            <div className="deal reveal" key={d.k}>
              <div className="k">{fi ? d.kFi : d.k}</div>
              <div className="price">{d.price}</div>
              <div className="d">{fi ? d.dFi : d.d}</div>
              {d.note ? <div className="note">{fi ? d.noteFi : d.note}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
