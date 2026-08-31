// ============================================================
// Supabase setup — connects the site to your orders database
// ============================================================
const SUPABASE_URL = "https://ohixdjcyqaxjkvnjuili.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_J3NbhSB_S2muyAOfxkh9Aw_fvuU0f7I";
let sb = null;
try {
  if (window.supabase) {
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } else {
    console.error("Supabase library did not load — check the script tag in index.html.");
  }
} catch (err) {
  console.error("Supabase failed to initialize:", err);
}

const products = [
  {id:1, name:"iPhone 12 Pro", category:"Phone", type:"Smartphone", price:7900, condition:"Pre-owned", storage:"128GB", ram:"6GB", colors:["Graphite","Silver","Gold"], description:"A well-maintained pre-owned iPhone 12 Pro with triple camera system and Super Retina XDR display."},
  {id:2, name:"iPhone 12 Pro", category:"Phone", type:"Smartphone", price:8300, condition:"Pre-owned", storage:"256GB", ram:"6GB", colors:["Graphite","Silver","Pacific Blue"], description:"A well-maintained pre-owned iPhone 12 Pro with triple camera system and Super Retina XDR display."},
  {id:3, name:"iPhone 12 Pro Max", category:"Phone", type:"Smartphone", price:9600, condition:"Pre-owned", storage:"128GB", ram:"6GB", colors:["Graphite","Gold"], description:"The larger 12 Pro Max with extended battery life and bigger display, in good condition.", featured:true},
  {id:4, name:"iPhone 12 Pro Max", category:"Phone", type:"Smartphone", price:9900, condition:"Pre-owned", storage:"256GB", ram:"6GB", colors:["Silver","Pacific Blue"], description:"The larger 12 Pro Max with extended battery life and bigger display, in good condition."},
  {id:5, name:"iPhone 12 Pro Max", category:"Phone", type:"Smartphone", price:10600, condition:"Pre-owned", storage:"512GB", ram:"6GB", colors:["Graphite"], description:"The larger 12 Pro Max with extended battery life and bigger display, in good condition."},
  {id:6, name:"iPhone 13 Pro", category:"Phone", type:"Smartphone", price:10100, condition:"Pre-owned", storage:"128GB", ram:"6GB", colors:["Sierra Blue","Graphite","Gold"], description:"iPhone 13 Pro with ProMotion display and improved battery life, thoroughly tested."},
  {id:7, name:"iPhone 13 Pro", category:"Phone", type:"Smartphone", price:10700, condition:"Pre-owned", storage:"256GB", ram:"6GB", colors:["Sierra Blue","Silver"], description:"iPhone 13 Pro with ProMotion display and improved battery life, thoroughly tested."},
  {id:8, name:"iPhone 13", category:"Phone", type:"Smartphone", price:8300, condition:"Pre-owned", storage:"128GB", ram:"4GB", colors:["Midnight","Starlight","Pink","Blue"], description:"Reliable everyday iPhone 13 with A15 Bionic chip and dual camera system.", featured:true},
  {id:9, name:"iPhone 13", category:"Phone", type:"Smartphone", price:8600, condition:"Pre-owned", storage:"256GB", ram:"4GB", colors:["Midnight","Blue"], description:"Reliable everyday iPhone 13 with A15 Bionic chip and dual camera system."},
  {id:10, name:"iPhone 13 Pro Max", category:"Phone", type:"Smartphone", price:12600, condition:"Pre-owned", storage:"128GB", ram:"6GB", colors:["Graphite","Gold"], description:"Top-of-the-line 13 Pro Max with the largest battery in the 13 lineup."},
  {id:11, name:"iPhone 13 Pro Max", category:"Phone", type:"Smartphone", price:13100, condition:"Pre-owned", storage:"256GB", ram:"6GB", colors:["Sierra Blue","Graphite"], description:"Top-of-the-line 13 Pro Max with the largest battery in the 13 lineup."},
  {id:12, name:"iPhone 13 Pro Max", category:"Phone", type:"Smartphone", price:13600, condition:"Pre-owned", storage:"512GB", ram:"6GB", colors:["Graphite"], description:"Top-of-the-line 13 Pro Max with the largest battery in the 13 lineup, maximum storage."},
  {id:13, name:"iPhone 14", category:"Phone", type:"Smartphone", price:10600, condition:"New", storage:"128GB", ram:"6GB", colors:["Midnight","Blue","Starlight","Purple","Red"], description:"Brand new, sealed iPhone 14 with improved camera system and Crash Detection.", featured:true},
  {id:14, name:"iPhone 14", category:"Phone", type:"Smartphone", price:11000, condition:"New", storage:"256GB", ram:"6GB", colors:["Midnight","Purple"], description:"Brand new, sealed iPhone 14 with improved camera system and Crash Detection."},
  {id:15, name:"iPhone 14 Pro", category:"Phone", type:"Smartphone", price:13600, condition:"New", storage:"128GB", ram:"6GB", colors:["Space Black","Silver","Gold","Deep Purple"], description:"Brand new iPhone 14 Pro with Dynamic Island and Always-On display.", featured:true},
  {id:16, name:"iPhone 14 Pro", category:"Phone", type:"Smartphone", price:14100, condition:"New", storage:"256GB", ram:"6GB", colors:["Space Black","Deep Purple"], description:"Brand new iPhone 14 Pro with Dynamic Island and Always-On display."},

  {id:17, name:"Lenovo IdeaPad 3", category:"Laptop", type:"Everyday laptop", price:4500, condition:"New", storage:"256GB SSD", ram:"8GB", colors:["Grey"], description:"i5 processor, great for everyday browsing, office work and streaming.", featured:true},
  {id:18, name:"Lenovo ThinkPad E14", category:"Laptop", type:"Business laptop", price:6800, condition:"Pre-owned", storage:"512GB SSD", ram:"16GB", colors:["Black"], description:"Durable business-grade ThinkPad, ideal for work-from-home and office use."},
  {id:19, name:"HP Pavilion 15", category:"Laptop", type:"Everyday laptop", price:5900, condition:"New", storage:"512GB SSD", ram:"8GB", colors:["Silver","Blue"], description:"Sleek all-rounder with a full HD display, great for students and home use.", featured:true},
  {id:20, name:"HP EliteBook 840", category:"Laptop", type:"Business laptop", price:8200, condition:"Pre-owned", storage:"256GB SSD", ram:"16GB", colors:["Black"], description:"Corporate-grade EliteBook with strong battery life and a sturdy build."},
  {id:21, name:"Dell Inspiron 15", category:"Laptop", type:"Everyday laptop", price:6200, condition:"New", storage:"512GB SSD", ram:"8GB", colors:["Silver"], description:"Balanced everyday laptop with solid performance for work and study."},
  {id:22, name:"Dell Latitude 5420", category:"Laptop", type:"Business laptop", price:9500, condition:"Pre-owned", storage:"512GB SSD", ram:"16GB", colors:["Black"], description:"Enterprise-grade Latitude with excellent keyboard and long battery life."},
  {id:23, name:"MacBook Air M1", category:"Laptop", type:"Ultrabook", price:14500, condition:"Pre-owned", storage:"256GB SSD", ram:"8GB", colors:["Space Grey","Silver"], description:"Fanless, silent, and fast — Apple's M1 chip in a light aluminium body.", featured:true},
  {id:24, name:"MacBook Pro 13\" M2", category:"Laptop", type:"Ultrabook", price:19900, condition:"New", storage:"512GB SSD", ram:"8GB", colors:["Space Grey"], description:"Brand new MacBook Pro with M2 chip, Touch Bar and all-day battery life."},
  {id:25, name:"Asus VivoBook 15", category:"Laptop", type:"Everyday laptop", price:5400, condition:"New", storage:"256GB SSD", ram:"8GB", colors:["Silver","Black"], description:"Lightweight and affordable, well suited for students and browsing."},
  {id:26, name:"Acer Aspire 5", category:"Laptop", type:"Everyday laptop", price:6600, condition:"New", storage:"512GB SSD", ram:"8GB", colors:["Silver"], description:"Solid mid-range performer with a comfortable keyboard and crisp display."},

  {id:27, name:"iPad 9th Gen", category:"Tablet", type:"Tablet", price:6200, condition:"New", storage:"64GB", ram:"3GB", colors:["Silver","Space Grey","Pink"], description:"Reliable everyday iPad for browsing, note-taking and streaming.", featured:true},
  {id:28, name:"iPad Air 5th Gen", category:"Tablet", type:"Tablet", price:11900, condition:"New", storage:"64GB", ram:"8GB", colors:["Blue","Starlight","Pink","Space Grey"], description:"Slim, powerful iPad Air with M1 chip, great for creative work on the go.", featured:true},
  {id:29, name:"Samsung Galaxy Tab A8", category:"Tablet", type:"Tablet", price:4300, condition:"New", storage:"32GB", ram:"3GB", colors:["Grey","Silver"], description:"Budget-friendly Android tablet, good for media and light productivity.", featured:true},
  {id:30, name:"Lenovo Tab M10", category:"Tablet", type:"Tablet", price:3200, condition:"New", storage:"32GB", ram:"3GB", colors:["Grey"], description:"Compact, affordable tablet for browsing, reading and video calls.", featured:true}
];

