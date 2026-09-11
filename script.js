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
  // ---------- PHONES — real DRIPSTARS.COM stock, all New ----------
  // Colors updated per the owner's latest photo-naming list. Storage
  // and pricing carried over from the earlier flyer-based catalog by
  // matching model name/order — see the 4 rows flagged "PRICE TBD"
  // below, where the new list's count didn't line up with known pricing.
  {id:1, name:"iPhone 7", category:"Phone", type:"Smartphone", price:2850, condition:"New", storage:"32GB", ram:"", colors:["Black"], description:"Compact and reliable entry-level iPhone."},
  {id:2, name:"iPhone 7", category:"Phone", type:"Smartphone", price:3000, condition:"New", storage:"128GB", ram:"", colors:["Black"], description:"Compact and reliable entry-level iPhone."},
  {id:3, name:"iPhone 7", category:"Phone", type:"Smartphone", price:3300, condition:"New", storage:"256GB", ram:"", colors:["Black"], description:"Compact and reliable entry-level iPhone, top storage option."},
  {id:4, name:"iPhone 7 Plus", category:"Phone", type:"Smartphone", price:3300, condition:"New", storage:"32GB", ram:"", colors:["Black"], description:"Larger-screen iPhone 7 with dual camera system."},
  {id:5, name:"iPhone 7 Plus", category:"Phone", type:"Smartphone", price:3700, condition:"New", storage:"256GB", ram:"", colors:["Black"], description:"Larger-screen iPhone 7 with dual camera system, top storage option."},
  {id:6, name:"iPhone 8", category:"Phone", type:"Smartphone", price:3350, condition:"New", storage:"64GB", ram:"", colors:["Space Grey"], description:"Glass-backed iPhone 8 with wireless charging support."},
  {id:7, name:"iPhone 8", category:"Phone", type:"Smartphone", price:3750, condition:"New", storage:"128GB", ram:"", colors:["Space Grey"], description:"Glass-backed iPhone 8 with wireless charging support."},
  {id:8, name:"iPhone 8", category:"Phone", type:"Smartphone", price:3800, condition:"New", storage:"256GB", ram:"", colors:["Space Grey"], description:"Glass-backed iPhone 8 with wireless charging support, top storage option."},
  {id:9, name:"iPhone 8 Plus", category:"Phone", type:"Smartphone", price:4000, condition:"New", storage:"64GB", ram:"", colors:["Space Grey"], description:"Larger iPhone 8 with dual camera and Portrait mode."},
  {id:10, name:"iPhone 8 Plus", category:"Phone", type:"Smartphone", price:4400, condition:"New", storage:"256GB", ram:"", colors:["Space Grey"], description:"Larger iPhone 8 with dual camera and Portrait mode, top storage option."},
  {id:11, name:"iPhone X", category:"Phone", type:"Smartphone", price:4400, condition:"New", storage:"64GB", ram:"", colors:["Silver"], description:"Edge-to-edge display with Face ID, Apple's first OLED iPhone.", featured:true},
  {id:12, name:"iPhone X", category:"Phone", type:"Smartphone", price:4700, condition:"New", storage:"256GB", ram:"", colors:["Silver"], description:"Edge-to-edge display with Face ID, Apple's first OLED iPhone."},
  {id:13, name:"iPhone XR", category:"Phone", type:"Smartphone", price:4550, condition:"New", storage:"64GB", ram:"", colors:["Black"], description:"Colourful, durable iPhone with a Liquid Retina display."},
  {id:14, name:"iPhone XR", category:"Phone", type:"Smartphone", price:4900, condition:"New", storage:"128GB", ram:"", colors:["Black"], description:"Colourful, durable iPhone with a Liquid Retina display."},
  {id:15, name:"iPhone XR", category:"Phone", type:"Smartphone", price:5200, condition:"New", storage:"256GB", ram:"", colors:["Black"], description:"Colourful, durable iPhone with a Liquid Retina display, top storage option."},
  {id:16, name:"iPhone XS", category:"Phone", type:"Smartphone", price:4700, condition:"New", storage:"64GB", ram:"", colors:["Gold"], description:"Premium stainless steel iPhone with a Super Retina display."},
  {id:17, name:"iPhone XS", category:"Phone", type:"Smartphone", price:5300, condition:"New", storage:"256GB", ram:"", colors:["Gold"], description:"Premium stainless steel iPhone with a Super Retina display."},
  {id:18, name:"iPhone XS Max", category:"Phone", type:"Smartphone", price:5900, condition:"New", storage:"64GB", ram:"", colors:["Black"], description:"The largest display of the XS lineup, in a premium steel-and-glass body."},
  {id:19, name:"iPhone XS Max", category:"Phone", type:"Smartphone", price:6700, condition:"New", storage:"256GB", ram:"", colors:["Black"], description:"The largest display of the XS lineup, in a premium steel-and-glass body."},
  {id:20, name:"iPhone XS Max", category:"Phone", type:"Smartphone", price:7000, condition:"New", storage:"512GB", ram:"", colors:["Black"], description:"The largest display of the XS lineup, top storage option.", featured:true},
  {id:21, name:"iPhone 11", category:"Phone", type:"Smartphone", price:5400, condition:"New", storage:"64GB", ram:"", colors:["Black"], description:"Dual-camera iPhone 11 with Night mode and all-day battery life."},
  {id:22, name:"iPhone 11", category:"Phone", type:"Smartphone", price:5750, condition:"New", storage:"128GB", ram:"", colors:["Black"], description:"Dual-camera iPhone 11 with Night mode and all-day battery life."},
  {id:23, name:"iPhone 11", category:"Phone", type:"Smartphone", price:6000, condition:"New", storage:"256GB", ram:"", colors:["Black"], description:"Dual-camera iPhone 11 with Night mode and all-day battery life, top storage option."},
  {id:24, name:"iPhone 11 Pro", category:"Phone", type:"Smartphone", price:6450, condition:"New", storage:"64GB", ram:"", colors:["Midnight Green"], description:"Triple-camera Pro system with an OLED Super Retina XDR display."},
  {id:25, name:"iPhone 11 Pro", category:"Phone", type:"Smartphone", price:7000, condition:"New", storage:"256GB", ram:"", colors:["Midnight Green"], description:"Triple-camera Pro system with an OLED Super Retina XDR display."},
  {id:26, name:"iPhone 11 Pro Max", category:"Phone", type:"Smartphone", price:7800, condition:"New", storage:"64GB", ram:"", colors:["Gold"], description:"The largest 11 Pro, with the best battery life of the lineup.", featured:true},
  {id:27, name:"iPhone 11 Pro Max", category:"Phone", type:"Smartphone", price:8300, condition:"New", storage:"256GB", ram:"", colors:["Gold"], description:"The largest 11 Pro, with the best battery life of the lineup."},
  {id:28, name:"iPhone 12", category:"Phone", type:"Smartphone", price:6100, condition:"New", storage:"64GB", ram:"", colors:["White"], description:"5G-ready iPhone 12 with a flat-edge design and Ceramic Shield front."},
  {id:29, name:"iPhone 12", category:"Phone", type:"Smartphone", price:6550, condition:"New", storage:"128GB", ram:"", colors:["White"], description:"5G-ready iPhone 12 with a flat-edge design and Ceramic Shield front."},
  {id:30, name:"iPhone 12", category:"Phone", type:"Smartphone", price:6800, condition:"New", storage:"256GB", ram:"", colors:["White"], description:"5G-ready iPhone 12 with a flat-edge design and Ceramic Shield front, top storage option."},
  {id:31, name:"iPhone 12 Pro", category:"Phone", type:"Smartphone", price:7900, condition:"New", storage:"128GB", ram:"", colors:["Pacific Blue"], description:"Triple camera system with LiDAR scanner and Pro-grade video.", featured:true},
  {id:32, name:"iPhone 12 Pro", category:"Phone", type:"Smartphone", price:8300, condition:"New", storage:"256GB", ram:"", colors:["Pacific Blue"], description:"Triple camera system with LiDAR scanner and Pro-grade video."},
  {id:33, name:"iPhone 12 Pro", category:"Phone", type:"Smartphone", price:7900, condition:"New", storage:"", ram:"", colors:["Pacific Blue"], description:"PRICE TBD — extra listing beyond known 128GB/256GB variants; please confirm storage and price."},
  {id:34, name:"iPhone 12 Pro", category:"Phone", type:"Smartphone", price:8300, condition:"New", storage:"", ram:"", colors:["Pacific Blue"], description:"PRICE TBD — extra listing beyond known 128GB/256GB variants; please confirm storage and price."},
  {id:35, name:"iPhone 12 Pro Max", category:"Phone", type:"Smartphone", price:9600, condition:"New", storage:"128GB", ram:"", colors:["Pacific Blue"], description:"The largest 12 Pro, with the best camera sensor of the lineup."},
  {id:36, name:"iPhone 12 Pro Max", category:"Phone", type:"Smartphone", price:9900, condition:"New", storage:"256GB", ram:"", colors:["Pacific Blue"], description:"The largest 12 Pro, with the best camera sensor of the lineup."},
  {id:37, name:"iPhone 12 Pro Max", category:"Phone", type:"Smartphone", price:10600, condition:"New", storage:"512GB", ram:"", colors:["Pacific Blue"], description:"The largest 12 Pro, top storage option."},
  {id:38, name:"iPhone 13 Pro", category:"Phone", type:"Smartphone", price:10100, condition:"New", storage:"128GB", ram:"", colors:["Gold"], description:"ProMotion display and Pro camera system with macro photography.", featured:true},
  {id:39, name:"iPhone 13 Pro", category:"Phone", type:"Smartphone", price:10700, condition:"New", storage:"256GB", ram:"", colors:["Gold"], description:"ProMotion display and Pro camera system with macro photography."},
  {id:40, name:"iPhone 13", category:"Phone", type:"Smartphone", price:8300, condition:"New", storage:"128GB", ram:"", colors:["Graphite"], description:"A15 Bionic chip with an improved dual camera system."},
  {id:41, name:"iPhone 13", category:"Phone", type:"Smartphone", price:8600, condition:"New", storage:"256GB", ram:"", colors:["Graphite"], description:"A15 Bionic chip with an improved dual camera system, top storage option."},
  {id:42, name:"iPhone 13 Pro Max", category:"Phone", type:"Smartphone", price:12600, condition:"New", storage:"128GB", ram:"", colors:["Starlight"], description:"The largest 13 Pro, with the best battery life in the 13 lineup."},
  {id:43, name:"iPhone 13 Pro Max", category:"Phone", type:"Smartphone", price:13100, condition:"New", storage:"256GB", ram:"", colors:["Starlight"], description:"The largest 13 Pro, with the best battery life in the 13 lineup."},
  {id:44, name:"iPhone 13 Pro Max", category:"Phone", type:"Smartphone", price:13600, condition:"New", storage:"512GB", ram:"", colors:["Starlight"], description:"The largest 13 Pro, top storage option."},
  {id:45, name:"iPhone 14", category:"Phone", type:"Smartphone", price:10600, condition:"New", storage:"128GB", ram:"", colors:["White"], description:"Dynamic Island and Always-On display."},
  {id:46, name:"iPhone 14", category:"Phone", type:"Smartphone", price:11100, condition:"New", storage:"256GB", ram:"", colors:["White"], description:"Dynamic Island and Always-On display, top storage option."},
  {id:47, name:"iPhone 14 Pro", category:"Phone", type:"Smartphone", price:13600, condition:"New", storage:"128GB", ram:"", colors:["Space Black"], description:"The largest and most capable iPhone 14, with the best battery life.", featured:true},
  {id:48, name:"iPhone 14 Pro", category:"Phone", type:"Smartphone", price:14100, condition:"New", storage:"256GB", ram:"", colors:["Space Black"], description:"The largest and most capable iPhone 14, top storage option."},
  {id:49, name:"iPhone 14 Pro Max", category:"Phone", type:"Smartphone", price:15600, condition:"New", storage:"256GB", ram:"", colors:["Space Black"], description:"Titanium design with the Action button and USB-C."},
  {id:50, name:"iPhone 14 Pro Max", category:"Phone", type:"Smartphone", price:16600, condition:"New", storage:"256GB", ram:"", colors:["Space Black"], description:"The largest 15 Pro, with the best zoom camera of the lineup.", featured:true},
  {id:51, name:"iPhone 15 Pro", category:"Phone", type:"Smartphone", price:17400, condition:"New", storage:"", ram:"", colors:["Space Black"], description:"PRICE TBD — extra listing beyond the known 256GB variant; please confirm storage and price."},
  {id:52, name:"iPhone 15 Pro Max", category:"Phone", type:"Smartphone", price:20100, condition:"New", storage:"", ram:"", colors:["Space Black"], description:"PRICE TBD — extra listing beyond the known 256GB variant; please confirm storage and price."},
  {id:53, name:"iPhone 16", category:"Phone", type:"Smartphone", price:16300, condition:"New", storage:"128GB", ram:"", colors:["Space Black"], description:"Apple's latest generation, with a new camera control button."},
  {id:54, name:"iPhone 16 Pro", category:"Phone", type:"Smartphone", price:24300, condition:"New", storage:"256GB", ram:"", colors:["White Titanium"], description:"Larger Pro display with the A18 Pro chip.", featured:true},
  {id:55, name:"iPhone 16 Pro Max", category:"Phone", type:"Smartphone", price:27600, condition:"New", storage:"256GB", ram:"", colors:["Natural Titanium"], description:"The largest and most capable iPhone 16, top of the current lineup.", featured:true},

  // ---------- LAPTOPS — real DRIPSTARS.COM stock (Pre-owned/refurbished) ----------
  {id:56, name:"Dell Latitude 7400", category:"Laptop", type:"Business laptop", price:5000, condition:"Pre-owned", storage:"", ram:"16GB RAM", colors:["Black"], description:"Intel Core i7 (8th Gen) business laptop with 16GB RAM.", featured:true},
  {id:57, name:"HP i5 Laptop", category:"Laptop", type:"Everyday laptop", price:4500, condition:"Pre-owned", storage:"256GB SSD", ram:"8GB RAM", colors:["Silver"], description:"Intel Core i5 laptop, a reliable everyday performer."},
  {id:58, name:"Lenovo i5 Laptop", category:"Laptop", type:"Everyday laptop", price:4500, condition:"Pre-owned", storage:"256GB SSD", ram:"8GB RAM", colors:["Black"], description:"Intel Core i5 laptop, a reliable everyday performer.", featured:true},
  {id:59, name:"Dell i5 Laptop", category:"Laptop", type:"Everyday laptop", price:4500, condition:"Pre-owned", storage:"256GB SSD", ram:"8GB RAM", colors:["Black"], description:"Intel Core i5 laptop, a reliable everyday performer."},

  // ---------- SNEAKERS — real DRIPSTARS.COM stock (56 pairs) ----------
  // Note: no prices given yet for these — showing "Price on request"
  // until the owner provides pricing. Condition assumed New.
  {id:60, name:"Nike Air Force 1 '07", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["White and Black", "White and Blue", "Light Khaki", "Cream White", "White"]},
  {id:61, name:"Nike P-6000", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Metalic Silver", "Black and Metalic Silver"]},
  {id:62, name:"New Balance 1000", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Pink and White", "Pink and sandstone"]},
  {id:63, name:"Nike Dunk Low", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Black and White", "Cream and White", "White and Pink + Black"]},
  {id:64, name:"Nike Air Jordan 4", category:"Sneaker", type:"Sneaker", price:1400, condition:"New", storage:"UK 6 - 11", ram:"", colors:["White and Pink"]},
  {id:65, name:"New Balance 9060", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Grey and Cream", "Black", "Brown Colorway"]},
  {id:66, name:"Nike Bailleli", category:"Sneaker", type:"Sneaker", price:1400, condition:"New", storage:"UK 6 - 11", ram:"", colors:["White and Pink", "White and Black"]},
  {id:67, name:"Nike Air Force 1", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["White and Light Grey Swoosh", "Monochromatic", "White and Red", "White and Blue", "Black"]},
  {id:68, name:"Nike Dunk Low SE", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Orewood Brown and Baroque Brown"]},
  {id:69, name:"Nike Air Jordan 1 Low SE", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Cargo Khaki and Olive Green", "Black"]},
  {id:70, name:"Nike Women's Shox R4", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Olive Khaki and Green"]},
  {id:71, name:"Nike Air Max 90", category:"Sneaker", type:"Sneaker", price:1400, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Black and Ice Blue", "White and Black"]},
  {id:72, name:"Nike SB Dunk Low Staple 'NYC Pigeon'", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Red and Dark + Medium Grey"]},
  {id:73, name:"New Balance Fresh Foam X CT-Rally court", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["White and Orange + Lime"]},
  {id:74, name:"New Balance 550 Low-Top", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["White and Burgundy"]},
  {id:75, name:"Women's Nike Air Jordan 1 Low SE", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["White and Pink"]},
  {id:76, name:"Adidas Adimule Slide", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Golden Beige"]},
  {id:77, name:"Nike Shox TL", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Light Blue", "White and Black"]},
  {id:78, name:"Adida Superstar", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Black and White"]},
  {id:79, name:"Nike x Tiffany & co. Air Force Low \"1837\"", category:"Sneaker", type:"Sneaker", price:1400, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Black and Blue"]},
  {id:80, name:"Nike Air Max Plus", category:"Sneaker", type:"Sneaker", price:1400, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Red and Black", "Blue and Black"]},
  {id:81, name:"Nike Women's Air Max Portal", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Vibrant Pink and White", "Purple and White Colorway", "White and Cream", "White and Pink"]},
  {id:82, name:"Nike Air Jordan 1 Retro High", category:"Sneaker", type:"Sneaker", price:1400, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Classic Red and White Leather"]},
  {id:83, name:"Puma Suede Classic low-top", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Vibrant Orange and White Colorway"]},
  {id:84, name:"Nike Air Jordan 1 Mid SE", category:"Sneaker", type:"Sneaker", price:1400, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Soft Pink and White", "White and Green"]},
  {id:85, name:"Adidas Superstar II", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["White and Black"]},
  {id:86, name:"Nike Mind 001 mule", category:"Sneaker", type:"Sneaker", price:1400, condition:"New", storage:"UK 6 - 11", ram:"", colors:["White"]},
  {id:87, name:"Nike Air Jordan 6 Retro", category:"Sneaker", type:"Sneaker", price:1400, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Black and Red"]},
  {id:88, name:"Vans Sk8-Hi High-top", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Classic Black"]},
  {id:89, name:"Adida Campus 00s", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Grey and White", "Black and White"]},
  {id:90, name:"Nike Air Jordan 1 Low", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["White and Squadron Blue"]},
  {id:91, name:"Nike Free Metcon training shoes", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Black and White"]},
  {id:92, name:"Nike Air Force 1 Low '07 LV8", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Light British Tan"]},
  {id:93, name:"New Balance Fresh Foam X Hierro v9", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Green"]},
  {id:94, name:"Zion Williamson x Air Jordan 1 Low OG 'voodoo Alternates", category:"Sneaker", type:"Sneaker", price:0, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Purple"]},
  {id:95, name:"Nike Air Forece 1 LOW \"Love & Peace\"", category:"Sneaker", type:"Sneaker", price:1400, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Cream"]},
  {id:96, name:"Nike Air Max 95 Big Bubble", category:"Sneaker", type:"Sneaker", price:1400, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Black"]},
  {id:97, name:"Pume Suede XL Archive", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Green and White"]},
  {id:98, name:"Nike Women's Dunk Low NH \"Winter Solstice", category:"Sneaker", type:"Sneaker", price:1400, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Warm Orange and Coral"]},
  {id:99, name:"Nike Shox R4", category:"Sneaker", type:"Sneaker", price:1400, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Distinctive Purple"]},
  {id:100, name:"Convers Run Star Hike Platform high-top", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Black and White"]},
  {id:101, name:"Converse Chuck Taylor All Star Classic Leather high-top", category:"Sneaker", type:"Sneaker", price:0, condition:"New", storage:"UK 6 - 11", ram:"", colors:["White"]},
  {id:102, name:"Air Jordan 1 Low x Travis Scott", category:"Sneaker", type:"Sneaker", price:1500, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Light + Vibrant Pink and white"]},
  {id:103, name:"Adidas Men's Retropy F2 2.0", category:"Sneaker", type:"Sneaker", price:1400, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Brown"]},
  {id:104, name:"Vans Classic Slip-On", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Black and White"]},
  {id:105, name:"Adidas Samba Jane", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Black and White"]},
  {id:106, name:"Puma Speedcat", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Brown"]},
  {id:107, name:"Converse Chuck Taylor All Star Lift Platform canvas low-top", category:"Sneaker", type:"Sneaker", price:0, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Black and White"]},
  {id:108, name:"Adidas Sambae", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Black and White"]},
  {id:109, name:"Adidas Samba XLG", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Black and Brown"]},
  {id:110, name:"Air Jordan 1 Mid", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Pale Barely Orange"]},
  {id:111, name:"Vans Knu Skool", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Black and White"]},
  {id:112, name:"Nike Blazer City Low XS", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Pale Green and White"]},
  {id:113, name:"Nike Air Force 1 Low", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Tan Suede Colorway and Monochromatic Suede Upper"]},
  {id:114, name:"New Balance Fresh Foam X 1080v14", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["Green"]},
  {id:115, name:"New Balance ENCAP Reveal 999", category:"Sneaker", type:"Sneaker", price:1300, condition:"New", storage:"UK 6 - 11", ram:"", colors:["White and Pink Colorway"]},
  
  // ---------- SHIRTS — soccer jerseys, real DRIPSTARS.COM stock ----------
  // Note: no price given yet — showing "Price on request" until confirmed.
  {id:116, name:"South Africa 26 Away Jersey", category:"Shirt", type:"National team jersey", price:800, condition:"New", storage:"S - XXL", ram:"", colors:["Green"], featured:true},
  {id:117, name:"South Africa 26 Home Jersey", category:"Shirt", type:"National team jersey", price:800, condition:"New", storage:"S - XXL", ram:"", colors:["Yellow"], featured:true},
  
  // ---------- PERFUMES — Coming Soon, owner still finalizing exact
  // products. These are clearly generic placeholder names (not real
  // brands) since the given R50-R560 range doesn't match full-retail
  // designer bottles — likely decants/oils. Replace once confirmed.
  // Marked comingSoon: purchase actions are disabled on the site until
  // this category actually launches.
  {id:118, name:"Citrus Burst", category:"Perfume", type:"Fragrance oil", price:50, condition:"New", storage:"10ml", ram:"Fragrance Oil", colors:["Blue"], featured:true, comingSoon:true},
  {id:119, name:"Ocean Breeze", category:"Perfume", type:"Fragrance oil", price:60, condition:"New", storage:"10ml", ram:"Fragrance Oil", colors:["Blue"], comingSoon:true},
  {id:120, name:"Vanilla Musk", category:"Perfume", type:"Fragrance oil", price:80, condition:"New", storage:"15ml", ram:"Fragrance Oil", colors:["Gold"], featured:true, comingSoon:true},
  {id:121, name:"Sweet Amber", category:"Perfume", type:"Fragrance oil", price:90, condition:"New", storage:"15ml", ram:"Fragrance Oil", colors:["Gold"], comingSoon:true},
  {id:122, name:"Fresh Linen", category:"Perfume", type:"Unisex fragrance", price:120, condition:"New", storage:"20ml", ram:"Eau de Toilette", colors:["White"], comingSoon:true},
  {id:123, name:"Midnight Rose", category:"Perfume", type:"Women's fragrance", price:140, condition:"New", storage:"20ml", ram:"Eau de Toilette", colors:["Pink"], featured:true, comingSoon:true},
  {id:124, name:"Golden Oud", category:"Perfume", type:"Unisex fragrance", price:180, condition:"New", storage:"20ml", ram:"Eau de Parfum", colors:["Gold"], comingSoon:true},
  {id:125, name:"Spiced Leather", category:"Perfume", type:"Men's fragrance", price:220, condition:"New", storage:"30ml", ram:"Eau de Toilette", colors:["Black"], comingSoon:true},
  {id:126, name:"White Jasmine", category:"Perfume", type:"Women's fragrance", price:260, condition:"New", storage:"30ml", ram:"Eau de Parfum", colors:["White"], featured:true, comingSoon:true},
  {id:127, name:"Black Pepper & Woods", category:"Perfume", type:"Men's fragrance", price:300, condition:"New", storage:"30ml", ram:"Eau de Parfum", colors:["Black"], comingSoon:true},
  {id:128, name:"Velvet Orchid", category:"Perfume", type:"Women's fragrance", price:350, condition:"New", storage:"30ml", ram:"Eau de Parfum", colors:["Purple"], comingSoon:true},
  {id:129, name:"Signature No. 1", category:"Perfume", type:"Unisex fragrance", price:400, condition:"New", storage:"50ml", ram:"Eau de Parfum", colors:["Blue"], featured:true, comingSoon:true},
  {id:130, name:"Signature No. 2", category:"Perfume", type:"Unisex fragrance", price:450, condition:"New", storage:"50ml", ram:"Eau de Parfum", colors:["Gold"], comingSoon:true},
  {id:131, name:"Signature No. 3", category:"Perfume", type:"Unisex fragrance", price:500, condition:"New", storage:"50ml", ram:"Eau de Parfum", colors:["Black"], comingSoon:true},
  {id:132, name:"Signature Reserve", category:"Perfume", type:"Unisex fragrance", price:560, condition:"New", storage:"50ml", ram:"Eau de Parfum", colors:["Purple"], featured:true, comingSoon:true}
  
  ];



const CATEGORY_KEYWORDS = { Phone:"Phone", Laptop:"Laptop", Sneaker:"Sneaker", Shirt:"Shirt", Perfume:"Perfume" };


// ============================================================
// Colors → hex values, used to tint the generic device illustration
// when no real product photo is available yet for that color.
// ============================================================
const COLOR_HEX = {
  "Graphite":"#4b4b4d", "Silver":"#dcdcdc", "Gold":"#d9c08a",
  "Pacific Blue":"#2e5266", "Sierra Blue":"#a9c9dd", "Midnight":"#1c1c1e",
  "Starlight":"#f1ece1", "Pink":"#f2c9ce", "Blue":"#4f6d91",
  "Space Black":"#3a3a3c", "Deep Purple":"#4b3f57", "Purple":"#8974ab",
  "Red":"#9b2f2f", "Grey":"#86868a", "Space Grey":"#58585a", "Black":"#232323",
  "White":"#eeeae1", "Green":"#3f6b46", "Navy":"#1f2b47",
  "Midnight Green":"#425a50", "Black Titanium":"#4a4844",
  "White Titanium":"#e8e4da", "Natural Titanium":"#d8cdbb", "Yellow":"#d4b23c"
};
// Many real product colors are compound descriptions (e.g. "White and
// Black", "Vibrant Pink and White Colorway") rather than a single exact
// match. If there's no exact entry, scan for a recognizable color word
// so the illustration still gets a sensible tint instead of always
// falling back to plain grey.
const COLOR_KEYWORDS = {
  black:"#232323", white:"#eeeae1", navy:"#1f2b47", blue:"#4f6d91",
  red:"#9b2f2f", green:"#3f6b46", pink:"#f2c9ce", purple:"#8974ab",
  gold:"#d9c08a", silver:"#dcdcdc", grey:"#86868a", gray:"#86868a",
  brown:"#6b4a2f", orange:"#c1642c", tan:"#c2a37a", khaki:"#a99a6b",
  cream:"#f1ece1", beige:"#d8c9ae", yellow:"#d4b23c"
};
function colorToHex(name){
  if (COLOR_HEX[name]) return COLOR_HEX[name];
  const lower = name.toLowerCase();
  for (const kw of Object.keys(COLOR_KEYWORDS)){
    if (lower.includes(kw)) return COLOR_KEYWORDS[kw];
  }
  return "#6b6255";
}
const SPEC_LABELS = {
  Phone: ["Storage","RAM"], Laptop: ["Storage","RAM"],
  Sneaker: ["Size range","Material"], Shirt: ["Sizes","Fit"], Perfume: ["Size","Concentration"]
};
function specLabels(category){ return SPEC_LABELS[category] || ["Storage","RAM"]; }
// colorSlug, IMAGE_EXTENSIONS, and photoPath come from utils.js (loaded
// before this file) — see that file for the naming convention and tests.

// Called from an <img>'s onerror. Tries the next file extension; once all
// have failed, hides the image (revealing the illustration underneath on
// grid cards, or the color-tinted shape on the detail view).
function tryNextImageExt(imgEl, id, colorName, shapeElId){
  const nextIndex = Number(imgEl.dataset.extIdx || "0") + 1;
  if (nextIndex >= IMAGE_EXTENSIONS.length){
    imgEl.style.display = "none";
    if (shapeElId){
      const shape = document.getElementById(shapeElId);
      if (shape) shape.style.display = "flex";
    }
    return;
  }
  imgEl.dataset.extIdx = String(nextIndex);
  imgEl.src = photoPath(id, colorName, nextIndex);
}

let cart = JSON.parse(localStorage.getItem("dripstars-cart") || "[]");
// Repair older cart entries saved before colors existed, and drop any
// entries pointing at a product id that no longer exists.
cart = cart
  .map(item => {
    const p = products.find(pp => pp.id === item.id);
    if (!p) return null;
    return { id: item.id, qty: item.qty, color: item.color || p.colors[0] };
  })
  .filter(Boolean);
localStorage.setItem("dripstars-cart", JSON.stringify(cart));

let activeFilter = "All";
let searchTerm = "";
let sortBy = "default";
let conditionFilters = [];
let priceMin = null;
let priceMax = null;

// money, matchesFilters, and sortList come from utils.js (loaded before
// this file) — see /tests/utils.test.js for their test coverage.

function renderProducts(){
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");
  const countLabel = document.getElementById("resultCount");

  let visible = products.filter(p => matchesFilters(p, { activeFilter, searchTerm, conditionFilters, priceMin, priceMax }));

  const noExplicitFilters = activeFilter === "All" && !searchTerm && conditionFilters.length === 0 && priceMin == null && priceMax == null;
  if(noExplicitFilters){
    visible = visible.filter(p => p.featured);
  }

  visible = sortList(visible, sortBy);

  if(countLabel){
    countLabel.textContent = noExplicitFilters
      ? `Showing ${visible.length} popular picks — search or filter to see all stock`
      : `${visible.length} product${visible.length === 1 ? "" : "s"}`;
  }

  grid.innerHTML = visible.map(p => `
    <article class="product-card" data-id="${p.id}">
      <div class="product-image ${p.category.toLowerCase()}" style="--device-color:${colorToHex(p.colors[0])}">
        <img class="product-photo" src="${photoPath(p.id, p.colors[0])}" alt="${p.name}" loading="lazy"
             onload="this.parentElement.classList.add('photo-loaded')"
             onerror="tryNextImageExt(this, ${p.id}, '${p.colors[0]}', null)" />
        ${p.comingSoon
          ? `<span class="coming-soon-badge">Coming Soon</span>`
          : `<span class="condition-badge condition-${p.condition.toLowerCase().replace(" ","-")}">${p.condition}</span>`}
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <span class="product-spec-line">${p.storage}${p.ram ? " • " + p.ram : ""}</span>
        <div class="price">${p.comingSoon ? "Coming soon" : money(p.price)}</div>
        <div class="product-actions">
          ${p.comingSoon
            ? `<button class="mini-btn primary" disabled>Coming soon</button>`
            : `<button class="mini-btn primary" data-action="add" data-id="${p.id}" ${!p.price ? "disabled" : ""}>Add to cart</button>
               <button class="mini-btn" data-action="whatsapp" data-id="${p.id}">WhatsApp</button>`}
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
           onerror="tryNextImageExt(this, ${p.id}, '${p.colors[0]}', 'detailDeviceShape')" />
      <div class="detail-device detail-device-${p.category.toLowerCase()}" id="detailDeviceShape" style="--device-color:${colorToHex(p.colors[0])}; display:none;">
        ${hasNotch ? '<span class="detail-device-notch"></span>' : ""}
      </div>
    </div>
    ${p.comingSoon
      ? `<span class="coming-soon-badge">Coming Soon</span>`
      : `<span class="condition-badge condition-${p.condition.toLowerCase().replace(" ","-")}">${p.condition}</span>`}
    <p class="eyebrow" style="margin-top:14px">${p.category.toUpperCase()} • ${p.type.toUpperCase()}</p>
    <h2 style="margin:0 0 10px">${p.name}</h2>
    <div class="price" style="font-size:26px;margin-bottom:14px">${p.comingSoon ? "Coming soon" : money(p.price)}</div>
    <p style="color:var(--slate);line-height:1.6;margin-bottom:18px">${p.description}</p>
    <div class="spec-grid">
      <div><span>${specLabels(p.category)[0]}</span><strong>${p.storage}</strong></div>
      ${p.ram ? `<div><span>${specLabels(p.category)[1]}</span><strong>${p.ram}</strong></div>` : ""}
      <div><span>Condition</span><strong>${p.condition}</strong></div>
      <div><span>Type</span><strong>${p.type}</strong></div>
    </div>
    <p class="spec-label">Colour: <strong id="detailColorLabel">${p.colors[0]}</strong></p>
    <div class="color-swatches" id="detailColorSwatches">
      ${p.colors.map((c,i) => `<button type="button" class="color-chip ${i===0?"active":""}" data-color="${c}" style="--swatch-color:${colorToHex(c)}">${c}</button>`).join("")}
    </div>
    <div class="product-actions" style="margin-top:22px">
      ${p.comingSoon
        ? `<button class="btn btn-outline dark-outline" disabled>Coming soon</button>`
        : `<button class="btn btn-gold" onclick="addToCart(${p.id}, detailSelectedColor);closeDetail();">Add to cart</button>
           <button class="btn btn-outline dark-outline" onclick="whatsappProduct(${p.id}, detailSelectedColor)">Ask on WhatsApp</button>`}
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
    photo.dataset.extIdx = "0";
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

function changeQtyAt(index, delta){
  const item = cart[index];
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){
    cart.splice(index, 1);
  }
  saveCart();
}

function removeFromCartAt(index){
  cart.splice(index, 1);
  saveCart();
}

function renderCart(){
  const items = document.getElementById("cartItems");
  document.getElementById("cartCount").textContent = cartCount(cart);
  if(!cart.length){
    items.innerHTML = '<p style="color:#777">Your cart is empty.</p>';
  } else {
    items.innerHTML = cart.map((x, idx) => {
      const p = products.find(y => y.id === x.id);
      if(!p) return "";
      const colorLabel = x.color ? ` · ${x.color}` : "";
      return `<div class="cart-item" data-index="${idx}">
        <div>
          <h4>${p.name} (${p.storage})${colorLabel}</h4>
          <small>${money(p.price)} each</small>
          <div class="qty-stepper">
            <button data-action="dec" data-index="${idx}" aria-label="Decrease quantity">−</button>
            <span>${x.qty}</span>
            <button data-action="inc" data-index="${idx}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="cart-item-right">
          <strong>${money(p.price*x.qty)}</strong>
          <button class="remove-btn" data-action="remove" data-index="${idx}">Remove</button>
        </div>
      </div>`;
    }).join("");
  }
  document.getElementById("cartTotal").textContent = money(cartTotal(cart, products));
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
  const total = cartTotal(cart, products);
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

document.getElementById("cartItems").addEventListener("click", e => {
  const btn = e.target.closest("[data-action]");
  if(!btn) return;
  const index = Number(btn.dataset.index);
  if(btn.dataset.action === "inc") changeQtyAt(index, 1);
  if(btn.dataset.action === "dec") changeQtyAt(index, -1);
  if(btn.dataset.action === "remove") removeFromCartAt(index);
});
document.getElementById("overlay").addEventListener("click",closeCart);

document.getElementById("whatsappCartBtn").addEventListener("click",()=>{
  window.open(`https://wa.me/27838614484?text=${encodeURIComponent(whatsappText())}`, "_blank");
});

document.getElementById("checkoutBtn").addEventListener("click", async ()=>{
  if(!cart.length) return alert("Your cart is empty.");
  closeCart();

  if (!sb) { alert("Can't connect right now. Please try again in a moment."); return; }

  const { data: { user } } = await sb.auth.getUser();
  if (!user) {
    // Not logged in — send them to sign in/create an account, then bring
    // them straight back here. The cart is already saved in localStorage,
    // so nothing is lost.
    sessionStorage.setItem("dripstars-pending-checkout", "1");
    window.location.href = "account.html";
    return;
  }

  openCheckout(user);
});
document.getElementById("checkoutClose").addEventListener("click",()=>{
  document.getElementById("checkoutModal").classList.remove("show");
});

// ============================================================
// Logged-in checkout: contact summary, saved-address picker,
// delivery + payment method, single confirm button.
// ============================================================
let checkoutState = null;

// ============================================================
// Real delivery methods DRIPSTARS.COM offers. Each one asks for a
// different kind of location, so the input/label changes to match,
// and each gets a helpful link to the real store/branch locator.
// ============================================================
const DELIVERY_METHODS = {
  "Paxi (PEP store)": {
    icon: "🏬", blurb: "Collect from your nearest PEP store.",
    fieldLabel: "Nearest PEP store", placeholder: "e.g. PEP Sandton City", multiline: false,
    finderLabel: "Find your nearest PEP store", finderUrl: "https://www.pepstores.com/store-locator"
  },
  "The Courier Guy": {
    icon: "🚚", blurb: "Delivered straight to your door.",
    fieldLabel: "Delivery address", placeholder: "Street address, suburb, city, postal code", multiline: true,
    finderLabel: null, finderUrl: null
  },
  "PostNet": {
    icon: "📦", blurb: "Collect from your nearest PostNet branch.",
    fieldLabel: "Nearest PostNet branch", placeholder: "e.g. PostNet Rosebank", multiline: false,
    finderLabel: "Find your nearest PostNet branch", finderUrl: "https://www.postnet.co.za/storelocator"
  }
};
const DELIVERY_METHOD_LIST = Object.keys(DELIVERY_METHODS);

async function openCheckout(user){
  const content = document.getElementById("checkoutContent");
  content.innerHTML = `<p class="loading-state">Loading your details...</p>`;
  document.getElementById("checkoutModal").classList.add("show");

  const [{ data: profile }, { data: addresses }, { data: storeSettings }] = await Promise.all([
    sb.from("profiles").select("*").eq("id", user.id).single(),
    sb.from("addresses").select("*").eq("user_id", user.id).order("created_at", { ascending: true }),
    sb.from("store_settings").select("*").eq("id", 1).single()
  ]);

  const addrList = addresses || [];
  const defaultAddr = addrList.find(a => a.is_default) || addrList[0] || null;

  checkoutState = {
    user,
    profile: profile || {},
    addresses: addrList,
    storeSettings: storeSettings || null,
    selectedAddressId: defaultAddr ? defaultAddr.id : null,
    deliveryScreen: "list", // 'list' | 'chooseMethod' | 'methodDetails'
    newDeliveryMethod: null,
    editingContact: false,
    name: (profile && profile.full_name) || "",
    phone: (profile && profile.phone) || "",
    paymentChoice: "upload", // 'upload' | 'contact'
    proofFile: null
  };
  renderCheckout();
}

function renderCheckout(){
  const s = checkoutState;
  const content = document.getElementById("checkoutContent");
  const email = s.profile.email || s.user.email || "";

  content.innerHTML = `
    <div class="checkout-section">
      <div class="checkout-summary-row">
        <div>
          <strong>${s.name || "Add your name"}</strong>
          <span class="checkout-sub">${email} · ${s.phone || "Add a phone number"}</span>
        </div>
        <button type="button" class="link-btn" id="editContactBtn">${s.editingContact ? "Cancel" : "Edit"}</button>
      </div>
      ${s.editingContact ? `
        <div class="checkout-edit-fields">
          <label>Full name<input type="text" id="editName" value="${s.name}" /></label>
          <label>Phone / WhatsApp number<input type="tel" id="editPhone" value="${s.phone}" /></label>
          <button type="button" class="btn btn-outline dark-outline" id="saveContactBtn">Save</button>
        </div>
      ` : ""}
    </div>

    <div class="checkout-section">
      <h4>Delivery — step ${s.deliveryScreen === "list" ? "1" : s.deliveryScreen === "chooseMethod" ? "2" : "3"} of 3</h4>
      ${renderDeliveryStep()}
    </div>

    <div class="checkout-section">
      ${renderPaymentSection()}
    </div>

    <p class="auth-msg auth-error" id="checkoutError" hidden></p>
    <button class="btn btn-gold full" id="confirmOrderBtn" type="button">Confirm order</button>
  `;

  attachCheckoutListeners();
}

function renderDeliveryStep(){
  const s = checkoutState;

  if (s.deliveryScreen === "chooseMethod"){
    return `
      <p class="step-instruction">How would you like to receive your order?</p>
      <div class="method-cards">
        ${DELIVERY_METHOD_LIST.map(m => `
          <button type="button" class="method-card" data-method="${m}">
            <span class="method-card-icon">${DELIVERY_METHODS[m].icon}</span>
            <strong>${m}</strong>
            <small>${DELIVERY_METHODS[m].blurb}</small>
          </button>
        `).join("")}
      </div>
      ${s.addresses.length ? `<button type="button" class="link-btn" id="backToListBtn">← Back to saved options</button>` : ""}
    `;
  }

  if (s.deliveryScreen === "methodDetails"){
    const info = DELIVERY_METHODS[s.newDeliveryMethod];
    return `
      <p class="step-instruction">${s.newDeliveryMethod}</p>
      ${info.finderUrl ? `<a href="${info.finderUrl}" target="_blank" rel="noopener" class="link-btn">${info.finderLabel} ↗</a>` : ""}
      <div class="new-address-form">
        <label>${info.fieldLabel}
          ${info.multiline
            ? `<textarea id="newAddrText" rows="3" placeholder="${info.placeholder}"></textarea>`
            : `<input type="text" id="newAddrText" placeholder="${info.placeholder}" />`}
        </label>
        <label>Label for this option (e.g. Home, Work)<input type="text" id="newAddrLabel" placeholder="Home" /></label>
        <div class="address-form-actions">
          <button type="button" class="btn btn-gold" id="saveNewAddrBtn">Save & continue</button>
          <button type="button" class="btn btn-outline dark-outline" id="backToMethodBtn">← Back</button>
        </div>
      </div>
    `;
  }

  // 'list' screen
  const addressListHtml = s.addresses.map(a => `
    <label class="address-option ${s.selectedAddressId === a.id ? "selected" : ""}">
      <input type="radio" name="addrChoice" value="${a.id}" ${s.selectedAddressId === a.id ? "checked" : ""} />
      <span>
        <strong>${a.label}</strong>
        <small>${a.address}</small>
        <small class="address-method-tag">${a.delivery_method || ""}</small>
      </span>
    </label>
  `).join("");

  return `
    <div class="address-list">${addressListHtml}</div>
    <button type="button" class="btn btn-outline dark-outline" id="addNewDeliveryBtn" style="margin-top:${s.addresses.length ? "12px" : "0"}">
      + Add a new delivery option
    </button>
  `;
}

function renderPaymentSection(){
  const s = checkoutState;
  const bank = s.storeSettings;

  return `
    <h4>Payment</h4>
    ${bank ? `
      <div class="bank-details-card">
        <div><span>Bank</span><strong>${bank.bank_name || "—"}</strong></div>
        <div><span>Account holder</span><strong>${bank.account_holder || "—"}</strong></div>
        <div><span>Account number</span><strong>${bank.account_number || "—"}</strong></div>
        <div><span>Branch code</span><strong>${bank.branch_code || "—"}</strong></div>
        <div><span>Account type</span><strong>${bank.account_type || "—"}</strong></div>
      </div>
    ` : `<p class="checkout-note">Bank details aren't available right now — you can still choose "Contact me about payment" below.</p>`}

    <div class="payment-choice">
      <label class="payment-choice-option ${s.paymentChoice === "upload" ? "selected" : ""}">
        <input type="radio" name="paymentChoice" value="upload" ${s.paymentChoice === "upload" ? "checked" : ""} />
        <span><strong>I've made the payment</strong><small>Upload your proof of payment</small></span>
      </label>
      <label class="payment-choice-option ${s.paymentChoice === "contact" ? "selected" : ""}">
        <input type="radio" name="paymentChoice" value="contact" ${s.paymentChoice === "contact" ? "checked" : ""} />
        <span><strong>Contact me about payment</strong><small>We'll arrange it directly on WhatsApp</small></span>
      </label>
    </div>

    ${s.paymentChoice === "upload" ? `
      <label class="proof-upload-label">Proof of payment (image or PDF)
        <input type="file" id="proofFileInput" accept="image/*,application/pdf" />
      </label>
      ${s.proofFile ? `<p class="checkout-note">Selected: ${s.proofFile.name}</p>` : ""}
    ` : ""}

    <p class="checkout-note">Your proof of payment is only visible to you and DRIPSTARS.COM — it's never posted publicly.</p>
  `;
}

function attachCheckoutListeners(){
  const s = checkoutState;

  document.getElementById("editContactBtn").addEventListener("click", () => {
    s.editingContact = !s.editingContact;
    renderCheckout();
  });
  if (s.editingContact){
    document.getElementById("saveContactBtn").addEventListener("click", async () => {
      s.name = document.getElementById("editName").value.trim();
      s.phone = document.getElementById("editPhone").value.trim();
      s.editingContact = false;
      await sb.from("profiles").update({ full_name: s.name, phone: s.phone }).eq("id", s.user.id);
      renderCheckout();
    });
  }

  // Step 1: saved options list
  document.querySelectorAll('input[name="addrChoice"]').forEach(r => {
    r.addEventListener("change", e => {
      s.selectedAddressId = e.target.value;
      renderCheckout();
    });
  });
  const addNewBtn = document.getElementById("addNewDeliveryBtn");
  if (addNewBtn) addNewBtn.addEventListener("click", () => {
    s.deliveryScreen = "chooseMethod";
    renderCheckout();
  });

  // Step 2: choose method
  document.querySelectorAll(".method-card").forEach(card => {
    card.addEventListener("click", () => {
      s.newDeliveryMethod = card.dataset.method;
      s.deliveryScreen = "methodDetails";
      renderCheckout();
    });
  });
  const backToListBtn = document.getElementById("backToListBtn");
  if (backToListBtn) backToListBtn.addEventListener("click", () => {
    s.deliveryScreen = "list";
    renderCheckout();
  });

  // Step 3: method details
  const saveNewAddrBtn = document.getElementById("saveNewAddrBtn");
  if (saveNewAddrBtn) saveNewAddrBtn.addEventListener("click", async () => {
    const text = document.getElementById("newAddrText").value.trim();
    const label = document.getElementById("newAddrLabel").value.trim() || "Address";
    if (!text){
      alert(`Please fill in the ${DELIVERY_METHODS[s.newDeliveryMethod].fieldLabel.toLowerCase()}.`);
      return;
    }
    const { data: inserted, error } = await sb.from("addresses").insert({
      user_id: s.user.id, label, address: text, delivery_method: s.newDeliveryMethod
    }).select().single();
    if (error){
      alert("Could not save that delivery option. Please try again.");
      return;
    }
    s.addresses.push(inserted);
    s.selectedAddressId = inserted.id;
    s.deliveryScreen = "list";
    renderCheckout();
  });
  const backToMethodBtn = document.getElementById("backToMethodBtn");
  if (backToMethodBtn) backToMethodBtn.addEventListener("click", () => {
    s.deliveryScreen = "chooseMethod";
    renderCheckout();
  });

  // Payment
  document.querySelectorAll('input[name="paymentChoice"]').forEach(r => {
    r.addEventListener("change", e => {
      s.paymentChoice = e.target.value;
      renderCheckout();
    });
  });
  const proofInput = document.getElementById("proofFileInput");
  if (proofInput) proofInput.addEventListener("change", e => {
    s.proofFile = e.target.files[0] || null;
  });

  document.getElementById("confirmOrderBtn").addEventListener("click", submitOrder);
}

// ============================================================
// Confirm order — uploads proof of payment (if provided), saves
// the order to Supabase, then opens WhatsApp with the summary.
// ============================================================
async function submitOrder(){
  const s = checkoutState;
  const errorEl = document.getElementById("checkoutError");
  errorEl.hidden = true;

  if (!s.name || !s.phone){
    errorEl.textContent = "Please add your name and phone number (use Edit above).";
    errorEl.hidden = false;
    return;
  }
  if (!s.selectedAddressId){
    errorEl.textContent = "Please choose or add a delivery option.";
    errorEl.hidden = false;
    return;
  }
  if (s.paymentChoice === "upload" && !s.proofFile){
    errorEl.textContent = "Please upload your proof of payment, or choose \"Contact me about payment\" instead.";
    errorEl.hidden = false;
    return;
  }

  const addr = s.addresses.find(a => a.id === s.selectedAddressId);
  const addressText = addr.address;
  const deliveryMethod = addr.delivery_method;

  const btn = document.getElementById("confirmOrderBtn");
  btn.disabled = true;
  btn.textContent = "Submitting...";

  const orderItems = cart.map(x => {
    const p = products.find(y => y.id === x.id);
    return { name: p.name, storage: p.storage, qty: x.qty, price: p.price, color: x.color };
  });
  const total = cartTotal(cart, products);
  const email = s.profile.email || s.user.email || "";
  const paymentMethod = s.paymentChoice === "upload" ? "Bank transfer" : "Contact me about payment";

  try {
    const { data: orderNumber, error: rpcError } = await sb.rpc("next_order_number");
    if (rpcError) throw rpcError;

    let proofPath = null;
    if (s.paymentChoice === "upload" && s.proofFile){
      const ext = s.proofFile.name.split(".").pop();
      proofPath = `${s.user.id}/${orderNumber}.${ext}`;
      const { error: uploadError } = await sb.storage.from("proof-of-payments").upload(proofPath, s.proofFile, { upsert: true });
      if (uploadError) throw uploadError;
    }

    const { error: insertError } = await sb.from("orders").insert({
      order_number: orderNumber,
      user_id: s.user.id,
      customer_name: s.name,
      customer_phone: s.phone,
      customer_email: email,
      delivery_address: addressText,
      delivery_method: deliveryMethod,
      payment_method: paymentMethod,
      payment_status: proofPath ? "Proof submitted" : "Awaiting payment",
      proof_of_payment_path: proofPath,
      items: orderItems,
      total: total
    });
    if (insertError) throw insertError;

    const message = `Hi DRIPSTARS.COM, I have submitted an online order.\nOrder #: ${orderNumber}\nName: ${s.name}\nPhone: ${s.phone}\nDelivery method: ${deliveryMethod}\n${DELIVERY_METHODS[deliveryMethod].fieldLabel}: ${addressText}\nPayment: ${paymentMethod}${proofPath ? " (proof uploaded)" : ""}\n\n${whatsappText()}`;

    cart = [];
    saveCart();
    document.getElementById("checkoutModal").classList.remove("show");
    window.open(`https://wa.me/27838614484?text=${encodeURIComponent(message)}`, "_blank");

  } catch (err) {
    console.error("Order save failed:", err);
    errorEl.textContent = "Something went wrong saving your order. Please try again, or message us directly on WhatsApp.";
    errorEl.hidden = false;
  } finally {
    btn.disabled = false;
    btn.textContent = "Confirm order";
  }
}


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

// ============================================================
// If someone was sent to sign in mid-checkout, bring them
// straight back into the checkout flow once they return here.
// ============================================================
(async function resumeCheckoutIfPending(){
  if (sessionStorage.getItem("dripstars-pending-checkout") === "1" && cart.length && sb) {
    sessionStorage.removeItem("dripstars-pending-checkout");
    const { data: { user } } = await sb.auth.getUser();
    if (user) openCheckout(user);
  }
})();