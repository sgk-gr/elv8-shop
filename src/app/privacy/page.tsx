"use client";

import { ChevronLeft, Shield, Lock, Eye, Database, UserCheck } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function PrivacyPolicyPage() {
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
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FF1D8E]/10 rounded-2xl flex items-center justify-center">
                        <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF1D8E]" />
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light">
                        {isEl ? "Πολιτική Απορρήτου" : "Privacy Policy"}
                    </h1>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 sm:mb-12">
                    {isEl ? "Τελευταία ενημέρωση: " : "Last updated: "}
                    {new Date().toLocaleDateString(isEl ? 'el-GR' : 'en-US')}
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
                    {[
                        { icon: Lock, label: isEl ? "Ασφαλή Δεδομένα" : "Secure Data", color: "bg-blue-500" },
                        { icon: Eye, label: isEl ? "Διαφάνεια" : "Transparency", color: "bg-green-500" },
                        { icon: Database, label: isEl ? "Κρυπτογράφηση" : "Encryption", color: "bg-purple-500" },
                        { icon: UserCheck, label: isEl ? "Τα Δικαιώματά σας" : "Your Rights", color: "bg-[#FF1D8E]" },
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
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "1. Εισαγωγή" : "1. Introduction"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {isEl ? (
                                "Στο ELV8 Energy, σεβόμαστε την ιδιωτικότητά σας και δεσμευόμαστε να προστατεύουμε τα προσωπικά σας δεδομένα. Αυτή η πολιτική απορρήτου εξηγεί πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τις πληροφορίες σας κατά την αγορά των ενεργειακών μας ποτών."
                            ) : (
                                "At ELV8 Energy, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your information when you purchase our energy drinks."
                            )}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "2. Πληροφορίες που Συλλέγουμε" : "2. Information We Collect"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-3">
                            {isEl ? (
                                "Συλλέγουμε διάφορους τύπους πληροφοριών για να σας παρέχουμε και να βελτιώσουμε τις υπηρεσίες μας:"
                            ) : (
                                "We collect various types of information to provide and improve our services for you:"
                            )}
                        </p>
                        <div className="bg-secondary/30 p-4 sm:p-6 rounded-xl space-y-3">
                            <div>
                                <h3 className="font-bold text-sm sm:text-base mb-2">
                                    {isEl ? "Πληροφορίες που παρέχετε:" : "Information you provide:"}
                                </h3>
                                <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-muted-foreground ml-4">
                                    {isEl ? (
                                        <>
                                            <li>Όνομα και επώνυμο</li>
                                            <li>Διεύθυνση email</li>
                                            <li>Αριθμός τηλεφώνου</li>
                                            <li>Διεύθυνση αποστολής και χρέωσης</li>
                                            <li>Στοιχεία πληρωμής (κρυπτογραφημένα)</li>
                                        </>
                                    ) : (
                                        <>
                                            <li>First and last name</li>
                                            <li>Email address</li>
                                            <li>Phone number</li>
                                            <li>Shipping and billing address</li>
                                            <li>Payment information (encrypted)</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm sm:text-base mb-2">
                                    {isEl ? "Πληροφορίες που συλλέγονται αυτόματα:" : "Automatically collected information:"}
                                </h3>
                                <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-muted-foreground ml-4">
                                    {isEl ? (
                                        <>
                                            <li>Διεύθυνση IP</li>
                                            <li>Τύπος προγράμματος περιήγησης</li>
                                            <li>Ιστορικό περιήγησης στην ιστοσελίδα</li>
                                            <li>Cookies και παρόμοιες τεχνολογίες</li>
                                        </>
                                    ) : (
                                        <>
                                            <li>IP address</li>
                                            <li>Browser type</li>
                                            <li>Browsing history on our website</li>
                                            <li>Cookies and similar technologies</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "3. Πώς Χρησιμοποιούμε τις Πληροφορίες σας" : "3. How We Use Your Information"}
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground ml-4">
                            {isEl ? (
                                <>
                                    <li>Επεξεργασία και εκτέλεση των παραγγελιών σας</li>
                                    <li>Επικοινωνία μαζί σας σχετικά με τις παραγγελίες σας</li>
                                    <li>Βελτίωση της ιστοσελίδας και των υπηρεσιών μας</li>
                                    <li>Αποστολή ενημερώσεων και προσφορών (με τη συγκατάθεσή σας)</li>
                                    <li>Πρόληψη απάτης και ενίσχυση της ασφάλειας</li>
                                    <li>Συμμόρφωση με νομικές υποχρεώσεις</li>
                                </>
                            ) : (
                                <>
                                    <li>Process and execute your orders</li>
                                    <li>Communicate with you regarding your orders</li>
                                    <li>Improve our website and services</li>
                                    <li>Send updates and offers (with your consent)</li>
                                    <li>Prevent fraud and enhance security</li>
                                    <li>Comply with legal obligations</li>
                                </>
                            )}
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "4. Κοινοποίηση Πληροφοριών" : "4. Information Sharing"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-3">
                            {isEl ? (
                                "Δεν πουλάμε, ενοικιάζουμε ή ανταλλάσσουμε τα προσωπικά σας δεδομένα με τρίτους. Μπορεί να κοινοποιήσουμε πληροφορίες μόνο στις ακόλουθες περιπτώσεις:"
                            ) : (
                                "We do not sell, rent, or trade your personal data with third parties. We may share information only in the following cases:"
                            )}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground ml-4">
                            {isEl ? (
                                <>
                                    <li>Με εταιρείες αποστολών για την παράδοση των παραγγελιών σας</li>
                                    <li>Όταν απαιτείται από το νόμο ή για την προστασία των δικαιωμάτων μας</li>
                                    <li>Με τη ρητή συγκατάθεσή σας</li>
                                </>
                            ) : (
                                <>
                                    <li>With shipping companies for the delivery of your orders</li>
                                    <li>When required by law or to protect our rights</li>
                                    <li>With your explicit consent</li>
                                </>
                            )}
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "5. Ασφάλεια Δεδομένων" : "5. Data Security"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {isEl ? (
                                "Λαμβάνουμε σοβαρά μέτρα ασφαλείας για την προστασία των προσωπικών σας δεδομένων, συμπεριλαμβανομένης της κρυπτογράφησης SSL, ασφαλών servers και περιορισμένης πρόσβασης. Ωστόσο, καμία μέθοδος μετάδοσης μέσω διαδικτύου δεν είναι 100% ασφαλής."
                            ) : (
                                "We take serious security measures to protect your personal data, including SSL encryption, secure servers, and restricted access. However, no method of transmission over the internet is 100% secure."
                            )}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "6. Cookies" : "6. Cookies"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {isEl ? (
                                "Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας. Μπορείτε να ελέγξετε τη χρήση των cookies μέσω των ρυθμίσεων του προγράμματος περιήγησής σας. Η απενεργοποίηση των cookies μπορεί να επηρεάσει τη λειτουργικότητα της ιστοσελίδας."
                            ) : (
                                "We use cookies to improve your experience. You can control the use of cookies through your browser settings. Disabling cookies may affect the functionality of our website."
                            )}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "7. Τα Δικαιώματά σας (GDPR)" : "7. Your Rights (GDPR)"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-3">
                            {isEl ? (
                                "Σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR), έχετε τα ακόλουθα δικαιώματα:"
                            ) : (
                                "According to the General Data Protection Regulation (GDPR), you have the following rights:"
                            )}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {(isEl ? [
                                "Δικαίωμα πρόσβασης στα δεδομένα σας",
                                "Δικαίωμα διόρθωσης ανακριβών δεδομένων",
                                "Δικαίωμα διαγραφής (δικαίωμα στη λήθη)",
                                "Δικαίωμα περιορισμού της επεξεργασίας",
                                "Δικαίωμα φορητότητας δεδομένων",
                                "Δικαίωμα εναντίωσης στην επεξεργασία"
                            ] : [
                                "Right to access your data",
                                "Right to rectify inaccurate data",
                                "Right to erasure (right to be forgotten)",
                                "Right to restrict processing",
                                "Right to data portability",
                                "Right to object to processing"
                            ]).map((right, i) => (
                                <div key={i} className="bg-[#FF1D8E]/5 p-3 rounded-lg text-xs sm:text-sm">
                                    ✓ {right}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                            {isEl ? "8. Επικοινωνία" : "8. Contact Us"}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-4">
                            {isEl ? (
                                "Για οποιεσδήποτε ερωτήσεις σχετικά με την πολιτική απορρήτου ή για να ασκήσετε τα δικαιώματά σας:"
                            ) : (
                                "For any questions regarding the privacy policy or to exercise your rights:"
                            )}
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
