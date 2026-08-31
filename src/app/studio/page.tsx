import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import StudioSection from "@/components/StudioSection";
import ConsultationCTA from "@/components/ConsultationCTA";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata = {
  title: "The Studio | NEEMA HOMES",
  description:
    "Learn about NEEMA HOMES - a luxury residential interior design and execution studio in Chennai.",
};

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-[#141312] text-[#F7F5F0]">
      <Navbar />

      {/* Studio Banner */}
      <section className="pt-36 pb-20 px-6 lg:px-10 max-w-7xl mx-auto">
        <RevealOnScroll direction="up">
          <p className="eyebrow text-[#C5A880]">ABOUT THE STUDIO</p>
          <h1 className="display-1 mt-4 text-[#F7F5F0] max-w-4xl">
            Architectural clarity. Execution without dilution.
          </h1>
          <p className="lede mt-6 max-w-2xl text-[#F7F5F0]/80">
            Founded in Chennai, NEEMA HOMES sits at the intersection of spatial architecture, bespoke joinery, and turn-key site management.
          </p>
        </RevealOnScroll>

        <div className="mt-16 relative h-[450px] lg:h-[550px] rounded-2xl overflow-hidden border border-[#F7F5F0]/10 shadow-2xl">
          <Image
            src="/images/hero-living.jpg"
            alt="NEEMA HOMES Studio Design Philosophy"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-transparent to-transparent opacity-60" />
        </div>
      </section>

      <StudioSection />

      <ConsultationCTA />

      <Footer />
    </main>
  );
}
