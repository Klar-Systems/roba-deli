/**
 * Legal pages — privacy, cookies, terms, refunds — in both site languages.
 *
 * Everything here describes what THIS site actually does, measured from the
 * source on 2026-09-08:
 *
 *   - `@vercel/analytics` in app/layout.tsx  → aggregate, cookieless page stats
 *   - `components/KlarOrder.tsx`             → orders via booking.klarsystems.com
 *   - the Klar embed's localStorage          → cart + typed contact details
 *   - `next/font/google` in app/layout.tsx   → fonts are SELF-HOSTED at build
 *     time, so no visitor IP reaches Google for fonts
 *   - `components/Visit.tsx`                 → Google Maps, click-to-load only
 *
 * If any of those change, this file changes with them. A privacy policy that
 * describes a different site is worse than none.
 *
 * TODO markers are deliberate and must be visible: a company number or a legal
 * entity name is a fact the operator supplies, never one this file invents.
 */

/** A fact only the business owner can supply. Rendered so it cannot be missed. */
export const TODO = (what: string) => `{{TODO: ${what}}}`;

/**
 * Measured 2026-09-08 from two public registers, not supplied by anyone:
 *
 *   Oiva (oivahymy.fi, the food-control register) — "Roba Deli",
 *   Iso Roobertinkatu 1, 00120 Helsinki, food business operator "SubHub Oy",
 *   category "Kahvilat ja ravintolat". The shop address matches this site.
 *
 *   PRH/YTJ (avoindata.prh.fi) — SubHub Oy, Y-tunnus 3611281-3, registered
 *   address Pajuniityntie 3, 00320 Helsinki, line of business "Pikaruoka-
 *   ravintolat ja ruokakioskit", in the VAT register since 2026-03-22.
 *
 * SubHub Oy is also the counterparty on the signed Roba Deli ordering
 * agreement, which is the independent corroboration.
 *
 * Note the two addresses are different and both belong here: the CONTROLLER is
 * the company at its registered address; the SHOP is where the guest goes.
 */
export const COMPANY = {
  /** Trading name — measured from the site and the owner's own channels. */
  tradingName: "Roba Deli",
  /** Registered company name (PRH, 2026-09-08). */
  legalName: "SubHub Oy",
  /** Finnish business ID. Required before a consumer places an order. */
  businessId: "3611281-3",
  /** The company's registered address — the controller's address. */
  address: "Pajuniityntie 3, 00320 Helsinki, Finland",
  /** The shop itself. content/contact.md, confirmed with the owner. */
  shopAddress: "Iso Roobertinkatu 1, 00120 Helsinki, Finland",
  phone: "+358 50 379 7490",
  phoneDisplay: "050 379 7490",
  /**
   * Still open. No email address appears in this repo, on the site, or in
   * either public register — the registers do not carry one. The owner has to
   * give it, and consumer law wants a contact channel that is not only a phone.
   */
  email: TODO("customer-contact email address"),
  /** FI + the business ID without its dash; VAT-registered since 2026-03-22. */
  vat: "FI36112813",
} as const;

export type LegalSection = { h: string; p: string[] };
export type LegalDocument = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const UPDATED_EN = "8 September 2026";
const UPDATED_FI = "8. syyskuuta 2026";

const C = COMPANY;

/* ─────────────────────────── English ─────────────────────────── */

