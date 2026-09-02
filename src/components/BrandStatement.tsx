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

      const isMobile = window.innerWidth < 640;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=220%" : "+=400%", // Shorter scroll-jack on small screens
          scrub: 1,      // Smooth scrub
          pin: true,     // Pin the entire section
        },
      });

      // Initial Setup: every word sits in the exact same centered spot (no
      // vertical movement) and is stacked front-to-back with scale/blur.
      // Word 0 is in front: full size, sharp, on top.
      gsap.set(words[0], { y: "0%", scale: 1, opacity: 1, filter: "blur(0px)", zIndex: 2 });
      // The rest sit behind it: smaller and blurred, waiting their turn.
      gsap.set(words.slice(1), { y: "0%", scale: 0.82, opacity: 0, filter: "blur(10px)", zIndex: 1 });

      // Animate transitions
      words.forEach((word, i) => {
        if (i < words.length - 1) {
          const nextWord = words[i + 1];

          tl.add(`transition-${i}`);

          // Stacking order for this hand-off: outgoing word stays in front,
          // incoming word grows from behind it.
          tl.set(word, { zIndex: 2 }, `transition-${i}`);
          tl.set(nextWord, { zIndex: 1 }, `transition-${i}`);

          // Outgoing word fades and blurs away in place (front card removed)
          tl.to(
            word,
            {
              opacity: 0,
              filter: "blur(8px)",
              duration: 1,
              ease: "power3.inOut",
            },
            `transition-${i}`
          );

          // Incoming word grows from behind (smaller, blurred) to full focus
          tl.to(
            nextWord,
            {
              scale: 1,
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
        className="words-mask relative w-full flex items-center justify-center overflow-hidden px-4"
        style={{ 
          height: "1.4em", // Tight bounding box around the typography
          fontSize: "clamp(1.8rem, 10.5vw, 12rem)",
          fontFamily: 'var(--font-playfair), Georgia, "Times New Roman", serif',
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





