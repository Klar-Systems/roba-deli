import { dict, type Locale } from "@/lib/i18n";

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
