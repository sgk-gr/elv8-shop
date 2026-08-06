"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProduct, getProductVariations, getProductReviews, createProductReview } from "@/lib/woocommerce";
import { WooProduct, WooVariation } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Minus, Plus, Star, MessageSquare, X, Check, Send } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useTranslation } from "@/context/LanguageContext";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ProductDetailClient({ id }: { id: string }) {
    const { addItem, setIsCartOpen } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const backUrlParam = searchParams.get("backUrl");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
    const [variationsInitialized, setVariationsInitialized] = useState(false);

    // Review form state
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [reviewSubmittedSuccess, setReviewSubmittedSuccess] = useState(false);

    const submitReviewMutation = useMutation({
        mutationFn: createProductReview,
        onSuccess: (newReview) => {
            queryClient.setQueryData(["product-reviews", id], (old: any[] = []) => [newReview, ...old]);
            setReviewText("");
            setReviewRating(5);
            setReviewSubmittedSuccess(true);
            setTimeout(() => setReviewSubmittedSuccess(false), 4000);
        },
    });

    const { data: product, isLoading: isLoadingProduct } = useQuery<WooProduct>({
        queryKey: ["product", id],
        queryFn: () => getProduct(Number(id)),
        enabled: !!id,
    });

    const { data: variations } = useQuery<WooVariation[]>({
        queryKey: ["product-variations", id],
        queryFn: () => getProductVariations(Number(id)),
        enabled: !!product && product.type === "variable",
    });

    const { data: reviews } = useQuery<any[]>({
        queryKey: ["product-reviews", id],
        queryFn: () => getProductReviews(Number(id)),
        enabled: !!id,
    });

    // Reset variation state when product changes
    useEffect(() => {
        setVariationsInitialized(false);
        setSelectedAttributes({});
    }, [id]);

    // Custom defaults for simple products with manual color selectors (204, 211)
    useEffect(() => {
        if (!product) return;
        if (product.type === "simple") {
            if (product.id === 204) {
                setSelectedAttributes({ "Χρώμα": "Ανοιχτό Πράσινο" });
            } else if (product.id === 211) {
                setSelectedAttributes({ "Χρώμα": "Χρυσό" });
            }
        }
    }, [product]);

    // After variations load, auto-select the first variation's attributes
    useEffect(() => {
        if (!variations || variations.length === 0 || variationsInitialized) return;
        const normalize = (s: string) => String(s || "").toLowerCase().normalize("NFC").replace(/-/g, " ").replace(/\s+\d+$/, "").trim();
        const firstVariation = variations[0];
        if (firstVariation && firstVariation.attributes && firstVariation.attributes.length > 0) {
            const initialAttrs: Record<string, string> = {};
            firstVariation.attributes.forEach((attr) => {
                if (attr.name && attr.option) {
                    // Try to find the matching option in product.attributes to use the "clean" name
                    const productAttr = product?.attributes?.find(pa => pa.name === attr.name);
                    const cleanOption = productAttr?.options?.find(opt => normalize(opt) === normalize(attr.option)) || attr.option;
                    initialAttrs[attr.name] = cleanOption;
                }
            });
            setSelectedAttributes(initialAttrs);
            setVariationsInitialized(true);
        }
    }, [variations, variationsInitialized]);

    const selectedVariation = useMemo(() => {
        if (!variations || !product || product.type !== "variable") return null;
        if (Object.keys(selectedAttributes).length === 0) return null;

        return variations.find((variation) => {
            return Object.entries(selectedAttributes).every(([name, option]) => {
                return variation.attributes.some((attr) => {
                    // Compare names case-insensitively, handle URL-encoded slugs
                    const normalize = (s: string) => String(s || "").toLowerCase().normalize("NFC").replace(/-/g, " ").replace(/\s+\d+$/, "").trim();
                    const attrNameMatch =
                        attr.name?.toLowerCase() === name?.toLowerCase() ||
                        decodeURIComponent(attr.slug || "").toLowerCase() === name?.toLowerCase();
                    const attrOptionMatch =
                        attr.option === option ||
                        attr.option === "" ||
                        normalize(attr.option) === normalize(option);
                    return attrNameMatch && attrOptionMatch;
                });
            });
        }) ?? null;
    }, [variations, selectedAttributes, product]);

    if (isLoadingProduct) {
        return (
            <main className="container mx-auto px-4 md:px-8 py-8 md:py-16">
                <div className="grid md:grid-cols-2 gap-8 md:gap-16 animate-pulse">
                    <div className="aspect-[3/4] bg-secondary rounded-3xl" />
                    <div className="space-y-4">
                        <div className="h-10 bg-secondary rounded-full w-3/4" />
                        <div className="h-6 bg-secondary rounded-full w-1/4" />
                        <div className="h-32 bg-secondary rounded-3xl w-full mt-8" />
                    </div>
                </div>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="container mx-auto px-4 md:px-8 py-20 text-center">
                <p className="text-muted-foreground font-body">Το προϊόν δεν βρέθηκε</p>
            </main>
        );
    }

    const currentPrice = selectedVariation ? selectedVariation.price : product.price;
    const currentRegularPrice = selectedVariation ? selectedVariation.regular_price : product.regular_price;
    const isOnSale = selectedVariation ? selectedVariation.on_sale : product.on_sale;
    const stockStatus = selectedVariation ? selectedVariation.stock_status : product.stock_status;
    const stockQuantity = selectedVariation ? selectedVariation.stock_quantity : product.stock_quantity;
    const hasDiscount = isOnSale && currentRegularPrice;

    const handleAddToCart = () => {
        if (product.type === "variable" && variations && variations.length > 0 && !selectedVariation) {
            return;
        }

        // Use variation image if available for the cart item
        let productToCart = { ...product };
        if (selectedVariation && selectedVariation.image) {
            productToCart.images = [
                selectedVariation.image,
                ...product.images.filter(img => img.id !== selectedVariation.image?.id)
            ];
        }

        addItem(productToCart, quantity, selectedVariation?.id, selectedAttributes, currentPrice);
    };

    // Calculate the return URL based on product category
    const getBackUrl = () => {
        if (!product) return "/products";
        
        // General mapping for other categories using dynamic products page
        const categoryIds = product.categories.map(c => c.id);
        
        // Prioritize Silver 925 (107)
        if (categoryIds.includes(107)) return "/products?category=107";
        
        if (categoryIds.includes(65)) return "/products?category=65";
        if (categoryIds.includes(71)) return "/products?category=71";
        if (categoryIds.includes(74)) return "/products?category=74";
        if (categoryIds.includes(24)) return "/products?category=24";
        if (categoryIds.includes(23)) return "/products?category=23";
        if (categoryIds.includes(21)) return "/products?category=21";
        if (categoryIds.includes(99)) return "/products?category=99";
        if (categoryIds.includes(27) || categoryIds.includes(95)) return "/products?category=27";
        if (categoryIds.includes(93)) return "/products?category=93";
        if (categoryIds.includes(96) || categoryIds.includes(77)) return "/products?category=77";
        if (categoryIds.includes(97)) return "/products?category=97";
        if (categoryIds.includes(98)) return "/products?category=98";
        if (categoryIds.includes(30)) return "/products?category=30";
        if (categoryIds.includes(121)) return "/products?category=121";
        if (categoryIds.includes(112)) return "/products?category=112";
        if (categoryIds.includes(31)) return "/products?category=31";
        
        // Final fallback: Use the first category of the product if available
        if (product.categories && product.categories.length > 0) {
            return `/products?category=${product.categories[0].id}`;
        }
        
        return "/products";
    };

    // If a backUrl was passed as a query param (e.g. from the home page carousels), use it directly.
    // Otherwise fall back to the computed category-based URL.
    const backUrl = backUrlParam ? decodeURIComponent(backUrlParam) : getBackUrl();

    return (
        <main className="container mx-auto px-4 md:px-8 pt-28 pb-8 md:pt-36 md:pb-12">
            <Link
                href={backUrl}
                className="inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-12 group"
            >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {t("product.back")}
            </Link>

            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
                {/* Images */}
                <div className="space-y-6 lg:max-w-2xl mx-auto">
                    {/* Desktop: Thumbnails on left, Main image on right */}
                    <div className="hidden md:flex gap-4">
                        {/* Thumbnails - Vertical on Desktop */}
                        {product.images.length > 1 && (
                            <div className="flex flex-col gap-3 w-20">
                                {product.images.map((img, i) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setSelectedImage(i)}
                                        className={`aspect-square overflow-hidden rounded-xl bg-secondary border-2 transition-all duration-300 hover:scale-105 ${i === selectedImage
                                            ? "border-primary shadow-lg ring-2 ring-primary/20"
                                            : "border-transparent opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Main Image */}
                        <div className="flex-1 aspect-[4/5] flex items-center justify-center overflow-hidden rounded-[2.5rem] bg-secondary/50 shadow-soft animate-in zoom-in duration-700 p-6">
                            {product.images[selectedImage] && (
                                <img
                                    src={product.images[selectedImage].src}
                                    alt={product.images[selectedImage].alt || product.name}
                                    className="max-h-full w-full object-contain hover:scale-105 transition-transform duration-1000 cursor-zoom-in"
                                    onClick={() => setIsLightboxOpen(true)}
                                />
                            )}
                        </div>
                    </div>

                    {/* Mobile: Main image on top, thumbnails below */}
                    <div className="md:hidden space-y-4">
                        {/* Main Image */}
                        <div className="aspect-[4/5] flex items-center justify-center overflow-hidden rounded-[2.5rem] bg-secondary/50 shadow-soft animate-in zoom-in duration-700 p-4 min-h-[400px]">
                            {product.images[selectedImage] && (
                                <img
                                    src={product.images[selectedImage].src}
                                    alt={product.images[selectedImage].alt || product.name}
                                    className="max-h-[500px] w-full object-contain hover:scale-105 transition-transform duration-1000 cursor-zoom-in"
                                    onClick={() => setIsLightboxOpen(true)}
                                />
                            )}
                        </div>

                        {/* Thumbnails - Horizontal scroll on Mobile */}
                        {product.images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 px-2 scrollbar-hide">
                                {product.images.map((img, i) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setSelectedImage(i)}
                                        className={`flex-shrink-0 w-16 h-16 overflow-hidden rounded-xl bg-secondary border-2 transition-all duration-300 ${i === selectedImage
                                            ? "border-primary shadow-lg ring-2 ring-primary/20"
                                            : "border-transparent opacity-60"
                                            }`}
                                    >
                                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="flex flex-col space-y-8 animate-in slide-in-from-right-8 duration-700">
                    <div className="space-y-4">
                        <div className="flex items-center justify-start gap-8 md:gap-16 lg:flex-nowrap flex-wrap">
                            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight" dangerouslySetInnerHTML={{ __html: product.name }} />
                            {(product.name?.toLowerCase().includes("wine") || 
                              product.name?.toLowerCase().includes("wish") || 
                              product.name?.toLowerCase().includes("vintage") || 
                              product.name?.toLowerCase().includes("sweet kiss") || 
                              product.name?.toLowerCase().includes("secret") || 
                              product.name?.toLowerCase().includes("red sin") || 
                              product.name?.toLowerCase().includes("purple rock") || 
                              product.name?.toLowerCase().includes("pink dream")) && (
                                <img src="/wine-colors.png" alt="Product color swatches" className="h-32 md:h-48 w-auto rounded-2xl shadow-md" />
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="font-body text-2xl font-bold text-primary">
                                {currentPrice}€
                            </span>
                            {hasDiscount && (
                                <span className="font-body text-lg text-muted-foreground line-through opacity-60">
                                    {currentRegularPrice}€
                                </span>
                            )}
                        </div>

                        {product.short_description && (
                            <div
                                className="font-body text-sm text-slate-500 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: product.short_description }}
                            />
                        )}

                        <div className="flex flex-col gap-2 pt-1">
                            {(selectedVariation?.sku || product.sku) && (
                                <div className="flex items-center gap-2">
                                    <span className="font-body text-[10px] font-bold uppercase tracking-widest text-muted-foreground">SKU:</span>
                                    <span className="font-body text-xs font-bold text-slate-600">{selectedVariation?.sku || product.sku}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${stockStatus === 'instock' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500'}`} />
                                <span className={`font-body text-xs font-bold ${stockStatus === 'instock' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {stockStatus === 'instock' ? 'In Stock' : 'Out of Stock'}
                                    {stockStatus === 'instock' && stockQuantity !== null && stockQuantity > 0 && (
                                        <span className="ml-1.5 opacity-70">({stockQuantity} available)</span>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Variations & Custom Selectors */}
                    {(product.type === "variable" || product.id === 204 || product.id === 211) && (
                        <div className="space-y-6">
                            {/* Standard Variations Dropdowns (for other attributes or default) */}
                            {product.type === "variable" && product.attributes && (
                                <div className="grid sm:grid-cols-2 gap-6 p-6 bg-slate-50/30 rounded-[2rem] border border-slate-100 shadow-sm">
                                    {product.attributes.map((attr) => (
                                        attr.variation && (
                                            <div key={attr.id} className="space-y-2.5 col-span-full">
                                                <label className="font-body text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground ml-1">
                                                    {attr.name === "Χρώμα" ? "Choose option" : attr.name}
                                                </label>
                                                {attr.name === "Χρώμα" ? (
                                                    <div className="flex flex-wrap gap-3 mt-1">
                                                        {attr.options.map((option) => {
                                                            const normalize = (s: string) => String(s || "").toLowerCase().normalize("NFC").replace(/-/g, " ").replace(/\s+\d+$/, "").trim();
                                                            const isSelected = normalize(selectedAttributes[attr.name]) === normalize(option);
                                                            return (
                                                                <button
                                                                    key={option}
                                                                    onClick={() => setSelectedAttributes(prev => ({ ...prev, [attr.name]: option }))}
                                                                    className={`px-6 py-2.5 rounded-full font-body text-xs font-bold transition-all duration-300 border-2 ${
                                                                        isSelected 
                                                                        ? "bg-[#FF1D8E] border-[#FF1D8E] text-white shadow-lg scale-105" 
                                                                        : "bg-white border-slate-200 text-slate-600 hover:border-[#FF1D8E]/30 hover:bg-slate-50"
                                                                    }`}
                                                                >
                                                                    {option}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <Select
                                                        value={selectedAttributes[attr.name]}
                                                        onValueChange={(val) => setSelectedAttributes(prev => ({ ...prev, [attr.name]: val }))}
                                                    >
                                                        <SelectTrigger className="w-full h-12 rounded-2xl bg-white border-slate-200 focus:ring-primary/20 font-body text-sm font-semibold">
                                                            <SelectValue placeholder={`Select ${attr.name}`} />
                                                        </SelectTrigger>
                                                        <SelectContent className="rounded-2xl shadow-xl border-slate-100">
                                                            {attr.options.map((option) => (
                                                                <SelectItem key={option} value={option} className="rounded-xl font-body py-2.5">
                                                                    {option}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="space-y-6 pt-4">
                        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                            <div className="flex items-center bg-secondary/50 rounded-2xl p-1 h-14 border border-secondary">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-full flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-10 flex items-center justify-center font-display font-bold text-lg">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-full flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <Button
                                onClick={handleAddToCart}
                                className="flex-1 h-14 font-body text-xs font-bold uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 bg-[#FF1D8E] text-white hover:bg-[#d80f74] hover:scale-[1.02] active:scale-[0.98] transition-all"
                                disabled={stockStatus === "outofstock" || (product.type === "variable" && variations && variations.length > 0 && !selectedVariation)}
                            >
                                {stockStatus === "outofstock" ? t("product.out_of_stock") : t("product.add_to_cart")}
                            </Button>
                        </div>
                    </div>

                    {/* ELV8 Product Bundle / Frequently Bought Together Section */}
                    {product.bundle_data && product.bundle_data.items && product.bundle_data.items.length > 0 && (
                      <div className="my-5 bg-gradient-to-r from-pink-50/70 via-white to-yellow-50/50 border border-pink-200/70 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-base sm:text-lg font-black font-display text-slate-900">
                            {product.bundle_data.title || "Frequently Bought Together"}
                          </h3>
                          <span className="text-[9px] font-black uppercase tracking-wider text-[#FF1D8E] bg-pink-100/90 px-2.5 py-0.5 rounded-full shrink-0">
                            BUNDLE -{product.bundle_data.discount}%
                          </span>
                        </div>

                        {/* Items Compact Row */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          {/* Current Main Product */}
                          <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                            <div className="w-8 h-8 relative shrink-0">
                              <img
                                src={product.images[0]?.src || "/elv8-can-clean.png"}
                                alt={product.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="text-left leading-tight">
                              <span className="block font-bold text-[11px] text-slate-800 max-w-[100px] sm:max-w-[120px] truncate">{product.name}</span>
                              <span className="text-[11px] font-black text-[#FF1D8E]">€{parseFloat(product.price).toFixed(2)}</span>
                            </div>
                          </div>

                          {/* Plus Icon */}
                          <span className="text-sm font-black text-[#FF1D8E]">+</span>

                          {/* Bundled Products */}
                          {product.bundle_data.items.map((bItem, idx) => (
                            <React.Fragment key={bItem.id}>
                              <Link
                                href={`/product/${bItem.id}`}
                                className="flex items-center gap-2 bg-white hover:bg-pink-50/50 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-[#FF1D8E]/40 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                              >
                                <div className="w-8 h-8 relative shrink-0">
                                  <img
                                    src={bItem.image || "/elv8-can-clean.png"}
                                    alt={bItem.name}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                                  />
                                </div>
                                <div className="text-left leading-tight">
                                  <span className="block font-bold text-[11px] text-slate-800 group-hover:text-[#FF1D8E] transition-colors max-w-[100px] sm:max-w-[120px] truncate">{bItem.name}</span>
                                  <span className="text-[11px] font-black text-[#FF1D8E]">€{bItem.price.toFixed(2)}</span>
                                </div>
                              </Link>
                              {idx < product.bundle_data!.items.length - 1 && (
                                <span className="text-sm font-black text-[#FF1D8E]">+</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>

                        {/* Bundle Price & Add All Button */}
                        {(() => {
                          const mainPrice = parseFloat(product.price) || 0;
                          const bundledPriceSum = product.bundle_data.items.reduce((sum, item) => sum + item.price, 0);
                          const totalPrice = mainPrice + bundledPriceSum;
                          const discountPercent = product.bundle_data.discount / 100;
                          const finalBundlePrice = totalPrice * (1 - discountPercent);

                          return (
                            <div className="pt-2.5 border-t border-pink-100 flex items-center justify-between gap-3">
                              <div className="text-left leading-none">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Bundle Price:</span>
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-lg font-black text-slate-900 font-display">€{finalBundlePrice.toFixed(2)}</span>
                                  <span className="text-xs font-medium text-slate-400 line-through">€{totalPrice.toFixed(2)}</span>
                                </div>
                              </div>

                              <button
                                onClick={() => {
                                  // Add main product
                                  addItem(product, quantity);
                                  // Add bundled products
                                  product.bundle_data?.items.forEach((bItem) => {
                                    addItem({
                                      id: bItem.id,
                                      name: bItem.name,
                                      slug: "",
                                      description: "",
                                      short_description: "",
                                      type: "simple",
                                      price: bItem.price.toString(),
                                      regular_price: bItem.price.toString(),
                                      sale_price: "",
                                      on_sale: false,
                                      images: [{ id: 1, src: bItem.image, alt: bItem.name }],
                                      categories: [],
                                      sku: "",
                                      attributes: [],
                                      variations: [],
                                      stock_status: "instock",
                                      stock_quantity: 100,
                                      average_rating: "5.0",
                                    }, 1);
                                  });
                                  setIsCartOpen(true);
                                }}
                                className="px-4 py-2.5 bg-[#FF1D8E] hover:bg-[#d80f74] text-white rounded-full font-black text-[11px] uppercase tracking-wider transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                              >
                                <span>Add Bundle</span>
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {/* Description & Reviews Tabs */}
                    <div className="pt-10">
                        <Tabs defaultValue="description" className="w-full">
                            <TabsList className="bg-slate-50 p-1 rounded-2xl border border-slate-100 w-full sm:w-auto h-auto flex flex-wrap">
                                <TabsTrigger value="description" className="rounded-xl font-body text-xs font-bold uppercase px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                    {t("product.description")}
                                </TabsTrigger>
                                <TabsTrigger value="nutritional" className="rounded-xl font-body text-xs font-bold uppercase px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                    {t("product.nutritional")}
                                </TabsTrigger>
                                <TabsTrigger value="reviews" className="rounded-xl font-body text-xs font-bold uppercase px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                    Reviews ({reviews?.length || 0})
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="description" className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div
                                    className="font-body text-base text-slate-600 leading-relaxed prose prose-slate max-w-none text-justify"
                                    dangerouslySetInnerHTML={{ __html: product.description || "No description available." }}
                                />
                            </TabsContent>

                            <TabsContent value="nutritional" className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="space-y-6">
                                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                        <p className="font-bold text-sm mb-4 pb-4 border-b border-slate-200">{t("product.nutrition.serving")}</p>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm"><span className="text-slate-500">{t("product.nutrition.calories")}</span><span className="font-bold">10 kcal</span></div>
                                            <div className="flex justify-between text-sm"><span className="text-slate-500">{t("product.nutrition.sugar")}</span><span className="font-bold">0g</span></div>
                                            <div className="flex justify-between text-sm"><span className="text-slate-500">{t("product.nutrition.caffeine")}</span><span className="font-bold">200mg</span></div>
                                            <div className="flex justify-between text-sm"><span className="text-slate-500">{t("product.nutrition.sodium")}</span><span className="font-bold">150mg</span></div>
                                            <div className="flex justify-between text-sm"><span className="text-slate-500">{t("product.nutrition.bvitamins")}</span><span className="font-bold">100% DV</span></div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="reviews" className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="space-y-8">
                                    {/* Review Submission Form */}
                                    <div className="bg-gradient-to-r from-pink-50/40 via-slate-50 to-yellow-50/40 p-6 sm:p-8 rounded-[2rem] border border-slate-200/80 shadow-xs space-y-4">
                                        {isAuthenticated && user ? (
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    if (!reviewText.trim()) return;
                                                    submitReviewMutation.mutate({
                                                        product_id: Number(id),
                                                        review: reviewText.trim(),
                                                        reviewer: `${user.firstName || user.nicename || 'User'} ${user.lastName || ''}`.trim(),
                                                        reviewer_email: user.email,
                                                        rating: reviewRating,
                                                    });
                                                }}
                                                className="space-y-4"
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-4">
                                                    <div>
                                                        <h4 className="font-display font-black text-slate-900 text-lg">Write a Review</h4>
                                                        <p className="text-xs text-slate-500 font-body">Posting as <span className="font-bold text-[#FF1D8E]">{user.firstName || user.nicename} ({user.email})</span></p>
                                                    </div>
                                                    
                                                    {/* Rating Stars Selection */}
                                                    <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-slate-200 w-fit">
                                                        <span className="text-xs font-bold text-slate-500 mr-1.5">Rating:</span>
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <button
                                                                key={star}
                                                                type="button"
                                                                onClick={() => setReviewRating(star)}
                                                                className="p-0.5 hover:scale-125 transition-transform"
                                                            >
                                                                <Star
                                                                    className={`w-5 h-5 ${star <= reviewRating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
                                                                />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <textarea
                                                    rows={3}
                                                    value={reviewText}
                                                    onChange={(e) => setReviewText(e.target.value)}
                                                    placeholder="Share your thoughts about this product..."
                                                    className="w-full p-4 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#FF1D8E]/30 transition-all resize-none"
                                                    required
                                                />

                                                {reviewSubmittedSuccess && (
                                                    <div className="p-3 bg-emerald-100/80 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                                                        <Check className="w-4 h-4 text-emerald-600" />
                                                        Thank you! Your review has been submitted successfully.
                                                    </div>
                                                )}

                                                <div className="flex justify-end">
                                                    <button
                                                        type="submit"
                                                        disabled={submitReviewMutation.isPending || !reviewText.trim()}
                                                        className="px-6 py-3 bg-[#FF1D8E] hover:bg-[#d80f74] text-white rounded-full font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                                                    >
                                                        <span>{submitReviewMutation.isPending ? "Submitting..." : "Submit Review"}</span>
                                                        <Send className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
                                                <div className="space-y-1 text-center sm:text-left">
                                                    <h4 className="font-display font-bold text-slate-900 text-base">Want to leave a review?</h4>
                                                    <p className="text-xs text-slate-500 font-body">Only logged-in customers can submit product reviews.</p>
                                                </div>
                                                <Link
                                                    href={`/auth?redirect=/product/${id}`}
                                                    className="px-6 py-2.5 bg-black hover:bg-[#FF1D8E] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-sm shrink-0"
                                                >
                                                    Log In to Review
                                                </Link>
                                            </div>
                                        )}
                                    </div>

                                    {reviews && reviews.length > 0 ? (
                                        <div className="grid gap-6">
                                            {reviews.map((review) => (
                                                <div key={review.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary border border-slate-100 shadow-sm font-bold text-sm">
                                                                {review.reviewer ? review.reviewer.charAt(0).toUpperCase() : 'U'}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-body font-bold text-sm text-slate-800">{review.reviewer}</h4>
                                                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                                                                    {new Date(review.date_created).toLocaleDateString('el-GR')}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-0.5">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-3.5 h-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="font-body text-sm text-slate-600 leading-relaxed"
                                                        dangerouslySetInnerHTML={{ __html: review.review }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 bg-slate-50 rounded-[2rem] border border-slate-100 border-dashed">
                                            <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                            <p className="text-muted-foreground font-body text-sm italic">No reviews yet for this product. Be the first to leave a review!</p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>

            {/* Full Screen Lightbox */}
            {isLightboxOpen && product.images.length > 0 && (
                <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center animate-in fade-in duration-300">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors z-10 bg-black/50 rounded-full"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Navigation Buttons */}
                    {product.images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1)); }}
                                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all z-10"
                            >
                                <ChevronLeft className="w-10 h-10" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0)); }}
                                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all z-10"
                            >
                                <ChevronRight className="w-10 h-10" />
                            </button>
                        </>
                    )}

                    {/* Current Image */}
                    <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center px-12 md:px-24" onClick={() => setIsLightboxOpen(false)}>
                        <img
                            src={product.images[selectedImage].src}
                            alt={product.images[selectedImage].alt || product.name}
                            className="max-h-full max-w-full object-contain animate-in zoom-in-95 duration-300 select-none cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    {/* Lightbox Thumbnails */}
                    {product.images.length > 1 && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 px-4 max-w-[90vw] overflow-x-auto scrollbar-hide py-2">
                            {product.images.map((img, i) => (
                                <button
                                    key={img.id}
                                    onClick={() => setSelectedImage(i)}
                                    className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${i === selectedImage ? "border-white" : "border-transparent opacity-50 hover:opacity-100"
                                        }`}
                                >
                                    <img src={img.src} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}
