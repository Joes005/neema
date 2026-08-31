import React from "react";
import Navbar from "@/components/Navbar";
import ProjectCarousel from "@/components/ProjectCarousel";
import ConsultationCTA from "@/components/ConsultationCTA";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import Image from "next/image";
import { defaultProjects } from "@/data/projectsData";

export const metadata = {
  title: "Projects | NEEMA HOMES",
  description:
    "Explore signature residential interior design projects across Chennai by NEEMA HOMES.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#141312] text-[#F7F5F0]">
      <Navbar />

      <section className="pt-36 pb-16 px-6 lg:px-10 max-w-7xl mx-auto">
        <RevealOnScroll direction="up">
          <p className="eyebrow text-[#C5A880]">SELECTED PORTFOLIO</p>
          <h1 className="display-1 mt-4 text-[#F7F5F0]">
            Residences crafted in Chennai.
          </h1>
          <p className="lede mt-6 max-w-2xl text-[#F7F5F0]/80">
            A curation of private living rooms, dining suites, master bedrooms, spa bathrooms, and custom kitchens designed and executed by NEEMA HOMES.
          </p>
        </RevealOnScroll>
      </section>

      {/* Main Interactive Carousel */}
      <ProjectCarousel />

      {/* Grid Portfolio Overview */}
      <section className="py-24 px-6 lg:px-10 max-w-7xl mx-auto border-t border-[#F7F5F0]/10">
        <div className="mb-12">
          <p className="eyebrow text-[#C5A880]">ROOM BY ROOM INDEX</p>
          <h2 className="display-2 text-[#F7F5F0] mt-2">All Architectural Spaces</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultProjects.map((p, idx) => (
            <RevealOnScroll key={p.id} delay={idx * 0.08} direction="up">
              <div className="group rounded-2xl overflow-hidden bg-[#1F1D1B] border border-[#F7F5F0]/10 hover:border-[#C5A880] transition-all">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#141312]/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#C5A880] uppercase tracking-wider">
                    {p.roomType}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#C5A880] font-sans tracking-widest uppercase mt-1">
                    {p.location}
                  </p>
                  <p className="text-xs text-[#F7F5F0]/70 mt-3 line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <ConsultationCTA />

      <Footer />
    </main>
  );
}
