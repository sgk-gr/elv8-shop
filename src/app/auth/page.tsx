"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerCustomer, loginUser } from "@/lib/woocommerce";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight, Mail, Lock, User, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import logoImg from "@/assets/logotipo13.png";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isLogin) {
                // Login Logic using helper
                const data = await loginUser({
                    username: formData.username,
                    password: formData.password
                });

                login(data.token, data);
                toast.success("Συνδεθήκατε με επιτυχία!");
                router.push("/account");
            } else {
                // Registration Logic using WooCommerce API
                try {
                    await registerCustomer({
                        email: formData.email,
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        username: formData.username,
                        password: formData.password,
                    });

                    toast.success("Η εγγραφή ολοκληρώθηκε! Τώρα μπορείτε να συνδεθείτε.");
                    setIsLogin(true);
                } catch (err: any) {
                    toast.error(err.message || "Αποτυχία εγγραφής.");
                }
            }
        } catch (error: any) {
            toast.error(error.message || "Παρουσιάστηκε σφάλμα κατά τη σύνδεση με τον διακομιστή.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-[80vh] flex items-center justify-center py-12 px-4 md:px-8 bg-slate-50/50">
            <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-700">

                {/* Left Side: Image/Branding */}
                <div className="hidden md:block relative overflow-hidden" style={{ backgroundColor: '#C4196D' }}>
                    {/* no gradient */}
                    <div className="absolute inset-0 flex flex-col p-10 text-white space-y-0">
                        {/* Logo - top left with white background */}
                        <div className="flex items-center">
                            <div className="bg-white rounded-full p-4 flex items-center justify-center shadow-lg w-48 h-20">
                                <Image
                                    src={logoImg}
                                    alt="Vaia Charms"
                                    width={160}
                                    height={70}
                                    className="object-contain mix-blend-multiply"
                                    priority
                                />
                            </div>
                        </div>
                        {/* Main content - centered */}
                        <div className="flex flex-col justify-start flex-1 space-y-6 pt-4">
                            <div className="space-y-4">
                                <h2 className="font-display text-4xl font-bold leading-tight">
                                    {isLogin ? "Καλώς ήρθατε στο Vaia Charms" : "Γίνετε μέλος της κοινότητας Vaia Charms"}
                                </h2>
                                <p className="font-body text-white/70 text-lg leading-relaxed">
                                    {isLogin
                                        ? "Συνδεθείτε για να δείτε τις παραγγελίες σας και να διαχειριστείτε το προφίλ σας."
                                        : "Δημιουργήστε λογαριασμό για ταχύτερο checkout και αποκλειστικές προσφορές."}
                                </p>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    <span className="text-sm font-medium">Διαχείριση Παραγγελιών</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    <span className="text-sm font-medium">Αποθήκευση Διεύθυνσης</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    <span className="text-sm font-medium">Προσωποποιημένες Προτάσεις</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="p-8 md:p-16 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full space-y-10">
                        <div className="space-y-2">
                            <h3 className="font-display text-3xl font-bold tracking-tight text-[#C4196D]">
                                {isLogin ? "Σύνδεση" : "Εγγραφή"}
                            </h3>
                            <p className="text-muted-foreground text-sm font-body">
                                {isLogin ? "Δεν έχετε λογαριασμό;" : "Έχετε ήδη λογαριασμό;"}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="ml-2 text-primary font-bold hover:underline"
                                >
                                    {isLogin ? "Δημιουργήστε έναν εδώ" : "Συνδεθείτε εδώ"}
                                </button>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {!isLogin && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Όνομα</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                id="firstName"
                                                placeholder="Πέτρος"
                                                className="pl-10 rounded-xl"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Επώνυμο</Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Παπαδόπουλος"
                                            className="rounded-xl"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="username">{isLogin ? "Username ή Email" : "Στοιχείο Χρήστη (Username)"}</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="username"
                                        placeholder="petros88"
                                        className="pl-10 rounded-xl"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            {!isLogin && (
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="petros@example.com"
                                            className="pl-10 rounded-xl"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Συνθηματικό</Label>
                                    {isLogin && (
                                        <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors font-semibold">
                                            Ξεχάσατε το συνθηματικό;
                                        </Link>
                                    )}
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 rounded-xl"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 rounded-xl font-bold tracking-wide shadow-lg shadow-[#C4196D]/30 bg-[#C4196D] hover:bg-[#a8155d] text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        {isLogin ? "Συνδεση" : "Εγγραφη Τωρα"}
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <p className="text-center text-[10px] text-muted-foreground pt-4">
                            Συνεχίζοντας, συμφωνείτε με τους <Link href="/terms" className="underline">Όρους Χρήσης</Link> και την <Link href="/privacy" className="underline">Πολιτική Απορρήτου</Link> της Vaia Charms.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
