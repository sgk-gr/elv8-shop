import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi.default({
  url: "https://headaccessories.gr",
  consumerKey: "ck_b2eb34d31d4e0e4708ff777aa0ddebca7e541ce1",
  consumerSecret: "cs_de76e9324ca8651a0b5a320ce13fc019ebec1cae",
  version: "wc/v3"
});

api.get("products/506")
  .then((response) => {
    console.log("Categories:", response.data.categories);
  })
  .catch((error) => {
    console.log(error.response.data);
  });
