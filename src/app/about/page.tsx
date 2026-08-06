import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Σχετικά με το ELV8 | Η Φιλοσοφία & τα Συστατικά Μας",
  description:
    "Μάθετε περισσότερα για το ELV8 Energy Drink. Ένα premium ενεργειακό ποτό χωρίς ζάχαρη, με φυσική καφεΐνη, ηλεκτρολύτες & νοοτροπικά, που δημιουργήθηκε στην Ελλάδα.",
  alternates: {
    canonical: "https://store.elv8now.com/about",
  }
};

export default function AboutPage() {
  return <AboutClient />;
}
