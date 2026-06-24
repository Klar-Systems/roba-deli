import { SMOOTHIES } from "@/lib/data";

export default function Smoothies() {
  return (
    <section className="smoothies" id="smoothies">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Real fruit</span>
          <h2>
            Smoothies, <em>shaken to life</em>
          </h2>
          <div className="rule"></div>
        </div>
        <div className="smoo-grid" id="smooGrid">
          {SMOOTHIES.map((s) => (
            <div className="smoothie" key={s.name}>
              <div className="shot-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="shot" src={s.img} alt={`${s.name} smoothie`} />
              </div>
              <h3>{s.name}</h3>
              <div className="ing">{s.ing}</div>
              <div className="pr">{s.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
