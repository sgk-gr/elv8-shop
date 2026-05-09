
const BASE_URL = "https://api.vaiacharms.gr/wp-json/wc/v3";
const CK = "ck_a60909f612e329245b86ce88e876b4928cf8d419";
const CS = "cs_8509165bda4837aed2a6f1c0d03d0e7d35570809";

async function setPrice(id, price) {
    const url = `${BASE_URL}/products/${id}?consumer_key=${CK}&consumer_secret=${CS}`;
    const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regular_price: price }),
    });
    if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${res.status}, body: ${JSON.stringify(errBody)}`);
    }
    return await res.json();
}

setPrice(280, "8").then(product => {
    console.log("Product 280 price set successfully!");
    console.log("type:", product.type);
    console.log("price:", product.price);
    console.log("regular_price:", product.regular_price);
    console.log("stock_status:", product.stock_status);
    console.log("purchasable:", product.purchasable);
}).catch(err => {
    console.error("Failed:", err.message);
});
