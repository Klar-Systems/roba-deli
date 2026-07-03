export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-scrape-real.webp"
          alt="Raclette cheese scraped molten over a Roba Deli pastrami sandwich"
          fetchPriority="high"
        />
      </div>
      <div className="hero-veil"></div>
      <div className="hero-content">
        <span className="eyebrow">Iso Roobertinkatu · Helsinki</span>
        <h1>
          Handcrafted<br />sandwiches<em>salads &amp; provisions</em>
        </h1>
        <p>
          Helsinki&apos;s newest deli on Iso Roobertinkatu. Hot, fresh, cheesy — made to order, from lunch to late
          night.
        </p>
        <div className="hero-cta">
          <a className="btn btn-solid" href="#menu">See the menu</a>
          <a className="btn btn-ghost" href="#visit">Visit us</a>
        </div>
      </div>
    </section>
  );
}
