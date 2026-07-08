"use client";
import { useState } from "react";
import { MENU } from "@/lib/data";
import { dict, type Locale } from "@/lib/i18n";

export default function Menu({ locale }: { locale: Locale }) {
  const t = dict[locale].menu;
  const fi = locale === "fi";
  const [active, setActive] = useState(0);

  return (
    <section className="menu" id="menu">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>
            {t.titlePre}<em>{t.titleEm}</em>
          </h2>
          <div className="rule"></div>
        </div>

        <div className="tabs reveal">
          {MENU.map((c, i) => (
            <button key={c.name} className={i === active ? "on" : ""} onClick={() => setActive(i)}>
              {fi ? c.nameFi : c.name}
            </button>
          ))}
        </div>

        <div className="reveal">
          {MENU.map((c, i) => (
            <div className="items" key={c.name} hidden={i !== active}>
              {c.items.map((it) => {
                const desc = fi ? it.descFi ?? it.desc : it.desc;
                const badge = fi ? it.badgeFi ?? it.badge : it.badge;
                return (
                  <div className="item" key={it.name}>
                    <div className="main">
                      <h3>
                        {it.name}{" "}
                        {it.fav ? <span className="fav">{t.fav}</span> : null}
                        {it.diet ? <span className="flag">{it.diet}</span> : null}
                        {badge ? <span className="flag">{badge}</span> : null}
                      </h3>
                      {desc ? <p>{desc}</p> : null}
                    </div>
                    <div className="price">
                      {it.price12 ? `S ${it.price}` : it.price}
                      {it.price12 ? <small>L {it.price12}</small> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <p className="legend">
          <b>L</b> {t.legendL} &nbsp;·&nbsp; <b>G</b> {t.legendG} &nbsp;·&nbsp; <b>LG</b> {t.legendLG} &nbsp;·&nbsp;{" "}
          {t.legendSubs}
        </p>
      </div>
    </section>
  );
}
