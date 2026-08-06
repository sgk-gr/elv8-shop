import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Σχετικά με το ELV8 | Η Φιλοσοφία & τα Συστατικά Μας",
  description:
    "Μάθετε περισσότερα για το ELV8 Energy Drink. Ένα premium ενεργειακό ποτό χωρίς ζάχαρη, με φυσική καφεΐνη, ηλεκτρολύτες & πνευματική διαύγεια, που δημιουργήθηκε στην Ελλάδα.",
  alternates: {
    canonical: "https://elv8now.com/about",
  },
  openGraph: {
    title: "Σχετικά με το ELV8 | Η Φιλοσοφία & τα Συστατικά Μας",
    description:
      "Μάθετε περισσότερα για το ELV8 Energy Drink. Ένα premium ενεργειακό ποτό χωρίς ζάχαρη, με φυσική καφεΐνη, ηλεκτρολύτες & πνευματική διαύγεια, που δημιουργήθηκε στην Ελλάδα.",
    url: "https://elv8now.com/about",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 675,
        alt: "ELV8 Energy About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Σχετικά με το ELV8 | Η Φιλοσοφία & τα Συστατικά Μας",
    description:
      "Μάθετε περισσότερα για το ELV8 Energy Drink. Ένα premium ενεργειακό ποτό χωρίς ζάχαρη, με φυσική καφεΐνη, ηλεκτρολύτες & πνευματική διαύγεια, που δημιουργήθηκε στην Ελλάδα.",
    images: ["/opengraph-image.png"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
