
const BASE_URL = "https://api.vaiacharms.gr/wp-json/wc/v3";
const CK = "ck_a60909f612e329245b86ce88e876b4928cf8d419";
const CS = "cs_8509165bda4837aed2a6f1c0d03d0e7d35570809";

async function updateProductAttributes(id, attributes) {
    const url = `${BASE_URL}/products/${id}?consumer_key=${CK}&consumer_secret=${CS}`;
    const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attributes }),
    });
    if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${res.status}, body: ${JSON.stringify(errBody)}`);
    }
    return await res.json();
}

const newAttributes = [
    {
        name: "Υλικό",
        visible: true,
        options: ["Ανοξείδωτο ατσάλι (stainless steel)"]
    },
    {
        name: "Διαστάσεις",
        visible: true,
        options: ["Συνολικό μήκος 2,2 εκ."]
    }
];

updateProductAttributes(215, newAttributes).then(product => {
    console.log("Product 215 updated successfully!");
    console.log("New Attributes:", JSON.stringify(product.attributes, null, 2));
}).catch(err => {
    console.error("Update failed:", err.message);
});
