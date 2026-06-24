"use client";
import { useEffect } from "react";

/** Progressive-enhancement effects: scroll reveals + staggered smoothie twirl-in. */
export default function ScrollFX() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.18 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    let sio: IntersectionObserver | undefined;
    const grid = document.getElementById("smooGrid");
    if (grid) {
      sio = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              document.querySelectorAll<HTMLElement>(".smoothie").forEach((s, i) => {
                const shot = s.querySelector<HTMLElement>(".shot");
                const wrap = s.querySelector<HTMLElement>(".shot-wrap");
                if (shot) shot.style.animationDelay = `${i * 0.12}s`;
                if (wrap) wrap.style.animationDelay = `${0.6 + i * 0.12}s`;
                s.classList.add("in");
              });
              sio?.disconnect();
            }
          }),
        { threshold: 0.3 }
      );
      sio.observe(grid);
    }

    return () => {
      io.disconnect();
      sio?.disconnect();
    };
  }, []);

  return null;
}
