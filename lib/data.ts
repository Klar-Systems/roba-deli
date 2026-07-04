// Roba Deli content — single source of truth (from the in-store menu screens).

export type MenuItem = {
  name: string;
  desc?: string;
  diet?: "L" | "G" | "LG"; // lactose-free / gluten-free / both
  badge?: string; // small highlight flag (e.g. "Vegan")
  fav?: boolean; // gold "★ Favorite" pill
  price: string; // single price, or the small (S) price for subs
  price12?: string; // large (L) price for subs (value only; label added in the UI)
};
export type MenuCategory = { name: string; items: MenuItem[] };

export const MENU: MenuCategory[] = [
  {
    name: "Sandwiches",
    items: [
      { name: "Pastrami Burger", desc: "Beef pastrami in craft brioche, dijon aioli, BBQ sauce, raclette melt cheese and pickles.", diet: "L", fav: true, price: "17,90 €" },
      { name: "Philly Cheesesteak", desc: "Beef steak, melted provolone cheese, sautéed onion & paprika, cheddar sauce.", diet: "L", price: "7,90 €", price12: "14,90 €" },
      { name: "Ultimate Italian", desc: "Sourdough focaccia, provolone, smoked turkey, beef salami, bufala mozzarella & fresh pesto.", diet: "L", price: "7,90 €", price12: "14,90 €" },
      { name: "Grilled Halloumi", desc: "Grilled halloumi, provolone, fresh pesto, pickles & sun-dried tomatoes.", diet: "L", price: "7,90 €", price12: "14,90 €" },
    ],
  },
  {
    name: "Wraps",
    items: [
      { name: "Chicken Shwarma", desc: "Lawash nan, garlic sauce, pomegranate molasses, pickles, sumac & grilled chicken shawarma.", diet: "L", price: "9,90 €" },
      { name: "Falafel Pita", desc: "Falafel, pita, tahini & amba sauce, roasted eggplant, harissa paste, pickles & fresh greens.", diet: "L", badge: "Vegan", price: "9,90 €" },
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
      { name: "Hot Honey Halloumi", diet: "LG", price: "5,90 €" },
      { name: "Loaded Nachos (Beef / Chicken)", desc: "Salsa, melty cheddar cheese and chicken or beef.", diet: "L", price: "7,50 €" },
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
      { name: "Americano", price: "3,00 €" },
      { name: "Cappuccino", price: "3,50 €" },
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
  { k: "Lunch deal", price: "€6.99", d: "S sub · 10:30–15:00" },
  { k: "Combo deal", price: "€8.99", d: "S sub + a soft drink" },
  { k: "Duo deal", price: "€23.99", d: "Two L subs", note: "Excl. Pastrami Burger" },
];

export type Review = { text: string; who: string };
export const REVIEWS: Review[] = [
  { text: "Amazing good subs! I'm definitely coming back. 100% better than Subway.", who: "Oliver Österberg" },
  { text: "Super good sandwiches. You have to try the Philly!", who: "Elias Mella" },
  { text: "Delicious, will be back to try more!", who: "Cameron Weaver" },
];
