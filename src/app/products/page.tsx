import { getProducts, getCategories, getTags } from "@/lib/woocommerce";
import ProductsClient from "./ProductsClient";
import JsonLd from "@/components/JsonLd";
import { Metadata } from "next";

export const revalidate = 14400; // Refresh every 4 hours (avoiding Vercel rate limits)

export const metadata: Metadata = {
  title: "Ενεργειακά Ποτά ELV8 | Αγορά Όλων των Γεύσεων & Πακέτων",
  description: "Ανακαλύψτε όλες τις γεύσεις των ενεργειακών ποτών ELV8. Zero Sugar, 200mg φυσική καφεΐνη, ηλεκτρολύτες & βιταμίνες. Δείτε τα διαθέσιμα πακέτα & προσφορές!",
  alternates: {
    canonical: "https://store.elv8now.com/products",
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
