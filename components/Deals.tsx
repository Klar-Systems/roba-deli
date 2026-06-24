import { DEALS } from "@/lib/data";

export default function Deals() {
  return (
    <section className="deals" id="deals">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Every day</span>
          <h2>
            Deals worth the <em>walk</em>
          </h2>
          <div className="rule"></div>
        </div>
        <div className="grid">
          {DEALS.map((d) => (
            <div className="deal reveal" key={d.k}>
              <div className="k">{d.k}</div>
              <div className="price">{d.price}</div>
              <div className="d">{d.d}</div>
              {d.note ? <div className="note">{d.note}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
