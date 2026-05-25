"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { getProducts, getCategories, getTags } from "@/lib/woocommerce";
import { WooProduct, WooCategory, WooTag } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import ProductGridWithLoadMore from "@/components/ProductGridWithLoadMore";
import { useState, useMemo, Suspense } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp, ChevronRight, X } from "lucide-react";

// Type for attribute filters
interface AttributeFilter {
    name: string;
    options: string[];
}

function ProductsContent({ 
    initialProducts, 
    initialCategories, 
    initialTags 
}: { 
    initialProducts: WooProduct[], 
    initialCategories: WooCategory[], 
    initialTags: WooTag[] 
}) {

    const searchParams = useSearchParams();
    const router = useRouter();
    const categoryId = searchParams.get("category");
    const tagId = searchParams.get("tag");
    const onSale = searchParams.get("on_sale");
    const searchQuery = searchParams.get("search");

    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [sortBy, setSortBy] = useState<string>("newest");
    const [filterOnSale, setFilterOnSale] = useState(onSale === "true");
    const [filterInStock, setFilterInStock] = useState(false);
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string[]>>({});
    const [expandedAttributes, setExpandedAttributes] = useState<Record<string, boolean>>({});
    const [showCategories, setShowCategories] = useState(false);

    const params: Record<string, string> = {};
    if (categoryId) params.category = categoryId;
    if (tagId) params.tag = tagId;
    if (onSale === "true") params.on_sale = "true";
    if (searchQuery) params.search = searchQuery;

    const { data: allProducts = [], isLoading } = useQuery<WooProduct[]>({
        queryKey: ["products", params],
        queryFn: () => getProducts({ per_page: "100", ...params }),
        initialData: params.category || params.tag || params.on_sale || params.search ? undefined : initialProducts,
    });

    const { data: categories = [] } = useQuery<WooCategory[]>({
        queryKey: ["categories", "filter"],
        queryFn: () => getCategories({ hide_empty: "true" }),
        initialData: initialCategories,
    });

    const { data: tags = [] } = useQuery<WooTag[]>({
        queryKey: ["tags"],
        queryFn: () => getTags({ hide_empty: "true" }),
        initialData: initialTags,
    });


    const activeCategory = categories.find((c) => String(c.id) === categoryId);
    const activeTag = tags.find((t) => String(t.id) === tagId);

    // Extract unique attributes from all products
    const availableAttributes = useMemo(() => {
        const attributesMap = new Map<string, Set<string>>();

        allProducts.forEach(product => {
            if (product.attributes && product.attributes.length > 0) {
                product.attributes.forEach(attr => {
                    if (attr.variation && attr.options && attr.options.length > 0) {
                        const attrName = attr.name;
                        if (!attributesMap.has(attrName)) {
                            attributesMap.set(attrName, new Set());
                        }
                        attr.options.forEach(option => {
                            attributesMap.get(attrName)?.add(option);
                        });
                    }
                });
            }
        });

        const result: AttributeFilter[] = [];
        attributesMap.forEach((options, name) => {
            result.push({
                name,
                options: Array.from(options).sort()
            });
        });

        return result;
    }, [allProducts]);

    // Calculate price range from all products
    const maxPrice = useMemo(() => {
        if (allProducts.length === 0) return 1000;
        return Math.ceil(Math.max(...allProducts.map(p => parseFloat(p.price) || 0)));
    }, [allProducts]);

    // Filter and sort products
    const products = useMemo(() => {
        let filtered = [...allProducts];

        // Price filter
        filtered = filtered.filter(p => {
            const price = parseFloat(p.price) || 0;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // On sale filter
        if (filterOnSale) {
            filtered = filtered.filter(p => p.on_sale);
        }

        // In stock filter
        if (filterInStock) {
            filtered = filtered.filter(p => p.stock_status === "instock");
        }

        // Attribute filters
        Object.entries(selectedAttributes).forEach(([attrName, selectedOptions]) => {
            if (selectedOptions.length > 0) {
                filtered = filtered.filter(product => {
                    const productAttr = product.attributes?.find(a => a.name === attrName);
                    if (!productAttr || !productAttr.options) return false;

                    // Check if any of the selected options match the product's options
                    return selectedOptions.some(selectedOption =>
                        productAttr.options.includes(selectedOption)
                    );
                });
            }
        });

        // Sort
        switch (sortBy) {
            case "price-asc":
                filtered.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
                break;
            case "price-desc":
                filtered.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
                break;
            case "popular":
                filtered.sort((a, b) => parseFloat(b.average_rating || "0") - parseFloat(a.average_rating || "0"));
                break;
            case "newest":
            default:
                // Already sorted by newest from API
                break;
        }

        return filtered;
    }, [allProducts, priceRange, filterOnSale, filterInStock, sortBy, selectedAttributes]);

    const resetFilters = () => {
        setPriceRange([0, maxPrice]);
        setSortBy("newest");
        setFilterOnSale(false);
        setFilterInStock(false);
        setSelectedAttributes({});
    };

    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++;
        if (filterOnSale) count++;
        if (filterInStock) count++;
        if (sortBy !== "newest") count++;
        Object.values(selectedAttributes).forEach(options => {
            if (options.length > 0) count++;
        });
        return count;
    }, [priceRange, filterOnSale, filterInStock, sortBy, maxPrice, selectedAttributes]);

    const toggleAttributeOption = (attrName: string, option: string) => {
        setSelectedAttributes(prev => {
            const current = prev[attrName] || [];
            const newOptions = current.includes(option)
                ? current.filter(o => o !== option)
                : [...current, option];

            if (newOptions.length === 0) {
                const { [attrName]: _, ...rest } = prev;
                return rest;
            }

            return { ...prev, [attrName]: newOptions };
        });
    };

    const toggleAttributeExpanded = (attrName: string) => {
        setExpandedAttributes(prev => ({
            ...prev,
            [attrName]: !prev[attrName]
        }));
    };

    const updateSearchParam = (key: string, value?: string) => {
        const nextParams = new URLSearchParams(searchParams.toString());
        if (value) {
            nextParams.set(key, value);
        } else {
            nextParams.delete(key);
        }
        router.push(`/products?${nextParams.toString()}`);
    };

    return (
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-20">
            <div className="space-y-8 animate-in slide-in-from-top-4 duration-700">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <button onClick={() => router.push("/")} className="hover:text-primary transition-colors">Αρχική</button>
                    <ChevronRight className="w-4 h-4" />
                    <button onClick={() => router.push("/products")} className="hover:text-primary transition-colors">Συλλογές</button>
                    {activeCategory?.parent !== 0 && categories.find(c => c.id === activeCategory?.parent) && (
                        <>
                            <ChevronRight className="w-4 h-4" />
                            <button 
                                onClick={() => updateSearchParam("category", String(activeCategory?.parent))} 
                                className="hover:text-primary transition-colors"
                                dangerouslySetInnerHTML={{ __html: categories.find(c => c.id === activeCategory?.parent)?.name || "" }}
                            />
                        </>
                    )}
                    {(activeCategory || activeTag || onSale || searchQuery) && (
                        <>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-primary font-medium">
                                {onSale ? "Εποχιακές Εκπτώσεις" : activeTag ? activeTag.name : activeCategory ? activeCategory.name : searchQuery ? `Αναζήτηση: ${searchQuery}` : ""}
                            </span>
                        </>
                    )}
                </nav>

                <div className="space-y-4">
                    <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[#C4196D]">
                        {onSale ? "Εποχιακές Εκπτώσεις" : activeTag ? activeTag.name : activeCategory ? activeCategory.name : searchQuery ? `Αποτελέσματα για: ${searchQuery}` : "Συλλογές"}
                    </h1>
                    <p className="text-muted-foreground font-body text-sm max-w-lg leading-relaxed">
                        Ανακαλύψτε επιλεγμένα κομμάτια που συνδυάζουν την διαχρονική κομψότητα με τη σύγχρονη αισθητική.
                    </p>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex items-center justify-between py-6 border-b border-border mt-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-primary transition-all bg-background"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span className="font-body text-xs font-semibold">Φίλτρα</span>
                        {activeFiltersCount > 0 && (
                            <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>
                    {activeFiltersCount > 0 && (
                        <button
                            onClick={resetFilters}
                            className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium"
                        >
                            Καθαρισμός φίλτρων
                        </button>
                    )}
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                    {products.length} {products.length === 1 ? "προϊόν" : "προϊόντα"}
                </p>
            </div>

            <div className="flex gap-8 mt-8">
                {/* Filters Sidebar Backdrop (Mobile) */}
                {showFilters && (
                    <div 
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden animate-in fade-in duration-300"
                        onClick={() => setShowFilters(false)}
                    />
                )}

                {/* Filters Sidebar / Drawer */}
                <aside
                    className={`fixed inset-y-0 left-0 w-[85%] max-w-xs bg-white z-[70] p-6 shadow-2xl transform transition-transform duration-500 ease-out md:relative md:translate-x-0 md:w-64 md:z-auto md:p-0 md:shadow-none md:bg-transparent ${
                        showFilters ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <div className="flex flex-col h-full">
                        {/* Mobile Header */}
                        <div className="flex items-center justify-between mb-8 md:hidden">
                            <h2 className="font-display text-xl font-bold">Φίλτρα</h2>
                            <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-slate-100 rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                            <div className="bg-secondary/30 md:bg-transparent rounded-2xl p-6 md:p-0 space-y-6 md:border-none border border-border/50">
                                {/* Sort */}
                                <div className="space-y-3">
                                    <h3 className="font-display text-sm font-bold tracking-wide">Ταξινόμηση</h3>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => {
                                            setSortBy(e.target.value);
                                            if (window.innerWidth < 768) setShowFilters(false);
                                        }}
                                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    >
                                        <option value="newest">Νεότερα Πρώτα</option>
                                        <option value="price-asc">Τιμή: Χαμηλή → Υψηλή</option>
                                        <option value="price-desc">Τιμή: Υψηλή → Χαμηλή</option>
                                        <option value="popular">Δημοφιλή</option>
                                    </select>
                                </div>

                                {/* Categories */}
                                <div className="space-y-3 border-t border-border/30 pt-4">
                                    <button
                                        onClick={() => setShowCategories(prev => !prev)}
                                        className="w-full flex items-center justify-between group"
                                    >
                                        <h3 className="font-display text-sm font-bold tracking-wide group-hover:text-primary transition-colors">
                                            Κατηγορίες
                                        </h3>
                                        {showCategories ? (
                                            <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        )}
                                    </button>

                                    {showCategories && (
                                        <div className="space-y-1 animate-in slide-in-from-top-2 duration-300">
                                            <button
                                                onClick={() => {
                                                    updateSearchParam("category");
                                                    if (window.innerWidth < 768) setShowFilters(false);
                                                }}
                                                className={`w-full text-left font-body text-sm py-1.5 transition-colors ${!categoryId && !onSale ? "text-[#C4196D] font-bold" : "text-muted-foreground hover:text-[#C4196D]"}`}
                                            >
                                                Όλα τα Προϊόντα
                                            </button>
                                            {categories.filter(c => c.count > 0).map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => {
                                                        updateSearchParam("category", String(cat.id));
                                                        if (window.innerWidth < 768) setShowFilters(false);
                                                    }}
                                                    className={`w-full text-left font-body text-sm py-1.5 transition-colors ${categoryId === String(cat.id) ? "text-[#C4196D] font-bold" : "text-muted-foreground hover:text-[#C4196D]"}`}
                                                    dangerouslySetInnerHTML={{ __html: cat.name }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Price Range */}
                                <div className="space-y-3 border-t border-border/30 pt-4">
                                    <h3 className="font-display text-sm font-bold tracking-wide">Εύρος Τιμής</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="number"
                                                value={priceRange[0]}
                                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                placeholder="Από"
                                            />
                                            <span className="text-muted-foreground">-</span>
                                            <input
                                                type="number"
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                placeholder="Έως"
                                            />
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max={maxPrice}
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                            onMouseUp={() => { if (window.innerWidth < 768) setShowFilters(false); }}
                                            onTouchEnd={() => { if (window.innerWidth < 768) setShowFilters(false); }}
                                            className="w-full accent-primary"
                                        />
                                        <p className="text-xs text-muted-foreground font-medium">
                                            €{priceRange[0]} - €{priceRange[1]}
                                        </p>
                                    </div>
                                </div>

                                {/* Dynamic Attribute Filters */}
                                {availableAttributes.map((attr) => (
                                    <div key={attr.name} className="space-y-3 border-t border-border/30 pt-4">
                                        <button
                                            onClick={() => toggleAttributeExpanded(attr.name)}
                                            className="w-full flex items-center justify-between group"
                                        >
                                            <h3 className="font-display text-sm font-bold tracking-wide group-hover:text-primary transition-colors">
                                                {attr.name}
                                            </h3>
                                            {expandedAttributes[attr.name] ? (
                                                <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                            )}
                                        </button>

                                        {(expandedAttributes[attr.name] || expandedAttributes[attr.name] === undefined) && (
                                            <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                                                {attr.options.map((option) => (
                                                    <label
                                                        key={option}
                                                        className="flex items-center gap-3 cursor-pointer group/option"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedAttributes[attr.name]?.includes(option) || false}
                                                            onChange={() => {
                                                                toggleAttributeOption(attr.name, option);
                                                                if (window.innerWidth < 768) setShowFilters(false);
                                                            }}
                                                            className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                                        />
                                                        <span className="font-body text-sm group-hover/option:text-primary transition-colors">
                                                            {option}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* On Sale & In Stock */}
                                <div className="space-y-3 border-t border-border/30 pt-4">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={filterOnSale}
                                            onChange={(e) => {
                                                setFilterOnSale(e.target.checked);
                                                if (window.innerWidth < 768) setShowFilters(false);
                                            }}
                                            className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                        <span className="font-body text-sm font-semibold group-hover:text-primary transition-colors">
                                            Μόνο Προσφορές
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group mt-3">
                                        <input
                                            type="checkbox"
                                            checked={filterInStock}
                                            onChange={(e) => {
                                                setFilterInStock(e.target.checked);
                                                if (window.innerWidth < 768) setShowFilters(false);
                                            }}
                                            className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                        <span className="font-body text-sm font-semibold group-hover:text-primary transition-colors">
                                            Μόνο Διαθέσιμα
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Products Grid */}
                <div className="flex-1">
                    {products.length === 0 && !isLoading ? (
                        <div className="text-center py-32 space-y-4 bg-secondary/20 rounded-[2rem] border border-dashed border-border">
                            <p className="text-muted-foreground font-display text-2xl font-medium">Δεν βρέθηκαν προϊόντα</p>
                            <button
                                onClick={resetFilters}
                                className="text-primary font-body text-sm font-semibold border-b border-primary"
                            >
                                Καθαρισμός φίλτρων
                            </button>
                        </div>
                    ) : (
                        <ProductGridWithLoadMore 
                            products={products} 
                            isLoading={isLoading} 
                            columnsClass="grid-cols-2 lg:grid-cols-3"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProductsClient({ 
    initialProducts, 
    initialCategories, 
    initialTags 
}: { 
    initialProducts: WooProduct[], 
    initialCategories: WooCategory[], 
    initialTags: WooTag[] 
}) {
    return (
        <main>
            <Suspense fallback={
                <div className="container mx-auto px-4 md:px-8 py-20 flex justify-center">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            }>
                <ProductsContent 
                    initialProducts={initialProducts} 
                    initialCategories={initialCategories} 
                    initialTags={initialTags} 
                />
            </Suspense>
        </main>
    );
}

