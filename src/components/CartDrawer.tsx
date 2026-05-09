"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter, usePathname } from "next/navigation";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  const goToProduct = (productId: number) => {
    setIsCartOpen(false);
    router.push(`/product/${productId}/?backUrl=${encodeURIComponent(pathname)}`);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-slate-100 border-l shadow-2xl">
        <div className="p-6 md:p-8 border-b bg-slate-200/50">
          <SheetHeader>
            <SheetTitle className="font-display text-3xl font-bold tracking-tight">
              Το Καλάθι μου
            </SheetTitle>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-body text-sm font-medium italic">Το καλάθι σας είναι άδειο</p>
              <Button
                className="rounded-full px-8 bg-[#C4196D] hover:bg-[#43334C] text-white border-none"
                onClick={() => setIsCartOpen(false)}
              >
                Πάμε για Ψώνια
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => {
                const image = item.product.images?.[0];
                const itemKey = `${item.product.id}-${item.variationId || 0}`;
                return (
                  <div key={itemKey} className="flex gap-6 animate-in slide-in-from-right-4 duration-500">
                    {/* Clickable image */}
                    <button
                      onClick={() => goToProduct(item.product.id)}
                      className="w-24 h-32 bg-secondary rounded-2xl flex-shrink-0 overflow-hidden shadow-sm hover:opacity-80 transition-opacity cursor-pointer"
                      aria-label={`Δες το προϊόν: ${item.product.name}`}
                    >
                      {image && (
                        <img src={image.src} alt={image.alt || item.product.name} className="w-full h-full object-cover" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <button
                            onClick={() => goToProduct(item.product.id)}
                            className="font-display text-base font-bold leading-tight line-clamp-2 text-left hover:text-primary transition-colors"
                            dangerouslySetInnerHTML={{ __html: item.product.name }}
                          />
                          <button
                            onClick={() => removeItem(item.product.id, item.variationId, item.selectedAttributes)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {Object.entries(item.selectedAttributes).map(([name, value]) => (
                              <span key={name} className="text-[9px] font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full uppercase tracking-wider">
                                {value}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center bg-secondary/50 rounded-full p-1 border">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variationId, item.selectedAttributes)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-background rounded-full transition-all"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-body text-xs font-bold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variationId, item.selectedAttributes)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-background rounded-full transition-all"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-display text-lg font-bold">{item.product.price}€</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 md:p-8 bg-slate-200 border-t space-y-6">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Μερικό Σύνολο</span>
                <p className="text-muted-foreground text-[10px]">Φόροι και μεταφορικά υπολογίζονται στο ταμείο</p>
              </div>
              <span className="font-display text-3xl font-bold">{totalPrice.toFixed(2)}€</span>
            </div>
            <Button
              className="w-full h-14 font-body text-sm font-bold uppercase tracking-widest rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] hover:bg-[#C4196D] hover:text-white transition-all"
              onClick={() => { setIsCartOpen(false); router.push("/checkout"); }}
            >
              Ολοκλήρωση Αγορών
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
