"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const services = [
  {
    number: "01",
    category: "RESIDENTIAL INTERIORS",
    title: "Signature Private Residences",
    description:
      "Full-scope interior design and execution for luxury apartments, penthouses, and villas in Chennai. From spatial planning to bespoke furniture.",
    image: "/images/project-bedroom.jpg",
    specs: ["Spatial Layout", "Bespoke Millwork", "Lighting Architecture", "Acoustic Insulation"],
    accent: "#C5A880",
  },
  {
    number: "02",
    category: "COMMERCIAL & EXECUTIVE",
    title: "Executive Workspaces & Suites",
    description:
      "Bespoke offices, private consultation lounges, and boutique commercial environments engineered for focus, elegance, and client impression.",
    image: "/images/project-foyer.jpg",
    specs: ["Executive Suites", "Acoustic Partitioning", "Custom Reception Joinery", "HVAC Integration"],
    accent: "#D6CFBF",
  },
  {
    number: "03",
    category: "BESPOKE TURNKEY EXECUTION",
    title: "In-House Delivery & Craft",
    description:
      "Single point of accountability. In-house joiners, stonemasons, master painters, and site managers delivering turnkey precision.",
    image: "/images/project-kitchen.jpg",
    specs: ["Single Specification", "Transparent Costing", "On-Site Supervision", "Post-Handover Warranty"],
    accent: "#C5A880",
  },
];

export default function SpatialServices() {
  return (
    <section id="services" className="bg-[#1C1B18] text-[#F9F8F3] py-24 lg:py-32 overflow-hidden">
      {/* Section Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-16 lg:mb-24">
        <p className="eyebrow text-[#C5A880]">04 · Spatial Chapters</p>
        <h2 className="display-1 mt-4 text-[#F9F8F3]">Architectural Scope</h2>
        <p className="lede mt-6 text-[#F9F8F3]/70 max-w-2xl">
          We do not apply templates or sell off-the-shelf furniture. Each service is delivered as a dedicated chapter in spatial design.
        </p>
      </div>

      {/* Spatial Chapter Stack */}
      <div className="flex flex-col gap-24 lg:gap-36 mx-auto max-w-7xl px-6 lg:px-10">
        {services.map((service, idx) => (
          <ServiceChapter key={service.number} service={service} index={idx} />
        ))}
      </div>
    </section>
  );
}

function ServiceChapter({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
  });

  // Image expansion: 40% -> 100% viewport width feel
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.92, 1.04, 0.95]);
  const y = useTransform(smoothProgress, [0, 1], ["8%", "-8%"]);
  const imageRadius = useTransform(smoothProgress, [0, 0.5, 1], ["24px", "8px", "24px"]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      {/* Image Expansion Container */}
      <div className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <motion.div
          style={{ scale, y, borderRadius: imageRadius }}
          className="relative aspect-[16/11] w-full overflow-hidden shadow-2xl border border-[#F9F8F3]/10 group cursor-pointer"
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B18]/80 via-transparent to-transparent" />
          
          <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[#1C1B18]/80 backdrop-blur-md border border-[#F9F8F3]/15 text-xs font-sans font-bold tracking-widest text-[#C5A880]">
            CHAPTER {service.number}
          </div>
        </motion.div>
      </div>

      {/* Description Content */}
      <div className={`lg:col-span-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
        <p className="eyebrow" style={{ color: service.accent }}>
          {service.category}
        </p>
        <h3 className="display-2 mt-4 text-[#F9F8F3] leading-tight">{service.title}</h3>
        <p className="mt-6 text-base text-[#F9F8F3]/75 font-light leading-relaxed">
          {service.description}
        </p>

        {/* Specs Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {service.specs.map((spec) => (
            <span
              key={spec}
              className="px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider bg-[#F9F8F3]/5 border border-[#F9F8F3]/15 text-[#F9F8F3]/80"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/services"
            className="btn-ink bg-[#C5A880] text-[#1C1B18] hover:bg-[#F9F8F3]"
          >
            Explore Chapter {service.number}
          </Link>
        </div>
      </div>
    </div>
  );
}
