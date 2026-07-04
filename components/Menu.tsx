"use client";
import { useState } from "react";
import { MENU } from "@/lib/data";

export default function Menu() {
  const [active, setActive] = useState(0);

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
          {MENU.map((c, i) => (
            <div className="items" key={c.name} hidden={i !== active}>
              {c.items.map((it) => (
                <div className="item" key={it.name}>
                  <div className="main">
                    <h3>
                      {it.name}{" "}
                      {it.fav ? <span className="fav">★ Favorite</span> : null}
                      {it.diet ? <span className="flag">{it.diet}</span> : null}
                      {it.badge ? <span className="flag">{it.badge}</span> : null}
                    </h3>
                    {it.desc ? <p>{it.desc}</p> : null}
                  </div>
                  <div className="price">
                    {it.price12 ? `S ${it.price}` : it.price}
                    {it.price12 ? <small>L {it.price12}</small> : null}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="legend">
          <b>L</b> Lactose-free &nbsp;·&nbsp; <b>G</b> Gluten-free &nbsp;·&nbsp; <b>LG</b> both &nbsp;·&nbsp; Subs
          available in <b>S</b> / <b>L</b>
        </p>
      </div>
    </section>
  );
}
