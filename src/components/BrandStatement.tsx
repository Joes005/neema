"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const wordList = ["Clarity.", "Conviction.", "Craft.", "Character."];

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !maskRef.current || wordsRef.current.length === 0) return;

      const words = wordsRef.current.filter(Boolean);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%", // 4x viewport height
          scrub: 1,      // Smooth scrub
          pin: true,     // Pin the entire section
        },
      });

      // Initial Setup:
      // Word 0 is visible and sharp
      gsap.set(words[0], { y: "0%", opacity: 1, filter: "blur(0px)" });
      // Other words are placed 100% down (just below the mask boundary), invisible and blurred
      gsap.set(words.slice(1), { y: "100%", opacity: 0, filter: "blur(8px)" });

      // Animate transitions
      words.forEach((word, i) => {
        if (i < words.length - 1) {
          const nextWord = words[i + 1];
          
          tl.add(`transition-${i}`);
          
          // Outgoing word moves slightly up (-100% of the mask height), blurs and fades
          tl.to(
            word,
            {
              y: "-100%",
              opacity: 0,
              filter: "blur(8px)",
              duration: 1,
              ease: "power3.inOut",
            },
            `transition-${i}`
          );

          // Incoming word moves from below (100%) to center (0%), becomes sharp and solid
          tl.to(
            nextWord,
            {
              y: "0%",
              opacity: 1,
              filter: "blur(0px)",
              duration: 1,
              ease: "power3.inOut",
            },
            `transition-${i}`
          );
          
          // Brief pause holding the word in focus
          tl.to({}, { duration: 0.5 });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="brand"
      ref={sectionRef}
      className="scroll-words relative bg-[#F9F8F3] text-[#1C1B18] h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <span className="sr-only">{wordList.join(" ")}</span>

      {/* The words mask: fixed height, overflow hidden to clip the text */}
      <div 
        ref={maskRef}
        className="words-mask relative w-full flex items-center justify-center overflow-hidden"
        style={{ 
          height: "1.4em", // Tight bounding box around the typography
          fontSize: "clamp(4rem, 12vw, 12rem)",
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontWeight: 700,
          lineHeight: 1
        }}
      >
        <div className="word-track absolute inset-0 w-full h-full">
          {wordList.map((word, index) => (
            <div
              key={word}
              ref={(el) => {
                if (el) wordsRef.current[index] = el;
              }}
              aria-hidden="true"
              className="word absolute inset-0 w-full h-full flex items-center justify-center text-center text-[#1C1B18] select-none pointer-events-none"
              style={{
                willChange: "transform, opacity, filter",
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





