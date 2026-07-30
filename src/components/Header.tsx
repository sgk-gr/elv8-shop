"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const { favorites } = useFavorites();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/products?category=packs-bundles", label: "Packs & Boxes" },
    { href: "/store-locator", label: "Store Locator" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md py-4 border-b border-slate-100 transition-all">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-[#0F382C] rounded-md flex items-center justify-center text-white font-black text-xs group-hover:rotate-6 transition-transform">
            elv
          </div>
          <span className="font-display font-extrabold text-2xl tracking-tight text-[#0F382C]">
            elv8
          </span>
        </Link>

        {/* Center: Pill Navigation Bar (matching RIDGED design) */}
        <nav className="hidden md:flex items-center bg-[#F3F3F3] p-1.5 rounded-full border border-slate-200/60 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-white text-[#0F382C] shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (Wishlist & Cart) */}
        <div className="flex items-center gap-3">
          <Link
            href="/favorites"
            aria-label="Wishlist"
            className="relative bg-[#F3F3F3] hover:bg-slate-200/80 p-3 rounded-full text-slate-800 transition-all shadow-sm flex items-center justify-center"
          >
            <Heart className="w-4 h-4 fill-slate-800 text-slate-800" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E2FB71] text-[#0F382C] font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {favorites.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-[#F3F3F3] hover:bg-slate-200/80 px-5 py-2.5 rounded-full flex items-center gap-2.5 text-xs md:text-sm font-bold text-[#0F382C] transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart({totalItems})</span>
          </button>
        </div>

      </div>
    </header>
  );
}
