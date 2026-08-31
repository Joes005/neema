"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const wordList = ["Clarity.", "Conviction.", "Craft.", "Character."];

export default function BrandStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Word 0: Clarity. (0.0 -> 0.25)
  const opacity0 = useTransform(scrollYProgress, [0, 0.18, 0.25], [1, 1, 0]);
  const blur0 = useTransform(scrollYProgress, [0, 0.18, 0.25], [0, 0, 16]);
  const scale0 = useTransform(scrollYProgress, [0, 0.18, 0.25], [1, 1, 0.94]);

  // Word 1: Conviction. (0.25 -> 0.50)
  const opacity1 = useTransform(scrollYProgress, [0.18, 0.25, 0.43, 0.50], [0, 1, 1, 0]);
  const blur1 = useTransform(scrollYProgress, [0.18, 0.25, 0.43, 0.50], [16, 0, 0, 16]);
  const scale1 = useTransform(scrollYProgress, [0.18, 0.25, 0.43, 0.50], [0.94, 1, 1, 0.94]);

  // Word 2: Craft. (0.50 -> 0.75)
  const opacity2 = useTransform(scrollYProgress, [0.43, 0.50, 0.68, 0.75], [0, 1, 1, 0]);
  const blur2 = useTransform(scrollYProgress, [0.43, 0.50, 0.68, 0.75], [16, 0, 0, 16]);
  const scale2 = useTransform(scrollYProgress, [0.43, 0.50, 0.68, 0.75], [0.94, 1, 1, 0.94]);

  // Word 3: Character. (0.75 -> 1.00)
  const opacity3 = useTransform(scrollYProgress, [0.68, 0.75, 1.0], [0, 1, 1]);
  const blur3 = useTransform(scrollYProgress, [0.68, 0.75, 1.0], [16, 0, 0]);
  const scale3 = useTransform(scrollYProgress, [0.68, 0.75, 1.0], [0.94, 1, 1]);

  const wordStates = [
    { opacity: opacity0, blur: blur0, scale: scale0 },
    { opacity: opacity1, blur: blur1, scale: scale1 },
    { opacity: opacity2, blur: blur2, scale: scale2 },
    { opacity: opacity3, blur: blur3, scale: scale3 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative bg-[#F9F8F3] text-[#1C1B18]"
      style={{ height: "280vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <span className="sr-only">
          Clarity., Conviction., Craft., Character.
        </span>

        {wordList.map((word, index) => {
          const { opacity, blur, scale } = wordStates[index];
          const filter = useTransform(blur, (b) => `blur(${b}px)`);

          return (
            <motion.span
              key={word}
              aria-hidden="true"
              style={{
                opacity,
                scale,
                filter,
                fontSize: "clamp(3rem, 10vw, 7rem)",
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700,
              }}
              className="absolute inset-0 flex items-center justify-center px-6 text-center leading-none text-[#1C1B18] select-none pointer-events-none"
            >
              {word}
            </motion.span>
          );
        })}
      </div>
    </section>
  );
}





