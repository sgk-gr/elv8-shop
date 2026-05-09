const BASE_URL = "https://api.vaiacharms.gr/wp-json/wc/v3";
const CK = "ck_a60909f612e329245b86ce88e876b4928cf8d419";
const CS = "cs_8509165bda4837aed2a6f1c0d03d0e7d35570809";

async function listCategories() {
  const url = `${BASE_URL}/products/categories?per_page=100&consumer_key=${CK}&consumer_secret=${CS}`;
  try {
    const response = await fetch(url);
    const categories = await response.json();
    categories.forEach(c => {
      console.log(`ID: ${c.id}, Name: ${c.name}, Parent: ${c.parent}, Slug: ${c.slug}`);
    });
  } catch (error) {
    console.error(error);
  }
}

listCategories();
