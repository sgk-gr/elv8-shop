"use client";

import { ChevronLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const { t, language } = useTranslation();
    const isEl = language === "el";

    const faqs = [
        {
            category: isEl ? "Παραγγελίες & Αποστολές" : "Orders & Shipping",
            questions: [
                {
                    q: isEl ? "Πώς μπορώ να παραγγείλω;" : "How can I order?",
                    a: isEl ? "Μπορείτε να παραγγείλετε εύκολα μέσω της ιστοσελίδας μας. Προσθέστε τα ELV8 Energy Drinks που επιθυμείτε στο καλάθι σας, συμπληρώστε τα στοιχεία σας και ολοκληρώστε την πληρωμή. Θα λάβετε email επιβεβαίωσης αμέσως μετά την παραγγελία." : "You can easily order through our website. Add the ELV8 Energy Drinks you want to your cart, fill in your details and complete the payment. You will receive a confirmation email immediately after."
                },
                {
                    q: isEl ? "Πόσο κοστίζουν τα μεταφορικά;" : "How much is shipping?",
                    a: isEl ? "Τα μεταφορικά έξοδα είναι 4,50€ για παραγγελίες κάτω των 65€. Για παραγγελίες άνω των 65€, τα μεταφορικά είναι ΔΩΡΕΑΝ σε όλη την Ελλάδα! Κόστος αντικαταβολής 2€." : "Shipping costs are €4.50 for orders under €65. For orders over €65, shipping is FREE all over Greece! Cash on delivery cost is €2."
                },
                {
                    q: isEl ? "Πόσος χρόνος χρειάζεται για την παράδοση;" : "How long does delivery take?",
                    a: isEl ? "Οι παραγγελίες παραδίδονται εντός 2-4 εργάσιμων ημερών σε όλη την Ελλάδα." : "Orders are delivered within 2-4 working days all over Greece."
                },
                {
                    q: isEl ? "Μπορώ να παραλάβω από κατάστημα;" : "Can I pick up from a store?",
                    a: isEl ? "Χρησιμοποιήστε τον Store Locator για να βρείτε το κοντινότερο σημείο πώλησης ELV8 Energy στην περιοχή σας." : "Use the Store Locator to find the nearest ELV8 Energy sales point in your area."
                },
                {
                    q: isEl ? "Μπορώ να αλλάξω τη διεύθυνση αποστολής μετά την παραγγελία;" : "Can I change my shipping address after ordering?",
                    a: isEl ? "Εάν η παραγγελία σας δεν έχει ακόμα αποσταλεί, επικοινωνήστε άμεσα μαζί μας στο info@elv8now.com για να αλλάξετε τη διεύθυνση αποστολής." : "If your order has not been shipped yet, contact us immediately at info@elv8now.com to change the shipping address."
                }
            ]
        },
        {
            category: isEl ? "Πληρωμές" : "Payments",
            questions: [
                {
                    q: isEl ? "Ποιες μεθόδους πληρωμής δέχεστε;" : "What payment methods do you accept?",
                    a: isEl ? "Δεχόμαστε:\n\n1. Πιστωτική / Χρεωστική Κάρτα (Visa, Mastercard, Maestro)\n2. IRIS Payments – άμεση πληρωμή μέσω e-banking\n3. Αντικαταβολή – πληρωμή κατά την παράδοση (+ 2€)\n4. Τραπεζική Κατάθεση – επικοινωνήστε μαζί μας για στοιχεία λογαριασμού" : "We accept:\n\n1. Credit / Debit Card (Visa, Mastercard, Maestro)\n2. IRIS Payments – direct payment via e-banking\n3. Cash on Delivery – payment upon delivery (+ €2)\n4. Bank Transfer – contact us for account details"
                },
                {
                    q: isEl ? "Είναι ασφαλείς οι πληρωμές;" : "Are payments secure?",
                    a: isEl ? "Απολύτως. Όλες οι συναλλαγές γίνονται μέσω κρυπτογραφημένου περιβάλλοντος SSL. Τα στοιχεία της κάρτας σας δεν αποθηκεύονται ποτέ στους servers μας." : "Absolutely. All transactions are processed through an encrypted SSL environment. Your card details are never stored on our servers."
                },
                {
                    q: isEl ? "Πότε χρεώνεται η κάρτα μου;" : "When is my card charged?",
                    a: isEl ? "Η χρέωση γίνεται αμέσως κατά την ολοκλήρωση της παραγγελίας. Σε περίπτωση ακύρωσης, η επιστροφή χρημάτων πραγματοποιείται εντός 3-5 εργάσιμων ημερών." : "The charge is made immediately upon order completion. In case of cancellation, refunds are processed within 3-5 working days."
                }
            ]
        },
        {
            category: isEl ? "Προϊόντα ELV8" : "ELV8 Products",
            questions: [
                {
                    q: isEl ? "Τι κάνει το ELV8 Energy διαφορετικό;" : "What makes ELV8 Energy different?",
                    a: isEl ? "Το ELV8 Energy Drink είναι φτιαγμένο με φυσικά συστατικά, 200mg καφεΐνης φυσικής προέλευσης, ηλεκτρολύτες και μηδενική ζάχαρη. Η ιδανική επιλογή για αθλητές, επαγγελματίες και όλους όσους αναζητούν φυσική ενέργεια χωρίς συμβιβασμούς." : "ELV8 Energy Drink is made with natural ingredients, 200mg of natural caffeine, electrolytes, and zero sugar. The ideal choice for athletes, professionals, and anyone seeking natural energy without compromise."
                },
                {
                    q: isEl ? "Περιέχει ζάχαρη;" : "Does it contain sugar?",
                    a: isEl ? "Όχι! Το ELV8 Energy είναι Zero Sugar – χωρίς ζάχαρη και χωρίς περιττές θερμίδες. Γλυκαίνεται με φυσικά γλυκαντικά." : "No! ELV8 Energy is Zero Sugar – no sugar and no unnecessary calories. It is sweetened with natural sweeteners."
                },
                {
                    q: isEl ? "Ποιοι πρέπει να αποφεύγουν τα ενεργειακά ποτά;" : "Who should avoid energy drinks?",
                    a: isEl ? "Τα ενεργειακά ποτά δεν συνιστώνται σε:\n\n• Άτομα κάτω των 18 ετών\n• Εγκύους και θηλάζουσες\n• Άτομα ευαίσθητα στην καφεΐνη\n• Άτομα με καρδιολογικά προβλήματα\n\nΣε κάθε περίπτωση, συμβουλευτείτε τον γιατρό σας." : "Energy drinks are not recommended for:\n\n• Individuals under 18 years old\n• Pregnant and nursing women\n• Caffeine-sensitive individuals\n• Individuals with heart conditions\n\nIn any case, consult your doctor."
                },
                {
                    q: isEl ? "Πόσα κουτιά μπορώ να παραγγείλω;" : "How many cans can I order?",
                    a: isEl ? "Δεν υπάρχει μέγιστος αριθμός κουτιών ανά παραγγελία. Για μεγάλες ποσότητες ή χονδρική, επισκεφθείτε τη σελίδα μας B2B Wholesale ή επικοινωνήστε στο info@elv8now.com." : "There is no maximum limit per order. For large quantities or wholesale, visit our B2B Wholesale page or contact info@elv8now.com."
                },
                {
                    q: isEl ? "Διαθέτετε διαφορετικές γεύσεις;" : "Do you have different flavors?",
                    a: isEl ? "Ναι! Το ELV8 Energy διατίθεται σε πολλές γεύσεις. Ελέγξτε τη σελίδα των προϊόντων για τη διαθέσιμη γκάμα γεύσεων." : "Yes! ELV8 Energy is available in multiple flavors. Check the products page for the available range."
                }
            ]
        },
        {
            category: isEl ? "Επιστροφές & Αλλαγές" : "Returns & Exchanges",
            questions: [
                {
                    q: isEl ? "Μπορώ να επιστρέψω ένα προϊόν;" : "Can I return a product?",
                    a: isEl ? "Λόγω υγειονομικών κανονισμών για τρόφιμα και ποτά, δεχόμαστε επιστροφές μόνο σε περιπτώσεις ελαττωματικού, κατεστραμμένου ή λανθασμένου προϊόντος. Διαβάστε αναλυτικά στην Πολιτική Επιστροφών." : "Due to health regulations for food and beverages, we only accept returns for defective, damaged, or incorrect products. Read more in our Return Policy."
                },
                {
                    q: isEl ? "Τι κάνω αν παρέλαβα κατεστραμμένο προϊόν;" : "What should I do if I received a damaged product?",
                    a: isEl ? "Στείλτε αμέσως φωτογραφίες του προβλήματος στο info@elv8now.com μαζί με τον αριθμό παραγγελίας σας. Η ομάδα μας θα σας αποστείλει άμεσα αντικατάσταση χωρίς καμία επιπλέον χρέωση." : "Send photos of the issue immediately to info@elv8now.com along with your order number. Our team will send you a replacement at no extra charge."
                }
            ]
        }
    ];

    let globalIndex = 0;

    return (
        <main className="container mx-auto px-3 sm:px-4 md:px-8 py-6 sm:py-8 md:py-16">
            <Link
                href="/"
                className="inline-flex items-center gap-1 font-body text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8"
            >
                <ChevronLeft className="w-4 h-4" />
                {t("product.back")}
            </Link>

            <div className="max-w-4xl mx-auto">
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6">
                    {t("faq.title")}
                </h1>
                <p className="text-muted-foreground font-body text-sm sm:text-base mb-10 sm:mb-14">
                    {isEl ? "Βρείτε απαντήσεις στις πιο συχνές ερωτήσεις για τα προϊόντα και τις υπηρεσίες του ELV8 Energy." : "Find answers to the most frequently asked questions about ELV8 Energy products and services."}
                </p>

                <div className="space-y-10">
                    {faqs.map((section) => (
                        <div key={section.category}>
                            <h2 className="font-display text-lg sm:text-xl font-bold mb-4 text-[#FF1D8E] uppercase tracking-wider">
                                {section.category}
                            </h2>
                            <div className="space-y-3">
                                {section.questions.map((faq) => {
                                    const idx = globalIndex++;
                                    return (
                                        <div
                                            key={idx}
                                            className="border border-border rounded-2xl overflow-hidden"
                                        >
                                            <button
                                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-secondary/30 transition-colors"
                                            >
                                                <span className="font-body font-semibold text-sm sm:text-base pr-4">{faq.q}</span>
                                                <ChevronDown
                                                    className={`w-5 h-5 flex-shrink-0 text-[#FF1D8E] transition-transform duration-200 ${openIndex === idx ? "rotate-180" : ""}`}
                                                />
                                            </button>
                                            {openIndex === idx && (
                                                <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                                                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 sm:mt-16 bg-gradient-to-br from-[#FF1D8E]/10 to-[#FF1D8E]/5 rounded-3xl p-6 sm:p-8 text-center border border-[#FF1D8E]/20">
                    <h2 className="font-display text-xl sm:text-2xl font-bold mb-2">{isEl ? "Δεν βρήκατε απάντηση;" : "Didn't find an answer?"}</h2>
                    <p className="text-muted-foreground font-body text-sm mb-6">
                        {isEl ? "Η ομάδα μας είναι εδώ για να βοηθήσει!" : "Our team is here to help!"}
                    </p>
                    <a
                        href="mailto:info@elv8now.com"
                        className="inline-flex items-center gap-2 bg-[#FF1D8E] text-white font-body font-bold px-6 py-3 rounded-full hover:bg-[#e0187f] transition-colors text-sm"
                    >
                        📧 info@elv8now.com
                    </a>
                </div>
            </div>
        </main>
    );
}
