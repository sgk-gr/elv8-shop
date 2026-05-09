"use client";

import { useQuery } from "@tanstack/react-query";
import { getProduct, getProductVariations, getProductReviews } from "@/lib/woocommerce";
import { WooProduct, WooVariation } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Minus, Plus, Star, MessageSquare, X, Check } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ProductDetailClient({ id }: { id: string }) {
    const { addItem } = useCart();
    const searchParams = useSearchParams();
    const backUrlParam = searchParams.get("backUrl");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
    const [variationsInitialized, setVariationsInitialized] = useState(false);

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
        
        // Specific case for products 506, 500, 68, 273, 102, 317, 426 and 457
        if (product.id === 506) return "/products?category=27";
        if (product.id === 500) return "/products?category=99";
        if (product.id === 68) return "/products?category=21";
        if (product.id === 110) return "/products?category=107";
        if (product.id === 127) return "/products?category=23";
        if (product.id === 273) return "/products?category=23";
        if (product.id === 102) return "/products?category=24";
        if (product.id === 317) return "/products?category=74";
        if (product.id === 426) return "/products?category=71";
        if (product.id === 457) return "/products?category=65";
        if (product.id === 631) return "/products?category=121";
        if (product.id === 638) return "/products?category=121";

        // General mapping for other categories using dynamic products page
        const categoryIds = product.categories.map(c => c.id);
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
        
        return "/products";
    };

    // If a backUrl was passed as a query param (e.g. from the home page carousels), use it directly.
    // Otherwise fall back to the computed category-based URL.
    const backUrl = backUrlParam ? decodeURIComponent(backUrlParam) : getBackUrl();

    return (
        <main className="container mx-auto px-4 md:px-8 py-8 md:py-12">
            <Link
                href={backUrl}
                className="inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-12 group"
            >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Επιστροφη
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
                                    {stockStatus === 'instock' ? 'Σε απόθεμα' : 'Εξαντλημένο'}
                                    {stockStatus === 'instock' && stockQuantity !== null && stockQuantity > 0 && (
                                        <span className="ml-1.5 opacity-70">({stockQuantity} διαθέσιμα)</span>
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
                                                    {attr.name === "Χρώμα" ? "Διάλεξε χρώμα" : attr.name}
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
                                                                        ? "bg-[#C4196D] border-[#C4196D] text-white shadow-lg scale-105" 
                                                                        : "bg-white border-slate-200 text-slate-600 hover:border-[#C4196D]/30 hover:bg-slate-50"
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
                                                            <SelectValue placeholder={`Επιλέξτε ${attr.name}`} />
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

                            {/* Custom Selectors for Simple Products (204, 211) */}
                            {product.type === "simple" && (product.id === 204 || product.id === 211) && (
                                <div className="p-6 bg-slate-50/30 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                                    <label className="font-body text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground ml-1">
                                        Διάλεξε χρώμα
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {(product.id === 204 
                                            ? ["Ανοιχτό Πράσινο", "Πέρλα", "Κυπαρισσί"] 
                                            : ["Χρυσό", "Ασημί"]
                                        ).map((color) => {
                                            const isSelected = selectedAttributes["Χρώμα"] === color;
                                            return (
                                                <button
                                                    key={color}
                                                    onClick={() => setSelectedAttributes(prev => ({ ...prev, "Χρώμα": color }))}
                                                    className={`px-6 py-2.5 rounded-full font-body text-xs font-bold transition-all duration-300 border-2 ${
                                                        isSelected 
                                                        ? "bg-[#C4196D] border-[#C4196D] text-white shadow-lg scale-105" 
                                                        : "bg-white border-slate-200 text-slate-600 hover:border-[#C4196D]/30 hover:bg-slate-50"
                                                    }`}
                                                >
                                                    {color}
                                                </button>
                                            );
                                        })}
                                    </div>
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
                                className="flex-1 h-14 font-body text-xs font-bold uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 bg-[#C4196D] text-white hover:bg-[#C4196D]/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                disabled={stockStatus === "outofstock" || (product.type === "variable" && variations && variations.length > 0 && !selectedVariation)}
                            >
                                {stockStatus === "outofstock" ? "Εξαντλημένο" : "Προσθήκη στο Καλάθι"}
                            </Button>
                        </div>
                    </div>



                    {/* Description & Reviews Tabs */}
                    <div className="pt-10">
                        <Tabs defaultValue="description" className="w-full">
                            <TabsList className="bg-slate-50 p-1 rounded-2xl border border-slate-100 w-full sm:w-auto h-auto flex flex-wrap">
                                <TabsTrigger value="description" className="rounded-xl font-body text-xs font-bold uppercase px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                    Περιγραφή
                                </TabsTrigger>
                                {(![29, 33, 40, 44, 48, 52, 56, 60, 64, 68, 72, 102, 105, 108, 110, 113, 115, 117, 119, 123, 127, 130, 133, 136, 138, 141, 144, 148, 151, 155, 158, 161, 164, 167, 170, 173, 176, 180, 182, 186, 189, 193, 197, 201, 208, 211, 220, 225, 229, 235, 238, 242, 264, 270, 273, 280].includes(product.id) && product.id < 296) && (
                                    <TabsTrigger value="short" className="rounded-xl font-body text-xs font-bold uppercase px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                        Χαρακτηριστικά
                                    </TabsTrigger>
                                )}
                                <TabsTrigger value="reviews" className="rounded-xl font-body text-xs font-bold uppercase px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                    Αξιολογήσεις ({reviews?.length || 0})
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="description" className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div
                                    className="font-body text-base text-slate-600 leading-relaxed prose prose-slate max-w-none text-justify"
                                    dangerouslySetInnerHTML={{ __html: product.description || "Δεν υπάρχει διαθέσιμη περιγραφή." }}
                                />
                            </TabsContent>

                            {(![29, 33, 40, 44, 48, 52, 56, 60, 64, 68, 72, 102, 105, 108, 110, 113, 115, 117, 119, 123, 127, 130, 133, 136, 138, 141, 144, 148, 151, 155, 158, 161, 164, 167, 170, 173, 176, 180, 182, 186, 189, 193, 197, 201, 208, 211, 220, 225, 229, 235, 238, 242, 264, 270, 273, 280].includes(product.id) && product.id < 296) && <TabsContent value="short" className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="space-y-8">
                                    {product.short_description && (
                                        <div
                                            className="font-body text-base text-muted-foreground leading-relaxed prose prose-slate max-w-none italic border-l-2 border-primary/20 pl-6"
                                            dangerouslySetInnerHTML={{ __html: product.short_description }}
                                        />
                                    )}
                                    
                                    <div className={product.short_description ? "pt-2" : ""}>
                                        <ul className="grid sm:grid-cols-2 gap-y-5 gap-x-8">
                                            {(product.name?.toLowerCase().includes("ice berry")
                                                ? [
                                                    "Υβριδική φόρμουλα",
                                                    "Ανάλαφρη, κρεμώδης υφή",
                                                    "Βιολογικό έλαιο passion fruit",
                                                    "Πλούσιο σε Βιταμίνη C",
                                                    "Αντιοξειδωτική δράση",
                                                    "Καταπραϋντικές ιδιότητες"
                                                  ]
                                                : product.name?.toLowerCase().includes("hazelnut cream")
                                                ? [
                                                    "Καινοτόμα υβριδική φόρμουλα",
                                                    "Ανάλαφρη κρεμώδη υφή",
                                                    "Βιολογικό Έλαιο passion fruit",
                                                    "Πλούσιο σε Βιταμίνη C",
                                                    "Αντιοξειδωτικές και καταπραϋντικές ιδιότητες"
                                                  ]
                                                : product.name?.toLowerCase().includes("wish")
                                                ? [
                                                    "Μεταξένια υφή",
                                                    "Μεγάλη διάρκεια ως 8 ώρες",
                                                    "Έξτρα ενυδάτωση",
                                                    "Έντονη χρωματική απόδοση",
                                                    "Μάτ φινίρισμα",
                                                    "Δεν ξηράινει τα χείλη"
                                                  ]
                                                : product.name?.toLowerCase().includes("wine")
                                                ? [
                                                    "Ματ φινίρισμα",
                                                    "Μεγάλη διάρκεια έως 8 ώρες",
                                                    "Έντονη χρωματική απόδοση",
                                                    "Μεταξένια υφή",
                                                    "Έξτρα ενυδάτωση",
                                                    "Δεν ξηραίνει τα χείλη"
                                                  ]
                                                : product.name?.toLowerCase().includes("vintage")
                                                ? [
                                                    "Ματ φινίρισμα",
                                                    "Μεγάλη διάρκεια έως 8 ώρες",
                                                    "Έντονη χρωματική απόδοση",
                                                    "Μεταξένια υφή",
                                                    "Έξτρα ενυδάτωση",
                                                    "Δεν ξηραίνει τα χείλη"
                                                  ]
                                                : product.name?.toLowerCase().includes("sweet kiss")
                                                ? [
                                                    "Ματ φινίρισμα",
                                                    "Μεγάλη διάρκεια έως 8 ώρες",
                                                    "Έντονη χρωματική απόδοση",
                                                    "Μεταξένια υφή",
                                                    "Έξτρα ενυδάτωση",
                                                    "Δεν ξηραίνει τα χείλη"
                                                  ]
                                                : product.name?.toLowerCase().includes("red sin")
                                                ? [
                                                    "Ματ φινίρισμα",
                                                    "Μεγάλη διάρκεια έως 8 ώρες",
                                                    "Έντονη χρωματική απόδοση",
                                                    "Μεταξένια υφή",
                                                    "Έξτρα ενυδάτωση",
                                                    "Δεν ξηραίνει τα χείλη"
                                                  ]
                                                : product.name?.toLowerCase().includes("secret")
                                                ? [
                                                    "Ματ φινίρισμα",
                                                    "Μεγάλη διάρκεια έως 8 ώρες",
                                                    "Έντονη χρωματική απόδοση",
                                                    "Μεταξένια υφή",
                                                    "Έξτρα ενυδάτωση",
                                                    "Δεν ξηραίνει τα χείλη"
                                                  ]
                                                : product.name?.toLowerCase().includes("purple rock")
                                                ? [
                                                    "Ματ φινίρισμα",
                                                    "Μεγάλη διάρκεια έως 8 ώρες",
                                                    "Έντονη χρωματική απόδοση",
                                                    "Μεταξένια υφή",
                                                    "Έξτρα ενυδάτωση",
                                                    "Δεν ξηραίνει τα χείλη"
                                                  ]
                                                : product.name?.toLowerCase().includes("pink dream")
                                                ? [
                                                    "Ματ φινίρισμα",
                                                    "Μεγάλη διάρκεια έως 8 ώρες",
                                                    "Έντονη χρωματική απόδοση",
                                                    "Μεταξένια υφή",
                                                    "Έξτρα ενυδάτωση",
                                                    "Δεν ξηραίνει τα χείλη"
                                                  ]
                                                : product.name?.toLowerCase().includes("marshmallow") 
                                                ? [
                                                    "Ανάλαφρη, κρεμώδη αφή",
                                                    "Βιολογικό έλαιο passion fruit",
                                                    "Βιταμίνη C",
                                                    "Αντιοξειδωτική δράση"
                                                  ]
                                                : ((product.name?.toLowerCase().includes("άπειρο") || product.name?.toLowerCase().includes("απειρο")) && product.name?.includes("925"))
                                                ? [
                                                    "Πανέμορφο, βραχιόλι κατασκευασμένο απο Ασήμι 925",
                                                    "Μήκος αλυσίδας : 15 εκ. συν 3εκ. προέκταση (σύνολο 18εκ.)",
                                                    "Μπορεί να φορεθεί και απο νεαρά κορίτσια/παιδιά",
                                                    "Διαστάσεις μοτίφ : 14 x 7 mm",
                                                    "Nickel Free & Υποαλλεργικό"
                                                  ]
                                                : product.id === 115
                                                ? [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Ανθεκτικό στο νερό"
                                                  ]
                                                : product.id === 117
                                                ? [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Ασημί",
                                                    "Ανθεκτικό στο νερό"
                                                  ]
                                                : product.id === 113
                                                ? []
                                                : product.name?.toLowerCase().includes("twisted wave")
                                                ? [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Χρώμα: Χρυσό",
                                                    "Ανθεκτικό στο νερό",
                                                    "One size"
                                                  ]
                                                : product.name?.toLowerCase().includes("id βραχιόλι stainless steel")
                                                ? []
                                                : product.name?.toLowerCase().includes("σφυρίλατη")
                                                ? [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Ασημί",
                                                    "Ανθεκτικό στο νερό"
                                                  ]
                                                : product.id === 182
                                                ? []
                                                : product.id === 180
                                                ? []
                                                : product.id === 176
                                                ? [
                                                    "Ασήμι 925",
                                                    "Μέγεθος μοτίφ 10x7mm",
                                                    "Διάμετρος κρίκου 1,2mm * 12mm",
                                                    "Nickel Free & Υποαλλεργικά"
                                                  ]
                                                : product.id === 173
                                                ? []
                                                : product.id === 170
                                                ? []
                                                : product.id === 167
                                                ? []
                                                : product.id === 164
                                                ? []
                                                : product.id === 161
                                                ? [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Μήκος αλυσίδας 40εκ. έως 45εκ.",
                                                    "Ανθεκτικό στο νερό"
                                                  ]
                                                : product.id === 158
                                                ? [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Μέγεθος μοτίφ 2εκ.",
                                                    "Μήκος αλυσίδας 45εκ. έως 50εκ.",
                                                    "Ανθεκτικό στο νερό"
                                                  ]
                                                : product.id === 155
                                                ? [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Εσωτερική διάμετρος 12εκ.",
                                                    "Χρώμα μετάλλου: Ασημί",
                                                    "Ανθεκτικό στο νερό"
                                                  ]
                                                : product.id === 151
                                                ? [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Μήκος αλυσίδας 39εκ. ώς 45εκ.",
                                                    "Ανθεκτικό στο νερό"
                                                  ]
                                                : product.id === 148
                                                ? [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Μήκος αλυσίδας 49εκ. ώς 53εκ.",
                                                    "Ανθεκτικό στο νερό"
                                                  ]
                                                : product.id === 144
                                                ? [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Μήκος αλυσίδας: 38εκ. έως 43εκ.",
                                                    "Μέγεθος μοτίφ: 1εκ."
                                                  ]
                                                : product.id === 141
                                                ? [
                                                    "Ορείχαλκος (brass)",
                                                    "Δίχρωμο (ασήμι & χρυσό)",
                                                    "Αυξομειούμενο μέγεθος"
                                                  ]
                                                : product.id === 136
                                                ? [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Χρώμα μετάλλου: Ασημί και Χρυσό",
                                                    "Νούμερο: 56",
                                                    "Δύσκαμπτο υλικό",
                                                    "Ανθεκτικό στο νερό"
                                                  ]
                                                : product.id === 133
                                                ? [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Χρώμα μετάλλου: Ασημί και Χρυσό",
                                                    "Δύσκαμπτο υλικό",
                                                    "Ανθεκτικό στο νερό"
                                                  ]
                                                : product.id === 130
                                                ? [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Ανθεκτικό στο νερό"
                                                  ]
                                                : product.id === 186
                                                ? []
                                                : product.id === 189
                                                ? []
                                                : product.id === 193
                                                ? []
                                                : product.id === 225
                                                ? [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Χρώμα: Χρυσό",
                                                    "βιδωτά"
                                                  ]
                                                : product.id === 229
                                                ? [
                                                    "Ορείχαλκος (brass)",
                                                    "Χρώμα: Χρυσό",
                                                    "Λευκά ζιργκόν"
                                                  ]
                                                : product.id === 220
                                                ? [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Συνολικό μήκος 5 εκ."
                                                  ]
                                                : product.id === 215
                                                ? []
                                                : product.id === 211
                                                ? []
                                                : product.id === 208
                                                ? []
                                                : product.id === 204
                                                ? [
                                                    "Συνολικό μήκος 3 εκ."
                                                  ]
                                                : product.id === 201
                                                ? []
                                                : product.id === 197
                                                ? []
                                                : product.id === 242
                                                ? [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Χρώμα: Ασημί",
                                                    "Ανθεκτικό στο νερό"
                                                  ]
                                                : product.id === 235
                                                ? []
                                                : [
                                                    "Ανοξείδωτο ατσάλι (stainless steel)",
                                                    "Δίχρωμο (ασήμι & χρυσό)",
                                                    "Ανθεκτικό στο νερό"
                                                  ]




                                            ).map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-4 group">
                                                    <div className="mt-0.5 w-[22px] h-[22px] rounded-[7px] bg-[#C4196D]/10 flex items-center justify-center group-hover:bg-[#C4196D]/20 group-hover:scale-110 transition-all duration-300 shrink-0">
                                                        <Check className="w-3.5 h-3.5 text-[#C4196D] stroke-[3]" />
                                                    </div>
                                                    <span className="font-body text-[15px] font-medium text-slate-700 group-hover:text-slate-900 transition-colors leading-relaxed">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </TabsContent>}

                            <TabsContent value="reviews" className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="space-y-8">
                                    {reviews && reviews.length > 0 ? (
                                        <div className="grid gap-6">
                                            {reviews.map((review) => (
                                                <div key={review.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary border border-slate-100 shadow-sm">
                                                                {review.reviewer.charAt(0).toUpperCase()}
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
                                                                    className={`w-3 h-3 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
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
                                            <p className="text-muted-foreground font-body text-sm italic">Δεν υπάρχουν ακόμα αξιολογήσεις γι' αυτό το προϊόν.</p>
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
