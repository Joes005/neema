"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const materials = [
  { id: "marble", name: "ITALIAN MARBLE", image: "/images/project-bath.jpg" },
  { id: "teak", name: "TEAK VENEER", image: "/images/project-foyer.jpg" },
  { id: "brass", name: "BRUSHED BRASS", image: "/images/project-wardrobe.jpg" },
  { id: "stone", name: "NATURAL STONE", image: "/images/project-bedroom.jpg" },
  { id: "linen", name: "LINEN TEXTILE", image: "/images/materials-preview.jpg" },
  { id: "oak", name: "OAK JOINERY", image: "/images/project-kitchen.jpg" },
];

export default function MaterialExplorer() {
  const [activeMaterial, setActiveMaterial] = useState(materials[0]);

  return (
    <section className="bg-[#1C1B18] text-[#F9F8F3]">
      <div className="mx-auto max-w-7xl px-6 pt-20 lg:px-10 lg:pt-28">
        <p className="eyebrow text-[#F9F8F3]/60">The palette</p>
        <div className="mt-5 h-px w-16 bg-[#C5A880]/60"></div>
        <h2 className="display-1 mt-8 max-w-4xl text-[#F9F8F3]">
          Materials chosen to age well.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F9F8F3]/70">
          Stone, timber, metal and textile. Hover a finish to see it in a residence.
        </p>
      </div>

      <div className="mt-12 mx-auto max-w-7xl px-6 lg:px-10 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* List of Material Bands */}
        <div className="lg:col-span-5 flex flex-col space-y-2">
          {materials.map((item) => {
            const isActive = item.id === activeMaterial.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveMaterial(item)}
                onMouseEnter={() => setActiveMaterial(item)}
                className={`py-4 border-b border-[#F9F8F3]/15 text-left transition-all cursor-pointer flex items-center justify-between group ${
                  isActive ? "text-[#C5A880] border-[#C5A880]" : "text-[#F9F8F3]/70 hover:text-[#F9F8F3]"
                }`}
              >
                <span className="text-sm font-bold uppercase tracking-[0.2em] font-sans">
                  {item.name}
                </span>
                <span className={`text-xs transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}>
                  →
                </span>
              </button>
            );
          })}
        </div>

        {/* Display Image Preview */}
        <div className="lg:col-span-7 h-[clamp(350px,50vh,500px)] relative overflow-hidden rounded-2xl border border-[#F9F8F3]/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMaterial.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative h-full w-full"
            >
              <Image
                src={activeMaterial.image}
                alt={activeMaterial.name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-6 left-6 bg-[#1C1B18]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#F9F8F3]/15 text-xs tracking-[0.16em] uppercase text-[#C5A880]">
                {activeMaterial.name}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}


