"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { WooProduct } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

interface FavoritesContextType {
    favorites: WooProduct[];
    addToFavorites: (product: WooProduct) => void;
    removeFromFavorites: (productId: number) => void;
    isFavorite: (productId: number) => boolean;
    toggleFavorite: (product: WooProduct) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<WooProduct[]>([]);
    const { toast } = useToast();

    // Load favorites from localStorage on mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (error) {
                console.error("Error loading favorites:", error);
            }
        }
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (product: WooProduct) => {
        setFavorites((prev) => {
            if (prev.some((item) => item.id === product.id)) {
                return prev;
            }
            return [...prev, product];
        });
        // Toast must be called outside the setState updater (not during render)
        if (!favorites.some((item) => item.id === product.id)) {
            toast({
                title: "Προστέθηκε στα αγαπημένα",
                description: `${product.name} προστέθηκε στη λίστα αγαπημένων σας`,
            });
        }
    };

    const removeFromFavorites = (productId: number) => {
        const product = favorites.find((item) => item.id === productId);
        setFavorites((prev) => prev.filter((item) => item.id !== productId));
        // Toast must be called outside the setState updater (not during render)
        if (product) {
            toast({
                title: "Αφαιρέθηκε από τα αγαπημένα",
                description: `${product.name} αφαιρέθηκε από τη λίστα αγαπημένων σας`,
            });
        }
    };

    const isFavorite = (productId: number) => {
        return favorites.some((item) => item.id === productId);
    };

    const toggleFavorite = (product: WooProduct) => {
        if (isFavorite(product.id)) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                isFavorite,
                toggleFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}
