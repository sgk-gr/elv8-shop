"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Heart, Menu, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Our Flavors" },
  { href: "/about", label: "About Us" },
  { href: "/store-locator", label: "Store Locator" },
  { href: "/b2b-wholesale", label: "B2B Wholesale" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const [mounted, setMounted] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { favorites } = useFavorites();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    setCurrentHash(window.location.hash);
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    const handleHashChange = () => setCurrentHash(window.location.hash);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  const cleanPath = (pathname || "").replace(/\/$/, "") || "/";
  const isHomePage = cleanPath === "/";

  const isB2BActive = mounted && (cleanPath.startsWith("/b2b-wholesale") || cleanPath === "/b2b-wholesale");
  const isAboutActive = mounted && (cleanPath.startsWith("/about") || cleanPath === "/about");
  const isHomeActive = mounted && cleanPath === "/";
  const isProductsActive = mounted && cleanPath.startsWith("/products");
  const isStoreLocatorActive = mounted && (cleanPath.startsWith("/store-locator") || cleanPath === "/store-locator");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 py-3.5 px-4 md:px-8 transition-all duration-300 ${
          isHomePage && !isScrolled
            ? "bg-transparent border-b border-transparent"
            : "bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3 md:gap-10">
            {/* Mobile Hamburger Toggle Button (Mobile Only) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
              className="md:hidden p-2 rounded-full text-black hover:bg-black/10 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center group select-none">
              <Image
                src="/elv8_logo.svg"
                alt="ELV8 Logo"
                width={90}
                height={40}
                className="w-[72px] md:w-[90px] h-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className={`text-sm font-black transition-all relative pb-1 ${
                  isHomeActive ? "!text-[#FF1D8E]" : "text-slate-900 hover:text-[#FF1D8E]"
                }`}
              >
                Home
                {isHomeActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF1D8E] rounded-full" />
                )}
              </Link>
              <Link
                href="/products"
                className={`text-sm font-black transition-all relative pb-1 ${
                  isProductsActive ? "!text-[#FF1D8E]" : "text-slate-900 hover:text-[#FF1D8E]"
                }`}
              >
                Our Flavors
                {isProductsActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF1D8E] rounded-full" />
                )}
              </Link>
              <Link
                href="/about"
                className={`text-sm font-black transition-all relative pb-1 ${
                  isAboutActive ? "!text-[#FF1D8E]" : "text-slate-900 hover:text-[#FF1D8E]"
                }`}
              >
                About Us
                {isAboutActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF1D8E] rounded-full" />
                )}
              </Link>
              <Link
                href="/store-locator"
                className={`text-sm font-black transition-all relative pb-1 ${
                  isStoreLocatorActive ? "!text-[#FF1D8E]" : "text-slate-900 hover:text-[#FF1D8E]"
                }`}
              >
                Store Locator
                {isStoreLocatorActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF1D8E] rounded-full" />
                )}
              </Link>
              <Link
                href="/b2b-wholesale"
                className={`text-sm font-black transition-all relative pb-1 ${
                  isB2BActive ? "!text-[#FF1D8E]" : "text-slate-900 hover:text-[#FF1D8E]"
                }`}
              >
                B2B Wholesale
                {isB2BActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF1D8E] rounded-full" />
                )}
              </Link>
            </nav>
          </div>

          {/* Right: Actions (Favorites, Cart & User Icons) */}
          <div className="flex items-center gap-1 md:gap-3 text-black">
            {/* Favorites Icon Button */}
            <Link
              href="/favorites"
              aria-label="Favorites"
              className="relative p-2 rounded-full hover:bg-black/10 transition-colors"
            >
              <Heart className="w-6 h-6 text-black" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF1D8E] text-white font-black text-[10px] rounded-full flex items-center justify-center shadow-md">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Cart Icon Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="relative p-2 rounded-full hover:bg-black/10 transition-colors"
            >
              <ShoppingBag className="w-6 h-6 text-black" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white font-black text-[10px] rounded-full flex items-center justify-center shadow-md">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Icon Button */}
            <Link 
              href="/account" 
              aria-label="Account" 
              className="p-2 rounded-full hover:bg-black/10 transition-colors"
            >
              <User className="w-6 h-6 text-black" />
            </Link>
          </div>

        </div>
      </header>

      {/* Mobile Slide-Over Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
          />

          {/* Drawer Container (Pure White & Solid Black Accents) */}
          <div className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white text-black p-6 shadow-2xl flex flex-col justify-between z-50 animate-in slide-in-from-left duration-300 border-r border-slate-200">
            
            {/* Drawer Top Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center select-none"
                >
                  <Image
                    src="/elv8_logo.svg"
                    alt="ELV8 Logo"
                    width={72}
                    height={32}
                    className="w-[64px] h-auto object-contain"
                    priority
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close Mobile Menu"
                  className="p-2 rounded-full bg-slate-100 text-black hover:bg-slate-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links List */}
              <nav className="mt-8 flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl font-extrabold text-base transition-all ${
                        isActive
                          ? "bg-black text-white pl-5 shadow-md"
                          : "text-black hover:bg-slate-100"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full bg-black text-white py-4 rounded-full font-black text-base flex items-center justify-center gap-2 shadow-xl hover:bg-slate-900 transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-white" />
                <span>View Cart ({totalItems})</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
