import { WooProduct, WooCategory, WooTag } from "@/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "https://store.elv8now.com/wp-json/wc/v3";
const CK = process.env.NEXT_PUBLIC_WOOCOMMERCE_CK || "ck_3e1b15010b2ef237ab7cc9eee504b68ffbfbb868";
const CS = process.env.NEXT_PUBLIC_WOOCOMMERCE_CS || "cs_f44bb8ed7c871ecdf381d9f7f2697d95514a84c2";

const DEMO_PRODUCTS: WooProduct[] = [
  {
    id: 101,
    name: "elv8 Original Energy Can (250ml)",
    slug: "elv8-original-energy-can",
    permalink: "/product/101",
    date_created: new Date().toISOString(),
    status: "publish",
    featured: true,
    catalog_visibility: "visible",
    description: "<p>Το αυθεντικό elv8 Energy Drink. Zero Sugar, 200mg Φυσική Καφεΐνη, Ηλεκτρολύτες & Βιταμίνες B6/B12 για εκρηκτική ενέργεια και εστίαση.</p>",
    short_description: "Zero Sugar • 200mg Natural Caffeine • Electrolytes",
    sku: "ELV8-ORIG-250",
    price: "2.50",
    regular_price: "2.50",
    sale_price: "",
    on_sale: false,
    purchasable: true,
    total_sales: 1540,
    virtual: false,
    downloadable: false,
    downloads: [],
    download_limit: 0,
    download_expiry: 0,
    tax_status: "taxable",
    tax_class: "",
    manage_stock: false,
    stock_quantity: 500,
    stock_status: "instock",
    backorders: "no",
    backorders_allowed: false,
    backordered: false,
    weight: "0.25",
    dimensions: { length: "", width: "", height: "" },
    shipping_required: true,
    shipping_taxable: true,
    shipping_class: "",
    shipping_class_id: 0,
    reviews_allowed: true,
    average_rating: "4.90",
    rating_count: 84,
    related_ids: [102, 103, 104],
    upsell_ids: [104, 105],
    cross_sell_ids: [],
    parent_id: 0,
    purchase_note: "",
    categories: [{ id: 1, name: "Energy Cans", slug: "energy-cans" }],
    tags: [{ id: 1, name: "Zero Sugar", slug: "zero-sugar" }, { id: 2, name: "Natural Caffeine", slug: "natural-caffeine" }],
    images: [{ id: 1, src: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?q=80&w=800&auto=format&fit=crop", name: "elv8 Original", alt: "elv8 Original Can" }],
    attributes: [],
    default_attributes: [],
    variations: [],
    grouped_products: [],
    menu_order: 0,
    meta_data: [],
    bundle_data: {
      title: "Frequently Bought Together (Energy Pack & Focus)",
      discount: 15,
      items: [
        {
          id: 102,
          name: "elv8 Zero Blue Raspberry Focus",
          price: 2.20,
          image: "/elv8-can-clean.png"
        }
      ]
    }
  },
  {
    id: 102,
    name: "elv8 Zero Blue Raspberry Focus (250ml)",
    slug: "elv8-zero-blue-raspberry",
    permalink: "/product/102",
    date_created: new Date().toISOString(),
    status: "publish",
    featured: true,
    catalog_visibility: "visible",
    description: "<p>Δροσερή γεύση Blue Raspberry με Nootropics & Ηλεκτρολύτες. Ιδανικό για Gamers, Σπουδαστές και απαιτητική εργασία.</p>",
    short_description: "Blue Raspberry • Nootropics • Electrolytes",
    sku: "ELV8-BLUE-250",
    price: "2.20",
    regular_price: "2.50",
    sale_price: "2.20",
    on_sale: true,
    purchasable: true,
    total_sales: 1200,
    virtual: false,
    downloadable: false,
    downloads: [],
    download_limit: 0,
    download_expiry: 0,
    tax_status: "taxable",
    tax_class: "",
    manage_stock: false,
    stock_quantity: 400,
    stock_status: "instock",
    backorders: "no",
    backorders_allowed: false,
    backordered: false,
    weight: "0.25",
    dimensions: { length: "", width: "", height: "" },
    shipping_required: true,
    shipping_taxable: true,
    shipping_class: "",
    shipping_class_id: 0,
    reviews_allowed: true,
    average_rating: "4.95",
    rating_count: 62,
    related_ids: [101, 103],
    upsell_ids: [104],
    cross_sell_ids: [],
    parent_id: 0,
    purchase_note: "",
    categories: [{ id: 1, name: "Energy Cans", slug: "energy-cans" }],
    tags: [{ id: 1, name: "Zero Sugar", slug: "zero-sugar" }, { id: 3, name: "Focus & Gaming", slug: "focus-gaming" }],
    images: [{ id: 2, src: "https://images.unsplash.com/photo-1543253687-c931c8e01820?q=80&w=800&auto=format&fit=crop", name: "elv8 Blue Raspberry", alt: "elv8 Blue Raspberry Can" }],
    attributes: [],
    default_attributes: [],
    variations: [],
    grouped_products: [],
    menu_order: 0,
    meta_data: []
  },
  {
    id: 103,
    name: "elv8 Tropical Punch Energy (250ml)",
    slug: "elv8-tropical-punch",
    permalink: "/product/103",
    date_created: new Date().toISOString(),
    status: "publish",
    featured: true,
    catalog_visibility: "visible",
    description: "<p>Εξωτική γεύση Tropical Punch με φυσικά εκχυλίσματα φρούτων, 0g ζάχαρη και βιταμίνες B-Complex.</p>",
    short_description: "Tropical Taste • B-Vitamins • 0g Sugar",
    sku: "ELV8-TROP-250",
    price: "2.50",
    regular_price: "2.50",
    sale_price: "",
    on_sale: false,
    purchasable: true,
    total_sales: 980,
    virtual: false,
    downloadable: false,
    downloads: [],
    download_limit: 0,
    download_expiry: 0,
    tax_status: "taxable",
    tax_class: "",
    manage_stock: false,
    stock_quantity: 350,
    stock_status: "instock",
    backorders: "no",
    backorders_allowed: false,
    backordered: false,
    weight: "0.25",
    dimensions: { length: "", width: "", height: "" },
    shipping_required: true,
    shipping_taxable: true,
    shipping_class: "",
    shipping_class_id: 0,
    reviews_allowed: true,
    average_rating: "4.85",
    rating_count: 41,
    related_ids: [101, 102],
    upsell_ids: [105],
    cross_sell_ids: [],
    parent_id: 0,
    purchase_note: "",
    categories: [{ id: 1, name: "Energy Cans", slug: "energy-cans" }],
    tags: [{ id: 1, name: "Zero Sugar", slug: "zero-sugar" }],
    images: [{ id: 3, src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop", name: "elv8 Tropical", alt: "elv8 Tropical Can" }],
    attributes: [],
    default_attributes: [],
    variations: [],
    grouped_products: [],
    menu_order: 0,
    meta_data: []
  },
  {
    id: 104,
    name: "elv8 Starter Sampler Pack (4 Cans)",
    slug: "elv8-starter-pack-4",
    permalink: "/product/104",
    date_created: new Date().toISOString(),
    status: "publish",
    featured: true,
    catalog_visibility: "visible",
    description: "<p>Δοκιμάστε όλες τις γεύσεις του elv8 με το Starter Sampler Pack 4 τεμαχίων. Περιλαμβάνει 2x Original, 1x Blue Raspberry, 1x Tropical Punch.</p>",
    short_description: "4-Pack Variety • Best Starter Deal",
    sku: "ELV8-PACK-4",
    price: "7.99",
    regular_price: "9.99",
    sale_price: "7.99",
    on_sale: true,
    purchasable: true,
    total_sales: 3200,
    virtual: false,
    downloadable: false,
    downloads: [],
    download_limit: 0,
    download_expiry: 0,
    tax_status: "taxable",
    tax_class: "",
    manage_stock: false,
    stock_quantity: 600,
    stock_status: "instock",
    backorders: "no",
    backorders_allowed: false,
    backordered: false,
    weight: "1.0",
    dimensions: { length: "", width: "", height: "" },
    shipping_required: true,
    shipping_taxable: true,
    shipping_class: "",
    shipping_class_id: 0,
    reviews_allowed: true,
    average_rating: "5.00",
    rating_count: 110,
    related_ids: [101, 105],
    upsell_ids: [105],
    cross_sell_ids: [],
    parent_id: 0,
    purchase_note: "",
    categories: [{ id: 2, name: "Packs & Bundles", slug: "packs-bundles" }],
    tags: [{ id: 4, name: "Best Seller", slug: "best-seller" }],
    images: [{ id: 4, src: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?q=80&w=800&auto=format&fit=crop", name: "elv8 4-Pack", alt: "elv8 Starter Pack 4 Cans" }],
    attributes: [],
    default_attributes: [],
    variations: [],
    grouped_products: [],
    menu_order: 0,
    meta_data: []
  },
  {
    id: 105,
    name: "elv8 Pro Athlete Tray (12 Cans)",
    slug: "elv8-pro-tray-12",
    permalink: "/product/105",
    date_created: new Date().toISOString(),
    status: "publish",
    featured: true,
    catalog_visibility: "visible",
    description: "<p>Πλήρης συσκευασία 12 τεμαχίων για αθλητές και καθημερινή ενέργεια. Δωρεάν Μεταφορικά σε όλη την Ελλάδα!</p>",
    short_description: "12-Pack Case • Free Shipping Included",
    sku: "ELV8-TRAY-12",
    price: "22.99",
    regular_price: "26.99",
    sale_price: "22.99",
    on_sale: true,
    purchasable: true,
    total_sales: 2100,
    virtual: false,
    downloadable: false,
    downloads: [],
    download_limit: 0,
    download_expiry: 0,
    tax_status: "taxable",
    tax_class: "",
    manage_stock: false,
    stock_quantity: 250,
    stock_status: "instock",
    backorders: "no",
    backorders_allowed: false,
    backordered: false,
    weight: "3.0",
    dimensions: { length: "", width: "", height: "" },
    shipping_required: true,
    shipping_taxable: true,
    shipping_class: "",
    shipping_class_id: 0,
    reviews_allowed: true,
    average_rating: "4.98",
    rating_count: 145,
    related_ids: [104],
    upsell_ids: [],
    cross_sell_ids: [],
    parent_id: 0,
    purchase_note: "",
    categories: [{ id: 2, name: "Packs & Bundles", slug: "packs-bundles" }],
    tags: [{ id: 4, name: "Best Seller", slug: "best-seller" }, { id: 5, name: "Free Shipping", slug: "free-shipping" }],
    images: [{ id: 5, src: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?q=80&w=800&auto=format&fit=crop", name: "elv8 12-Pack Tray", alt: "elv8 Pro Tray 12 Cans" }],
    attributes: [],
    default_attributes: [],
    variations: [],
    grouped_products: [],
    menu_order: 0,
    meta_data: []
  }
];

const DEMO_CATEGORIES: WooCategory[] = [
  { id: 1, name: "Energy Cans", slug: "energy-cans", parent: 0, description: "Single 250ml Energy Cans", display: "default", image: null, menu_order: 0, count: 3 },
  { id: 2, name: "Packs & Bundles", slug: "packs-bundles", parent: 0, description: "Multi-can Packs & Value Trays", display: "default", image: null, menu_order: 1, count: 2 }
];

const DEMO_TAGS: WooTag[] = [
  { id: 1, name: "Zero Sugar", slug: "zero-sugar", description: "Zero sugar beverages", count: 3 },
  { id: 2, name: "Natural Caffeine", slug: "natural-caffeine", description: "Natural caffeine sources", count: 2 },
  { id: 3, name: "Focus & Gaming", slug: "focus-gaming", description: "Brain focus & nootropics", count: 1 },
  { id: 4, name: "Best Seller", slug: "best-seller", description: "Most popular items", count: 2 }
];

function buildUrl(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.set("consumer_key", CK);
  url.searchParams.set("consumer_secret", CS);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}

export async function getProducts(params: Record<string, string> = {}) {
  try {
    const res = await fetch(buildUrl("products", { 
      per_page: "20", 
      status: "publish",
      catalog_visibility: "visible",
      ...params 
    }), { next: { revalidate: 60 } });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn("WooCommerce API fetch failed, falling back to elv8 Demo Products", e);
  }
  
  let filtered = [...DEMO_PRODUCTS];
  if (params.on_sale === "true") {
    filtered = filtered.filter(p => p.on_sale);
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  return filtered;
}

export async function getProduct(id: number) {
  try {
    const res = await fetch(buildUrl(`products/${id}`));
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn(`WooCommerce API fetch for product ${id} failed, using demo fallback`);
  }
  return DEMO_PRODUCTS.find(p => p.id === Number(id)) || DEMO_PRODUCTS[0];
}

export async function getCategories(params: Record<string, string> = {}) {
  try {
    const res = await fetch(buildUrl("products/categories", { per_page: "50", ...params }));
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn("WooCommerce API fetch categories failed, using demo categories");
  }
  return DEMO_CATEGORIES;
}

export async function getProductsByCategory(categoryId: number, params: Record<string, string> = {}) {
  return getProducts({ category: String(categoryId), ...params });
}

export async function getTags(params: Record<string, string> = {}) {
  try {
    const res = await fetch(buildUrl("products/tags", { per_page: "50", ...params }));
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn("WooCommerce API fetch tags failed, using demo tags");
  }
  return DEMO_TAGS;
}

export async function getProductVariations(productId: number) {
  try {
    const res = await fetch(buildUrl(`products/${productId}/variations`, { per_page: "100" }));
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn(`WooCommerce API fetch variations failed for ${productId}`);
  }
  return [];
}

export async function registerCustomer(userData: any) {
  const res = await fetch(buildUrl("customers"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `WooCommerce API error: ${res.status}`);
  }
  return res.json();
}

export async function loginUser(credentials: any) {
  const baseUrl = "https://store.elv8now.com";
  const endpoints = [
    `${baseUrl}/wp-json/jwt-auth/v1/token`,
    `${baseUrl}/wp-json/jwt-auth/v2/token`,
    `${baseUrl}/wp-json/simple-jwt-login/v1/auth`,
    `${baseUrl}/wp-json/simple-jwt-login/v1/authenticate`,
    `${baseUrl}/?rest_route=/jwt-auth/v1/token`,
    `${baseUrl}/?rest_route=/simple-jwt-login/v1/auth`
  ];

  let lastError = "Αποτυχία σύνδεσης: Δεν βρέθηκε ενεργό endpoint πιστοποίησης στο WordPress.";

  for (const url of endpoints) {
    try {
      const isSimpleJwt = url.includes("simple-jwt-login");
      const body = isSimpleJwt
        ? { username: credentials.username, password: credentials.password }
        : credentials;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && (data.token || data.jwt || (data.data && data.data.token))) {
        const token = data.token || data.jwt || (data.data && data.data.token);
        let userData = { ...data, token };

        if (!userData.id && !userData.user_id) {
          try {
            const userRes = await fetch(`${baseUrl}/wp-json/wp/v2/users/me`, {
              headers: { "Authorization": `Bearer ${token}` }
            });
            if (userRes.ok) {
              const fullUserData = await userRes.json();
              userData = { ...userData, id: fullUserData.id, ...fullUserData };
            }
          } catch (e) {
            console.error("Could not fetch user ID via /me", e);
          }
        }

        if (!userData.id && !userData.user_id) {
          try {
            const email = userData.user_email || userData.email || credentials.username;
            const customerRes = await fetch(buildUrl("customers", { email }));
            if (customerRes.ok) {
              const customers = await customerRes.json();
              if (Array.isArray(customers) && customers.length > 0) {
                userData.id = customers[0].id;
              }
            }
          } catch (e) {
            console.error("Could not resolve customer ID via email", e);
          }
        }

        return {
          id: userData.id || userData.user_id || 0,
          token: token,
          user_email: userData.user_email || userData.email || credentials.username,
          user_nicename: userData.user_nicename || userData.nicename || credentials.username,
          ...userData
        };
      } else if (res.status === 403 || res.status === 401 || (data.code && data.code.includes("auth"))) {
        lastError = data.message || "Λανθασμένο όνομα χρήστη ή κωδικός πρόσβασης.";
        if (lastError.includes("not found")) continue;
        throw new Error(lastError);
      }
    } catch (e: any) {
      if (e.message && (e.message.includes("Λανθασμένο") || e.message.includes("στοιχεία") || e.message.includes("κωδικός"))) {
        throw e;
      }
    }
  }

  throw new Error(lastError);
}

export async function getUserOrders(customerId: number, email?: string) {
  let customerOrders: any[] = [];
  let emailOrders: any[] = [];

  if (customerId > 0) {
    try {
      const res = await fetch(buildUrl("orders", { customer: String(customerId), per_page: "50" }));
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          customerOrders = data;
        }
      }
    } catch (e) {
      console.error("Error fetching orders by customer ID", e);
    }
  }

  if (email) {
    try {
      const res = await fetch(buildUrl("orders", { search: email, per_page: "50" }));
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          emailOrders = data.filter((order: any) => 
            order.billing?.email?.toLowerCase() === email.toLowerCase() ||
            order.shipping?.email?.toLowerCase() === email.toLowerCase()
          );
        }
      }
    } catch (e) {
      console.error("Error fetching orders by email search", e);
    }
  }

  const allOrdersMap = new Map<number, any>();
  customerOrders.forEach(o => allOrdersMap.set(o.id, o));
  emailOrders.forEach(o => allOrdersMap.set(o.id, o));

  return Array.from(allOrdersMap.values()).sort((a, b) => 
    new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
  );
}

export async function getProductReviews(productId: number) {
  try {
    const res = await fetch(buildUrl("products/reviews", { product: String(productId), per_page: "50" }));
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Error fetching reviews");
  }
  return [];
}

export async function createProductReview(reviewData: {
  product_id: number;
  review: string;
  reviewer: string;
  reviewer_email: string;
  rating: number;
}) {
  try {
    const res = await fetch(buildUrl("products/reviews"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn("Error submitting review to WP API", e);
  }
  return {
    id: Date.now(),
    date_created: new Date().toISOString(),
    product_id: reviewData.product_id,
    status: "approved",
    reviewer: reviewData.reviewer,
    reviewer_email: reviewData.reviewer_email,
    review: reviewData.review,
    rating: reviewData.rating,
    verified: true,
  };
}

export async function getOrder(orderId: number) {
  try {
    const res = await fetch(buildUrl(`orders/${orderId}`));
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn(`Error fetching order ${orderId}`);
  }
  return null;
}

export async function createOrderNote(orderId: number, noteData: { note: string; customer_note: boolean }) {
  const res = await fetch(buildUrl(`orders/${orderId}/notes`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `WooCommerce API error: ${res.status}`);
  }
  return res.json();
}
