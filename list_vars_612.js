const BASE_URL = "https://api.vaiacharms.gr/wp-json/wc/v3";
const CK = "ck_a60909f612e329245b86ce88e876b4928cf8d419";
const CS = "cs_8509165bda4837aed2a6f1c0d03d0e7d35570809";

async function getVariations() {
  const url = `${BASE_URL}/products/612/variations?consumer_key=${CK}&consumer_secret=${CS}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    data.forEach(v => {
        console.log(`ID: ${v.id}, Price: ${v.price}, Stock: ${v.stock_status}, Attributes: ${JSON.stringify(v.attributes)}`);
    });
  } catch (error) {
    console.error(error);
  }
}

getVariations();
