"use client";

import { useState, useEffect } from "react";
import { MapPin, Search, Phone, Navigation, Store, Download, ExternalLink } from "lucide-react";

interface StoreLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  type: "gym" | "supermarket" | "kiosk" | "retail";
  distance?: string;
  lat: number;
  lng: number;
}

const DEFAULT_STORES: StoreLocation[] = [
  {
    id: 1,
    name: "Fitness Arena Gym",
    address: "Λεωφ. Κηφισίας 120",
    city: "Αθήνα / Αμπελόκηποι",
    zip: "11526",
    phone: "210 6912345",
    type: "gym",
    distance: "0.8 χλμ",
    lat: 37.9942,
    lng: 23.7661
  },
  {
    id: 2,
    name: "Pure Athletics Center",
    address: "Τσιμισκή 45",
    city: "Θεσσαλονίκη",
    zip: "54623",
    phone: "2310 245678",
    type: "gym",
    distance: "1.2 χλμ",
    lat: 40.6323,
    lng: 22.9431
  },
  {
    id: 3,
    name: "Energy Kiosk Central",
    address: "Πανεπιστημίου 32",
    city: "Αθήνα / Κέντρο",
    zip: "10564",
    phone: "210 3245112",
    type: "kiosk",
    distance: "2.1 χλμ",
    lat: 37.9801,
    lng: 23.7335
  },
  {
    id: 4,
    name: "Super Market Bio Life",
    address: "Λεωφ. Μεσογείων 210",
    city: "Χολαργός",
    zip: "15561",
    phone: "210 6534990",
    type: "supermarket",
    distance: "3.5 χλμ",
    lat: 38.0019,
    lng: 23.7994
  }
];

export default function StoreLocatorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStore, setSelectedStore] = useState<StoreLocation>(DEFAULT_STORES[0]);
  const [stores, setStores] = useState<StoreLocation[]>(DEFAULT_STORES);

  useEffect(() => {
    // Attempt fetching live stores from WordPress API endpoint
    const fetchStores = async () => {
      const endpoints = [
        "https://store.elv8now.com/wp-json/elv8/v1/stores",
        "https://store.elv8now.com/wp-json/wp/v2/elv8_store"
      ];

      for (const url of endpoints) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              const mapped = data.map((item: any, idx: number) => ({
                id: item.id || idx + 1,
                name: item.name || item.title?.rendered || `Store #${idx + 1}`,
                address: item.address || item.meta?.address || "Athens, Greece",
                city: item.city || item.meta?.city || "Athens",
                zip: item.zip || item.meta?.zip || "10431",
                phone: item.phone || item.meta?.phone || "+30 210 0000000",
                type: item.type || item.meta?.type || "gym",
                distance: "1.0 χλμ",
                lat: parseFloat(item.lat || item.meta?.lat || "37.9838"),
                lng: parseFloat(item.lng || item.meta?.lng || "23.7275"),
              }));
              setStores(mapped);
              setSelectedStore(mapped[0]);
              break;
            }
          }
        } catch (e) {
          // Continue to next endpoint or fallback
        }
      }
    };

    fetchStores();
  }, []);

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || store.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getMapEmbedUrl = (store: StoreLocation) => {
    const query = encodeURIComponent(`${store.name}, ${store.address}, ${store.city}`);
    return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <main className="min-h-screen pt-28 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            Βρείτε τα πλησιέστερα γυμναστήρια, supermarkets, kiosks και καταστήματα που διαθέτουν το elv8 Energy Drink.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Αναζήτηση με περιοχή, πόλη ή διεύθυνση..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#FF1D8E] outline-none text-slate-900 text-sm md:text-base font-medium"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              {[
                { id: "all", label: "Όλα" },
                { id: "gym", label: "Γυμναστήρια" },
                { id: "kiosk", label: "Περίπτερα" },
                { id: "supermarket", label: "Supermarkets" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedType(filter.id)}
                  className={`px-5 py-3 rounded-2xl text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                    selectedType === filter.id
                      ? "bg-[#FF1D8E] text-white shadow-lg shadow-[#FF1D8E]/20"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Layout: Store List + Live Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Store List */}
          <div className="lg:col-span-5 space-y-4 max-h-[620px] overflow-y-auto pr-1">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => {
                const isSelected = selectedStore.id === store.id;
                return (
                  <div
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
                    className={`cursor-pointer bg-white border rounded-3xl p-6 transition-all space-y-3 ${
                      isSelected
                        ? "border-[#FF1D8E] ring-2 ring-[#FF1D8E]/20 shadow-md bg-pink-50/20"
                        : "border-slate-200 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-black tracking-wider px-3 py-1 bg-slate-100 text-slate-800 rounded-full">
                          {store.type === "gym" ? "Γυμναστήριο" : store.type === "kiosk" ? "Περίπτερο" : "Supermarket"}
                        </span>
                        <h3 className="font-bold font-display text-slate-900 text-lg mt-2">{store.name}</h3>
                      </div>
                      {store.distance && (
                        <span className="text-xs font-bold text-[#FF1D8E] bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                          {store.distance}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 text-xs md:text-sm text-slate-600 font-medium">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#FF1D8E] shrink-0" />
                        <span>{store.address}, {store.city} ({store.zip})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{store.phone}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex gap-3">
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(store.name + " " + store.address)}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-2 flex-1 py-3 bg-slate-900 hover:bg-[#FF1D8E] text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        Οδηγίες Χάρτη
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300 space-y-3">
                <Store className="w-12 h-12 text-slate-400 mx-auto" />
                <p className="text-slate-600 font-bold text-sm">
                  Δεν βρέθηκαν σημεία πώλησης για την αναζήτησή σας.
                </p>
              </div>
            )}
          </div>

          {/* Interactive Google Map Box */}
          <div className="lg:col-span-7 bg-slate-100 rounded-3xl overflow-hidden min-h-[500px] lg:h-[620px] border border-slate-200 shadow-md relative flex flex-col">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#FF1D8E]" />
                <span className="font-bold text-sm font-display">{selectedStore.name}</span>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(selectedStore.name + " " + selectedStore.address)}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-medium"
              >
                Άνοιγμα σε Google Maps
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex-1 w-full h-full relative">
              <iframe
                title="Store Location Map"
                width="100%"
                height="100%"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                src={getMapEmbedUrl(selectedStore)}
              />
              {/* Custom ELV8 Map Pin Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-20 flex flex-col items-center animate-bounce">
                <div className="bg-black text-white px-3 py-1.5 rounded-full font-black text-xs tracking-tighter uppercase italic shadow-2xl border-2 border-[#FF1D8E] flex items-center gap-1.5">
                  <span className="text-[#FF1D8E] font-extrabold text-sm">elv8</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF1D8E] animate-ping" />
                </div>
                <div className="w-4 h-4 bg-[#FF1D8E] rotate-45 -mt-2 shadow-lg border border-black" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
