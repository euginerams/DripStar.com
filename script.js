const products = [
    {id:1, name:"iPhone 12 Pro 128GB", category:"Phone", price:7900},
    {id:2, name:"iPhone 12 Pro 256GB", category:"Phone", price:8300},
    {id:3, name:"iPhone 12 Pro Max 128GB", category:"Phone", price:9600},
    {id:4, name:"iPhone 12 Pro Max 256GB", category:"Phone", price:9900},
    {id:5, name:"iPhone 12 Pro Max 512GB", category:"Phone", price:10600},
    {id:6, name:"iPhone 13 Pro 128GB", category:"Phone", price:10100},
    {id:7, name:"iPhone 13 Pro 256GB", category:"Phone", price:10700},
    {id:8, name:"iPhone 13 128GB", category:"Phone", price:8300},
    {id:9, name:"iPhone 13 256GB", category:"Phone", price:8600},
    {id:10, name:"iPhone 13 Pro Max 128GB", category:"Phone", price:12600},
    {id:11, name:"iPhone 13 Pro Max 256GB", category:"Phone", price:13100},
    {id:12, name:"iPhone 13 Pro Max 512GB", category:"Phone", price:13600},
    {id:13, name:"iPhone 14 128GB", category:"Phone", price:10600},
    {id:14, name:"iPhone 14 256GB", category:"Phone", price:11000},
    {id:15, name:"iPhone 14 Pro 128GB", category:"Phone", price:13600},
    {id:16, name:"iPhone 14 Pro 256GB", category:"Phone", price:14100},
    {id:17, name:"Lenovo i5 Laptop", category:"Laptop", price:4500},
    {id:18, name:"Tablet (coming soon)", category:"Tablet", price:0}
  ];
  
  let cart = JSON.parse(localStorage.getItem("dripstars-cart") || "[]");
  let activeFilter = "All";
  let searchTerm = "";
  
  const money = n => n ? `R${n.toLocaleString("en-ZA")}` : "Price on request";
  
  function renderProducts(){
    const grid = document.getElementById("productGrid");
    const empty = document.getElementById("emptyState");
    const visible = products.filter(p => {
      const categoryOK = activeFilter === "All" || p.category === activeFilter;
      const searchOK = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryOK && searchOK;
    });
    grid.innerHTML = visible.map(p => `
      <article class="product-card">
        <div class="product-image ${p.category.toLowerCase()}">
        </div>
        <div class="product-info">
          <span class="product-type">${p.category}</span>
          <h3>${p.name}</h3>
          <div class="price">${money(p.price)}</div>
          <div class="product-actions">
            <button class="mini-btn primary" onclick="addToCart(${p.id})" ${!p.price ? "disabled" : ""}>Add to cart</button>
            <button class="mini-btn" onclick="whatsappProduct(${p.id})">WhatsApp</button>
          </div>
        </div>
      </article>
    `).join("");
    empty.hidden = visible.length !== 0;
  }
  
  function saveCart(){
    localStorage.setItem("dripstars-cart", JSON.stringify(cart));
    renderCart();
  }
  
  function addToCart(id){
    const product = products.find(p => p.id === id);
    if(!product || !product.price) return;
    const existing = cart.find(x => x.id === id);
    if(existing) existing.qty++;
    else cart.push({id, qty:1});
    saveCart();
    openCart();
  }
  
  function removeFromCart(id){
    cart = cart.filter(x => x.id !== id);
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
        return `<div class="cart-item">
          <div><h4>${p.name}</h4><small>${x.qty} × ${money(p.price)}</small></div>
          <div><strong>${money(p.price*x.qty)}</strong><br><button onclick="removeFromCart(${p.id})">Remove</button></div>
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
      return `• ${p.name} x${x.qty} - ${money(p.price*x.qty)}`;
    });
    const total = cart.reduce((sum,x)=>sum+products.find(y=>y.id===x.id).price*x.qty,0);
    return `Hi DRIPSTARS.COM, I would like to place an order:\n${lines.join("\n")}\n\nEstimated total: ${money(total)}\nPlease confirm availability and delivery details.`;
  }
  
  function whatsappProduct(id){
    const p = products.find(x=>x.id===id);
    const text = `Hi DRIPSTARS.COM, I am interested in the ${p.name} (${money(p.price)}). Please confirm availability and delivery details.`;
    window.open(`https://wa.me/27838614484?text=${encodeURIComponent(text)}`, "_blank");
  }
  
  document.querySelectorAll(".filter,.category-card").forEach(btn=>{
    btn.addEventListener("click",()=>{
      activeFilter = btn.dataset.filter;
      document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active", x.dataset.filter===activeFilter));
      document.getElementById("phones").scrollIntoView({behavior:"smooth"});
      renderProducts();
    });
  });
  
  document.getElementById("searchToggle").addEventListener("click",()=>{
    document.getElementById("searchPanel").classList.toggle("open");
    document.getElementById("searchInput").focus();
  });
  document.getElementById("searchInput").addEventListener("input",e=>{
    searchTerm=e.target.value;
    renderProducts();
  });
  document.getElementById("cartOpen").addEventListener("click",openCart);
  document.getElementById("cartClose").addEventListener("click",closeCart);
  document.getElementById("overlay").addEventListener("click",closeCart);
  
  document.getElementById("whatsappCartBtn").addEventListener("click",()=>{
    window.open(`https://wa.me/27838614484?text=${encodeURIComponent(whatsappText())}`, "_blank");
  });
  
  document.getElementById("checkoutBtn").addEventListener("click",()=>{
    if(!cart.length) return alert("Your cart is empty.");
    closeCart();
    document.getElementById("checkoutModal").classList.add("show");
  });
  document.getElementById("checkoutClose").addEventListener("click",()=>{
    document.getElementById("checkoutModal").classList.remove("show");
  });
  
  document.getElementById("checkoutForm").addEventListener("submit",e=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const order = {
      customer:Object.fromEntries(data.entries()),
      items:cart.map(x=>({product:products.find(p=>p.id===x.id).name,qty:x.qty})),
      createdAt:new Date().toISOString()
    };
    // Front-end demo storage only. A backend will be added in the next build stage.
    localStorage.setItem("dripstars-last-order",JSON.stringify(order));
    const message = `Hi DRIPSTARS.COM, I have submitted an online order.\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nDelivery: ${data.get("address")}\nPayment: ${data.get("payment")}\n\n${whatsappText()}`;
    cart=[];
    saveCart();
    document.getElementById("checkoutModal").classList.remove("show");
    window.open(`https://wa.me/27838614484?text=${encodeURIComponent(message)}`, "_blank");
  });
  
  document.getElementById("year").textContent = new Date().getFullYear();
  
  document.getElementById("menuToggle").addEventListener("click",()=>{
    const nav=document.querySelector(".desktop-nav");
    nav.style.display = nav.style.display==="flex" ? "" : "flex";
    nav.style.position="absolute";
    nav.style.top="70px";
    nav.style.left="0";
    nav.style.right="0";
    nav.style.background="#080808";
    nav.style.padding="18px";
    nav.style.flexDirection="column";
  });
  
  document.querySelectorAll("[data-product]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const p=products.find(x=>x.name===btn.dataset.product);
      if(p) addToCart(p.id);
    });
  });
  
  renderProducts();
  renderCart();