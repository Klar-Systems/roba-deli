import { dict, type Locale } from "@/lib/i18n";
import OivaBadge from "@/components/OivaBadge";

/**
 * The legal links are back — one row, nothing else moves. They were reverted
 * on 2026-09-08 ("no visible change") while the site took no orders; on
 * 2026-09-13 the operator ruled that online ordering goes live WITH the legal
 * pages, and a page nobody links to is not published. kuluttajansuojalaki 6:9
 * expects the trader's identity and business ID to be findable before a
 * consumer orders; the footer row is the usual way, and the order form links
 * the privacy notice itself (`data-klar-privacy-url` on the embed mount).
 *
 * Still true: the Trustpilot image has no link behind it and no Trustpilot
 * profile for Roba Deli appears anywhere in this repo.
 */
const LEGAL_LINKS: Record<Locale, Array<{ href: string; label: string }>> = {
  fi: [
    { href: "/fi/tietosuoja", label: "Tietosuoja" },
    { href: "/fi/ehdot", label: "Käyttöehdot" },
    { href: "/fi/palautukset", label: "Peruutukset" },
    { href: "/fi/evasteet", label: "Evästeet" },
  ],
  en: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/refunds", label: "Refunds" },
    { href: "/cookies", label: "Cookies" },
  ],
};

export default function Footer({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const legal = LEGAL_LINKS[locale] ?? LEGAL_LINKS.en;
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
        <OivaBadge locale={locale} />
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
      <div className="fl">
        {legal.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
      <div className="cc">
        Iso Roobertinkatu 1, 00120 Helsinki · <a href="tel:+358503797490">050 379 7490</a> · © Roba Deli · SubHub Oy · Y-tunnus 3611281-3
      </div>
    </footer>
  );
}
