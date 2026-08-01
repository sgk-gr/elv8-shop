"use client";

import { ChevronLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            category: "Παραγγελίες & Αποστολές",
            questions: [
                {
                    q: "Πώς μπορώ να παραγγείλω;",
                    a: "Μπορείτε να παραγγείλετε εύκολα μέσω της ιστοσελίδας μας. Προσθέστε τα ELV8 Energy Drinks που επιθυμείτε στο καλάθι σας, συμπληρώστε τα στοιχεία σας και ολοκληρώστε την πληρωμή. Θα λάβετε email επιβεβαίωσης αμέσως μετά την παραγγελία."
                },
                {
                    q: "Πόσο κοστίζουν τα μεταφορικά;",
                    a: "Τα μεταφορικά έξοδα είναι 4,50€ για παραγγελίες κάτω των 65€. Για παραγγελίες άνω των 65€, τα μεταφορικά είναι ΔΩΡΕΑΝ σε όλη την Ελλάδα! Κόστος αντικαταβολής 2€."
                },
                {
                    q: "Πόσος χρόνος χρειάζεται για την παράδοση;",
                    a: "Οι παραγγελίες παραδίδονται εντός 2-4 εργάσιμων ημερών σε όλη την Ελλάδα."
                },
                {
                    q: "Μπορώ να παραλάβω από κατάστημα;",
                    a: "Χρησιμοποιήστε τον Store Locator για να βρείτε το κοντινότερο σημείο πώλησης ELV8 Energy στην περιοχή σας."
                },
                {
                    q: "Μπορώ να αλλάξω τη διεύθυνση αποστολής μετά την παραγγελία;",
                    a: "Εάν η παραγγελία σας δεν έχει ακόμα αποσταλεί, επικοινωνήστε άμεσα μαζί μας στο info@elv8now.com για να αλλάξετε τη διεύθυνση αποστολής."
                }
            ]
        },
        {
            category: "Πληρωμές",
            questions: [
                {
                    q: "Ποιες μεθόδους πληρωμής δέχεστε;",
                    a: "Δεχόμαστε:\n\n1. Πιστωτική / Χρεωστική Κάρτα (Visa, Mastercard, Maestro)\n2. IRIS Payments – άμεση πληρωμή μέσω e-banking\n3. Αντικαταβολή – πληρωμή κατά την παράδοση (+ 2€)\n4. Τραπεζική Κατάθεση – επικοινωνήστε μαζί μας για στοιχεία λογαριασμού"
                },
                {
                    q: "Είναι ασφαλείς οι πληρωμές;",
                    a: "Απολύτως. Όλες οι συναλλαγές γίνονται μέσω κρυπτογραφημένου περιβάλλοντος SSL. Τα στοιχεία της κάρτας σας δεν αποθηκεύονται ποτέ στους servers μας."
                },
                {
                    q: "Πότε χρεώνεται η κάρτα μου;",
                    a: "Η χρέωση γίνεται αμέσως κατά την ολοκλήρωση της παραγγελίας. Σε περίπτωση ακύρωσης, η επιστροφή χρημάτων πραγματοποιείται εντός 3-5 εργάσιμων ημερών."
                }
            ]
        },
        {
            category: "Προϊόντα ELV8",
            questions: [
                {
                    q: "Τι κάνει το ELV8 Energy διαφορετικό;",
                    a: "Το ELV8 Energy Drink είναι φτιαγμένο με φυσικά συστατικά, 200mg καφεΐνης φυσικής προέλευσης, ηλεκτρολύτες και μηδενική ζάχαρη. Η ιδανική επιλογή για αθλητές, επαγγελματίες και όλους όσους αναζητούν φυσική ενέργεια χωρίς συμβιβασμούς."
                },
                {
                    q: "Περιέχει ζάχαρη;",
                    a: "Όχι! Το ELV8 Energy είναι Zero Sugar – χωρίς ζάχαρη και χωρίς περιττές θερμίδες. Γλυκαίνεται με φυσικά γλυκαντικά."
                },
                {
                    q: "Ποιοι πρέπει να αποφεύγουν τα ενεργειακά ποτά;",
                    a: "Τα ενεργειακά ποτά δεν συνιστώνται σε:\n\n• Άτομα κάτω των 18 ετών\n• Εγκύους και θηλάζουσες\n• Άτομα ευαίσθητα στην καφεΐνη\n• Άτομα με καρδιολογικά προβλήματα\n\nΣε κάθε περίπτωση, συμβουλευτείτε τον γιατρό σας."
                },
                {
                    q: "Πόσα κουτιά μπορώ να παραγγείλω;",
                    a: "Δεν υπάρχει μέγιστος αριθμός κουτιών ανά παραγγελία. Για μεγάλες ποσότητες ή χονδρική, επισκεφθείτε τη σελίδα μας B2B Wholesale ή επικοινωνήστε στο info@elv8now.com."
                },
                {
                    q: "Διαθέτετε διαφορετικές γεύσεις;",
                    a: "Ναι! Το ELV8 Energy διατίθεται σε πολλές γεύσεις. Ελέγξτε τη σελίδα των προϊόντων για τη διαθέσιμη γκάμα γεύσεων."
                }
            ]
        },
        {
            category: "Επιστροφές & Αλλαγές",
            questions: [
                {
                    q: "Μπορώ να επιστρέψω ένα προϊόν;",
                    a: "Λόγω υγειονομικών κανονισμών για τρόφιμα και ποτά, δεχόμαστε επιστροφές μόνο σε περιπτώσεις ελαττωματικού, κατεστραμμένου ή λανθασμένου προϊόντος. Διαβάστε αναλυτικά στην Πολιτική Επιστροφών."
                },
                {
                    q: "Τι κάνω αν παρέλαβα κατεστραμμένο προϊόν;",
                    a: "Στείλτε αμέσως φωτογραφίες του προβλήματος στο info@elv8now.com μαζί με τον αριθμό παραγγελίας σας. Η ομάδα μας θα σας αποστείλει άμεσα αντικατάσταση χωρίς καμία επιπλέον χρέωση."
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
                Επιστροφή
            </Link>

            <div className="max-w-4xl mx-auto">
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6">
                    Συχνές Ερωτήσεις
                </h1>
                <p className="text-muted-foreground font-body text-sm sm:text-base mb-10 sm:mb-14">
                    Βρείτε απαντήσεις στις πιο συχνές ερωτήσεις για τα προϊόντα και τις υπηρεσίες του ELV8 Energy.
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
                    <h2 className="font-display text-xl sm:text-2xl font-bold mb-2">Δεν βρήκατε απάντηση;</h2>
                    <p className="text-muted-foreground font-body text-sm mb-6">
                        Η ομάδα μας είναι εδώ για να βοηθήσει!
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
