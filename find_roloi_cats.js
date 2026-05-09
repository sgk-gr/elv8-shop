const BASE_URL = "https://api.vaiacharms.gr/wp-json/wc/v3";
const CK = "ck_a60909f612e329245b86ce88e876b4928cf8d419";
const CS = "cs_8509165bda4837aed2a6f1c0d03d0e7d35570809";

async function findCategory() {
    const url = `${BASE_URL}/products/categories?consumer_key=${CK}&consumer_secret=${CS}&per_page=100`;
    const res = await fetch(url);
    const cats = await res.json();
    const matches = cats.filter(c => c.name.toLowerCase().includes("ρολόι") || c.slug.includes("roloi"));
    console.log(JSON.stringify(matches, null, 2));
}

findCategory();
