"use client";

import Link from "next/link";
import Image from "next/image";
import { WooProduct } from "@/types/product";
import { Heart, ShoppingBag } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductCardProps {
  product: WooProduct;
  backUrl?: string;
}

export default function ProductCard({ product, backUrl }: ProductCardProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const image = product.images?.[0];
  const hasDiscount = product.on_sale && product.regular_price;
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addItem, setIsCartOpen } = useCart();
  const favorite = isFavorite(product.id);

  useEffect(() => {
    setSearchQuery(window.location.search);
  }, []);

  // Determine the backUrl without triggering Next.js Suspense boundary during SSR
  const currentPath = pathname + searchQuery;
  const effectiveBackUrl = backUrl || currentPath;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setIsCartOpen(true);
  };

  const isNew = true; // Highlight / badge state

  return (
    <div className="relative group block h-full pt-2 pb-6">
      {/* Main Card */}
      <Link href={`/product/${product.id}/?backUrl=${encodeURIComponent(effectiveBackUrl)}`}>
        <div className={`relative rounded-3xl p-6 transition-all duration-500 flex flex-col items-center justify-between h-full min-h-[420px] text-center border ${
          product.id % 2 === 0
            ? "bg-gradient-to-b from-[#22C55E]/90 to-[#15803D] text-white border-green-500 shadow-lg shadow-green-900/20"
            : "bg-white text-slate-900 border-slate-100 shadow-sm hover:shadow-md"
        }`}>

          {/* Top Left "NEW" Badge */}
          {isNew && (
            <div className="absolute top-4 left-0 z-20">
              <span className="bg-black text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-r-full shadow-sm">
                NEW
              </span>
            </div>
          )}

          {/* Top Right Favorites Heart Button */}
          <button
            onClick={handleFavoriteClick}
            aria-label="Add to favorites"
            className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
              product.id % 2 === 0
                ? "bg-white/20 text-white hover:bg-white hover:text-red-500"
                : "bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${favorite ? "fill-red-500 text-red-500" : ""}`} />
          </button>

          {/* Product Image Area */}
          <div className="relative w-full h-64 my-2 flex items-center justify-center">
            {/* Product Image */}
            {image ? (
              <Image
                src={image.src}
                alt={image.alt || product.name}
                fill
                sizes="(max-width: 768px) 100vw, 280px"
                className="object-contain px-4 group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 font-body text-xs">
                No Image
              </div>
            )}
          </div>

          {/* Product Info & Action Row */}
          <div className="w-full space-y-1 mt-auto pb-1 relative">
            <h3
              className={`font-display text-base font-bold leading-tight line-clamp-2 min-h-[2.5rem] flex items-center justify-center px-2 ${
                product.id % 2 === 0 ? "text-white" : "text-slate-900"
              }`}
              dangerouslySetInnerHTML={{ __html: product.name }}
            />

            <div className="flex items-center justify-between pt-2 px-1">
              <div className="flex items-baseline gap-1.5">
                {hasDiscount && (
                  <span className={`text-xs line-through ${
                    product.id % 2 === 0 ? "text-white/70" : "text-slate-400"
                  }`}>
                    €{product.regular_price}
                  </span>
                )}
                <span className={`font-display font-black text-lg ${
                  product.id % 2 === 0 ? "text-white" : "text-slate-900"
                }`}>
                  €{product.price}
                </span>
              </div>

              {/* Shopping Bag Button inside card */}
              <button
                onClick={handleAddToCart}
                aria-label="Add to cart"
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all duration-300 ${
                  product.id % 2 === 0
                    ? "bg-white text-slate-900 hover:bg-slate-100"
                    : "bg-black text-white hover:bg-[#FF1D8E]"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </Link>
    </div>
  );
}
