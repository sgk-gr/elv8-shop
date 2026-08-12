import { NextResponse } from "next/server";

const GEMI_API_KEY = "1QV0mFBoWsaprgiphMaBKEANZL0tRCc5";
const GEMI_AFM = "803354749";
const GEMI_AR_GEMI = "195202901000";
const GEMI_BASE_URL = "https://opendata-api.businessportal.gr/api/opendata/v1";

// In-memory server cache to strictly honor rate limit (max 8 req/min)
let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache

// Comprehensive baseline fallback matching official GEMI record
const FALLBACK_COMPANY_DATA = {
  arGemi: "195202901000",
  afm: "803354749",
  coNameEl: "ELV8 Ι.Κ.Ε.",
  coNamesEn: ["ELV8 P.C."],
  coTitlesEl: ["ELV8"],
  coTitlesEn: ["ELV8"],
  legalType: { id: 19, descr: "Ιδιωτική Κεφαλαιουχική Εταιρεία (Ι.Κ.Ε.)" },
  status: { id: 3, descr: "Ενεργή" },
  incorporationDate: "2026-07-21",
  lastStatusChange: "2026-07-21",
  street: "ΚΑΣΤΡΙΩΤΗ ΓΕΩΡΓΙΟΥ",
  streetNumber: "2-4",
  zipCode: "11476",
  city: "ΑΘΗΝΑ",
  prefecture: { id: 5, descr: "ΑΤΤΙΚΗΣ" },
  municipality: { id: 61205, descr: "ΑΘΗΝΑΙΩΝ / ΚΕΝΤΡΙΚΟΥ ΤΟΜΕΑ ΑΘΗΝΩΝ" },
  gemiOffice: { id: 1, descr: "ΕΜΠΟΡΙΚΟ & ΒΙΟΜΗΧΑΝΙΚΟ ΕΠΙΜΕΛΗΤΗΡΙΟ ΑΘΗΝΩΝ (ΕΒΕΑ)" },
  phone: "6980273388",
  email: "info@elv8now.com",
  url: "https://elv8now.com",
  capital: [
    {
      capitalStock: 3000,
      currency: "Euro",
      ecsokefalaiikes: 0,
      eggiitikes: 0,
    },
  ],
  stocks: [
    {
      stockTypeId: 7,
      amount: 2,
      nominalPrice: 1500,
      stockType: "Κεφαλαιικές",
    },
  ],
  persons: [
    {
      personName: "ΡΟΥΤΗΣ ΙΩΑΝΝΗΣ ΑΝΑΣΤΑΣΙΟΣ ΚΩΝΣΤΑΝΤΙΝΟΣ",
      role: "Μέλος & Διαχειριστής",
      dtFrom: "2026-07-21",
      category: "Εταίροι & Διαχειριστές",
      percentage: "50%",
    },
    {
      personName: "ΤΡΙΓΩΝΗΣ ΔΗΜΗΤΡΙΟΣ ΚΩΝΣΤΑΝΤΙΝΟΣ",
      role: "Εταίρος - Μέλος",
      dtFrom: "2026-07-21",
      category: "Εταίροι",
      percentage: "50%",
    },
  ],
  activities: [
    {
      activity: {
        id: "11070000",
        descr: "ΠΑΡΑΓΩΓΗ ΑΝΑΨΥΚΤΙΚΩΝ ΚΑΙ ΕΜΦΙΑΛΩΜΕΝΩΝ ΝΕΡΩΝ",
      },
      type: "Κύρια",
      dtFrom: "2026-07-21",
    },
    {
      activity: {
        id: "46340101",
        descr: "ΧΟΝΔΡΙΚΟ ΕΜΠΟΡΙΟ ΑΛΛΩΝ ΜΗ ΑΛΚΟΟΛΟΥΧΩΝ ΠΟΤΩΝ",
      },
      type: "Δευτερεύουσα",
      dtFrom: "2026-07-21",
    },
    {
      activity: {
        id: "46340100",
        descr: "ΥΠΗΡΕΣΙΕΣ ΧΟΝΔΡΙΚΟΥ ΕΜΠΟΡΙΟΥ ΧΥΜΩΝ, ΜΕΤΑΛΛΙΚΩΝ ΝΕΡΩΝ, ΑΝΑΨΥΚΤΙΚΩΝ ΚΑΙ ΑΛΛΩΝ ΜΗ ΑΛΚΟΟΛΟΥΧΩΝ ΠΟΤΩΝ",
      },
      type: "Δευτερεύουσα",
      dtFrom: "2026-07-21",
    },
    {
      activity: {
        id: "10320000",
        descr: "ΠΑΡΑΓΩΓΗ ΧΥΜΩΝ ΦΡΟΥΤΩΝ ΚΑΙ ΛΑΧΑΝΙΚΩΝ",
      },
      type: "Δευτερεύουσα",
      dtFrom: "2026-07-21",
    },
    {
      activity: {
        id: "10890000",
        descr: "ΠΑΡΑΓΩΓΗ ΑΛΛΩΝ ΕΙΔΩΝ ΔΙΑΤΡΟΦΗΣ Π.Δ.Κ.Α.",
      },
      type: "Δευτερεύουσα",
      dtFrom: "2026-07-21",
    },
    {
      activity: {
        id: "11071200",
        descr: "ΠΑΡΑΓΩΓΗ ΑΛΛΩΝ ΜΗ ΑΛΚΟΟΛΟΥΧΩΝ ΠΟΤΩΝ",
      },
      type: "Δευτερεύουσα",
      dtFrom: "2026-07-21",
    },
    {
      activity: {
        id: "20421500",
        descr: "ΠΑΡΑΓΩΓΗ ΠΑΡΑΣΚΕΥΑΣΜΑΤΩΝ ΟΜΟΡΦΙΑΣ, ΜΑΚΙΓΙΑΖ Η ΦΡΟΝΤΙΔΑΣ ΤΟΥ ΔΕΡΜΑΤΟΣ Π.Δ.Κ.Α.",
      },
      type: "Δευτερεύουσα",
      dtFrom: "2026-07-21",
    },
  ],
  documents: {
    decision: [],
    publication: [
      {
        id: "pub-195202901000-01",
        title: "Ανακοίνωση Σύστασης Εταιρείας ELV8 Ι.Κ.Ε.",
        date: "2026-07-21",
        type: "Ανακοίνωση Σύστασης (ΥΜΣ/ΓΕΜΗ)",
        url: "https://eyms.businessportal.gr/preview/989e436b93bb68b4322f0e6f39e681e6/announcement-certificate/print",
      },
    ],
  },
};

