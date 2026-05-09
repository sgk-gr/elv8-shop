"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Menu, X, Search, User, ChevronDown, ChevronRight, Loader2, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "@/lib/woocommerce";
import { WooProduct, WooCategory } from "@/types/product";
import Image from "next/image";
import logoImg from "@/assets/logotipo13.png";

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const { favorites } = useFavorites();
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategory = (id: number) => {
    setExpandedCategories(prev => 
      prev.includes(id) ? prev.filter(catId => catId !== id) : [...prev, id]
    );
  };

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Debouncing search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: searchResults = [], isLoading: isSearching } = useQuery<WooProduct[]>({
    queryKey: ["products", "search", debouncedQuery],
    queryFn: () => getProducts({ search: debouncedQuery, per_page: "5" }),
    enabled: debouncedQuery.length > 2,
  });

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch Categories
  const { data: allCategories = [] } = useQuery<WooCategory[]>({
    queryKey: ["categories", "menu"],
    queryFn: () => getCategories({ per_page: "100" }),
  });

  // Helper to build menu structure
  const menuCategories = (allCategories || [])
    .filter(c => 
      Number(c.parent) === 0 && 
      c.slug !== 'uncategorized' && 
      c.name !== 'Χωρίς κατηγορία' && 
      c.name !== 'Χωρίς Κατηγορία' &&
      c.slug !== 'charms'
    )
    .sort((a, b) => {
      const order = ["Κοσμήματα", "Cosmetics", "Αξεσουάρ", "Παιδικά"];
      const indexA = order.indexOf(a.name);
      const indexB = order.indexOf(b.name);
      
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    });
  
  const getChildren = (parentId: number) => 
    (allCategories || []).filter(c => Number(c.parent) === parentId && c.slug !== 'charms');

  return (
    <>
      {/* Top Banner 1 */}
      <div className="bg-background py-2 border-b border-rose-100/50">
        <p className="text-center text-[10px] md:text-xs font-medium tracking-wider text-[#C4196D]">
          Welcome to Vaia Charms world !
        </p>
      </div>

      {/* Top Banner 2 (Announcement) */}
      <div className="bg-[#C4196D] py-2.5">
        <p className="text-center text-[10px] md:text-xs font-bold tracking-[0.2em] text-white uppercase">
          HANDCRAFTED JEWELRY LIKE REAL ART !
        </p>
      </div>

      <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
        {/* Scroll Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-[3px] transition-all duration-100 ease-out z-50"
          style={{ width: `${scrollProgress}%`, backgroundColor: '#E83C91' }}
        />
        <div className="container mx-auto px-4 md:px-8">
          <div className="relative h-16 md:h-20 flex items-center justify-between">

            {/* Mobile Search Overlay (Full Width) */}
            {mobileSearchOpen && (
              <div className="absolute inset-0 z-10 px-4 bg-background md:hidden flex items-center animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="relative flex-1 flex items-center gap-3">
                  <Search className="absolute left-4 w-4 h-4 text-primary" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Αναζήτηση..."
                    className="w-full bg-secondary/50 border-none rounded-full py-2.5 pl-11 pr-4 font-body text-sm outline-none ring-1 ring-primary/10 focus:ring-primary/30 transition-all"
                    autoFocus
                  />
                  <button
                    onClick={() => { setMobileSearchOpen(false); setSearchQuery(""); setIsSearchFocused(false); }}
                    className="p-2 hover:bg-secondary/50 rounded-full text-muted-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Live Search Results (on top of overlay) */}
                  {isSearchFocused && debouncedQuery.length > 2 && (
                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl shadow-2xl border p-3 animate-in fade-in duration-300 max-h-[70vh] overflow-y-auto">
                      {isSearching ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="space-y-3">
                          {searchResults.map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.id}/`}
                              onClick={() => { setIsSearchFocused(false); setMobileSearchOpen(false); }}
                              className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors group"
                            >
                              <div className="w-10 h-14 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                                {product.images?.[0] && (
                                  <img src={product.images[0].src} alt={product.name} className="w-full h-full object-cover" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-display text-sm font-bold truncate" dangerouslySetInnerHTML={{ __html: product.name }} />
                                <p className="font-body text-xs text-muted-foreground">{product.price}€</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="py-6 text-center text-xs text-muted-foreground italic">Δεν βρέθηκαν αποτελέσματα</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Left: Logo */}
            <div className="hidden lg:flex items-center">
              <Link href="/" className="group flex items-center relative z-20">
                <Image
                  src={logoImg}
                  alt="Vaia Charms"
                  width={600}
                  height={600}
                  className="h-20 md:h-28 w-auto object-contain transition-transform group-hover:scale-110"
                  priority
                />
              </Link>
            </div>

            {/* Navigation Links (Desktop - Dynamic from WordPress) */}
            <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2">
              {menuCategories.map((parent) => {
                const children = getChildren(parent.id);
                return (
                  <div key={parent.id} className="relative group">
                    <Link 
                      href={`/products?category=${parent.id}`} 
                      className="font-display flex items-center gap-1 text-sm font-bold tracking-wide hover:text-[#C17482] hover:bg-[#C17482]/10 transition-all px-3 py-1.5 rounded-full capitalize"
                    >
                      {parent.name}
                      {children.length > 0 && <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />}
                    </Link>
                    
                    {children.length > 0 && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="min-w-[180px] bg-[#FCF8F8] border border-slate-100 rounded-2xl shadow-xl p-2 flex flex-col gap-1">
                          {children.map((child) => {
                            const subChildren = getChildren(child.id);
                            return (
                              <div key={child.id} className="relative group/sub">
                                <Link 
                                  href={`/products?category=${child.id}`} 
                                  className="px-4 py-2 text-sm font-display font-semibold rounded-xl hover:bg-[#C17482]/10 hover:text-[#C17482] transition-colors flex items-center justify-between whitespace-nowrap"
                                >
                                  {child.name}
                                  {subChildren.length > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/sub:text-[#C17482] transition-colors" />}
                                </Link>
                                
                                {subChildren.length > 0 && (
                                  <div className="absolute top-0 left-full pl-1 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 z-50">
                                    <div className="min-w-[160px] bg-[#FCF8F8] border border-slate-100 rounded-2xl shadow-xl p-2 flex flex-col gap-1">
                                      {subChildren.map((sub) => (
                                        <Link 
                                          key={sub.id} 
                                          href={`/products?category=${sub.id}`} 
                                          className="px-4 py-2 text-sm font-display font-semibold rounded-xl hover:bg-[#C17482]/10 hover:text-[#C17482] transition-colors whitespace-nowrap"
                                        >
                                          {sub.name}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Mobile: Logo & Hamburger */}
            <div className={`lg:hidden flex items-center gap-2 ${mobileSearchOpen ? 'hidden' : 'flex'}`}>
              <button
                className="p-2 -ml-2 hover:bg-secondary/50 rounded-full transition-colors"
                onClick={() => { setMenuOpen(!menuOpen); setMobileSearchOpen(false); }}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <Link href="/" className="group flex items-center relative z-20">
                <Image
                  src={logoImg}
                  alt="Vaia Charms"
                  width={400}
                  height={400}
                  className="h-14 md:h-18 w-auto object-contain"
                />
              </Link>
            </div>

            <div className="flex items-center gap-0.5 md:gap-3" ref={searchRef}>
              <button
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setMobileSearchOpen(true);
                  } else {
                    setIsSearchFocused(!isSearchFocused);
                  }
                  setMenuOpen(false);
                }}
                className="p-2.5 hover:bg-secondary/50 rounded-full transition-colors relative"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Desktop Search Dropdown (Icon Triggered) */}
              {isSearchFocused && !mobileSearchOpen && (
                <div className="absolute top-full right-0 mt-4 w-96 bg-background rounded-3xl shadow-2xl border p-4 animate-in slide-in-from-top-4 duration-300 z-50">
                  <div className="relative mb-4 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Αναζήτηση προϊόντων..."
                      className="w-full bg-secondary/50 border-none rounded-full py-3 pl-12 pr-6 font-body text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      autoFocus
                    />
                  </div>
                  {isSearching ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-4">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}/`}
                          onClick={() => setIsSearchFocused(false)}
                          className="flex items-center gap-4 p-2 hover:bg-slate-50 rounded-2xl transition-colors group"
                        >
                          <div className="w-12 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                            {product.images?.[0] && (
                              <img src={product.images[0].src} alt={product.name} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-display text-sm font-bold truncate" dangerouslySetInnerHTML={{ __html: product.name }} />
                            <p className="font-body text-xs text-muted-foreground">{product.price}€</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : debouncedQuery.length > 2 && (
                    <div className="py-8 text-center text-sm text-muted-foreground italic">Δεν βρέθηκαν αποτελέσματα</div>
                  )}
                </div>
              )}
              <Link // Changed from <a> to <Link>
                href={isAuthenticated ? "/account" : "/auth"} // Updated 'to' prop based on authentication status
                className="flex p-2.5 hover:bg-secondary/50 rounded-full transition-colors group"
                aria-label="User account"
              >
                <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
              <Link
                href="/favorites"
                className="relative p-2.5 hover:bg-secondary/50 rounded-full transition-colors group"
                aria-label="Favorites"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {favorites.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-[#c4196d] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {favorites.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 hover:bg-secondary/50 rounded-full transition-colors group"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Mobile menu Overlay (Sidebar/Drawer side) */}
      {
        menuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm md:hidden animate-in fade-in duration-300"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed inset-0 z-[110] w-full h-[100dvh] bg-white md:hidden shadow-2xl animate-in slide-in-from-left duration-500 ease-out">
              <div className="flex flex-col h-full bg-white text-slate-900">

                {/* Header of Drawer */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100 bg-white">
                  <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center">
                    <Image
                      src={logoImg}
                      alt="Vaia Charms"
                      width={160}
                      height={55}
                      className="h-12 w-auto object-contain mix-blend-multiply"
                    />
                  </Link>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10 bg-white">
                  {/* Primary Navigation - Dynamic Categories */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground pl-1">Κατηγοριες</p>
                    <div className="grid gap-3">
                      {menuCategories.map((category) => {
                        const children = getChildren(category.id);
                        const isExpanded = expandedCategories.includes(category.id);
                        
                        return (
                          <div key={category.id} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/products?category=${category.id}`}
                                onClick={() => setMenuOpen(false)}
                                className="flex-1 flex items-center gap-4 p-5 bg-slate-50/50 rounded-3xl group active:scale-[0.98] transition-all border border-slate-100 shadow-sm"
                              >
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                  <ShoppingBag className="w-5 h-5 text-primary" />
                                </div>
                                <span className="font-display text-lg font-bold text-slate-800">{category.name}</span>
                              </Link>
                              
                              {children.length > 0 && (
                                <button
                                  onClick={() => toggleCategory(category.id)}
                                  className={`w-14 h-22 flex items-center justify-center bg-slate-50/50 rounded-3xl border border-slate-100 shadow-sm transition-all ${isExpanded ? 'bg-primary/5 border-primary/20' : ''}`}
                                  style={{ height: '76px' }} // Match the height of the Link
                                >
                                  <ChevronDown className={`w-6 h-6 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary' : ''}`} />
                                </button>
                              )}
                            </div>
                            
                            {children.length > 0 && isExpanded && (
                              <div className="grid grid-cols-2 gap-2 px-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                {children.map((child) => (
                                  <Link
                                    key={child.id}
                                    href={`/products?category=${child.id}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="px-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 active:bg-primary active:text-white transition-all shadow-sm flex items-center justify-center text-center"
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      <Link
                        href="/products?on_sale=true"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between p-5 bg-destructive/[0.02] rounded-3xl group active:scale-[0.98] transition-all border border-destructive/5 shadow-sm"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-destructive/10">
                            <ShoppingBag className="w-5 h-5 text-destructive" />
                          </div>
                          <span className="font-display text-lg font-bold text-destructive">Εκπτώσεις</span>
                        </div>
                        <ChevronDown className="-rotate-90 w-4 h-4 text-destructive/40" />
                      </Link>
                    </div>
                  </div>

                  {/* Personal Space */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground pl-1">Ο Λογαριασμος μου</p>
                    <div className="grid gap-3">
                      <Link
                        href={isAuthenticated ? "/account" : "/auth"}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-5 p-5 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98]"
                      >
                        <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-display text-base font-bold text-slate-800">
                            {isAuthenticated ? "Το Προφίλ μου" : "Σύνδεση / Εγγραφή"}
                          </span>
                          <span className="text-xs text-muted-foreground">Διαχειριστείτε τις παραγγελίες σας</span>
                        </div>
                      </Link>
                      <Link
                        href="/favorites"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-5 p-5 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98] relative"
                      >
                        <div className="w-12 h-12 bg-[#c4196d]/5 rounded-2xl flex items-center justify-center">
                          <Heart className="w-6 h-6 text-[#c4196d]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-display text-base font-bold text-slate-800">Τα Αγαπημένα μου</span>
                          <span className="text-xs text-muted-foreground">
                            {favorites.length} {favorites.length === 1 ? "προϊόν" : "προϊόντα"}
                          </span>
                        </div>
                      </Link>
                      <Link
                        href="/"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-5 p-5 bg-white border border-slate-100 rounded-3xl hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98]"
                      >
                        <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center">
                          <Search className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-display text-base font-bold text-slate-800">Υποστήριξη</span>
                          <span className="text-xs text-muted-foreground">Επικοινωνήστε μαζί μας</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Footer of Drawer */}
                <div className="p-8 border-t border-slate-100 bg-white mt-auto">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-muted-foreground font-body leading-relaxed italic">
                      "Η κομψότητα είναι η μόνη ομορφιά που δεν σβήνει ποτέ."
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mt-4">Vaia Charms Official © 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
}
