// Roba Deli content — single source of truth (from the menu photos + Google listing).

export type MenuItem = {
  name: string;
  desc?: string;
  diet?: "L" | "G" | "LG"; // lactose-free / gluten-free / both
  badge?: string; // highlight (e.g. "Signature"), not a dietary flag
  price: string; // single price, or the 6" price for subs
  price12?: string; // 12" price for subs (value only; label added in the UI)
};
export type MenuCategory = { name: string; items: MenuItem[] };

export const MENU: MenuCategory[] = [
  {
    name: "Sandwiches",
    items: [
      { name: "Brisket Raclette Melt", desc: "Slow-cooked brisket, craft brioche, pickles, mustard aioli & barbecue, molten raclette swiss.", badge: "Signature", price: "19,90 €" },
      { name: "Philly Steak Sub", desc: "Beef, sautéed peppers, onion & mushroom, provolone & cheddar, mustard aioli.", diet: "L", price: "7,90 €", price12: "15,90 €" },
      { name: "Ultimate Italian", desc: "Sourdough focaccia, salami, smoked turkey, provolone, aioli.", price: "7,90 €", price12: "15,90 €" },
      { name: "Grilled Chicken Sub", desc: "Grilled corn-fed chicken, fresh veggies, pickles, cheese, white sauce.", price: "7,90 €", price12: "15,90 €" },
      { name: "Gravlax Sub", desc: "Sourdough focaccia, salmon gravlax, lemon-dill smetana, mango curry, pickled onion, rucola & capers.", diet: "L", price: "7,90 €", price12: "15,90 €" },
      { name: "Halumi Sub", desc: "Marinated grilled halloumi, provolone, fresh veggies, muhamara & mango curry.", diet: "L", price: "7,50 €", price12: "13,90 €" },
    ],
  },
  {
    name: "Wraps",
    items: [
      { name: "Falafel Wrap", desc: "Tortilla, cheese, falafel, fresh veggies, pickles, muhamara & tzatziki.", diet: "L", price: "9,90 €" },
      { name: "Chicken Shawarma Wrap", desc: "Tortilla, chicken, fresh veggies, white & cheddar sauce.", diet: "L", price: "9,90 €" },
    ],
  },
  {
    name: "Salads",
    items: [
      { name: "Grilled Chicken Caesar", desc: "Gem lettuce, chicken, parmesan, Caesar dressing, croutons.", diet: "LG", price: "13,90 €" },
      { name: "Gravlax & Dill Potato", desc: "Dill potato, salmon gravlax, lemon smetana, mango curry mayo, capers, spring onions.", diet: "LG", price: "13,90 €" },
      { name: "Falafel Salad", desc: "Falafel, mixed greens, melon, feta, muhamara sauce.", diet: "LG", price: "11,90 €" },
    ],
  },
  {
    name: "Smoothies",
    items: [
      { name: "High Protein", desc: "Frozen blueberries, cottage cheese, vanilla whey, almond milk, ground flaxseeds, cinnamon.", diet: "LG", price: "6,50 €" },
      { name: "Eternal Classics", desc: "Strawberries, raspberry, banana, almond milk, chia seeds.", diet: "LG", price: "6,50 €" },
      { name: "Tropical", desc: "Papaya, mango, pineapple, lemon juice, chia seeds, banana, Greek yogurt.", diet: "LG", price: "6,50 €" },
    ],
  },
  {
    name: "Snacks",
    items: [
      { name: "Falafel & Muhamara Dip", diet: "LG", price: "4,90 €" },
      { name: "Halumi & Hot Honey Dip", diet: "LG", price: "5,90 €" },
      { name: "Nachos", diet: "LG", price: "4,50 €" },
      { name: "Crisps", diet: "LG", price: "4,50 €" },
      { name: "Loaded Nachos — Beef / Chicken", desc: "Salsa, jalapeños, cheese, habanero sauce, beef or chicken.", price: "9,50 €" },
    ],
  },
  {
    name: "Drinks",
    items: [
      { name: "Coca-Cola / Zero / Fanta / Sprite", price: "3,50 €" },
      { name: "Ginger Beer", price: "4,00 €" },
      { name: "Still Water", price: "3,50 €" },
      { name: "Juice", price: "3,50 €" },
      { name: "Espresso", price: "3,00 €" },
      { name: "Americano", price: "3,50 €" },
      { name: "Cappuccino", price: "3,50 €" },
      { name: "Latte", price: "3,50 €" },
      { name: "Tea", price: "3,00 €" },
    ],
  },
];

export type Smoothie = { name: string; ing: string; price: string; img: string };
export const SMOOTHIES: Smoothie[] = [
  { name: "High Protein", ing: "Frozen blueberries, cottage cheese, vanilla whey, almond milk, ground flaxseeds, cinnamon.", price: "€6.50", img: "/images/smoothie-blueberry.webp" },
  { name: "Eternal Classics", ing: "Strawberries, raspberry, banana, almond milk, chia seeds.", price: "€6.50", img: "/images/smoothie-strawberry.webp" },
  { name: "Tropical", ing: "Papaya, mango, pineapple, lemon juice, chia seeds, banana, Greek yogurt.", price: "€6.50", img: "/images/smoothie-tropical.webp" },
];

export type Deal = { k: string; price: string; d: string; note?: string };
export const DEALS: Deal[] = [
  { k: "Lunch deal", price: "€6.99", d: '6" sub or salad · 10:30–15:00' },
  { k: "Combo deal", price: "€8.99", d: '6" sub + a soft drink' },
  { k: "Duo deal", price: "€23.99", d: 'Two 12" subs', note: "Excl. Brisket Raclette Melt" },
];

export type Review = { text: string; who: string };
export const REVIEWS: Review[] = [
  { text: "Amazing good subs! I'm definitely coming back. 100% better than Subway.", who: "Oliver Österberg" },
  { text: "Super good sandwiches. You have to try the Philly!", who: "Elias Mella" },
  { text: "Delicious, will be back to try more!", who: "Cameron Weaver" },
];
