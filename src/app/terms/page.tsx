import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
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
                    Όροι Χρήσης
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 sm:mb-12">
                    Τελευταία ενημέρωση: {new Date().toLocaleDateString('el-GR')}
                </p>

                <div className="prose prose-sm sm:prose-base max-w-none space-y-6 sm:space-y-8">
                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">1. Αποδοχή Όρων</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            Καλώς ήρθατε στο Vaia Charms. Χρησιμοποιώντας την ιστοσελίδα μας, αποδέχεστε αυτούς τους όρους χρήσης στο σύνολό τους.
                            Εάν δεν συμφωνείτε με οποιοδήποτε μέρος αυτών των όρων, παρακαλούμε μην χρησιμοποιείτε την ιστοσελίδα μας.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">2. Χρήση της Υπηρεσίας</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-3">
                            Η χρήση της ιστοσελίδας μας επιτρέπεται μόνο για νόμιμους σκοπούς. Συμφωνείτε να μην χρησιμοποιείτε την ιστοσελίδα:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground ml-4">
                            <li>Με τρόπο που παραβιάζει οποιονδήποτε εθνικό ή διεθνή νόμο ή κανονισμό</li>
                            <li>Με τρόπο που είναι παράνομος ή απατηλός</li>
                            <li>Για να μεταδώσετε ή να στείλετε ανεπιθύμητο υλικό διαφήμισης ή προώθησης</li>
                            <li>Για να μεταδώσετε κακόβουλο λογισμικό ή άλλο επιβλαβές υλικό</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">3. Λογαριασμός Χρήστη</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            Για να πραγματοποιήσετε αγορές, πρέπει να δημιουργήσετε έναν λογαριασμό. Είστε υπεύθυνοι για τη διατήρηση της
                            εμπιστευτικότητας του λογαριασμού σας και του κωδικού πρόσβασής σας. Αποδέχεστε την ευθύνη για όλες τις
                            δραστηριότητες που πραγματοποιούνται μέσω του λογαριασμού σας.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">4. Παραγγελίες και Πληρωμές</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-3">
                            Όλες οι παραγγελίες υπόκεινται σε διαθεσιμότητα και επιβεβαίωση της τιμής. Διατηρούμε το δικαίωμα να
                            αρνηθούμε ή να ακυρώσουμε οποιαδήποτε παραγγελία για οποιονδήποτε λόγο.
                        </p>
                        <div className="text-sm sm:text-base leading-relaxed text-muted-foreground space-y-2">
                            <p>Οι τιμές που αναφέρονται στην ιστοσελίδα μας είναι σε ευρώ (€) και περιλαμβάνουν ΦΠΑ. Αποδεχόμαστε πληρωμές μέσω τραπεζικής κατάθεσης στον ακόλουθο λογαριασμό:</p>
                            <div className="bg-secondary/30 p-4 rounded-xl font-mono text-xs sm:text-sm">
                                <p><strong>IBAN:</strong> GR19 0260 2500 0000 9020 1517 209</p>
                                <p><strong>Δικαιούχος:</strong> Ioannis Papatheodorou</p>
                                <p><strong>Τράπεζα:</strong> Eurobank</p>
                            </div>
                            <p className="text-xs italic">Η επεξεργασία της παραγγελίας ξεκινά μετά την επιβεβαίωση της κατάθεσης.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">5. Πνευματικά Δικαιώματα</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            Όλο το περιεχόμενο της ιστοσελίδας, συμπεριλαμβανομένων κειμένων, γραφικών, λογοτύπων, εικόνων και λογισμικού,
                            είναι ιδιοκτησία του Vaia Charms και προστατεύεται από τους νόμους πνευματικής ιδιοκτησίας. Απαγορεύεται η
                            αναπαραγωγή χωρίς γραπτή άδεια.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">6. Περιορισμός Ευθύνης</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            Το Vaia Charms δεν φέρει ευθύνη για οποιεσδήποτε άμεσες, έμμεσες, τυχαίες ή επακόλουθες ζημίες που προκύπτουν
                            από τη χρήση ή την αδυναμία χρήσης της ιστοσελίδας μας ή των προϊόντων που αγοράζονται μέσω αυτής.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7. Τροποποιήσεις Όρων</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            Διατηρούμε το δικαίωμα να τροποποιούμε αυτούς τους όρους ανά πάσα στιγμή. Οι αλλαγές θα τίθενται σε ισχύ
                            αμέσως μετά τη δημοσίευσή τους στην ιστοσελίδα. Η συνεχής χρήση της ιστοσελίδας μετά από τέτοιες αλλαγές
                            συνιστά αποδοχή των νέων όρων.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">8. Εφαρμοστέο Δίκαιο</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            Οι παρόντες όροι διέπονται και ερμηνεύονται σύμφωνα με τους νόμους της Ελλάδας. Οποιαδήποτε διαφορά που
                            προκύπτει από αυτούς τους όρους υπόκειται στην αποκλειστική δικαιοδοσία των δικαστηρίων της Αθήνας.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">9. Επικοινωνία</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            Για οποιεσδήποτε ερωτήσεις σχετικά με αυτούς τους όρους χρήσης, παρακαλούμε επικοινωνήστε μαζί μας στο:
                        </p>
                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 sm:p-6 rounded-xl border border-primary/20 mt-4">
                            <p className="text-sm sm:text-base font-medium mb-1">📧 Email: info@vaiacharms.gr</p>
                            <p className="text-sm sm:text-base font-medium mb-1">📞 Τηλέφωνο: +30 694 310 5742</p>
                            <p className="text-sm sm:text-base font-medium">📍 Διεύθυνση: Δράμα, Ελλάδα, Τ.Κ. 66100</p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