const CATEGORY_KEYWORDS = { Phone:"Phone", Laptop:"Laptop", Tablet:"Tablet" };

// ============================================================
// Colors → hex values, used to tint the generic device illustration
// when no real product photo is available yet for that color.
// ============================================================
const COLOR_HEX = {
  "Graphite":"#4b4b4d", "Silver":"#dcdcdc", "Gold":"#d9c08a",
  "Pacific Blue":"#2e5266", "Sierra Blue":"#a9c9dd", "Midnight":"#1c1c1e",
  "Starlight":"#f1ece1", "Pink":"#f2c9ce", "Blue":"#4f6d91",
  "Space Black":"#3a3a3c", "Deep Purple":"#4b3f57", "Purple":"#8974ab",
  "Red":"#9b2f2f", "Grey":"#86868a", "Space Grey":"#58585a", "Black":"#232323"
};
function colorToHex(name){ return COLOR_HEX[name] || "#6b6255"; }
function colorSlug(name){ return name.toLowerCase().replace(/[^a-z0-9]+/g, "-"); }
// Real photo naming convention: images/<product-id>-<color-slug>.jpg
// e.g. images/13-midnight.jpg for the iPhone 14 (id 13) in Midnight.
// Drop a matching file in and it's used automatically — no code changes.
function photoPath(id, colorName){ return `images/${id}-${colorSlug(colorName)}.jpg`; }

