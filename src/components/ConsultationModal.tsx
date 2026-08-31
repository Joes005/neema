"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Send, ArrowRight } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "Chennai",
    projectScope: "Full Residence Interior",
    budgetRange: "₹40 Lakh - ₹75 Lakh",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#141312]/90 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="relative z-10 w-full max-w-2xl bg-[#1F1D1B] border border-[#F7F5F0]/15 rounded-2xl p-6 sm:p-10 shadow-2xl text-[#F7F5F0]"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full border border-[#F7F5F0]/20 flex items-center justify-center hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!submitted ? (
              <div>
                <p className="eyebrow text-[#C5A880]">REQUEST A CONSULTATION</p>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F5F0] mt-1">
                  Tell us about the residence.
                </h3>
                <p className="text-xs font-light text-[#F7F5F0]/70 mt-2">
                  Share the home details, your preferred timeline, and how you want to live in it.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.16em] text-[#F7F5F0]/70 mb-1.5 font-medium">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikram Ananth"
                        className="w-full bg-[#141312] border border-[#F7F5F0]/15 rounded-lg px-4 py-3 text-sm text-[#F7F5F0] focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.16em] text-[#F7F5F0]/70 mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vikram@example.com"
                        className="w-full bg-[#141312] border border-[#F7F5F0]/15 rounded-lg px-4 py-3 text-sm text-[#F7F5F0] focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.16em] text-[#F7F5F0]/70 mb-1.5 font-medium">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#141312] border border-[#F7F5F0]/15 rounded-lg px-4 py-3 text-sm text-[#F7F5F0] focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.16em] text-[#F7F5F0]/70 mb-1.5 font-medium">
                        Residence Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Poes Garden, Chennai"
                        className="w-full bg-[#141312] border border-[#F7F5F0]/15 rounded-lg px-4 py-3 text-sm text-[#F7F5F0] focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.16em] text-[#F7F5F0]/70 mb-1.5 font-medium">
                        Scope of Work
                      </label>
                      <select
                        value={formData.projectScope}
                        onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                        className="w-full bg-[#141312] border border-[#F7F5F0]/15 rounded-lg px-4 py-3 text-sm text-[#F7F5F0] focus:outline-none focus:border-[#C5A880]"
                      >
                        <option value="Full Residence Interior">Full Residence Interior</option>
                        <option value="Living & Dining Suites">Living & Dining Suites</option>
                        <option value="Bespoke Kitchen & Wardrobes">Bespoke Kitchen & Wardrobes</option>
                        <option value="Architectural Renovation">Architectural Renovation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.16em] text-[#F7F5F0]/70 mb-1.5 font-medium">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full bg-[#141312] border border-[#F7F5F0]/15 rounded-lg px-4 py-3 text-sm text-[#F7F5F0] focus:outline-none focus:border-[#C5A880]"
                      >
                        <option value="₹25 Lakh - ₹40 Lakh">₹25 Lakh - ₹40 Lakh</option>
                        <option value="₹40 Lakh - ₹75 Lakh">₹40 Lakh - ₹75 Lakh</option>
                        <option value="₹75 Lakh - ₹1.2 Crore">₹75 Lakh - ₹1.2 Crore</option>
                        <option value="Above ₹1.2 Crore">Above ₹1.2 Crore</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] text-[#F7F5F0]/70 mb-1.5 font-medium">
                      Tell us about your home & vision
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Floor area, handover timeline, architectural preferences..."
                      className="w-full bg-[#141312] border border-[#F7F5F0]/15 rounded-lg px-4 py-3 text-sm text-[#F7F5F0] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="btn-ink w-full py-3.5">
                      <span className="flex items-center justify-center gap-2">
                        <span>Submit Consultation Request</span>
                        <Send className="w-4 h-4" />
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#C5A880]/15 border border-[#C5A880] flex items-center justify-center mx-auto text-[#C5A880]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-[#F7F5F0]">
                  Request Received
                </h3>
                <p className="text-sm text-[#F7F5F0]/80 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-[#C5A880] font-semibold">{formData.name}</span>. Our principal interior architect will review your project details and respond within 24 hours.
                </p>
                <div className="pt-4">
                  <button type="button" onClick={handleReset} className="btn-ink px-8">
                    <span>Done</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
