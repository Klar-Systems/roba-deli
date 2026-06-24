import { REVIEWS } from "@/lib/data";

export default function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="wrap">
        <div className="stars-top reveal">
          <div className="big">5.0</div>
          <div className="st">★★★★★</div>
          <div className="sub">24 reviews on Google</div>
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