let cart = JSON.parse(localStorage.getItem("dripstars-cart") || "[]");
let activeFilter = "All";
let searchTerm = "";
let sortBy = "default";
let conditionFilters = [];
let priceMin = null;
let priceMax = null;

const money = n => n ? `R${n.toLocaleString("en-ZA")}` : "Price on request";

function matchesFilters(p){
  const categoryOK = activeFilter === "All" || p.category === activeFilter;
  const haystack = `${p.name} ${p.category} ${p.type}`.toLowerCase();
  const searchOK = haystack.includes(searchTerm.toLowerCase());
  const conditionOK = conditionFilters.length === 0 || conditionFilters.includes(p.condition);
  const priceOK = (priceMin == null || p.price >= priceMin) && (priceMax == null || p.price <= priceMax);
  return categoryOK && searchOK && conditionOK && priceOK;
}

function sortList(list){
  const copy = [...list];
  if(sortBy === "name-asc") copy.sort((a,b)=>a.name.localeCompare(b.name));
  if(sortBy === "price-asc") copy.sort((a,b)=>a.price-b.price);
  if(sortBy === "price-desc") copy.sort((a,b)=>b.price-a.price);
  return copy;
}

function renderProducts(){
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");
  const countLabel = document.getElementById("resultCount");

  let visible = products.filter(matchesFilters);

  const noExplicitFilters = activeFilter === "All" && !searchTerm && conditionFilters.length === 0 && priceMin == null && priceMax == null;
  if(noExplicitFilters){
    visible = visible.filter(p => p.featured);
  }

  visible = sortList(visible);

  if(countLabel){
    countLabel.textContent = noExplicitFilters
      ? `Showing ${visible.length} popular picks — search or filter to see all stock`
      : `${visible.length} product${visible.length === 1 ? "" : "s"}`;
  }

  grid.innerHTML = visible.map(p => `
    <article class="product-card" data-id="${p.id}">
      <div class="product-image ${p.category.toLowerCase()}" style="--device-color:${colorToHex(p.colors[0])}">
        <img class="product-photo" src="${photoPath(p.id, p.colors[0])}" alt="${p.name}" loading="lazy"
             onerror="this.style.display='none'" />
        <span class="product-badge">${p.category}</span>
        <span class="condition-badge condition-${p.condition.toLowerCase().replace(" ","-")}">${p.condition}</span>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <span class="product-spec-line">${p.storage} • ${p.ram} RAM</span>
        <div class="price">${money(p.price)}</div>
        <div class="product-actions">
          <button class="mini-btn primary" data-action="add" data-id="${p.id}" ${!p.price ? "disabled" : ""}>Add to cart</button>
          <button class="mini-btn" data-action="whatsapp" data-id="${p.id}">WhatsApp</button>
        </div>
      </div>
    </article>
  `).join("");
  empty.hidden = visible.length !== 0;

  const filterCountEl = document.getElementById("filterCount");
  const activeCount = conditionFilters.length + (priceMin != null ? 1 : 0) + (priceMax != null ? 1 : 0) + (sortBy !== "default" ? 1 : 0);
  filterCountEl.textContent = activeCount ? `(${activeCount})` : "";
}

