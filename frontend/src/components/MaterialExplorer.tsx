"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

const materials = [
  { id: "marble", name: "ITALIAN MARBLE", image: "/images/project-bath.jpg" },
  { id: "teak", name: "TEAK VENEER", image: "/images/project-foyer.jpg" },
  { id: "brass", name: "BRUSHED BRASS", image: "/images/project-wardrobe.jpg" },
  { id: "stone", name: "NATURAL STONE", image: "/images/project-bedroom.jpg" },
  { id: "linen", name: "LINEN TEXTILE", image: "/images/materials-preview.jpg" },
];

export default function MaterialExplorer() {
  const [activeMaterial, setActiveMaterial] = useState<string | null>(null);

  // A repeated sequence block for the marquee
  const MarqueeContent = ({ item }: { item: typeof materials[0] }) => (
    <>
      {[...Array(6)].map((_, i) => (
        <React.Fragment key={i}>
          <div className="relative w-[120px] h-[48px] lg:w-[160px] lg:h-[64px] rounded-full overflow-hidden shrink-0">
            <Image src={item.image} alt={item.name} fill sizes="160px" className="object-cover" />
            <div className="absolute inset-0 border border-black/10 rounded-full" />
          </div>
          <span className="text-lg lg:text-[22px] font-sans font-medium uppercase tracking-[0.1em] shrink-0 opacity-90">
            {item.name}
          </span>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <section className="bg-[#1C1B18] text-[#F9F8F3] py-12 sm:py-20 lg:py-28 overflow-hidden">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 flex flex-col items-center text-center">
        <p className="eyebrow text-[#F9F8F3]/60">The palette</p>
        <div className="mt-5 h-px w-16 bg-[#C5A880]/60 hidden"></div>
        <h2 className="display-2 mt-12 max-w-4xl text-[#F9F8F3]">
          Materials chosen to age well.
        </h2>
        <p className="mt-8 max-w-xl text-[13px] leading-relaxed text-[#F9F8F3]/60">
          Stone, timber, metal and textile. Hover a finish to see it in a residence.
        </p>
      </div>

      {/* Accordion List */}
      <div className="mt-12 sm:mt-20 lg:mt-24 w-full flex flex-col border-t border-[#F9F8F3]/10">
        {materials.map((item) => {
          const isActive = activeMaterial === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setActiveMaterial(isActive ? null : item.id)}
              onMouseEnter={() => setActiveMaterial(item.id)}
              onMouseLeave={() => setActiveMaterial(null)}
              className={clsx(
                "relative flex items-center border-b border-[#F9F8F3]/10 transition-all duration-500 overflow-hidden cursor-pointer touch-manipulation select-none",
                isActive ? "bg-[#bca47c] text-[#1C1B18]" : "bg-transparent text-[#F9F8F3]"
              )}
              style={{
                height: isActive ? "100px" : "64px",
              }}
            >
              {/* Inactive State - Centered Text */}
              <div
                className={clsx(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                  isActive ? "opacity-0 pointer-events-none" : "opacity-100"
                )}
              >
                <span className="text-sm lg:text-[15px] font-bold uppercase tracking-[0.15em]">
                  {item.name}
                </span>
              </div>

              {/* Active State - Marquee */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center"
                  >
                    <motion.div
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 40,
                      }}
                      className="flex items-center gap-10 lg:gap-16 w-max pl-10 lg:pl-16"
                    >
                      <div className="flex items-center gap-10 lg:gap-16">
                        <MarqueeContent item={item} />
                      </div>
                      <div className="flex items-center gap-10 lg:gap-16">
                        <MarqueeContent item={item} />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}


