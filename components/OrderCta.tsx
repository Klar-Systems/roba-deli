"use client";
import { useEffect, useState } from "react";

/**
 * A call-to-action that only says "order online" once ordering really answers.
 *
 * The site is static and the ordering API is not: a button hard-coded to
 * "Order online" would still say it on a day the menu call fails, sending a
 * guest to a #menu with no + Add buttons on it (Menu.tsx renders those only
 * after `klar:menu`). So this listens to the same two events Menu.tsx does and
 * carries the phone fallback the page had before ordering existed — the worst
 * case stays "call and order", which is what the deli did for months.
 *
 * Unknown is treated as dark on purpose. The first paint is prerendered, before
 * the embed has spoken, and promising ordering in that frame would be a guess.
 */
export function useOrderingLive(): boolean {
  const [live, setLive] = useState(false);

  useEffect(() => {
    const onMenu = (event: Event) => {
      const detail = (event as CustomEvent).detail as
        | { ordering?: { open?: boolean }; categories?: { items?: unknown[] }[] }
        | null;
      /* Read exactly what Menu.tsx reads, so the button and the buttons on the
         dishes can never disagree: a closed day, or a menu with nothing on it,
         is not ordering. */
      if (detail?.ordering && detail.ordering.open === false) {
        setLive(false);
        return;
      }
      let items = 0;
      for (const category of detail?.categories ?? []) items += (category.items ?? []).length;
      setLive(items > 0);
    };
    const onFailed = () => setLive(false);
    document.addEventListener("klar:menu", onMenu);
    document.addEventListener("klar:menu-failed", onFailed);
    return () => {
      document.removeEventListener("klar:menu", onMenu);
      document.removeEventListener("klar:menu-failed", onFailed);
    };
  }, []);

  return live;
}

export default function OrderCta({
  className,
  orderLabel,
  fallbackLabel,
  fallbackHref = "tel:+358503797490",
  orderHref = "#menu",
  onClick,
}: {
  className: string;
  orderLabel: string;
  fallbackLabel: string;
  fallbackHref?: string;
  orderHref?: string;
  onClick?: () => void;
}) {
  const live = useOrderingLive();
  return (
    <a className={className} href={live ? orderHref : fallbackHref} onClick={onClick}>
      {live ? orderLabel : fallbackLabel}
    </a>
  );
}
