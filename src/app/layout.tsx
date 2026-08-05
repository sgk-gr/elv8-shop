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
        url: "https://elv8now.com",
        siteName: "ELV8 Energy Drink",
        title: "ELV8 Energy Drink | Ultimate Energy & Focus Drink",
        description:
            "Ανακαλύψτε το elv8 Energy Drink. Zero Sugar, 200mg Φυσική Καφεΐνη, Ηλεκτρολύτες & Βιταμίνες B-Complex για μέγιστη απόδοση.",
        images: [
            {
                url: "/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "elv8 Energy Drink",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@elv8energy",
        creator: "@elv8energy",
        title: "ELV8 Energy Drink | Ultimate Energy & Focus Drink",
        description:
            "Zero Sugar, 200mg Φυσική Καφεΐνη, Ηλεκτρολύτες & Βιταμίνες B-Complex για μέγιστη απόδοση.",
        images: ["/opengraph-image.png"],
    },
    alternates: {
        canonical: "https://elv8now.com",
        languages: {
            "el-GR": "https://elv8now.com",
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
        <html lang="el" className={`${inter.variable} ${outfit.variable} ${caveat.variable} ${oswald.variable}`} suppressHydrationWarning>
            <body className="font-body antialiased min-h-screen flex flex-col justify-between bg-white" suppressHydrationWarning>
                <Providers>
                    <JsonLd type="website" />
                    <ScrollRestoration />
                    <div className="flex flex-col min-h-screen justify-between">
                        <Header />
                        <CartDrawer />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                    <CookieBanner />
                    <BackToTopButton />
                </Providers>
            </body>
        </html>
    );
}
