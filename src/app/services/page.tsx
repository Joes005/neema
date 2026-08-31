import React from "react";
import Navbar from "@/components/Navbar";
import JoinerySection from "@/components/JoinerySection";
import MaterialExplorer from "@/components/MaterialExplorer";
import ConsultationCTA from "@/components/ConsultationCTA";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Compass, PenTool, Hammer, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Services | NEEMA HOMES",
  description:
    "Comprehensive residential interior design, custom joinery, spatial layout, and execution services in Chennai.",
};

const servicesList = [
  {
    icon: Compass,
    title: "1. Spatial Architecture & Layout",
    description: "Detailed 2D/3D spatial planning, moodboarding, lighting layouts, and custom wall-treatment drawings.",
  },
  {
    icon: PenTool,
    title: "2. Bespoke Joinery & Casework",
    description: "Custom floor-to-ceiling wardrobes, handleless culinary kitchens, and integrated architectural media units.",
  },
  {
    icon: Hammer,
    title: "3. Turnkey Execution & Site Build",
    description: "In-house site supervision managing electrical, plumbing, ceiling, tiling, paint, and final installation.",
  },
  {
    icon: ShieldCheck,
    title: "4. Quality Audits & Material Selections",
    description: "Multi-stage quality checks, moisture testing, hardware load tests, and transparent cost breakdown.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#141312] text-[#F7F5F0]">
      <Navbar />

      <section className="pt-36 pb-20 px-6 lg:px-10 max-w-7xl mx-auto">
        <RevealOnScroll direction="up">
          <p className="eyebrow text-[#C5A880]">OUR OFFERINGS</p>
          <h1 className="display-1 mt-4 text-[#F7F5F0]">
            End-to-end residential interiors.
          </h1>
          <p className="lede mt-6 max-w-2xl text-[#F7F5F0]/80">
            From preliminary floorplan concepts to final white-glove installation, every stage is managed under one roof.
          </p>
        </RevealOnScroll>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <RevealOnScroll key={srv.title} delay={idx * 0.1} direction="up">
                <div className="p-8 rounded-2xl bg-[#1F1D1B] border border-[#F7F5F0]/10 hover:border-[#C5A880] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#F7F5F0]">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-[#F7F5F0]/70 mt-3 leading-relaxed">
                    {srv.description}
                  </p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      <JoinerySection />

      <MaterialExplorer />

      <ConsultationCTA />

      <Footer />
    </main>
  );
}
