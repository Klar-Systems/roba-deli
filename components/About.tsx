export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap grid">
        <div className="media reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/about-sub.webp" alt="Roba Deli handcrafted sub wrapped in deli paper" loading="lazy" decoding="async" />
          <span className="tag">Made to order on Iso Roobertinkatu</span>
        </div>
        <div className="reveal">
          <span className="eyebrow">The deli</span>
          <h2>
            An authentic <em>New York deli</em> on Iso Roobertinkatu
          </h2>
          <p>
            Roba Deli is Helsinki&apos;s newest sandwich deli — handcrafted sandwiches, salads &amp; provisions built to
            order at the counter, never pre-wrapped. Real raclette scraped molten over slow-cooked brisket. Fresh-baked
            craft brioche and sourdough focaccia. Gravlax, halloumi, a proper Philly.
          </p>
          <ul className="proof">
            <li>Raclette &amp; cheese melted over the sandwich, to order.</li>
            <li>Fresh-baked rolls — craft brioche &amp; sourdough focaccia.</li>
            <li>Real-fruit smoothies &amp; a fresh-ingredient bar.</li>
            <li>⭐ 5.0 on Google — a guest literally wrote “100% better than Subway.”</li>
          </ul>
          <a className="btn" href="#menu">Explore the menu</a>
        </div>
      </div>
    </section>
  );
}
