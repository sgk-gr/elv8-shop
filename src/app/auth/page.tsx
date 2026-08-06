"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerCustomer, loginUser } from "@/lib/woocommerce";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight, Mail, Lock, User, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();
    const { t, language } = useTranslation();
    const isEl = language === "el";

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
                toast.success(isEl ? "Συνδεθήκατε με επιτυχία!" : "Logged in successfully!");
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

                    toast.success(isEl ? "Η εγγραφή ολοκληρώθηκε! Τώρα μπορείτε να συνδεθείτε." : "Registration complete! You can now log in.");
                    setIsLogin(true);
                } catch (err: any) {
                    toast.error(err.message || (isEl ? "Αποτυχία εγγραφής." : "Registration failed."));
                }
            }
        } catch (error: any) {
            toast.error(error.message || (isEl ? "Παρουσιάστηκε σφάλμα κατά τη σύνδεση." : "An error occurred during connection."));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-[80vh] flex items-center justify-center py-12 px-4 md:px-8 bg-gradient-to-br from-pink-50/60 via-white to-yellow-50/60">
            <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-700">

                {/* Left Side: Image/Branding */}
                <div className="hidden md:block relative overflow-hidden bg-gradient-to-br from-[#FF1D8E] via-[#FF5E97] to-[#FDE047]">
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                    <div className="relative z-10 flex flex-col p-10 text-white space-y-0 h-full">
                        {/* Logo - top left */}
                        <div className="flex items-center">
                            <span className="font-display text-4xl font-black tracking-widest text-white uppercase border-2 border-white px-4 py-1.5 rounded-2xl">
                                ELV8
                            </span>
                        </div>
                        {/* Main content - centered */}
                        <div className="flex flex-col justify-start flex-1 space-y-6 pt-8">
                            <div className="space-y-4">
                                <h2 className="font-display text-4xl font-bold leading-tight">
                                    {isLogin ? (isEl ? "Καλώς ήρθατε στο ELV8" : "Welcome to ELV8 Energy") : (isEl ? "Γίνετε μέλος του ELV8" : "Join the ELV8 Movement")}
                                </h2>
                                <p className="font-body text-white/80 text-base leading-relaxed">
                                    {isLogin
                                        ? (isEl ? "Συνδεθείτε για να παρακολουθείτε τις παραγγελίες σας και να διαχειρίζεστε το προφίλ σας." : "Sign in to track your orders, manage your profile, and fuel your daily hustle.")
                                        : (isEl ? "Δημιουργήστε λογαριασμό για ταχύτερες αγορές και αποκλειστικές προσφορές." : "Create an account for faster checkout, exclusive drops, and special offers.")}
                                </p>
                            </div>
                            <div className="space-y-4 pt-6">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                    <span className="text-sm font-medium">{isEl ? "Παρακολούθηση Παραγγελιών" : "Order Tracking"}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                    <span className="text-sm font-medium">{isEl ? "Αποθηκευμένες Διευθύνσεις" : "Saved Addresses"}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                    <span className="text-sm font-medium">{isEl ? "Αποκλειστικές Προσφορές" : "Exclusive Offers & Drops"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="p-8 md:p-16 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full space-y-10">
                        <div className="space-y-2">
                            <h3 className="font-display text-3xl font-bold tracking-tight text-[#FF1D8E]">
                                {isLogin ? t("auth.login") : t("auth.register")}
                            </h3>
                            <p className="text-muted-foreground text-sm font-body">
                                {isLogin ? (isEl ? "Δεν έχετε λογαριασμό;" : "Don't have an account?") : (isEl ? "Έχετε ήδη λογαριασμό;" : "Already have an account?")}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="ml-2 text-[#FF1D8E] font-bold hover:underline"
                                >
                                    {isLogin ? (isEl ? "Δημιουργήστε έναν εδώ" : "Create one here") : (isEl ? "Συνδεθείτε εδώ" : "Sign in here")}
                                </button>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {!isLogin && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">{t("auth.name")}</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                id="firstName"
                                                placeholder={isEl ? "Γιώργος" : "John"}
                                                className="pl-10 rounded-xl"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">{isEl ? "Επώνυμο" : "Last Name"}</Label>
                                        <Input
                                            id="lastName"
                                            placeholder={isEl ? "Παπαδόπουλος" : "Doe"}
                                            className="rounded-xl"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="username">{isLogin ? (isEl ? "Username ή Email" : "Username or Email") : "Username"}</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="username"
                                        placeholder="username"
                                        className="pl-10 rounded-xl"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            {!isLogin && (
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t("auth.email")}</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
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
                                    <Label htmlFor="password">{t("auth.password")}</Label>
                                    {isLogin && (
                                        <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors font-semibold">
                                            {isEl ? "Ξεχάσατε τον κωδικό;" : "Forgot password?"}
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
                                className="w-full h-12 rounded-xl font-bold tracking-wide shadow-lg shadow-[#FF1D8E]/30 bg-[#FF1D8E] hover:bg-[#e0187f] text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        {isLogin ? t("auth.btn.login") : t("auth.btn.register")}
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <p className="text-center text-[10px] text-muted-foreground pt-4">
                            {isEl ? "Συνεχίζοντας, συμφωνείτε με τους" : "By continuing, you agree to ELV8 Energy's"} <Link href="/terms" className="underline">{isEl ? "Όρους Χρήσης" : "Terms of Service"}</Link> {isEl ? "και την" : "and"} <Link href="/privacy" className="underline">{isEl ? "Πολιτική Απορρήτου" : "Privacy Policy"}</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
