"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CartItem, WooProduct } from "@/types/product";

interface CartContextType {
  items: CartItem[];
  addItem: (product: WooProduct, quantity?: number, variationId?: number, selectedAttributes?: Record<string, string>, price?: string) => void;
  removeItem: (productId: number, variationId?: number, selectedAttributes?: Record<string, string>) => void;
  updateQuantity: (productId: number, quantity: number, variationId?: number, selectedAttributes?: Record<string, string>) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addItem = useCallback((
    product: WooProduct,
    quantity = 1,
    variationId?: number,
    selectedAttributes?: Record<string, string>,
    price?: string
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => {
        const sameProduct = i.product.id === product.id;
        const sameVariation = i.variationId === variationId;
        
        // If no variationId, we MUST compare attributes
        // If variationId is present but attributes differ (rare for WC but possible in some setups), compare them too
        const sameAttributes = JSON.stringify(i.selectedAttributes || {}) === JSON.stringify(selectedAttributes || {});
        
        return sameProduct && sameVariation && sameAttributes;
      });

      if (existingIndex > -1) {
        const newItems = [...prev];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity,
        };
        return newItems;
      }

      const itemProduct = price ? { ...product, price } : product;
      return [...prev, { product: itemProduct, quantity, variationId, selectedAttributes }];
    });
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((productId: number, variationId?: number, selectedAttributes?: Record<string, string>) => {
    setItems((prev) => prev.filter((i) => {
      const sameProduct = i.product.id === productId;
      const sameVariation = i.variationId === variationId;
      const sameAttributes = !selectedAttributes || JSON.stringify(i.selectedAttributes || {}) === JSON.stringify(selectedAttributes || {});
      return !(sameProduct && sameVariation && sameAttributes);
    }));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number, variationId?: number, selectedAttributes?: Record<string, string>) => {
    if (quantity <= 0) {
      removeItem(productId, variationId, selectedAttributes);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        const sameProduct = i.product.id === productId;
        const sameVariation = i.variationId === variationId;
        const sameAttributes = !selectedAttributes || JSON.stringify(i.selectedAttributes || {}) === JSON.stringify(selectedAttributes || {});
        
        return (sameProduct && sameVariation && sameAttributes) ? { ...i, quantity } : i;
      })
    );
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + parseFloat(i.product.price || "0") * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items, addItem, removeItem, updateQuantity, clearCart,
        totalItems, totalPrice, isCartOpen, setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