// Click handling for product cards: open detail modal, unless a button was clicked
document.getElementById("productGrid").addEventListener("click", e => {
  const actionBtn = e.target.closest("[data-action]");
  if(actionBtn){
    const id = Number(actionBtn.dataset.id);
    if(actionBtn.dataset.action === "add") addToCart(id);
    if(actionBtn.dataset.action === "whatsapp") whatsappProduct(id);
    return;
  }
  const card = e.target.closest(".product-card");
  if(card) openDetail(Number(card.dataset.id));
});

let detailSelectedColor = null;

function openDetail(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  detailSelectedColor = p.colors[0];
  const content = document.getElementById("detailContent");
  const hasNotch = p.category === "Phone";

  content.innerHTML = `
    <div class="detail-visual">
      <img class="detail-photo" id="detailPhoto" src="${photoPath(p.id, p.colors[0])}" alt="${p.name} in ${p.colors[0]}"
           onerror="this.style.display='none'; document.getElementById('detailDeviceShape').style.display='flex';" />
      <div class="detail-device detail-device-${p.category.toLowerCase()}" id="detailDeviceShape" style="--device-color:${colorToHex(p.colors[0])}; display:none;">
        ${hasNotch ? '<span class="detail-device-notch"></span>' : ""}
      </div>
    </div>
    <span class="condition-badge condition-${p.condition.toLowerCase().replace(" ","-")}">${p.condition}</span>
    <p class="eyebrow" style="margin-top:14px">${p.category.toUpperCase()} • ${p.type.toUpperCase()}</p>
    <h2 style="margin:0 0 10px">${p.name}</h2>
    <div class="price" style="font-size:26px;margin-bottom:14px">${money(p.price)}</div>
    <p style="color:var(--slate);line-height:1.6;margin-bottom:18px">${p.description}</p>
    <div class="spec-grid">
      <div><span>Storage</span><strong>${p.storage}</strong></div>
      <div><span>RAM</span><strong>${p.ram}</strong></div>
      <div><span>Condition</span><strong>${p.condition}</strong></div>
      <div><span>Type</span><strong>${p.type}</strong></div>
    </div>
    <p class="spec-label">Colour: <strong id="detailColorLabel">${p.colors[0]}</strong></p>
    <div class="color-swatches" id="detailColorSwatches">
      ${p.colors.map((c,i) => `<button type="button" class="color-chip ${i===0?"active":""}" data-color="${c}" style="--swatch-color:${colorToHex(c)}">${c}</button>`).join("")}
    </div>
    <div class="product-actions" style="margin-top:22px">
      <button class="btn btn-gold" onclick="addToCart(${p.id}, detailSelectedColor);closeDetail();">Add to cart</button>
      <button class="btn btn-outline dark-outline" onclick="whatsappProduct(${p.id}, detailSelectedColor)">Ask on WhatsApp</button>
    </div>
  `;

  document.getElementById("detailColorSwatches").addEventListener("click", e => {
    const btn = e.target.closest(".color-chip");
    if(!btn) return;
    const colorName = btn.dataset.color;
    detailSelectedColor = colorName;

    document.querySelectorAll("#detailColorSwatches .color-chip").forEach(c => c.classList.toggle("active", c === btn));
    document.getElementById("detailColorLabel").textContent = colorName;

    const photo = document.getElementById("detailPhoto");
    const shape = document.getElementById("detailDeviceShape");
    shape.style.setProperty("--device-color", colorToHex(colorName));
    shape.style.display = "none";
    photo.style.display = "";
    photo.src = photoPath(p.id, colorName);
    photo.alt = `${p.name} in ${colorName}`;
  });

  document.getElementById("detailModal").classList.add("show");
}
function closeDetail(){
  document.getElementById("detailModal").classList.remove("show");
}
document.getElementById("detailClose").addEventListener("click", closeDetail);
document.getElementById("detailModal").addEventListener("click", e => {
  if(e.target.id === "detailModal") closeDetail();
});

