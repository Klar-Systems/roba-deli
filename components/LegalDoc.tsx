import Link from "next/link";

import { COMPANY, LEGAL_LINKS, type LegalDocument } from "@/lib/legal";
import type { Locale } from "@/lib/i18n";

/**
 * One legal page: privacy, cookies, terms or refunds.
 *
 * Deliberately plain — a legal page is read, not scrolled past, so it gets a
 * single measure of text, real headings, and no reveal animations that would
 * hide the content from anyone the animation fails for.
 */
export default function LegalDoc({
  doc,
  locale,
}: {
  doc: LegalDocument;
  locale: Locale;
}) {
  const home = locale === "fi" ? "/fi" : "/";
  const back = locale === "fi" ? "Takaisin etusivulle" : "Back to the site";
  const updatedLabel = locale === "fi" ? "Päivitetty" : "Last updated";

  return (
    <div className="legal">
      <header className="legal-top">
        <div className="legal-wrap">
          <Link href={home} className="legal-back">
            <span aria-hidden="true">←</span> {back}
          </Link>
        </div>
      </header>

      <main id="main" className="legal-wrap legal-body">
        <h1>{doc.title}</h1>
        <p className="legal-updated">
          {updatedLabel}: <time dateTime="2026-09-08">{doc.updated}</time>
        </p>
        <p className="legal-intro">{doc.intro}</p>

        {doc.sections.map((section) => (
          <section key={section.h}>
            <h2>{section.h}</h2>
            {section.p.map((para) => (
              // The only HTML in these strings is <b> for the lead-in of a
              // paragraph, written by us in lib/legal.ts — never user input.
              <p key={para.slice(0, 48)} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </section>
        ))}

        <section className="legal-company">
          <h2>{locale === "fi" ? "Yritystiedot" : "Business details"}</h2>
          <dl>
            <dt>{locale === "fi" ? "Yritys" : "Company"}</dt>
            <dd>{COMPANY.legalName}</dd>
            <dt>{locale === "fi" ? "Aputoiminimi" : "Trading as"}</dt>
            <dd>{COMPANY.tradingName}</dd>
            <dt>{locale === "fi" ? "Y-tunnus" : "Business ID"}</dt>
            <dd>{COMPANY.businessId}</dd>
            <dt>{locale === "fi" ? "ALV-numero" : "VAT number"}</dt>
            <dd>{COMPANY.vat}</dd>
            <dt>{locale === "fi" ? "Osoite" : "Address"}</dt>
            <dd>{COMPANY.address}</dd>
            <dt>{locale === "fi" ? "Puhelin" : "Phone"}</dt>
            <dd>
              <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>{COMPANY.phoneDisplay}</a>
            </dd>
            <dt>{locale === "fi" ? "Sähköposti" : "Email"}</dt>
            <dd>{COMPANY.email}</dd>
          </dl>
        </section>

        <nav className="legal-nav" aria-label={locale === "fi" ? "Ehdot ja tietosuoja" : "Legal pages"}>
          {LEGAL_LINKS[locale].map((link) => (
            <Link key={link.href} href={link.href} aria-current={link.href.endsWith(doc.slug) ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
