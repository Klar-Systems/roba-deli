import { dict, type Locale } from "@/lib/i18n";

/**
 * Reverted 2026-09-08 to its pre-legal-pass appearance on the operator's
 * instruction: the Trustpilot mark is back, and the company-details block and
 * the row of legal links are gone, so the footer looks exactly as it did.
 *
 * Two consequences worth knowing rather than rediscovering:
 *
 *  - The four legal pages (/privacy /cookies /terms /refunds and the Finnish
 *    equivalents) still exist and still build. Nothing on the site links to
 *    them now, so a visitor reaches them only from the sitemap or a search
 *    result. kuluttajansuojalaki 6:9 expects the trader's identity and business
 *    ID to be findable before a consumer orders; a footer link is the usual way.
 *  - The Trustpilot image has no link behind it and no Trustpilot profile for
 *    Roba Deli appears anywhere in this repo.
 */
export default function Footer({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <footer className="f">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-full" src="/images/logo.png" alt="Roba Deli" />
      <div className="tg">{t.footer.tagline}</div>
      <div className="trust">
        <a
          href="https://www.tripadvisor.com/Restaurant_Review-g189934-d34509442-Reviews-Roba_Deli-Helsinki_Uusimaa.html"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Roba Deli on Tripadvisor"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/tripadvisor.svg" alt="Tripadvisor" />
        </a>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/trustpilot.svg" alt="Trustpilot" />
      </div>
      <div className="fl">
        <a href="#about">{t.nav.about}</a>
        <a href="#menu">{t.nav.menu}</a>
        <a href="#smoothies">{t.nav.smoothies}</a>
        <a href="#reviews">{t.nav.reviews}</a>
        <a href="#visit">{t.nav.visit}</a>
        <a href="https://www.instagram.com/roba.deli/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.tiktok.com/@robadeli" target="_blank" rel="noopener noreferrer">TikTok</a>
      </div>
      <div className="cc">
        Iso Roobertinkatu 1, 00120 Helsinki · <a href="tel:+358503797490">050 379 7490</a> · © Roba Deli
      </div>
    </footer>
  );
}
