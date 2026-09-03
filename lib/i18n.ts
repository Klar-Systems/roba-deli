// Roba Deli UI copy — English + Finnish. Chrome strings only; menu/deals/smoothie
// content lives in lib/data.ts (with Finnish fields). Dish names stay English by design.

export type Locale = "en" | "fi";

export const dict = {
  en: {
    topbar: {
      addr: "Iso Roobertinkatu 1, Helsinki",
      openPre: "Open daily ·",
      openBold: "Fri & Sat till 4:30",
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
      titleEm: "wraps & provisions",
      intro:
        "Helsinki's newest deli on Iso Roobertinkatu. Hot, fresh, cheesy, made to order, from lunch to late night.",
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
        "Roba Deli is Helsinki's newest sandwich deli, handcrafted sandwiches, wraps & provisions built to order at the counter, never pre-wrapped. Real raclette scraped molten over beef pastrami. Fresh-baked craft brioche and sourdough focaccia. Halloumi, falafel, a proper Philly.",
      proof: [
        "Raclette & cheese melted over the sandwich, to order.",
        "Fresh-baked rolls: craft brioche & sourdough focaccia.",
        "Real-fruit smoothies & a fresh-ingredient bar.",
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
        { title: "Real ingredients", body: "Pastrami, halloumi, falafel. A fresh-ingredient bar." },
        { title: "Lunch to late", body: "Your spot from lunch to late night. Weekends till 04:30." },
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
      fav: "★ Favorite",
      add: "+ Add",
      orderEyebrow: "Order online",
      orderTitlePre: "Your ",
      orderTitleEm: "order",
      orderHint: "Pick from the menu above. We build it fresh and you collect at the counter.",
      barItems: "in your order",
      barGo: "Review & send",
      legendL: "Lactose-free",
      legendG: "Gluten-free",
      legendLG: "both",
      legendSubs: "Subs available in S / L",
    },
    smoothies: {
      eyebrow: "Real fruit",
      titlePre: "Smoothies, ",
      titleEm: "shaken to life",
    },
    reviews: {
      eyebrow: "Kind words",
      titlePre: "What guests ",
      titleEm: "say",
      source: "· Google",
    },
    visit: {
      eyebrow: "Find us",
      titlePre: "Visit ",
      titleEm: "Roba Deli",
      labelAddress: "Address",
      labelPhone: "Phone",
      labelHours: "Hours",
      hours: ["Mon–Thu 10:30–23:00", "Fri 11:00–04:30", "Sat 11:30–04:30", "Sun 11:30–23:00"],
      pills: ["Dine-in", "Takeaway", "Delivery"],
      cta: "Call to order · 050 379 7490",
    },
    footer: {
      tagline: "Handcrafted sandwiches, wraps & provisions",
    },
  },

  fi: {
    topbar: {
      addr: "Iso Roobertinkatu 1, Helsinki",
      openPre: "Auki päivittäin ·",
      openBold: "Pe & La klo 4:30 asti",
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
      title2: "leivät",
      titleEm: "wrapit & herkut",
      intro:
        "Helsingin uusin deli Iso Roobertinkadulla. Kuumaa, tuoretta, juustoista, valmistetaan tilauksesta, lounaasta myöhään iltaan.",
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
        "Roba Deli on Helsingin uusin voileipädeli, käsintehdyt voileivät, wrapit & herkut valmistetaan tilauksesta tiskillä, ei koskaan valmiiksi pakattuina. Aitoa raclettea kaavitaan sulana naudan pastramin päälle. Tuoreena paistettua briochea ja hapanjuurifocacciaa. Halloumia, falafelia, kunnon Philly.",
      proof: [
        "Raclette & juusto sulatettuna voileivän päälle, tilauksesta.",
        "Tuoreena paistetut sämpylät: brioche & hapanjuurifocaccia.",
        "Aidoista hedelmistä tehdyt smoothiet & tuoreiden raaka-aineiden baari.",
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
        { title: "Aidot raaka-aineet", body: "Pastramia, halloumia, falafelia. Tuoreiden raaka-aineiden baari." },
        { title: "Lounaasta iltaan", body: "Paikkasi lounaasta myöhään iltaan. Viikonloppuisin klo 04:30 asti." },
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
      fav: "★ Suosikki",
      add: "+ Lisää",
      orderEyebrow: "Tilaa verkossa",
      orderTitlePre: "Sinun ",
      orderTitleEm: "tilauksesi",
      orderHint: "Valitse yltä ruokalistalta. Teemme tilauksen tuoreena ja noudat sen tiskiltä.",
      barItems: "tilauksessasi",
      barGo: "Tarkista ja lähetä",
      legendL: "Laktoositon",
      legendG: "Gluteeniton",
      legendLG: "molemmat",
      legendSubs: "Subit saatavana koossa S / L",
    },
    smoothies: {
      eyebrow: "Aitoa hedelmää",
      titlePre: "Smoothiet, ",
      titleEm: "vispattu eloon",
    },
    reviews: {
      eyebrow: "Ystävälliset sanat",
      titlePre: "Mitä vieraat ",
      titleEm: "sanovat",
      source: "· Google",
    },
    visit: {
      eyebrow: "Löydä meidät",
      titlePre: "Vieraile ",
      titleEm: "Roba Delissä",
      labelAddress: "Osoite",
      labelPhone: "Puhelin",
      labelHours: "Aukioloajat",
      hours: ["Ma–To 10:30–23:00", "Pe 11:00–04:30", "La 11:30–04:30", "Su 11:30–23:00"],
      pills: ["Paikan päällä", "Mukaan", "Kotiinkuljetus"],
      cta: "Soita ja tilaa · 050 379 7490",
    },
    footer: {
      tagline: "Käsintehdyt voileivät, wrapit & herkut",
    },
  },
} as const;

export type Dict = (typeof dict)["en"];
