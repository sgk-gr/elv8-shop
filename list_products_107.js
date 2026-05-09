const BASE_URL = "https://api.vaiacharms.gr/wp-json/wc/v3";
const CK = "ck_a60909f612e329245b86ce88e876b4928cf8d419";
const CS = "cs_8509165bda4837aed2a6f1c0d03d0e7d35570809";

async function getProductsByCategory(catId) {
    const url = `${BASE_URL}/products?category=${catId}&per_page=100&consumer_key=${CK}&consumer_secret=${CS}`;
    const res = await fetch(url);
    if (!res.ok) {
        console.error(`Failed to fetch products: ${res.statusText}`);
        return null;
    }
    return await res.json();
}

getProductsByCategory(107).then(products => {
    if (products) {
        products.forEach(p => {
            console.log(`ID: ${p.id}, Name: ${p.name}`);
        });
    }
}).catch(err => {
    console.error(err);
});
