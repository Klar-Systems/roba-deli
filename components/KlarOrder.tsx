"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

import { dict, type Locale } from "@/lib/i18n";

/**
 * Takeaway ordering, served by Klar's booking API and mounted into this site.
 *
 * The site is not replaced by anything — this is one div and one script, per
 * docs/execution/klar-embed-recipe.md in klar-console. `public/klar-embed.js`
 * is a COPY of that file on purpose: this repo is separate from the monorepo
 * and must not import from it. Refresh the copy when the embed changes rather
 * than hand-editing it here.
 *
 * `data-klar-menu="host"`: this site already has a designed menu, and a page
 * that printed the ruokalista twice was the reason this mode exists. The embed
 * renders the CART and the CHECKOUT only; the menu rows in components/Menu.tsx
 * do the adding, over the embed's klar:add event.
 *
 * `surfaces="order"` and no book slug: Roba Deli takes no table reservations,
 * so asking the embed for a booking surface would render a picker for
 * something the restaurant does not do.
 *
 * The embed fails closed. If the API is unreachable, or this site's origin is
 * not yet on the ordering allowlist, it renders its unavailable panel with the
 * phone number below rather than an empty box — and the menu drops its order
 * buttons — so the worst case is the same "call and order" the site offered
 * before.
 */
export default function KlarOrder({ locale }: { locale: Locale }) {
  const t = dict[locale].menu;
  const [bar, setBar] = useState<{ count: number; total: string } | null>(null);

  useEffect(() => {
    function onCart(event: Event) {
      const detail = (event as CustomEvent).detail;
      const count: number = detail?.count ?? 0;
      if (count <= 0) {
        setBar(null);
        return;
      }
      const cents: number = detail?.totalCents ?? 0;
      setBar({ count, total: `${(cents / 100).toFixed(2).replace(".", ",")} €` });
    }
    function onFailed() {
      setBar(null);
    }
    document.addEventListener("klar:cart", onCart);
    document.addEventListener("klar:menu-failed", onFailed);
    return () => {
      document.removeEventListener("klar:cart", onCart);
      document.removeEventListener("klar:menu-failed", onFailed);
    };
  }, []);

  return (
    <>
      <section className="order" id="order" aria-labelledby="order-heading">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">{t.orderEyebrow}</span>
            <h2 id="order-heading">
              {t.orderTitlePre}<em>{t.orderTitleEm}</em>
            </h2>
            <div className="rule"></div>
            <p>{t.orderHint}</p>
          </div>
          <div
            className="order-panel reveal"
            data-klar-order-slug="roba-deli"
            data-klar-surfaces="order"
            data-klar-menu="host"
            data-klar-phone="+358 50 379 7490"
            data-klar-locale={locale}
          />
        </div>
      </section>

      {/* The menu is tall and tabbed, so an add near the top would otherwise
          give no sign that anything happened. */}
      {bar ? (
        <a className="cart-bar" href="#order">
          <span className="cart-bar-count">{bar.count}</span>
          <span className="cart-bar-label">{t.barItems}</span>
          <span className="cart-bar-total">{bar.total}</span>
          <span className="cart-bar-go">{t.barGo}</span>
        </a>
      ) : null}

      <Script src="/klar-embed.js" strategy="afterInteractive" />
    </>
  );
}
