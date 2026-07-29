"use client";

import { useState } from "react";
import { MapPin, Search, Phone, Navigation, Store } from "lucide-react";

interface StoreLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  type: "gym" | "supermarket" | "kiosk" | "retail";
  distance?: string;
}

const DEMO_STORES: StoreLocation[] = [
  {
    id: 1,
    name: "Fitness Arena Gym",
    address: "Λεωφ. Κηφισίας 120",
    city: "Αθήνα / Αμπελόκηποι",
    zip: "11526",
    phone: "210 6912345",
    type: "gym",
    distance: "0.8 χλμ"
  },
  {
    id: 2,
    name: "Pure Athletics Center",
    address: "Τσιμισκή 45",
    city: "Θεσσαλονίκη",
    zip: "54623",
    phone: "2310 245678",
    type: "gym",
    distance: "1.2 χλμ"
  },
  {
    id: 3,
    name: "Energy Kiosk Central",
    address: "Πανεπιστημίου 32",
    city: "Αθήνα / Κέντρο",
    zip: "10564",
    phone: "210 3245112",
    type: "kiosk",
    distance: "2.1 χλμ"
  },
  {
    id: 4,
    name: "Super Market Bio Life",
    address: "Λεωφ. Μεσογείων 210",
    city: "Χολαργός",
    zip: "15561",
    phone: "210 6534990",
    type: "supermarket",
    distance: "3.5 χλμ"
  }
];

export default function StoreLocatorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredStores = DEMO_STORES.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || store.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <main className="container mx-auto px-4 py-12 md:py-20 max-w-6xl space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs md:text-sm font-bold tracking-widest text-[#E50914] uppercase bg-red-100 dark:bg-red-950/50 px-4 py-1.5 rounded-full inline-block">
          📍 ΒΡΕΙΤΕ ΤΟ ELV8 ΚΟΝΤΑ ΣΑΣ
        </span>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Store Locator
        </h1>
        <p className="text-slate-600 text-base md:text-lg">
          Ανακαλύψτε τα επίσημα σημεία πώλησης του elv8 Energy Drink (Γυμναστήρια, Καταστήματα, Kiosks & Supermarkets).
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Αναζήτηση με Περιοχή, Πόλη ή Διεύθυνση..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#E50914] outline-none text-slate-900 text-sm md:text-base"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {[
              { id: "all", label: "Όλα" },
              { id: "gym", label: "🏋️‍♂️ Γυμναστήρια" },
              { id: "kiosk", label: "🏪 Περίπτερα" },
              { id: "supermarket", label: "🛒 Supermarkets" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedType(filter.id)}
                className={`px-4 py-3 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedType === filter.id
                    ? "bg-[#E50914] text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Layout: Store List + Interactive Map Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Store List */}
        <div className="lg:col-span-5 space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <div
                key={store.id}
                className="bg-white border border-slate-200 hover:border-[#E50914] rounded-2xl p-5 transition-all shadow-sm hover:shadow-md space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
                      {store.type === "gym" ? "Γυμναστήριο" : store.type === "kiosk" ? "Περίπτερο" : "Supermarket"}
                    </span>
                    <h3 className="font-bold text-slate-900 text-lg mt-1">{store.name}</h3>
                  </div>
                  <span className="text-xs font-semibold text-[#E50914] bg-red-50 px-2.5 py-1 rounded-full">
                    {store.distance}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs md:text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#E50914] shrink-0" />
                    <span>{store.address}, {store.city} ({store.zip})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{store.phone}</span>
                  </div>
                </div>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(store.name + " " + store.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full mt-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  ΟΔΗΓΙΕΣ ΠΛΟΗΓΗΣΗΣ (GOOGLE MAPS)
                </a>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <Store className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 font-medium text-sm">
                Δεν βρέθηκαν σημεία πώλησης για τους όρους αναζήτησης.
              </p>
            </div>
          )}
        </div>

        {/* Map Visual Container */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 min-h-[450px] md:min-h-[550px] flex flex-col items-center justify-center text-center text-white relative overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E50914_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 space-y-4 max-w-md">
            <div className="w-16 h-16 bg-[#E50914]/20 border border-[#E50914] rounded-2xl flex items-center justify-center mx-auto text-[#E50914]">
              <MapPin className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold">Interactive Dynamic Store Map</h3>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              Τα σημεία πώλησης ενημερώνονται αυτόματα σε πραγματικό χρόνο από το WordPress Custom Plugin (<code className="text-[#E50914]">store.elv8now.com</code>).
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
