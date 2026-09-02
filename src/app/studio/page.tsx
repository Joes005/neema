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
    <div className="relative z-0 bg-[#1C1B18]">
      <div className="relative z-10 bg-[#F9F8F3] text-[#1C1B18] min-h-screen flex flex-col overflow-x-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        <Navbar />
        <main className="flex-1">

          {/* Studio Banner */}
          <section className="bg-[#E8DFCE] pt-28 sm:pt-36 pb-16 lg:pb-20 px-4 sm:px-6 lg:px-10">
            <div className="max-w-7xl mx-auto">
              <RevealOnScroll direction="up">
                <p className="eyebrow text-[#71552F]">ABOUT THE STUDIO</p>
                <h1 className="display-1 mt-4 text-[#1C1B18] max-w-4xl">
                  Architectural clarity. Execution without dilution.
                </h1>
                <p className="lede mt-6 max-w-2xl text-[#1C1B18]/80">
                  Founded in Chennai, NEEMA HOMES sits at the intersection of spatial architecture, bespoke joinery, and turn-key site management.
                </p>
              </RevealOnScroll>

              <div className="mt-10 sm:mt-16 relative h-[260px] sm:h-[450px] lg:h-[550px] rounded-2xl overflow-hidden border border-[#1C1B18]/10 shadow-2xl">
                <Image
                  src="/images/hero-living.jpg"
                  alt="NEEMA HOMES Studio Design Philosophy"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#E8DFCE] via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </section>

          <StudioSection />

          <ConsultationCTA />

        </main>
      </div>
      <Footer />
    </div>
  );
}
