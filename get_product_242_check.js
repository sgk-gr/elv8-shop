const BASE_URL = "https://api.vaiacharms.gr/wp-json/wc/v3";
const CK = "ck_a60909f612e329245b86ce88e876b4928cf8d419";
const CS = "cs_8509165bda4837aed2a6f1c0d03d0e7d35570809";

async function checkProduct() {
    const url = `${BASE_URL}/products/242?consumer_key=${CK}&consumer_secret=${CS}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(JSON.stringify(data.attributes, null, 2));
}

checkProduct();
