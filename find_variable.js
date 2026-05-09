
const BASE_URL = "https://api.vaiacharms.gr/wp-json/wc/v3";
const CK = "ck_a60909f612e329245b86ce88e876b4928cf8d419";
const CS = "cs_8509165bda4837aed2a6f1c0d03d0e7d35570809";

async function findVariableProduct() {
    const url = `${BASE_URL}/products?type=variable&consumer_key=${CK}&consumer_secret=${CS}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const products = await res.json();
    if (products.length > 0) {
        console.log(`Found variable product: ID: ${products[0].id}, Name: ${products[0].name}`);
        return products[0].id;
    }
    console.log("No variable products found");
    return null;
}

findVariableProduct();