const privacyEn: LegalDocument = {
  slug: "privacy",
  title: "Privacy policy",
  updated: UPDATED_EN,
  intro:
    "This policy explains what personal data robadeli.fi collects, why, and what you can do about it. It covers this website only.",
  sections: [
    {
      h: "Who is responsible for your data",
      p: [
        `The controller is ${C.legalName} (trading as ${C.tradingName}), business ID ${C.businessId}, registered at ${C.address}. The shop itself is at ${C.shopAddress}.`,
        `Questions about your data: ${C.email} or ${C.phoneDisplay}.`,
      ],
    },
    {
      h: "What we collect, and why",
      p: [
        "<b>When you place an order.</b> Your name, phone number, email address, the items you ordered, your chosen pickup or delivery time, and — for delivery — your delivery address and any instructions you add. We need these to make and hand over the food you asked for. Legal basis: performance of a contract with you (GDPR Article 6(1)(b)).",
        "<b>When you pay by card.</b> Payment is handled by Stripe. Your card number never reaches this website or our systems; we receive only the result of the payment and the last digits of the card, so we can match a payment to an order and issue a refund if one is due. Legal basis: performance of a contract, and our legal obligation to keep accounting records.",
        "<b>When you just browse.</b> We use Vercel Analytics for aggregate visitor counts — which pages are viewed, from which country, on what kind of device. It sets no cookies and builds no profile of you, and we cannot identify you from it. Legal basis: our legitimate interest in knowing whether the site works (Article 6(1)(f)).",
        "<b>Automatically, by our host.</b> Our hosting provider keeps short-lived server logs that include your IP address, for security and fault-finding.",
        "We do not buy personal data, we do not sell it, and we do not use it for advertising or profiling.",
      ],
    },
    {
      h: "Allergies and dietary needs",
      p: [
        "If you write an allergy or a special diet into an order note, that is health data, which the GDPR protects more strictly than ordinary personal data (Article 9). We use it only to prepare your order safely, we pass it only to the kitchen staff making that order, and we delete it once the order has been served. Please do not send us medical detail beyond what the kitchen needs to know.",
      ],
    },
    {
      h: "Who else sees your data",
      p: [
        "We use these service providers, and only for the purposes above:",
        "<b>Klar Systems Oy</b> — the ordering system behind the order panel on this site. It receives your order and your contact details so the shop can see and fulfil the order.",
        "<b>Stripe Payments Europe, Ltd.</b> — card payments. Stripe is its own controller for fraud prevention and acts under its own privacy policy.",
        "<b>Vercel Inc.</b> — hosting and the analytics described above.",
        "<b>Google</b> — only if you choose to load the map on the Visit section. The map does not load until you click it.",
        "We share your data with nobody else, except where the law requires it — for example a tax or food-safety authority acting within its powers.",
      ],
    },
    {
      h: "Where your data is processed",
      p: [
        "Our host and ordering system run inside the EU. Stripe, Vercel and Google are able to process data outside the EEA; where they do, they rely on the European Commission's standard contractual clauses or on an adequacy decision. You can ask us for a copy of those safeguards.",
      ],
    },
    {
      h: "How long we keep it",
      p: [
        "Order and contact details: for as long as needed to complete and support your order, and after that as accounting records for six years from the end of the calendar year, because Finnish bookkeeping law requires it (kirjanpitolaki 2:10).",
        "Allergy and dietary notes: deleted once the order has been served.",
        "Server logs: kept briefly by our host and then discarded.",
        "The cart and contact details saved in your own browser stay there until you clear them; see our cookie policy.",
      ],
    },
    {
      h: "Your rights",
      p: [
        "You can ask us for a copy of the data we hold about you, ask us to correct it, ask us to delete it, ask us to restrict how we use it, object to processing we base on legitimate interest, and ask for the data you gave us in a portable form. Where we rely on your consent, you can withdraw it at any time without affecting what we did before you withdrew it.",
        `Write to ${C.email} and we will answer within one month.`,
        "If you think we have handled your data wrongly, you can complain to the Finnish Data Protection Ombudsman: Tietosuojavaltuutetun toimisto, tietosuoja.fi. You can complain to them without asking us first.",
      ],
    },
    {
      h: "Automated decisions",
      p: [
        "We make no automated decisions about you that produce legal effects or similarly significant effects.",
      ],
    },
    {
      h: "Changes",
      p: [
        `We update this page when the site changes. This version is dated ${UPDATED_EN}.`,
      ],
    },
  ],
};

const cookiesEn: LegalDocument = {
  slug: "cookies",
  title: "Cookies and browser storage",
  updated: UPDATED_EN,
  intro:
    "The short version: this site sets no tracking cookies, so there is no consent banner to click away. Here is exactly what it does store.",
  sections: [
    {
      h: "What this site stores on your device",
      p: [
        "<b>Your basket and the details you type into it.</b> While you are ordering, the order panel keeps your basket contents and the name, phone number and email you have typed in your browser's own local storage. This is so that reloading the page does not throw away a half-finished order. It never leaves your browser until you send the order, and you can clear it from your browser settings at any time.",
        "<b>A language preference</b>, if you switch between English and Finnish.",
        "These are strictly necessary for a function you asked for, so under section 205 of the Finnish Act on Electronic Communications Services they do not require your consent.",
      ],
    },
    {
      h: "What this site does not do",
      p: [
        "No advertising cookies. No tracking pixels. No Google Analytics, no Meta pixel, no Tag Manager. We do not follow you to other websites and nobody buys your attention here.",
        "Our visitor statistics come from Vercel Analytics, which is cookieless — it counts page views without storing anything on your device and without identifying you.",
        "The web fonts on this site are served from our own domain, not from Google's servers, so loading a page sends your IP address to Google for fonts. It does not.",
      ],
    },
    {
      h: "The one exception: the map",
      p: [
        "The Visit section can show a Google map. Google would set its own cookies as soon as such a map loads, so on this site the map does not load by itself — you see a placeholder, and it loads only after you click it. If you never click, Google never hears from your browser. Once you do, Google's own privacy policy applies to that connection.",
      ],
    },
    {
      h: "Clearing what is stored",
      p: [
        "Any browser can clear site data for a single site from its settings — usually under Privacy, Site settings, or Cookies and site data. Clearing it empties your basket, which is the only thing you will notice.",
      ],
    },
  ],
};

