import { ChevronRight, CreditCard, Landmark, Info } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Τρόποι Πληρωμής | Vaia Charms",
    description: "Πληροφορίες σχετικά με τους τρόπους πληρωμής και την τραπεζική κατάθεση στο Vaia Charms.",
};

export default function PaymentMethodsPage() {
    return (
        <main className="min-h-screen py-16 md:py-24 bg-slate-50/50">
            <div className="container mx-auto px-4 md:px-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-12">
                    <Link href="/" className="hover:text-primary transition-colors">Αρχική</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-primary font-medium">Τρόποι Πληρωμής</span>
                </nav>

                <div className="max-w-3xl mx-auto">
                    <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-8 text-slate-900">
                        Πληρωμές
                    </h1>

                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 space-y-10">
                        <section className="space-y-6">
                            <div className="flex items-center gap-4 text-[#C4196D]">
                                <div className="w-12 h-12 bg-[#C4196D]/10 rounded-2xl flex items-center justify-center">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <h2 className="font-display text-2xl font-bold text-slate-800">Ποιες μεθόδους πληρωμής δέχεστε;</h2>
                            </div>
                            <p className="font-body text-slate-600 leading-relaxed pl-16">
                                Μπορείτε να εξοφλήσετε την παραγγελία σας μέσω τραπεζικής κατάθεσης στον ακόλουθο λογαριασμό:
                            </p>
                        </section>

                        <section className="bg-slate-50 rounded-3xl p-8 md:p-10 space-y-6 border border-slate-100">
                            <div className="flex items-center gap-3 mb-2">
                                <Landmark className="w-5 h-5 text-[#C4196D]" />
                                <span className="font-display text-lg font-bold uppercase tracking-wider text-slate-800">Στοιχεία Eurobank</span>
                            </div>
                            
                            <div className="grid gap-6">
                                <div>
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">IBAN</p>
                                    <p className="font-mono text-lg md:text-xl font-bold text-slate-900 break-all bg-white p-4 rounded-xl border border-slate-200">
                                        GR19 0260 2500 0000 9020 1517 209
                                    </p>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Δικαιούχος</p>
                                        <p className="font-display text-lg font-bold text-slate-800">Ioannis Papatheodorou</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Τράπεζα</p>
                                        <p className="font-display text-lg font-bold text-slate-800">Eurobank</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6 pt-4 border-t border-slate-100">
                            <div className="flex gap-4 p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                                <Info className="w-6 h-6 text-blue-500 shrink-0" />
                                <div className="space-y-4">
                                    <p className="font-body text-sm text-slate-700 leading-relaxed italic">
                                        Παρακαλούμε, κατά την κατάθεση να αναγράφετε ως αιτιολογία το ονοματεπώνυμό σας ή/και τον αριθμό παραγγελίας σας, ώστε να είναι δυνατή η ταχύτερη εξυπηρέτησή σας.
                                    </p>
                                    <p className="font-body text-sm font-bold text-[#C4196D]">
                                        Η επεξεργασία της παραγγελίας σας ξεκινά μετά την επιβεβαίωση της πληρωμής. (Θα υπάρξει ακύρωση αν δεν πληρωθεί σε 2-3 μέρες).
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="mt-12 text-center">
                        <Link 
                            href="/products" 
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#C4196D] hover:underline"
                        >
                            Επιστροφή στις Αγορές
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
