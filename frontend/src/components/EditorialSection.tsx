"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { clsx } from "clsx";

// Geometric Icon Components matching ronnsquare.fr video aesthetic
function GeometricIcon1({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [0, 180]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.95, 1.1, 0.95]);

  return (
    <motion.svg
      style={{ rotate, scale }}
      viewBox="0 0 160 320"
      fill="none"
      className="w-14 h-28 sm:w-20 sm:h-40 lg:w-28 lg:h-56 shrink-0 opacity-85"
    >
      <circle cx="80" cy="60" r="42" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="80" cy="60" r="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="80" y1="102" x2="80" y2="158" stroke="currentColor" strokeWidth="2.5" />
      <rect
        x="40"
        y="158"
        width="80"
        height="80"
        stroke="currentColor"
        strokeWidth="2.5"
        transform="rotate(45 80 198)"
      />
      <circle cx="80" cy="198" r="6" fill="currentColor" />
    </motion.svg>
  );
}

function GeometricIcon2({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [30, -45]);
  const y = useTransform(progress, [0, 1], [-12, 12]);

  return (
    <motion.svg
      style={{ rotate, y }}
      viewBox="0 0 160 320"
      fill="none"
      className="w-14 h-28 sm:w-20 sm:h-40 lg:w-28 lg:h-56 shrink-0 opacity-85"
    >
      <polygon points="80,20 140,80 80,140 20,80" stroke="currentColor" strokeWidth="2.5" />
      <line x1="80" y1="140" x2="80" y2="195" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="80" cy="240" r="45" stroke="currentColor" strokeWidth="2.5" />
      <rect x="65" y="225" width="30" height="30" stroke="currentColor" strokeWidth="1.5" />
    </motion.svg>
  );
}

function GeometricIcon3({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [0, -180]);
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.12, 1]);

  return (
    <motion.svg
      style={{ rotate, scale }}
      viewBox="0 0 160 320"
      fill="none"
      className="w-14 h-28 sm:w-20 sm:h-40 lg:w-28 lg:h-56 shrink-0 opacity-85"
    >
      <rect x="35" y="35" width="90" height="90" stroke="currentColor" strokeWidth="2.5" />
      <rect
        x="35"
        y="35"
        width="90"
        height="90"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(45 80 80)"
        strokeDasharray="6 4"
      />
      <line x1="80" y1="125" x2="80" y2="195" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="80" cy="240" r="40" stroke="currentColor" strokeWidth="2.5" />
      <polygon points="80,215 95,245 65,245" stroke="currentColor" strokeWidth="1.5" fill="currentColor" />
    </motion.svg>
  );
}

function GeometricIcon4({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [-60, 60]);
  const y = useTransform(progress, [0, 1], [12, -12]);

  return (
    <motion.svg
      style={{ rotate, y }}
      viewBox="0 0 160 320"
      fill="none"
      className="w-14 h-28 sm:w-20 sm:h-40 lg:w-28 lg:h-56 shrink-0 opacity-85"
    >
      <circle cx="80" cy="70" r="48" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="80" cy="70" r="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3" />
      <line x1="80" y1="118" x2="80" y2="180" stroke="currentColor" strokeWidth="2.5" />
      <polygon points="80,180 125,205 125,255 80,280 35,255 35,205" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="80" cy="230" r="8" fill="currentColor" />
    </motion.svg>
  );
}