const termsEn: LegalDocument = {
  slug: "terms",
  title: "Terms of service",
  updated: UPDATED_EN,
  intro:
    "These terms apply when you order food through robadeli.fi. They do not take away rights you have as a consumer under Finnish law.",
  sections: [
    {
      h: "Who you are dealing with",
      p: [
        `Your contract is with ${C.legalName} (trading as ${C.tradingName}), business ID ${C.businessId}, VAT ${C.vat}, registered at ${C.address}, trading at ${C.shopAddress}. Phone ${C.phoneDisplay}, email ${C.email}.`,
      ],
    },
    {
      h: "Prices",
      p: [
        "All prices shown on this site are in euros and include Finnish VAT. The price that counts is the one shown in your basket at the moment you confirm the order. Any delivery fee is shown separately before you confirm.",
        "We try hard to keep the menu and its prices right. If an item is priced obviously wrongly — a clear error rather than an offer — we will contact you before making the order rather than charge you the wrong amount.",
      ],
    },
    {
      h: "How an order is made",
      p: [
        "You add items to the basket, enter your details, and confirm. Confirming sends us an order. A contract forms when we accept it — you will see a confirmation, and we will contact you if we cannot make it.",
        "We may decline an order: if the kitchen is closed or at capacity, if an item has run out, if a delivery address is outside our area, or if we have reason to think the order is not genuine. If you have already paid for an order we decline, you get the full amount back.",
      ],
    },
    {
      h: "Collection and delivery",
      p: [
        "Pickup: the times shown are estimates. Food is made to order and kitchen load varies.",
        "Delivery: we deliver only within the area shown at checkout, and a delivery fee and minimum order may apply. Please make sure someone can take the order at the address and that your phone is reachable — if we cannot reach you and cannot hand the food over, we cannot remake it for free.",
      ],
    },
    {
      h: "Allergens and food information",
      p: [
        "Our kitchen handles gluten, milk, egg, soy, nuts, sesame, fish and shellfish. We cannot promise that any dish is free of traces of an allergen, because the same surfaces and equipment are used for everything.",
        "If you have an allergy that matters, tell us in the order note and call us on {phone} before ordering. If we cannot make your order safely, we will say so rather than guess.",
      ],
    },
    {
      h: "Paying",
      p: [
        "You can pay by card at checkout, or on collection or delivery where that option is offered. Card payments are handled by Stripe; we never see or store your card number.",
      ],
    },
    {
      h: "If something is wrong",
      p: [
        `Contact us as soon as you can — ${C.phoneDisplay} or ${C.email} — and keep the order if you still have it. If we got the order wrong, we will remake it or refund it. See our refunds page for the detail.`,
      ],
    },
    {
      h: "Our responsibility",
      p: [
        "We are responsible for the food we make and for getting your order right, as Finnish consumer law requires. Nothing in these terms limits our liability for death or personal injury caused by our negligence, for fraud, or anything else that cannot be limited by law.",
        "This website is provided as it is. We cannot promise it is reachable at every moment — if the ordering system is down, the phone still works.",
      ],
    },
    {
      h: "Law and disputes",
      p: [
        "Finnish law applies. If we cannot settle a complaint between us, you can take it to the Consumer Disputes Board (kuluttajariitalautakunta.fi) or first ask the Consumer Advisory Service (kuluttajaneuvonta.fi) for advice. You can also use the European Commission's online dispute resolution platform. As a consumer you may always bring a case in the court for the district where you live.",
      ],
    },
  ],
};

