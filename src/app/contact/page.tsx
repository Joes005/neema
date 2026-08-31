import React from "react";
import Navbar from "@/components/Navbar";
import ConsultationCTA from "@/components/ConsultationCTA";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export const metadata = {
  title: "Contact | NEEMA HOMES",
  description:
    "Contact NEEMA HOMES to schedule a residential interior design consultation in Chennai.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#141312] text-[#F7F5F0]">
      <Navbar />

      <section className="pt-36 pb-20 px-6 lg:px-10 max-w-7xl mx-auto">
        <RevealOnScroll direction="up">
          <p className="eyebrow text-[#C5A880]">GET IN TOUCH</p>
          <h1 className="display-1 mt-4 text-[#F7F5F0]">
            Let's discuss your residence.
          </h1>
          <p className="lede mt-6 max-w-2xl text-[#F7F5F0]/80">
            Whether you have a new home handover date in Chennai or want to re-architect an existing property, we look forward to hearing your vision.
          </p>
        </RevealOnScroll>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8 bg-[#1F1D1B] p-8 lg:p-10 rounded-2xl border border-[#F7F5F0]/10">
            <div>
              <h3 className="font-serif text-2xl text-[#F7F5F0] mb-4">
                Studio Details
              </h3>
              <p className="text-sm font-light text-[#F7F5F0]/70 leading-relaxed">
                Consultations are held by appointment at our studio or directly on site at your residence location.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#F7F5F0]/10">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#F7F5F0]">
                    Location
                  </h4>
                  <p className="text-sm text-[#F7F5F0]/75 mt-0.5">
                    Chennai, Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#F7F5F0]">
                    Email
                  </h4>
                  <a
                    href="mailto:info@company.com"
                    className="text-sm text-[#C5A880] hover:underline mt-0.5 block"
                  >
                    info@company.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#F7F5F0]">
                    Phone
                  </h4>
                  <p className="text-sm text-[#F7F5F0]/75 mt-0.5">
                    +91 98765 43210 / +91 44 2800 0000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#F7F5F0]">
                    Hours
                  </h4>
                  <p className="text-sm text-[#F7F5F0]/75 mt-0.5">
                    Mon – Sat: 09:30 AM – 06:30 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Inline Form Container */}
          <div className="lg:col-span-7 bg-[#1F1D1B] p-8 lg:p-10 rounded-2xl border border-[#F7F5F0]/10">
            <h3 className="font-serif text-2xl text-[#F7F5F0] mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs text-[#F7F5F0]/60 mb-6">
              Our team responds to all residential project inquiries within 24 hours.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.16em] text-[#F7F5F0]/70 mb-1.5 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full bg-[#141312] border border-[#F7F5F0]/15 rounded-lg px-4 py-3 text-sm text-[#F7F5F0] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.16em] text-[#F7F5F0]/70 mb-1.5 font-medium">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#141312] border border-[#F7F5F0]/15 rounded-lg px-4 py-3 text-sm text-[#F7F5F0] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.16em] text-[#F7F5F0]/70 mb-1.5 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  className="w-full bg-[#141312] border border-[#F7F5F0]/15 rounded-lg px-4 py-3 text-sm text-[#F7F5F0] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.16em] text-[#F7F5F0]/70 mb-1.5 font-medium">
                  Project Notes & Timeline
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about the property location, size, and your planned handover date..."
                  className="w-full bg-[#141312] border border-[#F7F5F0]/15 rounded-lg px-4 py-3 text-sm text-[#F7F5F0] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <button type="submit" className="btn-ink w-full py-3.5">
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <ConsultationCTA />

      <Footer />
    </main>
  );
}