const pillars = [
  {
    id: "pillar-materials",
    shortLabel: "01 Materials",
    number: "01",
    eyebrow: "Materials & Palettes",
    heading: "Selected once, checked repeatedly.",
    description:
      "Italian marble, teak veneers, brushed brass, and raw linen are evaluated against how they will age in a Chennai residence: heat, humidity, and daily usage included.",
    specs: ["Italian Marble", "Teak Veneer", "Brushed Brass", "Raw Linen"],
    ctaText: "See the process",
    ctaHref: "/process",
    image: "/images/materials-preview.jpg",
    imageAlt: "Teak veneer, stone tile, brass strip and linen samples",
    bgColor: "bg-[#1C1B18]",
    textColor: "text-[#F9F8F3]",
    accentColor: "text-[#C5A880]",
    btnBg: "bg-[#C5A880] text-[#1C1B18] hover:bg-[#F9F8F3]",
    icon: GeometricIcon1,
    reverseLayout: false,
  },
  {
    id: "pillar-specialists",
    shortLabel: "02 Specialists",
    number: "02",
    eyebrow: "Specialists & Artisans",
    heading: "Master artisans, single specification.",
    description:
      "In-house joiners, stonemasons, electricians, and painters execute precisely to approved technical drawings with unified site supervision and zero compromise.",
    specs: ["Master Joiners", "Stonemasons", "Electrical Engineers", "Master Finishers"],
    ctaText: "Explore our studio",
    ctaHref: "/studio",
    image: "/images/artisan_workshop.png",
    imageAlt: "Interior design foyer with custom teak joinery and stone details",
    bgColor: "bg-[#F2EFE9]",
    textColor: "text-[#1C1B18]",
    accentColor: "text-[#71552F]",
    btnBg: "bg-[#1C1B18] text-[#F9F8F3] hover:bg-[#C5A880] hover:text-[#1C1B18]",
    icon: GeometricIcon2,
    reverseLayout: true,
  },
  {
    id: "pillar-joinery",
    shortLabel: "03 Joinery",
    number: "03",
    eyebrow: "Joinery & Millwork",
    heading: "Proportioned to the room, not the catalogue.",
    description:
      "Wardrobes, kitchens, feature paneling, and concealed hardware are drawn to the exact scale of your space and built by the same hands that specified them.",
    specs: ["Modular Kitchens", "Walk-in Wardrobes", "Concealed Hardware", "Bespoke Paneling"],
    ctaText: "View selected work",
    ctaHref: "/projects",
    image: "/images/project-kitchen.jpg",
    imageAlt: "Bespoke kitchen with matte dark cabinetry and stone counter",
    bgColor: "bg-[#25231F]",
    textColor: "text-[#F9F8F3]",
    accentColor: "text-[#C5A880]",
    btnBg: "bg-[#C5A880] text-[#1C1B18] hover:bg-[#F9F8F3]",
    icon: GeometricIcon3,
    reverseLayout: false,
  },
  {
    id: "pillar-climate",
    shortLabel: "04 Climate & Quality",
    number: "04",
    eyebrow: "Climate Resilience & Longevity",
    heading: "Engineered for Chennai heat and humidity.",
    description:
      "Moisture-resistant core materials, anti-warp backings, sealed brass hardware, and UV-stable wood finishes ensure your home remains pristine for decades.",
    specs: ["Moisture Control", "Anti-Warp Core", "Sealed Brass", "UV-Stable Finish"],
    ctaText: "Discuss your scope",
    ctaHref: "/contact",
    image: "/images/project-bath.jpg",
    imageAlt: "Master bathroom in stone and travertine with a teak vanity",
    bgColor: "bg-[#E8DFCE]",
    textColor: "text-[#1C1B18]",
    accentColor: "text-[#71552F]",
    btnBg: "bg-[#1C1B18] text-[#F9F8F3] hover:bg-[#C5A880] hover:text-[#1C1B18]",
    icon: GeometricIcon4,
    reverseLayout: true,
  },
];

