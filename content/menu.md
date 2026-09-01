# Roba Deli — menu (source of truth)

**This file mirrors `lib/data.ts`, which is what robadeli.fi actually serves.**
Edit `lib/data.ts`; then update this file to match. Prices in €.
Flags: **L** lactose-free · **G** gluten-free · **LG** both.
Subs come in **S / L**.

Last reconciled against `lib/data.ts` and the live site: 2026-09-01.

## Provenance — read before "correcting" anything

There are two menus in this repo and only one of them is current.

- **Current (authoritative):** `lib/data.ts` → this file. Ported by Edvin Lomberg
  on **2026-07-04** (commit `432ec02`) as "today's approved content", i.e. signed
  off with the owner. Verified live on robadeli.fi on 2026-09-01.
- **Superseded (historical artwork only):** `content/menu-main.png`,
  `menu-smoothies.png`, `menu-deals.png` — photographs of the **June 2026**
  in-store boards, committed 2026-06-24. They show a larger, differently priced
  menu. **They are not the current menu.** Keep them for reference; do not
  transcribe from them.

What the 2026-07-04 approval changed vs the June boards: dropped Grilled Chicken
Sub, Gravlax Sub, all three Salads, Green Boost smoothie, Falafel & Muhamara Dip,
plain Nachos, Crisps and Latte; added Pastrami Burger; moved sub sizing from
6"/12" to S/L; changed several prices.

**Settled 2026-09-01:** the live site is the menu. It has been up since July and
the owner has raised nothing against it, so the differences above are the menu,
not open questions. Anything sourced from the boards needs his say-so first.

## Sandwiches — *Voileivät*

| Item | S | L | Description |
|---|---|---|---|
| Pastrami Burger (L) ★ | — | **17.90** | Beef pastrami in craft brioche, dijon aioli, BBQ sauce, raclette melt cheese and pickles |
| Philly Cheesesteak (L) | 7.90 | 14.90 | Beef steak, melted provolone cheese, sautéed onion & paprika, cheddar sauce |
| Ultimate Italian (L) | 7.90 | 14.90 | Sourdough focaccia, provolone, smoked turkey, beef salami, bufala mozzarella & fresh pesto |
| Grilled Halloumi (L) | 7.90 | 14.90 | Grilled halloumi, provolone, fresh pesto, pickles & sun-dried tomatoes |

★ = gold "Favorite" pill on the site.

## Wraps — *Wrapit*

| Item | € | Description |
|---|---|---|
| Chicken Shwarma (L) | 9.90 | Lawash nan, garlic sauce, pomegranate molasses, pickles, sumac & grilled chicken shawarma |
| Falafel Pita (L) — *Vegan* | 9.90 | Falafel, pita, tahini & amba sauce, roasted eggplant, harissa paste, pickles & fresh greens |

## Smoothies — *Smoothiet*

| Item | € | Description |
|---|---|---|
| High Protein (LG) | 6.50 | Frozen blueberries, cottage cheese, vanilla whey, almond milk, ground flaxseeds, cinnamon |
| Eternal Classics (LG) | 6.50 | Strawberries, raspberry, banana, almond milk, chia seeds |
| Tropical (LG) | 6.50 | Papaya, mango, pineapple, lemon juice, chia seeds, banana, Greek yogurt |

## Snacks — *Naposteltavat*

| Item | € | Description |
|---|---|---|
| Hot Honey Halloumi (LG) | 5.90 | |
| Loaded Nachos (Beef / Chicken) (L) | 7.50 | Salsa, melty cheddar cheese and chicken or beef |

## Drinks — *Juomat*

| Item | € |
|---|---|
| Coca-Cola / Zero / Fanta / Sprite | 3.50 |
| Ginger Beer | 4.00 |
| Still Water | 3.50 |
| Juice | 3.50 |
| Espresso | 3.00 |
| Americano | 3.00 |
| Cappuccino | 3.50 |
| Tea | 3.00 |

## Deals

- **Lunch Deal** — S sub **€6.99** (10:30–15:00)
- **Combo Deal** — S sub + soft drink **€8.99**
- **Duo Deal** — two L subs **€23.99** (excl. Pastrami Burger)

## Changing the menu

The live site wins. Edit `lib/data.ts`, mirror the change here, and re-check
nothing in `lib/i18n.ts` or `content/about.md` still advertises a dropped item
(`structured-data.ts` derives from `MENU` and needs no edit).

Do not re-introduce items from the board photos.
