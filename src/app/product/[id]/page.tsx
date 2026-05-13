import { Metadata } from "next";
import { Suspense } from "react";
import { getProducts, getProduct } from "@/lib/woocommerce";
import ProductDetailClient from "./ProductDetailClient";
import JsonLd from "@/components/JsonLd";

export const revalidate = 60; // Επαναδημιουργία της σελίδας κάθε 60 δευτερόλεπτα (ISR)

const BASE_URL = "https://www.vaiacharms.gr";

// ── Static params (required for output: export) ───────────────────────────────
export async function generateStaticParams() {
    try {
        const allProducts: any[] = [];
        let page = 1;
        const perPage = 100;
        while (true) {
            const products = await getProducts({ per_page: String(perPage), page: String(page) });
            if (!Array.isArray(products) || products.length === 0) break;
            allProducts.push(...products);
            if (products.length < perPage) break;
            page++;
        }
        return allProducts.map((product: any) => ({ id: String(product.id) }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

// ── Per-product SEO metadata ──────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    try {
        const product = await getProduct(Number(id));

        const stripHtml = (s: string) => s.replace(/<[^>]*>/g, "").trim();
        const productName = stripHtml(product.name || "Προϊόν");
        const plainDescription = stripHtml(product.short_description || product.description || "")
            .slice(0, 160) || `Αγοράστε ${productName} από το Vaia Charms. Δωρεάν αποστολή άνω των 65€.`;

        const image = product.images?.[0]?.src || `${BASE_URL}/opengraph-image.png`;
        const canonicalUrl = `${BASE_URL}/product/${id}/`;

        return {
            title: `${productName}`,
            description: plainDescription,
            openGraph: {
                title: `${productName} | Vaia Charms`,
                description: plainDescription,
                type: "website",
                locale: "el_GR",
                url: canonicalUrl,
                siteName: "Vaia Charms",
                images: [{ url: image, width: 800, height: 800, alt: productName }],
            },
            twitter: {
                card: "summary_large_image",
                title: `${productName} | Vaia Charms`,
                description: plainDescription,
                images: [image],
            },
            alternates: {
                canonical: canonicalUrl,
            },
        };
    } catch (error) {
        console.error("Error generating metadata for product:", error);
        return { title: "Προϊόν" };
    }
}

// ── Page component ────────────────────────────────────────────────────────────
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch product server-side for JSON-LD (best-effort — client will refetch)
    let productData: any = null;
    try {
        productData = await getProduct(Number(id));
    } catch (_) {}

    const stripHtml = (s: string) => (s || "").replace(/<[^>]*>/g, "").trim();

    return (
        <>
            <JsonLd
                type="breadcrumb"
                breadcrumbs={[
                    { name: "Αρχική", url: "/" },
                    { name: "Συλλογές", url: "/products" },
                    { name: stripHtml(productData.name), url: `/product/${id}/` }
                ]}
            />
            {productData && (
                <JsonLd
                    type="product"
                    product={{
                        name: stripHtml(productData.name),
                        description: stripHtml(productData.short_description || productData.description || ""),
                        image: productData.images?.[0]?.src,
                        price: productData.price,
                        currency: "EUR",
                        availability: productData.stock_status === "instock" ? "InStock" : "OutOfStock",
                        sku: productData.sku || String(id),
                        url: `${BASE_URL}/product/${id}/`,
                        ratingValue: productData.average_rating,
                        reviewCount: productData.rating_count,
                    }}
                />
            )}

            <Suspense
                fallback={
                    <main className="container mx-auto px-4 md:px-8 py-8 md:py-16">
                        <div className="grid md:grid-cols-2 gap-8 md:gap-16 animate-pulse">
                            <div className="aspect-[3/4] bg-secondary rounded-3xl" />
                            <div className="space-y-4">
                                <div className="h-10 bg-secondary rounded-full w-3/4" />
                                <div className="h-6 bg-secondary rounded-full w-1/4" />
                                <div className="h-32 bg-secondary rounded-3xl w-full mt-8" />
                            </div>
                        </div>
                    </main>
                }
            >
                <ProductDetailClient id={id} />
            </Suspense>
        </>
    );
}
