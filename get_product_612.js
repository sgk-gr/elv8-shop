const BASE_URL = "https://api.vaiacharms.gr/wp-json/wc/v3";
const CK = "ck_a60909f612e329245b86ce88e876b4928cf8d419";
const CS = "cs_8509165bda4837aed2a6f1c0d03d0e7d35570809";

async function getProduct() {
  const url = `${BASE_URL}/products/612?consumer_key=${CK}&consumer_secret=${CS}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

    if (data.type === 'variable') {
        const varUrl = `${BASE_URL}/products/612/variations?consumer_key=${CK}&consumer_secret=${CS}`;
        const varRes = await fetch(varUrl);
        const varData = await varRes.json();
        console.log("--- VARIATIONS ---");
        console.log(JSON.stringify(varData, null, 2));
    }
  } catch (error) {
    console.error(error);
  }
}

getProduct();