const refundsEn: LegalDocument = {
  slug: "refunds",
  title: "Cancellations and refunds",
  updated: UPDATED_EN,
  intro:
    "Freshly prepared food is a special case in consumer law. This page says plainly what you can and cannot get back, and what we do when we get an order wrong.",
  sections: [
    {
      h: "The 14-day right of withdrawal does not apply to your food",
      p: [
        "For most things bought online in Finland you get 14 days to change your mind. Food prepared to your order is one of the listed exceptions, because it spoils quickly and is made specifically for you (kuluttajansuojalaki 6:16). So once we have started making your order, you cannot cancel it simply because you changed your mind.",
        "This exception is about the right of withdrawal only. Every other right you have — food that is not what you ordered, food that is not fit to eat, an order that never arrives — is untouched, and is set out below.",
      ],
    },
    {
      h: "Cancelling before we start cooking",
      p: [
        `Call us on ${C.phoneDisplay} straight away. If the kitchen has not started your order, we will cancel it and refund you in full. Once it is being made, we cannot.`,
      ],
    },
    {
      h: "When we will refund or remake",
      p: [
        "We will remake the order or refund it, whichever you prefer, if:",
        "— we gave you the wrong item, or left something out;",
        "— the food was not fit to eat when it reached you;",
        "— a delivery never arrived, or arrived so late it was no longer worth having;",
        "— we cancelled your order after you had already paid.",
        "We do not refund an order simply because you did not like the taste, or because you did not collect it, or because nobody was reachable at the delivery address.",
      ],
    },
    {
      h: "How to ask",
      p: [
        `Tell us the same day if you can: ${C.phoneDisplay}, or ${C.email} with your order number. A photo helps if something arrived wrong or damaged. We answer within a few days and will not make you chase us.`,
      ],
    },
    {
      h: "How the money comes back",
      p: [
        "A card refund goes back to the card you paid with, through Stripe. We start it within 14 days of agreeing the refund; how long it then takes to appear is up to your bank, usually a few working days. If you paid cash on collection or delivery, we refund in cash or by bank transfer, as you prefer.",
      ],
    },
    {
      h: "If you disagree with us",
      p: [
        "You can take a complaint to the Consumer Disputes Board (kuluttajariitalautakunta.fi) free of charge, and the Consumer Advisory Service (kuluttajaneuvonta.fi) will advise you first. We will not treat that as a reason to stop serving you.",
      ],
    },
  ],
};

/* ─────────────────────────── Suomi ─────────────────────────── */

