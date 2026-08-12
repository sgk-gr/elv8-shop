"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  Search,
  Users,
  CheckCircle2,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  RefreshCw,
  Award,
  Layers,
  Sparkles
} from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function GemiClient() {
  const { language } = useTranslation();
  const isEl = language === "el";

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "partners" | "kad" | "documents">("overview");
  const [searchDocQuery, setSearchDocQuery] = useState("");
  const [docFilter, setDocFilter] = useState<"all" | "publication" | "decision">("all");

  useEffect(() => {
    async function loadGemiData() {
      try {
        setLoading(true);
        const res = await fetch("/api/gemi");
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Failed to load GEMI data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGemiData();
  }, []);

  const company = data || {
    coNameEl: "ELV8 Ι.Κ.Ε.",
    coNamesEn: ["ELV8 P.C."],
    coTitlesEl: ["ELV8"],
    arGemi: "195202901000",
    afm: "803354749",
    legalType: { descr: "Ιδιωτική Κεφαλαιουχική Εταιρεία (Ι.Κ.Ε.)" },
    status: { descr: "Ενεργή" },
    incorporationDate: "2026-07-21",
    street: "ΚΑΣΤΡΙΩΤΗ ΓΕΩΡΓΙΟΥ",
    streetNumber: "2-4",
    zipCode: "11476",
    city: "ΑΘΗΝΑ",
    prefecture: { descr: "ΑΤΤΙΚΗΣ" },
    municipality: { descr: "ΑΘΗΝΑΙΩΝ" },
    gemiOffice: { descr: "ΕΜΠΟΡΙΚΟ & ΒΙΟΜΗΧΑΝΙΚΟ ΕΠΙΜΕΛΗΤΗΡΙΟ ΑΘΗΝΩΝ (ΕΒΕΑ)" },
    phone: "6980273388",
    email: "info@elv8now.com",
    capital: [{ capitalStock: 3000 }],
    persons: [
      {
        personName: "ΡΟΥΤΗΣ ΙΩΑΝΝΗΣ ΑΝΑΣΤΑΣΙΟΣ ΚΩΝΣΤΑΝΤΙΝΟΣ",
        role: "Μέλος & Διαχειριστής",
        dtFrom: "2026-07-21",
        percentage: "50%",
      },
      {
        personName: "ΤΡΙΓΩΝΗΣ ΔΗΜΗΤΡΙΟΣ ΚΩΝΣΤΑΝΤΙΝΟΣ",
        role: "Εταίρος - Μέλος",
        dtFrom: "2026-07-21",
        percentage: "50%",
      },
    ],
    activities: [
      {
        activity: { id: "11070000", descr: "ΠΑΡΑΓΩΓΗ ΑΝΑΨΥΚΤΙΚΩΝ ΚΑΙ ΕΜΦΙΑΛΩΜΕΝΩΝ ΝΕΡΩΝ" },
        type: "Κύρια",
        dtFrom: "2026-07-21",
      },
      {
        activity: { id: "46340101", descr: "ΧΟΝΔΡΙΚΟ ΕΜΠΟΡΙΟ ΑΛΛΩΝ ΜΗ ΑΛΚΟΟΛΟΥΧΩΝ ΠΟΤΩΝ" },
        type: "Δευτερεύουσα",
        dtFrom: "2026-07-21",
      },
    ],
    documents: {
      decision: [],
      publication: [
        {
          id: "pub-1",
          title: "Ανακοίνωση Σύστασης Εταιρείας ELV8 Ι.Κ.Ε.",
          date: "2026-07-21",
          type: "Ανακοίνωση Σύστασης (ΥΜΣ/ΓΕΜΗ)",
          url: "https://eyms.businessportal.gr/preview/989e436b93bb68b4322f0e6f39e681e6/announcement-certificate/print",
        },
      ],
    },
  };

  const publications = company.documents?.publication || [];
  const decisions = company.documents?.decision || [];

  const allDocuments = [
    ...publications.map((p: any) => ({ ...p, category: "publication" })),
    ...decisions.map((d: any) => ({ ...d, category: "decision" })),
  ];

  const filteredDocuments = allDocuments.filter((doc) => {
    const matchesFilter = docFilter === "all" || doc.category === docFilter;
    const matchesQuery =
      doc.title.toLowerCase().includes(searchDocQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchDocQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20 pt-28 md:pt-36">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-slate-500 hover:text-[#FF1D8E] transition-colors mb-6 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4" />
          {isEl ? "Επιστροφή στην Αρχική" : "Back to Home"}
        </Link>

        {/* Top Header Card */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 md:p-10 shadow-xl mb-8">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-gradient-to-br from-[#FF1D8E]/30 to-[#FDE047]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-body">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {isEl ? "Live Sync • Επίσημο Μητρώο Γ.Ε.ΜΗ. OpenData" : "Live Sync • Official GEMI OpenData API"}
              </div>

              <h1 className="text-2xl md:text-4xl font-black font-display tracking-tight text-white">
                {company.coNameEl}
              </h1>
              
              <p className="text-slate-300 text-xs md:text-sm font-body leading-relaxed">
                {isEl
                  ? "Δημοσιότητα Εταιρικών Στοιχείων, Πράξεων & Οικονομικών Καταστάσεων σύμφωνα με το Ν. 4919/2022."
                  : "Public Disclosure of Corporate Data, Filings & Financial Statements under Greek Law 4919/2022."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://publicity.businessportal.gr/company/${company.arGemi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#FF1D8E] hover:bg-[#FF1D8E]/90 text-white font-bold text-xs md:text-sm font-body transition-all shadow-lg hover:shadow-pink-500/25 active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                {isEl ? "Προβολή στο portal.businessportal.gr" : "View on GEMI Portal"}
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider font-body block mb-1">
                {isEl ? "Αριθμός Γ.Ε.ΜΗ." : "GEMI Number"}
              </span>
              <span className="text-base md:text-lg font-black text-amber-300 font-mono tracking-wider">
                {company.arGemi}
              </span>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider font-body block mb-1">
                {isEl ? "Α.Φ.Μ." : "Tax ID (AFM)"}
              </span>
              <span className="text-base md:text-lg font-black text-white font-mono tracking-wider">
                {company.afm}
              </span>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider font-body block mb-1">
                {isEl ? "Κατάσταση" : "Status"}
              </span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {company.status?.descr || "Ενεργή"}
              </div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider font-body block mb-1">
                {isEl ? "Εταιρικό Κεφάλαιο" : "Share Capital"}
              </span>
              <span className="text-base md:text-lg font-black text-emerald-400 font-body">
                €{(company.capital?.[0]?.capitalStock || 3000).toLocaleString('el-GR')},00
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-200 scrollbar-none">
          <button
            onClick={() => setActiveTab("overview")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold font-body transition-all whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-slate-900 text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Building2 className="w-4 h-4" />
            {isEl ? "Βασικά Στοιχεία & Έδρα" : "Corporate Profile"}
          </button>

          <button
            onClick={() => setActiveTab("partners")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold font-body transition-all whitespace-nowrap ${
              activeTab === "partners"
                ? "bg-slate-900 text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Users className="w-4 h-4" />
            {isEl ? "Διοίκηση & Εταίροι" : "Management & Shareholders"}
          </button>

          <button
            onClick={() => setActiveTab("kad")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold font-body transition-all whitespace-nowrap ${
              activeTab === "kad"
                ? "bg-slate-900 text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Layers className="w-4 h-4" />
            {isEl ? "Δραστηριότητες (ΚΑΔ)" : "Activities (KAD)"}
          </button>

          <button
            onClick={() => setActiveTab("documents")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold font-body transition-all whitespace-nowrap relative ${
              activeTab === "documents"
                ? "bg-[#FF1D8E] text-white shadow-md shadow-pink-500/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            {isEl ? "Δημοσιεύσεις & Αρχεία PDF" : "GEMI PDF Files & Documents"}
            <span className="px-1.5 py-0.5 text-[10px] bg-white/20 rounded-full">
              {allDocuments.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Identity Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
              <h2 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <ShieldCheck className="w-5 h-5 text-[#FF1D8E]" />
                {isEl ? "Νομική Ταυτότητα & Μητρώο" : "Legal Identity & Registry"}
              </h2>

              <div className="space-y-3 text-xs md:text-sm font-body">
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">{isEl ? "Επωνυμία:" : "Company Name:"}</span>
                  <span className="font-bold text-slate-900">{company.coNameEl}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">{isEl ? "Διακριτικός Τίτλος:" : "Trade Name:"}</span>
                  <span className="font-bold text-slate-900">{company.coTitlesEl?.[0] || "ELV8"}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">{isEl ? "Νομική Μορφή:" : "Legal Type:"}</span>
                  <span className="font-bold text-slate-900">{company.legalType?.descr}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">{isEl ? "Αρμόδια Υπηρεσία Γ.Ε.ΜΗ.:" : "GEMI Authority:"}</span>
                  <span className="font-bold text-slate-900 text-right">{company.gemiOffice?.descr}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">{isEl ? "Ημερομηνία Σύστασης:" : "Incorporation Date:"}</span>
                  <span className="font-bold text-slate-900">
                    {new Date(company.incorporationDate).toLocaleDateString('el-GR')}
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-slate-500">{isEl ? "Δ.Ο.Υ.:" : "Tax Office:"}</span>
                  <span className="font-bold text-slate-900">Α' Αθηνών</span>
                </div>
              </div>
            </div>

            {/* Address & Contact */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
              <h2 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <MapPin className="w-5 h-5 text-[#FF1D8E]" />
                {isEl ? "Έδρα & Στοιχεία Επικοινωνίας" : "Registered Office & Contact"}
              </h2>

              <div className="space-y-4 text-xs md:text-sm font-body">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <MapPin className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {company.street} {company.streetNumber}
                    </span>
                    <span className="text-slate-500 block">
                      Τ.Κ. {company.zipCode}, {company.city}, {company.prefecture?.descr}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <Phone className="w-5 h-5 text-slate-500 shrink-0" />
                  <div>
                    <span className="text-slate-500 text-[11px] block">{isEl ? "Τηλέφωνο:" : "Phone:"}</span>
                    <span className="font-bold text-slate-900">{company.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <Mail className="w-5 h-5 text-slate-500 shrink-0" />
                  <div>
                    <span className="text-slate-500 text-[11px] block">{isEl ? "Ηλεκτρονικό Ταχυδρομείο:" : "Email:"}</span>
                    <span className="font-bold text-slate-900">{company.email}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-slate-500 text-xs block mb-1">
                    {isEl ? "Επίσημη Ιστοσελίδα E-Shop:" : "Official E-Shop Website:"}
                  </span>
                  <a
                    href="https://elv8now.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-[#FF1D8E] hover:underline"
                  >
                    https://elv8now.com
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Partners */}
        {activeTab === "partners" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#FF1D8E]" />
                    {isEl ? "Διαχειριστές & Εταίροι Εταιρείας" : "Management Board & Shareholders"}
                  </h2>
                  <p className="text-slate-500 text-xs font-body mt-1">
                    {isEl
                      ? "Συνολικό Εταιρικό Κεφάλαιο: €3.000,00 (2 Κεφαλαιακά Μερίδια των €1.500,00)"
                      : "Total Share Capital: €3,000.00 (2 Capital Shares of €1,500.00 each)"}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {(company.persons || []).map((person: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#FF1D8E] uppercase tracking-wider bg-pink-100/60 px-2.5 py-1 rounded-full inline-block mb-1">
                          {person.role}
                        </span>
                        <h3 className="font-bold text-slate-900 text-sm md:text-base">
                          {person.personName}
                        </h3>
                      </div>
                      <span className="text-lg font-black text-slate-900 font-body bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs">
                        {person.percentage || "50%"}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 font-body space-y-1 pt-2 border-t border-slate-200/60">
                      <div className="flex justify-between">
                        <span>{isEl ? "Κατηγορία:" : "Category:"}</span>
                        <span className="font-semibold text-slate-700">{person.category || "Εταίροι"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{isEl ? "Ημερομηνία Ορισμού:" : "Appointment Date:"}</span>
                        <span className="font-semibold text-slate-700">
                          {new Date(person.dtFrom).toLocaleDateString('el-GR')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Activities (KAD) */}
        {activeTab === "kad" && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <h2 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Layers className="w-5 h-5 text-[#FF1D8E]" />
              {isEl ? "Κωδικοί Αριθμοί Δραστηριότητας (ΚΑΔ)" : "Business Activity Codes (KAD)"}
            </h2>

            <div className="space-y-3">
              {(company.activities || []).map((actItem: any, idx: number) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <div className="flex items-start gap-3">
                    <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs font-bold shrink-0">
                      {actItem.activity?.id}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs md:text-sm">
                        {actItem.activity?.descr}
                      </h3>
                      <span className="text-[11px] text-slate-500">
                        {isEl ? "Έναρξη: " : "Start: "}
                        {new Date(actItem.dtFrom).toLocaleDateString('el-GR')}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold w-fit shrink-0 ${
                      actItem.type === "Κύρια"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-slate-200/60 text-slate-700"
                    }`}
                  >
                    {actItem.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Documents & PDFs */}
        {activeTab === "documents" && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#FF1D8E]" />
                  {isEl ? "Δημοσιεύσεις & Αρχεία PDF στο Γ.Ε.ΜΗ." : "Official GEMI Publications & PDF Files"}
                </h2>
                <p className="text-slate-500 text-xs font-body mt-1">
                  {isEl
                    ? "Όλα τα έγγραφα, ανακοινώσεις και ισολογισμοί της εταιρείας που καταχωρούνται στο Γ.Ε.ΜΗ."
                    : "All company filings, announcements and financial statements registered with GEMI."}
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDocFilter("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    docFilter === "all"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {isEl ? "Όλα" : "All"}
                </button>
                <button
                  onClick={() => setDocFilter("publication")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    docFilter === "publication"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {isEl ? "Ανακοινώσεις" : "Announcements"}
                </button>
              </div>
            </div>

            {/* Document List */}
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-600 font-body">
                  {isEl ? "Δεν βρέθηκαν έγγραφα." : "No documents found."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredDocuments.map((doc: any, idx: number) => (
                  <div
                    key={doc.id || idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 hover:bg-pink-50/30 border border-slate-200/80 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-pink-100 text-[#FF1D8E] shrink-0 group-hover:scale-105 transition-transform">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                          {doc.type} • {new Date(doc.date).toLocaleDateString('el-GR')}
                        </span>
                        <h3 className="font-bold text-slate-900 text-sm md:text-base">
                          {doc.title}
                        </h3>
                      </div>
                    </div>

                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#FF1D8E] text-white font-bold text-xs font-body transition-colors shrink-0 shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                      {isEl ? "Προβολή / Λήψη PDF" : "View / Download PDF"}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer legal note */}
        <div className="mt-12 text-center text-xs text-slate-400 font-body max-w-3xl mx-auto space-y-2">
          <p>
            {isEl
              ? "Πηγή δεδομένων: Κεντρική Υπηρεσία ΓΕΜΗ (ΚΕΕΕ) • OpenData API. Τα δεδομένα ανανεώνονται αυτόματα."
              : "Data source: Central GEMI Service (UHC) • OpenData API. Data automatically synchronized."}
          </p>
          <p>
            {isEl
              ? "© ELV8 Ι.Κ.Ε. — Αρ. Γ.Ε.ΜΗ. 195202901000 — ΑΦΜ 803354749"
              : "© ELV8 P.C. — GEMI No. 195202901000 — Tax ID 803354749"}
          </p>
        </div>

      </div>
    </main>
  );
}
