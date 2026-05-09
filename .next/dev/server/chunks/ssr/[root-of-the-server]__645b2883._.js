module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/lib/woocommerce.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCategories",
    ()=>getCategories,
    "getProduct",
    ()=>getProduct,
    "getProductReviews",
    ()=>getProductReviews,
    "getProductVariations",
    ()=>getProductVariations,
    "getProducts",
    ()=>getProducts,
    "getProductsByCategory",
    ()=>getProductsByCategory,
    "getTags",
    ()=>getTags,
    "getUserOrders",
    ()=>getUserOrders,
    "loginUser",
    ()=>loginUser,
    "registerCustomer",
    ()=>registerCustomer
]);
const BASE_URL = "https://api.vaiacharms.gr/wp-json/wc/v3";
const CK = "ck_a60909f612e329245b86ce88e876b4928cf8d419";
const CS = "cs_8509165bda4837aed2a6f1c0d03d0e7d35570809";
function buildUrl(endpoint, params = {}) {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    url.searchParams.set("consumer_key", CK);
    url.searchParams.set("consumer_secret", CS);
    Object.entries(params).forEach(([k, v])=>url.searchParams.set(k, v));
    return url.toString();
}
async function getProducts(params = {}) {
    const res = await fetch(buildUrl("products", {
        per_page: "20",
        ...params
    }));
    if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
    return res.json();
}
async function getProduct(id) {
    const res = await fetch(buildUrl(`products/${id}`));
    if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
    return res.json();
}
async function getCategories(params = {}) {
    const res = await fetch(buildUrl("products/categories", {
        per_page: "50",
        ...params
    }));
    if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
    return res.json();
}
async function getProductsByCategory(categoryId, params = {}) {
    return getProducts({
        category: String(categoryId),
        ...params
    });
}
async function getTags(params = {}) {
    const res = await fetch(buildUrl("products/tags", {
        per_page: "50",
        ...params
    }));
    if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
    return res.json();
}
async function getProductVariations(productId) {
    const res = await fetch(buildUrl(`products/${productId}/variations`, {
        per_page: "100"
    }));
    if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
    return res.json();
}
async function registerCustomer(userData) {
    const res = await fetch(buildUrl("customers"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || `WooCommerce API error: ${res.status}`);
    }
    return res.json();
}
async function loginUser(credentials) {
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
    for (const url of endpoints){
        try {
            const isSimpleJwt = url.includes("simple-jwt-login");
            const body = isSimpleJwt ? {
                username: credentials.username,
                password: credentials.password
            } : credentials;
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await res.json().catch(()=>({}));
            if (res.ok && (data.token || data.jwt || data.data && data.data.token)) {
                const token = data.token || data.jwt || data.data && data.data.token;
                let userData = {
                    ...data,
                    token
                };
                // Αν λείπει το ID, προσπαθούμε πρώτα από το /users/me
                if (!userData.id && !userData.user_id) {
                    try {
                        const userRes = await fetch(`${baseUrl}/wp-json/wp/v2/users/me`, {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        });
                        if (userRes.ok) {
                            const fullUserData = await userRes.json();
                            userData = {
                                ...userData,
                                id: fullUserData.id,
                                ...fullUserData
                            };
                        }
                    } catch (e) {
                        console.error("Could not fetch user ID via /me", e);
                    }
                }
                // Αν ΑΚΟΜΑ λείπει το ID, το ψάχνουμε μέσω του WooCommerce Customers API χρησιμοποιώντας το email
                if (!userData.id && !userData.user_id) {
                    try {
                        const email = userData.user_email || userData.email || credentials.username;
                        const customerRes = await fetch(buildUrl("customers", {
                            email
                        }));
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
            } else if (res.status === 403 || res.status === 401 || data.code && data.code.includes("auth")) {
                lastError = data.message || "Λανθασμένο όνομα χρήστη ή κωδικός πρόσβασης.";
                if (lastError.includes("not found")) continue; // Αν είναι 404/403 επειδή δεν υπάρχει η διαδρομή
                throw new Error(lastError);
            }
        } catch (e) {
            if (e.message && (e.message.includes("Λανθασμένο") || e.message.includes("στοιχεία") || e.message.includes("κωδικός"))) {
                throw e;
            }
        }
    }
    throw new Error(lastError);
}
async function getUserOrders(customerId, email) {
    const params = {
        per_page: "50"
    };
    if (email) {
        // Το WooCommerce API υποστηρίζει το parameter 'email' για να βρίσκει παραγγελίες (και guest)
        params.email = email;
    } else if (customerId > 0) {
        params.customer = String(customerId);
    } else {
        return [];
    }
    const res = await fetch(buildUrl("orders", params));
    if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
    return res.json();
}
async function getProductReviews(productId) {
    const res = await fetch(buildUrl("products/reviews", {
        product: String(productId),
        per_page: "50"
    }));
    if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
    return res.json();
}
}),
"[project]/src/app/product/[id]/ProductDetailClient.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/product/[id]/ProductDetailClient.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/product/[id]/ProductDetailClient.tsx <module evaluation>", "default");
}),
"[project]/src/app/product/[id]/ProductDetailClient.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/product/[id]/ProductDetailClient.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/product/[id]/ProductDetailClient.tsx", "default");
}),
"[project]/src/app/product/[id]/ProductDetailClient.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$product$2f5b$id$5d2f$ProductDetailClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/product/[id]/ProductDetailClient.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$product$2f5b$id$5d2f$ProductDetailClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/product/[id]/ProductDetailClient.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$product$2f5b$id$5d2f$ProductDetailClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/product/[id]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductDetailPage,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$woocommerce$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/woocommerce.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$product$2f5b$id$5d2f$ProductDetailClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/product/[id]/ProductDetailClient.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$JsonLd$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/JsonLd.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
const BASE_URL = "https://www.vaiacharms.gr";
async function generateStaticParams() {
    try {
        const allProducts = [];
        let page = 1;
        const perPage = 100;
        while(true){
            const products = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$woocommerce$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProducts"])({
                per_page: String(perPage),
                page: String(page)
            });
            if (!Array.isArray(products) || products.length === 0) break;
            allProducts.push(...products);
            if (products.length < perPage) break;
            page++;
        }
        return allProducts.map((product)=>({
                id: String(product.id)
            }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}
async function generateMetadata({ params }) {
    const { id } = await params;
    try {
        const product = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$woocommerce$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProduct"])(Number(id));
        const stripHtml = (s)=>s.replace(/<[^>]*>/g, "").trim();
        const productName = stripHtml(product.name || "Προϊόν");
        const plainDescription = stripHtml(product.short_description || product.description || "").slice(0, 160) || `Αγοράστε ${productName} από το Vaia Charms. Δωρεάν αποστολή άνω των 65€.`;
        const image = product.images?.[0]?.src || `${BASE_URL}/opengraph-image.png`;
        const canonicalUrl = `${BASE_URL}/product/${id}/`;
        return {
            title: `${productName}`,
            description: plainDescription,
            openGraph: {
                title: `${productName} | Vaia Charms`,
                description: plainDescription,
                type: "website",
                locale: "el_GR",
                url: canonicalUrl,
                siteName: "Vaia Charms",
                images: [
                    {
                        url: image,
                        width: 800,
                        height: 800,
                        alt: productName
                    }
                ]
            },
            twitter: {
                card: "summary_large_image",
                title: `${productName} | Vaia Charms`,
                description: plainDescription,
                images: [
                    image
                ]
            },
            alternates: {
                canonical: canonicalUrl
            }
        };
    } catch (error) {
        console.error("Error generating metadata for product:", error);
        return {
            title: "Προϊόν"
        };
    }
}
async function ProductDetailPage({ params }) {
    const { id } = await params;
    // Fetch product server-side for JSON-LD (best-effort — client will refetch)
    let productData = null;
    try {
        productData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$woocommerce$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProduct"])(Number(id));
    } catch (_) {}
    const stripHtml = (s)=>(s || "").replace(/<[^>]*>/g, "").trim();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            productData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$JsonLd$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                type: "product",
                product: {
                    name: stripHtml(productData.name),
                    description: stripHtml(productData.short_description || productData.description || ""),
                    image: productData.images?.[0]?.src,
                    price: productData.price,
                    currency: "EUR",
                    availability: productData.stock_status === "instock" ? "InStock" : "OutOfStock",
                    sku: productData.sku || String(id),
                    url: `${BASE_URL}/product/${id}/`,
                    ratingValue: productData.average_rating,
                    reviewCount: productData.rating_count
                }
            }, void 0, false, {
                fileName: "[project]/src/app/product/[id]/page.tsx",
                lineNumber: 86,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "container mx-auto px-4 md:px-8 py-8 md:py-16",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 gap-8 md:gap-16 animate-pulse",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "aspect-[3/4] bg-secondary rounded-3xl"
                            }, void 0, false, {
                                fileName: "[project]/src/app/product/[id]/page.tsx",
                                lineNumber: 106,
                                columnNumber: 29
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-10 bg-secondary rounded-full w-3/4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/product/[id]/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 33
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-6 bg-secondary rounded-full w-1/4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/product/[id]/page.tsx",
                                        lineNumber: 109,
                                        columnNumber: 33
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-32 bg-secondary rounded-3xl w-full mt-8"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/product/[id]/page.tsx",
                                        lineNumber: 110,
                                        columnNumber: 33
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/product/[id]/page.tsx",
                                lineNumber: 107,
                                columnNumber: 29
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/product/[id]/page.tsx",
                        lineNumber: 105,
                        columnNumber: 25
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/app/product/[id]/page.tsx",
                    lineNumber: 104,
                    columnNumber: 21
                }, void 0),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$product$2f5b$id$5d2f$ProductDetailClient$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    id: id
                }, void 0, false, {
                    fileName: "[project]/src/app/product/[id]/page.tsx",
                    lineNumber: 116,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/product/[id]/page.tsx",
                lineNumber: 102,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/app/product/[id]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/product/[id]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__645b2883._.js.map