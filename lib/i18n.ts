// Roba Deli UI copy — English + Finnish. Chrome strings only; menu/deals/smoothie
// content lives in lib/data.ts (with Finnish fields). Dish names stay English by design.

export type Locale = "en" | "fi";

export const dict = {
  en: {
    topbar: {
      addr: "Iso Roobertinkatu 1, Helsinki",
      openPre: "Open",
      openBold: "7 days",
      openPost: "· lunch to late night",
      call: "Call · 050 379 7490",
    },
    nav: {
      about: "About",
      menu: "Menu",
      smoothies: "Smoothies",
      reviews: "Reviews",
      visit: "Visit",
      call: "Call to order",
    },
    hero: {
      eyebrow: "Iso Roobertinkatu · Helsinki",
      title1: "Handcrafted",
      title2: "sandwiches",
      titleEm: "salads & provisions",
      intro:
        "Helsinki's newest deli on Iso Roobertinkatu. Hot, fresh, cheesy — made to order, from lunch to late night.",
      cta1: "See the menu",
      cta2: "Visit us",
    },
    about: {
      mediaTag: "Made to order on Iso Roobertinkatu",
      eyebrow: "The deli",
      titlePre: "An authentic ",
      titleEm: "New York deli",
      titlePost: " on Iso Roobertinkatu",
      body:
        "Roba Deli is Helsinki's newest sandwich deli — handcrafted sandwiches, salads & provisions built to order at the counter, never pre-wrapped. Real raclette scraped molten over slow-cooked brisket. Fresh-baked craft brioche and sourdough focaccia. Gravlax, halloumi, a proper Philly.",
      proof: [
        "Raclette & cheese melted over the sandwich, to order.",
        "Fresh-baked rolls — craft brioche & sourdough focaccia.",
        "Real-fruit smoothies & a fresh-ingredient bar.",
        "⭐ 5.0 on Google — a guest literally wrote “100% better than Subway.”",
      ],
      cta: "Explore the menu",
    },
    craft: {
      eyebrow: "Why Roba",
      titlePre: "Built to ",
      titleEm: "order",
      items: [
        { title: "Fresh-baked rolls", body: "Craft brioche & sourdough focaccia, baked for the bite." },
        { title: "Raclette, melted live", body: "Real cheese scraped molten over the top, to order." },
        { title: "Real ingredients", body: "Brisket, gravlax, halloumi — a fresh-ingredient bar." },
        { title: "Lunch to late", body: "Your spot from lunch to late night — weekends till 04:30." },
      ],
    },
    deals: {
      eyebrow: "Every day",
      titlePre: "Deals worth the ",
      titleEm: "walk",
    },
    menu: {
      eyebrow: "The menu",
      titlePre: "Handcrafted, ",
      titleEm: "made to order",
      legendL: "Lactose-free",
      legendG: "Gluten-free",
      legendLG: "both",
      legendSubs: 'Subs available 6" / 12"',
    },
    smoothies: {
      eyebrow: "Real fruit",
      titlePre: "Smoothies, ",
      titleEm: "shaken to life",
    },
    reviews: {
      sub: "24 reviews on Google",
      source: "· Google",
    },
    visit: {
      eyebrow: "Find us",
      titlePre: "Visit ",
      titleEm: "Roba Deli",
      labelAddress: "Address",
      labelPhone: "Phone",
      labelHours: "Hours",
      labelRating: "Rating",
      hours: ["Mon–Thu 10:30–23:00", "Fri 11:00–04:30", "Sat 11:30–04:30", "Sun 11:30–23:00"],
      lunchDeal: "Lunch deal 10:30–15:00",
      rating: "5.0 · 24 reviews",
      pills: ["Dine-in", "Takeaway", "Delivery"],
      cta: "Call to order · 050 379 7490",
    },
    footer: {
      tagline: "Handcrafted sandwiches, salads & provisions",
    },
  },

  fi: {
    topbar: {
      addr: "Iso Roobertinkatu 1, Helsinki",
      openPre: "Auki",
      openBold: "7 päivää",
      openPost: "· lounaasta myöhään iltaan",
      call: "Soita · 050 379 7490",
    },
    nav: {
      about: "Meistä",
      menu: "Ruokalista",
      smoothies: "Smoothiet",
      reviews: "Arvostelut",
      visit: "Vieraile",
      call: "Soita ja tilaa",
    },
    hero: {
      eyebrow: "Iso Roobertinkatu · Helsinki",
      title1: "Käsintehdyt",
      title2: "voileivät",
      titleEm: "salaatit & herkut",
      intro:
        "Helsingin uusin deli Iso Roobertinkadulla. Kuumia, tuoreita, juustoisia — valmistetaan tilauksesta, lounaasta myöhään iltaan.",
      cta1: "Katso ruokalista",
      cta2: "Vieraile luonamme",
    },
    about: {
      mediaTag: "Valmistettu tilauksesta Iso Roobertinkadulla",
      eyebrow: "Deli",
      titlePre: "Aito ",
      titleEm: "New Yorkin deli",
      titlePost: " Iso Roobertinkadulla",
      body:
        "Roba Deli on Helsingin uusin voileipädeli — käsintehdyt voileivät, salaatit & herkut valmistetaan tilauksesta tiskillä, ei koskaan valmiiksi pakattuina. Aitoa raclettea kaavitaan sulana hidaskypsytetyn naudanrinnan päälle. Tuoreena paistettua briochea ja hapanjuurifocacciaa. Graavilohta, halloumia, kunnon Philly.",
      proof: [
        "Raclette & juusto sulatettuna voileivän päälle, tilauksesta.",
        "Tuoreena paistetut sämpylät — brioche & hapanjuurifocaccia.",
        "Aidoista hedelmistä tehdyt smoothiet & tuoreiden raaka-aineiden baari.",
        "⭐ 5.0 Googlessa — eräs vieras kirjoitti “100 % parempi kuin Subway.”",
      ],
      cta: "Tutustu ruokalistaan",
    },
    craft: {
      eyebrow: "Miksi Roba",
      titlePre: "Valmistettu ",
      titleEm: "tilauksesta",
      items: [
        { title: "Tuoreena paistetut sämpylät", body: "Brioche & hapanjuurifocaccia, paistettu juuri sopiviksi." },
        { title: "Raclette, sulatettuna paikan päällä", body: "Aitoa juustoa kaavittuna sulana päälle, tilauksesta." },
        { title: "Aidot raaka-aineet", body: "Naudanrinta, graavilohi, halloumi — tuoreiden raaka-aineiden baari." },
        { title: "Lounaasta iltaan", body: "Paikkasi lounaasta myöhään iltaan — viikonloppuisin klo 04:30 asti." },
      ],
    },
    deals: {
      eyebrow: "Joka päivä",
      titlePre: "Tulemisen arvoiset ",
      titleEm: "tarjoukset",
    },
    menu: {
      eyebrow: "Ruokalista",
      titlePre: "Käsintehty, ",
      titleEm: "tilauksesta valmistettu",
      legendL: "Laktoositon",
      legendG: "Gluteeniton",
      legendLG: "molemmat",
      legendSubs: 'Subit saatavana 6" / 12"',
    },
    smoothies: {
      eyebrow: "Aitoa hedelmää",
      titlePre: "Smoothiet, ",
      titleEm: "vispattu eloon",
    },
    reviews: {
      sub: "24 arvostelua Googlessa",
      source: "· Google",
    },
    visit: {
      eyebrow: "Löydä meidät",
      titlePre: "Vieraile ",
      titleEm: "Roba Delissä",
      labelAddress: "Osoite",
      labelPhone: "Puhelin",
      labelHours: "Aukioloajat",
      labelRating: "Arvosana",
      hours: ["Ma–To 10:30–23:00", "Pe 11:00–04:30", "La 11:30–04:30", "Su 11:30–23:00"],
      lunchDeal: "Lounastarjous 10:30–15:00",
      rating: "5.0 · 24 arvostelua",
      pills: ["Paikan päällä", "Mukaan", "Kotiinkuljetus"],
      cta: "Soita ja tilaa · 050 379 7490",
    },
    footer: {
      tagline: "Käsintehdyt voileivät, salaatit & herkut",
    },
  },
} as const;

export type Dict = (typeof dict)["en"];
