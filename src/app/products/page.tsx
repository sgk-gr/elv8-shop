import { getProducts, getCategories, getTags } from "@/lib/woocommerce";
import ProductsClient from "./ProductsClient";
import JsonLd from "@/components/JsonLd";
import { Metadata } from "next";

export const revalidate = 14400; // Refresh every 4 hours (avoiding Vercel rate limits)

export const metadata: Metadata = {
  title: "Συλλογές Κοσμημάτων & Αξεσουάρ",
  description: "Ανακαλύψτε την πλήρη συλλογή μας από χειροποίητα κοσμήματα, αξεσουάρ και είδη ομορφιάς. Φίλτρα ανά κατηγορία, τιμή και χαρακτηριστικά.",
  alternates: {
    canonical: "https://www.vaiacharms.gr/products",
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
    { name: "Αρχική", url: "/" },
    { name: "Συλλογές", url: "/products" }
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