const privacyFi: LegalDocument = {
  slug: "tietosuoja",
  title: "Tietosuojaseloste",
  updated: UPDATED_FI,
  intro:
    "Tämä seloste kertoo, mitä henkilötietoja robadeli.fi kerää, miksi, ja mitä voit tehdä niiden suhteen. Seloste koskee vain tätä verkkosivustoa.",
  sections: [
    {
      h: "Rekisterinpitäjä",
      p: [
        `Rekisterinpitäjä on ${C.legalName} (markkinointinimi ${C.tradingName}), Y-tunnus ${C.businessId}, rekisteröity osoite ${C.address}. Toimipaikka on ${C.shopAddress}.`,
        `Tietojasi koskevat kysymykset: ${C.email} tai ${C.phoneDisplay}.`,
      ],
    },
    {
      h: "Mitä keräämme ja miksi",
      p: [
        "<b>Kun teet tilauksen.</b> Nimesi, puhelinnumerosi, sähköpostiosoitteesi, tilaamasi tuotteet, valitsemasi nouto- tai toimitusaika sekä kotiinkuljetuksessa toimitusosoite ja mahdolliset ohjeet. Tarvitsemme nämä valmistaaksemme ja luovuttaaksemme tilaamasi ruoan. Peruste: sopimuksen täyttäminen (tietosuoja-asetuksen 6 artiklan 1 kohdan b alakohta).",
        "<b>Kun maksat kortilla.</b> Maksun välittää Stripe. Korttinumerosi ei koskaan päädy tälle sivustolle eikä järjestelmiimme; saamme vain tiedon maksun onnistumisesta ja kortin viimeiset numerot, jotta osaamme yhdistää maksun tilaukseen ja palauttaa rahat tarvittaessa. Peruste: sopimuksen täyttäminen ja kirjanpitovelvollisuus.",
        "<b>Kun vain selaat.</b> Käytämme Vercel Analyticsia kävijämäärien seurantaan — mitä sivuja katsotaan, mistä maasta ja millaisella laitteella. Se ei aseta evästeitä eikä muodosta sinusta profiilia, emmekä voi tunnistaa sinua siitä. Peruste: oikeutettu etu tietää, toimiiko sivusto (6 artiklan 1 kohdan f alakohta).",
        "<b>Automaattisesti, palvelimella.</b> Palveluntarjoajamme säilyttää lyhytaikaisia lokitietoja, joissa on IP-osoitteesi, tietoturvaa ja vianselvitystä varten.",
        "Emme osta henkilötietoja emmekä myy niitä, emmekä käytä niitä mainontaan tai profilointiin.",
      ],
    },
    {
      h: "Allergiat ja erityisruokavaliot",
      p: [
        "Jos kirjoitat allergian tai erityisruokavalion tilauksen lisätietoihin, kyse on terveystiedosta, jota tietosuoja-asetus suojaa tavallista tiukemmin (9 artikla). Käytämme sitä vain tilauksesi turvalliseen valmistamiseen, välitämme sen vain tilauksen tekevälle keittiöhenkilökunnalle, ja poistamme sen kun tilaus on tarjoiltu. Älä lähetä meille terveystietoa enempää kuin keittiön on tarpeen tietää.",
      ],
    },
    {
      h: "Kuka muu näkee tietosi",
      p: [
        "Käytämme seuraavia palveluntarjoajia, ja vain edellä kuvattuihin tarkoituksiin:",
        "<b>Klar Systems Oy</b> — tilausjärjestelmä, joka toimii sivuston tilauspaneelin takana. Se vastaanottaa tilauksesi ja yhteystietosi, jotta ravintola näkee ja voi toimittaa tilauksen.",
        "<b>Stripe Payments Europe, Ltd.</b> — korttimaksut. Stripe on omien väärinkäytöksen estotoimiensa osalta itsenäinen rekisterinpitäjä ja toimii oman tietosuojaselosteensa mukaisesti.",
        "<b>Vercel Inc.</b> — sivuston alusta ja edellä kuvattu kävijäseuranta.",
        "<b>Google</b> — vain jos itse valitset kartan lataamisen Vieraile-osiossa. Kartta ei lataudu ennen kuin klikkaat sitä.",
        "Muille emme luovuta tietojasi, paitsi jos laki sitä edellyttää — esimerkiksi vero- tai elintarvikeviranomaiselle sen toimivallan rajoissa.",
      ],
    },
    {
      h: "Missä tietoja käsitellään",
      p: [
        "Sivuston alusta ja tilausjärjestelmä toimivat EU:n sisällä. Stripe, Vercel ja Google voivat käsitellä tietoja ETA:n ulkopuolella; silloin ne nojaavat Euroopan komission vakiolausekkeisiin tai riittävyyspäätökseen. Voit pyytää meiltä jäljennöksen näistä suojatoimista.",
      ],
    },
    {
      h: "Kuinka kauan säilytämme",
      p: [
        "Tilaus- ja yhteystiedot: niin kauan kuin tilauksen toteuttaminen ja siihen liittyvä asiakaspalvelu vaatii, ja sen jälkeen kirjanpitoaineistona kuusi vuotta kalenterivuoden päättymisestä, koska kirjanpitolaki (2:10) sitä edellyttää.",
        "Allergia- ja ruokavaliotiedot: poistetaan kun tilaus on tarjoiltu.",
        "Palvelinlokit: säilytetään lyhyen aikaa ja poistetaan.",
        "Selaimeesi tallentuvat ostoskori ja yhteystiedot pysyvät siellä kunnes tyhjennät ne; katso evästekäytäntö.",
      ],
    },
    {
      h: "Oikeutesi",
      p: [
        "Voit pyytää jäljennöksen sinusta tallennetuista tiedoista, pyytää niiden oikaisua tai poistoa, pyytää käsittelyn rajoittamista, vastustaa oikeutettuun etuun perustuvaa käsittelyä, ja pyytää antamasi tiedot siirrettävässä muodossa. Jos käsittely perustuu suostumukseesi, voit peruuttaa sen milloin tahansa; peruutus ei vaikuta sitä ennen tehtyyn käsittelyyn.",
        `Ota yhteyttä osoitteeseen ${C.email}, niin vastaamme kuukauden kuluessa.`,
        "Jos katsot, että olemme käsitelleet tietojasi väärin, voit tehdä valituksen tietosuojavaltuutetulle: Tietosuojavaltuutetun toimisto, tietosuoja.fi. Voit tehdä valituksen kysymättä ensin meiltä.",
      ],
    },
    {
      h: "Automaattinen päätöksenteko",
      p: [
        "Emme tee sinua koskevia automaattisia päätöksiä, joilla olisi oikeusvaikutuksia tai vastaavalla tavalla merkittäviä vaikutuksia.",
      ],
    },
    {
      h: "Muutokset",
      p: [`Päivitämme tätä sivua kun sivusto muuttuu. Tämä versio on päivätty ${UPDATED_FI}.`],
    },
  ],
};

