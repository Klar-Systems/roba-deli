"use client";

import Script from "next/script";

import { type Locale } from "@/lib/i18n";

/**
 * Takeaway ordering, served by Klar's booking API and mounted into this site.
 *
 * The site is not replaced by anything — this is one div and one script, per
 * docs/execution/klar-embed-recipe.md in klar-console. `public/klar-embed.js`
 * is a COPY of that file on purpose: this repo is separate from the monorepo
 * and must not import from it. Refresh the copy when the embed changes rather
 * than hand-editing it here.
 *
 * `surfaces="order"` and no book slug: Roba Deli takes no table reservations,
 * so asking the embed for a booking surface would render a picker for
 * something the restaurant does not do.
 *
 * The embed fails closed. If the API is unreachable, or this site's origin is
 * not yet on the ordering allowlist, it renders its unavailable panel with the
 * phone number below rather than an empty box — so the worst case is the same
 * "call and order" the site offered before.
 */
export default function KlarOrder({ locale }: { locale: Locale }) {
  return (
    <section id="order" aria-labelledby="order-heading">
      <h2 id="order-heading">
        {locale === "fi" ? "Tilaa noudettavaksi" : "Order for pickup"}
      </h2>
      <div
        data-klar-order-slug="roba-deli"
        data-klar-surfaces="order"
        data-klar-phone="+358 50 379 7490"
        data-klar-locale={locale}
      />
      <Script src="/klar-embed.js" strategy="afterInteractive" />
    </section>
  );
}
