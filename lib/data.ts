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
    // The in-store card of 2026-10-23: one board of eight, in the card's order, its wording kept.
    name: "Sandwiches & Wraps",
    nameFi: "Voileivät & wrapit",
    items: [
      { name: "Pastrami Burger", desc: "Beef pastrami in craft brioche, dijon aioli, BBQ sauce, raclette melt cheese and pickles.", descFi: "Naudan pastramia briochessa, dijon-aioli, BBQ-kastike, sulaa raclette-juustoa ja suolakurkkua.", diet: "L", fav: true, price: "20,59 €" },
      { name: "Grilled Halloumi", desc: "Grilled halloumi, provolone, fresh pesto, pickles and sun-dried tomatoes.", descFi: "Grillattua halloumia, provolonea, tuoretta pestoa, suolakurkkua ja aurinkokuivattua tomaattia.", diet: "L", price: "9,09 €", price12: "17,14 €" },
      { name: "Ultimate Italian", desc: "Italian cold cuts, provolone, fresh pesto, roasted vegetables, lettuce, tomatoes and creamy sauce.", descFi: "Italialaisia leikkeleitä, provolonea, tuoretta pestoa, paahdettuja kasviksia, salaattia, tomaattia ja kermaista kastiketta.", price: "17,14 €" },
      { name: "Chicken Shwarma", desc: "Lawash nan, garlic sauce, cheddar sauce, fresh lettuce, cucumber, tomatoes and grilled chicken shawarma.", descFi: "Lawash-leipä, valkosipulikastike, cheddarkastike, tuoretta salaattia, kurkkua, tomaattia ja grillattua kana-shawarmaa.", diet: "L", price: "11,39 €" },
      { name: "Chicken Sandwich", desc: "Pulled chicken, choice of your bread, apple & fennel slaw, salsa verde, truffle and honey mayonnaise, chilli paprika sauce, crispy onion and parmesan.", descFi: "Nyhtökanaa, valitsemasi leipä, omena-fenkolicoleslaw, salsa verde, tryffeli-hunajamajoneesi, chili-paprikakastike, rapeaa sipulia ja parmesaania.", price: "13,69 €" },
      { name: "Lamb Taco Birria", desc: "3 corn tortillas filled with slowly cooked lamb shoulder, guacamole, mozzarella, salsa and lime.", descFi: "3 maissitortillaa, täytteenä hitaasti haudutettua lampaanlapaa, guacamolea, mozzarellaa, salsaa ja limeä.", diet: "L", price: "13,69 €" },
      { name: "Philly Cheesesteak", desc: "Beef steak with melted provolone cheese, sautéed onion-paprika and cheddar sauce.", descFi: "Naudan pihviä sulalla provolone-juustolla, paistettua sipulia ja paprikaa sekä cheddarkastiketta.", diet: "L", price: "9,09 €", price12: "17,14 €" },
      { name: "Ruben Sandwich", desc: "NY style pastrami slice, sauerkraut and comes with potato crisps and pickles.", descFi: "New York -tyylistä pastramia ja hapankaalia, kyljessä perunalastuja ja suolakurkkua.", price: "24,04 €" },
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