export default function EditorialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePillar, setActivePillar] = useState(0);

  const scrollToPillar = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="pillars" ref={sectionRef} className="relative bg-[#F9F8F3]">
      {/* Section Header */}
      <div className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto text-center text-[#1C1B18]">
        <p className="eyebrow text-[#71552F]">Design &amp; Execution Pillars</p>
        <h2 className="display-1 mt-4 text-[#1C1B18]">Materials &amp; Specialists</h2>
        <p className="mt-6 max-w-2xl mx-auto text-base text-[#1C1B18]/80 font-normal leading-relaxed">
          Four interconnected disciplines ensuring every residence is curated with clarity, built with precision, and engineered for endurance.
        </p>

        {/* Sticky Pillar Tab Selector */}
        <div className="sticky top-16 sm:top-20 z-40 mt-8 sm:mt-12 mx-auto max-w-full w-fit px-3 py-2 bg-[#1C1B18]/90 backdrop-blur-md border border-[#F9F8F3]/15 rounded-full shadow-2xl flex items-center justify-start sm:justify-center gap-1.5 sm:gap-3 overflow-x-auto whitespace-nowrap scrollbar-none max-w-[92vw]">
          {pillars.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePillar(idx);
                scrollToPillar(p.id);
              }}
              className={clsx(
                "px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer shrink-0",
                activePillar === idx
                  ? "bg-[#C5A880] text-[#1C1B18] shadow-sm"
                  : "text-[#F9F8F3]/70 hover:text-[#F9F8F3] hover:bg-[#F9F8F3]/5"
              )}
            >
              {p.shortLabel}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Multi-Block Pillars */}
      <div className="flex flex-col">
        {pillars.map((pillar, index) => (
          <PillarBlock
            key={pillar.id}
            pillar={pillar}
            index={index}
            onInView={() => setActivePillar(index)}
          />
        ))}
      </div>

      {/* Bottom Geometric Icon Gathering Bar (Reference: ronnsquare.fr 00:08) */}
      <div className="py-12 sm:py-20 bg-[#1C1B18] text-[#F9F8F3] border-t border-[#F9F8F3]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-8 lg:gap-12 text-[#C5A880]/80 mb-6">
            <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" />
            </svg>
            <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
              <polygon points="20,4 36,20 20,36 4,20" stroke="currentColor" strokeWidth="2" />
            </svg>
            <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
              <rect x="8" y="8" width="24" height="24" stroke="currentColor" strokeWidth="2" />
            </svg>
            <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
              <polygon points="20,4 34,12 34,28 20,36 6,28 6,12" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <p className="eyebrow text-[#C5A880]">UNIFIED EXECUTION</p>
          <h3 className="display-2 mt-3 text-[#F9F8F3]">From material board to hand-key.</h3>
          <p className="mt-4 max-w-lg text-sm text-[#F9F8F3]/70 font-light leading-relaxed">
            Every material decision and trade specialist operates under one technical specification and one point of accountability.
          </p>
          <div className="mt-8">
            <Link href="/process" className="btn-ink bg-[#C5A880] text-[#1C1B18] hover:bg-[#F9F8F3]">
              Discover Our Process
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarBlock({
  pillar,
  index,
  onInView,
}: {
  pillar: (typeof pillars)[0];
  index: number;
  onInView: () => void;
}) {
  const blockRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(blockRef, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView, onInView]);

  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  const IconComponent = pillar.icon;

  return (
    <div
      id={pillar.id}
      ref={blockRef}
      className={clsx(
        "relative py-14 sm:py-24 lg:py-32 border-b transition-colors duration-700 overflow-hidden",
        pillar.bgColor,
        pillar.textColor
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center",
            pillar.reverseLayout && "lg:flex-row-reverse"
          )}
        >
          {/* Text & Icon Column */}
          <div
            className={clsx(
              "lg:col-span-7 flex flex-col sm:flex-row items-start gap-6 lg:gap-10",
              pillar.reverseLayout && "lg:order-2"
            )}
          >
            {/* Animated Geometric Vector Icon */}
            <div className={clsx("mt-1", pillar.accentColor)}>
              <IconComponent progress={scrollYProgress} />
            </div>

            {/* Pillar Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className={clsx("text-xs font-bold uppercase tracking-widest", pillar.accentColor)}>
                  {pillar.number}
                </span>
                <span className="opacity-30">|</span>
                <p className={clsx("eyebrow", pillar.accentColor)}>{pillar.eyebrow}</p>
              </div>

              <h3 className="display-2 mt-4 leading-[1.12]">{pillar.heading}</h3>

              <p className="mt-6 text-base leading-relaxed opacity-85 font-light max-w-xl">
                {pillar.description}
              </p>

              {/* Specs Pills */}
              <div className="mt-8 flex flex-wrap gap-2">
                {pillar.specs.map((spec) => (
                  <span
                    key={spec}
                    className="px-3 py-1 rounded-md text-[12px] font-sans font-medium uppercase tracking-wider bg-current/10 border border-current/15 opacity-80"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-10">
                <Link href={pillar.ctaHref} className={clsx("btn-ink", pillar.btnBg)}>
                  {pillar.ctaText}
                </Link>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div
            className={clsx(
              "lg:col-span-5 relative w-full",
              pillar.reverseLayout && "lg:order-1"
            )}
          >
            <motion.div
              style={{ y: translateY }}
              className="relative aspect-[4/3] lg:aspect-[16/13] w-full rounded-2xl overflow-hidden shadow-2xl border border-current/15 group"
            >
              <Image
                src={pillar.image}
                alt={pillar.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}


