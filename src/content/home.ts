import type { IconName } from "@/components/Icon";

/* ───────────────────────── Photography ─────────────────────────
 * All images are from Wikimedia Commons under the licences listed, and are
 * credited on /credits. */
export const images = {
  factoryFloor: {
    src: "/images/factory-floor.jpg",
    alt: "Workers at assembly benches on a large electronics factory floor in Zhuhai, Guangdong",
    caption: "Factory floor, Zhuhai",
    author: "Chris from Shenzhen, China",
    license: "CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:G.Tech_Technology_Factory_Zhuhai_China_(2).jpg",
  },
  assemblyLine: {
    src: "/images/assembly-line.jpg",
    alt: "Workers in blue caps assembling products at a production line in Zhuhai",
    caption: "Production line, Zhuhai",
    author: "Chris from Shenzhen, China",
    license: "CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:G.Tech_Technology_Factory_Zhuhai_China.jpg",
  },
  qcInspection: {
    src: "/images/qc-inspection.jpg",
    alt: "Quality-control check in a burn-in test area at a phone factory in China",
    caption: "Quality check, factory test area",
    author: "Villemajanen",
    license: "CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Arttu_S%C3%A4yn%C3%A4j%C3%A4kangas_Oukitel-tehtaalla_tekem%C3%A4ss%C3%A4_laadunvalvontatarkastusta.jpg",
  },
  warehouseCartons: {
    src: "/images/warehouse-cartons.jpg",
    alt: "Forklift beside stacked cardboard cartons and a wooden pallet in a Guangzhou warehouse",
    caption: "Warehouse, Guangzhou",
    author: "Rc1959",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Guangzhou_(48988).jpg",
  },
  electronicsMarket: {
    src: "/images/electronics-market.jpg",
    alt: "Busy electronics wholesale market hall in Guangdong with stalls of accessories",
    caption: "Electronics market, Guangdong",
    author: "Rc1959",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Guangdong_province_(17484).jpg",
  },
  fashionMall: {
    src: "/images/fashion-mall.jpg",
    alt: "Clothing stalls with mannequins in a fashion wholesale mall in Dongmen, Shenzhen",
    caption: "Clothing market, Shenzhen",
    author: "BIOMDAM huhwalam",
    license: "CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E7%BE%85%E6%B9%96_Luohu_District_%E6%9D%B1%E9%96%80_Dongmen_%E5%95%86%E5%A0%B4_shopping_mall_%E6%9C%8D%E8%A3%9D%E5%B8%82%E5%A0%B4_clothing_market_April_2023_Px3_03.jpg",
  },
  furniture: {
    src: "/images/furniture-showroom.jpg",
    alt: "Wooden dining set displayed in a furniture showroom in Dongguan",
    caption: "Furniture showroom, Dongguan",
    author: "NAS 238 WMMNO",
    license: "CC0",
    source:
      "https://commons.wikimedia.org/wiki/File:DG_%E6%9D%B1%E8%8E%9E_DongGuan_%E5%8D%97%E5%9F%8E%E5%8D%80_Nancheng_%E9%B4%BB%E7%A6%8F%E8%B7%AF_HongFu_Road_%E6%9D%B1%E8%8E%9E%E4%BA%AC%E6%9D%B1%E5%95%86%E5%A0%B4_JD_Shopping_Mall_Electronics_Showroom_December_2024_R12S_42_dining_room_in_art.jpg",
  },
  beauty: {
    src: "/images/beauty-centre.jpg",
    alt: "Entrance of the Huaqiangbei beauty products trading centre in Shenzhen, with red lanterns",
    caption: "Beauty products centre, Shenzhen",
    author: "Elaodou Anudyem Lukas",
    license: "CC0",
    source:
      "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E7%A6%8F%E7%94%B0_Futian_%E8%8F%AF%E5%BC%B7%E5%8C%97%E8%B7%AF_Huaqiang_North_Road_building_name_Huaqiangbei_Quality_Beauty_Products_Trading_Center_night_February_2024_R12S.jpg",
  },
  yiwuGoods: {
    src: "/images/yiwu-goods.jpg",
    alt: "Curved shelves packed with mugs and plates in a stall at the Yiwu International Trade Mart",
    caption: "Yiwu International Trade Mart",
    author: "iamdanw (Flickr)",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Tourist_goods_in_Yiwu_International_Trade_Mart.jpg",
  },
  yiwuGate: {
    src: "/images/yiwu-gate.jpg",
    alt: "Entrance to District 3 of the Yiwu International Trade Market, with floor directory signs",
    caption: "Yiwu International Trade Market",
    author: "Whisper of the heart",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Yiwu_International_Trade_Market_-_District_3,_Gate_67.jpg",
  },
  airCargo: {
    src: "/images/air-cargo-deck.jpg",
    alt: "Empty main cargo deck of a Boeing 747-8 freighter with roller floor and cargo nets",
    caption: "Air freighter cargo deck",
    author: "Logistikainsener",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Boeing_747-8F_liikuvp%C3%B5randaga_lastiruum.jpg",
  },
  sgrViaduct: {
    src: "/images/sgr-viaduct.jpg",
    alt: "Express passenger train crossing a viaduct over red earth on the Mombasa–Nairobi railway",
    caption: "Madaraka Express, Kenya",
    author: "TTC dude",
    license: "CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Express_passenger_train_on_the_Mombasa_-_Nairobi_Standard_Gauge_Railway_(SGR).jpg",
  },
} as const;

