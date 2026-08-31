"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const lettersData = [
  { char: "C", sizeClasses: "text-[4rem] md:text-[7rem] lg:text-[10rem]", color: "text-[#8C8C8C]", yOffset: "6rem" },
  { char: "H", sizeClasses: "text-[5rem] md:text-[9rem] lg:text-[12rem]", color: "text-[#555555]", yOffset: "2rem" },
  { char: "E", sizeClasses: "text-[6rem] md:text-[11rem] lg:text-[15rem]", color: "text-[#222222]", yOffset: "-1rem" },
  { char: "N", sizeClasses: "text-[7rem] md:text-[13rem] lg:text-[17rem]", color: "text-[#111111]", yOffset: "-4rem" },
  { char: "N", sizeClasses: "text-[6.5rem] md:text-[12rem] lg:text-[16rem]", color: "text-[#1C1B18]", yOffset: "-2rem" },
  { char: "A", sizeClasses: "text-[5.5rem] md:text-[10rem] lg:text-[13rem]", color: "text-[#555555]", yOffset: "1.5rem" },
  { char: "I", sizeClasses: "text-[4.5rem] md:text-[8rem] lg:text-[11rem]", color: "text-[#8C8C8C]", yOffset: "6rem" },
];

export default function ChennaiArch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Set the initial "arched" positions
      letterRefs.current.forEach((el, idx) => {
        if (el) {
          gsap.set(el, { y: lettersData[idx].yOffset });
        }
      });

      // 2. Animate them down to a straight baseline as you scroll
      gsap.to(letterRefs.current, {
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Start animating when the top of the container is 80% down the viewport
          end: "center center", // Finish when the container is vertically centered
          scrub: 1, // Smooth scrub
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full flex justify-center items-end h-[250px] md:h-[400px] lg:h-[500px] pb-12 overflow-visible pointer-events-none select-none"
    >
      {/* items-baseline ensures that when y=0, all letters rest on exactly the same bottom line */}
      <div className="flex items-baseline space-x-2 md:space-x-4 lg:space-x-6">
        {lettersData.map((l, idx) => (
          <span
            key={idx}
            ref={(el) => {
              if (el) letterRefs.current[idx] = el;
            }}
            className={`font-sans font-light tracking-tighter leading-none inline-block ${l.sizeClasses} ${l.color}`}
            style={{ willChange: "transform" }}
          >
            {l.char}
          </span>
        ))}
      </div>
    </div>
  );
}
