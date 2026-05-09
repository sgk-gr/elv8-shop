const BASE_URL = "https://api.vaiacharms.gr/wp-json/wc/v3";
const CK = "ck_a60909f612e329245b86ce88e876b4928cf8d419";
const CS = "cs_8509165bda4837aed2a6f1c0d03d0e7d35570809";

async function getProducts() {
    const url = `${BASE_URL}/products?per_page=100&consumer_key=${CK}&consumer_secret=${CS}`;
    const res = await fetch(url);
    return await res.json();
}

getProducts().then(products => {
    products.forEach(p => {
        if (String(p.id).includes("396") || (p.sku && p.sku.includes("396"))) {
            console.log(`FOUND: ID: ${p.id}, Name: ${p.name}, SKU: ${p.sku}`);
        }
    });
    console.log("Done checking 100 products");
});