export async function GET() {
  const now = Date.now();

  // Return cached data if fresh
  if (cachedData && now - lastFetchTime < CACHE_TTL_MS) {
    return NextResponse.json({
      success: true,
      source: "cache",
      data: cachedData,
    });
  }

  try {
    // 1. Fetch Company Info
    const companyRes = await fetch(`${GEMI_BASE_URL}/companies?afm=${GEMI_AFM}`, {
      headers: {
        api_key: GEMI_API_KEY,
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    let companyData = FALLBACK_COMPANY_DATA;

    if (companyRes.ok) {
      const companyJson = await companyRes.json();
      if (companyJson.searchResults && companyJson.searchResults.length > 0) {
        companyData = { ...FALLBACK_COMPANY_DATA, ...companyJson.searchResults[0] };
      }
    }

    // 2. Fetch Documents / PDFs
    try {
      const docsRes = await fetch(`${GEMI_BASE_URL}/companies/${companyData.arGemi || GEMI_AR_GEMI}/documents`, {
        headers: {
          api_key: GEMI_API_KEY,
          Accept: "application/json",
        },
        next: { revalidate: 3600 },
      });

      if (docsRes.ok) {
        const docsJson = await docsRes.json();
        const formattedPublications = (docsJson.publication || []).map((pub: any, idx: number) => ({
          id: pub.id || `pub-${idx + 1}`,
          title: pub.title || pub.descr || `Ανακοίνωση Δημοσιότητας Γ.Ε.ΜΗ. #${idx + 1}`,
          date: pub.date || pub.dtFrom || companyData.incorporationDate,
          type: pub.type || "Δημοσίευση Γ.Ε.ΜΗ.",
          url: pub.url || pub.fileUrl || "https://eyms.businessportal.gr/preview/989e436b93bb68b4322f0e6f39e681e6/announcement-certificate/print",
        }));

        const formattedDecisions = (docsJson.decision || []).map((dec: any, idx: number) => ({
          id: dec.id || `dec-${idx + 1}`,
          title: dec.title || dec.descr || `Απόφαση / Πρακτικό Οργάνου #${idx + 1}`,
          date: dec.date || dec.dtFrom || companyData.incorporationDate,
          type: dec.type || "Απόφαση Οργάνου",
          url: dec.url || dec.fileUrl || "#",
        }));

        companyData.documents = {
          decision: formattedDecisions,
          publication: formattedPublications.length > 0 ? formattedPublications : FALLBACK_COMPANY_DATA.documents.publication,
        };
      }
    } catch (docErr) {
      console.warn("GEMI Documents API fetch fallback:", docErr);
    }

    cachedData = companyData;
    lastFetchTime = now;

    return NextResponse.json({
      success: true,
      source: "api",
      data: companyData,
    });
  } catch (error: any) {
    console.error("GEMI API Error, utilizing fallback:", error);
    return NextResponse.json({
      success: true,
      source: "fallback",
      data: FALLBACK_COMPANY_DATA,
    });
  }
}
