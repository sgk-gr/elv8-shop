import { getProducts, getCategories, getTags } from "@/lib/woocommerce";
import ProductsClient from "./ProductsClient";
import JsonLd from "@/components/JsonLd";
import { Metadata } from "next";

export const revalidate = 14400; // Refresh every 4 hours (avoiding Vercel rate limits)

export const metadata: Metadata = {
  title: "ELV8 Energy Drink Collection | Our Flavors & Packs",
  description: "Explore the full collection of ELV8 Energy Drinks. Zero Sugar, 200mg Natural Caffeine, Electrolytes & Real Fruit Flavors.",
  alternates: {
    canonical: "https://www.elv8.gr/products",
  }
};

export default async function ProductsPage() {
  // Parallel fetch for speed
  const [products, categories, tags] = await Promise.all([
    getProducts({ per_page: "100" }),
    getCategories({ hide_empty: "true" }),
    getTags({ hide_empty: "true" })
  ]);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Our Flavors", url: "/products" }
  ];

  return (
    <>
      <JsonLd type="breadcrumb" breadcrumbs={breadcrumbs} />
      <ProductsClient 
        initialProducts={products} 
        initialCategories={categories} 
        initialTags={tags} 
      />
    </>
  );
}
