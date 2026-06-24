// Roba Deli content — single source of truth (from the menu photos + Google listing).

export type MenuItem = {
  name: string;
  desc?: string;
  flag?: string;
  price: string;
  price2?: string;
};
export type MenuCategory = { name: string; items: MenuItem[] };

export const MENU: MenuCategory[] = [
  {
    name: "Sandwiches",
    items: [
      { name: "Brisket Raclette Melt", desc: "Slow-cooked brisket, craft brioche, pickles, syrup & BBQ, molten raclette swiss.", flag: "Signature", price: "19,90 €" },
      { name: "Philly Steak Sub", desc: "Beef, sautéed peppers, onion & mushroom, provolone & cheddar, sriracha aioli.", flag: "L", price: "7,90 €", price2: '12" 15,90 €' },
      { name: "Ultimate Italian", desc: "Sourdough focaccia, salami, smoked turkey, provolone, aioli.", price: "7,90 €", price2: '12" 15,90 €' },
      { name: "Grilled Chicken Sub", desc: "Grilled corn-fed chicken, fresh veggies, pickles, cheese, house sauce.", price: "7,90 €", price2: '12" 15,90 €' },
      { name: "Gravlax Sub", desc: "Salmon gravlax, lemon-dill, mango curry sauce.", flag: "L", price: "7,90 €", price2: '12" 15,90 €' },
      { name: "Halumi Sub", desc: "Marinated grilled halloumi, provolone, fresh veggies, muhamara & mango curry.", flag: "L", price: "7,50 €", price2: '12" 13,90 €' },
    ],
  },
  {
    name: "Wraps",
    items: [
      { name: "Falafel Wrap", desc: "Tortilla, cheese, falafel, fresh veggies, pickles, muhamara & tzatziki.", flag: "L", price: "9,90 €" },
      { name: "Chicken Shawarma Wrap", desc: "Tortilla, chicken, fresh veggies, white & cheddar sauce.", flag: "L", price: "9,90 €" },
    ],
  },
  {
    name: "Salads",
    items: [
      { name: "Grilled Chicken Caesar", desc: "Gem lettuce, chicken, parmesan, Caesar dressing, croutons.", flag: "LG", price: "13,90 €" },
      { name: "Gravlax & Dill Potato", desc: "Dill potato, salmon gravlax, mango curry mayo, capers, spring onions.", flag: "LG", price: "13,90 €" },
      { name: "Falafel Salad", desc: "Falafel, mixed greens, melon, feta, muhamara sauce.", flag: "LG", price: "11,90 €" },
    ],
  },
  {
    name: "Smoothies",
    items: [
      { name: "Eternal Classics", desc: "Strawberry, raspberry, banana, almond milk, chia.", flag: "L · G", price: "6,90 €" },
      { name: "Green Boost", desc: "Spinach, avocado, mango, pineapple, Greek yogurt, coconut water.", flag: "L · G", price: "5,90 €" },
      { name: "High Protein", desc: "Blueberry, cottage cheese, vanilla whey, almond milk, flaxseed, cinnamon. 32g protein.", flag: "L · G", price: "6,90 €" },
      { name: "Tropical", desc: "Greek yogurt, papaya, mango, pineapple, coconut milk, lemon, chia.", flag: "L · G", price: "6,90 €" },
    ],
  },
  {
    name: "Snacks",
    items: [
      { name: "Falafel & Muhamara Dip", flag: "LG", price: "4,90 €" },
      { name: "Halumi & Hot Honey Dip", flag: "LG", price: "5,90 €" },
      { name: "Nachos", flag: "LG", price: "4,50 €" },
      { name: "Crisps", flag: "LG", price: "4,50 €" },
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
  { name: "Eternal Classics", ing: "Strawberry, raspberry, banana, almond milk, chia.", price: "€6.90", img: "/images/smoothie-strawberry.png" },
  { name: "Green Boost", ing: "Spinach, avocado, mango, pineapple, Greek yogurt, coconut water.", price: "€5.90", img: "/images/smoothie-green.png" },
  { name: "High Protein", ing: "Blueberry, cottage cheese, vanilla whey, almond milk, flaxseed. 32g protein.", price: "€6.90", img: "/images/smoothie-protein.png" },
  { name: "Tropical", ing: "Greek yogurt, papaya, mango, pineapple, coconut milk, lemon, chia.", price: "€6.90", img: "/images/smoothie-tropical.png" },
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
