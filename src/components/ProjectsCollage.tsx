"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

const collageItems = [
  // Column 1
  { id: 1, type: "image", src: "/images/hero-living.jpg", classes: "col-span-1 md:col-span-2 row-span-2" },
  { id: 2, type: "image", src: "/images/project-kitchen.jpg", classes: "col-span-1 md:col-span-1 row-span-3" },
  
  // Column 2
  { id: 3, type: "image", src: "/images/project-bedroom.jpg", classes: "col-span-1 md:col-span-2 row-span-3" },
  { id: 4, type: "image", src: "/images/project-dining.jpg", classes: "col-span-1 md:col-span-2 row-span-2" },
  
  // Column 3
  { id: 5, type: "image", src: "/images/project-foyer.jpg", classes: "col-span-1 md:col-span-1 row-span-2" },
  { id: 6, type: "image", src: "/images/project-wardrobe.jpg", classes: "col-span-1 md:col-span-2 row-span-2" },
  { id: 7, type: "image", src: "/images/project-bath.jpg", classes: "col-span-1 md:col-span-1 row-span-3" },
  
  // Row 2 / Mixed
  { id: 8, type: "image", src: "/images/hero-living.jpg", classes: "col-span-1 md:col-span-1 row-span-2" },
  { id: 9, type: "nav", label: "LIVING", classes: "col-span-1 md:col-span-1 row-span-2" },
  
  // Large center-bottom item
  { id: 10, type: "image-nav", src: "/images/project-kitchen.jpg", label: "Kitchen", classes: "col-span-2 md:col-span-3 row-span-2" },
  
  { id: 11, type: "nav", label: "BATH", classes: "col-span-1 md:col-span-1 row-span-2" },
  
  // Row 3
  { id: 12, type: "image", src: "/images/project-wardrobe.jpg", classes: "col-span-1 md:col-span-2 row-span-3" },
  { id: 13, type: "image", src: "/images/hero-living.jpg", classes: "col-span-1 md:col-span-2 row-span-2" },
  { id: 14, type: "image", src: "/images/project-kitchen.jpg", classes: "col-span-1 md:col-span-1 row-span-2" },
  { id: 15, type: "image", src: "/images/project-dining.jpg", classes: "col-span-1 md:col-span-1 row-span-2" },
];

export default function ProjectsCollage() {
  return (
    <section className="py-24 px-4 lg:px-10 max-w-[1400px] mx-auto overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-6 auto-rows-[120px] md:auto-rows-[180px] gap-3 md:gap-4">
        {collageItems.map((item, idx) => {
          return (
            <RevealOnScroll
              key={item.id}
              delay={(idx % 6) * 0.1} // Stagger based on column index roughly
              direction="up"
              className={`relative rounded-sm overflow-hidden shadow-sm group cursor-pointer ${item.classes}`}
            >
              {item.type === "image" && item.src && (
                <Image
                  src={item.src}
                  alt={`Project ${item.id}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              
              {item.type === "nav" && (
                <div className="w-full h-full bg-[#1C1B18] flex flex-col items-center justify-center text-[#F9F8F3] transition-colors hover:bg-[#C5A880]">
                  <ArrowUpRight className="w-5 h-5 mb-3 opacity-60" />
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">
                    {item.label}
                  </span>
                </div>
              )}

              {item.type === "image-nav" && item.src && (
                <>
                  <Image
                    src={item.src}
                    alt={item.label || "Project"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
                    <span className="font-serif text-xl">{item.label}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-80" />
                  </div>
                </>
              )}
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
