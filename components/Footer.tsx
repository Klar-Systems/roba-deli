import Link from "next/link";

import { dict, type Locale } from "@/lib/i18n";
import { COMPANY, LEGAL_LINKS } from "@/lib/legal";

export default function Footer({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const year = new Date().getFullYear();

  return (
    <footer className="f">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-full" src="/images/logo.png" alt="Roba Deli" />
      <div className="tg">{t.footer.tagline}</div>

      {/*
        The Trustpilot badge that used to sit here has been removed. It was an
        <img> with no link behind it, and no Trustpilot profile for Roba Deli
        appears anywhere in this repo. A trust mark for a platform the business
        is not on is a misleading commercial practice, not decoration.
        The Tripadvisor mark stays because it links to the deli's real listing.
      */}
      <div className="trust">
        <a
          href="https://www.tripadvisor.com/Restaurant_Review-g189934-d34509442-Reviews-Roba_Deli-Helsinki_Uusimaa.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/tripadvisor.svg" alt="" width={110} height={28} />
          <span>{locale === "fi" ? "Roba Deli Tripadvisorissa" : "Roba Deli on Tripadvisor"}</span>
        </a>
      </div>

      <nav className="fl" aria-label={locale === "fi" ? "Sivuston osiot" : "Site sections"}>
        <a href="#about">{t.nav.about}</a>
        <a href="#menu">{t.nav.menu}</a>
        <a href="#smoothies">{t.nav.smoothies}</a>
        <a href="#reviews">{t.nav.reviews}</a>
        <a href="#visit">{t.nav.visit}</a>
        <a href="https://www.instagram.com/roba.deli/" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://www.tiktok.com/@robadeli" target="_blank" rel="noopener noreferrer">
          TikTok
        </a>
      </nav>

      <nav className="fl fl-legal" aria-label={locale === "fi" ? "Ehdot ja tietosuoja" : "Legal"}>
        {LEGAL_LINKS[locale].map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      {/*
        Consumer law (kuluttajansuojalaki 6:9) requires the trader's identity,
        business ID and address to be available before a consumer places an
        order. COMPANY.legalName and COMPANY.businessId still carry visible
        {{TODO}} markers — that is deliberate, so the gap cannot ship unnoticed.
      */}
      <address className="cc">
        {COMPANY.legalName} · {locale === "fi" ? "Y-tunnus" : "Business ID"} {COMPANY.businessId}
        <br />
        {COMPANY.address} · <a href="tel:+358503797490">{COMPANY.phoneDisplay}</a>
        <br />© {year} {COMPANY.tradingName}
      </address>
    </footer>
  );
}
