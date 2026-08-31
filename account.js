/* ============================================================
   DRIPSTARS.COM — Account page logic
   Handles: sign up, sign in, owner detection + redirect,
   profile editing, and order history for logged-in customers.
   ============================================================ */

   const SUPABASE_URL = "https://ohixdjcyqaxjkvnjuili.supabase.co";
   const SUPABASE_ANON_KEY = "sb_publishable_J3NbhSB_S2muyAOfxkh9Aw_fvuU0f7I";
   let sb = null;
   try {
     if (window.supabase) {
       sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
     } else {
       console.error("Supabase library did not load — check the script tag in account.html.");
     }
   } catch (err) {
     console.error("Supabase failed to initialize:", err);
   }
   
   const money = n => `R${Number(n).toLocaleString("en-ZA")}`;
   
   // ---------------- Tabs ----------------
   
   document.querySelectorAll(".auth-tab").forEach(tab => {
     tab.addEventListener("click", () => {
       document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("active"));
       tab.classList.add("active");
       document.getElementById("loginForm").hidden = tab.dataset.tab !== "login";
       document.getElementById("signupForm").hidden = tab.dataset.tab !== "signup";
       document.getElementById("verifyForm").hidden = true;
     });
   });
   
   let pendingVerificationEmail = null;
   
   // ---------------- Session check on page load ----------------
   
   async function checkSession() {
     if (!sb) {
       showAuthScreen();
       return;
     }
     const { data: { session } } = await sb.auth.getSession();
     if (session) {
       await routeAfterLogin();
     } else {
       showAuthScreen();
     }
   }
   
   function showAuthScreen() {
     document.getElementById("authScreen").hidden = false;
     document.getElementById("dashboard").hidden = true;
     document.getElementById("redirectScreen").hidden = true;
   }
   
   function showDashboard() {
     document.getElementById("authScreen").hidden = true;
     document.getElementById("dashboard").hidden = false;
     document.getElementById("redirectScreen").hidden = true;
     loadProfile();
     loadOrders();
   }
   
   function showRedirecting() {
     document.getElementById("authScreen").hidden = true;
     document.getElementById("dashboard").hidden = true;
     document.getElementById("redirectScreen").hidden = false;
   }
   
   // After a successful login, decide: owner -> admin.html, customer -> dashboard here
   async function routeAfterLogin() {
     const { data: { user } } = await sb.auth.getUser();
     if (!user) { showAuthScreen(); return; }
   
     const { data: profile, error } = await sb
       .from("profiles")
       .select("is_owner")
       .eq("id", user.id)
       .single();
   
     if (error) {
       console.error("Could not load profile:", error);
       showDashboard();
       return;
     }
   
     if (profile && profile.is_owner) {
       showRedirecting();
       window.location.href = "admin.html";
     } else {
       showDashboard();
     }
   }
   
   // ---------------- Sign in ----------------
   
   document.getElementById("loginForm").addEventListener("submit", async (e) => {
     e.preventDefault();
     const errorEl = document.getElementById("loginError");
     errorEl.hidden = true;
   
     if (!sb) {
       errorEl.textContent = "Can't connect right now — please refresh and try again.";
       errorEl.hidden = false;
       return;
     }
   
     const email = document.getElementById("loginEmail").value;
     const password = document.getElementById("loginPassword").value;
   
     const { error } = await sb.auth.signInWithPassword({ email, password });
     if (error) {
       errorEl.textContent = error.message.includes("Email not confirmed")
         ? "Please verify your email first — check your inbox for the 6-digit code."
         : "Incorrect email or password.";
       errorEl.hidden = false;
       return;
     }
   
     await routeAfterLogin();
   });
   
   // ---------------- Sign up ----------------
   
   document.getElementById("signupForm").addEventListener("submit", async (e) => {
     e.preventDefault();
     const errorEl = document.getElementById("signupError");
     errorEl.hidden = true;
   
     if (!sb) {
       errorEl.textContent = "Can't connect right now — please refresh and try again.";
       errorEl.hidden = false;
       return;
     }
   
     const name = document.getElementById("signupName").value;
     const email = document.getElementById("signupEmail").value;
     const phone = document.getElementById("signupPhone").value;
     const password = document.getElementById("signupPassword").value;
   
     const { data, error } = await sb.auth.signUp({
       email,
       password,
       options: { data: { full_name: name, phone: phone } }
     });
   
     if (error) {
       errorEl.textContent = error.message;
       errorEl.hidden = false;
       return;
     }
   
     // Save the extra details (name/phone) onto their profile row
     if (data.user) {
       await sb.from("profiles").update({
         full_name: name,
         phone: phone
       }).eq("id", data.user.id);
     }
   
     // Switch to the "enter your code" screen
     pendingVerificationEmail = email;
     showVerifyScreen(email);
   });
   
   // ---------------- Verify code ----------------
   
   function showVerifyScreen(email) {
     document.getElementById("loginForm").hidden = true;
     document.getElementById("signupForm").hidden = true;
     document.getElementById("verifyForm").hidden = false;
     document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("active"));
     document.getElementById("verifyEmailDisplay").textContent = email;
     document.getElementById("verifyError").hidden = true;
     document.getElementById("verifySuccess").hidden = true;
     document.getElementById("verifyCode").value = "";
     document.getElementById("verifyCode").focus();
   }
   
   document.getElementById("verifyForm").addEventListener("submit", async (e) => {
     e.preventDefault();
     const errorEl = document.getElementById("verifyError");
     errorEl.hidden = true;
   
     if (!pendingVerificationEmail) {
       errorEl.textContent = "Something went wrong — please sign up again.";
       errorEl.hidden = false;
       return;
     }
   
     const code = document.getElementById("verifyCode").value.trim();
   
     const { error } = await sb.auth.verifyOtp({
       email: pendingVerificationEmail,
       token: code,
       type: "signup"
     });
   
     if (error) {
       errorEl.textContent = "That code is incorrect or has expired. Check the code and try again, or resend it.";
       errorEl.hidden = false;
       return;
     }
   
     await routeAfterLogin();
   });
   
   document.getElementById("resendCodeBtn").addEventListener("click", async () => {
     if (!pendingVerificationEmail) return;
     const successEl = document.getElementById("verifySuccess");
     const errorEl = document.getElementById("verifyError");
     errorEl.hidden = true;
     successEl.hidden = true;
   
     const { error } = await sb.auth.resend({ type: "signup", email: pendingVerificationEmail });
     if (error) {
       errorEl.textContent = "Couldn't resend the code — please try again in a moment.";
       errorEl.hidden = false;
       return;
     }
     successEl.textContent = "A new code has been sent.";
     successEl.hidden = false;
   });
   
   document.getElementById("backToSignupBtn").addEventListener("click", () => {
     pendingVerificationEmail = null;
     document.getElementById("verifyForm").hidden = true;
     document.getElementById("signupForm").hidden = false;
     document.querySelector('.auth-tab[data-tab="signup"]').classList.add("active");
   });
   
   // ---------------- Sign out ----------------
   
   document.getElementById("signOutBtn").addEventListener("click", async () => {
     if (sb) await sb.auth.signOut();
     showAuthScreen();
   });
   
   // ---------------- Profile ----------------
   
   async function loadProfile() {
     const { data: { user } } = await sb.auth.getUser();
     if (!user) return;
   
     const { data: profile, error } = await sb
       .from("profiles")
       .select("*")
       .eq("id", user.id)
       .single();
   
     if (error) { console.error(error); return; }
   
     document.getElementById("profileName").value = profile.full_name || "";
     document.getElementById("profilePhone").value = profile.phone || "";
     document.getElementById("profileEmail").value = profile.email || user.email || "";
     document.getElementById("profileAddress").value = profile.delivery_address || "";
     document.getElementById("profileDelivery").value = profile.delivery_method || "PostNet counter-to-counter";
   }
   
   document.getElementById("profileForm").addEventListener("submit", async (e) => {
     e.preventDefault();
     const { data: { user } } = await sb.auth.getUser();
     if (!user) return;
   
     const savedMsg = document.getElementById("profileSaved");
     savedMsg.hidden = true;
   
     const { error } = await sb.from("profiles").update({
       full_name: document.getElementById("profileName").value,
       phone: document.getElementById("profilePhone").value,
       delivery_address: document.getElementById("profileAddress").value,
       delivery_method: document.getElementById("profileDelivery").value
     }).eq("id", user.id);
   
     if (!error) {
       savedMsg.hidden = false;
       setTimeout(() => savedMsg.hidden = true, 3000);
     }
   });
   
   // ---------------- Order history ----------------
   
   async function loadOrders() {
     const { data: { user } } = await sb.auth.getUser();
     if (!user) return;
   
     document.getElementById("ordersLoading").hidden = false;
     document.getElementById("ordersEmpty").hidden = true;
   
     const { data: orders, error } = await sb
       .from("orders")
       .select("*")
       .eq("user_id", user.id)
       .order("created_at", { ascending: false });
   
     document.getElementById("ordersLoading").hidden = true;
   
     if (error) {
       console.error(error);
       return;
     }
   
     const list = document.getElementById("ordersList");
     if (!orders.length) {
       document.getElementById("ordersEmpty").hidden = false;
       list.innerHTML = "";
       return;
     }
   
     list.innerHTML = orders.map(o => `
       <div class="order-card">
         <div class="order-card-top">
           <span class="order-chip">${o.order_number}</span>
           <span class="status-pill status-${o.status.toLowerCase()}">${o.status}</span>
         </div>
         <p class="order-items">${o.items.map(i => `${i.qty}× ${i.name}${i.color ? " (" + i.color + ")" : ""}`).join(", ")}</p>
         <div class="order-total">${money(o.total)}</div>
         <div class="order-date">${new Date(o.created_at).toLocaleString("en-ZA", { dateStyle: "medium", timeStyle: "short" })}</div>
       </div>
     `).join("");
   }
   
   // ---------------- Init ----------------
   checkSession();