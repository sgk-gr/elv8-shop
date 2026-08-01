import { ChevronLeft, Package, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Πολιτική Επιστροφών | ELV8 Energy",
    description: "Πολιτική επιστροφών και αντικαταστάσεων του ELV8 Energy Drink.",
};

export default function ReturnPolicyPage() {
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
                    Πολιτική Επιστροφών
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 sm:mb-12">
                    Τελευταία ενημέρωση: {new Date().toLocaleDateString('el-GR')}
                </p>

                {/* Highlight Cards */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12">
                    <div className="text-white p-4 sm:p-5 rounded-2xl" style={{ background: "linear-gradient(135deg, #FF1D8E, #c41070)" }}>
                        <Clock className="w-8 h-8 mb-2 sm:mb-3" />
                        <p className="text-2xl sm:text-3xl font-display font-bold mb-1">14</p>
                        <p className="text-xs sm:text-sm opacity-90">Ημέρες για αναφορά ελαττώματος</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 sm:p-5 rounded-2xl">
                        <Package className="w-8 h-8 mb-2 sm:mb-3" />
                        <p className="text-2xl sm:text-3xl font-display font-bold mb-1">0€</p>
                        <p className="text-xs sm:text-sm opacity-90">Έξοδα αντικατάστασης</p>
                    </div>
                </div>

                <div className="prose prose-sm sm:prose-base max-w-none space-y-6 sm:space-y-8">
                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. Γενικοί Όροι Επιστροφής</h2>
                        <div className="text-sm sm:text-base leading-relaxed text-muted-foreground space-y-4">
                            <p>Λόγω της φύσης των προϊόντων μας (τρόφιμα / ποτά), οι επιστροφές γίνονται δεκτές αποκλειστικά στις ακόλουθες περιπτώσεις:</p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>Το προϊόν παραδόθηκε κατεστραμμένο ή ελαττωματικό</li>
                                <li>Εστάλη λανθασμένο προϊόν σε σχέση με την παραγγελία</li>
                                <li>Το προϊόν έχει λήξει κατά την παράδοση</li>
                            </ul>
                            <p>Σε αυτές τις περιπτώσεις η αντικατάσταση πραγματοποιείται χωρίς καμία επιπλέον επιβάρυνση.</p>
                            <p className="font-bold text-foreground">Σε οποιαδήποτε άλλη περίπτωση, δεν γίνονται δεκτές επιστροφές λόγω υγειονομικών κανονισμών για τρόφιμα και ποτά.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. Προϋποθέσεις Επιστροφής</h2>
                        <div className="bg-secondary/30 p-4 sm:p-6 rounded-xl space-y-3">
                            {[
                                "Το προϊόν να μην έχει ανοιχτεί ή χρησιμοποιηθεί",
                                "Να συνοδεύεται από φωτογραφίες που αποδεικνύουν το ελάττωμα ή τη ζημιά",
                                "Να συμπεριλαμβάνεται η απόδειξη αγοράς",
                                "Η αναφορά του προβλήματος να γίνει εντός 14 ημερών από την παραλαβή",
                            ].map((item, i) => (
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
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. Διαδικασία Επιστροφής</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    step: "1",
                                    title: "Επικοινωνήστε μαζί μας",
                                    desc: "Στείλτε email στο info@elv8now.com με φωτογραφίες του προβλήματος και τον αριθμό παραγγελίας σας."
                                },
                                {
                                    step: "2",
                                    title: "Αξιολόγηση",
                                    desc: "Η ομάδα μας θα αξιολογήσει το αίτημά σας εντός 1-2 εργάσιμων ημερών."
                                },
                                {
                                    step: "3",
                                    title: "Αντικατάσταση",
                                    desc: "Εφόσον εγκριθεί, θα αποστείλουμε αμέσως τα αντικατεστημένα προϊόντα χωρίς επιπλέον χρέωση."
                                }
                            ].map((item) => (
                                <div key={item.step} className="flex gap-4">
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
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. Κόστος Επιστροφής</h2>
                        <div className="bg-green-50 border border-green-200 p-4 sm:p-6 rounded-xl">
                            <h3 className="font-bold text-sm sm:text-base mb-2 text-green-700">✓ Δωρεάν Αντικατάσταση</h3>
                            <p className="text-sm text-green-600">
                                Σε όλες τις εγκεκριμένες περιπτώσεις, τα έξοδα επιστροφής και η αποστολή των νέων προϊόντων
                                επιβαρύνουν αποκλειστικά το <strong>ELV8 Energy</strong>.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. Εξαιρέσεις</h2>
                        <div className="bg-destructive/10 border border-destructive/20 p-4 sm:p-6 rounded-xl">
                            <div className="flex items-start gap-3 mb-3">
                                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                                <p className="text-sm sm:text-base font-bold text-destructive">Δεν γίνονται επιστροφές για:</p>
                            </div>
                            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground">
                                <li>Ανοιγμένα ή χρησιμοποιημένα ενεργειακά ποτά</li>
                                <li>Προϊόντα με εμφανή ζημιά λόγω κακής μεταχείρισης από τον αγοραστή</li>
                                <li>Αλλαγή γνώμης ή προτίμησης γεύσης</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. Επικοινωνία</h2>
                        <div className="bg-gradient-to-br from-[#FF1D8E]/10 to-[#FF1D8E]/5 p-4 sm:p-6 rounded-xl border border-[#FF1D8E]/20">
                            <p className="text-sm sm:text-base font-medium mb-1">📧 Email: info@elv8now.com</p>
                            <p className="text-sm sm:text-base font-medium mb-1">⏰ Ωράριο: Δευτέρα - Παρασκευή, 9:00 - 17:00</p>
                            <p className="text-sm sm:text-base font-medium">🌐 Website: elv8now.com</p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
