"use client";

import React, { useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";

const accordionItems = [
  { id: "living", title: "Living Room", image: "/images/hero-living.jpg" },
  { id: "kitchen", title: "Kitchen", image: "/images/project-kitchen.jpg" },
  { id: "bedroom", title: "Master Bedroom", image: "/images/project-bedroom.jpg" },
  { id: "bathroom", title: "Spa Bathroom", image: "/images/project-bath.jpg" },
  { id: "dining", title: "Dining Suite", image: "/images/project-dining.jpg" },
];

export default function ServiceAccordion() {
  const [hoveredId, setHoveredId] = useState<string>("kitchen"); // Default expanded

  return (
    <section className="bg-[#1C1B18] text-[#F9F8F3] py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <p className="eyebrow text-[#C5A880]">ACROSS THE RESIDENCE</p>
        <h2 className="display-2 mt-4 text-[#F9F8F3]">
          One studio, every room.
        </h2>
        <p className="mt-4 text-sm text-[#F9F8F3]/60 max-w-xl font-light">
          Hover a space to bring it into focus, the same hands design and deliver each one.
        </p>

        {/* Mobile View (< md): Interactive Touch Pills & Card */}
        <div className="mt-8 flex flex-col md:hidden gap-6">
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
            {accordionItems.map((item) => {
              const isActive = hoveredId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setHoveredId(item.id)}
                  className={clsx(
                    "px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300",
                    isActive
                      ? "bg-[#C5A880] text-[#1C1B18] shadow-md"
                      : "bg-[#F9F8F3]/10 text-[#F9F8F3]/70 hover:bg-[#F9F8F3]/20"
                  )}
                >
                  {item.title}
                </button>
              );
            })}
          </div>

          {/* Active Card Preview on Mobile */}
          {(() => {
            const activeItem = accordionItems.find((i) => i.id === hoveredId) || accordionItems[0];
            return (
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#F9F8F3]/15">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xl font-serif flex items-center gap-2">
                    <span className="text-[#C5A880]">|</span> {activeItem.title}
                  </p>
                  <p className="text-xs text-[#F9F8F3]/70 mt-1 font-light">
                    Designed and delivered in-house for signature residences.
                  </p>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Desktop View (>= md): Horizontal Hover Accordion */}
        <div className="mt-16 hidden md:flex h-[400px] lg:h-[500px] w-full gap-2">
          {accordionItems.map((item) => {
            const isActive = hoveredId === item.id;
            
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                className={clsx(
                  "relative h-full overflow-hidden rounded-xl transition-[flex] duration-700 ease-out cursor-pointer",
                  isActive ? "flex-[4]" : "flex-1"
                )}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={clsx(
                    "object-cover transition-all duration-700 ease-out",
                    isActive ? "scale-100 opacity-100" : "scale-110 opacity-50 grayscale"
                  )}
                />
                
                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Title */}
                <div
                  className={clsx(
                    "absolute bottom-6 left-6 transition-all duration-500",
                    isActive ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-4"
                  )}
                >
                  <p className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="text-[#C5A880]">|</span> {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