export type SiteImage = (typeof images)[keyof typeof images];

/* ───────────────────────── 02 · Services ───────────────────────── */
export const services: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "search",
    title: "Supplier sourcing",
    body: "We search factories and wholesalers across China's manufacturing hubs for the product you need.",
  },
  {
    icon: "compare",
    title: "Supplier comparison",
    body: "Unit price, minimum order, lead time and samples — laid side by side so you can choose with confidence.",
  },
  {
    icon: "handshake",
    title: "Price negotiation",
    body: "We handle the back-and-forth with suppliers on price, specifications, packaging and branding.",
  },
  {
    icon: "shieldCheck",
    title: "Quality-control coordination",
    body: "Photos, videos or inspections arranged before goods leave the factory, agreed with you in advance.",
  },
  {
    icon: "layers",
    title: "Order consolidation",
    body: "Buying from several suppliers? Goods are collected and packed together so you ship once.",
  },
  {
    icon: "ship",
    title: "Shipping & Kenya delivery",
    body: "China logistics, sea or air freight, and delivery coordinated through to your town in Kenya.",
  },
];

/* ───────────────────────── 03 · Who we help ───────────────────────── */
export const audiences = [
  ["Individual buyers", "Online sellers", "Boutiques", "Retail shops", "Wholesalers", "Restaurants & cafés", "Salons & spas", "Hardware stores"],
  ["Startups", "Offices", "Schools", "Hotels & guesthouses", "Event organisers", "Contractors", "Phone & electronics shops", "Furniture shops"],
] as const;

/* ───────────────────────── 05 · Process ───────────────────────── */
export const steps: { stage: string; title: string; body: string; icon: IconName }[] = [
  {
    stage: "Your request",
    title: "Tell us what you need",
    body: "Send a photo, link or description, plus quantity and your town in Kenya.",
    icon: "camera",
  },
  {
    stage: "Supplier sourcing",
    title: "We search the right hubs",
    body: "We look for manufacturers and wholesalers that actually make your product.",
    icon: "search",
  },
  {
    stage: "Supplier comparison",
    title: "Options side by side",
    body: "Price, minimum order, lead time and sample availability for each shortlisted supplier.",
    icon: "compare",
  },
  {
    stage: "Price negotiation",
    title: "You approve the quote",
    body: "We negotiate, then send a written quote. Nothing is bought until you say yes.",
    icon: "handshake",
  },
  {
    stage: "Quality control",
    title: "Purchase & checks",
    body: "We place the order, follow up on production and coordinate checks before dispatch.",
    icon: "shieldCheck",
  },
  {
    stage: "Consolidation",
    title: "Packed together",
    body: "Goods from different suppliers are collected, checked against the order and packed for transit.",
    icon: "layers",
  },
  {
    stage: "International shipping",
    title: "Sea or air to Kenya",
    body: "Your goods leave China by the method agreed in your quote, with updates along the way.",
    icon: "plane",
  },
  {
    stage: "Kenya delivery",
    title: "To your door",
    body: "We coordinate arrival in Kenya and onward delivery to your town, until it reaches you.",
    icon: "truck",
  },
];

/* ───────────────────────── 06 · Categories ───────────────────────── */
export const categories: { title: string; icon: IconName; image: SiteImage; examples: string }[] = [
  { title: "Fashion & Accessories", icon: "shirt", image: images.fashionMall, examples: "Clothing, shoes, bags, jewellery" },
  { title: "Electronics & Accessories", icon: "chip", image: images.electronicsMarket, examples: "Phone accessories, gadgets, lighting" },
  { title: "Furniture", icon: "chair", image: images.furniture, examples: "Home, office, hotel and salon furniture" },
  { title: "Machinery & Equipment", icon: "gear", image: images.assemblyLine, examples: "Small machines, tools, kitchen equipment" },
  { title: "Packaging", icon: "box", image: images.warehouseCartons, examples: "Branded boxes, bags, bottles, labels" },
  { title: "Beauty Products", icon: "sparkle", image: images.beauty, examples: "Cosmetics packaging, salon supplies, hair" },
  { title: "Home & Kitchen", icon: "pot", image: images.yiwuGoods, examples: "Cookware, storage, décor, tableware" },
  { title: "Business & Wholesale", icon: "crates", image: images.yiwuGate, examples: "Shop stock, promotional items, bulk goods" },
];

