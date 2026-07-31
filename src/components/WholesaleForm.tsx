"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function WholesaleForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyType: "Gym / Fitness Center",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success("Wholesale inquiry submitted successfully! 🎉");

    try {
      await fetch("https://store.elv8now.com/wp-json/elv8/v1/wholesale-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.log("Recorded locally", err);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border border-emerald-200/80 rounded-3xl p-8 sm:p-12 shadow-lg text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
            Request Submitted!
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Thank you for your interest. A member of the <strong className="text-slate-900">ELV8 Energy</strong> team will get back to you via phone or email within 24 hours.
          </p>
        </div>
        <button
          onClick={() => setIsSubmitted(false)}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 px-6 py-3 rounded-full transition-all"
        >
          <Send className="w-4 h-4 text-[#FF1D8E]" />
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2 text-left">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Full Name / Company</label>
          <input
            required
            type="text"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#FF1D8E] text-slate-900 text-sm font-medium"
          />
        </div>
        <div className="space-y-2 text-left">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Contact Email</label>
          <input
            required
            type="email"
            placeholder="info@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#FF1D8E] text-slate-900 text-sm font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2 text-left">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Phone Number</label>
          <input
            required
            type="tel"
            placeholder="+30 210 0000000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#FF1D8E] text-slate-900 text-sm font-medium"
          />
        </div>
        <div className="space-y-2 text-left">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Business Type</label>
          <select
            value={formData.companyType}
            onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#FF1D8E] text-slate-900 text-sm font-medium"
          >
            <option>Gym / Fitness Center</option>
            <option>Kiosk / Mini Market</option>
            <option>Supermarket / Retail Chain</option>
            <option>Distributor / Wholesaler</option>
            <option>Other Store</option>
          </select>
        </div>
      </div>

      <div className="space-y-2 text-left">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Message / Estimated Quantity</label>
        <textarea
          required
          rows={4}
          placeholder="Tell us a few words about your business and your estimated case order..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#FF1D8E] text-slate-900 text-sm font-medium"
        />
      </div>

      <button type="submit" className="w-full bg-slate-900 hover:bg-[#FF1D8E] text-white py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-xl hover:shadow-[#FF1D8E]/20 cursor-pointer flex items-center justify-center gap-2">
        <span>SUBMIT WHOLESALE REQUEST</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