function saveCart(){
  localStorage.setItem("dripstars-cart", JSON.stringify(cart));
  renderCart();
}

function addToCart(id, color){
  const product = products.find(p => p.id === id);
  if(!product || !product.price) return;
  const chosenColor = color || product.colors[0];
  const existing = cart.find(x => x.id === id && x.color === chosenColor);
  if(existing) existing.qty++;
  else cart.push({id, qty:1, color: chosenColor});
  saveCart();
  openCart();
}

function changeQty(id, color, delta){
  const item = cart.find(x => x.id === id && x.color === color);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){
    cart = cart.filter(x => x.id !== id);
  }
  saveCart();
}

function removeFromCart(id, color){
  cart = cart.filter(x => !(x.id === id && x.color === color));
  saveCart();
}

function renderCart(){
  const items = document.getElementById("cartItems");
  const count = cart.reduce((sum,x)=>sum+x.qty,0);
  document.getElementById("cartCount").textContent = count;
  if(!cart.length){
    items.innerHTML = '<p style="color:#777">Your cart is empty.</p>';
  } else {
    items.innerHTML = cart.map(x => {
      const p = products.find(y => y.id === x.id);
      const colorLabel = x.color ? ` · ${x.color}` : "";
      return `<div class="cart-item">
        <div>
          <h4>${p.name} (${p.storage})${colorLabel}</h4>
          <small>${money(p.price)} each</small>
          <div class="qty-stepper">
            <button onclick="changeQty(${p.id}, '${x.color}', -1)" aria-label="Decrease quantity">−</button>
            <span>${x.qty}</span>
            <button onclick="changeQty(${p.id}, '${x.color}', 1)" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="cart-item-right">
          <strong>${money(p.price*x.qty)}</strong>
          <button class="remove-btn" onclick="removeFromCart(${p.id}, '${x.color}')">Remove</button>
        </div>
      </div>`;
    }).join("");
  }
  const total = cart.reduce((sum,x)=>{
    const p=products.find(y=>y.id===x.id); return sum+p.price*x.qty;
  },0);
  document.getElementById("cartTotal").textContent = money(total);
}

