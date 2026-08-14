"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  Download,
  Trash2,
  Plus,
  Search,
  RefreshCw,
  CheckCircle2,
  Users,
  Calendar,
  Sparkles,
  ChevronLeft,
  ShieldCheck,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "sonner";

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: string;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newSource, setNewSource] = useState("Admin Manual");
  const [isAdding, setIsAdding] = useState(false);

  const fetchSubscribers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/newsletter");
      const data = await res.json();
      if (data.success && Array.isArray(data.subscribers)) {
        setSubscribers(data.subscribers);
      } else {
        toast.error("Αποτυχία φόρτωσης συνδρομητών.");
      }
    } catch (err) {
      toast.error("Σφάλμα επικοινωνίας με το διακομιστή.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newEmail.includes("@")) {
      toast.error("Παρακαλώ εισάγετε ένα έγκυρο email.");
      return;
    }

    setIsAdding(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail, source: newSource }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Ο συνδρομητής προστέθηκε!");
        setNewEmail("");
        fetchSubscribers();
      } else {
        toast.error(data.message || "Αποτυχία προσθήκης.");
      }
    } catch (err) {
      toast.error("Σφάλμα προσθήκης συνδρομητή.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteSubscriber = async (email: string) => {
    if (!confirm(`Είστε σίγουροι ότι θέλετε να διαγράψετε το email ${email};`)) {
      return;
    }

    try {
      const res = await fetch(`/api/newsletter?email=${encodeURIComponent(email)}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast.success(`Το email ${email} διαγράφηκε.`);
        setSubscribers((prev) => prev.filter((s) => s.email !== email));
      } else {
        toast.error(data.message || "Αποτυχία διαγραφής.");
      }
    } catch (err) {
      toast.error("Σφάλμα διαγραφής.");
    }
  };

  const exportToCSV = () => {
    if (subscribers.length === 0) {
      toast.error("Δεν υπάρχουν συνδρομητές για εξαγωγή.");
      return;
    }

    const headers = ["Email", "Date Subscribed", "Source"];
    const rows = subscribers.map((s) => [
      `"${s.email}"`,
      `"${new Date(s.subscribedAt).toLocaleString("el-GR")}"`,
      `"${s.source || "Website"}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `elv8_newsletter_subscribers_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Το αρχείο CSV κατεβηκε επιτυχώς! 📥");
  };

  const filteredSubscribers = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Breadcrumb & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#FF1D8E] transition-colors mb-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Επιστροφή στο Κατάστημα
            </Link>
            <h1 className="text-3xl font-display font-black tracking-tight text-white flex items-center gap-3">
              <Mail className="w-8 h-8 text-[#FF1D8E]" />
              Διαχείριση Newsletter & Συνδρομητών
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Προβολή, αναζήτηση, προσθήκη και εξαγωγή όλων των εγγεγραμμένων emails του ELV8 Energy.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchSubscribers}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-all border border-white/10 flex items-center gap-2 text-xs font-medium"
              title="Ανανέωση"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              Ανανέωση
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2.5 rounded-xl bg-[#FF1D8E] hover:bg-[#ff3b9d] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Εξαγωγή σε CSV (Excel)
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Σύνολο Συνδρομητών</p>
                <h3 className="text-3xl font-display font-black text-white mt-1">{subscribers.length}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#FF1D8E]/10 flex items-center justify-center text-[#FF1D8E]">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Τελευταία Εγγραφή</p>
                <h3 className="text-sm font-semibold text-emerald-400 mt-2 truncate max-w-[180px]">
                  {subscribers.length > 0 ? subscribers[0].email : "Καμία εγγραφή"}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Κατάσταση Συστήματος</p>
                <h3 className="text-sm font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Ενεργό & Συγχρονισμένο
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Add Subscriber Form Box */}
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#FF1D8E]" />
            Χειροκίνητη Προσθήκη Νέου Συνδρομητή
          </h3>
          <form onSubmit={handleAddSubscriber} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="π.χ. customer@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="flex-1 bg-slate-950 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF1D8E]"
              required
            />
            <select
              value={newSource}
              onChange={(e) => setNewSource(e.target.value)}
              className="bg-slate-950 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1D8E]"
            >
              <option value="Admin Manual">Χειροκίνητη (Admin)</option>
              <option value="Event Import">Εκδήλωση / Event</option>
              <option value="Phone Order">Τηλεφωνική Παραγγελία</option>
            </select>
            <button
              type="submit"
              disabled={isAdding}
              className="px-6 py-2.5 bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow disabled:opacity-50"
            >
              {isAdding ? "Προσθήκη..." : "Προσθήκη Email"}
            </button>
          </form>
        </div>

        {/* Subscribers Search & Table */}
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Αναζήτηση με email ή πηγή..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-white/15 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF1D8E]"
              />
            </div>
            <span className="text-xs text-slate-400">
              Εμφάνιση {filteredSubscribers.length} από {subscribers.length} συνδρομητές
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase font-bold text-slate-400 tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-6">#</th>
                  <th className="py-3.5 px-6">Email Συνδρομητή</th>
                  <th className="py-3.5 px-6">Ημερομηνία Εγγραφής</th>
                  <th className="py-3.5 px-6">Πηγή Εγγραφής</th>
                  <th className="py-3.5 px-6 text-right">Ενέργειες</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#FF1D8E]" />
                      Φόρτωση συνδρομητών...
                    </td>
                  </tr>
                ) : filteredSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      Δεν βρέθηκαν συνδρομητές.
                    </td>
                  </tr>
                ) : (
                  filteredSubscribers.map((sub, idx) => (
                    <tr key={sub.id || idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 text-slate-500 text-xs font-mono">{idx + 1}</td>
                      <td className="py-4 px-6 font-medium text-white flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#FF1D8E]" />
                        {sub.email}
                      </td>
                      <td className="py-4 px-6 text-slate-400 text-xs">
                        {new Date(sub.subscribedAt).toLocaleString("el-GR", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 text-slate-300 border border-white/10">
                          {sub.source || "Website"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDeleteSubscriber(sub.email)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          title="Διαγραφή Email"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
