// Roba Deli content — single source of truth (from the in-store menu screens).
// Dish names stay English by design; Finnish descriptions (descFi) + category names (nameFi) added.

export type MenuItem = {
  name: string;
  desc?: string;
  descFi?: string;
  diet?: "L" | "G" | "LG"; // lactose-free / gluten-free / both
  badge?: string; // small highlight flag (e.g. "Vegan")
  badgeFi?: string;
  fav?: boolean; // gold "★ Favorite" pill
  price: string; // single price, or the small (S) price for subs
  price12?: string; // large (L) price for subs (value only; label added in the UI)
};
export type MenuCategory = { name: string; nameFi: string; items: MenuItem[] };

export const MENU: MenuCategory[] = [
  {
    name: "Sandwiches",
    nameFi: "Voileivät",
    items: [
      { name: "Pastrami Burger", desc: "Beef pastrami in craft brioche, dijon aioli, BBQ sauce, raclette melt cheese and pickles.", descFi: "Naudan pastramia briochessa, dijon-aioli, BBQ-kastike, sulaa raclette-juustoa ja suolakurkkua.", diet: "L", fav: true, price: "17,90 €" },
      { name: "Philly Cheesesteak", desc: "Beef steak, melted provolone cheese, sautéed onion & paprika, cheddar sauce.", descFi: "Naudan pihviä, sulaa provolone-juustoa, paistettua sipulia & paprikaa, cheddarkastike.", diet: "L", price: "7,90 €", price12: "14,90 €" },
      { name: "Ultimate Italian", desc: "Sourdough focaccia, provolone, smoked turkey, beef salami, bufala mozzarella & fresh pesto.", descFi: "Hapanjuurifocaccia, provolonea, savustettua kalkkunaa, naudan salamia, bufala-mozzarellaa & tuoretta pestoa.", diet: "L", price: "7,90 €", price12: "14,90 €" },
      { name: "Grilled Halloumi", desc: "Grilled halloumi, provolone, fresh pesto, pickles & sun-dried tomatoes.", descFi: "Grillattua halloumia, provolonea, tuoretta pestoa, suolakurkkua & aurinkokuivattua tomaattia.", diet: "L", price: "7,90 €", price12: "14,90 €" },
    ],
  },
  {
    name: "Wraps",
    nameFi: "Wrapit",
    items: [
      { name: "Chicken Shwarma", desc: "Lawash nan, garlic sauce, pomegranate molasses, pickles, sumac & grilled chicken shawarma.", descFi: "Lawash-leipä, valkosipulikastike, granaattiomenasiirappi, suolakurkku, sumakkia & grillattua kana-shawarmaa.", diet: "L", price: "9,90 €" },
      { name: "Falafel Pita", desc: "Falafel, pita, tahini & amba sauce, roasted eggplant, harissa paste, pickles & fresh greens.", descFi: "Falafelia, pita, tahini- & amba-kastike, paahdettua munakoisoa, harissatahnaa, suolakurkkua & tuoreita vihanneksia.", diet: "L", badge: "Vegan", badgeFi: "Vegaani", price: "9,90 €" },
    ],
  },
  {
    name: "Smoothies",
    nameFi: "Smoothiet",
    items: [
      { name: "High Protein", desc: "Frozen blueberries, cottage cheese, vanilla whey, almond milk, ground flaxseeds, cinnamon.", descFi: "Pakastemustikoita, raejuustoa, vaniljaheraa, mantelimaitoa, jauhettuja pellavansiemeniä, kanelia.", diet: "LG", price: "6,50 €" },
      { name: "Eternal Classics", desc: "Strawberries, raspberry, banana, almond milk, chia seeds.", descFi: "Mansikoita, vadelmaa, banaania, mantelimaitoa, chia-siemeniä.", diet: "LG", price: "6,50 €" },
      { name: "Tropical", desc: "Papaya, mango, pineapple, lemon juice, chia seeds, banana, Greek yogurt.", descFi: "Papaijaa, mangoa, ananasta, sitruunamehua, chia-siemeniä, banaania, kreikkalaista jogurttia.", diet: "LG", price: "6,50 €" },
    ],
  },
  {
    name: "Snacks",
    nameFi: "Naposteltavat",
    items: [
      { name: "Hot Honey Halloumi", diet: "LG", price: "5,90 €" },
      { name: "Loaded Nachos (Beef / Chicken)", desc: "Salsa, melty cheddar cheese and chicken or beef.", descFi: "Salsaa, sulaa cheddar-juustoa ja kanaa tai naudanlihaa.", diet: "L", price: "7,50 €" },
    ],
  },
  {
    name: "Drinks",
    nameFi: "Juomat",
    items: [
      { name: "Coca-Cola / Zero / Fanta / Sprite", price: "3,50 €" },
      { name: "Ginger Beer", price: "4,00 €" },
      { name: "Still Water", price: "3,50 €" },
      { name: "Juice", price: "3,50 €" },
      { name: "Espresso", price: "3,00 €" },
      { name: "Americano", price: "3,00 €" },
      { name: "Cappuccino", price: "3,50 €" },
      { name: "Tea", price: "3,00 €" },
    ],
  },
];

export type Smoothie = { name: string; ing: string; ingFi: string; price: string; img: string };
export const SMOOTHIES: Smoothie[] = [
  { name: "High Protein", ing: "Frozen blueberries, cottage cheese, vanilla whey, almond milk, ground flaxseeds, cinnamon.", ingFi: "Pakastemustikoita, raejuustoa, vaniljaheraa, mantelimaitoa, jauhettuja pellavansiemeniä, kanelia.", price: "€6.50", img: "/images/smoothie-blueberry.webp" },
  { name: "Eternal Classics", ing: "Strawberries, raspberry, banana, almond milk, chia seeds.", ingFi: "Mansikoita, vadelmaa, banaania, mantelimaitoa, chia-siemeniä.", price: "€6.50", img: "/images/smoothie-strawberry.webp" },
  { name: "Tropical", ing: "Papaya, mango, pineapple, lemon juice, chia seeds, banana, Greek yogurt.", ingFi: "Papaijaa, mangoa, ananasta, sitruunamehua, chia-siemeniä, banaania, kreikkalaista jogurttia.", price: "€6.50", img: "/images/smoothie-tropical.webp" },
];

export type Deal = { k: string; kFi: string; price: string; d: string; dFi: string; note?: string; noteFi?: string };
export const DEALS: Deal[] = [
  { k: "Combo deal", kFi: "Combo-tarjous", price: "€8.99", d: "S sub + a soft drink", dFi: "S sub + virvoitusjuoma" },
  { k: "Duo deal", kFi: "Duo-tarjous", price: "€23.99", d: "Two L subs", dFi: "Kaksi L-subia", note: "Excl. Pastrami Burger", noteFi: "Pl. Pastrami Burger" },
];

export type Review = { text: string; who: string };
export const REVIEWS: Review[] = [
  { text: "Amazing good subs! I'm definitely coming back.", who: "Oliver Österberg" },
  { text: "Super good sandwiches. You have to try the Philly!", who: "Elias Mella" },
  { text: "Delicious, will be back to try more!", who: "Cameron Weaver" },
];
