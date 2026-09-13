#!/usr/bin/env node
/**
 * Fails when a legal fact this site is required to publish is missing, and
 * fails when a placeholder would reach a visitor.
 *
 * Why this exists: the facts a privacy policy and a set of terms need — the
 * registered company name, the business ID, an address, a contact channel —
 * belong to the business owner, not to whoever is editing this repo. Waiting
 * for them by hand means either shipping a page with `{{TODO}}` printed on it,
 * or forgetting. This check makes the gap loud here and invisible to the guest.
 *
 * Run: npm run check:legal   (and it runs before every build)
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "lib/legal.ts"), "utf8");

/** Read a string field off the COMPANY literal without importing TypeScript. */
function field(name) {
  const m = src.match(new RegExp(`\\n\\s*${name}:\\s*("([^"]*)"|null)`));
  if (!m) return undefined;
  return m[1] === "null" ? null : m[2];
}

// Required before a consumer places an order (kuluttajansuojalaki 6:9) and for
// any business running a website (laki tietoyhteiskunnan palvelujen
// tarjoamisesta 7 §, which names an email address explicitly).
const REQUIRED = [
  ["legalName", "registered company name"],
  ["businessId", "Y-tunnus"],
  ["address", "registered address"],
  ["phoneDisplay", "phone number"],
];
const WANTED = [["email", "customer-contact email address"]];

const missing = [];
const wanted = [];

for (const [key, label] of REQUIRED) {
  const v = field(key);
  if (!v || v.includes("{{TODO")) missing.push(`${key} — ${label}`);
}
for (const [key, label] of WANTED) {
  const v = field(key);
  if (!v || v.includes("{{TODO")) wanted.push(`${key} — ${label}`);
}

// A placeholder must never be RENDERED. Comments are allowed to talk about
// them — this check is about what reaches a visitor — so strip comments first,
// otherwise the file's own explanation of the rule trips the rule.
const code = src
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/(^|[^:])\/\/.*$/gm, "$1");
if (/\{\{TODO/.test(code)) {
  missing.push("a {{TODO}} marker is still present in lib/legal.ts and would render to a visitor");
}

if (wanted.length) {
  console.warn("\n  legal facts still missing (pages degrade gracefully, but ask the owner):");
  for (const w of wanted) console.warn(`    · ${w}`);
  console.warn(
    "    Roba Deli publishes no email anywhere, and neither the trade register\n" +
      "    nor the food-control register carries one. Only the owner can give it.\n",
  );
}

if (missing.length) {
  console.error("\n  BLOCKED — this site may not go live without:");
  for (const m of missing) console.error(`    · ${m}`);
  console.error("");
  process.exit(1);
}

console.log("  legal facts present: " + REQUIRED.map(([k]) => `${k}=${field(k)}`).join(", "));
