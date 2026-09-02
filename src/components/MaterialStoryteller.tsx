"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const materialStory = [
  {
    material: "NATURAL TEAK VENEER",
    headline: "Warmth & Tactile Grain",
    description: "Selected for grain density, hand-finished with natural oils to age gracefully under Chennai heat.",
    image: "/images/project-foyer.jpg",
    specs: "Grain matched · Moisture sealed",
  },
  {
    material: "ITALIAN MARBLE",
    headline: "Cool Elegance & Permanence",
    description: "Book-matched slabs selected in Italy and precision-cut on CNC waterjets for seamless joints.",
    image: "/images/project-bath.jpg",
    specs: "Calacatta Gold · Honed texture",
  },
  {
    material: "BRUSHED BRASS",
    headline: "Precision Metallic Accents",
    description: "Custom extruded brass trims and hardware, sealed with anti-tarnish protective lacquer.",
    image: "/images/project-wardrobe.jpg",
    specs: "2mm thickness · Hand-buffed",
  },
  {
    material: "RAW LINEN & TEXTILE",
    headline: "Organic Softness & Light Diffusion",
    description: "Heavy weight natural Belgian linen curtains filtering intense tropical sunlight into soft warmth.",
    image: "/images/materials-preview.jpg",
    specs: "100% Organic Linen · UV protected",
  },
];

export default function MaterialStoryteller() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="materials"
      ref={containerRef}
      className="relative h-[320vh] bg-[#141312] text-[#F7F5F0]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-12 px-6 lg:px-16 overflow-hidden">
        {/* Section Header */}
        <div className="mx-auto max-w-7xl w-full flex justify-between items-center z-20">
          <div>
            <p className="eyebrow text-[#C5A880]">06 · Sensory Storytelling</p>
            <h2 className="display-2 mt-1 text-[#F7F5F0]">Travel Through Materials</h2>
          </div>
          <span className="text-xs uppercase tracking-widest text-[#C5A880] hidden sm:block">
            TACTILE EXPERIENCE
          </span>
        </div>

        {/* Dynamic Material Visuals Container */}
        <div className="relative flex-1 my-8 w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-[#C5A880]/20">
          {materialStory.map((item, idx) => (
            <MaterialItem
              key={item.material}
              item={item}
              index={idx}
              total={materialStory.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Progress Bar Footer */}
        <div className="mx-auto max-w-6xl w-full flex justify-between items-center z-20 text-xs text-[#F7F5F0]/50">
          <span>MATERIAL DEPTH 01 — 04</span>
          <div className="w-48 h-1 bg-[#F7F5F0]/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full bg-[#C5A880] origin-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MaterialItem({
  item,
  index,
  total,
  scrollYProgress,
}: {
  item: (typeof materialStory)[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const stepStart = index / total;
  const stepEnd = (index + 1) / total;

  let opacityInput: number[];
  let opacityOutput: number[];

  if (index === 0) {
    opacityInput = [0, stepEnd - 0.05, stepEnd];
    opacityOutput = [1, 1, 0];
  } else if (index === total - 1) {
    opacityInput = [stepStart - 0.05, stepStart, 1.0];
    opacityOutput = [0, 1, 1];
  } else {
    opacityInput = [stepStart - 0.05, stepStart, stepEnd - 0.05, stepEnd];
    opacityOutput = [0, 1, 1, 0];
  }

  const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput);
  const scale = useTransform(scrollYProgress, [stepStart, stepEnd], [1.08, 1.0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 w-full h-full"
    >
      <motion.div style={{ scale }} className="relative w-full h-full">
        <Image
          src={item.image}
          alt={item.material}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
      </motion.div>

      {/* Typography overlay */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-10 sm:left-10 sm:right-10 z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-3 sm:gap-6 text-[#F7F5F0]">
        <div className="max-w-xl">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C5A880]">
            {item.material}
          </span>
          <h3 className="display-2 mt-1 font-serif">{item.headline}</h3>
          <p className="mt-2 text-xs sm:text-sm text-[#F7F5F0]/80 font-light leading-relaxed line-clamp-3 sm:line-clamp-none">
            {item.description}
          </p>
        </div>

        <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#141312]/80 backdrop-blur-md border border-[#C5A880]/40 text-[10px] sm:text-xs text-[#C5A880] tracking-wider uppercase shrink-0">
          {item.specs}
        </div>
      </div>
    </motion.div>
  );
}
