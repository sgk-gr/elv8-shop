import type { Metadata } from "next";
import { Inter, Outfit, Caveat, Oswald } from "next/font/google";
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

const caveat = Caveat({
    subsets: ["latin"],
    variable: "--font-handwriting",
    display: "swap",
});

const oswald = Oswald({
    subsets: ["latin"],
    variable: "--font-oswald",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://elv8now.com"),
    title: {
        default: "ELV8 Energy Drink Greece | Premium Ενεργειακό Ποτό Χωρίς Ζάχαρη",
        template: "%s | ELV8 Energy",
    },
    description:
        "Ανακαλύψτε το κορυφαίο ελληνικό ενεργειακό ποτό ELV8 Energy. 0% ζάχαρη (Zero Sugar), με 200mg φυσική καφεΐνη, ηλεκτρολύτες, βιταμίνες & νοοτροπικά για μέγιστη απόδοση και εστίαση. Αγοράστε online στην Αθήνα & όλη την Ελλάδα!",
    keywords: [
        "ενεργειακο ποτο",
        "ενεργειακα ποτα",
        "καλυτερο ενεργειακο ποτο",
        "ενεργειακα ποτα χωρις ζαχαρη",
        "elv8 energy drink",
        "φυσικη καφεϊνη",
        "ηλεκτρολυτες",
        "νοοτροπικα",
        "ενεργειακα ποτα αθηνα",
        "elv8 ελλαδα",
        "energy drink greece",
        "sugar free energy drink",
        "focus drink",
        "αγορα ενεργειακων ποτων"
    ],
    authors: [{ name: "ELV8 Energy", url: "https://elv8now.com" }],
    creator: "SGK Software Development",
    publisher: "ELV8 Energy",
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
        url: "https://elv8now.com",
        siteName: "ELV8 Energy Drink",
        title: "ELV8 Energy Drink Greece | Premium Ενεργειακό Ποτό Χωρίς Ζάχαρη",
        description:
            "Ανακαλύψτε το κορυφαίο ελληνικό ενεργειακό ποτό ELV8 Energy. 0% ζάχαρη (Zero Sugar), με 200mg φυσική καφεΐνη, ηλεκτρολύτες, βιταμίνες & πνευματική διαύγεια.",
        images: [
            {
                url: "/opengraph-image.png",
                width: 1200,
                height: 675,
                alt: "ELV8 Energy Drink",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@elv8energy",
        creator: "@elv8energy",
        title: "ELV8 Energy Drink Greece | Premium Ενεργειακό Ποτό Χωρίς Ζάχαρη",
        description:
            "0% ζάχαρη, με 200mg φυσική καφεΐνη, ηλεκτρολύτες, βιταμίνες & πνευματική διαύγεια για μέγιστη απόδοση.",
        images: ["/opengraph-image.png"],
    },
    alternates: {
        canonical: "https://elv8now.com",
        languages: {
            "el-GR": "https://elv8now.com",
            "en-US": "https://elv8now.com/?lang=en",
        },
    },
    icons: {
        icon: [
            { url: "/favicon.svg", type: "image/svg+xml" }
        ],
        shortcut: "/favicon.svg",
        apple: "/favicon.svg",
    },
    category: "shopping",
};

import ComingSoonGuard from "@/components/ComingSoonGuard";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="el" className={`${inter.variable} ${outfit.variable} ${caveat.variable} ${oswald.variable}`} suppressHydrationWarning>
            <head>
                <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            </head>
            <body className="font-body antialiased min-h-screen bg-white" suppressHydrationWarning>
                <Providers>
                    <ComingSoonGuard>
                        <JsonLd type="website" />
                        <ScrollRestoration />
                        <Header />
                        <CartDrawer />
                        <div className="flex flex-col min-h-screen justify-between">
                            <main className="flex-1">{children}</main>
                            <Footer />
                        </div>
                        <CookieBanner />
                        <BackToTopButton />
                    </ComingSoonGuard>
                </Providers>
            </body>
        </html>
    );
}
