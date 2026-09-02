import React from "react";
import Navbar from "@/components/Navbar";
import ServiceAccordion from "@/components/ServiceAccordion";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import Image from "next/image";

export const metadata = {
  title: "Services | NEEMA HOMES",
  description:
    "Comprehensive residential interior design, custom joinery, spatial layout, and execution services in Chennai.",
};

const servicesList = [
  {
    num: "01",
    title: "Full-home interior design",
    description: "Spatial planning, layouts, lighting, material palettes and detailed drawings for the whole residence, resolved before a single unit is built.",
  },
  {
    num: "02",
    title: "Bespoke and modular joinery",
    description: "Wardrobes, kitchens, storage and feature units made to the drawing, proportioned to the room rather than to a catalogue.",
  },
  {
    num: "03",
    title: "Civil, electrical and finishing works",
    description: "False ceilings, flooring, plumbing and electrical coordination, paint and finish work, sequenced so trades do not undo each other.",
  },
  {
    num: "04",
    title: "Turnkey execution",
    description: "In-house execution with carefully selected specialists, defined quality checks and a single point of accountability through handover.",
  },
  {
    num: "05",
    title: "Furniture, lighting and styling",
    description: "Loose furniture, lighting and soft furnishings selected against the same palette, so the finished home reads as one decision.",
  },
  {
    num: "06",
    title: "Handover and aftercare",
    description: "A documented handover with snag resolution, so the residence is complete when you receive it, not after you chase it.",
  },
];

export default function ServicesPage() {
  return (
    <div className="relative z-0 bg-[#1C1B18]">
      <div className="relative z-10 bg-[#F9F8F3] text-[#1C1B18] min-h-screen flex flex-col overflow-x-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        <Navbar />
        <main className="flex-1">

          {/* Header Section */}
          <section className="pt-28 sm:pt-36 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
            <RevealOnScroll direction="up">
              <p className="eyebrow text-[#C5A880]">SERVICES</p>
              <h1 className="display-1 mt-4 text-[#1C1B18] max-w-3xl leading-[1.1]">
                Designed in-house.<br/>Delivered in-house.
              </h1>
              <p className="mt-6 sm:mt-8 max-w-xl text-[#1C1B18]/70 text-base sm:text-lg font-light leading-relaxed">
                NEEMA HOMES works across the full residence, from the first layout to the last finish, for projects typically valued between ₹25 lakh and ₹1 crore.
              </p>
            </RevealOnScroll>
          </section>

          {/* Services Grid Section */}
          <section className="pb-16 sm:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 sm:gap-y-16">
              {servicesList.map((srv, idx) => (
                <RevealOnScroll key={srv.num} delay={idx * 0.1} direction="up">
                  <div className="border-t border-[#1C1B18]/15 pt-6">
                    <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase">
                      {srv.num}
                    </span>
                    <h3 className="font-serif text-2xl text-[#1C1B18] mt-4 mb-3">
                      {srv.title}
                    </h3>
                    <p className="text-sm text-[#1C1B18]/70 leading-relaxed font-light">
                      {srv.description}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* Room Accordion Section */}
          <ServiceAccordion />

          {/* Scope Clarity Section */}
          <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
            <RevealOnScroll direction="up">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
                {/* Left: Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden shadow-sm rounded-2xl sm:rounded-none">
                  <Image
                    src="/images/materials-preview.jpg"
                    alt="Material Samples"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Right: Content */}
                <div className="lg:pr-4">
                  <p className="eyebrow text-[#C5A880]">SCOPE CLARITY</p>
                  <h2 className="display-2 mt-4 text-[#1C1B18] leading-[1.1]">
                    You approve the specification, not a slogan.
                  </h2>
                  <p className="mt-6 text-[#1C1B18]/70 text-[15px] leading-relaxed font-light">
                    Each service is quoted against a written specification: materials, brands, finishes and inclusions. What is not in the specification is not in the price, and both are visible from the start.
                  </p>
                  <button className="mt-8 sm:mt-10 w-full sm:w-auto px-8 py-4 border border-[#1C1B18] text-[#1C1B18] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#1C1B18] hover:text-[#F9F8F3] transition-colors duration-300">
                    DISCUSS YOUR SCOPE
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          </section>

        </main>
      </div>
      <Footer />
    </div>
  );
}
