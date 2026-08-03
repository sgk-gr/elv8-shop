"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Phone, Navigation } from "lucide-react";

export interface StoreLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  type: "gym" | "supermarket" | "kiosk" | "retail";
  query: string;
}

const FALLBACK_STORES: StoreLocation[] = [
  {
    id: 1,
    name: "Beast Gym",
    address: "Ερμού 1 & Λυκοβρύσεως 14",
    city: "Μεταμόρφωση, Αθήνα",
    zip: "14452",
    phone: "6999524389",
    type: "gym",
    query: "Ερμού 1, Μεταμόρφωση 14452, Ελλάδα",
  },
  {
    id: 2,
    name: "Kastoria Sports & Fitness",
    address: "Μέγας Αλέξανδρος 18",
    city: "Καστοριά",
    zip: "52100",
    phone: "+30 24670 81234",
    type: "gym",
    query: "Μεγάλου Αλεξάνδρου 18, Καστοριά 52100, Ελλάδα",
  },
];

export default function StoreLocatorSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState<StoreLocation>(FALLBACK_STORES[0]);
  const [stores, setStores] = useState<StoreLocation[]>(FALLBACK_STORES);
  const [isOverviewMode, setIsOverviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      setIsLoading(true);
      const endpoints = [
        "https://store.elv8now.com/wp-json/elv8/v1/stores",
        "https://store.elv8now.com/wp-json/wp/v2/elv8_store",
      ];

      for (const url of endpoints) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              const mapped: StoreLocation[] = data.map((item: any, idx: number) => {
                const name = item.name || item.title?.rendered || `Store #${idx + 1}`;
                const address = item.address || item.meta?.address || "";
                const city = item.city || item.meta?.city || "";
                const zip = item.zip || item.meta?.zip || "";
                const phone = item.phone || item.meta?.phone || "";
                const type = item.type || item.meta?.type || "gym";

                const queryParts = [address, city, "Ελλάδα"].filter(Boolean);
                const query = queryParts.length > 1 ? queryParts.join(", ") : `${name}, Ελλάδα`;

                return {
                  id: item.id || idx + 1,
                  name,
                  address: address || "Διεύθυνση μη διαθέσιμη",
                  city: city || "Ελλάδα",
                  zip,
                  phone,
                  type,
                  query,
                };
              });

              setStores(mapped);
              setSelectedStore(mapped[0]);
              setIsLoading(false);
              return;
            }
          }
        } catch {
          // Fallback if network fails
        }
      }

      setStores(FALLBACK_STORES);
      setSelectedStore(FALLBACK_STORES[0]);
      setIsLoading(false);
    };

    fetchStores();
  }, []);

  const filteredStores = stores.filter((store) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      store.name.toLowerCase().includes(q) ||
      store.city.toLowerCase().includes(q) ||
      store.address.toLowerCase().includes(q)
    );
  });

  const getMapEmbedUrl = () => {
    if (isOverviewMode) {
      return `https://maps.google.com/maps?q=${encodeURIComponent("Ελλάδα")}&t=&z=6&ie=UTF8&iwloc=&output=embed`;
    }
    const locationQuery = encodeURIComponent(selectedStore.query || `${selectedStore.name}, ${selectedStore.city}, Ελλάδα`);
    return `https://maps.google.com/maps?q=${locationQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  const openNavigation = (store: StoreLocation, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      store.query || `${store.address}, ${store.city}, Ελλάδα`
    )}`;
    window.open(navUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="w-full bg-[#F7F5EC] py-16 md:py-24 text-slate-900 border-t border-slate-200/60">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Title & Header */}
        <div className="text-center max-w-5xl mx-auto mb-10 space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight md:whitespace-nowrap">
            <span className="font-bold text-[#1E4D7B]">Find ELV8 Stockists </span>
            <span className="font-bold italic text-[#FF1D8E]">Near Your Location.</span>
          </h2>

          {/* Search Box */}
          <div className="pt-4 flex justify-center">
            <div className="flex items-center w-full max-w-md bg-[#EFEDE6] rounded-2xl border border-slate-300/60 overflow-hidden shadow-inner p-1">
              <div className="flex-1 flex items-center px-3 gap-2">
                <input
                  type="text"
                  placeholder="Search ELV8 stockist by city or store..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none font-medium"
                />
              </div>
              <button
                onClick={() => {}}
                className="bg-[#1E4D7B] hover:bg-[#FF1D8E] text-white p-3 rounded-xl transition-colors duration-200 shrink-0"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Counter */}
        <div className="mb-4 flex items-center justify-between gap-2">
          <p className="text-[#1E4D7B] font-bold text-sm tracking-wide">
            {isLoading ? "Loading..." : `${filteredStores.length} Stockists Found`}
          </p>
        </div>

        {/* Clean Map Container */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-slate-300/80 bg-white">
          <div className="w-full h-[480px] md:h-[550px] relative bg-slate-100">
            <iframe
              key={`${selectedStore?.id || 0}-${isOverviewMode}`}
              title="ELV8 Stockist Map"
              width="100%"
              height="100%"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              src={getMapEmbedUrl()}
            />

            {/* Custom ELV8 Logo Pin Badge Overlay */}
            {!isOverviewMode && selectedStore && (
              <div
                onClick={() => openNavigation(selectedStore)}
                className="absolute top-[36%] left-1/2 -translate-x-1/2 -translate-y-full cursor-pointer z-30 flex flex-col items-center animate-bounce group"
                title="Click for Google Maps Navigation"
              >
                <div className="bg-[#1E4D7B] group-hover:bg-[#FF1D8E] text-white px-4 py-2.5 rounded-2xl text-xs font-black shadow-2xl border-2 border-white flex items-center gap-2 transition-all duration-300">
                  <span className="bg-[#FF1D8E] group-hover:bg-white group-hover:text-[#FF1D8E] text-white px-2 py-0.5 rounded-lg text-[11px] font-black italic tracking-widest transition-colors duration-200">
                    ELV8
                  </span>
                  <span className="font-bold text-sm">{selectedStore.name}</span>
                  <Navigation className="w-3.5 h-3.5 ml-1 shrink-0" />
                </div>
                <div className="w-3.5 h-3.5 bg-[#1E4D7B] group-hover:bg-[#FF1D8E] rotate-45 -mt-2 border-r-2 border-b-2 border-white transition-colors duration-200" />
              </div>
            )}

            {/* Bottom Overlay Cards Row inside/overlapping Map */}
            <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto">
              <div className="flex gap-4 overflow-x-auto pb-2 pt-2 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {filteredStores.map((store) => {
                  const isSelected = selectedStore?.id === store.id && !isOverviewMode;
                  return (
                    <div
                      key={store.id}
                      onClick={() => {
                        setSelectedStore(store);
                        setIsOverviewMode(false);
                      }}
                      className={`shrink-0 w-[240px] sm:w-[270px] cursor-pointer rounded-2xl p-4 transition-all duration-300 shadow-xl ${
                        isSelected
                          ? "bg-[#1E4D7B] text-white shadow-2xl scale-[1.02] border-2 border-[#FF1D8E]"
                          : "bg-white text-slate-800 hover:bg-slate-50 border border-slate-200"
                      }`}
                    >
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[9px] font-black italic px-2 py-0.5 rounded-md tracking-wider ${
                            isSelected
                              ? "bg-[#FF1D8E] text-white"
                              : "bg-pink-100 text-[#FF1D8E]"
                          }`}
                        >
                          ELV8
                        </span>
                        <button
                          onClick={(e) => openNavigation(store, e)}
                          className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg transition-colors ${
                            isSelected
                              ? "bg-[#FF1D8E] text-white hover:bg-white hover:text-[#FF1D8E]"
                              : "bg-slate-100 text-[#1E4D7B] hover:bg-[#FF1D8E] hover:text-white"
                          }`}
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Navigate</span>
                        </button>
                      </div>

                      {/* Store Info */}
                      <h4 className="font-bold text-sm leading-snug line-clamp-1 mb-2">
                        {store.name}
                      </h4>

                      <div className="space-y-1.5 text-xs opacity-90">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 shrink-0 opacity-70" />
                          <span className="line-clamp-1">{store.address}, {store.city}</span>
                        </div>
                        {store.phone && (
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 shrink-0 opacity-70" />
                            <span>{store.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
