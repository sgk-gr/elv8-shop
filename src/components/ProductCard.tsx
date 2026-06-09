"use client";

import Link from "next/link";
import Image from "next/image";
import { WooProduct } from "@/types/product";
import { Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

import { usePathname, useSearchParams } from "next/navigation";

interface ProductCardProps {
  product: WooProduct;
  backUrl?: string;
}

export default function ProductCard({ product, backUrl }: ProductCardProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const image = product.images?.[0];
  const hasDiscount = product.on_sale && product.regular_price;
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  // Determine the backUrl: use the prop if provided, otherwise the current URL
  const currentPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
  const effectiveBackUrl = backUrl || currentPath;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <Link href={`/product/${product.id}/?backUrl=${encodeURIComponent(effectiveBackUrl)}`} className="group block h-full">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary mb-4 shadow-sm group-hover:shadow-soft transition-all duration-500">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body text-xs">
            Χωρίς εικόνα
          </div>
        )}

        {product.on_sale && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-destructive text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg">
              ΕΚΠΤΩΣΕΙΣ
            </span>
          </div>
        )}

        {/* Favorite Button */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleFavoriteClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleFavorite(product);
            }
          }}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all hover:scale-110 shadow-lg cursor-pointer"
          aria-label={favorite ? "Αφαίρεση από αγαπημένα" : "Προσθήκη στα αγαπημένα"}
        >
          <Heart
            className={`w-5 h-5 transition-all ${favorite
              ? "fill-red-500 text-red-500"
              : "text-gray-600 hover:text-red-500"
              }`}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      <div className="space-y-1">
        <h3
          className="font-display text-lg font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2"
          dangerouslySetInnerHTML={{ __html: product.name }}
        />
        <div className="flex items-center gap-2">
          <span className="font-body text-base font-medium">
            {product.price}€
          </span>
          {hasDiscount && (
            <span className="font-body text-sm text-muted-foreground line-through opacity-70">
              {product.regular_price}€
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
