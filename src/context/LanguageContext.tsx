"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "el" | "en";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    isMounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
    el: {
        // Navigation
        "nav.home": "Αρχική",
        "nav.products": "Γεύσεις",
        "nav.about": "Σχετικά με Εμάς",
        "nav.store_locator": "Σημεία Πώλησης",
        "nav.b2b": "Χονδρική B2B",
        "nav.account": "Λογαριασμός",
        "nav.favorites": "Αγαπημένα",
        "nav.cart": "Καλάθι",
        "nav.view_cart": "Προβολή Καλαθιού",

        // Hero Section & Features
        "hero.caffeine": "Φυσική Καφεΐνη",
        "hero.sugar": "Χωρίς Ζάχαρη",
        "hero.focus": "Πνευματική Διαύγεια",
        "hero.electrolytes": "Ηλεκτρολύτες",
        "hero.order_now": "Παράγγειλε Τώρα",

        // Homepage
        "home.testimonials.title": "Τι Λένε για Εμάς",
        "home.testimonials.subtitle": "Πραγματική Ενέργεια. Πραγματικά Αποτελέσματα.",
        "home.review.alex.text": "Το καλύτερο ενεργειακό ποτό που έχω δοκιμάσει. Χωρίς ζάχαρη, απίστευτη εστίαση. Το πίνω κάθε μέρα πριν το γυμναστήριο.",
        "home.review.maria.text": "Επιτέλους ένα ενεργειακό ποτό που δεν με ρίχνει μετά. Η γεύση είναι απίθανη και σου κάνει καλό!",
        "home.review.nikos.text": "Άλλαξα από Red Bull σε ELV8 και δεν κοίταξα ποτέ πίσω. Οι ηλεκτρολύτες με κρατούν ενυδατωμένο κατά τη διάρκεια μεγάλων προπονήσεων.",
        "home.lifestyle.title": "Μην Πίνεις Απλά Ενέργεια. Νιώσε Την.",
        "home.lifestyle.btn": "Αγορά Τώρα",
        "home.newsletter.title": "Μείνετε Ενημερωμένοι",
        "home.newsletter.subtitle": "Γίνετε μέλος του κινήματος ELV8",
        "home.newsletter.desc": "Μάθετε πρώτοι για νέες γεύσεις, κυκλοφορίες και αποκλειστικές προσφορές.",
        "home.newsletter.placeholder": "το@email.σου",
        "home.newsletter.btn": "Εγγραφή",
        "home.featured.title": "Δημοφιλή Προϊόντα",
        "home.sale.title": "Ειδικές Προσφορές",

        // Products Catalog
        "catalog.title": "Οι Γεύσεις & τα Πακέτα μας",
        "catalog.desc": "Ανακαλύψτε την πλήρη συλλογή των καθαρών ενεργειακών ποτών ELV8. Χωρίς Ζάχαρη, 200mg Φυσική Καφεΐνη, Ηλεκτρολύτες & Πραγματικές Γεύσεις Φρούτων.",
        "catalog.filters": "Φίλτρα",
        "catalog.sort_by": "Ταξινόμηση",
        "catalog.sort.newest": "Νεότερα",
        "catalog.sort.price_asc": "Τιμή: Χαμηλή σε Υψηλή",
        "catalog.sort.price_desc": "Τιμή: Υψηλή σε Χαμηλή",
        "catalog.instock": "Μόνο σε Απόθεμα",
        "catalog.clear_all": "Καθαρισμός Όλων",
        "catalog.no_products": "Δεν βρέθηκαν προϊόντα με αυτά τα κριτήρια.",
        "catalog.items_count": "προϊόν",
        "catalog.items_count_plural": "προϊόντα",
        "catalog.categories": "Κατηγορίες",
        "catalog.filter.tags": "Ετικέτες",
        "catalog.filter.price": "Εύρος Τιμής",
        "catalog.filter.on_sale": "Σε Προσφορά",

        // Product Details
        "product.back": "Επιστροφή",
        "product.add_to_cart": "Προσθήκη στο Καλάθι",
        "product.out_of_stock": "Εξαντλήθηκε",
        "product.description": "Περιγραφή",
        "product.nutritional": "Διατροφικές Πληροφορίες",
        "product.nutrition.serving": "Μέγεθος Μερίδας: 250ml (1 κουτάκι)",
        "product.nutrition.calories": "Θερμίδες",
        "product.nutrition.sugar": "Ζάχαρη",
        "product.nutrition.caffeine": "Φυσική Καφεΐνη",
        "product.nutrition.sodium": "Νάτριο (Ηλεκτρολύτες)",
        "product.nutrition.bvitamins": "Βιταμίνες Β",

        // Cart Drawer
        "cart.title": "Το Καλάθι σας",
        "cart.empty": "Το καλάθι σας είναι άδειο",
        "cart.subtotal": "Υποσύνολο",
        "cart.checkout": "Ολοκλήρωση Αγοράς",
        "cart.items": "προϊόντα",

        // Store Locator
        "store.title": "Βρείτε ένα Κατάστημα",
        "store.desc": "Αναζητήστε το πλησιέστερο σημείο πώλησης ELV8 εισάγοντας τον Ταχυδρομικό σας Κώδικα (ΤΚ) ή την Πόλη σας.",
        "store.placeholder": "Εισάγετε ΤΚ ή Πόλη...",
        "store.search": "Αναζήτηση",
        "store.not_found": "Δεν βρέθηκε κατάστημα στην περιοχή σας. Δείτε στον χάρτη τα πλησιέστερα σημεία.",
        "store.view_on_map": "Προβολή στο Χάρτη",
        "store.get_directions": "Οδηγίες",
        "store.phone": "Τηλέφωνο",
        "store.hours": "Ωράριο Λειτουργίας",
        "store.locator_title_1": "Βρείτε Σημεία Πώλησης ",
        "store.locator_title_2": "Κοντά σας.",
        "store.locator_placeholder": "Αναζήτηση με ΤΚ, πόλη ή κατάστημα...",
        "store.locator_loading": "Φόρτωση...",
        "store.locator_points": "Σημεία Πώλησης",
        "store.locator_not_found_zip": "Δεν βρέθηκαν σημεία πώλησης στον ΤΚ ",
        "store.locator_not_found_zip2": ". Εμφανίζεται η περιοχή στον χάρτη.",
        "store.locator_no_results": "Δεν βρέθηκαν αποτελέσματα",
        "store.locator_navigate": "Οδηγίες",

        // B2B Wholesale
        "b2b.title": "Πύλη Συνεργατών B2B",
        "b2b.subtitle": "Γίνετε Επίσημος Διανομέας ELV8",
        "b2b.desc": "Ενδιαφέρεστε να πουλήσετε τα προϊόντα ELV8 στο κατάστημα, το γυμναστήριο ή την επιχείρησή σας; Συμπληρώστε την παρακάτω φόρμα και η ομάδα μας θα επικοινωνήσει μαζί σας εντός 24 ωρών.",
        "b2b.form.name": "Ονοματεπώνυμο",
        "b2b.form.company": "Επωνυμία Επιχείρησης",
        "b2b.form.email": "Email Επικοινωνίας",
        "b2b.form.phone": "Τηλέφωνο Επικοινωνίας",
        "b2b.form.message": "Μήνυμα / Σχόλια (Προαιρετικά)",
        "b2b.form.submit": "Υποβολή Αίτησης",
        "b2b.form.success": "Η αίτησή σας υποβλήθηκε με επιτυχία! Θα επικοινωνήσουμε μαζί σας σύντομα.",
        "b2b.form.error": "Παρουσιάστηκε σφάλμα κατά την υποβολή. Παρακαλώ δοκιμάστε ξανά.",

        // Checkout Page
        "checkout.secure": "Ασφαλής Ολοκλήρωση Αγοράς",
        "checkout.back_to_cart": "Πίσω στο Καλάθι",
        "checkout.preparing": "Προετοιμασία ασφαλούς ολοκλήρωσης...",

        // Favorites Page
        "favorites.title": "Τα Αγαπημένα σας",
        "favorites.empty": "Δεν έχετε προσθέσει ακόμα αγαπημένα προϊόντα.",
        "favorites.btn": "Δείτε τις Γεύσεις μας",

        // Account Page & Auth
        "account.title": "Ο Λογαριασμός σας",
        "account.orders": "Οι Παραγγελίες μου",
        "account.details": "Στοιχεία Λογαριασμού",
        "account.logout": "Αποσύνδεση",
        "account.no_orders": "Δεν έχετε κάνει ακόμα κάποια παραγγελία.",
        "auth.login": "Σύνδεση",
        "auth.register": "Εγγραφή",
        "auth.email": "Διεύθυνση Email",
        "auth.password": "Κωδικός Πρόσβασης",
        "auth.name": "Όνομα",
        "auth.btn.login": "Είσοδος",
        "auth.btn.register": "Δημιουργία Λογαριασμού",

        // Footer
        "footer.desc": "Η επόμενη γενιά καθαρής ενέργειας. Σχεδιασμένο για να ανεβάζει τις επιδόσεις σας χωρίς συμβιβασμούς.",
        "footer.quick_links": "Γρήγοροι Σύνδεσμοι",
        "footer.categories": "Συλλογές",
        "footer.contact": "Επικοινωνία",
        "footer.rights": "Με επιφύλαξη παντός δικαιώματος.",

        // FAQ
        "faq.title": "Συχνές Ερωτήσεις (FAQ)",
        "faq.q1": "Τι είναι το ELV8;",
        "faq.a1": "Το ELV8 είναι ένα premium ενεργειακό ποτό επόμενης γενιάς με 200mg φυσική καφεΐνη, ηλεκτρολύτες και συστατικά για πνευματική διαύγεια, χωρίς καθόλου ζάχαρη.",
        "faq.q2": "Πόση καφεΐνη περιέχει;",
        "faq.a2": "Κάθε κουτάκι 250ml περιέχει 200mg φυσικής καφεΐνης, που ισοδυναμεί με περίπου 2 δόσεις espresso.",
        "faq.q3": "Έχει ζάχαρη ή crash μετά;",
        "faq.a3": "Όχι, το ELV8 έχει 0% ζάχαρη και περιέχει L-Theanine που αποτρέπει το νευρικό crash, προσφέροντας καθαρή ενσης ενέργεια.",

        // Common UI
        "ui.cookie.title": "Ρυθμίσεις Cookies",
        "ui.cookie.desc": "Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία πλοήγησής σας στο e-shop μας.",
        "ui.cookie.accept": "Αποδοχή",
        "ui.cookie.decline": "Απόρριψη",
    },
    en: {
        // Navigation
        "nav.home": "Home",
        "nav.products": "Flavors",
        "nav.about": "About Us",
        "nav.store_locator": "Store Locator",
        "nav.b2b": "B2B Wholesale",
        "nav.account": "Account",
        "nav.favorites": "Favorites",
        "nav.cart": "Cart",
        "nav.view_cart": "View Cart",

        // Hero Section & Features
        "hero.caffeine": "Natural Caffeine",
        "hero.sugar": "Zero Sugar",
        "hero.focus": "Nootropics & Focus",
        "hero.electrolytes": "Electrolytes",
        "hero.order_now": "Order Now",

        // Homepage
        "home.testimonials.title": "What People Say",
        "home.testimonials.subtitle": "Real Energy. Real Results.",
        "home.review.alex.text": "Best energy drink I've ever had. Zero sugar, insane focus. Been drinking it every day before the gym.",
        "home.review.maria.text": "Finally an energy drink that doesn't make me crash. The taste is incredible and it's actually good for you!",
        "home.review.nikos.text": "Switched from Red Bull to ELV8 and never looked back. The electrolytes actually keep me hydrated during long sessions.",
        "home.lifestyle.title": "Don't Just Drink Energy. Feel It.",
        "home.lifestyle.btn": "Shop Now",
        "home.newsletter.title": "Stay in the Loop",
        "home.newsletter.subtitle": "Join the ELV8 Movement",
        "home.newsletter.desc": "Be the first to know about new flavors, drops, and exclusive offers.",
        "home.newsletter.placeholder": "your@email.com",
        "home.newsletter.btn": "Subscribe",
        "home.featured.title": "Featured Products",
        "home.sale.title": "Special Offers",

        // Products Catalog
        "catalog.title": "Our Flavors & Packs",
        "catalog.desc": "Explore our full collection of clean energy drinks. Zero Sugar, 200mg Natural Caffeine, Electrolytes & Real Fruit Flavors.",
        "catalog.filters": "Filters",
        "catalog.sort_by": "Sort By",
        "catalog.sort.newest": "Newest",
        "catalog.sort.price_asc": "Price: Low to High",
        "catalog.sort.price_desc": "Price: High to Low",
        "catalog.instock": "In Stock Only",
        "catalog.clear_all": "Clear All",
        "catalog.no_products": "No products found matching these criteria.",
        "catalog.items_count": "product",
        "catalog.items_count_plural": "products",
        "catalog.categories": "Categories",
        "catalog.filter.tags": "Tags",
        "catalog.filter.price": "Price Range",
        "catalog.filter.on_sale": "On Sale",

        // Product Details
        "product.back": "Back",
        "product.add_to_cart": "Add to Cart",
        "product.out_of_stock": "Out of Stock",
        "product.description": "Description",
        "product.nutritional": "Nutritional Information",
        "product.nutrition.serving": "Serving Size: 250ml (1 Can)",
        "product.nutrition.calories": "Calories",
        "product.nutrition.sugar": "Sugar",
        "product.nutrition.caffeine": "Natural Caffeine",
        "product.nutrition.sodium": "Sodium (Electrolytes)",
        "product.nutrition.bvitamins": "B-Vitamins",

        // Cart Drawer
        "cart.title": "Your Cart",
        "cart.empty": "Your cart is empty",
        "cart.subtotal": "Subtotal",
        "cart.checkout": "Checkout",
        "cart.items": "products",

        // Store Locator
        "store.title": "Find a Store",
        "store.desc": "Search for the nearest ELV8 sales point by entering your Postal Code or City.",
        "store.placeholder": "Enter Zip Code or City...",
        "store.search": "Search",
        "store.not_found": "No store found in your area. Look at the map for the nearest spots.",
        "store.view_on_map": "View on Map",
        "store.get_directions": "Get Directions",
        "store.phone": "Phone",
        "store.hours": "Working Hours",
        "store.locator_title_1": "Find ELV8 Stockists ",
        "store.locator_title_2": "Near Your Location.",
        "store.locator_placeholder": "Search by Zip code, city, or store...",
        "store.locator_loading": "Loading...",
        "store.locator_points": "Stores Found",
        "store.locator_not_found_zip": "No stores found in ZIP ",
        "store.locator_not_found_zip2": ". Showing area on map.",
        "store.locator_no_results": "No results found",
        "store.locator_navigate": "Navigate",

        // B2B Wholesale
        "b2b.title": "B2B Partner Portal",
        "b2b.subtitle": "Become an Official ELV8 Distributor",
        "b2b.desc": "Interested in selling ELV8 products in your store, gym, or business? Complete the form below and our team will get in touch within 24 hours.",
        "b2b.form.name": "Full Name",
        "b2b.form.company": "Business/Company Name",
        "b2b.form.email": "Contact Email",
        "b2b.form.phone": "Contact Phone Number",
        "b2b.form.message": "Message / Comments (Optional)",
        "b2b.form.submit": "Submit Application",
        "b2b.form.success": "Your application was submitted successfully! We will contact you soon.",
        "b2b.form.error": "An error occurred during submission. Please try again.",

        // Checkout Page
        "checkout.secure": "Secure Checkout",
        "checkout.back_to_cart": "Back to Cart",
        "checkout.preparing": "Preparing secure checkout...",

        // Favorites Page
        "favorites.title": "Your Favorites",
        "favorites.empty": "You haven't added any favorite products yet.",
        "favorites.btn": "Browse our Flavors",

        // Account Page & Auth
        "account.title": "Your Account",
        "account.orders": "My Orders",
        "account.details": "Account Details",
        "account.logout": "Logout",
        "account.no_orders": "You haven't placed any orders yet.",
        "auth.login": "Login",
        "auth.register": "Register",
        "auth.email": "Email Address",
        "auth.password": "Password",
        "auth.name": "Name",
        "auth.btn.login": "Sign In",
        "auth.btn.register": "Create Account",

        // Footer
        "footer.desc": "The next generation of clean energy. Engineered to elevate your performance without compromise.",
        "footer.quick_links": "Quick Links",
        "footer.categories": "Collections",
        "footer.contact": "Contact Us",
        "footer.rights": "All rights reserved.",

        // FAQ
        "faq.title": "Frequently Asked Questions (FAQ)",
        "faq.q1": "What is ELV8?",
        "faq.a1": "ELV8 is a premium, next-generation energy drink with 200mg natural caffeine, electrolytes, and nootropics, with zero sugar.",
        "faq.q2": "How much caffeine does it contain?",
        "faq.a2": "Each 250ml can contains 200mg of natural caffeine, equivalent to about 2 shots of espresso.",
        "faq.q3": "Does it have sugar or a crash effect?",
        "faq.a3": "No, ELV8 has 0% sugar and includes L-Theanine which prevents jittery crash, providing clean, smooth energy.",

        // Common UI
        "ui.cookie.title": "Cookie Settings",
        "ui.cookie.desc": "We use cookies to improve your browsing experience on our e-shop.",
        "ui.cookie.accept": "Accept",
        "ui.cookie.decline": "Decline",
    }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>("el");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedLang = localStorage.getItem("language") as Language | null;
        if (savedLang && (savedLang === "el" || savedLang === "en")) {
            setLanguageState(savedLang);
        } else {
            const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || "en";
            const defaultLang: Language = browserLang.toLowerCase().startsWith("el") ? "el" : "en";
            setLanguageState(defaultLang);
            localStorage.setItem("language", defaultLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };

    const t = (key: string): string => {
        return translations[language]?.[key] || translations["el"]?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isMounted }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useTranslation must be used within a LanguageProvider");
    }
    return context;
};
