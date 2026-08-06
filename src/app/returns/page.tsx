"use client";

import { ChevronLeft, Package, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function ReturnPolicyPage() {
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
                    {isEl ? "Πολιτική Επιστροφών" : "Return Policy"}
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 sm:mb-12">
                    {isEl ? "Τελευταία ενημέρωση: " : "Last updated: "}
                    {new Date().toLocaleDateString(isEl ? 'el-GR' : 'en-US')}
                </p>

                {/* Highlight Cards */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12">
                    <div className="text-white p-4 sm:p-5 rounded-2xl" style={{ background: "linear-gradient(135deg, #FF1D8E, #c41070)" }}>
                        <Clock className="w-8 h-8 mb-2 sm:mb-3" />
                        <p className="text-2xl sm:text-3xl font-display font-bold mb-1">14</p>
                        <p className="text-xs sm:text-sm opacity-90">
                            {isEl ? "Ημέρες για αναφορά ελαττώματος" : "Days to report defect"}
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 sm:p-5 rounded-2xl">
                        <Package className="w-8 h-8 mb-2 sm:mb-3" />
                        <p className="text-2xl sm:text-3xl font-display font-bold mb-1">0€</p>
                        <p className="text-xs sm:text-sm opacity-90">
                            {isEl ? "Έξοδα αντικατάστασης" : "Replacement cost"}
                        </p>
                    </div>
                </div>

                <div className="prose prose-sm sm:prose-base max-w-none space-y-6 sm:space-y-8">
                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "1. Γενικοί Όροι Επιστροφής" : "1. General Return Terms"}
                        </h2>
                        <div className="text-sm sm:text-base leading-relaxed text-muted-foreground space-y-4">
                            <p>
                                {isEl ? (
                                    "Λόγω της φύσης των προϊόντων μας (τρόφιμα / ποτά), οι επιστροφές γίνονται δεκτές αποκλειστικά στις ακόλουθες περιπτώσεις:"
                                ) : (
                                    "Due to the nature of our products (food / beverages), returns are accepted exclusively in the following cases:"
                                )}
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                {isEl ? (
                                    <>
                                        <li>Το προϊόν παραδόθηκε κατεστραμμένο ή ελαττωματικό</li>
                                        <li>Εστάλη λανθασμένο προϊόν σε σχέση με την παραγγελία</li>
                                        <li>Το προϊόν έχει λήξει κατά την παράδοση</li>
                                    </>
                                ) : (
                                    <>
                                        <li>Product was delivered damaged or defective</li>
                                        <li>Wrong product was sent in relation to the order</li>
                                        <li>Product was expired upon delivery</li>
                                    </>
                                )}
                            </ul>
                            <p>
                                {isEl ? (
                                    "Σε αυτές τις περιπτώσεις η αντικατάσταση πραγματοποιείται χωρίς καμία επιπλέον επιβάρυνση."
                                ) : (
                                    "In these cases, replacement is carried out at no extra charge."
                                )}
                            </p>
                            <p className="font-bold text-foreground">
                                {isEl ? (
                                    "Σε οποιαδήποτε άλλη περίπτωση, δεν γίνονται δεκτές επιστροφές λόγω υγειονομικών κανονισμών για τρόφιμα και ποτά."
                                ) : (
                                    "In any other case, returns are not accepted due to health regulations for food and beverages."
                                )}
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "2. Προϋποθέσεις Επιστροφής" : "2. Return Conditions"}
                        </h2>
                        <div className="bg-secondary/30 p-4 sm:p-6 rounded-xl space-y-3">
                            {(isEl ? [
                                "Το προϊόν να μην έχει ανοιχτεί ή χρησιμοποιηθεί",
                                "Να συνοδεύεται από φωτογραφίες που αποδεικνύουν το ελάττωμα ή τη ζημιά",
                                "Να συμπεριλαμβάνεται η απόδειξη αγοράς",
                                "Η αναφορά του προβλήματος να γίνει εντός 14 ημερών από την παραλαβή",
                            ] : [
                                "The product must not be opened or used",
                                "Must be accompanied by photos proving the defect or damage",
                                "The proof of purchase must be included",
                                "The defect must be reported within 14 days of delivery",
                            ]).map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-[#FF1D8E] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-xs font-bold">✓</span>
                                    </div>
                                    <p className="text-sm sm:text-base text-muted-foreground">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "3. Διαδικασία Επιστροφής" : "3. Return Process"}
                        </h2>
                        <div className="space-y-4">
                            {[
                                {
                                    step: "1",
                                    title: isEl ? "Επικοινωνήστε μαζί μας" : "Contact Us",
                                    desc: isEl ? "Στείλτε email στο info@elv8now.com με φωτογραφίες του προβλήματος και τον αριθμό παραγγελίας σας." : "Send an email to info@elv8now.com with photos of the issue and your order number."
                                },
                                {
                                    step: "2",
                                    title: isEl ? "Αξιολόγηση" : "Evaluation",
                                    desc: isEl ? "Η ομάδα μας θα αξιολογήσει το αίτημά σας εντός 1-2 εργάσιμων ημερών." : "Our team will evaluate your request within 1-2 working days."
                                },
                                {
                                    step: "3",
                                    title: isEl ? "Αντικατάσταση" : "Replacement",
                                    desc: isEl ? "Εφόσον εγκριθεί, θα αποστείλουμε αμέσως τα αντικατεστημένα προϊόντα χωρίς επιπλέον χρέωση." : "Once approved, we will send the replacement products immediately at no extra cost."
                                }
                            ].map((item) => (
                                <div key={item.step} className="flex gap-4 text-left">
                                    <div className="w-10 h-10 bg-[#FF1D8E] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                        {item.step}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm sm:text-base mb-1">{item.title}</h3>
                                        <p className="text-sm sm:text-base text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "4. Κόστος Επιστροφής" : "4. Return Cost"}
                        </h2>
                        <div className="bg-green-50 border border-green-200 p-4 sm:p-6 rounded-xl text-left">
                            <h3 className="font-bold text-sm sm:text-base mb-2 text-green-700">
                                {isEl ? "✓ Δωρεάν Αντικατάσταση" : "✓ Free Replacement"}
                            </h3>
                            <p className="text-sm text-green-600">
                                {isEl ? (
                                    "Σε όλες τις εγκεκριμένες περιπτώσεις, τα έξοδα επιστροφής και η αποστολή των νέων προϊόντων επιβαρύνουν αποκλειστικά το ELV8 Energy."
                                ) : (
                                    "In all approved cases, return shipping and sending of new products are fully covered by ELV8 Energy."
                                )}
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "5. Εξαιρέσεις" : "5. Exceptions"}
                        </h2>
                        <div className="bg-destructive/10 border border-destructive/20 p-4 sm:p-6 rounded-xl text-left">
                            <div className="flex items-start gap-3 mb-3">
                                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                                <p className="text-sm sm:text-base font-bold text-destructive">
                                    {isEl ? "Δεν γίνονται επιστροφές για:" : "No returns accepted for:"}
                                </p>
                            </div>
                            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground">
                                {isEl ? (
                                    <>
                                        <li>Ανοιγμένα ή χρησιμοποιημένα ενεργειακά ποτά</li>
                                        <li>Προϊόντα με εμφανή ζημιά λόγω κακής μεταχείρισης από τον αγοραστή</li>
                                        <li>Αλλαγή γνώμης ή προτίμησης γεύσης</li>
                                    </>
                                ) : (
                                    <>
                                        <li>Opened or partially consumed energy drinks</li>
                                        <li>Products with visible damage due to buyer misuse/mishandling</li>
                                        <li>Change of mind or taste/flavor preference</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "6. Επικοινωνία" : "6. Contact Us"}
                        </h2>
                        <div className="bg-gradient-to-br from-[#FF1D8E]/10 to-[#FF1D8E]/5 p-4 sm:p-6 rounded-xl border border-[#FF1D8E]/20 text-left">
                            <p className="text-sm sm:text-base font-medium mb-1">📧 Email: info@elv8now.com</p>
                            <p className="text-sm sm:text-base font-medium mb-1">
                                {isEl ? "⏰ Ωράριο: Δευτέρα - Παρασκευή, 9:00 - 17:00" : "⏰ Hours: Monday - Friday, 9:00 - 17:00"}
                            </p>
                            <p className="text-sm sm:text-base font-medium">🌐 Website: elv8now.com</p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
