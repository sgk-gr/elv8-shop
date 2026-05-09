
const BASE_URL = "https://api.vaiacharms.gr/wp-json/wc/v3";
const CK = "ck_a60909f612e329245b86ce88e876b4928cf8d419";
const CS = "cs_8509165bda4837aed2a6f1c0d03d0e7d35570809";

async function getProduct(id) {
    const res = await fetch(`${BASE_URL}/products/${id}?consumer_key=${CK}&consumer_secret=${CS}`);
    const p = await res.json();
    console.log('ID:', p.id);
    console.log('Name:', p.name);
    console.log('Type:', p.type);
    console.log('Price:', p.price);
    console.log('Regular Price:', p.regular_price);
    console.log('Stock Status:', p.stock_status);
    console.log('Stock Quantity:', p.stock_quantity);
    console.log('Manage Stock:', p.manage_stock);
    console.log('Attributes:', JSON.stringify(p.attributes, null, 2));
    console.log('Variations Length:', p.variations.length);
}
getProduct(215);
