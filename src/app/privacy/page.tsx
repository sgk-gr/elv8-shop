import { ChevronLeft, Shield, Lock, Eye, Database, UserCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Πολιτική Απορρήτου | ELV8 Energy",
    description: "Πολιτική απορρήτου και προστασίας δεδομένων του ELV8 Energy.",
};

export default function PrivacyPolicyPage() {
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
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FF1D8E]/10 rounded-2xl flex items-center justify-center">
                        <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF1D8E]" />
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light">
                        Πολιτική Απορρήτου
                    </h1>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 sm:mb-12">
                    Τελευταία ενημέρωση: {new Date().toLocaleDateString('el-GR')}
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
                    {[
                        { icon: Lock, label: "Ασφαλή Δεδομένα", color: "bg-blue-500" },
                        { icon: Eye, label: "Διαφάνεια", color: "bg-green-500" },
                        { icon: Database, label: "Κρυπτογράφηση", color: "bg-purple-500" },
                        { icon: UserCheck, label: "Τα Δικαιώματά σας", color: "bg-[#FF1D8E]" },
                    ].map((item, i) => (
                        <div key={i} className="bg-secondary/50 p-4 rounded-xl flex flex-col items-center text-center gap-2">
                            <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center`}>
                                <item.icon className="w-5 h-5 text-white" />
                            </div>
                            <p className="text-xs font-bold">{item.label}</p>
                        </div>
                    ))}
                </div>

                <div className="prose prose-sm sm:prose-base max-w-none space-y-6 sm:space-y-8">
                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. Εισαγωγή</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            Στο ELV8 Energy, σεβόμαστε την ιδιωτικότητά σας και δεσμευόμαστε να προστατεύουμε τα προσωπικά σας δεδομένα.
                            Αυτή η πολιτική απορρήτου εξηγεί πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τις πληροφορίες σας κατά
                            την αγορά των ενεργειακών μας ποτών.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. Πληροφορίες που Συλλέγουμε</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-3">
                            Συλλέγουμε διάφορους τύπους πληροφοριών για να σας παρέχουμε και να βελτιώσουμε τις υπηρεσίες μας:
                        </p>
                        <div className="bg-secondary/30 p-4 sm:p-6 rounded-xl space-y-3">
                            <div>
                                <h3 className="font-bold text-sm sm:text-base mb-2">Πληροφορίες που παρέχετε:</h3>
                                <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-muted-foreground ml-4">
                                    <li>Όνομα και επώνυμο</li>
                                    <li>Διεύθυνση email</li>
                                    <li>Αριθμός τηλεφώνου</li>
                                    <li>Διεύθυνση αποστολής και χρέωσης</li>
                                    <li>Στοιχεία πληρωμής (κρυπτογραφημένα)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm sm:text-base mb-2">Πληροφορίες που συλλέγονται αυτόματα:</h3>
                                <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-muted-foreground ml-4">
                                    <li>Διεύθυνση IP</li>
                                    <li>Τύπος προγράμματος περιήγησης</li>
                                    <li>Ιστορικό περιήγησης στην ιστοσελίδα</li>
                                    <li>Cookies και παρόμοιες τεχνολογίες</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. Πώς Χρησιμοποιούμε τις Πληροφορίες σας</h2>
                        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground ml-4">
                            <li>Επεξεργασία και εκτέλεση των παραγγελιών σας</li>
                            <li>Επικοινωνία μαζί σας σχετικά με τις παραγγελίες σας</li>
                            <li>Βελτίωση της ιστοσελίδας και των υπηρεσιών μας</li>
                            <li>Αποστολή ενημερώσεων και προσφορών (με τη συγκατάθεσή σας)</li>
                            <li>Πρόληψη απάτης και ενίσχυση της ασφάλειας</li>
                            <li>Συμμόρφωση με νομικές υποχρεώσεις</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. Κοινοποίηση Πληροφοριών</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-3">
                            Δεν πουλάμε, ενοικιάζουμε ή ανταλλάσσουμε τα προσωπικά σας δεδομένα με τρίτους. Μπορεί να κοινοποιήσουμε
                            πληροφορίες μόνο στις ακόλουθες περιπτώσεις:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground ml-4">
                            <li>Με εταιρείες αποστολών για την παράδοση των παραγγελιών σας</li>
                            <li>Όταν απαιτείται από το νόμο ή για την προστασία των δικαιωμάτων μας</li>
                            <li>Με τη ρητή συγκατάθεσή σας</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. Ασφάλεια Δεδομένων</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            Λαμβάνουμε σοβαρά μέτρα ασφαλείας για την προστασία των προσωπικών σας δεδομένων, συμπεριλαμβανομένης της
                            κρυπτογράφησης SSL, ασφαλών servers και περιορισμένης πρόσβασης. Ωστόσο, καμία μέθοδος μετάδοσης μέσω
                            διαδικτύου δεν είναι 100% ασφαλής.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. Cookies</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας. Μπορείτε να ελέγξετε τη χρήση των cookies μέσω
                            των ρυθμίσεων του προγράμματος περιήγησής σας. Η απενεργοποίηση των cookies μπορεί να επηρεάσει τη λειτουργικότητα
                            της ιστοσελίδας.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7. Τα Δικαιώματά σας (GDPR)</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-3">
                            Σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR), έχετε τα ακόλουθα δικαιώματα:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {[
                                "Δικαίωμα πρόσβασης στα δεδομένα σας",
                                "Δικαίωμα διόρθωσης ανακριβών δεδομένων",
                                "Δικαίωμα διαγραφής (δικαίωμα στη λήθη)",
                                "Δικαίωμα περιορισμού της επεξεργασίας",
                                "Δικαίωμα φορητότητας δεδομένων",
                                "Δικαίωμα εναντίωσης στην επεξεργασία"
                            ].map((right, i) => (
                                <div key={i} className="bg-[#FF1D8E]/5 p-3 rounded-lg text-xs sm:text-sm">
                                    ✓ {right}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">8. Επικοινωνία</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-4">
                            Για οποιεσδήποτε ερωτήσεις σχετικά με την πολιτική απορρήτου ή για να ασκήσετε τα δικαιώματά σας:
                        </p>
                        <div className="bg-gradient-to-br from-[#FF1D8E]/10 to-[#FF1D8E]/5 p-4 sm:p-6 rounded-xl border border-[#FF1D8E]/20">
                            <p className="text-sm sm:text-base font-medium mb-1">📧 Email: info@elv8now.com</p>
                            <p className="text-sm sm:text-base font-medium">🌐 Website: elv8now.com</p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
