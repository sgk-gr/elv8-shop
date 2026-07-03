"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, FileText, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { getOrder, createOrderNote } from "@/lib/woocommerce";
import { toast } from "sonner";

export default function WithdrawalPage() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        orderId: "",
        purchaseDate: "",
        itemsDescription: "",
        declarationChecked: false,
    });
    const [errorMsg, setErrorMsg] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrorMsg(""); // Clear errors on change
    };

    const validateStep1 = () => {
        if (!formData.fullName.trim()) return "Παρακαλώ εισάγετε το ονοματεπώνυμό σας.";
        if (!formData.email.trim() || !formData.email.includes("@")) return "Παρακαλώ εισάγετε ένα έγκυρο email.";
        if (!formData.orderId.trim()) return "Παρακαλώ εισάγετε τον αριθμό παραγγελίας.";
        if (!formData.purchaseDate) return "Παρακαλώ επιλέξτε την ημερομηνία αγοράς/παραλαβής.";
        return "";
    };

    const handleNextStep = async (e: React.FormEvent) => {
        e.preventDefault();
        const error = validateStep1();
        if (error) {
            setErrorMsg(error);
            toast.error(error);
            return;
        }

        setIsLoading(true);
        setErrorMsg("");

        try {
            const numericOrderId = parseInt(formData.orderId.trim(), 10);
            if (isNaN(numericOrderId)) {
                throw new Error("Ο αριθμός παραγγελίας πρέπει να είναι αριθμητικός.");
            }

            // 1. Validate order existence and email match in WooCommerce
            const order = await getOrder(numericOrderId);
            if (!order) {
                throw new Error(`Η παραγγελία #${formData.orderId} δεν βρέθηκε στο σύστημα. Παρακαλώ ελέγξτε ξανά τον αριθμό.`);
            }

            const billingEmail = order.billing?.email?.toLowerCase() || "";
            const enteredEmail = formData.email.trim().toLowerCase();

            if (billingEmail !== enteredEmail) {
                throw new Error("Το email που εισαγάγατε δεν ταιριάζει με το email της παραγγελίας. Χρησιμοποιήστε το email με το οποίο κάνατε την αγορά.");
            }

            // Go to step 2 (Confirmation)
            setStep(2);
        } catch (err: any) {
            setErrorMsg(err.message || "Παρουσιάστηκε ένα σφάλμα κατά την επαλήθευση της παραγγελίας.");
            toast.error(err.message || "Σφάλμα επαλήθευσης");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitWithdrawal = async () => {
        if (!formData.declarationChecked) {
            toast.error("Πρέπει να αποδεχτείτε τη δήλωση υπαναχώρησης.");
            return;
        }

        setIsLoading(true);
        setErrorMsg("");

        try {
            const numericOrderId = parseInt(formData.orderId.trim(), 10);
            
            // Build the note text
            const noteText = `📜 ΑΙΤΗΜΑ ΥΠΑΝΑΧΩΡΗΣΗΣ (Οδηγία ΕΕ 2023/2673)
---------------------------------------------
Όνομα Πελάτη: ${formData.fullName}
Email: ${formData.email}
Τηλέφωνο: ${formData.phone || "Δεν δηλώθηκε"}
Ημερομηνία Αγοράς/Παραλαβής: ${formData.purchaseDate}

Προϊόντα προς επιστροφή:
${formData.itemsDescription.trim() ? formData.itemsDescription : "Όλα τα προϊόντα της παραγγελίας"}

Ο πελάτης δήλωσε ρητά ότι επιθυμεί να υπαναχωρήσει από τη σύμβαση πώλησης σύμφωνα με τους όρους χρήσης.`;

            // Create customer note (triggers WooCommerce email to customer)
            await createOrderNote(numericOrderId, {
                note: noteText,
                customer_note: true, // This sends an email notification automatically
            });

            toast.success("Το αίτημα υπαναχώρησης υποβλήθηκε επιτυχώς!");
            setStep(3);
        } catch (err: any) {
            setErrorMsg(err.message || "Αποτυχία υποβολής αιτήματος. Παρακαλώ δοκιμάστε ξανά.");
            toast.error("Σφάλμα κατά την υποβολή");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="container mx-auto px-4 md:px-8 py-8 md:py-16 max-w-2xl">
            <Link
                href="/returns"
                className="inline-flex items-center gap-1 font-body text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 md:mb-8"
            >
                <ChevronLeft className="w-4 h-4" />
                Πολιτική Επιστροφών
            </Link>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-soft p-6 sm:p-10 relative overflow-hidden">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#C4196D] to-[#E54B8D]" />

                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                        Δήλωση Υπαναχώρησης
                    </h1>
                    <p className="text-sm text-muted-foreground font-body">
                        Σύμφωνα με την ευρωπαϊκή νομοθεσία, έχετε το δικαίωμα να υπαναχωρήσετε από την αγορά σας εντός 14 ημερολογιακών ημερών από την παραλαβή.
                    </p>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-2 mb-8">
                    <div className={`h-1.5 rounded-full flex-1 transition-all ${step >= 1 ? "bg-[#C4196D]" : "bg-slate-100"}`} />
                    <div className={`h-1.5 rounded-full flex-1 transition-all ${step >= 2 ? "bg-[#C4196D]" : "bg-slate-100"}`} />
                    <div className={`h-1.5 rounded-full flex-1 transition-all ${step >= 3 ? "bg-[#C4196D]" : "bg-slate-100"}`} />
                </div>

                {errorMsg && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                        <p className="font-body">{errorMsg}</p>
                    </div>
                )}

                {/* Step 1: Input Form */}
                {step === 1 && (
                    <form onSubmit={handleNextStep} className="space-y-5">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                Ονοματεπώνυμο *
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C4196D] focus:border-transparent text-sm"
                                placeholder="π.χ. Μαρία Παπαδοπούλου"
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C4196D] focus:border-transparent text-sm"
                                    placeholder="π.χ. example@mail.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Τηλέφωνο Επικοινωνίας
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C4196D] focus:border-transparent text-sm"
                                    placeholder="π.χ. 6900000000"
                                />
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Αριθμός Παραγγελίας (#) *
                                </label>
                                <input
                                    type="text"
                                    name="orderId"
                                    required
                                    value={formData.orderId}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C4196D] focus:border-transparent text-sm"
                                    placeholder="π.χ. 12450"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Ημερομηνία Παραλαβής *
                                </label>
                                <input
                                    type="date"
                                    name="purchaseDate"
                                    required
                                    value={formData.purchaseDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C4196D] focus:border-transparent text-sm text-slate-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Προϊόντα προς Επιστροφή
                                </label>
                                <span className="text-[10px] text-muted-foreground">Αφήστε κενό για επιστροφή όλης της παραγγελίας</span>
                            </div>
                            <textarea
                                name="itemsDescription"
                                rows={3}
                                value={formData.itemsDescription}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C4196D] focus:border-transparent text-sm"
                                placeholder="Περιγράψτε ποια προϊόντα επιθυμείτε να επιστρέψετε (π.χ. 1x Ασημένιο Σκουλαρίκι)"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#C4196D] hover:bg-[#A31257] text-white py-4 rounded-xl font-bold tracking-widest text-xs uppercase transition-all flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    ΕΠΑΛΗΘΕΥΣΗ ΠΑΡΑΓΓΕΛΙΑΣ...
                                </>
                            ) : (
                                <>
                                    ΣΥΝΕΧΕΙΑ ΣΤΗΝ ΕΠΙΒΕΒΑΙΩΣΗ
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                )}

                {/* Step 2: Confirmation & Legal Check */}
                {step === 2 && (
                    <div className="space-y-6">
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3 font-body text-sm text-slate-700">
                            <h3 className="font-bold text-slate-900 border-b pb-2 mb-2 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-[#C4196D]" />
                                Ανασκόπηση Στοιχείων
                            </h3>
                            <p><strong>Όνομα:</strong> {formData.fullName}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Τηλέφωνο:</strong> {formData.phone || "Δεν δηλώθηκε"}</p>
                            <p><strong>Παραγγελία:</strong> #{formData.orderId}</p>
                            <p><strong>Ημερομηνία Παραλαβής:</strong> {formData.purchaseDate}</p>
                            {formData.itemsDescription.trim() && (
                                <p><strong>Προϊόντα:</strong> {formData.itemsDescription}</p>
                            )}
                        </div>

                        <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 sm:p-5">
                            <p className="text-xs sm:text-sm text-slate-700 font-body leading-relaxed mb-4">
                                ⚖️ <strong>Νομική Δήλωση:</strong> Με την επιβεβαίωση και υποβολή αυτής της φόρμας, δηλώνω ρητά ότι επιθυμώ να υπαναχωρήσω από τη σύμβαση πώλησης για τα προϊόντα που αναφέρονται παραπάνω και να επιστρέψω τα είδη στην αρχική τους κατάσταση εντός 14 ημερών.
                            </p>

                            <label className="flex items-start gap-3 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={formData.declarationChecked}
                                    onChange={(e) => setFormData(prev => ({ ...prev, declarationChecked: e.target.checked }))}
                                    className="mt-1 w-4 h-4 accent-[#C4196D] cursor-pointer"
                                />
                                <span className="text-xs sm:text-sm font-medium text-slate-900 font-body">
                                    Αποδέχομαι τους όρους υπαναχώρησης και δηλώνω υπεύθυνα την εγκυρότητα των στοιχείων. *
                                </span>
                            </label>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="border border-slate-200 hover:bg-slate-50 text-slate-700 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
                            >
                                ΕΠΙΣΤΡΟΦΗ
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmitWithdrawal}
                                disabled={isLoading || !formData.declarationChecked}
                                className="bg-[#C4196D] hover:bg-[#A31257] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        ΥΠΟΒΟΛΗ...
                                    </>
                                ) : (
                                    "ΥΠΟΒΟΛΗ ΑΙΤΗΜΑΤΟΣ"
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Success Screen */}
                {step === 3 && (
                    <div className="text-center py-8 space-y-6">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-sm border border-green-100">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>

                        <div className="space-y-2">
                            <h2 className="font-display text-2xl font-bold text-slate-900">
                                Επιτυχής Καταχώρηση!
                            </h2>
                            <p className="text-sm text-muted-foreground font-body max-w-md mx-auto leading-relaxed">
                                Το αίτημα υπαναχώρησής σας για την παραγγελία <strong>#{formData.orderId}</strong> καταχωρήθηκε επιτυχώς στο σύστημά μας.
                            </p>
                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 max-w-md mx-auto text-sm text-slate-600 font-body leading-relaxed text-left space-y-2">
                            <p className="font-semibold text-slate-800 text-center mb-1">Τι συμβαίνει στη συνέχεια;</p>
                            <p>📧 Έχει αποσταλεί **αυτόματο email επιβεβαίωσης** στη διεύθυνση <strong>{formData.email}</strong> με τα στοιχεία του αιτήματός σας.</p>
                            <p>📦 Παρακαλούμε προετοιμάστε το δέμα σας και επιστρέψτε το στην αρχική του κατάσταση στη διεύθυνση επιστροφών.</p>
                            <p>💬 Η ομάδα μας θα επεξεργαστεί την επιστροφή και θα επικοινωνήσει μαζί σας μόλις παραλάβουμε το προϊόν.</p>
                        </div>

                        <div className="pt-4">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-body text-xs font-bold tracking-widest transition-all"
                            >
                                ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΑΡΧΙΚΗ
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