const cookiesFi: LegalDocument = {
  slug: "evasteet",
  title: "Evästeet ja selaimeen tallennettavat tiedot",
  updated: UPDATED_FI,
  intro:
    "Lyhyesti: tämä sivusto ei aseta seurantaevästeitä, joten napsautettavaa evästebanneria ei ole. Tässä on tarkalleen se, mitä sivusto tallentaa.",
  sections: [
    {
      h: "Mitä sivusto tallentaa laitteellesi",
      p: [
        "<b>Ostoskorisi ja siihen kirjoittamasi tiedot.</b> Tilauksen aikana tilauspaneeli säilyttää ostoskorin sisällön sekä kirjoittamasi nimen, puhelinnumeron ja sähköpostiosoitteen selaimesi omassa muistissa (localStorage), jottei sivun lataaminen uudelleen hukkaa kesken jäänyttä tilausta. Tiedot eivät poistu selaimestasi ennen kuin lähetät tilauksen, ja voit tyhjentää ne selaimen asetuksista milloin tahansa.",
        "<b>Kielivalinnan</b>, jos vaihdat suomen ja englannin välillä.",
        "Nämä ovat välttämättömiä pyytämäsi toiminnon toteuttamiseksi, joten sähköisen viestinnän palveluista annetun lain 205 §:n mukaan ne eivät vaadi suostumustasi.",
      ],
    },
    {
      h: "Mitä sivusto ei tee",
      p: [
        "Ei mainosevästeitä. Ei seurantapikseleitä. Ei Google Analyticsia, ei Meta-pikseliä, ei Tag Manageria. Emme seuraa sinua muille sivustoille eikä kukaan osta huomiotasi täällä.",
        "Kävijätilastomme tulevat Vercel Analyticsista, joka toimii ilman evästeitä — se laskee sivulatauksia tallentamatta mitään laitteellesi ja tunnistamatta sinua.",
        "Sivuston kirjasimet ladataan omalta palvelimeltamme, eivät Googlen palvelimilta, joten sivun avaaminen ei lähetä IP-osoitettasi Googlelle kirjasimia varten.",
      ],
    },
    {
      h: "Yksi poikkeus: kartta",
      p: [
        "Vieraile-osiossa voidaan näyttää Google-kartta. Google asettaisi omat evästeensä heti kun tällainen kartta latautuu, joten tällä sivustolla kartta ei lataudu itsestään — näet paikanvaraajan, ja kartta latautuu vasta kun napsautat sitä. Jos et napsauta, Google ei kuule selaimestasi. Kun napsautat, siihen yhteyteen sovelletaan Googlen omaa tietosuojakäytäntöä.",
      ],
    },
    {
      h: "Tallennettujen tietojen tyhjentäminen",
      p: [
        "Jokaisesta selaimesta voi tyhjentää yhden sivuston tiedot asetuksista — yleensä kohdasta Tietosuoja, Sivuston asetukset tai Evästeet ja sivustotiedot. Tyhjennys tyhjentää ostoskorisi, mikä on ainoa asia jonka huomaat.",
      ],
    },
  ],
};

