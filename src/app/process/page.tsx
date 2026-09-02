import React from "react";
import Navbar from "@/components/Navbar";
import EditorialSection from "@/components/EditorialSection";
import ConsultationCTA from "@/components/ConsultationCTA";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata = {
  title: "Process | NEEMA HOMES",
  description:
    "The 5-phase residential execution process at NEEMA HOMES: discovery, design, millwork fabrication, site installation, and quality handover.",
};

const processPhases = [
  {
    step: "01",
    title: "Discovery & Lifestyle Audit",
    duration: "Week 1 - 2",
    description: "We meet on site or at the studio to record room dimensions, evaluate structural constraints, understand light orientation, and log how your family actually lives.",
  },
  {
    step: "02",
    title: "Spatial Architecture & Material Specifications",
    duration: "Week 3 - 5",
    description: "2D layout plans, 3D photorealistic renderings, material sample boards, and a transparent line-item budget before any work begins.",
  },
  {
    step: "03",
    title: "Factory Millwork & Bespoke Fabrication",
    duration: "Week 6 - 9",
    description: "Teak seasoning, CNC panel cutting, edge-banding, and custom brass hardware assembly take place in our off-site workshop.",
  },
  {
    step: "04",
    title: "On-Site Civil & Precision Installation",
    duration: "Week 10 - 13",
    description: "In-house site supervisors coordinate electrical profile channels, stone slab cladding, false ceilings, and modular casework assembly.",
  },
  {
    step: "05",
    title: "Quality Audit & Handover",
    duration: "Week 14",
    description: "Multi-point check covering drawer alignments, paint sheen, electrical loads, and deep cleaning prior to handing you the keys.",
  },
];

export default function ProcessPage() {
  return (
    <div className="relative z-0 bg-[#1C1B18]">
      <div className="relative z-10 bg-[#F9F8F3] text-[#1C1B18] min-h-screen flex flex-col overflow-x-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        <Navbar />
        <main className="flex-1">

          <section className="pt-28 sm:pt-36 pb-16 lg:pb-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
            <RevealOnScroll direction="up">
              <p className="eyebrow text-[#C5A880]">DESIGN & EXECUTION SEQUENCE</p>
              <h1 className="display-1 mt-4 text-[#1C1B18]">
                From blank page to signature home.
              </h1>
              <p className="lede mt-6 max-w-2xl text-[#1C1B18]/80">
                A clear 5-stage roadmap where design intent, budget transparency, and craftsmanship remain aligned from start to finish.
              </p>
            </RevealOnScroll>

            <div className="mt-12 sm:mt-20 space-y-6 sm:space-y-10">
              {processPhases.map((phase, idx) => (
                <RevealOnScroll key={phase.step} delay={idx * 0.1} direction="up">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-start p-5 sm:p-8 rounded-2xl bg-white border border-[#1C1B18]/10 hover:border-[#C5A880] transition-colors shadow-sm">
                    <div className="md:col-span-3 flex flex-col justify-between">
                      <span className="font-sans text-2xl font-bold tracking-[0.2em] text-[#C5A880]">
                        {phase.step}
                      </span>
                      <span className="text-xs uppercase tracking-[0.18em] text-[#1C1B18]/50 mt-2 font-medium">
                        {phase.duration}
                      </span>
                    </div>

                    <div className="md:col-span-9">
                      <h3 className="font-serif text-2xl text-[#1C1B18]">
                        {phase.title}
                      </h3>
                      <p className="text-sm font-light leading-relaxed text-[#1C1B18]/75 mt-3">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          <EditorialSection />

          <ConsultationCTA />

        </main>
      </div>
      <Footer />
    </div>
  );
}
