"use client";
import { useEffect, useState } from "react";
import { dict, type Locale } from "@/lib/i18n";

export default function Nav({ locale }: { locale: Locale }) {
  const t = dict[locale].nav;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="wrap">
        <a className="brand" href={locale === "fi" ? "/fi" : "/"} aria-label="Roba Deli">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-mark" src="/images/logo-mark.png" alt="" />
          <span className="wm">
            ROBA<i>·</i>DELI
          </span>
        </a>
        <nav className={"main" + (open ? " open" : "")}>
          <a href="#about" onClick={close}>{t.about}</a>
          <a href="#menu" onClick={close}>{t.menu}</a>
          <a href="#smoothies" onClick={close}>{t.smoothies}</a>
          <a href="#reviews" onClick={close}>{t.reviews}</a>
          <a href="#visit" onClick={close}>{t.visit}</a>
          <span className="langswitch" aria-label="Language">
            <a href="/" className={locale === "en" ? "on" : ""} onClick={close}>EN</a>
            <i>·</i>
            <a href="/fi" className={locale === "fi" ? "on" : ""} onClick={close}>FI</a>
          </span>
          <a className="btn btn-solid" href="tel:+358503797490" onClick={close}>{t.call}</a>
        </nav>
        <button className="burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