/* ───────────────────────── 08 · Sourcing hubs ─────────────────────────
 * Well-known manufacturing clusters — a map of where products are made, not
 * a list of partners. */
export const hubs = [
  { city: "Guangzhou", zh: "广州", known: "Clothing, leather, beauty" },
  { city: "Shenzhen", zh: "深圳", known: "Electronics & gadgets" },
  { city: "Yiwu", zh: "义乌", known: "Small commodities" },
  { city: "Foshan", zh: "佛山", known: "Furniture & ceramics" },
  { city: "Dongguan", zh: "东莞", known: "Manufacturing & packaging" },
  { city: "Ningbo", zh: "宁波", known: "Home appliances" },
  { city: "Zhongshan", zh: "中山", known: "Lighting" },
  { city: "Shantou", zh: "汕头", known: "Toys" },
  { city: "Jinjiang", zh: "晋江", known: "Shoes & sportswear" },
  { city: "Wenzhou", zh: "温州", known: "Footwear & hardware" },
] as const;

/* ───────────────────────── 11 · Example requests ───────────────────────── */
export type ExampleCard =
  | { kind: "text"; tone: "white" | "cobalt"; title: string; detail: string; tags: string[] }
  | { kind: "image"; title: string; detail: string; image: SiteImage };

export const examples: ExampleCard[] = [
  {
    kind: "text",
    tone: "white",
    title: "100 custom water bottles",
    detail: "Stainless steel, 500 ml, with a printed company logo for a corporate event.",
    tags: ["Custom branding", "Sample first"],
  },
  { kind: "image", title: "50 handbags", detail: "Mixed styles for a boutique, matched to Instagram photos.", image: images.fashionMall },
  {
    kind: "text",
    tone: "cobalt",
    title: "500 branded packaging boxes",
    detail: "Printed mailer boxes in a custom size for a growing online shop.",
    tags: ["Custom size", "Print proof"],
  },
  { kind: "image", title: "Phone accessories", detail: "Cases, chargers and cables to stock a retail shop.", image: images.electronicsMarket },
  {
    kind: "text",
    tone: "white",
    title: "Restaurant equipment",
    detail: "A fryer, stainless prep table and shelving for a new café — from three suppliers.",
    tags: ["Consolidated", "Heavy goods"],
  },
  { kind: "image", title: "A dining set", detail: "Table and six chairs for a family home in Nakuru.", image: images.furniture },
];

/* ───────────────────────── 12 · FAQ ───────────────────────── */
export const faqs = [
  {
    q: "What products can you source?",
    a: "Most legal, shippable goods made in China: fashion, electronics accessories, furniture, machinery, packaging, beauty products, home and kitchen items and wholesale stock. If you're unsure, send us a photo and we'll tell you honestly whether we can help.",
  },
  {
    q: "Is there a minimum order?",
    a: "We don't set a fixed minimum, but many factories do. Minimum order quantities depend on the product and supplier. Your quote shows each supplier's minimum, and we'll suggest alternatives such as wholesalers if you need a small quantity.",
  },
  {
    q: "How long does shipping from China to Kenya take?",
    a: "It depends on the shipping method, the product, the supplier's production time and customs clearance. Air freight is faster and costs more; sea freight is slower and usually more economical for larger or heavier orders. Your quote includes an estimated timeline for your specific order.",
  },
  {
    q: "Can I send you a product I found on TikTok, Instagram, Alibaba or 1688?",
    a: "Yes. Send the link, a screenshot or a photo. We'll try to find the same or a comparable product, check supplier options and compare prices.",
  },
  {
    q: "Can you consolidate products from multiple suppliers?",
    a: "Yes. We can collect goods from different suppliers at one point in China and ship them together, which often makes shipping simpler and more cost-effective.",
  },
  {
    q: "How do payments work?",
    a: "You only pay after you've reviewed and approved a written quote. The quote sets out the product cost, our fees and the estimated shipping cost, and explains the payment stages for your order. We'll confirm accepted payment methods with you directly.",
  },
  {
    q: "Do you inspect products?",
    a: "We coordinate quality checks before goods leave China. Depending on the order, this can be photos and videos from the supplier or warehouse, a sample, or a more detailed inspection. We agree the level of checking with you when you approve the quote.",
  },
  {
    q: "What products can't you ship?",
    a: "We can't help with illegal, counterfeit or restricted goods, such as weapons, drugs or items prohibited by Kenyan import rules. Some products — batteries, liquids, powders, magnets or certain chemicals — have shipping restrictions or extra requirements. Ask us first and we'll tell you what's possible.",
  },
  {
    q: "Do I need to be a business to use your service?",
    a: "No. We help individuals as well as shops and companies. Whether it's a single dining set for your home or stock for a store, the process is the same.",
  },
  {
    q: "Who will I be talking to?",
    a: "You'll have one point of contact for your order, reachable on WhatsApp, from your first message through to delivery.",
  },
];
