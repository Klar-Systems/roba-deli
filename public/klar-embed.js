/* klar-embed.js — the drop-in ordering + booking surface for a Klar client site.
 *
 * One file, no build step, no dependencies. Two lines into any page:
 *
 *   <div data-klar-slug="ravintola-ani" data-klar-phone="09 622 2797"></div>
 *   <script src="https://booking.klarsystems.com/klar-embed.js" defer></script>
 *
 * That hosted URL is the DEFAULT install, and the one signup and the owner's
 * panel hand out. It is this exact file: `apps/booking/scripts/sync-embed.mjs`
 * copies it into `apps/booking/public` on every build, so this path stays the
 * single source, and `node scripts/sync-embed.mjs --check` — which is also a
 * jest test — fails if the served copy has drifted from it.
 *
 * Copying the file into the site itself still works and is still supported
 * (static sites: next to index.html; Next.js: public/) with `src="/klar-embed.js"`.
 * That is how sites/ravintola-ani, roba-deli and la-lasagna are wired, and it
 * keeps working when Klar is unreachable at page load. The only difference is
 * which API the calls go to — see `defaultApi`.
 *
 * It generalises the hand-built surface in sites/ravintola-ani/index.html, which
 * is wired to that site's element ids and Finnish copy. Nothing here is
 * per-restaurant: the slug, the surfaces, the phone number and the language all
 * come off the mount element.
 *
 * Public API it talks to (apps/booking):
 *   GET  /api/<orderSlug>/menu           orderable menu; item ids the server prices from
 *   POST /api/<orderSlug>/order          places the order (Idempotency-Key header)
 *   GET  /api/<bookSlug>/availability    real free slots for a date + party size
 *   POST /api/<bookSlug>/book            creates the booking
 *
 * TWO KEYSPACES, DELIBERATELY. Ordering is keyed by the console's clients.slug;
 * booking is keyed by booking's restaurants.slug. They are usually equal
 * (ravintola-ani) but not always — 16 Boom is "boom16" for ordering and
 * "boom-16" for booking. data-klar-slug sets both; data-klar-order-slug and
 * data-klar-book-slug override one side. Crossing them 404s both surfaces.
 *
 * Prices are never sent from the browser. The server prices the order from the
 * database by menu-item id and returns the total.
 *
 * CORS: the API answers a cross-origin request only for an origin on its
 * per-slug allowlist (apps/booking/src/lib/cors.ts). That allowlist is DERIVED
 * from the tenant's own records — the live `assets` website row, the address the
 * owner typed in Asetukset, and their www pairs — since the literal per-tenant
 * map was deleted on 2026-09-05. So a site fetches as soon as its own address is
 * recorded against the tenant, with no code change and no deploy. What is NOT
 * derivable is a site at an address nobody recorded: paste the snippet onto
 * example.fi while the tenant's records still say something else and the calls
 * are refused. The embed then shows its unavailable panel and logs the reason —
 * it never renders an empty box.
 *
 * HOST-MENU MODE — data-klar-menu="host". A site that already has a designed
 * menu section must not grow a second one: the embed then renders the cart and
 * checkout ONLY, and the site's own markup does the adding. The contract is
 * four DOM events on the mount element (all bubble, so document works too):
 *
 *   klar:menu         out  { categories, currency, allowsEatIn, client }
 *   klar:menu-failed  out  { reason }            the surface is dark; hide buttons
 *   klar:cart         out  { lines, count, totalCents, currency }
 *   klar:add          in   { id, qty }           qty defaults 1, may be negative
 *   klar:sync         in   —  (on document) re-emits the last menu and cart
 *
 * klar:sync exists because the host's listener and the embed's fetch race: a
 * host that mounts late asks for a replay instead of waiting forever. An id the
 * loaded menu does not carry is refused and logged — a host whose names have
 * drifted from the database gets a visibly missing button, never a silent one.
 *
 * Prices still come from the server in host-menu mode. The host sends ids.
 */
