export default function Footer() {
  return (
    <footer className="f">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-full" src="/images/logo.png" alt="Roba Deli" />
      <div className="tg">Handcrafted sandwiches, salads &amp; provisions</div>
      <div className="fl">
        <a href="#about">About</a>
        <a href="#menu">Menu</a>
        <a href="#smoothies">Smoothies</a>
        <a href="#reviews">Reviews</a>
        <a href="#visit">Visit</a>
        <a href="https://www.instagram.com/roba.deli/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.tiktok.com/@robadeli" target="_blank" rel="noopener noreferrer">TikTok</a>
      </div>
      <div className="cc">
        Iso Roobertinkatu 1, 00120 Helsinki · <a href="tel:+358503797490">050 379 7490</a> · © Roba Deli
      </div>
    </footer>
  );
}
