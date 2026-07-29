import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/index.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CookieBanner from "@/components/CookieBanner";
import BackToTopButton from "@/components/BackToTopButton";
import ScrollRestoration from "@/components/ScrollRestoration";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
    subsets: ["latin", "greek"],
    variable: "--font-body",
    display: "swap",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-display",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://elv8now.com"),
    title: {
        default: "elv8 Energy Drink | Ultimate Energy & Focus Drink",
        template: "%s | elv8 Energy",
    },
    description:
        "Ανακαλύψτε το elv8 Energy Drink. Zero Sugar, 200mg Φυσική Καφεΐνη, Ηλεκτρολύτες & Βιταμίνες B-Complex για μέγιστη απόδοση και εστίαση.",
    authors: [{ name: "elv8 Energy", url: "https://elv8now.com" }],

    creator: "SGK Software Development",
    publisher: "elv8 Energy",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "el_GR",
        url: "https://www.vaiacharms.gr",
        siteName: "Vaia Charms",
        title: "Vaia Charms | Κοσμήματα, Cosmetics & Αξεσουάρ",
        description:
            "Η κορυφαία επιλογή σας για ποιοτικά κοσμήματα, cosmetics και αξεσουάρ. Δωρεάν αποστολή άνω των 65€.",
        images: [
            {
                url: "/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "Vaia Charms - Κοσμήματα & Αξεσουάρ",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@vaiacharms",
        creator: "@vaiacharms",
        title: "Vaia Charms | Κοσμήματα, Cosmetics & Αξεσουάρ",
        description:
            "Η κορυφαία επιλογή σας για ποιοτικά κοσμήματα και αξεσουάρ. Ανακαλύψτε τη συλλογή μας σήμερα.",
        images: ["/opengraph-image.png"],
    },
    alternates: {
        canonical: "https://www.vaiacharms.gr",
        languages: {
            "el-GR": "https://www.vaiacharms.gr",
        },
    },
    icons: {
        icon: [
            { url: "/favicon.png", type: "image/png" },
            { url: "/favicon.ico", type: "image/x-icon" }
        ],
        shortcut: "/favicon.ico",
        apple: "/favicon.png",
    },
    category: "shopping",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="el" className={`${inter.variable} ${outfit.variable}`}>
            <body className="font-body antialiased">
                <Providers>
                    <JsonLd type="website" />
                    <ScrollRestoration />
                    <Header />
                    <CartDrawer />
                    <main>{children}</main>
                    <Footer />
                    <CookieBanner />
                    <BackToTopButton />
                </Providers>
            </body>
        </html>
    );
}
