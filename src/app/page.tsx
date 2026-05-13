import { getProducts, getCategories, getTags } from "@/lib/woocommerce";
import HomeClient from "./HomeClient";

export const revalidate = 3600; // Cache for 1 hour

export default async function HomePage() {
  // Parallel fetch for speed
  const [featuredProducts, saleProducts, categories, tags] = await Promise.all([
    getProducts({ per_page: "10", orderby: "date" }),
    getProducts({ per_page: "10", on_sale: "true" }),
    getCategories({ hide_empty: "true" }),
    getTags({ hide_empty: "true" })
  ]);

  return (
    <HomeClient 
      initialFeaturedProducts={featuredProducts}
      initialSaleProducts={saleProducts}
      initialCategories={categories}
      initialTags={tags}
    />
  );
}
