import { Metadata } from "next";
import B2BWholesaleClient from "./B2BWholesaleClient";

export const metadata: Metadata = {
  title: "Χονδρική B2B & Διανομή Ενεργειακών Ποτών ELV8",
  description:
    "Γίνετε συνεργάτης χονδρικής ELV8 Energy Drink στην Ελλάδα. Υψηλά περιθώρια κέρδους, γρήγορη παράδοση 24-48 ωρών, POS & marketing υποστήριξη για γυμναστήρια, μίνι μάρκετ & λιανική.",
  alternates: {
    canonical: "https://store.elv8now.com/b2b-wholesale",
  }
};

export default function B2BWholesalePage() {
  return <B2BWholesaleClient />;
}
