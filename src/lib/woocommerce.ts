const BASE_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "https://store.elv8now.com/wp-json/wc/v3";
const CK = process.env.NEXT_PUBLIC_WOOCOMMERCE_CK || "ck_elv8now_demo";
const CS = process.env.NEXT_PUBLIC_WOOCOMMERCE_CS || "cs_elv8now_demo";


function buildUrl(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.set("consumer_key", CK);
  url.searchParams.set("consumer_secret", CS);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}

export async function getProducts(params: Record<string, string> = {}) {
  const res = await fetch(buildUrl("products", { 
    per_page: "20", 
    status: "publish",
    catalog_visibility: "visible",
    ...params 
  }));
  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
  return res.json();
}


export async function getProduct(id: number) {
  const res = await fetch(buildUrl(`products/${id}`));
  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
  return res.json();
}

export async function getCategories(params: Record<string, string> = {}) {
  const res = await fetch(buildUrl("products/categories", { per_page: "50", ...params }));
  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
  return res.json();
}

export async function getProductsByCategory(categoryId: number, params: Record<string, string> = {}) {
  return getProducts({ category: String(categoryId), ...params });
}

export async function getTags(params: Record<string, string> = {}) {
  const res = await fetch(buildUrl("products/tags", { per_page: "50", ...params }));
  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
  return res.json();
}


export async function getProductVariations(productId: number) {
  const res = await fetch(buildUrl(`products/${productId}/variations`, { per_page: "100" }));
  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
  return res.json();
}

export async function registerCustomer(userData: any) {
  const res = await fetch(buildUrl("customers"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || `WooCommerce API error: ${res.status}`);
  }
  return res.json();
}

export async function loginUser(credentials: any) {
  const baseUrl = "https://api.vaiacharms.gr";
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

        // Αν λείπει το ID, προσπαθούμε πρώτα από το /users/me
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

        // Αν ΑΚΟΜΑ λείπει το ID, το ψάχνουμε μέσω του WooCommerce Customers API χρησιμοποιώντας το email
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

        // Κανονικοποίηση του response
        return {
          id: userData.id || userData.user_id || 0,
          token: token,
          user_email: userData.user_email || userData.email || credentials.username,
          user_nicename: userData.user_nicename || userData.nicename || credentials.username,
          ...userData
        };
      } else if (res.status === 403 || res.status === 401 || (data.code && data.code.includes("auth"))) {
        lastError = data.message || "Λανθασμένο όνομα χρήστη ή κωδικός πρόσβασης.";
        if (lastError.includes("not found")) continue; // Αν είναι 404/403 επειδή δεν υπάρχει η διαδρομή
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

  // 1. Fetch by customer ID if logged in and has a valid ID
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

  // 2. Fetch by email search to find guest/registered orders matching this email securely
  if (email) {
    try {
      const res = await fetch(buildUrl("orders", { search: email, per_page: "50" }));
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          // Strictly filter to ensure only exact matching email orders are shown, avoiding any partial search match leaks
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

  // Combine both sets and remove duplicates by order ID
  const allOrdersMap = new Map<number, any>();
  customerOrders.forEach(o => allOrdersMap.set(o.id, o));
  emailOrders.forEach(o => allOrdersMap.set(o.id, o));

  // Return combined list sorted by date_created descending (newest first)
  return Array.from(allOrdersMap.values()).sort((a, b) => 
    new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
  );
}

export async function getProductReviews(productId: number) {
  const res = await fetch(buildUrl("products/reviews", { product: String(productId), per_page: "50" }));
  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
  return res.json();
}

export async function getOrder(orderId: number) {
  const res = await fetch(buildUrl(`orders/${orderId}`));
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`WooCommerce API error: ${res.status}`);
  }
  return res.json();
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
