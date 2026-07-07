import { REVIEWS } from "@/lib/data";

export default function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="wrap">
        <div className="stars-top reveal">
          <span className="eyebrow">Kind words</span>
          <h2>What guests <em>say</em></h2>
        </div>
        <div className="rev-grid">
          {REVIEWS.map((r) => (
            <div className="rev reveal" key={r.who}>
              <div className="st">★★★★★</div>
              <p>“{r.text}”</p>
              <div className="who">
                {r.who} <span>· Google</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
