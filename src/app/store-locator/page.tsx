import { Metadata } from "next";
import StoreLocatorClient from "./StoreLocatorClient";

export const metadata: Metadata = {
  title: "Σημεία Πώλησης ELV8 | Βρείτε το Κοντινότερο Κατάστημα",
  description:
    "Βρείτε όλα τα σημεία πώλησης, καταστήματα, περίπτερα και γυμναστήρια που διαθέτουν το ELV8 Energy Drink στην Αθήνα και σε όλη την Ελλάδα. Αναζητήστε με τον ΤΚ ή την πόλη σας.",
  alternates: {
    canonical: "https://store.elv8now.com/store-locator",
  }
};

export default function StoreLocatorPage() {
  return <StoreLocatorClient />;
}
