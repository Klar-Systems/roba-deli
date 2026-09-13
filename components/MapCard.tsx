"use client";

import { useState } from "react";

import type { Locale } from "@/lib/i18n";

const SRC =
  "https://www.google.com/maps?q=Roba%20Deli,%20Iso%20Roobertinkatu%201,%2000120%20Helsinki&z=16&output=embed";

const COPY = {
  en: {
    title: "Show the map",
    body: "The map is served by Google, which sets its own cookies as soon as it loads. It stays off until you ask for it.",
    action: "Load the Google map",
    note: "Google's privacy policy applies once it loads.",
    directions: "Or open directions in a new tab",
    frame: "Map of Roba Deli, Iso Roobertinkatu 1, Helsinki",
  },
  fi: {
    title: "Näytä kartta",
    body: "Kartan tarjoaa Google, joka asettaa omat evästeensä heti kun kartta latautuu. Se pysyy pois päältä kunnes pyydät sitä.",
    action: "Lataa Google-kartta",
    note: "Kun kartta latautuu, siihen sovelletaan Googlen tietosuojakäytäntöä.",
    directions: "Tai avaa reittiohjeet uuteen välilehteen",
    frame: "Kartta: Roba Deli, Iso Roobertinkatu 1, Helsinki",
  },
} as const;

/**
 * Google Maps, click-to-load.
 *
 * A Maps iframe sets Google cookies the instant the page paints. Those are not
 * strictly necessary for anything the visitor asked for, so under section 205
 * of the Act on Electronic Communications Services they need prior consent.
 * Loading the map only on a deliberate click IS that consent, and it means the
 * rest of the site needs no cookie banner at all — which is why there isn't one.
 */
export default function MapCard({ locale }: { locale: Locale }) {
  const [loaded, setLoaded] = useState(false);
  const c = COPY[locale];

  if (loaded) {
    return (
      <div className="map-card reveal">
        <iframe
          title={c.frame}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={SRC}
        ></iframe>
      </div>
    );
  }

  return (
    <div className="map-card map-card--off reveal">
      <div className="map-ask">
        <h3>{c.title}</h3>
        <p>{c.body}</p>
        <button type="button" className="btn btn-solid" onClick={() => setLoaded(true)}>
          {c.action}
        </button>
        <p className="map-note">{c.note}</p>
        <a
          href="https://www.google.com/maps/place/?q=place_id:ChIJBzxlKz0LkkYR-cH59jgnhic"
          target="_blank"
          rel="noopener noreferrer"
        >
          {c.directions}
        </a>
      </div>
    </div>
  );
}