const termsFi: LegalDocument = {
  slug: "ehdot",
  title: "Käyttö- ja tilausehdot",
  updated: UPDATED_FI,
  intro:
    "Nämä ehdot koskevat ruoan tilaamista robadeli.fi-sivuston kautta. Ne eivät vähennä kuluttajalle Suomen lain mukaan kuuluvia oikeuksia.",
  sections: [
    {
      h: "Kenen kanssa asioit",
      p: [
        `Sopimuksesi on ${C.legalName} (markkinointinimi ${C.tradingName}), Y-tunnus ${C.businessId}, ALV-numero ${C.vat}, rekisteröity osoite ${C.address}, toimipaikka ${C.shopAddress}. Puhelin ${C.phoneDisplay}, sähköposti ${C.email}.`,
      ],
    },
    {
      h: "Hinnat",
      p: [
        "Kaikki sivustolla näkyvät hinnat ovat euroja ja sisältävät arvonlisäveron. Sitova hinta on se, joka näkyy ostoskorissa tilausta vahvistaessasi. Mahdollinen toimitusmaksu näytetään erikseen ennen vahvistusta.",
        "Pyrimme pitämään ruokalistan ja hinnat oikeina. Jos tuotteen hinta on ilmeisen virheellinen — selvä virhe eikä tarjous — otamme sinuun yhteyttä ennen tilauksen valmistamista emmekä veloita väärää summaa.",
      ],
    },
    {
      h: "Miten tilaus syntyy",
      p: [
        "Lisäät tuotteet koriin, täytät tietosi ja vahvistat. Vahvistus lähettää meille tilauksen. Sopimus syntyy kun hyväksymme sen — näet vahvistuksen, ja otamme yhteyttä jos emme voi toteuttaa tilausta.",
        "Voimme kieltäytyä tilauksesta: jos keittiö on kiinni tai täynnä, jos tuote on loppunut, jos toimitusosoite on alueemme ulkopuolella, tai jos meillä on syytä epäillä ettei tilaus ole aito. Jos olet jo maksanut tilauksen josta kieltäydymme, saat koko summan takaisin.",
      ],
    },
    {
      h: "Nouto ja kuljetus",
      p: [
        "Nouto: ilmoitetut ajat ovat arvioita. Ruoka valmistetaan tilauksesta ja keittiön kuormitus vaihtelee.",
        "Kuljetus: toimitamme vain kassalla näkyvälle alueelle, ja toimitusmaksu sekä tilauksen vähimmäissumma voivat päteä. Varmista, että joku voi ottaa tilauksen vastaan osoitteessa ja että puhelimesi on tavoitettavissa — jos emme tavoita sinua emmekä voi luovuttaa ruokaa, emme voi valmistaa sitä uudelleen veloituksetta.",
      ],
    },
    {
      h: "Allergeenit ja elintarviketiedot",
      p: [
        "Keittiössämme käsitellään gluteenia, maitoa, kananmunaa, soijaa, pähkinöitä, seesamia, kalaa ja äyriäisiä. Emme voi luvata, että mikään annos olisi täysin vapaa allergeenien jäämistä, koska samoja pintoja ja välineitä käytetään kaikkeen.",
        `Jos sinulla on merkityksellinen allergia, kerro se tilauksen lisätiedoissa ja soita meille numeroon ${C.phoneDisplay} ennen tilaamista. Jos emme voi valmistaa tilaustasi turvallisesti, sanomme sen suoraan emmekä arvaa.`,
      ],
    },
    {
      h: "Maksaminen",
      p: [
        "Voit maksaa kortilla kassalla, tai noudon tai toimituksen yhteydessä silloin kun se on tarjolla. Korttimaksut välittää Stripe; emme näe emmekä tallenna korttinumeroasi.",
      ],
    },
    {
      h: "Jos jokin on pielessä",
      p: [
        `Ota yhteyttä mahdollisimman pian — ${C.phoneDisplay} tai ${C.email} — ja säilytä tilaus jos se on vielä tallella. Jos teimme tilauksen väärin, valmistamme sen uudelleen tai palautamme rahat. Yksityiskohdat ovat palautussivulla.`,
      ],
    },
    {
      h: "Vastuumme",
      p: [
        "Vastaamme valmistamastamme ruoasta ja tilauksen oikeellisuudesta siten kuin kuluttajansuojalaki edellyttää. Mikään näissä ehdoissa ei rajoita vastuutamme huolimattomuudestamme aiheutuneesta kuolemasta tai henkilövahingosta, petoksesta, eikä muusta mitä lain mukaan ei voi rajoittaa.",
        "Sivusto tarjotaan sellaisena kuin se on. Emme voi luvata sen olevan saavutettavissa joka hetki — jos tilausjärjestelmä on alhaalla, puhelin toimii silti.",
      ],
    },
    {
      h: "Sovellettava laki ja riidat",
      p: [
        "Sovelletaan Suomen lakia. Jos emme saa erimielisyyttä keskenämme sovittua, voit viedä sen kuluttajariitalautakuntaan (kuluttajariitalautakunta.fi) tai pyytää ensin neuvoa kuluttajaneuvonnasta (kuluttajaneuvonta.fi). Voit käyttää myös Euroopan komission verkkovälitteistä riidanratkaisualustaa. Kuluttajana voit aina nostaa kanteen kotipaikkasi käräjäoikeudessa.",
      ],
    },
  ],
};

