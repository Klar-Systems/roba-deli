"use client";
import { useEffect, useState } from "react";

export default function Nav() {
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
        <a className="brand" href="#top" aria-label="Roba Deli">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-mark" src="/images/logo-mark.png" alt="" />
          <span className="wm">
            ROBA<i>·</i>DELI
          </span>
        </a>
        <nav className={"main" + (open ? " open" : "")}>
          <a href="#about" onClick={close}>About</a>
          <a href="#menu" onClick={close}>Menu</a>
          <a href="#smoothies" onClick={close}>Smoothies</a>
          <a href="#reviews" onClick={close}>Reviews</a>
          <a href="#visit" onClick={close}>Visit</a>
          <a className="btn btn-solid" href="tel:+358503797490" onClick={close}>Call to order</a>
        </nav>
        <button className="burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
