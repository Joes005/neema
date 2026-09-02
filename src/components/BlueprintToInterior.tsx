"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function BlueprintToInterior() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Blueprint SVG Line drawing: 0% -> 50%
  const pathLength = useTransform(smoothProgress, [0.05, 0.45], [0, 1]);
  const blueprintOpacity = useTransform(smoothProgress, [0, 0.1, 0.65, 0.85], [0, 1, 1, 0.1]);

  // Image reveal morph: 40% -> 90%
  const imageScale = useTransform(smoothProgress, [0.4, 0.85], [1.12, 1.0]);
  const imageOpacity = useTransform(smoothProgress, [0.4, 0.75], [0, 1]);
  const imageClip = useTransform(
    smoothProgress,
    [0.45, 0.85],
    ["inset(45% 45% 45% 45% round 24px)", "inset(0% 0% 0% 0% round 0px)"]
  );

  // Text stage transformations
  const stage1Opacity = useTransform(smoothProgress, [0.05, 0.2, 0.4], [0, 1, 0]);
  const stage2Opacity = useTransform(smoothProgress, [0.4, 0.55, 0.75], [0, 1, 0]);
  const stage3Opacity = useTransform(smoothProgress, [0.75, 0.88, 1], [0, 1, 1]);

  const stage1Y = useTransform(smoothProgress, [0.05, 0.2, 0.4], ["30px", "0px", "-30px"]);
  const stage2Y = useTransform(smoothProgress, [0.4, 0.55, 0.75], ["30px", "0px", "-30px"]);
  const stage3Y = useTransform(smoothProgress, [0.75, 0.88, 1], ["30px", "0px", "0px"]);

  return (
    <section
      id="blueprint"
      ref={containerRef}
      className="relative h-[300vh] w-full bg-[#141312] text-[#F7F5F0]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Layer 1: Dark Grid Pattern Background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(#C5A880 1px, transparent 1px), linear-gradient(to right, rgba(197, 168, 128, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(197, 168, 128, 0.05) 1px, transparent 1px)`,
            backgroundSize: "40px 40px, 80px 80px, 80px 80px",
          }}
        />

        {/* Layer 2: Architectural Blueprint SVG Line Drawing */}
        <motion.div
          style={{ opacity: blueprintOpacity }}
          className="absolute inset-0 flex items-center justify-center p-6 lg:p-16 pointer-events-none"
        >
          <svg
            viewBox="0 0 1000 600"
            fill="none"
            className="w-full h-full max-w-6xl max-h-[80vh] stroke-[#C5A880]"
          >
            {/* Outer Wall Boundary */}
            <motion.rect
              x="50"
              y="50"
              width="900"
              height="500"
              strokeWidth="2.5"
              style={{ pathLength }}
            />
            {/* Inner Room Partition Walls */}
            <motion.path
              d="M 350 50 L 350 550 M 350 320 L 950 320 M 650 50 L 650 320"
              strokeWidth="2"
              style={{ pathLength }}
            />
            {/* Door Swing Curves */}
            <motion.path
              d="M 350 180 A 60 60 0 0 1 410 240 M 650 180 A 50 50 0 0 1 700 230"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              style={{ pathLength }}
            />
            {/* Dimension Lines & Measurements */}
            <motion.path
              d="M 50 30 L 350 30 M 350 30 L 950 30 M 30 50 L 30 550"
              strokeWidth="1"
              style={{ pathLength }}
            />
            <motion.g style={{ opacity: pathLength }} className="text-[10px] font-sans fill-[#C5A880]">
              <text x="180" y="22">LIVING AREA · 8.4m</text>
              <text x="620" y="22">FOYER & DINING · 9.2m</text>
              <text x="965" y="300" transform="rotate(90 965 300)">TOTAL DEPTH · 14.5m</text>
            </motion.g>

            {/* Furniture & Joinery Outlines */}
            <motion.rect x="100" y="100" width="180" height="90" strokeWidth="1" strokeDasharray="3 3" style={{ pathLength }} />
            <motion.rect x="420" y="380" width="300" height="120" strokeWidth="1" style={{ pathLength }} />
            <motion.circle cx="780" cy="180" r="50" strokeWidth="1" style={{ pathLength }} />
          </svg>
        </motion.div>

        {/* Layer 3: High-Res Real Interior Image Reveal (Drawing -> Reality Morph) */}
        <motion.div
          style={{
            opacity: imageOpacity,
            clipPath: imageClip,
            scale: imageScale,
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/images/hero-living.jpg"
            alt="Completed luxury residence living room designed by NEEMA HOMES"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-transparent to-black/30" />
        </motion.div>

        {/* Layer 4: Contextual Text Overlays per Scroll Stage */}
        <div className="relative z-20 mx-auto max-w-4xl px-4 sm:px-6 text-center">
          {/* Stage 1: Architectural Line Drawing */}
          <motion.div
            style={{ opacity: stage1Opacity, y: stage1Y }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2"
          >
            <p className="eyebrow text-[#C5A880]">03 · The Blueprint</p>
            <h2 className="display-1 mt-4 text-[#F7F5F0]">From concept line to spatial form.</h2>
            <p className="lede mt-6 text-[#C5A880]/90 max-w-xl mx-auto">
              Every residence begins with precise proportions drawn to how you live, not standard templates.
            </p>
          </motion.div>

          {/* Stage 2: Material & Depth Assembly */}
          <motion.div
            style={{ opacity: stage2Opacity, y: stage2Y }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2"
          >
            <p className="eyebrow text-[#C5A880]">03 · Structural Materialization</p>
            <h2 className="display-1 mt-4 text-[#F7F5F0]">Materials, light, and joinery.</h2>
            <p className="lede mt-6 text-[#F7F5F0]/80 max-w-xl mx-auto">
              As architectural lines take shape, marble, teak, brass, and ambient lighting integrate seamlessly.
            </p>
          </motion.div>

          {/* Stage 3: Completed Reality */}
          <motion.div
            style={{ opacity: stage3Opacity, y: stage3Y }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2"
          >
            <p className="eyebrow text-[#C5A880]">03 · The Delivered Residence</p>
            <h2 className="display-1 mt-4 text-[#F7F5F0]">Drawing becomes living reality.</h2>
            <p className="lede mt-6 text-[#F7F5F0]/90 max-w-xl mx-auto">
              Single-point accountability from paper to hand-key delivery in Chennai.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
