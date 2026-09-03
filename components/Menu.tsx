"use client";
import { useCallback, useEffect, useState } from "react";
import { MENU, type MenuItem } from "@/lib/data";
import { dict, type Locale } from "@/lib/i18n";

/**
 * The menu, and the place an order is built.
 *
 * There is exactly ONE menu on this page. The Klar embed runs in host-menu mode
 * (`data-klar-menu="host"` in KlarOrder), so it contributes the cart and the
 * checkout and renders no list of its own — these rows, in this site's own
 * design, are what the guest orders from.
 *
 * Rows are matched to the database by exact item name: a row with `price12`
 * resolves to "<name> (S)" and "<name> (L)", every other row to
 * `orderName ?? name`. A row that does not resolve keeps its price and simply
 * grows no button, and the console names it — the failure is visible on the
 * page rather than an order for the wrong dish.
 *
 * No price here is ever sent anywhere. The button carries a menu-item id; the
 * server prices the order from the database.
 */

type ApiItem = { id: string; name: string; priceCents: number; available?: boolean };
type Portion = { label: string; apiName: string };

function portions(item: MenuItem, addLabel: string): Portion[] {
  if (item.price12) {
    return [
      /* The "+" is load-bearing: a bare "L" is the same glyph, size and box as
         the lactose-free flag two columns to the left, so it read as a badge and
         nobody pressed it. */
      { label: "+ S", apiName: `${item.name} (S)` },
      { label: "+ L", apiName: `${item.name} (L)` },
    ];
  }
  return [{ label: addLabel, apiName: item.orderName ?? item.name }];
}

export default function Menu({ locale }: { locale: Locale }) {
  const t = dict[locale].menu;
  const fi = locale === "fi";
  const [active, setActive] = useState(0);
  /* null = the ordering menu has not landed yet, so no row shows a button. */
  const [byName, setByName] = useState<Record<string, ApiItem> | null>(null);
  const [qty, setQty] = useState<Record<string, number>>({});

  useEffect(() => {
    function onMenu(event: Event) {
      const detail = (event as CustomEvent).detail;
      const map: Record<string, ApiItem> = {};
      for (const category of detail?.categories ?? []) {
        for (const item of category.items ?? []) map[item.name] = item;
      }
      setByName(map);

      /* Report the drift once, when the menu lands — not on every render. */
      const missing: string[] = [];
      for (const category of MENU) {
        for (const item of category.items) {
          for (const portion of portions(item, t.add)) {
            if (!map[portion.apiName]) missing.push(portion.apiName);
          }
        }
      }
      if (missing.length > 0) {
        console.error(
          "[roba-deli] not orderable — these rows are on the site but not on the Klar menu, " +
            "so they show no button: " +
            missing.join(", ")
        );
      }
    }

    /* The ordering API is dark. Every button disappears and the embed shows its
       own "call us" panel — the page falls back to what it was before. */
    function onFailed() {
      setByName({});
      setQty({});
    }

    function onCart(event: Event) {
      const detail = (event as CustomEvent).detail;
      const next: Record<string, number> = {};
      for (const line of detail?.lines ?? []) next[line.id] = line.qty;
      setQty(next);
    }

    document.addEventListener("klar:menu", onMenu);
    document.addEventListener("klar:menu-failed", onFailed);
    document.addEventListener("klar:cart", onCart);
    /* Covers the other side of the race: if the embed already loaded the menu
       before this component mounted, ask it to say so again. */
    document.dispatchEvent(new CustomEvent("klar:sync"));
    return () => {
      document.removeEventListener("klar:menu", onMenu);
      document.removeEventListener("klar:menu-failed", onFailed);
      document.removeEventListener("klar:cart", onCart);
    };
  }, [t.add]);

  const add = useCallback((id: string) => {
    const mount = document.querySelector<HTMLElement>("[data-klar-order-slug]");
    if (!mount) {
      console.error("[roba-deli] no Klar order mount on the page — nothing to add to.");
      return;
    }
    mount.dispatchEvent(new CustomEvent("klar:add", { detail: { id, qty: 1 } }));
  }, []);

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
                const buttons = byName
                  ? portions(it, t.add)
                      .map((p) => ({ portion: p, api: byName[p.apiName] }))
                      .filter((b): b is { portion: Portion; api: ApiItem } => Boolean(b.api))
                  : [];
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
                    <div className="side">
                      <div className="price">
                        {it.price12 ? `S ${it.price}` : it.price}
                        {it.price12 ? <small>L {it.price12}</small> : null}
                      </div>
                      {buttons.length > 0 ? (
                        <div className="adds">
                          {buttons.map(({ portion, api }) => {
                            const n = qty[api.id] ?? 0;
                            return (
                              <button
                                key={portion.apiName}
                                type="button"
                                className={n > 0 ? "add on" : "add"}
                                onClick={() => add(api.id)}
                                aria-label={`${t.add} ${api.name}`}
                              >
                                {portion.label}
                                {n > 0 ? ` · ${n}` : ""}
                              </button>
                            );
                          })}
                        </div>
                      ) : null}
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
