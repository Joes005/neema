import React from "react";
import Navbar from "@/components/Navbar";
import ChennaiArch from "@/components/ChennaiArch";
import ProjectsCollage from "@/components/ProjectsCollage";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata = {
  title: "Projects | NEEMA HOMES",
  description:
    "Explore signature residential interior design projects across Chennai by NEEMA HOMES.",
};

export default function ProjectsPage() {
  return (
    <div className="relative z-0 bg-[#1C1B18]">
      <div className="relative z-10 bg-[#F9F8F3] text-[#1C1B18] min-h-screen flex flex-col overflow-x-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        <Navbar />
        <main className="flex-1">

          {/* Header Section */}
          <section className="pt-36 pb-24 px-6 lg:px-10 max-w-7xl mx-auto border-b border-[#1C1B18]/10">
            <RevealOnScroll direction="up">
              <p className="eyebrow text-[#C5A880]">PROJECTS</p>
              <h1 className="display-1 mt-4 text-[#1C1B18] max-w-3xl leading-[1.1]">
                Every residence carries its own fingerprint.
              </h1>
              <p className="mt-8 max-w-xl text-[#1C1B18]/70 text-[15px] font-light leading-relaxed">
                A selection of spaces from personalised residences across Chennai and its surrounding areas. Full project studies are shared on request.
              </p>
            </RevealOnScroll>
          </section>

          {/* Arch Typography */}
          <section className="pt-16 pb-0">
            <ChennaiArch />
          </section>

          {/* Grid Portfolio Overview */}
          <ProjectsCollage />

          {/* Footer CTA */}
          <section className="py-32 px-6 lg:px-10 max-w-3xl mx-auto text-center border-t border-[#1C1B18]/10 mt-12">
            <RevealOnScroll direction="up">
              <h2 className="font-serif text-4xl md:text-5xl text-[#1C1B18] leading-tight mb-6">
                Looking for something closer to your home?
              </h2>
              <p className="text-[#1C1B18]/70 text-[15px] font-light mb-12">
                Tell us the configuration and location, and we will share comparable work.
              </p>
              <button className="px-8 py-4 bg-[#1C1B18] text-[#F9F8F3] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-black transition-colors duration-300">
                REQUEST A PORTFOLIO
              </button>
            </RevealOnScroll>
          </section>

        </main>
      </div>
      <Footer />
    </div>
  );
}
