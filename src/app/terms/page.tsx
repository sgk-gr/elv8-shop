"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function TermsOfServicePage() {
    const { t, language } = useTranslation();
    const isEl = language === "el";

    return (
        <main className="container mx-auto px-3 sm:px-4 md:px-8 py-6 sm:py-8 md:py-16">
            <Link
                href="/"
                className="inline-flex items-center gap-1 font-body text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8"
            >
                <ChevronLeft className="w-4 h-4" />
                {isEl ? "Επιστροφή" : "Back"}
            </Link>

            <div className="max-w-4xl mx-auto">
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6">
                    {isEl ? "Όροι Χρήσης" : "Terms of Use"}
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 sm:mb-12">
                    {isEl ? "Τελευταία ενημέρωση: " : "Last updated: "}
                    {new Date().toLocaleDateString(isEl ? 'el-GR' : 'en-US')}
                </p>

                <div className="prose prose-sm sm:prose-base max-w-none space-y-6 sm:space-y-8">
                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "1. Αποδοχή Όρων" : "1. Acceptance of Terms"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {isEl ? (
                                "Καλώς ήρθατε στο ELV8 Energy. Χρησιμοποιώντας την ιστοσελίδα μας, αποδέχεστε αυτούς τους όρους χρήσης στο σύνολό τους. Εάν δεν συμφωνείτε με οποιοδήποτε μέρος αυτών των όρων, παρακαλούμε μην χρησιμοποιείτε την ιστοσελίδα μας."
                            ) : (
                                "Welcome to ELV8 Energy. By using our website, you accept these terms of use in their entirety. If you do not agree with any part of these terms, please do not use our website."
                            )}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "2. Χρήση της Υπηρεσίας" : "2. Use of Service"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-3">
                            {isEl ? (
                                "Η χρήση της ιστοσελίδας μας επιτρέπεται μόνο για νόμιμους σκοπούς. Συμφωνείτε να μην χρησιμοποιείτε την ιστοσελίδα:"
                            ) : (
                                "Use of our website is permitted only for lawful purposes. You agree not to use the website:"
                            )}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground ml-4">
                            {isEl ? (
                                <>
                                    <li>Με τρόπο που παραβιάζει οποιονδήποτε εθνικό ή διεθνή νόμο ή κανονισμό</li>
                                    <li>Με τρόπο που είναι παράνομος ή απατηλός</li>
                                    <li>Για να μεταδώσετε ή να στείλετε ανεπιθύμητο υλικό διαφήμισης ή προώθησης</li>
                                    <li>Για να μεταδώσετε κακόβουλο λογισμικό ή άλλο επιβλαβές υλικό</li>
                                </>
                            ) : (
                                <>
                                    <li>In a way that violates any national or international law or regulation</li>
                                    <li>In a way that is unlawful or fraudulent</li>
                                    <li>To transmit or send unsolicited advertising or promotional material (spam)</li>
                                    <li>To transmit malicious software or other harmful material</li>
                                </>
                            )}
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "3. Ηλικιακός Περιορισμός" : "3. Age Restriction"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {isEl ? (
                                "Τα προϊόντα ELV8 Energy Drink απευθύνονται σε άτομα άνω των 18 ετών. Με τη χρήση της ιστοσελίδας μας, βεβαιώνετε ότι έχετε συμπληρώσει το 18ο έτος της ηλικίας σας. Δεν συνιστάται η κατανάλωση ενεργειακών ποτών από εγκύους, θηλάζουσες ή άτομα ευαίσθητα στην καφεΐνη."
                            ) : (
                                "ELV8 Energy Drink products are intended for individuals over 18 years of age. By using our website, you confirm that you are at least 18 years old. Consumption of energy drinks is not recommended for pregnant or breastfeeding women, or caffeine-sensitive individuals."
                            )}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "4. Λογαριασμός Χρήστη" : "4. User Account"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {isEl ? (
                                "Για να πραγματοποιήσετε αγορές, μπορείτε να δημιουργήσετε έναν λογαριασμό. Είστε υπεύθυνοι για τη διατήρηση της εμπιστευτικότητας του λογαριασμού σας και του κωδικού πρόσβασής σας. Αποδέχεστε την ευθύνη για όλες τις δραστηριότητες που πραγματοποιούνται μέσω του λογαριασμού σας."
                            ) : (
                                "To make purchases, you may create an account. You are responsible for maintaining the confidentiality of your account and password. You accept responsibility for all activities that occur under your account."
                            )}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "5. Παραγγελίες και Πληρωμές" : "5. Orders and Payments"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-3">
                            {isEl ? (
                                "Όλες οι παραγγελίες υπόκεινται σε διαθεσιμότητα και επιβεβαίωση της τιμής. Διατηρούμε το δικαίωμα να αρνηθούμε ή να ακυρώσουμε οποιαδήποτε παραγγελία για οποιονδήποτε λόγο. Οι τιμές αναφέρονται σε ευρώ (€) και περιλαμβάνουν ΦΠΑ."
                            ) : (
                                "All orders are subject to availability and price confirmation. We reserve the right to refuse or cancel any order for any reason. Prices are stated in euros (€) and include VAT."
                            )}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "6. Πνευματικά Δικαιώματα" : "6. Copyright / Intellectual Property"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {isEl ? (
                                "Όλο το περιεχόμενο της ιστοσελίδας, συμπεριλαμβανομένων κειμένων, γραφικών, λογοτύπων, εικόνων και λογισμικού, είναι ιδιοκτησία του ELV8 Energy και προστατεύεται από τους νόμους πνευματικής ιδιοκτησίας. Απαγορεύεται η αναπαραγωγή χωρίς γραπτή άδεια."
                            ) : (
                                "All content on the website, including text, graphics, logos, images, and software, is the property of ELV8 Energy and is protected by intellectual property laws. Reproduction without written permission is prohibited."
                            )}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "7. Περιορισμός Ευθύνης" : "7. Limitation of Liability"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {isEl ? (
                                "Το ELV8 Energy δεν φέρει ευθύνη για οποιεσδήποτε άμεσες, έμμεσες, τυχαίες ή επακόλουθες ζημίες που προκύπτουν από τη χρήση ή την αδυναμία χρήσης της ιστοσελίδας μας ή των προϊόντων που αγοράζονται μέσω αυτής."
                            ) : (
                                "ELV8 Energy shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our website or products purchased through it."
                            )}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "8. Τροποποιήσεις Όρων" : "8. Amendments to Terms"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {isEl ? (
                                "Διατηρούμε το δικαίωμα να τροποποιούμε αυτούς τους όρους ανά πάσα στιγμή. Οι αλλαγές θα τίθενται σε ισχύ αμέσως μετά τη δημοσίευσή τους στην ιστοσελίδα. Η συνεχής χρήση της ιστοσελίδας μετά από τέτοιες αλλαγές συνιστά αποδοχή των νέων όρων."
                            ) : (
                                "We reserve the right to modify these terms at any time. Changes will take effect immediately upon their publication on the website. Continued use of the website after such changes constitutes acceptance of the new terms."
                            )}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "9. Εφαρμοστέο Δίκαιο" : "9. Governing Law"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {isEl ? (
                                "Οι παρόντες όροι διέπονται και ερμηνεύονται σύμφωνα με τους νόμους της Ελλάδας. Οποιαδήποτε διαφορά που προκύπτει από αυτούς τους όρους υπόκειται στην αποκλειστική δικαιοδοσία των δικαστηρίων της Ελλάδας."
                            ) : (
                                "These terms are governed by and construed in accordance with the laws of Greece. Any dispute arising from these terms is subject to the exclusive jurisdiction of the courts of Greece."
                            )}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "10. Επικοινωνία" : "10. Contact Us"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {isEl ? (
                                "Για οποιεσδήποτε ερωτήσεις σχετικά με αυτούς τους όρους χρήσης, παρακαλούμε επικοινωνήστε μαζί μας:"
                            ) : (
                                "For any questions regarding these terms of use, please contact us:"
                            )}
                        </p>
                        <div className="bg-gradient-to-br from-[#FF1D8E]/10 to-[#FF1D8E]/5 p-4 sm:p-6 rounded-xl border border-[#FF1D8E]/20 mt-4">
                            <p className="text-sm sm:text-base font-medium mb-1">📧 Email: info@elv8now.com</p>
                            <p className="text-sm sm:text-base font-medium">🌐 Website: elv8now.com</p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
