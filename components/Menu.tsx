"use client";
import { useState } from "react";
import { MENU } from "@/lib/data";

export default function Menu() {
  const [active, setActive] = useState(0);
  const cat = MENU[active];

  return (
    <section className="menu" id="menu">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">The menu</span>
          <h2>
            Handcrafted, <em>made to order</em>
          </h2>
          <div className="rule"></div>
        </div>

        <div className="tabs reveal">
          {MENU.map((c, i) => (
            <button key={c.name} className={i === active ? "on" : ""} onClick={() => setActive(i)}>
              {c.name}
            </button>
          ))}
        </div>

        <div className="reveal">
          <div className="items">
            {cat.items.map((it) => (
              <div className="item" key={it.name}>
                <div className="main">
                  <h3>
                    {it.name} {it.flag ? <span className="flag">{it.flag}</span> : null}
                  </h3>
                  {it.desc ? <p>{it.desc}</p> : null}
                </div>
                <div className="price">
                  {it.price}
                  {it.price2 ? <small>{it.price2}</small> : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="legend">
          <b>L</b> Lactose-free &nbsp;·&nbsp; <b>G</b> Gluten-free &nbsp;·&nbsp; <b>LG</b> both &nbsp;·&nbsp; Subs
          available 6&quot; / 12&quot;
        </p>
      </div>
    </section>
  );
}
