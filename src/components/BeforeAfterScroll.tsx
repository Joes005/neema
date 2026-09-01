"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BeforeAfterScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Split percentage driven by scroll: 0% -> 100%
  const scrollSplitPercent = useTransform(scrollYProgress, [0.1, 0.9], [15, 85]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseLeave = () => {
    setSliderPosition(null);
  };

  return (
    <section
      id="transformation"
      ref={containerRef}
      className="relative h-[220vh] bg-[#1C1B18] text-[#F9F8F3] overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-12 px-6 lg:px-16">
        {/* Header */}
        <div className="mx-auto max-w-7xl w-full text-center z-20">
          <p className="eyebrow text-[#C5A880]">07 · Transformation Story</p>
          <h2 className="display-1 mt-2 text-[#F9F8F3]">From Blueprint to Living Space</h2>
          <p className="lede mt-3 text-[#F9F8F3]/70 max-w-xl mx-auto">
            Scroll to reveal the architectural transformation of a signature residence.
          </p>
        </div>

        {/* Before / After Viewport Container */}
        <div
          data-cursor="SLIDE"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative my-auto h-[60vh] max-h-[600px] w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-[#C5A880]/30 select-none cursor-ew-resize"
        >
          {/* AFTER Image (Bottom Layer) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/hero-living.jpg"
              alt="Completed luxury living room residence"
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover"
            />
            <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-[#1C1B18]/80 backdrop-blur-md border border-[#F9F8F3]/15 text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              AFTER · DELIVERED
            </div>
          </div>

          {/* BEFORE Blueprint/Structure Layer (Clipped Top Layer) */}
          <motion.div
            style={{
              clipPath: useTransform(
                scrollSplitPercent,
                (val) => `inset(0 ${100 - (sliderPosition ?? val)}% 0 0)`
              ),
            }}
            className="absolute inset-0 w-full h-full bg-[#141312]"
          >
            <Image
              src="/images/project-foyer.jpg"
              alt="Initial raw structure and joinery layout"
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover grayscale contrast-125 brightness-75"
            />
            {/* SVG Blueprint Grid Overlay */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `linear-gradient(to right, #C5A880 1px, transparent 1px), linear-gradient(to bottom, #C5A880 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[#1C1B18]/80 backdrop-blur-md border border-[#F9F8F3]/15 text-xs font-bold uppercase tracking-widest text-[#F9F8F3]/80">
              BEFORE · ARCHITECTURAL SCHEMATIC
            </div>
          </motion.div>

          {/* Split Slider Line Indicator */}
          <motion.div
            style={{
              left: useTransform(
                scrollSplitPercent,
                (val) => `${sliderPosition ?? val}%`
              ),
            }}
            className="absolute top-0 bottom-0 w-1 bg-[#C5A880] shadow-[0_0_15px_#C5A880] z-30 pointer-events-none -translate-x-1/2 flex items-center justify-center"
          >
            <div className="w-8 h-8 rounded-full bg-[#C5A880] text-[#1C1B18] flex items-center justify-center font-bold text-xs shadow-lg">
              ↔
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mx-auto max-w-6xl w-full flex justify-between items-center z-20 text-xs text-[#F9F8F3]/50">
          <span>0% · SCHEMATIC</span>
          <span className="uppercase tracking-widest text-[#C5A880]">
            DRAG MOUSE OR SCROLL TO COMPARE
          </span>
          <span>100% · COMPLETED</span>
        </div>
      </div>
    </section>
  );
}
