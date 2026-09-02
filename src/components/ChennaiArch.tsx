"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Symmetrical 7-letter Gopuram (Temple Tower) Pyramid Silhouette
// Letters start in a curved Gopuram arch (C, I lower down, N, N at apex)
// As user scrolls, all letters smoothly transform and align into a straight line.
const gopuramLetters = [
  { char: "C", initialY: 65,  initialX: -18, rotate: -10, scale: 0.90 },
  { char: "H", initialY: 20,  initialX: -10, rotate: -5,  scale: 0.95 },
  { char: "E", initialY: -35, initialX: -4,  rotate: -2,  scale: 0.98 },
  { char: "N", initialY: -95, initialX: 0,   rotate: 0,   scale: 1.05 },
  { char: "N", initialY: -95, initialX: 0,   rotate: 0,   scale: 1.05 },
  { char: "A", initialY: -35, initialX: 4,   rotate: 2,   scale: 0.98 },
  { char: "I", initialY: 65,  initialX: 18,  rotate: 10,  scale: 0.90 },
];

export default function ChennaiArch() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Set initial curved Gopuram positions (fully visible, unclipped)
      letterRefs.current.forEach((el, idx) => {
        if (!el) return;
        const config = gopuramLetters[idx];
        gsap.set(el, {
          y: config.initialY,
          x: config.initialX,
          rotate: config.rotate,
          scale: config.scale,
          transformOrigin: "center center",
        });
      });

      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });
      }

      if (badgeRef.current) {
        gsap.set(badgeRef.current, { opacity: 0, y: 15 });
      }

      // 2. Create ScrollTrigger timeline to scrub from Gopuram curve -> Straight horizontal line
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%", // Starts animating as soon as section enters viewport
          end: "top 25%",   // Completes alignment when centered in view
          scrub: 0.6,       // Smooth scrubbing
        },
      });

      // Animate letters to zero Y offset, zero rotation, scale 1 (perfect straight line)
      tl.to(
        letterRefs.current,
        {
          y: 0,
          x: 0,
          rotate: 0,
          scale: 1,
          stagger: {
            each: 0.015,
            from: "center",
          },
          ease: "power2.out",
        },
        0
      );

      // Expand glowing gold baseline indicator line
      if (lineRef.current) {
        tl.to(
          lineRef.current,
          {
            scaleX: 1,
            opacity: 0.5,
            ease: "power2.out",
          },
          0.2
        );
      }

      // Fade in bottom badge label
      if (badgeRef.current) {
        tl.to(
          badgeRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
          },
          0.3
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 overflow-visible select-none"
    >
      {/* Main Letter Container (overflow-visible ensuring C and I are never clipped) */}
      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-6xl mx-auto flex justify-center items-center h-[240px] md:h-[300px] lg:h-[360px] overflow-visible"
      >
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-8 lg:space-x-12 overflow-visible">
          {gopuramLetters.map((l, idx) => (
            <span
              key={idx}
              ref={(el) => {
                letterRefs.current[idx] = el;
              }}
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] tracking-tight font-extralight text-[#1C1B18] inline-block leading-none transition-colors duration-300 hover:text-[#C5A880]"
              style={{ willChange: "transform, opacity" }}
            >
              {l.char}
            </span>
          ))}
        </div>
      </div>

      {/* Baseline Indicator Line & Badge */}
      <div className="relative w-full max-w-3xl mx-auto mt-6 px-6">
        <div
          ref={lineRef}
          className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent origin-center"
        />
        <div 
          ref={badgeRef}
          className="flex justify-center items-center mt-4"
        >
          <span className="px-4 py-1.5 rounded-full bg-[#1C1B18]/5 border border-[#1C1B18]/10 text-[10px] tracking-[0.25em] uppercase text-[#1C1B18]/70 font-mono">
            CHENNAI • ARCHITECTURAL RESIDENCES
          </span>
        </div>
      </div>
    </section>
  );
}
