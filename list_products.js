
const BASE_URL = "https://api.vaiacharms.gr/wp-json/wc/v3";
const CK = "ck_a60909f612e329245b86ce88e876b4928cf8d419";
const CS = "cs_8509165bda4837aed2a6f1c0d03d0e7d35570809";

async function getProducts(params = {}) {
    const url = new URL(`${BASE_URL}/products`);
    url.searchParams.set("consumer_key", CK);
    url.searchParams.set("consumer_secret", CS);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

getProducts({ per_page: "20", orderby: "id", order: "desc" }).then(products => {
    products.forEach(p => {
        console.log(`ID: ${p.id}, Name: ${p.name}`);
    });
}).catch(err => {
    console.error(err);
});