(function () {
  'use strict';

  var DEFAULT_API = 'https://booking.klarsystems.com';
  var LOCAL_API = 'http://localhost:3001';
  var PARTY_MAX_DEFAULT = 12;
  var BOOKING_HORIZON_DAYS = 90; /* the API's ceiling */

  /* Where this file was served from, captured HERE and not in boot():
   * document.currentScript is only set while the script executes synchronously,
   * and boot() may run later on DOMContentLoaded, where it reads null. Empty
   * string when there is no script element to ask (a bundler inlined it, a test
   * evaluates the source directly) — every reader treats that as "unknown". */
  var SCRIPT_ORIGIN = (function () {
    try {
      var el = typeof document !== 'undefined' ? document.currentScript : null;
      return el && el.src ? new URL(el.src, document.baseURI).origin : '';
    } catch (error) {
      return '';
    }
  })();

  /* ---------------------------------------------------------------- copy --- */

  var COPY = {
    fi: {
      tabOrder: 'Tilaa',
      tabBook: 'Varaa pöytä',
      cartTitle: 'Tilauksesi',
      cartEmpty: 'Tilauksesi on tyhjä. Valitse ruokalistalta.',
      add: '+ Lisää',
      addMore: 'Lisää',
      eatIn: 'Syön täällä',
      takeaway: 'Nouto',
      name: 'Nimi',
      namePlaceholder: 'Nimi tilausta varten',
      phone: 'Puhelin',
      optional: '(vapaaehtoinen)',
      total: 'Yhteensä',
      send: 'Lähetä tilaus',
      sending: 'Lähetetään…',
      payAtVenue: 'Maksu ravintolassa. Hinnat lasketaan palvelimella.',
      payOnline: 'Maksu kortilla: siirryt maksusivulle kun lähetät tilauksen. Hinnat lasketaan palvelimella.',
      orderOk: 'Tilaus lähetetty',
      reference: 'Viite',
      /* `collect` and `table` name the room on purpose, even at a venue that
         takes card payments — see the note at their use below. */
      collect: 'Nouto tiskiltä. Maksu ravintolassa.',
      table: 'Tuomme annokset pöytään. Maksu ravintolassa.',
      /* Delivery (0046). `deliver` says the food is coming, never that it is
         collected, and settles payment at the door for the same reason
         `collect` names the room — the guest reading it did not reach Stripe. */
      delivery: 'Kotiinkuljetus',
      deliver: 'Toimitamme tilauksen osoitteeseesi. Maksu toimituksen yhteydessä.',
      street: 'Katuosoite',
      postcode: 'Postinumero',
      city: 'Kaupunki',
      deliveryNote: 'Toimitusohje',
      deliveryNotePlaceholder: 'Esimerkiksi ovikoodi tai kerros',
      subtotal: 'Välisumma',
      deliveryFee: 'Kuljetusmaksu',
      deliversTo: 'Toimitamme postinumeroihin {codes}.',
      /* Two different sentences on purpose: the hint stands under the total
         while the basket is big enough, the refusal replaces it when it is not,
         and the same words in both would read as a rendering fault. */
      minimumHint: 'Vähimmäistilaus {eur}, kuljetusmaksu ei kerrytä sitä.',
      belowMinimum: 'Kotiinkuljetuksen vähimmäistilaus on {eur} ilman kuljetusmaksua.',
      missingAddress: 'Lisää katuosoite, postinumero ja kaupunki.',
      badPostcode: 'Postinumero on viisi numeroa.',
      unservedPostcode: 'Emme valitettavasti toimita postinumeroon {code}.',
      orderAgain: 'Tilaa lisää',
      needName: 'Lisää nimi, jotta löydämme tilauksesi.',
      menuLoading: 'Ladataan ruokalistaa…',
      menuGroup: 'Ruokalista',
      orderingOff: 'Verkkotilaus ei ole juuri nyt käytössä.',
      menuFailed: 'Ruokalistaa ei saatu ladattua. Päivitä sivu.',
      date: 'Päivä',
      party: 'Seurue',
      person: 'henkilö',
      people: 'henkilöä',
      time: 'Kellonaika',
      slotsLoading: 'Haetaan vapaita aikoja…',
      closed: 'Ravintola on suljettu tänä päivänä.',
      noSlots: 'Tälle päivälle ei ole vapaita aikoja. Kokeile toista päivää.',
      slotsFailed: 'Vapaita aikoja ei saatu haettua.',
      bookingOff: 'Pöytävaraus ei ole juuri nyt käytössä.',
      email: 'Sähköposti',
      requests: 'Toiveet',
      requestsPlaceholder: 'Korkea tuoli, ikkunapöytä, juhlat…',
      dietary: 'Allergiat tai erityisruokavalio',
      dietaryPlaceholder: 'Esim. pähkinäallergia, keliakia',
      /* MUST match HEALTH_CONSENT_TEXT.fi in
         apps/booking/src/lib/health-consent-text.ts — the server stores that
         constant as the consent_text, so if these two drift the record proves
         wording the guest never saw. A test asserts they are identical:
         apps/booking/src/lib/__tests__/health-consent.test.ts. */
      dietaryConsent:
        'Annan ravintolalle luvan käsitellä yllä kertomiani allergia- ja ' +
        'erityisruokavaliotietoja tätä varausta varten. Tiedot ovat terveystietoja. ' +
        'Ne näkyvät vain keittiölle ja salille, ne poistetaan varauksen jälkeen, ja ' +
        'voit poistaa ne itse milloin tahansa vahvistussähköpostin linkistä.',
      dietaryConsentMissing: 'Rastita suostumus, tai tyhjennä allergiakenttä.',
      book: 'Varaa pöytä',
      booking: 'Varataan…',
      /* The deposit a large party pays before the table is confirmed. `{eur}`
         is per guest and `{total}` the whole party's — both filled in below,
         never concatenated in the caller, so a translation can put them in the
         order its own grammar needs. */
      depositNotice:
        'Vähintään {threshold} hengen seurueelta varausmaksu {eur} € / hlö — yhteensä {total} €. Pöytä vahvistuu maksun jälkeen.',
      depositPay: 'Maksa varausmaksu ja varaa',
      depositRedirect: 'Siirrytään maksuun…',
      depositFinishing: 'Vahvistetaan varausta…',
      depositFailed:
        'Maksua ei voitu vahvistaa. Jos rahat lähtivät tililtäsi, ne palautetaan.',
      bookOk: 'Pöytä varattu',
      bookConfirm: 'Vahvistus lähetettiin sähköpostiisi.',
      bookAgain: 'Tee uusi varaus',
      bookFields: 'Täytä päivä, kellonaika, nimi, puhelin ja sähköposti.',
      at: 'klo',
      generic: 'Yhteys ei onnistunut. Yritä hetken päästä uudelleen.',
      callUs: 'Soita',
      /* Under the order button, only when the host names its notice. `{link}`
         becomes the anchor; the sentence around it is plain text. */
      privacyNotice: 'Tilaamalla hyväksyt, että tietojasi käsitellään {link} mukaisesti.',
      privacyLink: 'tietosuojaselosteen',
      badPhone: 'Tarkista puhelinnumero (esim. +358 40 123 4567).',
      tooMany: 'Liikaa yrityksiä. Odota hetki ja yritä uudelleen.',
      /* The kitchen is shut. `closedDay` and `closedDate` stand alone; the other
         two carry the time out of the API's `ordering` block, which is why they
         are templates and not finished sentences. */
      closedDay: 'Ravintola on tänään suljettu, emmekä ota tilauksia vastaan.',
      closedDate: 'Ravintola on kiinni tänä päivänä, emmekä ota tilauksia vastaan.',
      beforeOpen: 'Keittiö avaa klo {time}.',
      afterLastOrder: 'Keittiö ottaa tilauksia klo {time} asti.',
      closedNow: 'Emme ota tilauksia juuri nyt.',
      codes: {
        ORDER_REJECTED: 'Jokin valitsemasi annos ei ole juuri nyt saatavilla. Poista se tilauksesta.',
        VALIDATION_ERROR: 'Tarkista tilauksen tiedot.',
        IDEMPOTENCY_CONFLICT: 'Tämä tilaus on jo lähetetty.',
        PAYLOAD_TOO_LARGE: 'Tilaus on liian suuri verkkotilaukseen.',
        /* Reached only if a refusal arrives with no `ordering` block to read a
           reason out of. The specific sentence is always preferred. */
        ORDERING_CLOSED: 'Emme ota tilauksia juuri nyt.',
        /* Reached only when the 422 carries no `reason` this embed knows —
           postcode and minimum are answered with their own sentences. */
        DELIVERY_UNAVAILABLE: 'Tämä ravintola ei toimita ruokaa kotiin. Valitse nouto.'
      }
    },
    en: {
      tabOrder: 'Order',
      tabBook: 'Book a table',
      cartTitle: 'Your order',
      cartEmpty: 'Your order is empty. Pick something from the menu.',
      add: '+ Add',
      addMore: 'Add',
      eatIn: 'Eat in',
      takeaway: 'Takeaway',
      name: 'Name',
      namePlaceholder: 'Name for the order',
      phone: 'Phone',
      optional: '(optional)',
      total: 'Total',
      send: 'Send order',
      sending: 'Sending…',
      payAtVenue: 'Pay at the restaurant. Prices are calculated on the server.',
      payOnline: 'Card payment: you will be taken to the payment page when you send the order. Prices are calculated on the server.',
      orderOk: 'Order sent',
      reference: 'Reference',
      /* `collect` and `table` name the room on purpose, even at a venue that
         takes card payments — see the note at their use below. */
      collect: 'Collect at the counter. Pay at the restaurant.',
      table: 'We will bring it to your table. Pay at the restaurant.',
      delivery: 'Delivery',
      deliver: 'We will deliver your order to your address. Pay on delivery.',
      street: 'Street address',
      postcode: 'Postal code',
      city: 'City',
      deliveryNote: 'Delivery note',
      deliveryNotePlaceholder: 'A door code or a floor, for example',
      subtotal: 'Subtotal',
      deliveryFee: 'Delivery fee',
      deliversTo: 'We deliver to postcodes {codes}.',
      minimumHint: 'Minimum order {eur}; the delivery fee does not count towards it.',
      belowMinimum: 'Delivery needs a food total of at least {eur}, before the delivery fee.',
      missingAddress: 'Add your street address, postal code and city.',
      badPostcode: 'A postal code is five digits.',
      unservedPostcode: "We don't deliver to {code}, sorry.",
      orderAgain: 'Order more',
      needName: 'Add a name so we can find your order.',
      menuLoading: 'Loading the menu…',
      menuGroup: 'Menu',
      orderingOff: 'Online ordering is not available right now.',
      menuFailed: 'The menu could not be loaded. Please refresh the page.',
      date: 'Date',
      party: 'Party',
      person: 'person',
      people: 'people',
      time: 'Time',
      slotsLoading: 'Looking for free times…',
      closed: 'The restaurant is closed on this day.',
      noSlots: 'No free times on this day. Try another date.',
      slotsFailed: 'Free times could not be loaded.',
      bookingOff: 'Table booking is not available right now.',
      email: 'Email',
      requests: 'Requests',
      requestsPlaceholder: 'High chair, window table, a celebration…',
      dietary: 'Allergies or special diet',
      dietaryPlaceholder: 'E.g. nut allergy, coeliac',
      /* MUST match HEALTH_CONSENT_TEXT.en — see the Finnish note above. */
      dietaryConsent:
        'I allow the restaurant to process the allergy and special-diet information ' +
        'I have given above for this booking. This is health data. It is seen only ' +
        'by the kitchen and the floor, it is deleted after the visit, and you can ' +
        'delete it yourself at any time from the link in your confirmation email.',
      dietaryConsentMissing: 'Please tick the box, or clear the allergy field.',
      book: 'Book a table',
      booking: 'Booking…',
      depositNotice:
        'Parties of {threshold} or more pay a {eur} € deposit per guest — {total} € in total. The table is confirmed once it is paid.',
      depositPay: 'Pay the deposit and book',
      depositRedirect: 'Taking you to the payment…',
      depositFinishing: 'Confirming your booking…',
      depositFailed:
        'The payment could not be confirmed. If you were charged, the money is refunded.',
      bookOk: 'Table booked',
      bookConfirm: 'A confirmation was sent to your email.',
      bookAgain: 'Make another booking',
      bookFields: 'Fill in the date, time, name, phone and email.',
      at: 'at',
      generic: 'The connection failed. Please try again in a moment.',
      callUs: 'Call',
      privacyNotice: 'By ordering you agree that your details are handled as described in the {link}.',
      privacyLink: 'privacy notice',
      badPhone: 'Check the phone number (e.g. +358 40 123 4567).',
      tooMany: 'Too many attempts. Wait a moment and try again.',
      closedDay: 'The restaurant is closed today and is not taking orders.',
      closedDate: 'The restaurant is closed on this date and is not taking orders.',
      beforeOpen: 'The kitchen opens at {time}.',
      afterLastOrder: 'The kitchen stops taking orders at {time}.',
      closedNow: 'We are not taking orders right now.',
      codes: {
        ORDER_REJECTED: 'One of the dishes you picked is not available right now. Remove it from the order.',
        VALIDATION_ERROR: 'Check the order details.',
        IDEMPOTENCY_CONFLICT: 'This order has already been sent.',
        PAYLOAD_TOO_LARGE: 'The order is too large for online ordering.',
        ORDERING_CLOSED: 'We are not taking orders right now.',
        DELIVERY_UNAVAILABLE: 'This restaurant does not deliver. Choose takeaway.'
      }
    }
  };

  /* --------------------------------------------------------------- styles --- */

  var CSS = [
    '.klar-embed{--klar-accent:#111;--klar-on-accent:#fff;--klar-line:#e4e0d8;',
    '--klar-muted:#6b6357;--klar-radius:12px;color:inherit;font:inherit;text-align:left}',
    '.klar-embed *{box-sizing:border-box}',
    '.klar-tabs{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap}',
    '.klar-tabs button{flex:1 1 160px;padding:12px 16px;border:1px solid var(--klar-line);',
    'background:transparent;border-radius:var(--klar-radius);cursor:pointer;font:inherit;',
    'font-weight:600;color:inherit}',
    '.klar-tabs button.klar-on{background:var(--klar-accent);color:var(--klar-on-accent);',
    'border-color:var(--klar-accent)}',
    '.klar-panel{display:none}.klar-panel.klar-on{display:block}',
    '.klar-cats{display:flex;gap:8px;overflow-x:auto;padding-bottom:10px;margin-bottom:14px}',
    '.klar-cats button{white-space:nowrap;padding:8px 14px;border:1px solid var(--klar-line);',
    'background:transparent;border-radius:999px;cursor:pointer;font:inherit;color:inherit}',
    '.klar-cats button.klar-on{background:var(--klar-accent);color:var(--klar-on-accent);',
    'border-color:var(--klar-accent)}',
    '.klar-item{display:flex;gap:16px;justify-content:space-between;align-items:flex-start;',
    'padding:14px 0;border-bottom:1px solid var(--klar-line)}',
    '.klar-item h4{margin:0 0 4px;font-size:1rem}',
    '.klar-item p{margin:0;font-size:.875rem;color:var(--klar-muted)}',
    '.klar-side{display:flex;align-items:center;gap:12px;flex-shrink:0}',
    '.klar-price{font-variant-numeric:tabular-nums;white-space:nowrap}',
    '.klar-add,.klar-btn{padding:9px 16px;border:0;border-radius:var(--klar-radius);',
    'background:var(--klar-accent);color:var(--klar-on-accent);cursor:pointer;font:inherit;',
    'font-weight:600}',
    '.klar-btn[disabled],.klar-add[disabled]{opacity:.55;cursor:default}',
    '.klar-btn-full{display:block;width:100%;margin-top:16px}',
    '.klar-cart{margin-top:22px;padding:18px;border:1px solid var(--klar-line);',
    'border-radius:var(--klar-radius)}',
    '.klar-cart h3{margin:0 0 12px;font-size:1rem}',
    '.klar-line{display:flex;align-items:center;gap:10px;justify-content:space-between;',
    'padding:8px 0}',
    '.klar-ln{flex:1 1 auto}.klar-lp{font-variant-numeric:tabular-nums;white-space:nowrap}',
    '.klar-qty{display:flex;align-items:center;gap:8px}',
    '.klar-qty button{width:30px;height:30px;border:1px solid var(--klar-line);background:',
    'transparent;border-radius:8px;cursor:pointer;font:inherit;color:inherit;line-height:1}',
    '.klar-seg{display:flex;gap:8px;margin:14px 0}',
    '.klar-only-ful{margin:14px 0 0;font-size:.85rem;color:var(--klar-muted)}',
    '.klar-seg button{flex:1;padding:10px;border:1px solid var(--klar-line);background:',
    'transparent;border-radius:var(--klar-radius);cursor:pointer;font:inherit;color:inherit}',
    '.klar-seg button.klar-on{background:var(--klar-accent);color:var(--klar-on-accent);',
    'border-color:var(--klar-accent)}',
    '.klar-field{margin:12px 0}',
    /* The Art 9 consent row: a normal-case, wrapping paragraph beside a
       checkbox, deliberately unlike the uppercase field labels above — it is
       wording to be read, not a caption to be skimmed. */
    '.klar-consent{display:flex;align-items:flex-start;gap:8px;margin-top:8px;',
    'font-size:.75rem;line-height:1.45;text-transform:none;letter-spacing:0;',
    'font-weight:400;cursor:pointer}',
    '.klar-consent input{width:auto;margin-top:2px;flex:0 0 auto}',
    '.klar-consent[hidden]{display:none}',
    '.klar-field label{display:block;font-size:.75rem;text-transform:uppercase;',
    'letter-spacing:.08em;margin-bottom:6px;color:var(--klar-muted)}',
    '.klar-field input,.klar-field select,.klar-field textarea{width:100%;padding:11px 12px;',
    'border:1px solid var(--klar-line);border-radius:var(--klar-radius);font:inherit;',
    'background:transparent;color:inherit}',
    '.klar-total{display:flex;justify-content:space-between;align-items:baseline;',
    'margin-top:14px;font-weight:700}',
    '.klar-tv{font-size:1.25rem;font-variant-numeric:tabular-nums}',
    '.klar-slots{display:flex;flex-wrap:wrap;gap:8px;min-height:42px;align-items:center}',
    '.klar-slots button{padding:9px 14px;border:1px solid var(--klar-line);background:',
    'transparent;border-radius:var(--klar-radius);cursor:pointer;font:inherit;color:inherit}',
    '.klar-slots button.klar-on{background:var(--klar-accent);color:var(--klar-on-accent);',
    'border-color:var(--klar-accent)}',
    '.klar-slots button[disabled]{opacity:.35;cursor:default;text-decoration:line-through}',
    '.klar-muted{color:var(--klar-muted);font-size:.9rem}',
    '.klar-err{margin:12px 0 0;color:#a3341f;font-size:.9rem}',
    /* "We are shut" is a fact about the restaurant, not the guest's mistake, so
       it is deliberately NOT the red of .klar-err — it is a plain, calm notice
       that still has to be impossible to miss above a menu. */
    /* No background colour: the host site sets its own ground and this embed
       has no token for it. Border and padding carry the notice everywhere. */
    '.klar-closed{margin:0 0 16px;padding:12px 14px;border:1px solid var(--klar-line);' +
      'border-radius:var(--klar-radius);font-size:.92rem;line-height:1.45}',
    '.klar-note{margin:10px 0 0;font-size:.78rem;color:var(--klar-muted)}',
    '.klar-ok{text-align:center;padding:26px 0}',
    '.klar-check{font-size:2rem;line-height:1}',
    '.klar-big{font-size:1.5rem;font-weight:700;margin:10px 0}',
    '.klar-unavailable{padding:22px;border:1px solid var(--klar-line);',
    'border-radius:var(--klar-radius);text-align:center}'
  ].join('');

  var stylesInjected = false;
  function injectStyles(doc) {
    if (stylesInjected) return;
    stylesInjected = true;
    var style = doc.createElement('style');
    style.setAttribute('data-klar-embed', 'styles');
    style.textContent = CSS;
    (doc.head || doc.documentElement).appendChild(style);
  }

  /* -------------------------------------------------------------- helpers --- */

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function money(cents, currency) {
    var amount = (cents / 100).toFixed(2);
    /* Finnish sites read a comma; everything else keeps the dot. */
    if (currency === 'EUR' || currency == null) return amount.replace('.', ',') + ' €';
    return amount + ' ' + currency;
  }

  function hhmm(value) {
    return String(value || '').slice(0, 5);
  }

  function warn(message, detail) {
    /* Every dark surface says why, in the console, with the slug in the text —
     * "it just doesn't show up" is the failure this prevents. */
    if (typeof console !== 'undefined' && console.error) {
      if (detail === undefined) console.error('[klar-embed] ' + message);
      else console.error('[klar-embed] ' + message, detail);
    }
  }

  function todayIn(timezone) {
    /* 'sv-SE' formats as YYYY-MM-DD. The API rejects a past date in the
     * restaurant's timezone, not the visitor's. */
    return new Date().toLocaleDateString('sv-SE', { timeZone: timezone });
  }

  function plusDays(iso, days) {
    var d = new Date(iso + 'T12:00:00Z');
    d.setUTCDate(d.getUTCDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function newKey() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return 'klar-' + Date.now() + '-' + Math.random().toString(16).slice(2);
  }

  function readJson(response) {
    return response
      .json()
      .catch(function () {
        return {};
      })
      .then(function (body) {
        return { ok: response.ok, status: response.status, body: body || {} };
      });
  }

  /* ---------------------------------------------------------------- config --- */

  function defaultApi(loc) {
    var host = loc && loc.hostname;

    /* Served BY Klar rather than copied into the site: the origin that handed
     * out this file is the API that answers for it. This is what makes the
     * hosted two-line install work on a preview deployment and on any future
     * booking host without the owner editing the snippet — the alternative,
     * a baked-in production hostname, means a preview page silently calls
     * production and nothing about the wiring can be tested before it is live.
     *
     * Only when the script came from ANOTHER origin. A file copied into the
     * site is same-origin with the page, and its origin says nothing about
     * where the API is — those installs fall through to the rules below, which
     * is exactly the behaviour they have always had. */
    if (SCRIPT_ORIGIN && loc && loc.origin && SCRIPT_ORIGIN !== loc.origin) {
      return SCRIPT_ORIGIN;
    }

    /* Served from localhost the calls point at a local booking app on :3001,
     * which is also the only origin the API's CORS allowlist accepts outside
     * production. */
    return host === 'localhost' || host === '127.0.0.1' ? LOCAL_API : DEFAULT_API;
  }

  function readConfig(mount, loc) {
    var data = mount.dataset || {};
    var slug = (data.klarSlug || '').trim();
    var surfaces = (data.klarSurfaces || 'order book').toLowerCase();
    var locale = (data.klarLocale || 'fi').toLowerCase();
    var partyMax = parseInt(data.klarPartyMax || '', 10);
    return {
      orderSlug: (data.klarOrderSlug || slug).trim(),
      bookSlug: (data.klarBookSlug || slug).trim(),
      order: surfaces.indexOf('order') !== -1,
      book: surfaces.indexOf('book') !== -1,
      /* "host" = the page already renders the menu; the embed contributes the
         cart and checkout only. Anything else keeps the embed's own list. */
      hostMenu: (data.klarMenu || '').trim().toLowerCase() === 'host',
      api: (data.klarApi || defaultApi(loc)).replace(/\/$/, ''),
      phone: (data.klarPhone || '').trim(),
      /* Where the host site's privacy notice lives (data-klar-privacy-url,
         e.g. "/fi/tietosuoja"). The checkout collects a name, a phone, an
         email and on delivery a street address, and the notice that says what
         happens to them is the SITE's — the embed does not know the site's
         routes, so the host names it. Empty = no line, never a guessed path. */
      privacyUrl: (data.klarPrivacyUrl || '').trim(),
      timezone: (data.klarTimezone || 'Europe/Helsinki').trim(),
      partyMax: partyMax > 0 ? partyMax : PARTY_MAX_DEFAULT,
      copy: COPY[locale] || COPY.fi,
      locale: COPY[locale] ? locale : 'fi'
    };
  }

  /* ------------------------------------------------------------ the surface --- */

  function mountKlar(mount, win) {
    var doc = mount.ownerDocument;
    var cfg = readConfig(mount, win.location);
    var t = cfg.copy;

    injectStyles(doc);
    mount.classList.add('klar-embed');
    if (cfg.hostMenu) mount.classList.add('klar-host-menu');

    /* The host-menu contract. Bubbling so a host can listen on document rather
     * than having to find the mount element it did not render itself. */
    function emit(name, detail) {
      try {
        mount.dispatchEvent(new win.CustomEvent(name, { detail: detail, bubbles: true }));
      } catch (error) {
        warn('could not dispatch ' + name + '.', error);
      }
    }

    function callUs() {
      return cfg.phone ? ' ' + t.callUs + ' ' + cfg.phone + '.' : '';
    }

    function unavailable(message) {
      mount.innerHTML =
        '<div class="klar-unavailable"><p class="klar-muted">' +
        esc(message + callUs()) +
        '</p></div>';
    }

    if (!cfg.orderSlug && !cfg.bookSlug) {
      warn('mount has no data-klar-slug — nothing to fetch.', mount);
      unavailable(t.generic);
      return;
    }
    if (!cfg.order && !cfg.book) {
      warn('data-klar-surfaces "' + (mount.dataset.klarSurfaces || '') + '" enables neither surface.');
      unavailable(t.generic);
      return;
    }

    /* ---- shell ---- */
    var showTabs = cfg.order && cfg.book;
    mount.innerHTML =
      (showTabs
        ? '<div class="klar-tabs">' +
          '<button type="button" class="klar-on" data-klar-tab="order">' + esc(t.tabOrder) + '</button>' +
          '<button type="button" data-klar-tab="book">' + esc(t.tabBook) + '</button>' +
          '</div>'
        : '') +
      (cfg.order
        ? '<div class="klar-panel klar-on" data-klar-panel="order">' +
          '<div data-klar="order-live">' +
          '<div class="klar-cats" data-klar="cats" hidden></div>' +
          /* In host-menu mode the page is already showing the menu, so this
             slot starts empty and hidden. It is un-hidden only to carry the
             fail-closed "call us" panel. */
          (cfg.hostMenu
            ? '<div data-klar="items" hidden></div>'
            : '<div data-klar="items"><p class="klar-muted">' + esc(t.menuLoading) + '</p></div>') +
          '<div class="klar-cart" data-klar="cart"></div>' +
          '</div><div data-klar="order-ok" class="klar-ok" hidden></div></div>'
        : '') +
      (cfg.book
        ? '<div class="klar-panel' + (cfg.order ? '' : ' klar-on') + '" data-klar-panel="book">' +
          '<div data-klar="book-live">' +
          '<div class="klar-field"><label>' + esc(t.date) + '</label>' +
          '<input type="date" data-klar="date"></div>' +
          '<div class="klar-field"><label>' + esc(t.party) + '</label>' +
          '<select data-klar="party"></select>' +
          /* What a large party will be asked to pay. Rendered under the size
             picker rather than by the button, because it is the size that
             decides it and the guest is looking here when they choose. Empty
             and hidden for every venue and every party that owes nothing. */
          '<p class="klar-note" data-klar="deposit-note" hidden></p></div>' +
          '<div class="klar-field"><label>' + esc(t.time) + '</label>' +
          '<div class="klar-slots" data-klar="slots"></div></div>' +
          '<div class="klar-field"><label>' + esc(t.name) + '</label>' +
          '<input type="text" autocomplete="name" data-klar="bname"></div>' +
          '<div class="klar-field"><label>' + esc(t.phone) + '</label>' +
          '<input type="tel" autocomplete="tel" data-klar="bphone"></div>' +
          '<div class="klar-field"><label>' + esc(t.email) + '</label>' +
          '<input type="email" autocomplete="email" data-klar="bemail"></div>' +
          '<div class="klar-field"><label>' + esc(t.requests) + '</label>' +
          '<textarea rows="2" data-klar="breq" placeholder="' + esc(t.requestsPlaceholder) + '"></textarea></div>' +
          /* The allergy field and its own consent tick, split from the requests
             box above for GDPR Art 9(2)(a): consent has to be specific to the
             health data, and a single box cannot tell "no nuts" from "high
             chair". The tick is hidden until the field has something in it, so
             a guest asking for a high chair is never asked to consent to
             health processing. The server refuses the write without it. */
          '<div class="klar-field"><label>' + esc(t.dietary) + '</label>' +
          '<textarea rows="2" data-klar="bdiet" placeholder="' + esc(t.dietaryPlaceholder) + '"></textarea>' +
          '<label class="klar-consent" data-klar="bdiet-consent-row" hidden>' +
          '<input type="checkbox" data-klar="bdiet-consent">' +
          '<span>' + esc(t.dietaryConsent) + '</span></label></div>' +
          '<p class="klar-err" data-klar="book-err" hidden></p>' +
          '<button type="button" class="klar-btn klar-btn-full" data-klar="book-submit">' +
          esc(t.book) + '</button>' +
          '</div><div data-klar="book-ok" class="klar-ok" hidden></div></div>'
        : '');

    function el(name) {
      return mount.querySelector('[data-klar="' + name + '"]');
    }

    if (showTabs) {
      var tabs = mount.querySelector('.klar-tabs');
      tabs.addEventListener('click', function (event) {
        var button = event.target.closest('button[data-klar-tab]');
        if (!button) return;
        var wanted = button.dataset.klarTab;
        tabs.querySelectorAll('button').forEach(function (other) {
          other.classList.toggle('klar-on', other === button);
        });
        mount.querySelectorAll('[data-klar-panel]').forEach(function (panel) {
          panel.classList.toggle('klar-on', panel.dataset.klarPanel === wanted);
        });
      });
    }

    /* ================================ ORDER ================================ */

    var catsWrap = el('cats');
    var itemsWrap = el('items');
    var cartWrap = el('cart');
    var categories = [];
    var activeCat = 0;
    var allowsEatIn = true;
    /* Whether a guest placing an order here will be sent to Stripe. The basket
       is drawn BEFORE any order exists, so it cannot read this off the order
       response — GET /menu carries it as `client.onlinePayment`, both halves of
       it (Stripe's charges_enabled AND the venue's own online_payment_enabled),
       the same pair POST /order prices against. `=== true` is the point: an
       older API names no such field, and a payment the payload did not state is
       one this embed must not announce. */
    var onlinePayment = false;
    var currency = 'EUR';
    var cart = [];
    var fulfilment = 'eat_in';
    var checkoutKey = null;
    var sending = false;
    var orderName = '';
    var orderPhone = '';
    var orderErr = '';
    /* The tenant's delivery offer as `GET /menu` publishes it on
       `client.delivery` — { feeCents, minOrderCents, postalCodes } — or null.
       Null is "no third button": an older API that names no such block, an
       `enabled` that is anything but true, or a block with no fee or no
       postcodes all land here, because a fee with no area or an area with no
       fee is not an offer a guest can act on. The server re-checks every one
       of these on POST /order and prices the fee itself; this is only what the
       guest is shown, and when. */
    var delivery = null;
    var deliveryStreet = '';
    var deliveryPostcode = '';
    var deliveryCity = '';
    var deliveryNote = '';
    /* Kept so klar:sync can replay them to a host that mounted late. */
    var lastMenu = null;
    var lastCart = null;

    /* The kitchen's window, as `GET /menu` publishes it on `client.ordering`.
     *
     * WHY THIS IS READ AT ALL. The API has refused orders outside opening hours
     * since 2026-09-03, and this embed did not read the answer — so a guest on a
     * closed day got every add button, built a whole basket, pressed send, and
     * only then met a 400. Worse, `ORDERING_CLOSED` was not in `t.codes`, so the
     * refusal fell through to `generic` and told them the CONNECTION had failed.
     * A customer standing in the shop was informed the internet was broken.
     *
     * IT FAILS OPEN, matching the server. Null here means "nothing we read
     * refuses this" — a legacy payload with no `ordering` key, or an older API,
     * must not lose the restaurant its ordering. Only an explicit
     * `open === false` closes the surface. The server is still the enforcement;
     * this is only what the guest is told, and when.
     */
    var ordering = null;

    function orderingClosed() {
      return !!ordering && ordering.open === false;
    }

    /* The sentence a guest reads, built from the reason the server gave rather
     * than from `body.error` — the API writes that string in English and this
     * embed renders in the site's own language. Same rule as `t.codes`. */
    function orderingClosedText() {
      if (!orderingClosed()) return '';
      var reason = ordering.reason;
      if (reason === 'closed_day') return t.closedDay;
      if (reason === 'closed_date') return t.closedDate;
      if (reason === 'before_open' && ordering.opensAt) {
        return t.beforeOpen.replace('{time}', ordering.opensAt);
      }
      if (reason === 'after_last_order' && ordering.lastOrderTime) {
        return t.afterLastOrder.replace('{time}', ordering.lastOrderTime);
      }
      return t.closedNow;
    }

    function lineFor(id) {
      for (var i = 0; i < cart.length; i++) if (cart[i].id === id) return cart[i];
      return null;
    }

    function itemById(id) {
      for (var c = 0; c < categories.length; c++) {
        for (var i = 0; i < categories[c].items.length; i++) {
          if (categories[c].items[i].id === id) return categories[c].items[i];
        }
      }
      return null;
    }

    function renderItems() {
      if (cfg.hostMenu) return;
      var category = categories[activeCat];
      if (!category) return;
      /* The menu and its prices STAY on the page when the kitchen is shut —
         a closed restaurant still wants to be read. Only the ordering
         affordance goes, and the notice says why. */
      var shut = orderingClosed();
      itemsWrap.innerHTML =
        (shut ? '<p class="klar-closed">' + esc(orderingClosedText()) + '</p>' : '') +
        category.items
        .map(function (item) {
          var line = lineFor(item.id);
          var qty = line ? line.qty : 0;
          var disabled = item.available === false;
          return (
            '<div class="klar-item"><div><h4>' + esc(item.name) + '</h4>' +
            (item.description ? '<p>' + esc(item.description) + '</p>' : '') +
            '</div><div class="klar-side"><span class="klar-price">' +
            esc(money(item.priceCents, item.currency || currency)) + '</span>' +
            /* No button at all when the kitchen is shut, rather than a disabled
               one: a greyed control still reads as "this will work if I press
               it right", and the notice above has already said it will not. */
            (shut
              ? ''
              : '<button type="button" class="klar-add" data-klar-add="' + esc(item.id) + '"' +
                (disabled ? ' disabled' : '') + '>' +
                (qty > 0 ? esc(t.addMore) + ' · ' + qty : esc(t.add)) +
                '</button>') +
            '</div></div>'
          );
        })
        .join('');
    }

    function renderCart() {
      if (!cartWrap) return;
      var count = cart.reduce(function (sum, line) { return sum + line.qty; }, 0);
      var total = cart.reduce(function (sum, line) { return sum + line.cents * line.qty; }, 0);
      /* `delivery` is nulled by menuLoaded when the offer is off, and
         `fulfilment` is moved off 'delivery' in the same breath, so the two
         cannot disagree here. */
      var isDelivery = fulfilment === 'delivery' && !!delivery;
      var feeCents = isDelivery ? delivery.feeCents : 0;
      var minimumNote =
        isDelivery && delivery.minOrderCents > 0
          ? (total < delivery.minOrderCents ? t.belowMinimum : t.minimumHint).replace(
              '{eur}',
              money(delivery.minOrderCents, currency)
            )
          : '';
      lastCart = {
        lines: cart.map(function (line) {
          return { id: line.id, name: line.name, cents: line.cents, qty: line.qty };
        }),
        count: count,
        totalCents: total,
        currency: currency
      };
      emit('klar:cart', lastCart);
      /* Shut. In host-menu mode this IS the whole surface, so the notice has to
         live here too — the host's own rows are outside this embed's reach and
         it learns the state from `klar:menu`. Anything already in the basket
         stays listed, because telling someone their choices vanished is a
         second bad surprise; only the checkout goes. */
      if (orderingClosed()) {
        cartWrap.innerHTML =
          '<h3>' + esc(t.cartTitle) + '</h3>' +
          '<p class="klar-closed">' + esc(orderingClosedText()) + callUs() + '</p>' +
          (cart.length
            ? cart
                .map(function (line) {
                  return (
                    '<div class="klar-line"><span class="klar-ln">' + esc(line.name) +
                    '</span><span class="klar-qty">' + line.qty + '</span>' +
                    '<span class="klar-lp">' +
                    esc(money(line.cents * line.qty, currency)) + '</span></div>'
                  );
                })
                .join('')
            : '');
        return;
      }
      if (cart.length === 0) {
        cartWrap.innerHTML =
          '<h3>' + esc(t.cartTitle) + '</h3><p class="klar-muted">' + esc(t.cartEmpty) + '</p>';
        return;
      }
      cartWrap.innerHTML =
        '<h3>' + esc(t.cartTitle) + ' · ' + count + '</h3>' +
        cart
          .map(function (line) {
            return (
              '<div class="klar-line"><span class="klar-ln">' + esc(line.name) + '</span>' +
              '<span class="klar-qty">' +
              '<button type="button" data-klar-qty="' + esc(line.id) + '" data-klar-to="' +
              (line.qty - 1) + '" aria-label="-">−</button><span>' + line.qty + '</span>' +
              '<button type="button" data-klar-qty="' + esc(line.id) + '" data-klar-to="' +
              (line.qty + 1) + '" aria-label="+">+</button></span>' +
              '<span class="klar-lp">' + esc(money(line.cents * line.qty, currency)) + '</span></div>'
            );
          })
          .join('') +
        /* A takeaway-only restaurant has nothing to choose between. Rendering
           the one option as a button made it look like a second call to action
           sitting above the real one — so a single option states itself. The
           delivery button exists only while `delivery` is non-null. */
        (allowsEatIn || delivery
          ? '<div class="klar-seg">' +
            (allowsEatIn
              ? '<button type="button" data-klar-ful="eat_in" class="' +
                (fulfilment === 'eat_in' ? 'klar-on' : '') + '">' + esc(t.eatIn) + '</button>'
              : '') +
            '<button type="button" data-klar-ful="takeaway" class="' +
            (fulfilment === 'takeaway' ? 'klar-on' : '') + '">' + esc(t.takeaway) + '</button>' +
            (delivery
              ? '<button type="button" data-klar-ful="delivery" class="' +
                (fulfilment === 'delivery' ? 'klar-on' : '') + '">' + esc(t.delivery) + '</button>'
              : '') +
            '</div>'
          : '<p class="klar-only-ful">' + esc(t.takeaway) + '</p>') +
        /* Where the food goes — drawn only under the delivery choice, and the
           values kept in state so a quantity change (which redraws the basket)
           does not wipe a half-typed address. */
        (isDelivery
          ? '<div class="klar-field"><label>' + esc(t.street) + '</label>' +
            '<input type="text" autocomplete="street-address" data-klar="dstreet" value="' +
            esc(deliveryStreet) + '"></div>' +
            '<div class="klar-field"><label>' + esc(t.postcode) + '</label>' +
            '<input type="text" inputmode="numeric" autocomplete="postal-code" data-klar="dpostcode" value="' +
            esc(deliveryPostcode) + '">' +
            '<p class="klar-note">' + esc(t.deliversTo.replace('{codes}', delivery.postalCodes.join(', '))) + '</p></div>' +
            '<div class="klar-field"><label>' + esc(t.city) + '</label>' +
            '<input type="text" autocomplete="address-level2" data-klar="dcity" value="' +
            esc(deliveryCity) + '"></div>' +
            '<div class="klar-field"><label>' + esc(t.deliveryNote) + ' ' + esc(t.optional) + '</label>' +
            '<input type="text" data-klar="dnote" maxlength="200" placeholder="' +
            esc(t.deliveryNotePlaceholder) + '" value="' + esc(deliveryNote) + '"></div>'
          : '') +
        '<div class="klar-field"><label>' + esc(t.name) + '</label>' +
        '<input type="text" autocomplete="name" data-klar="oname" placeholder="' +
        esc(t.namePlaceholder) + '" value="' + esc(orderName) + '"></div>' +
        '<div class="klar-field"><label>' + esc(t.phone) + ' ' + esc(t.optional) + '</label>' +
        '<input type="tel" autocomplete="tel" data-klar="ophone" value="' + esc(orderPhone) + '"></div>' +
        /* Three lines on a delivery order, one otherwise: the guest pays food
           plus fee, and a total that quietly grew is the complaint this avoids.
           The fee is the tenant's own number off GET /menu; the server prices
           the order again from the same row. */
        (isDelivery
          ? '<div class="klar-line"><span class="klar-ln klar-muted">' + esc(t.subtotal) + '</span>' +
            '<span class="klar-lp">' + esc(money(total, currency)) + '</span></div>' +
            '<div class="klar-line"><span class="klar-ln klar-muted">' + esc(t.deliveryFee) + '</span>' +
            '<span class="klar-lp">' + esc(money(delivery.feeCents, currency)) + '</span></div>'
          : '') +
        '<div class="klar-total"><span class="klar-muted">' + esc(t.total) + '</span>' +
        '<span class="klar-tv">' + esc(money(total + feeCents, currency)) + '</span></div>' +
        /* The minimum, stated before the guest presses send — against the FOOD
           total, never the total with the fee in it, the same comparison the
           server makes. Skipped when the submit error already says the same. */
        (minimumNote && minimumNote !== orderErr
          ? '<p class="klar-note">' + esc(minimumNote) + '</p>'
          : '') +
        (orderErr ? '<p class="klar-err">' + esc(orderErr) + '</p>' : '') +
        '<button type="button" class="klar-btn klar-btn-full" data-klar="order-submit"' +
        (sending ? ' disabled' : '') + '>' + esc(sending ? t.sending : t.send) + '</button>' +
        '<p class="klar-note">' + esc(onlinePayment ? t.payOnline : t.payAtVenue) + '</p>' +
        /* The privacy line, when the host site named its notice. It sits under
           the button the guest is about to press because that is the moment
           the name, phone, email and address they typed leave the page. The
           URL is the host's own attribute, escaped like every other value. */
        (cfg.privacyUrl
          ? '<p class="klar-note">' +
            esc(t.privacyNotice).replace(
              '{link}',
              '<a href="' + esc(cfg.privacyUrl) + '" target="_blank" rel="noopener noreferrer">' +
                esc(t.privacyLink) + '</a>'
            ) +
            '</p>'
          : '');
    }

    /* Any change to what is being ordered starts a new checkout attempt: an
     * Idempotency-Key must never be reused for a different order (the API 409s). */
    function cartChanged() {
      checkoutKey = null;
    }

    function menuLoaded(data) {
      categories = (data.categories || []).filter(function (c) {
        return (c.items || []).length > 0;
      });
      /* A dish with no category is still a dish for sale.
       *
       * `GET /menu` returns TWO lists — `categories` and `uncategorised` — and
       * this read only ever looked at the first. The owner's menu editor does
       * not require a category, so a restaurant that signs up and adds its food
       * the obvious way publishes a menu its own admin screen renders in full,
       * while every guest on its website is told "Verkkotilaus ei ole juuri nyt
       * kaytossa" and handed a phone number. Measured end to end on a fresh
       * signup 2026-09-08: two dishes on sale, zero reachable, ordering dead.
       *
       * Appended LAST, so a restaurant that does use categories sees no change
       * in order; a restaurant that uses none gets a single plain list, which
       * is the shape a small takeaway menu wants anyway. */
      var loose = (data.uncategorised || []).filter(Boolean);
      if (loose.length > 0) {
        categories = categories.concat([{ id: null, name: t.menuGroup, items: loose }]);
      }
      allowsEatIn = data.client ? data.client.allowsEatIn !== false : true;
      if (!allowsEatIn) fulfilment = 'takeaway';
      onlinePayment = !!(data.client && data.client.onlinePayment === true);
      /* `enabled === true` on purpose, like onlinePayment: an offer the payload
         did not state is one this embed must not draw a button for. */
      var offer = data.client && data.client.delivery;
      delivery =
        offer &&
        offer.enabled === true &&
        typeof offer.feeCents === 'number' &&
        Array.isArray(offer.postalCodes) &&
        offer.postalCodes.length > 0
          ? {
              feeCents: offer.feeCents,
              minOrderCents: typeof offer.minOrderCents === 'number' ? offer.minOrderCents : 0,
              postalCodes: offer.postalCodes.map(String)
            }
          : null;
      if (!delivery && fulfilment === 'delivery') fulfilment = allowsEatIn ? 'eat_in' : 'takeaway';
      var first = categories[0] && categories[0].items[0];
      if (first && first.currency) currency = first.currency;
      if (categories.length === 0) {
        warn('menu for "' + cfg.orderSlug + '" has no orderable categories.');
        itemsWrap.hidden = false;
        itemsWrap.innerHTML = '<p class="klar-muted">' + esc(t.orderingOff + callUs()) + '</p>';
        if (cartWrap) cartWrap.hidden = true;
        emit('klar:menu-failed', { reason: 'empty' });
        return;
      }
      /* The kitchen's window, before anything renders — `renderItems` and
         `renderCart` both branch on it. Absent means open, per `ordering`'s
         fail-open contract above. */
      ordering = (data.client && data.client.ordering) || null;
      lastMenu = {
        categories: categories,
        currency: currency,
        allowsEatIn: allowsEatIn,
        /* Hoisted out of `client` so a host menu has one documented place to
           read it. Roba Deli's own ruokalista carries the order buttons in
           host-menu mode, and they are outside this embed's reach — this event
           is the only way it learns the shop is shut. */
        ordering: ordering,
        client: data.client || null
      };
      emit('klar:menu', lastMenu);
      if (cfg.hostMenu) {
        renderCart();
        return;
      }
      catsWrap.hidden = false;
      catsWrap.innerHTML = categories
        .map(function (category, index) {
          return (
            '<button type="button" class="' + (index === 0 ? 'klar-on' : '') +
            '" data-klar-cat="' + index + '">' + esc(category.name) + '</button>'
          );
        })
        .join('');
      renderItems();
      renderCart();
    }

    function loadMenu() {
      win
        .fetch(cfg.api + '/api/' + encodeURIComponent(cfg.orderSlug) + '/menu', {
          headers: { Accept: 'application/json' }
        })
        .then(function (response) {
          if (!response.ok) throw new Error('menu ' + response.status);
          return response.json();
        })
        .then(menuLoaded)
        .catch(function (error) {
          /* A 404 here is the ordinary "this slug is not provisioned for
           * ordering" answer; a TypeError is the browser refusing to read a
           * cross-origin response the allowlist did not cover. Both are dark
           * surfaces, so both say so out loud. */
          warn(
            'menu request failed for ordering slug "' + cfg.orderSlug + '" at ' + cfg.api +
              ' — the surface stays unavailable.',
            error
          );
          if (catsWrap) catsWrap.hidden = true;
          /* Host-menu mode keeps this slot hidden while things work; the
             fail-closed panel is the one thing it must still show. */
          itemsWrap.hidden = false;
          itemsWrap.innerHTML =
            '<p class="klar-muted">' +
            esc((/ 404$/.test(error.message) ? t.orderingOff : t.menuFailed) + callUs()) +
            '</p>';
          if (cartWrap) cartWrap.hidden = true;
          emit('klar:menu-failed', { reason: error && error.message ? error.message : 'failed' });
        });
    }

    /* Online payment. The order API answers a placed order with
       `payment.checkoutUrl` when — and only when — the restaurant has both
       switched online payment on and had Stripe accept charges on its account.
       Until both are true the field is absent and this does nothing, so it is
       safe to ship long before any restaurant switches over.

       THE ORDER IS ALREADY PLACED WHEN WE GET HERE, by design: the kitchen has
       it before payment is offered, so a Stripe outage or a guest who closes the
       tab costs nobody their dinner — it leaves a placed order paid at the
       counter, exactly as every order works today. Never a gate in front of
       ordering, and a failure to reach Stripe must never look like a failed
       order.

       CALLED AFTER showOrderOk, DELIBERATELY — that call clears the basket and
       shows the confirmation, so by the time the browser leaves there is no live
       cart behind us and a guest who abandons the payment or presses Back does
       not find a basket inviting them to order the same food twice.

       THE URL IS CHECKED BEFORE WE NAVIGATE. It arrives from a network response,
       and sending a guest's browser wherever a response says to go is an open
       redirect. Stripe-hosted checkout is this feature's only destination, so
       anything else is dropped and the guest pays in the restaurant. */
    function stripeCheckoutUrl(payment) {
      if (!payment || typeof payment.checkoutUrl !== 'string') return '';
      var url;
      try { url = new URL(payment.checkoutUrl); } catch (error) { return ''; }
      if (url.protocol !== 'https:') return '';
      /* Exact host, or a subdomain of it — never a suffix match on the string,
         which would accept `checkout.stripe.com.example.net`. */
      if (url.hostname !== 'stripe.com' && url.hostname.slice(-11) !== '.stripe.com') return '';
      return url.href;
    }

    function goToPayment(payment) {
      var url = stripeCheckoutUrl(payment);
      if (!url) return;
      try { window.location.assign(url); } catch (error) { /* the order stands either way */ }
    }

    function showOrderOk(order) {
      var reference = order.orderId ? String(order.orderId).slice(0, 6).toUpperCase() : '';
      el('order-live').hidden = true;
      var ok = el('order-ok');
      ok.hidden = false;
      ok.innerHTML =
        '<div class="klar-check">✓</div><h3>' + esc(t.orderOk) + '</h3>' +
        (reference ? '<p class="klar-muted">' + esc(t.reference) + ' <b>' + esc(reference) + '</b></p>' : '') +
        /* The figure the guest pays: food plus the delivery fee minus any gift
           card, which is `amountDueCents`. `totalCents` is food only, and a
           delivery guest who saw 24,90 € in the basket was shown 20,00 € here
           (measured 2026-09-13). Older payloads without amountDueCents keep
           the food total. */
        (typeof order.amountDueCents === 'number'
          ? '<div class="klar-big">' + esc(money(order.amountDueCents, order.currency || currency)) + '</div>'
          : typeof order.totalCents === 'number'
          ? '<div class="klar-big">' + esc(money(order.totalCents, order.currency || currency)) + '</div>'
          : '') +
        /* These two name the room even where `onlinePayment` is true, and that
           is deliberate rather than an oversight. This embed keeps no order in
           storage, so the confirmation exists only during the visit the order
           was placed in — and when a card page was offered, goToPayment has
           already taken the browser to Stripe. A guest who is still here to
           read this is therefore a guest who did NOT reach a card page: the
           venue takes no online payment, or the redirect was refused or threw.
           In every one of those cases they pay in the room, so driving this off
           the venue's switch would promise a card payment to exactly the guest
           who has no way to make one. The basket note above is the one that
           follows the switch. */
        '<p class="klar-muted">' +
        esc(fulfilment === 'delivery' ? t.deliver : fulfilment === 'takeaway' ? t.collect : t.table) +
        '</p>' +
        '<button type="button" class="klar-btn" data-klar="order-again" style="margin-top:20px">' +
        esc(t.orderAgain) + '</button>';
      cart = [];
      orderName = '';
      orderPhone = '';
      deliveryStreet = '';
      deliveryPostcode = '';
      deliveryCity = '';
      deliveryNote = '';
      orderErr = '';
      checkoutKey = null;
      renderItems();
      renderCart();
      el('order-again').addEventListener('click', function () {
        ok.hidden = true;
        el('order-live').hidden = false;
      });
    }

    function placeOrder() {
      if (sending) return;
      /* A refusal from the previous press must not outlive the guest's
         correction: measured 2026-09-13, a postcode typed wrong once kept its
         "we do not deliver to 00900" line after it was fixed to 00120, and the
         order could not be placed until the page was reloaded. */
      orderErr = '';
      if (!orderName.trim()) {
        orderErr = t.needName;
        renderCart();
        return;
      }
      /* The delivery arm, checked here so the guest is told which part to
         change instead of being handed the API's English refusal. POST /order
         re-checks all of it against the tenant row — this shortens the loop,
         it does not own the rule. The postcode loses its inner spaces the way
         normalisePostalCode does server-side, so "00 100" is sent as "00100". */
      var address = null;
      if (fulfilment === 'delivery') {
        if (!delivery) {
          orderErr = t.codes.DELIVERY_UNAVAILABLE;
          renderCart();
          return;
        }
        address = {
          deliveryStreet: deliveryStreet.trim(),
          deliveryPostalCode: deliveryPostcode.replace(/\s+/g, ''),
          deliveryCity: deliveryCity.trim()
        };
        if (deliveryNote.trim()) address.deliveryNote = deliveryNote.trim();
        var foodTotal = cart.reduce(function (sum, line) { return sum + line.cents * line.qty; }, 0);
        if (!address.deliveryStreet || !address.deliveryPostalCode || !address.deliveryCity) {
          orderErr = t.missingAddress;
        } else if (!/^\d{5}$/.test(address.deliveryPostalCode)) {
          orderErr = t.badPostcode;
        } else if (delivery.postalCodes.indexOf(address.deliveryPostalCode) === -1) {
          orderErr =
            t.unservedPostcode.replace('{code}', address.deliveryPostalCode) + ' ' +
            t.deliversTo.replace('{codes}', delivery.postalCodes.join(', '));
        } else if (delivery.minOrderCents > 0 && foodTotal < delivery.minOrderCents) {
          orderErr = t.belowMinimum.replace('{eur}', money(delivery.minOrderCents, currency));
        }
        if (orderErr) {
          renderCart();
          return;
        }
      }
      orderErr = '';
      sending = true;
      renderCart();
      if (!checkoutKey) checkoutKey = newKey();
      /* The address travels ONLY on the delivery arm. The DB constraint
         orders_fulfilment_fields refuses an address on a takeaway row, so
         carrying one over from an abandoned delivery choice would 400 a valid
         order. */
      var payload = {
        guestName: orderName.trim(),
        guestPhone: orderPhone.trim() || undefined,
        fulfilmentType: fulfilment,
        items: cart.map(function (line) {
          return { menuItemId: line.id, qty: line.qty };
        })
      };
      if (address) {
        payload.deliveryStreet = address.deliveryStreet;
        payload.deliveryPostalCode = address.deliveryPostalCode;
        payload.deliveryCity = address.deliveryCity;
        if (address.deliveryNote) payload.deliveryNote = address.deliveryNote;
      }
      win
        .fetch(cfg.api + '/api/' + encodeURIComponent(cfg.orderSlug) + '/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Idempotency-Key': checkoutKey },
          body: JSON.stringify(payload)
        })
        .then(readJson)
        .then(function (result) {
          sending = false;
          if (!result.ok) {
            warn('order rejected for "' + cfg.orderSlug + '" (' + result.status + ').', result.body);
            /* The kitchen shut between loading the menu and pressing send —
               the guest sat on the page past the last order time, or the venue
               closed the day underneath them. The refusal carries the same
               `ordering` block `GET /menu` publishes, deliberately, so adopting
               it here needs no second reader: the surface re-renders closed and
               states the real reason instead of leaving a submit button that
               will never work. */
            if (result.body && result.body.code === 'ORDERING_CLOSED') {
              if (result.body.ordering) {
                ordering = result.body.ordering;
                if (lastMenu) {
                  lastMenu.ordering = ordering;
                  lastMenu.client = lastMenu.client || {};
                  lastMenu.client.ordering = ordering;
                  emit('klar:menu', lastMenu);
                }
              }
              orderErr = '';
              renderItems();
              renderCart();
              return;
            }
            /* The 422 the delivery rule answers with. Its `reason` is
               structured, so the sentence is rebuilt here in the embed's own
               language — the API's `error` string is Finnish and never printed. */
            if (result.body && result.body.code === 'DELIVERY_UNAVAILABLE') {
              var reason = result.body.reason;
              orderErr =
                reason === 'postcode' && address
                  ? t.unservedPostcode.replace('{code}', address.deliveryPostalCode)
                  : reason === 'below_minimum' && typeof result.body.minOrderCents === 'number'
                    ? t.belowMinimum.replace('{eur}', money(result.body.minOrderCents, currency))
                    : t.codes.DELIVERY_UNAVAILABLE;
              renderCart();
              return;
            }
            orderErr =
              result.status === 429
                ? t.tooMany
                : // Never `result.body.error`. The API writes that string in one
                  // language and this embed renders in another, so the fallback
                  // showed English "Order could not be placed" on a Finnish
                  // embed and Finnish "Liian monta tilausta" on an English one.
                  // An unmapped code gets the embed's own generic instead.
                  t.codes[result.body.code] || t.generic + callUs();
            renderCart();
            return;
          }
          showOrderOk(result.body.order || {});
          /* Only ever after showOrderOk — see goToPayment. Absent for every
             order until the restaurant switches online payment on. */
          goToPayment(result.body.payment);
        })
        .catch(function (error) {
          sending = false;
          warn('order request failed for "' + cfg.orderSlug + '".', error);
          orderErr = t.generic + callUs();
          renderCart();
        });
    }

    /* The one way anything enters the cart — the embed's own buttons and a
     * host site's klar:add both come through here, so an id the loaded menu
     * does not carry is refused once, in one place. */
    function addToCart(id, qty) {
      var step = typeof qty === 'number' && qty ? Math.round(qty) : 1;
      var item = itemById(id);
      if (!item) {
        warn(
          'klar:add refused — "' + id + '" is not an item on the loaded menu for "' +
            cfg.orderSlug + '".'
        );
        return false;
      }
      if (item.available === false) {
        warn('klar:add refused — "' + item.name + '" is not available.');
        return false;
      }
      var line = lineFor(id);
      if (line) {
        line.qty += step;
        if (line.qty <= 0) cart = cart.filter(function (other) { return other.id !== id; });
      } else if (step > 0) {
        cart.push({ id: item.id, name: item.name, cents: item.priceCents, qty: step });
      } else {
        return false;
      }
      cartChanged();
      renderItems();
      renderCart();
      return true;
    }

    if (cfg.order) {
      itemsWrap.addEventListener('click', function (event) {
        var button = event.target.closest('button[data-klar-add]');
        if (!button || button.disabled) return;
        addToCart(button.dataset.klarAdd, 1);
      });

      mount.addEventListener('klar:add', function (event) {
        var detail = event.detail || {};
        addToCart(detail.id, detail.qty);
      });

      /* A host that mounted after the menu landed asks for the state again
         rather than waiting for an event that has already been and gone. */
      doc.addEventListener('klar:sync', function () {
        if (lastMenu) emit('klar:menu', lastMenu);
        if (lastCart) emit('klar:cart', lastCart);
      });

      catsWrap.addEventListener('click', function (event) {
        var button = event.target.closest('button[data-klar-cat]');
        if (!button) return;
        activeCat = Number(button.dataset.klarCat);
        catsWrap.querySelectorAll('button').forEach(function (other) {
          other.classList.toggle('klar-on', other === button);
        });
        renderItems();
      });

      cartWrap.addEventListener('click', function (event) {
        var qtyButton = event.target.closest('button[data-klar-qty]');
        if (qtyButton) {
          var id = qtyButton.dataset.klarQty;
          var to = Number(qtyButton.dataset.klarTo);
          if (to <= 0) {
            cart = cart.filter(function (line) { return line.id !== id; });
          } else {
            var line = lineFor(id);
            if (line) line.qty = to;
          }
          cartChanged();
          renderItems();
          renderCart();
          return;
        }
        var fulButton = event.target.closest('button[data-klar-ful]');
        if (fulButton) {
          fulfilment = fulButton.dataset.klarFul;
          cartChanged();
          renderCart();
          return;
        }
        if (event.target.closest('[data-klar="order-submit"]')) placeOrder();
      });

      cartWrap.addEventListener('input', function (event) {
        var field = event.target.dataset ? event.target.dataset.klar : null;
        if (field === 'oname') orderName = event.target.value;
        if (field === 'ophone') orderPhone = event.target.value;
        if (field === 'dstreet') deliveryStreet = event.target.value;
        if (field === 'dpostcode') deliveryPostcode = event.target.value;
        if (field === 'dcity') deliveryCity = event.target.value;
        if (field === 'dnote') deliveryNote = event.target.value;
      });

      renderCart();
    }

    /* ================================= BOOK ================================= */

    var dateEl = el('date');
    var partyEl = el('party');
    var slotsEl = el('slots');
    var bookErrEl = el('book-err');
    var bookBtn = el('book-submit');
    var chosenSlot = '';
    var booking = false;
    /* The venue's deposit rule, as the availability answer last stated it:
       { amount_per_guest_eur, threshold } or null. Never inferred here — a
       widget that decided for itself which parties owe a deposit would be a
       second rule to disagree with the server's. */
    var depositRule = null;

    function showBookErr(message) {
      bookErrEl.textContent = message;
      bookErrEl.hidden = !message;
    }

    /** What this party owes, in euros, or null. Mirrors the server's rule. */
    function depositForParty() {
      var size = Number(partyEl.value);
      if (!depositRule || !size || size < depositRule.threshold) return null;
      return {
        perGuest: depositRule.amount_per_guest_eur,
        total: depositRule.amount_per_guest_eur * size
      };
    }

    /* The line under the party picker and the wording on the button, kept in
       one place: they are two halves of the same statement, and a button that
       says "book" under a line saying "pay first" is how a guest ends up
       surprised on Stripe's page. */
    function renderDeposit() {
      var note = el('deposit-note');
      var owed = depositForParty();
      if (!note) return;
      if (!owed) {
        note.hidden = true;
        note.textContent = '';
        if (!booking) bookBtn.textContent = t.book;
        return;
      }
      note.hidden = false;
      note.textContent = t.depositNotice
        .replace('{threshold}', String(depositRule.threshold))
        .replace('{eur}', String(owed.perGuest))
        .replace('{total}', String(owed.total));
      if (!booking) bookBtn.textContent = t.depositPay;
    }

    function loadSlots() {
      chosenSlot = '';
      if (!dateEl.value) {
        slotsEl.innerHTML = '<span class="klar-muted">—</span>';
        return;
      }
      slotsEl.innerHTML = '<span class="klar-muted">' + esc(t.slotsLoading) + '</span>';
      win
        .fetch(
          cfg.api + '/api/' + encodeURIComponent(cfg.bookSlug) + '/availability?date=' +
            encodeURIComponent(dateEl.value) + '&party_size=' + encodeURIComponent(partyEl.value)
        )
        .then(function (response) {
          if (!response.ok) throw new Error('availability ' + response.status);
          return response.json();
        })
        .then(function (data) {
          /* The rule travels with availability, so it is refreshed by the same
             call the slot grid comes from and a venue switching it on reaches
             the widget without a redeploy. */
          depositRule = data.deposit || null;
          renderDeposit();
          var slots = data.slots || [];
          if (slots.length === 0) {
            slotsEl.innerHTML = '<span class="klar-muted">' + esc(t.closed) + '</span>';
            return;
          }
          if (!slots.some(function (slot) { return slot.available; })) {
            slotsEl.innerHTML = '<span class="klar-muted">' + esc(t.noSlots + callUs()) + '</span>';
            return;
          }
          slotsEl.innerHTML = slots
            .map(function (slot) {
              return (
                '<button type="button" data-klar-slot="' + esc(slot.time) + '"' +
                (slot.available ? '' : ' disabled') + '>' + esc(hhmm(slot.time)) + '</button>'
              );
            })
            .join('');
        })
        .catch(function (error) {
          warn(
            'availability request failed for booking slug "' + cfg.bookSlug + '" at ' + cfg.api +
              ' — no times can be offered.',
            error
          );
          slotsEl.innerHTML =
            '<span class="klar-muted">' +
            esc((/ 404$/.test(error.message) ? t.bookingOff : t.slotsFailed) + callUs()) +
            '</span>';
        });
    }

    function showBookOk(name, confirmed) {
      el('book-live').hidden = true;
      var ok = el('book-ok');
      var people = Number(partyEl.value);
      ok.hidden = false;
      ok.innerHTML =
        '<div class="klar-check">✓</div><h3>' + esc(t.bookOk) + '</h3>' +
        '<p class="klar-muted">' + esc(name) + ' · ' + people + ' ' +
        esc(people === 1 ? t.person : t.people) + '</p>' +
        '<div class="klar-big">' + esc(confirmed.date || dateEl.value) + ' ' + esc(t.at) + ' ' +
        esc(hhmm(confirmed.time_slot || chosenSlot)) + '</div>' +
        '<p class="klar-muted">' + esc(t.bookConfirm) + '</p>' +
        '<button type="button" class="klar-btn" data-klar="book-again" style="margin-top:20px">' +
        esc(t.bookAgain) + '</button>';
      el('book-again').addEventListener('click', function () {
        ok.hidden = true;
        el('book-live').hidden = false;
        el('bname').value = '';
        el('bphone').value = '';
        el('bemail').value = '';
        el('breq').value = '';
        el('bdiet').value = '';
        el('bdiet-consent').checked = false;
        el('bdiet-consent-row').hidden = true;
        chosenSlot = '';
        loadSlots();
      });
    }

    if (cfg.book) {
      var today = todayIn(cfg.timezone);
      dateEl.min = today;
      dateEl.max = plusDays(today, BOOKING_HORIZON_DAYS);
      dateEl.value = today;
      for (var size = 1; size <= cfg.partyMax; size++) {
        var option = doc.createElement('option');
        option.value = String(size);
        option.textContent = size + ' ' + (size === 1 ? t.person : t.people);
        if (size === 2) option.selected = true;
        partyEl.appendChild(option);
      }

      slotsEl.addEventListener('click', function (event) {
        var button = event.target.closest('button[data-klar-slot]');
        if (!button || button.disabled) return;
        chosenSlot = button.dataset.klarSlot;
        slotsEl.querySelectorAll('button').forEach(function (other) {
          other.classList.toggle('klar-on', other === button);
        });
      });
      dateEl.addEventListener('change', loadSlots);
      partyEl.addEventListener('change', function () {
        /* The line has to move with the picker, not with the answer that comes
           back a moment later — a guest who steps 7 -> 8 and reads "no deposit"
           for half a second has been told the wrong thing. */
        renderDeposit();
        loadSlots();
      });

      /* The tick appears only once there is an allergy to consent to, and an
         emptied field takes the tick away with it — otherwise a guest who
         typed and then deleted would leave a consent standing over nothing. */
      el('bdiet').addEventListener('input', function () {
        var has = el('bdiet').value.trim().length > 0;
        el('bdiet-consent-row').hidden = !has;
        if (!has) el('bdiet-consent').checked = false;
      });

      bookBtn.addEventListener('click', function () {
        if (booking) return;
        var name = el('bname').value.trim();
        var phone = el('bphone').value.trim();
        var email = el('bemail').value.trim();
        var requests = el('breq').value.trim();
        var diet = el('bdiet').value.trim();
        var dietConsent = el('bdiet-consent').checked;
        if (!dateEl.value || !chosenSlot || !name || !phone || !email) {
          showBookErr(t.bookFields);
          return;
        }
        /* Refused here as well as on the server. The server is what makes it
           true — a checkbox is a suggestion and a direct POST ignores it — but
           being turned away in the form costs the guest nothing. */
        if (diet && !dietConsent) {
          showBookErr(t.dietaryConsentMissing);
          return;
        }
        showBookErr('');

        var payload = {
          guest_name: name,
          guest_phone: phone,
          guest_email: email,
          party_size: Number(partyEl.value),
          date: dateEl.value,
          time_slot: chosenSlot,
          special_requests: requests || undefined,
          dietary_notes: diet || undefined,
          health_consent: diet ? dietConsent : undefined,
          health_consent_language: cfg.locale,
          source: 'widget'
        };

        /* A party the venue asks a deposit of never posts the booking from
           here. It goes to Stripe first and the booking is made on the way
           back — the server refuses this payload without a paid session, so
           posting it anyway would only produce a 402 the guest has to read. */
        if (depositForParty()) {
          startDeposit(payload);
          return;
        }
        submitBooking(payload);
      });

      /* Send the guest to Stripe, having first put the form they filled in
         somewhere it survives the trip. sessionStorage, not the URL: the
         allergy note is health data and a query string is written into
         history, logs and anything sitting in front of the site. It is read
         once on the way back and deleted immediately, whatever happened. */
      function startDeposit(payload) {
        booking = true;
        bookBtn.disabled = true;
        bookBtn.textContent = t.depositRedirect;
        win
          .fetch(cfg.api + '/api/' + encodeURIComponent(cfg.bookSlug) + '/book/deposit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              date: payload.date,
              time_slot: payload.time_slot,
              party_size: payload.party_size,
              return_url: win.location.href.split('#')[0]
            })
          })
          .then(readJson)
          .then(function (result) {
            if (!result.ok || !result.body.checkout_url) {
              booking = false;
              bookBtn.disabled = false;
              renderDeposit();
              warn('deposit session refused for "' + cfg.bookSlug + '".', result.body);
              showBookErr(result.body.error || t.generic + callUs());
              if (result.body.code === 'SLOT_TAKEN') loadSlots();
              return;
            }
            try {
              win.sessionStorage.setItem(
                depositStoreKey(),
                JSON.stringify({ payload: payload, session: result.body.session_id })
              );
            } catch (storageError) {
              /* Private mode, or storage full. Nothing has been charged yet,
                 so the honest move is to stop before it is. */
              booking = false;
              bookBtn.disabled = false;
              renderDeposit();
              warn('the booking could not be held across the payment.', storageError);
              showBookErr(t.generic + callUs());
              return;
            }
            win.location.href = result.body.checkout_url;
          })
          .catch(function (error) {
            booking = false;
            bookBtn.disabled = false;
            renderDeposit();
            warn('deposit request failed for "' + cfg.bookSlug + '".', error);
            showBookErr(t.generic + callUs());
          });
      }

      function submitBooking(payload, depositSession) {
        booking = true;
        bookBtn.disabled = true;
        bookBtn.textContent = depositSession ? t.depositFinishing : t.booking;
        win
          .fetch(cfg.api + '/api/' + encodeURIComponent(cfg.bookSlug) + '/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              depositSession
                ? Object.keys(payload).reduce(
                    function (out, key) {
                      out[key] = payload[key];
                      return out;
                    },
                    { deposit_session: depositSession }
                  )
                : payload
            )
          })
          .then(readJson)
          .then(function (result) {
            booking = false;
            bookBtn.disabled = false;
            renderDeposit();
            if (!result.ok) {
              warn('booking rejected for "' + cfg.bookSlug + '" (' + result.status + ').', result.body);
              /* The API returns per-field messages — show them, they are more
               * useful than the summary. */
              var fields = result.body.fields;
              var detail = fields
                ? Object.keys(fields)
                    .map(function (key) {
                      return /invalid phone/i.test(fields[key]) ? t.badPhone : fields[key];
                    })
                    .join(' · ')
                : '';
              /* A deposit that could not be honoured says so in the guest's own
                 terms, including the fact that the money comes back — the
                 server's code is precise but it is written for us, not them. */
              var depositProblem =
                typeof result.body.code === 'string' &&
                result.body.code.indexOf('DEPOSIT_') === 0;
              showBookErr(
                depositProblem
                  ? t.depositFailed + callUs()
                  : detail || result.body.error || t.generic + callUs()
              );
              if (result.body.code === 'SLOT_TAKEN') loadSlots();
              return;
            }
            showBookOk(payload.guest_name, result.body.booking || {});
          })
          .catch(function (error) {
            booking = false;
            bookBtn.disabled = false;
            renderDeposit();
            warn('booking request failed for "' + cfg.bookSlug + '".', error);
            showBookErr(t.generic + callUs());
          });
      }

      /* Where the guest lands when Stripe is done. The session id is in the
         query string, the form is in sessionStorage, and the booking is made
         now — the payment on its own has bought nothing yet. The stored form
         is deleted before the request goes out, so a reload can never post the
         same guest twice, and the parameter is stripped from the URL so a
         shared or bookmarked link carries no payment reference. */
      function resumeFromDeposit() {
        var params;
        try {
          params = new win.URL(win.location.href).searchParams;
        } catch (urlError) {
          return false;
        }
        var sessionId = params.get('klar_deposit');
        if (!sessionId) return false;

        var stored = null;
        try {
          var raw = win.sessionStorage.getItem(depositStoreKey());
          win.sessionStorage.removeItem(depositStoreKey());
          if (raw) stored = JSON.parse(raw);
        } catch (storageError) {
          warn('the held booking could not be read back.', storageError);
        }

        try {
          var clean = new win.URL(win.location.href);
          clean.searchParams.delete('klar_deposit');
          win.history.replaceState({}, '', clean.toString());
        } catch (historyError) { /* a URL the browser will not rewrite is cosmetic */ }

        if (!stored || !stored.payload || stored.session !== sessionId) {
          /* Paid, but this browser cannot say what for — a different device, a
             cleared tab, a link forwarded to somebody else. Nothing is booked
             and nothing is charged twice; the venue is the only one who can
             sort it out, so the guest is pointed at them. */
          warn('returned from a deposit payment with no held booking.', sessionId);
          showBookErr(t.depositFailed + callUs());
          return true;
        }

        dateEl.value = stored.payload.date;
        partyEl.value = String(stored.payload.party_size);
        chosenSlot = stored.payload.time_slot;
        submitBooking(stored.payload, sessionId);
        return true;
      }

      function depositStoreKey() {
        return 'klar-deposit-' + cfg.bookSlug;
      }

      mount.klarResumeDeposit = resumeFromDeposit;
    }

    /* ---- lazy start: a visitor who never scrolls here pays for no request ---- */
    var started = false;
    function start() {
      if (started) return;
      started = true;
      if (cfg.order) loadMenu();
      if (cfg.book) {
        loadSlots();
        /* A guest coming back from Stripe has already paid, so this runs on
           start rather than waiting for the section to be scrolled to. */
        if (mount.klarResumeDeposit) mount.klarResumeDeposit();
      }
    }
    mount.klarStart = start; /* so a nav link or a test can force it */

    if (win.IntersectionObserver) {
      var observer = new win.IntersectionObserver(
        function (entries) {
          if (
            entries.some(function (entry) {
              return entry.isIntersecting;
            })
          ) {
            start();
            observer.disconnect();
          }
        },
        { rootMargin: '600px' }
      );
      observer.observe(mount);

      /* Warm it once the page is otherwise idle, so the section is ALREADY
         filled when the visitor reaches it. 600px of rootMargin still means the
         menu is fetched while they are scrolling towards it, and on a slow
         connection they arrive at "Loading the menu…" — which reads as broken
         rather than as loading. The observer stays: it is what catches a visitor
         who lands mid-page, and start() is idempotent. */
      if (win.requestIdleCallback) {
        win.requestIdleCallback(start, { timeout: 2000 });
      } else {
        win.setTimeout(start, 1200);
      }
    } else {
      start();
    }

    /* A direct #anchor link into the section must not wait for the observer. */
    function startOnHash() {
      var id = mount.id || (mount.closest('[id]') && mount.closest('[id]').id);
      if (id && win.location.hash === '#' + id) start();
    }
    startOnHash();
    win.addEventListener('hashchange', startOnHash);
  }

  /* ------------------------------------------------------------------ boot --- */

  function boot() {
    var win = typeof window !== 'undefined' ? window : null;
    if (!win || !win.document) return;
    if (!win.fetch) {
      warn('this browser has no fetch(); the ordering and booking surfaces cannot load.');
      return;
    }
    var mounts = win.document.querySelectorAll('[data-klar-slug],[data-klar-order-slug],[data-klar-book-slug]');
    if (mounts.length === 0) {
      warn('no mount element found — add <div data-klar-slug="your-slug"></div> to the page.');
      return;
    }
    mounts.forEach(function (mount) {
      if (mount.dataset.klarMounted === '1') return;
      mount.dataset.klarMounted = '1';
      try {
        mountKlar(mount, win);
      } catch (error) {
        /* One broken mount must never take the rest of the page with it. */
        warn('mount failed.', error);
      }
    });
  }

  if (typeof document !== 'undefined' && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
