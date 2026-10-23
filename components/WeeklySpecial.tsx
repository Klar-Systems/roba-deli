import { Fragment } from "react";
import { SPECIAL } from "@/lib/data";
import { type Locale } from "@/lib/i18n";

export default function WeeklySpecial({ locale }: { locale: Locale }) {
  const fi = locale === "fi";
  const s = SPECIAL;
  return (
    <div className="special reveal" id="weekly-special">
      <div className="photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.img} alt={fi ? s.altFi : s.alt} width={910} height={609} loading="lazy" decoding="async" />
      </div>
      <div className="body">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="logo" src="/images/weekly-special.webp" alt={fi ? "Viikon erikoinen" : "Weekly Special"} width={582} height={136} loading="lazy" decoding="async" />
        <h3>{s.name}</h3>
        <p className="ing">
          {(fi ? s.ingFi : s.ing).map((x, i) => (
            <Fragment key={x}>
              {i > 0 ? <i aria-hidden="true"> • </i> : null}
              <span>{x}</span>
            </Fragment>
          ))}
        </p>
        <div className="price">
          {s.price}
          <small>{fi ? s.withFi : s.with}</small>
        </div>
      </div>
    </div>
  );
}
