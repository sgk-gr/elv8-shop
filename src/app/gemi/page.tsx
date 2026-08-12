import { Metadata } from "next";
import GemiClient from "./GemiClient";

export const metadata: Metadata = {
  title: "Στοιχεία Γ.Ε.ΜΗ. | ELV8 Energy",
  description:
    "Επίσημα δημοσιευμένα στοιχεία Γ.Ε.ΜΗ. της εταιρείας ELV8 Ι.Κ.Ε. (Αρ. Γ.Ε.ΜΗ. 195202901000, ΑΦΜ 803354749). Δείτε αποφάσεις, καταστατικό, εταιρικό κεφάλαιο και έγγραφα δημοσιότητας.",
  alternates: {
    canonical: "https://elv8now.com/gemi",
  },
  openGraph: {
    title: "Στοιχεία Γ.Ε.ΜΗ. | ELV8 Energy",
    description:
      "Επίσημα δημοσιευμένα στοιχεία Γ.Ε.ΜΗ. της εταιρείας ELV8 Ι.Κ.Ε. (Αρ. Γ.Ε.ΜΗ. 195202901000, ΑΦΜ 803354749).",
    url: "https://elv8now.com/gemi",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 675,
        alt: "ELV8 Energy GEMI Disclosures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Στοιχεία Γ.Ε.ΜΗ. | ELV8 Energy",
    description:
      "Επίσημα δημοσιευμένα στοιχεία Γ.Ε.ΜΗ. της εταιρείας ELV8 Ι.Κ.Ε. (Αρ. Γ.Ε.ΜΗ. 195202901000, ΑΦΜ 803354749).",
    images: ["/opengraph-image.png"],
  },
};

export default function GemiPage() {
  return <GemiClient />;
}