const refundsFi: LegalDocument = {
  slug: "palautukset",
  title: "Peruutukset ja hyvitykset",
  updated: UPDATED_FI,
  intro:
    "Tuoreena valmistettu ruoka on kuluttajansuojassa erikoistapaus. Tämä sivu kertoo suoraan, mitä saat takaisin ja mitä et, ja mitä teemme kun tilaus menee meiltä väärin.",
  sections: [
    {
      h: "14 vuorokauden peruuttamisoikeus ei koske ruokaasi",
      p: [
        "Useimmissa verkosta ostetuissa tuotteissa on Suomessa 14 vuorokauden peruuttamisoikeus. Tilauksesta valmistettu ruoka on yksi laissa luetelluista poikkeuksista, koska se pilaantuu nopeasti ja valmistetaan nimenomaan sinulle (kuluttajansuojalaki 6:16). Kun tilauksesi valmistus on aloitettu, et siis voi peruuttaa sitä pelkästään siksi, että muutit mielesi.",
        "Poikkeus koskee vain peruuttamisoikeutta. Kaikki muut oikeutesi — väärä tilaus, kelvoton ruoka, tilaus joka ei koskaan saapunut — ovat ennallaan, ja ne on kuvattu alla.",
      ],
    },
    {
      h: "Peruuttaminen ennen kuin valmistus alkaa",
      p: [
        `Soita heti numeroon ${C.phoneDisplay}. Jos keittiö ei ole aloittanut tilaustasi, peruutamme sen ja palautamme rahat kokonaan. Kun valmistus on alkanut, emme voi.`,
      ],
    },
    {
      h: "Milloin hyvitämme tai valmistamme uudelleen",
      p: [
        "Valmistamme tilauksen uudelleen tai hyvitämme sen, kumman valitset, jos:",
        "— annoimme väärän tuotteen tai jätimme jotain pois;",
        "— ruoka ei ollut syötäväksi kelpaavaa sen saapuessa;",
        "— kuljetus ei koskaan saapunut, tai saapui niin myöhässä ettei siitä ollut enää iloa;",
        "— peruutimme tilauksesi sen jälkeen kun olit jo maksanut.",
        "Emme hyvitä tilausta pelkästään siksi, ettei maku miellyttänyt, tai koska tilausta ei noudettu, tai koska toimitusosoitteesta ei tavoitettu ketään.",
      ],
    },
    {
      h: "Miten pyydät",
      p: [
        `Kerro mieluiten samana päivänä: ${C.phoneDisplay}, tai ${C.email} ja tilausnumerosi. Valokuva auttaa jos jokin saapui väärin tai vaurioituneena. Vastaamme muutamassa päivässä emmekä pane sinua perääntymään asiaa.`,
      ],
    },
    {
      h: "Miten rahat palautuvat",
      p: [
        "Korttihyvitys palautuu sille kortille jolla maksoit, Stripen kautta. Käynnistämme sen 14 vuorokauden kuluessa hyvityksestä sovittaessa; kuinka kauan sen näkyminen kestää, on pankkisi asia, yleensä muutama arkipäivä. Jos maksoit käteisellä noudon tai toimituksen yhteydessä, hyvitämme käteisenä tai tilisiirtona, kumpi sinulle sopii.",
      ],
    },
    {
      h: "Jos olet eri mieltä kanssamme",
      p: [
        "Voit viedä valituksen maksutta kuluttajariitalautakuntaan (kuluttajariitalautakunta.fi), ja kuluttajaneuvonta (kuluttajaneuvonta.fi) neuvoo sinua ensin. Emme pidä sitä syynä lakata palvelemasta sinua.",
      ],
    },
  ],
};

export const LEGAL = {
  en: { privacy: privacyEn, cookies: cookiesEn, terms: termsEn, refunds: refundsEn },
  fi: { privacy: privacyFi, cookies: cookiesFi, terms: termsFi, refunds: refundsFi },
} as const;

/** Footer link sets, so the two languages cannot drift apart. */
export const LEGAL_LINKS = {
  en: [
    { href: "/privacy", label: "Privacy" },
    { href: "/cookies", label: "Cookies" },
    { href: "/terms", label: "Terms" },
    { href: "/refunds", label: "Refunds" },
  ],
  fi: [
    { href: "/fi/tietosuoja", label: "Tietosuoja" },
    { href: "/fi/evasteet", label: "Evästeet" },
    { href: "/fi/ehdot", label: "Ehdot" },
    { href: "/fi/palautukset", label: "Palautukset" },
  ],
} as const;
