"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserOrders } from "@/lib/woocommerce";
import { Button } from "@/components/ui/button";
import {
    User as UserIcon,
    Package,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    CreditCard,
    MapPin,
    ShoppingBag,
    Bell
} from "lucide-react";
import { toast } from "sonner";

export default function AccountPage() {
    const { user, logout, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [orders, setOrders] = useState<any[]>([]);
    const [isOrdersLoading, setIsOrdersLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/auth");
        }
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        if (!user) return;
        setIsOrdersLoading(true);
        try {
            const data = await getUserOrders(user.id || 0, user.email);
            // Filter out internal checkout drafts
            setOrders(data.filter((order: any) => order.status !== 'checkout-draft'));
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Αποτυχία φόρτωσης παραγγελιών.");
        } finally {
            setIsOrdersLoading(false);
        }
    };

    if (isLoading || !user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        toast.success("Αποσυνδεθήκατε επιτυχώς.");
        router.push("/");
    };

    return (
        <main className="container mx-auto px-4 py-8 md:py-20 overflow-hidden">
            <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">

                {/* Sidebar Navigation */}
                <aside className="space-y-6 animate-in slide-in-from-left-8 duration-700 w-full overflow-hidden">
                    <div className="bg-white p-6 rounded-[2rem] shadow-soft border border-slate-100 flex flex-col items-center text-center space-y-4">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary border-4 border-white shadow-lg overflow-hidden shrink-0">
                            <UserIcon className="w-8 h-8" />
                        </div>
                        <div className="min-w-0 w-full px-2">
                            <h2 className="font-display text-lg font-bold truncate">{user.firstName} {user.lastName}</h2>
                            <p className="text-muted-foreground text-xs font-body mt-0.5 truncate">{user.email}</p>
                            <div className="mt-2">
                                <span className="bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                                    Premium Member
                                </span>
                            </div>
                        </div>
                    </div>

                    <nav className="bg-white rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden">
                        <div className="p-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1">
                            {[
                                { id: "dashboard", label: "Dashboard", icon: UserIcon },
                                { id: "orders", label: "Παραγγελίες", icon: Package },
                                { id: "addresses", label: "Διευθύνσεις", icon: MapPin },
                                { id: "payments", label: "Πληρωμές", icon: CreditCard },
                                { id: "notifications", label: "Ειδοποιήσεις", icon: Bell },
                                { id: "settings", label: "Ρυθμίσεις", icon: Settings },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`flex flex-col lg:flex-row items-center lg:justify-between p-2.5 lg:p-4 rounded-2xl transition-all group ${activeTab === item.id
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "hover:bg-slate-50 text-muted-foreground hover:text-primary"
                                        }`}
                                >
                                    <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-3">
                                        <item.icon className={`w-4 h-4 lg:w-5 lg:h-5 transition-transform ${activeTab === item.id ? "" : "group-hover:scale-110"}`} />
                                        <span className="font-body text-[8px] lg:text-sm font-bold lg:font-semibold uppercase lg:normal-case tracking-tighter lg:tracking-normal">{item.label}</span>
                                    </div>
                                    <ChevronRight className={`hidden lg:block w-4 h-4 transition-transform ${activeTab === item.id ? "rotate-90 opacity-40" : "opacity-20 group-hover:opacity-100"}`} />
                                </button>
                            ))}
                            <div className="col-span-full hidden lg:block px-4 py-2 my-2 border-t border-slate-50" />
                            <button
                                onClick={handleLogout}
                                className="col-span-full flex items-center justify-center lg:justify-start gap-2 p-3 lg:p-4 rounded-2xl text-destructive hover:bg-destructive/10 transition-all font-body text-[10px] lg:text-sm font-bold group"
                            >
                                <LogOut className="w-4 h-4 lg:w-5 lg:h-5 group-hover:-translate-x-1 transition-transform" />
                                <span>Αποσύνδεση</span>
                            </button>
                        </div>
                    </nav>
                </aside>

                {/* Content */}
                <section className="space-y-6 md:space-y-8 animate-in slide-in-from-right-8 duration-700">
                    <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-soft border border-slate-100 min-h-[500px] md:min-h-[600px]">

                        {activeTab === "dashboard" && (
                            <div className="space-y-8 md:space-y-10">
                                <div className="space-y-3 md:space-y-4">
                                    <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tight">Γεια σου, {user.firstName}! 👋</h1>
                                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl font-body">
                                        Από εδώ μπορείς να διαχειρίζεσαι τις παραγγελίες σου και να βλέπεις τα στοιχεία σου.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                    {[
                                        {
                                            label: "Ενεργές Παραγγελίες",
                                            value: orders.filter(o => ['processing', 'on-hold', 'pending'].includes(o.status)).length.toString(),
                                            icon: ShoppingBag,
                                            color: "bg-blue-500"
                                        },
                                        {
                                            label: "Συνολικά Προϊόντα",
                                            value: orders.reduce((acc, o) => acc + (o.line_items?.length || 0), 0).toString(),
                                            icon: Package,
                                            color: "bg-purple-500"
                                        },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-slate-50 p-5 md:p-6 rounded-3xl border border-slate-100 flex md:flex-col items-center md:items-start gap-4 md:space-y-4 hover:shadow-md transition-shadow">
                                            <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.color} text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shrink-0`}>
                                                <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                                            </div>
                                            <div className="space-y-0.5 md:space-y-1">
                                                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
                                                <p className="text-xl md:text-3xl font-display font-bold">{stat.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 md:pt-10 space-y-4 md:space-y-6">
                                    <h3 className="font-display text-xl md:text-2xl font-bold">Πρόσφατη Δραστηριότητα</h3>
                                    {orders.length > 0 ? (
                                        <div className="bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-slate-100 space-y-4 md:space-y-6">
                                            {orders.slice(0, 2).map((order) => (
                                                <div key={order.id} className="flex items-center justify-between group cursor-pointer" onClick={() => { setSelectedOrder(order); setActiveTab("orders"); }}>
                                                    <div className="flex items-center gap-3 md:gap-4 min-w-0">
                                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm text-primary shrink-0">
                                                            <ShoppingBag className="w-5 h-5" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-body font-bold text-sm truncate">Παραγγελία #{order.id}</p>
                                                            <p className="text-[10px] md:text-xs text-muted-foreground">{new Date(order.date_created).toLocaleDateString('el-GR')}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <p className="font-display font-bold text-sm">{order.total}€</p>
                                                        <p className="hidden md:block text-[10px] text-primary font-bold uppercase tracking-widest">Δείτε λεπτομέρειες</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-slate-100 rounded-[2rem] p-8 md:p-12 text-center space-y-4">
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                                                <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-slate-300" />
                                            </div>
                                            <p className="text-muted-foreground font-body text-sm italic">Δεν έχετε ακόμα δραστηριότητα.</p>
                                            <Button onClick={() => router.push("/products")} className="rounded-full px-6 md:px-8">Πάμε στα Προϊόντα</Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "orders" && (
                            <div className="space-y-6 md:space-y-8">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <h2 className="font-display text-2xl md:text-3xl font-bold">
                                            {selectedOrder ? `Παραγγελία #${selectedOrder.id}` : "Οι Παραγγελίες σας"}
                                        </h2>
                                        <p className="text-muted-foreground text-sm md:text-base font-body">
                                            {selectedOrder ? "Λεπτομέρειες και εξέλιξη." : "Ιστορικό αγορών."}
                                        </p>
                                    </div>
                                    {selectedOrder && (
                                        <Button
                                            variant="outline"
                                            onClick={() => setSelectedOrder(null)}
                                            className="rounded-full gap-2 w-full sm:w-auto"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Επιστροφή
                                        </Button>
                                    )}
                                </div>

                                {isOrdersLoading ? (
                                    <div className="py-20 flex justify-center">
                                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                    </div>
                                ) : selectedOrder ? (
                                    /* Order Detail View */
                                    <div className="space-y-6 sm:space-y-8 md:space-y-10 animate-in fade-in duration-500">
                                        <div className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-8">
                                            <div className="bg-slate-50 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl space-y-3 sm:space-y-4">
                                                <h4 className="font-display font-bold uppercase tracking-widest text-[9px] sm:text-[10px] text-muted-foreground">Στοιχεία Αποστολής</h4>
                                                <div className="font-body text-xs sm:text-sm space-y-1">
                                                    <p className="font-bold">{selectedOrder.shipping?.first_name} {selectedOrder.shipping?.last_name}</p>
                                                    <p>{selectedOrder.shipping?.address_1}</p>
                                                    <p>{selectedOrder.shipping?.city}, {selectedOrder.shipping?.postcode}</p>
                                                    <p className="break-all text-[11px] sm:text-xs">{selectedOrder.billing?.email}</p>
                                                    <p>{selectedOrder.billing?.phone}</p>
                                                </div>
                                            </div>
                                            <div className="bg-slate-50 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl space-y-3 sm:space-y-4">
                                                <h4 className="font-display font-bold uppercase tracking-widest text-[9px] sm:text-[10px] text-muted-foreground">Σύνοψη Πληρωμής</h4>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-xs sm:text-sm gap-2">
                                                        <span className="text-muted-foreground">Μέθοδος:</span>
                                                        <span className="font-medium text-right break-words">{selectedOrder.payment_method_title}</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs sm:text-sm">
                                                        <span className="text-muted-foreground">Υποσύνολο:</span>
                                                        <span className="font-medium">{selectedOrder.total}€</span>
                                                    </div>
                                                    <div className="pt-2 border-t border-slate-200 flex justify-between">
                                                        <span className="font-bold text-sm sm:text-base">Σύνολο:</span>
                                                        <span className="font-display font-bold text-base sm:text-lg md:text-xl text-primary">{selectedOrder.total}€</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3 sm:space-y-4">
                                            <h4 className="font-display font-bold uppercase tracking-widest text-[9px] sm:text-[10px] text-muted-foreground">Προϊόντα</h4>
                                            <div className="border border-slate-100 rounded-2xl sm:rounded-3xl overflow-hidden divide-y divide-slate-100">
                                                {selectedOrder.line_items.map((item: any) => (
                                                    <div key={item.id} className="flex items-center justify-between p-3 sm:p-4 md:p-6 bg-white gap-3 sm:gap-4">
                                                        <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 min-w-0 flex-1">
                                                            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-slate-50 rounded-lg sm:rounded-xl flex items-center justify-center text-xs overflow-hidden shrink-0">
                                                                {item.image ? (
                                                                    <img src={item.image.src} alt={item.name} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <Package className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-slate-300" />
                                                                )}
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <p className="font-body font-bold text-xs sm:text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: item.name }} />
                                                                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Ποσότητα: {item.quantity}</p>
                                                            </div>
                                                        </div>
                                                        <p className="font-display font-bold text-xs sm:text-sm md:text-base shrink-0">{item.total}€</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : orders.length > 0 ? (
                                    /* Orders List/Card View for Mobile, Table for Desktop */
                                    <div className="space-y-4">
                                        {/* Mobile View */}
                                        <div className="grid gap-3 md:hidden">
                                            {orders.map((order) => (
                                                <div
                                                    key={order.id}
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3 active:scale-[0.98] transition-all"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div className="space-y-0.5">
                                                            <p className="font-body font-bold text-sm">#{order.id}</p>
                                                            <p className="text-[10px] text-muted-foreground">{new Date(order.date_created).toLocaleDateString('el-GR')}</p>
                                                        </div>
                                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${order.status === 'completed' ? 'bg-green-100 text-green-600' :
                                                            order.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                                                                order.status === 'on-hold' ? 'bg-amber-100 text-amber-600' :
                                                                    'bg-slate-100 text-slate-600'
                                                            }`}>
                                                            {order.status === 'completed' ? 'Ολοκληρώθηκε' :
                                                                order.status === 'processing' ? 'Σε επεξεργασία' :
                                                                    order.status === 'on-hold' ? 'Σε αναμονή' :
                                                                        order.status === 'pending' ? 'Εκκρεμεί' :
                                                                            order.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-2 border-t border-slate-200/50">
                                                        <p className="font-display font-bold text-base">{order.total}€</p>
                                                        <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Λεπτομέρειες →</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Desktop View */}
                                        <div className="hidden md:block overflow-x-auto">
                                            <table className="w-full text-sm text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-slate-100">
                                                        <th className="py-4 px-4 font-display font-bold uppercase tracking-widest text-[10px] text-muted-foreground">ID</th>
                                                        <th className="py-4 px-4 font-display font-bold uppercase tracking-widest text-[10px] text-muted-foreground">Ημερομηνία</th>
                                                        <th className="py-4 px-4 font-display font-bold uppercase tracking-widest text-[10px] text-muted-foreground">Κατάσταση</th>
                                                        <th className="py-4 px-4 font-display font-bold uppercase tracking-widest text-[10px] text-muted-foreground text-right">Σύνολο</th>
                                                        <th className="py-4 px-4"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-50">
                                                    {orders.map((order) => (
                                                        <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                                                            <td className="py-4 px-4 font-body font-bold">#{order.id}</td>
                                                            <td className="py-4 px-4 text-muted-foreground">
                                                                {new Date(order.date_created).toLocaleDateString('el-GR')}
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'completed' ? 'bg-green-100 text-green-600' :
                                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                                                                        order.status === 'on-hold' ? 'bg-amber-100 text-amber-600' :
                                                                            'bg-slate-100 text-slate-600'
                                                                    }`}>
                                                                    {order.status === 'completed' ? 'Ολοκληρώθηκε' :
                                                                        order.status === 'processing' ? 'Σε επεξεργασία' :
                                                                            order.status === 'on-hold' ? 'Σε αναμονή' :
                                                                                order.status === 'pending' ? 'Εκκρεμεί πληρωμή' :
                                                                                    order.status}
                                                                </span>
                                                            </td>
                                                            <td className="py-4 px-4 text-right font-display font-bold">
                                                                {order.total}€
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="rounded-full text-[10px] font-bold uppercase tracking-widest"
                                                                    onClick={() => setSelectedOrder(order)}
                                                                >
                                                                    Λεπτομέρειες
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-16 md:py-20 space-y-4 md:space-y-6">
                                        <Package className="w-16 h-16 md:w-20 md:h-20 text-slate-200 mx-auto" />
                                        <p className="text-muted-foreground font-body text-sm md:text-base">Δεν υπάρχουν ακόμα παραγγελίες.</p>
                                        <Button onClick={() => router.push("/products")} className="rounded-full px-8 md:px-10">Ξεκινήστε τις Αγορές</Button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab !== "dashboard" && activeTab !== "orders" && (
                            <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center space-y-4">
                                <Settings className="w-10 h-10 md:w-12 md:h-12 text-slate-200 animate-spin-slow" />
                                <p className="text-muted-foreground font-body text-sm md:text-base italic">Αυτή η ενότητα θα είναι σύντομα διαθέσιμη.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