function openCart(){
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}
function closeCart(){
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

function whatsappText(){
  if(!cart.length) return "Hi DRIPSTARS.COM, I would like to enquire about your products.";
  const lines = cart.map(x=>{
    const p=products.find(y=>y.id===x.id);
    const colorLabel = x.color ? `, ${x.color}` : "";
    return `• ${p.name} (${p.storage}${colorLabel}) x${x.qty} - ${money(p.price*x.qty)}`;
  });
  const total = cart.reduce((sum,x)=>sum+products.find(y=>y.id===x.id).price*x.qty,0);
  return `Hi DRIPSTARS.COM, I would like to place an order:\n${lines.join("\n")}\n\nEstimated total: ${money(total)}\nPlease confirm availability and delivery details.`;
}

function whatsappProduct(id, color){
  const p = products.find(x=>x.id===id);
  const colorLabel = color ? `, ${color}` : "";
  const text = `Hi DRIPSTARS.COM, I am interested in the ${p.name} (${p.storage}${colorLabel}, ${p.condition}) at ${money(p.price)}. Please confirm availability and delivery details.`;
  window.open(`https://wa.me/27838614484?text=${encodeURIComponent(text)}`, "_blank");
}

// ---------- Category filter chips + category cards + nav links ----------
function goToCategory(filterValue){
  activeFilter = filterValue;
  document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active", x.dataset.filter===activeFilter));
  searchTerm = "";
  document.getElementById("searchInput").value = "";
  hideSuggestions();
  renderProducts();
  document.getElementById("phones").scrollIntoView({behavior:"smooth"});
}

document.querySelectorAll(".filter,.category-card").forEach(btn=>{
  btn.addEventListener("click",()=> goToCategory(btn.dataset.filter));
});

document.querySelectorAll(".desktop-nav a[data-filter]").forEach(link=>{
  link.addEventListener("click", e=>{
    e.preventDefault();
    goToCategory(link.dataset.filter);
    document.querySelector(".desktop-nav").classList.remove("nav-open");
    document.getElementById("menuToggle").classList.remove("is-active");
  });
});

// ---------- Search with autocomplete ----------
function getSuggestions(term){
  const t = term.trim().toLowerCase();
  if(!t) return {categories:[], items:[]};
  const categories = Object.keys(CATEGORY_KEYWORDS).filter(c => c.toLowerCase().includes(t) || t.includes(c.toLowerCase()));
  const items = products.filter(p => p.name.toLowerCase().includes(t)).slice(0,5);
  return {categories, items};
}

function renderSuggestions(term){
  const box = document.getElementById("searchSuggestions");
  const invalidMsg = document.getElementById("searchInvalidMsg");
  const input = document.getElementById("searchInput");

  if(!term.trim()){
    box.hidden = true;
    invalidMsg.hidden = true;
    input.classList.remove("invalid");
    return;
  }

  const {categories, items} = getSuggestions(term);

  if(!categories.length && !items.length){
    box.hidden = true;
    invalidMsg.hidden = false;
    input.classList.add("invalid");
    return;
  }

  invalidMsg.hidden = true;
  input.classList.remove("invalid");
  box.hidden = false;
  box.innerHTML = [
    ...categories.map(c => `<button type="button" class="suggestion suggestion-category" data-type="category" data-value="${c}">📂 ${c}s <span>category</span></button>`),
    ...items.map(p => `<button type="button" class="suggestion" data-type="product" data-value="${p.id}">${p.name} <span>${money(p.price)}</span></button>`)
  ].join("");
}

function hideSuggestions(){
  document.getElementById("searchSuggestions").hidden = true;
  document.getElementById("searchInvalidMsg").hidden = true;
  document.getElementById("searchInput").classList.remove("invalid");
}

document.getElementById("searchToggle").addEventListener("click",()=>{
  document.getElementById("searchPanel").classList.toggle("open");
  document.getElementById("searchInput").focus();
});

document.getElementById("searchInput").addEventListener("input", e=>{
  searchTerm = e.target.value;
  renderSuggestions(searchTerm);
});

document.getElementById("searchSuggestions").addEventListener("click", e=>{
  const btn = e.target.closest(".suggestion");
  if(!btn) return;
  if(btn.dataset.type === "category"){
    goToCategory(btn.dataset.value);
  } else {
    openDetail(Number(btn.dataset.value));
    document.getElementById("searchPanel").classList.remove("open");
    hideSuggestions();
  }
});

document.getElementById("searchInput").addEventListener("keydown", e=>{
  if(e.key !== "Enter") return;
  e.preventDefault();
  const term = e.target.value.trim();
  if(!term){ return; }
  const {categories, items} = getSuggestions(term);
  if(categories.length){
    goToCategory(categories[0]);
    document.getElementById("searchPanel").classList.remove("open");
  } else if(items.length === 1){
    openDetail(items[0].id);
    document.getElementById("searchPanel").classList.remove("open");
    hideSuggestions();
  } else if(items.length > 1){
    searchTerm = term;
    renderProducts();
    document.getElementById("searchPanel").classList.remove("open");
    hideSuggestions();
    document.getElementById("phones").scrollIntoView({behavior:"smooth"});
  } else {
    document.getElementById("searchInput").classList.add("invalid");
    document.getElementById("searchInvalidMsg").hidden = false;
    document.getElementById("searchSuggestions").hidden = true;
  }
});

document.addEventListener("click", e=>{
  if(!e.target.closest(".search-panel")) hideSuggestions();
});

// ---------- Filters panel ----------
document.getElementById("filterToggle").addEventListener("click",()=>{
  document.getElementById("filterPanel").hidden = !document.getElementById("filterPanel").hidden;
});

document.getElementById("applyFilters").addEventListener("click",()=>{
  sortBy = document.getElementById("sortSelect").value;
  conditionFilters = Array.from(document.querySelectorAll(".conditionCheck:checked")).map(c=>c.value);
  const minVal = document.getElementById("priceMin").value;
  const maxVal = document.getElementById("priceMax").value;
  priceMin = minVal ? Number(minVal) : null;
  priceMax = maxVal ? Number(maxVal) : null;
  renderProducts();
  document.getElementById("filterPanel").hidden = true;
});

document.getElementById("clearFilters").addEventListener("click",()=>{
  sortBy = "default";
  conditionFilters = [];
  priceMin = null;
  priceMax = null;
  document.getElementById("sortSelect").value = "default";
  document.querySelectorAll(".conditionCheck").forEach(c=>c.checked=false);
  document.getElementById("priceMin").value = "";
  document.getElementById("priceMax").value = "";
  renderProducts();
});

document.getElementById("cartOpen").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
document.getElementById("overlay").addEventListener("click",closeCart);

document.getElementById("whatsappCartBtn").addEventListener("click",()=>{
  window.open(`https://wa.me/27838614484?text=${encodeURIComponent(whatsappText())}`, "_blank");
});

document.getElementById("checkoutBtn").addEventListener("click", async ()=>{
  if(!cart.length) return alert("Your cart is empty.");
  closeCart();

  // If the shopper is logged in, prefill the form with their saved details
  if (sb) {
    try {
      const { data: { user } } = await sb.auth.getUser();
      if (user) {
        const { data: profile } = await sb
          .from("profiles")
          .select("full_name, phone, email, delivery_address, delivery_method")
          .eq("id", user.id)
          .single();
        if (profile) {
          const form = document.getElementById("checkoutForm");
          if (profile.full_name) form.querySelector("[name=name]").value = profile.full_name;
          if (profile.phone) form.querySelector("[name=phone]").value = profile.phone;
          form.querySelector("[name=email]").value = profile.email || user.email || "";
          if (profile.delivery_address) form.querySelector("[name=address]").value = profile.delivery_address;
          if (profile.delivery_method) form.querySelector("[name=delivery]").value = profile.delivery_method;
        }
      }
    } catch (err) {
      console.error("Could not load saved details:", err);
    }
  }

  document.getElementById("checkoutModal").classList.add("show");
});
document.getElementById("checkoutClose").addEventListener("click",()=>{
  document.getElementById("checkoutModal").classList.remove("show");
});

// ============================================================
// Checkout submit — saves the order to Supabase, then opens
// WhatsApp with the order number included.
// ============================================================
document.getElementById("checkoutForm").addEventListener("submit", async (e)=>{
  e.preventDefault();
  if(!cart.length) return;

  const submitBtn = e.target.querySelector("button[type=submit]");
  const originalLabel = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  const data = new FormData(e.target);

  const orderItems = cart.map(x => {
    const p = products.find(y => y.id === x.id);
    return { name: p.name, storage: p.storage, qty: x.qty, price: p.price, color: x.color };
  });
  const total = cart.reduce((sum, x) => sum + products.find(y => y.id === x.id).price * x.qty, 0);

  try {
    if (!sb) throw new Error("Supabase not connected");

    // If the shopper is logged in, tag this order to their account
    let userId = null;
    const { data: { user } } = await sb.auth.getUser();
    if (user) userId = user.id;

    // Ask the database for the next order number (DS-2026-0001, ...)
    const { data: orderNumber, error: rpcError } = await sb.rpc("next_order_number");
    if (rpcError) throw rpcError;

    // Save the full order
    const { error: insertError } = await sb.from("orders").insert({
      order_number: orderNumber,
      user_id: userId,
      customer_name: data.get("name"),
      customer_phone: data.get("phone"),
      customer_email: data.get("email"),
      delivery_address: data.get("address"),
      delivery_method: data.get("delivery"),
      payment_method: data.get("payment"),
      items: orderItems,
      total: total
    });
    if (insertError) throw insertError;

    const message = `Hi DRIPSTARS.COM, I have submitted an online order.\nOrder #: ${orderNumber}\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nDelivery address: ${data.get("address")}\nDelivery method: ${data.get("delivery")}\nPayment: ${data.get("payment")}\n\n${whatsappText()}`;

    cart = [];
    saveCart();
    document.getElementById("checkoutModal").classList.remove("show");
    window.open(`https://wa.me/27838614484?text=${encodeURIComponent(message)}`, "_blank");

  } catch (err) {
    console.error("Order save failed:", err);
    alert("Something went wrong saving your order. Please try again, or message us directly on WhatsApp.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("menuToggle").addEventListener("click",()=>{
  document.querySelector(".desktop-nav").classList.toggle("nav-open");
  document.getElementById("menuToggle").classList.toggle("is-active");
});

document.querySelectorAll(".desktop-nav a:not([data-filter])").forEach(link=>{
  link.addEventListener("click",()=>{
    document.querySelector(".desktop-nav").classList.remove("nav-open");
    document.getElementById("menuToggle").classList.remove("is-active");
  });
});

renderProducts();
renderCart();