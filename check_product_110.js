const BASE_URL = "https://api.vaiacharms.gr/wp-json/wc/v3";
const CK = "ck_a60909f612e329245b86ce88e876b4928cf8d419";
const CS = "cs_8509165bda4837aed2a6f1c0d03d0e7d35570809";

async function getProduct(id) {
    const url = `${BASE_URL}/products/${id}?consumer_key=${CK}&consumer_secret=${CS}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
}

getProduct(110).then(p => {
    if (p) {
        console.log(`ID: ${p.id}, Name: ${p.name}`);
        console.log(`Categories: ${JSON.stringify(p.categories, null, 2)}`);
    } else {
        console.log("Product 110 not found");
    }
});
