/**
 * JsonLd – injects JSON-LD structured data into the document <head>.
 *
 * Supports three schemas:
 *  • "website"      – WebSite + Organization (used on every page via layout)
 *  • "product"      – Product (used on the individual product page)
 *  • "breadcrumb"   – BreadcrumbList (used on category / product pages)
 *  • "faq"          – FAQPage (used on the FAQ page)
 */

export interface ProductSchema {
    name: string;
    description?: string;
    image?: string;
    price?: string;
    currency?: string;
    availability?: "InStock" | "OutOfStock" | "PreOrder";
    sku?: string;
    url?: string;
    ratingValue?: string;
    reviewCount?: number;
}

export interface BreadcrumbItem {
    name: string;
    url: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}

interface JsonLdProps {
    type: "website" | "product" | "breadcrumb" | "faq";
    product?: ProductSchema;
    breadcrumbs?: BreadcrumbItem[];
    faqs?: FaqItem[];
}

const SITE_NAME = "Vaia Charms";
const SITE_URL = "https://www.vaiacharms.gr";

function buildWebsite() {
    return [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            description:
                "Η κορυφαία επιλογή σας για ποιοτικά κοσμήματα, cosmetics και αξεσουάρ στην Ελλάδα.",
            potentialAction: {
                "@type": "SearchAction",
                target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
            },
            inLanguage: "el-GR",
        },
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/opengraph-image.png`,
                width: 1200,
                height: 630,
            },
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+30-694-310-5742",
                contactType: "customer service",
                email: "info@vaiacharms.gr",
                availableLanguage: "Greek",
                hoursAvailable: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    opens: "09:00",
                    closes: "17:00",
                },
            },
            sameAs: [
                "https://www.instagram.com/vaiacharms",
                "https://www.facebook.com/vaiacharms",
            ],
        },
    ];
}

function buildProduct(p: ProductSchema) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.name,
        description: p.description || "",
        image: p.image || `${SITE_URL}/opengraph-image.png`,
        sku: p.sku || "",
        url: p.url || SITE_URL,
        brand: {
            "@type": "Brand",
            name: SITE_NAME,
        },
        offers: {
            "@type": "Offer",
            priceCurrency: p.currency || "EUR",
            price: p.price || "0",
            availability:
                p.availability === "OutOfStock"
                    ? "https://schema.org/OutOfStock"
                    : p.availability === "PreOrder"
                    ? "https://schema.org/PreOrder"
                    : "https://schema.org/InStock",
            url: p.url || SITE_URL,
            seller: {
                "@type": "Organization",
                name: SITE_NAME,
            },
            shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: {
                    "@type": "MonetaryAmount",
                    value: "4.50",
                    currency: "EUR",
                },
                shippingDestination: {
                    "@type": "DefinedRegion",
                    addressCountry: "GR",
                },
                deliveryTime: {
                    "@type": "ShippingDeliveryTime",
                    handlingTime: {
                        "@type": "QuantitativeValue",
                        minValue: 0,
                        maxValue: 1,
                        unitCode: "DAY",
                    },
                    transitTime: {
                        "@type": "QuantitativeValue",
                        minValue: 2,
                        maxValue: 4,
                        unitCode: "DAY",
                    },
                },
            },
            hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                applicableCountry: "GR",
                returnPolicyCategory:
                    "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 14,
                returnMethod: "https://schema.org/ReturnByMail",
                returnFees: "https://schema.org/FreeReturn",
            },
        },
        ...(p.ratingValue && p.reviewCount
            ? {
                  aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: p.ratingValue,
                      reviewCount: p.reviewCount,
                      bestRating: "5",
                      worstRating: "1",
                  },
              }
            : {}),
    };
}

function buildBreadcrumb(items: BreadcrumbItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
        })),
    };
}

function buildFaq(faqs: FaqItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: f.answer,
            },
        })),
    };
}

export default function JsonLd({ type, product, breadcrumbs, faqs }: JsonLdProps) {
    let data: object | object[];

    switch (type) {
        case "website":
            data = buildWebsite();
            break;
        case "product":
            if (!product) return null;
            data = buildProduct(product);
            break;
        case "breadcrumb":
            if (!breadcrumbs || breadcrumbs.length === 0) return null;
            data = buildBreadcrumb(breadcrumbs);
            break;
        case "faq":
            if (!faqs || faqs.length === 0) return null;
            data = buildFaq(faqs);
            break;
        default:
            return null;
    }

    const schemas = Array.isArray(data) ? data : [data];

    return (
        <>
            {schemas.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </>
    );
}
