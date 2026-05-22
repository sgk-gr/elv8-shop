import { getProducts, getCategories, getTags } from "@/lib/woocommerce";
import HomeClient from "./HomeClient";
import { Suspense } from "react";

export const revalidate = 14400; // Refresh every 4 hours (avoiding Vercel rate limits)

export default async function HomePage() {
  // Parallel fetch for speed
  const [featuredProducts, saleProducts, categories, tags] = await Promise.all([
    getProducts({ per_page: "10", orderby: "date" }),
    getProducts({ per_page: "10", on_sale: "true" }),
    getCategories({ hide_empty: "true" }),
    getTags({ hide_empty: "true" })
  ]);

  return (
    <Suspense fallback={null}>
      <HomeClient 
        initialFeaturedProducts={featuredProducts}
        initialSaleProducts={saleProducts}
        initialCategories={categories}
        initialTags={tags}
      />
    </Suspense>
  );
}

