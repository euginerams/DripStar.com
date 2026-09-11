const test = require("node:test");
const assert = require("node:assert/strict");
const {
  money, colorSlug, photoPath, IMAGE_EXTENSIONS,
  cartTotal, cartCount, matchesFilters, sortList, isValidOrderNumber
} = require("../utils.js");

test("money formats a price in Rand using South African number formatting", () => {
  assert.equal(money(4500), `R${(4500).toLocaleString("en-ZA")}`);
  assert.equal(money(1000000), `R${(1000000).toLocaleString("en-ZA")}`);
  assert.match(money(4500), /^R4.500$/); // "." stands in for whatever separator this Node's ICU uses
});

test("money returns a fallback string for a falsy price", () => {
  assert.equal(money(0), "Price on request");
  assert.equal(money(null), "Price on request");
});

test("colorSlug lowercases and dashes multi-word colors", () => {
  assert.equal(colorSlug("Pacific Blue"), "pacific-blue");
  assert.equal(colorSlug("Space Grey"), "space-grey");
  assert.equal(colorSlug("Black"), "black");
});

test("colorSlug strips punctuation and stray dashes", () => {
  assert.equal(colorSlug("Deep Purple!"), "deep-purple");
});

test("photoPath builds the expected filename convention", () => {
  assert.equal(photoPath(31, "Pacific Blue"), "images/31-pacific-blue.jpg");
});

test("photoPath uses the extension at the given fallback index", () => {
  assert.equal(photoPath(31, "Pacific Blue", 2), "images/31-pacific-blue.png");
  assert.equal(IMAGE_EXTENSIONS[2], "png");
});

test("cartTotal sums price times quantity across matching products", () => {
  const products = [{ id: 1, price: 100 }, { id: 2, price: 50 }];
  const cart = [{ id: 1, qty: 2 }, { id: 2, qty: 3 }];
  assert.equal(cartTotal(cart, products), 100 * 2 + 50 * 3);
});

test("cartTotal ignores a cart entry whose product no longer exists", () => {
  const products = [{ id: 1, price: 100 }];
  const cart = [{ id: 1, qty: 1 }, { id: 999, qty: 5 }];
  assert.equal(cartTotal(cart, products), 100);
});

test("cartCount sums quantities across all cart lines", () => {
  assert.equal(cartCount([{ qty: 2 }, { qty: 3 }, { qty: 1 }]), 6);
});

test("matchesFilters respects the category filter", () => {
  const p = { name: "iPhone 14", category: "Phone", type: "Smartphone", price: 10000, condition: "New" };
  assert.equal(matchesFilters(p, { activeFilter: "Phone" }), true);
  assert.equal(matchesFilters(p, { activeFilter: "Laptop" }), false);
});

test("matchesFilters searches across name, category and type", () => {
  const p = { name: "iPhone 14 Pro", category: "Phone", type: "Smartphone", price: 10000, condition: "New" };
  assert.equal(matchesFilters(p, { activeFilter: "All", searchTerm: "pro" }), true);
  assert.equal(matchesFilters(p, { activeFilter: "All", searchTerm: "laptop" }), false);
});

test("matchesFilters respects min/max price range", () => {
  const p = { name: "X", category: "Phone", type: "Smartphone", price: 5000, condition: "New" };
  assert.equal(matchesFilters(p, { activeFilter: "All", priceMin: 4000, priceMax: 6000 }), true);
  assert.equal(matchesFilters(p, { activeFilter: "All", priceMin: 6000 }), false);
});

test("matchesFilters respects condition filters", () => {
  const p = { name: "X", category: "Phone", type: "Smartphone", price: 5000, condition: "Pre-owned" };
  assert.equal(matchesFilters(p, { activeFilter: "All", conditionFilters: ["New"] }), false);
  assert.equal(matchesFilters(p, { activeFilter: "All", conditionFilters: ["Pre-owned"] }), true);
});

test("sortList sorts by price ascending without mutating the original array", () => {
  const list = [{ name: "B", price: 200 }, { name: "A", price: 100 }];
  const sorted = sortList(list, "price-asc");
  assert.deepEqual(sorted.map(x => x.price), [100, 200]);
  assert.deepEqual(list.map(x => x.price), [200, 100]); // original untouched
});

test("sortList sorts alphabetically by name", () => {
  const list = [{ name: "Zebra" }, { name: "Apple" }];
  const sorted = sortList(list, "name-asc");
  assert.deepEqual(sorted.map(x => x.name), ["Apple", "Zebra"]);
});

test("isValidOrderNumber matches the DS-YYYY-NNNN format from the database", () => {
  assert.equal(isValidOrderNumber("DS-2026-0001"), true);
  assert.equal(isValidOrderNumber("DS-2026-12345"), true);
});

test("isValidOrderNumber rejects malformed order numbers", () => {
  assert.equal(isValidOrderNumber("2026-0001"), false);
  assert.equal(isValidOrderNumber("DS-26-0001"), false);
  assert.equal(isValidOrderNumber("random"), false);
});