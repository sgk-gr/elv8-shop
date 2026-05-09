import { ChevronLeft, Package, Clock, CreditCard, AlertCircle } from "lucide-react";
import Link from "next/link";

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
                    <div className="text-white p-4 sm:p-5 rounded-2xl" style={{ backgroundColor: '#B33791' }}>
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
                            <p>Οι επιστροφές προϊόντων γίνονται δεκτές αποκλειστικά στις ακόλουθες περιπτώσεις:</p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>Το προϊόν είναι ελαττωματικό</li>
                                <li>Έχει αποσταλεί λανθασμένο προϊόν</li>
                                <li>Το προϊόν δεν ανταποκρίνεται στην περιγραφή του</li>
                            </ul>
                            <p>Στις παραπάνω περιπτώσεις, η αλλαγή ή αντικατάσταση πραγματοποιείται χωρίς καμία επιπλέον επιβάρυνση για τον πελάτη.</p>
                            <p className="font-bold text-foreground">Σε οποιαδήποτε άλλη περίπτωση, δεν γίνονται δεκτές επιστροφές ή αλλαγές προϊόντων.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. Προϋποθέσεις Επιστροφής</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-3">
                            Για να γίνει δεκτή η επιστροφή, τα προϊόντα πρέπει να πληρούν τις ακόλουθες προϋποθέσεις:
                        </p>
                        <div className="bg-secondary/30 p-4 sm:p-6 rounded-xl space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-xs font-bold">✓</span>
                                </div>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    Το προϊόν να μην έχει χρησιμοποιηθεί (εκτός από τη δοκιμή αν πρόκειται για ελάττωμα) και να διατηρεί όλες τις ετικέτες του
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-xs font-bold">✓</span>
                                </div>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    Να συνοδεύεται από την <strong>αρχική συσκευασία</strong> και όλα τα αξεσουάρ
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-xs font-bold">✓</span>
                                </div>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    Να συμπεριλαμβάνεται η <strong>απόδειξη αγοράς</strong>
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-xs font-bold">✓</span>
                                </div>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    Η αναφορά του προβλήματος να γίνει εντός <strong>14 ημερών</strong> από την παραλαβή
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. Διαδικασία Επιστροφής</h2>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm sm:text-base mb-1">Επικοινωνήστε μαζί μας</h3>
                                    <p className="text-sm sm:text-base text-muted-foreground">
                                        Στείλτε email στο info@vaiacharms.gr ή καλέστε μας στο +30 694 310 5742 για να ξεκινήσετε
                                        τη διαδικασία επιστροφής.
                                    </p>
                                </div>
                            </div>


                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. Κόστος Επιστροφής</h2>
                        <div className="bg-green-50 border border-green-200 p-4 sm:p-6 rounded-xl">
                            <h3 className="font-bold text-sm sm:text-base mb-2 text-green-700">✓ Δωρεάν Επιστροφή & Αντικατάσταση</h3>
                            <p className="text-sm text-green-600">
                                Σε όλες τις περιπτώσεις που αναφέρονται στην ενότητα 1 (ελαττωματικό, λάθος προϊόν, μη αντιστοιχία περιγραφής), 
                                τα έξοδα επιστροφής και η αποστολή του νέου προϊόντος επιβαρύνουν αποκλειστικά το <strong>Vaia Charms</strong>.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. Εξαιρέσεις</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-3">
                            Τα ακόλουθα προϊόντα δεν μπορούν να επιστραφούν για λόγους υγιεινής και ασφάλειας:
                        </p>
                        <div className="bg-destructive/10 border border-destructive/20 p-4 sm:p-6 rounded-xl">
                            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground">
                                <li>Καλλυντικά και προϊόντα περιποίησης (εκτός αν είναι ελαττωματικά)</li>
                                <li>Προϊόντα που έχουν προσαρμοστεί ή εξατομικευτεί</li>
                                <li>Προϊόντα σε προσφορά ή εκπτωτικά (πάνω από 50% έκπτωση)</li>
                            </ul>
                        </div>
                    </section>



                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. Επικοινωνία</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-4">
                            Για οποιεσδήποτε ερωτήσεις σχετικά με επιστροφές:
                        </p>
                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 sm:p-6 rounded-xl border border-primary/20">
                            <p className="text-sm sm:text-base font-medium mb-1">📧 Email: info@vaiacharms.gr</p>
                            <p className="text-sm sm:text-base font-medium mb-1">📞 Τηλέφωνο: +30 694 310 5742</p>
                            <p className="text-sm sm:text-base font-medium mb-1">⏰ Ωράριο: Δευτέρα - Παρασκευή, 9:00 - 17:00</p>
                            <p className="text-sm sm:text-base font-medium">📍 Διεύθυνση Επιστροφών: Δράμα, Ελλάδα, Τ.Κ. 66100</p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
