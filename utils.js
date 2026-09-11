/* ============================================================
   DRIPSTARS.COM — shared utility functions
   Pure, dependency-free logic used by the storefront (loaded as a
   plain <script> before script.js) and by the automated tests in
   /tests (loaded via require()). Works in both environments.
   ============================================================ */
   (function (root, factory) {
    if (typeof module !== "undefined" && module.exports) {
      module.exports = factory();
    } else {
      Object.assign(root, factory());
    }
  })(typeof window !== "undefined" ? window : globalThis, function () {
  
    function money(n) {
      return n ? `R${Number(n).toLocaleString("en-ZA")}` : "Price on request";
    }
  
    function colorSlug(name) {
      return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }
  
    const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
    function photoPath(id, colorName, extIndex) {
      return `images/${id}-${colorSlug(colorName)}.${IMAGE_EXTENSIONS[extIndex || 0]}`;
    }
  
    function cartTotal(cart, products) {
      return cart.reduce((sum, item) => {
        const p = products.find(pp => pp.id === item.id);
        return sum + (p ? p.price * item.qty : 0);
      }, 0);
    }
  
    function cartCount(cart) {
      return cart.reduce((sum, item) => sum + item.qty, 0);
    }
  
    // options: { activeFilter, searchTerm, conditionFilters, priceMin, priceMax }
    function matchesFilters(p, options) {
      const o = options || {};
      const categoryOK = !o.activeFilter || o.activeFilter === "All" || p.category === o.activeFilter;
      const haystack = `${p.name} ${p.category} ${p.type}`.toLowerCase();
      const searchOK = haystack.includes((o.searchTerm || "").toLowerCase());
      const conditionOK = !o.conditionFilters || o.conditionFilters.length === 0 || o.conditionFilters.includes(p.condition);
      const priceOK = (o.priceMin == null || p.price >= o.priceMin) && (o.priceMax == null || p.price <= o.priceMax);
      return categoryOK && searchOK && conditionOK && priceOK;
    }
  
    function sortList(list, sortBy) {
      const copy = [...list];
      if (sortBy === "name-asc") copy.sort((a, b) => a.name.localeCompare(b.name));
      if (sortBy === "price-asc") copy.sort((a, b) => a.price - b.price);
      if (sortBy === "price-desc") copy.sort((a, b) => b.price - a.price);
      return copy;
    }
  
    // Mirrors the DS-<year>-<sequence> format produced by the
    // next_order_number() Postgres function in supabase-schema.sql.
    function isValidOrderNumber(str) {
      return /^DS-\d{4}-\d{4,}$/.test(str);
    }
  
    return {
      money, colorSlug, photoPath, IMAGE_EXTENSIONS,
      cartTotal, cartCount, matchesFilters, sortList, isValidOrderNumber
    };
  });