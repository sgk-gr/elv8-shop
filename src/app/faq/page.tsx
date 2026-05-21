"use client";

import { ChevronLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import JsonLd from "@/components/JsonLd";

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            category: "Παραγγελίες & Αποστολές",
            questions: [
                {
                    q: "Πώς μπορώ να παραγγείλω;",
                    a: "Μπορείτε να παραγγείλετε εύκολα μέσω της ιστοσελίδας μας. Απλά προσθέστε τα προϊόντα που επιθυμείτε στο καλάθι σας, συμπληρώστε τα στοιχεία σας και ολοκληρώστε την πληρωμή. Θα λάβετε email επιβεβαίωσης αμέσως μετά την παραγγελία."
                },
                {
                    q: "Πόσο κοστίζουν τα μεταφορικά;",
                    a: "Τα μεταφορικά έξοδα είναι 4,50€ για παραγγελίες κάτω των 65€. Για παραγγελίες άνω των 65€, τα μεταφορικά είναι ΔΩΡΕΑΝ σε όλη την Ελλάδα! Οι αποστολές γίνονται με την ACS Courier.\nΚόστος αντικαταβολής 2€."
                },
                {
                    q: "Πόσος χρόνος χρειάζεται για την παράδοση;",
                    a: "Οι παραγγελίες παραδίδονται εντός 3-5 εργάσιμων ημερών."
                },
                {
                    q: "Μπορώ να παραλάβω την παραγγελία μου από κατάστημα;",
                    a: "Προς το παρόν, δεν διαθέτουμε φυσικό κατάστημα. Όλες οι παραγγελίες αποστέλλονται στη διεύθυνση που επιλέγετε κατά την ολοκλήρωση της παραγγελίας."
                },
                {
                    q: "Μπορώ να αλλάξω τη διεύθυνση αποστολής μετά την παραγγελία;",
                    a: "Εάν η παραγγελία σας δεν έχει ακόμα αποσταλεί, μπορείτε να επικοινωνήσετε μαζί μας άμεσα στο info@vaiacharms.gr ή στο +30 694 310 5742 για να αλλάξετε τη διεύθυνση αποστολής."
                }
            ]
        },
        {
            category: "Πληρωμές",
            questions: [
                {
                    q: "Ποιες μεθόδους πληρωμής δέχεστε;",
                    a: "Δεχόμαστε τους ακόλουθους τρόπους πληρωμής:\n\n1. Πιστωτική / Χρεωστική Κάρτα: Όλες οι κύριες κάρτες (Visa, Mastercard, Maestro) μέσω ασφαλούς τραπεζικού περιβάλλοντος.\n2. IRIS Payments: Άμεση πληρωμή μέσω του e-banking σας.\n3. Αντικαταβολή: Πληρωμή με μετρητά κατά την παράδοση στον κούριερ (κόστος αντικαταβολής 2€).\n4. Τραπεζική Κατάθεση: Κατάθεση στον ακόλουθο λογαριασμό:\n\nIBAN: GR96 0140 8200 8200 0200 2022 797\nΔικαιούχος: Ioannis Papatheodorou\nΤράπεζα: Alpha Bank\n\nΠαρακαλούμε, κατά την κατάθεση να αναγράφετε ως αιτιολογία το ονοματεπώνυμό σας ή/και τον αριθμό παραγγελίας σας. Η επεξεργασία της παραγγελίας ξεκινά μετά την επιβεβαίωση της πληρωμής (ακύρωση αν δεν εξοφληθεί σε 2-3 μέρες)."
                }
            ]
        },
        {
            category: "Επιστροφές & Ανταλλαγές",
            questions: [
                {
                    q: "Μπορώ να επιστρέψω ένα προϊόν;",
                    a: "Επιστροφές γίνονται δεκτές αποκλειστικά σε περιπτώσεις ελαττωματικού προϊόντος, λάθους αποστολής ή αν το προϊόν δεν αντιστοιχεί στην περιγραφή. Σε οποιαδήποτε άλλη περίπτωση, δεν γίνονται δεκτές επιστροφές ή αλλαγές."
                },
                {
                    q: "Πώς μπορώ να κάνω επιστροφή αν το προϊόν είναι ελαττωματικό;",
                    a: "Επικοινωνήστε μαζί μας άμεσα στο info@vaiacharms.gr ή στο +30 694 310 5742 εντός 14 ημερών από την παραλαβή. Θα σας καθοδηγήσουμε για τη δωρεάν αντικατάσταση του προϊόντος."
                },
                {
                    q: "Ποιο είναι το κόστος επιστροφής;",
                    a: "Για όλες τις έγκυρες περιπτώσεις επιστροφής (ελάττωμα, λάθος προϊόν), τα έξοδα επιστροφής και η νέα αποστολή καλύπτονται πλήρως από εμάς."
                },
                {
                    q: "Μπορώ να ανταλλάξω ένα προϊόν;",
                    a: "Ανταλλαγές γίνονται μόνο σε περίπτωση ελαττωματικού ή λανθασμένου προϊόντος. Λόγω της φύσης των προϊόντων μας, δεν πραγματοποιούνται αλλαγές για άλλους λόγους (π.χ. αλλαγή γνώμης)."
                }
            ]
        },
        {
            category: "Προϊόντα",
            questions: [
                {
                    q: "Πώς μπορώ να βρω το σωστό μέγεθος;",
                    a: "Κάθε προϊόν έχει λεπτομερή πίνακα μεγεθών. Επίσης, μπορείτε να δείτε τον γενικό Οδηγό Μεγεθών μας για περισσότερες πληροφορίες. Αν έχετε απορίες, επικοινωνήστε μαζί μας!"
                },
                {
                    q: "Είναι γνήσια τα προϊόντα σας;",
                    a: "Απολύτως! Όλα τα προϊόντα μας είναι 100% γνήσια και προέρχονται από επίσημους προμηθευτές. Παρέχουμε εγγύηση γνησιότητας για όλα τα brands που διαθέτουμε."
                },
                {
                    q: "Πόσο συχνά ανανεώνετε τη συλλογή σας;",
                    a: "Προσθέτουμε νέα προϊόντα κάθε εβδομάδα! Εγγραφείτε στο newsletter μας για να ενημερώνεστε πρώτοι για τις νέες αφίξεις και τις αποκλειστικές προσφορές."
                },
                {
                    q: "Τι κάνω αν το προϊόν που θέλω είναι εξαντλημένο;",
                    a: "Μπορείτε να εγγραφείτε στη λίστα αναμονής από τη σελίδα του προϊόντος. Θα σας ειδοποιήσουμε με email μόλις το προϊόν ξανά-διατεθεί."
                }
            ]
        },
        {
            category: "Λογαριασμός & Ασφάλεια",
            questions: [
                {
                    q: "Πρέπει να δημιουργήσω λογαριασμό για να παραγγείλω;",
                    a: "Όχι, μπορείτε να παραγγείλετε ως επισκέπτης. Ωστόσο, η δημιουργία λογαριασμού σας επιτρέπει να παρακολουθείτε τις παραγγελίες σας, να αποθηκεύετε αγαπημένα προϊόντα και να έχετε ταχύτερη ολοκλήρωση αγορών."
                },
                {
                    q: "Πώς μπορώ να αλλάξω τον κωδικό μου;",
                    a: "Συνδεθείτε στον λογαριασμό σας, πηγαίνετε στις 'Ρυθμίσεις' και επιλέξτε 'Αλλαγή Κωδικού'. Θα λάβετε email επιβεβαίωσης μετά την αλλαγή."
                },
                {
                    q: "Είναι ασφαλή τα προσωπικά μου δεδομένα;",
                    a: "Απολύτως! Χρησιμοποιούμε κρυπτογράφηση SSL και ακολουθούμε όλα τα πρότυπα GDPR για την προστασία των δεδομένων σας. Δείτε την Πολιτική Απορρήτου για περισσότερες λεπτομέρειες."
                },
                {
                    q: "Μπορώ να διαγράψω τον λογαριασμό μου;",
                    a: "Ναι, μπορείτε να ζητήσετε τη διαγραφή του λογαριασμού σας στέλνοντας email στο info@vaiacharms.gr. Θα διαγράψουμε όλα τα δεδομένα σας εντός 30 ημερών."
                }
            ]
        }
    ];

    return (
        <main className="container mx-auto px-3 sm:px-4 md:px-8 py-6 sm:py-8 md:py-16">
            <JsonLd
                type="faq"
                faqs={faqs.flatMap(cat =>
                    cat.questions.map(q => ({ question: q.q, answer: q.a }))
                )}
            />
            <Link
                href="/"
                className="inline-flex items-center gap-1 font-body text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8"
            >
                <ChevronLeft className="w-4 h-4" />
                Επιστροφή
            </Link>

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light mb-4">
                        Συχνές Ερωτήσεις
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
                        Βρείτε απαντήσεις στις πιο συχνές ερωτήσεις μας. Αν δεν βρείτε αυτό που ψάχνετε,
                        επικοινωνήστε μαζί μας!
                    </p>
                </div>

                {/* Quick Contact */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 sm:p-6 rounded-2xl border border-primary/20 mb-8 sm:mb-12">
                    <p className="text-sm sm:text-base font-medium text-center mb-3">
                        Δεν βρήκατε την απάντησή σας; Είμαστε εδώ για να βοηθήσουμε!
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
                        <a href="mailto:info@vaiacharms.gr" className="font-medium hover:text-primary transition-colors">
                            📧 info@vaiacharms.gr
                        </a>
                        <span className="text-muted-foreground">|</span>
                        <a href="tel:+306943105742" className="font-medium hover:text-primary transition-colors">
                            📞 +30 694 310 5742
                        </a>
                        <span className="text-muted-foreground">|</span>
                        <span className="text-muted-foreground">⏰ Δευ-Παρ, 9:00-17:00</span>
                    </div>
                </div>

                {/* FAQ Categories */}
                <div className="space-y-8 sm:space-y-10">
                    {faqs.map((category, catIndex) => (
                        <div key={catIndex}>
                            <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-[#C4196D]">
                                <span className="w-8 h-8 bg-[#C4196D] text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    {catIndex + 1}
                                </span>
                                {category.category}
                            </h2>
                            <div className="space-y-3">
                                {category.questions.map((faq, qIndex) => {
                                    const globalIndex = catIndex * 100 + qIndex;
                                    const isOpen = openIndex === globalIndex;

                                    return (
                                        <div
                                            key={qIndex}
                                            className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
                                        >
                                            <button
                                                onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                                                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50/50 transition-colors"
                                            >
                                                <span className="font-body font-bold text-sm sm:text-base pr-4">
                                                    {faq.q}
                                                </span>
                                                <ChevronDown
                                                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"
                                                    }`}
                                            >
                                                <div className="p-4 sm:p-5 pt-0 text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                                                    {faq.a}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Still Need Help */}
                <div className="mt-12 sm:mt-16 text-center bg-secondary/50 p-6 sm:p-8 rounded-2xl">
                    <h3 className="font-display text-xl sm:text-2xl font-bold mb-3">Χρειάζεστε περισσότερη βοήθεια;</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-6">
                        Η ομάδα εξυπηρέτησης πελατών μας είναι πάντα εδώ για εσάς!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href="mailto:info@vaiacharms.gr"
                            className="inline-flex items-center justify-center gap-2 bg-[#C4196D] text-white px-6 py-3 rounded-full font-body text-sm font-bold hover:bg-[#C4196D]/90 transition-colors"
                        >
                            Στείλτε Email
                        </a>
                        <a
                            href="tel:+306943105742"
                            className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#C4196D] text-[#C4196D] px-6 py-3 rounded-full font-body text-sm font-bold hover:bg-[#C4196D]/5 transition-colors"
                        >
                            Καλέστε μας
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
