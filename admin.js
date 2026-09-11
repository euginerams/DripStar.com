/* ============================================================
   DRIPSTARS.COM — Admin dashboard logic
   No login form here — access is granted only to whoever signs
   in at account.html AND has is_owner = true on their profile.
   ============================================================ */

   const SUPABASE_URL = "https://ohixdjcyqaxjkvnjuili.supabase.co";
   const SUPABASE_ANON_KEY = "sb_publishable_J3NbhSB_S2muyAOfxkh9Aw_fvuU0f7I";
   let sb = null;
   try {
     if (window.supabase) {
       sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
     } else {
       console.error("Supabase library did not load — check the script tag in admin.html.");
     }
   } catch (err) {
     console.error("Supabase failed to initialize:", err);
   }
   
   let allOrders = [];
   let searchTerm = "";
   let statusFilter = "All";
   
   
   // ---------------- Access check ----------------
   
   async function checkAccess() {
     const accessMsg = document.getElementById("accessMessage");
   
     if (!sb) {
       accessMsg.textContent = "Can't connect right now. Please refresh the page.";
       return;
     }
   
     const { data: { session } } = await sb.auth.getSession();
     if (!session) {
       accessMsg.textContent = "Redirecting to sign in...";
       window.location.href = "account.html";
       return;
     }
   
     const { data: { user } } = await sb.auth.getUser();
     const { data: profile, error } = await sb
       .from("profiles")
       .select("is_owner")
       .eq("id", user.id)
       .single();
   
     if (error || !profile || !profile.is_owner) {
       accessMsg.textContent = "This dashboard is for the store owner only. Redirecting...";
       setTimeout(() => { window.location.href = "account.html"; }, 1800);
       return;
     }
   
     showDashboard();
   }
   
   function showDashboard() {
     document.getElementById("accessScreen").hidden = true;
     document.getElementById("dashboard").hidden = false;
     loadOrders();
   }
   
   document.getElementById("signOutBtn").addEventListener("click", async () => {
     if (sb) await sb.auth.signOut();
     window.location.href = "account.html";
   });
   
   // ---------------- Loading orders ----------------
   
   async function loadOrders() {
     if (!sb) return;
   
     document.getElementById("ordersLoading").hidden = false;
     document.getElementById("ordersEmpty").hidden = true;
   
     const { data, error } = await sb
       .from("orders")
       .select("*")
       .order("created_at", { ascending: false });
   
     document.getElementById("ordersLoading").hidden = true;
   
     if (error) {
       console.error(error);
       document.getElementById("ordersBody").innerHTML =
         `<tr><td colspan="6" style="color:#a33">Could not load orders. Check your Supabase keys/RLS policies.</td></tr>`;
       return;
     }
   
     allOrders = data;
     renderStats();
     renderTable();
   }
   
   function renderStats() {
     const today = new Date().toDateString();
     document.getElementById("statTotal").textContent = allOrders.length;
     document.getElementById("statToday").textContent =
       allOrders.filter(o => new Date(o.created_at).toDateString() === today).length;
     document.getElementById("statPending").textContent =
       allOrders.filter(o => o.status === "Pending").length;
     document.getElementById("statRevenue").textContent =
       money(allOrders.reduce((sum, o) => sum + Number(o.total), 0));
   }
   
   function matchesFilters(o) {
     const statusOK = statusFilter === "All" || o.status === statusFilter;
     const haystack = `${o.order_number} ${o.customer_name} ${o.customer_phone}`.toLowerCase();
     const searchOK = haystack.includes(searchTerm.toLowerCase());
     return statusOK && searchOK;
   }
   
   function renderTable() {
     const visible = allOrders.filter(matchesFilters);
     const body = document.getElementById("ordersBody");
     const empty = document.getElementById("ordersEmpty");
   
     body.innerHTML = visible.map(o => `
       <tr data-id="${o.id}">
         <td><span class="order-chip">${o.order_number}</span></td>
         <td>
           <span class="cust-name">${o.customer_name}</span>
           <span class="cust-sub">${o.customer_phone}</span>
         </td>
         <td class="items-preview">${o.items.map(i => `${i.qty}× ${i.name}${i.color ? " (" + i.color + ")" : ""}`).join(", ")}</td>
         <td><strong>${money(o.total)}</strong></td>
         <td><span class="status-pill status-${o.status.toLowerCase()}">${o.status}</span></td>
         <td>${new Date(o.created_at).toLocaleString("en-ZA", { dateStyle: "medium", timeStyle: "short" })}</td>
       </tr>
     `).join("");
   
     empty.hidden = visible.length !== 0;
   }
   
   document.getElementById("ordersBody").addEventListener("click", (e) => {
     const row = e.target.closest("tr[data-id]");
     if (!row) return;
     openDetail(row.dataset.id);
   });
   
   // ---------------- Filters ----------------
   
   document.getElementById("orderSearch").addEventListener("input", (e) => {
     searchTerm = e.target.value;
     renderTable();
   });
   document.getElementById("statusFilter").addEventListener("change", (e) => {
     statusFilter = e.target.value;
     renderTable();
   });
   document.getElementById("refreshBtn").addEventListener("click", loadOrders);
   
   // ---------------- Detail drawer ----------------
   
   function openDetail(id) {
     const o = allOrders.find(x => x.id === id);
     if (!o) return;
   
     document.getElementById("detailOrderNumber").textContent = o.order_number;
     document.getElementById("detailBody").innerHTML = `
       <div class="detail-section">
         <h4>Status</h4>
         <select class="status-select" id="statusSelect">
           ${["Pending","Confirmed","Shipped","Completed","Cancelled"]
             .map(s => `<option value="${s}" ${s === o.status ? "selected" : ""}>${s}</option>`).join("")}
         </select>
       </div>
       <div class="detail-section">
         <h4>Customer</h4>
         <p class="detail-line"><strong>${o.customer_name}</strong></p>
         <p class="detail-line">${o.customer_phone}</p>
         <p class="detail-line">${o.customer_email}</p>
       </div>
       <div class="detail-section">
         <h4>Delivery</h4>
         <p class="detail-line">${o.delivery_address}</p>
         <p class="detail-line">${o.delivery_method}</p>
       </div>
       <div class="detail-section">
         <h4>Payment</h4>
         <p class="detail-line">${o.payment_method}</p>
         <p class="detail-line">Status: <strong>${o.payment_status || "Awaiting payment"}</strong></p>
         ${o.proof_of_payment_path
           ? `<button type="button" class="btn btn-outline dark-outline" id="viewProofBtn">View proof of payment</button>
              <p class="checkout-note" id="proofError" hidden>Could not open the file — it may have been removed.</p>`
           : `<p class="checkout-note">No proof of payment uploaded yet.</p>`}
       </div>
       <div class="detail-section">
         <h4>Items</h4>
         ${o.items.map(i => `
           <div class="detail-item-row">
             <span>${i.qty}× ${i.name} (${i.storage}${i.color ? ", " + i.color : ""})</span>
             <span>${money(i.price * i.qty)}</span>
           </div>`).join("")}
         <div class="detail-total"><span>Total</span><span>${money(o.total)}</span></div>
       </div>
     `;
   
     if (o.proof_of_payment_path){
       document.getElementById("viewProofBtn").addEventListener("click", async () => {
         const { data, error } = await sb.storage
           .from("proof-of-payments")
           .createSignedUrl(o.proof_of_payment_path, 60 * 5); // link valid 5 minutes
         if (error || !data) {
           document.getElementById("proofError").hidden = false;
           return;
         }
         window.open(data.signedUrl, "_blank");
       });
     }
   
     document.getElementById("statusSelect").addEventListener("change", async (e) => {
       const newStatus = e.target.value;
       const { error } = await sb.from("orders").update({ status: newStatus }).eq("id", o.id);
       if (!error) {
         o.status = newStatus;
         renderStats();
         renderTable();
       }
     });
   
     document.getElementById("detailDrawer").classList.add("open");
     document.getElementById("overlay").classList.add("show");
   }
   
   document.getElementById("detailClose").addEventListener("click", closeDetail);
   document.getElementById("overlay").addEventListener("click", closeDetail);
   function closeDetail() {
     document.getElementById("detailDrawer").classList.remove("open");
     document.getElementById("overlay").classList.remove("show");
   }
   
   // ---------------- Init ----------------
   checkAccess();