import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
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
    variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-cormorant",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://www.vaiacharms.gr"),
    title: {
        default: "Vaia Charms | Κοσμήματα, Cosmetics & Αξεσουάρ στην Ελλάδα",
        template: "%s | Vaia Charms",
    },
    description:
        "Η κορυφαία επιλογή σας για ποιοτικά κοσμήματα, cosmetics και αξεσουάρ. Ανακαλύψτε χειροποίητα κοσμήματα, ατσάλινα βραχιόλια, ασημένια σκουλαρίκια, ρολόγια CLUSE και πολλά άλλα. Δωρεάν αποστολή άνω των 65€.",
    authors: [{ name: "Vaia Charms", url: "https://www.vaiacharms.gr" }],

    creator: "Vaia Charms",
    publisher: "Vaia Charms",
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
    category: "shopping",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="el" className={`${inter.variable} ${cormorant.variable}`}>
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
