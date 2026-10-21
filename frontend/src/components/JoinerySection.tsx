"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function JoinerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], ["-13%", "13%"]);

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      <motion.div style={{ translateY }} className="pointer-events-none absolute inset-x-0 -top-[15%] h-[130%] w-full">
        <Image
          src="/images/project-kitchen.jpg"
          alt="Bespoke kitchen with matte dark cabinetry and stone counter"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(33, 31, 27, 0.58)" }}></div>
      <div className="relative mx-auto flex min-h-[56vh] sm:min-h-[70vh] lg:min-h-[80vh] max-w-7xl items-center px-4 sm:px-6 py-16 sm:py-24 text-[#F9F8F3] lg:px-10">
        <div className="ml-auto max-w-xl text-right">
          <p className="eyebrow text-[#C5A880]">Joinery</p>
          <h2 className="display-2 mt-5 text-[#F9F8F3]">Made to the room, not the catalogue.</h2>
          <p className="mt-6 text-base leading-relaxed text-[#F9F8F3]/80">
            Wardrobes, kitchens and feature units are drawn to the proportions of the space and built by the same hands that specified them.
          </p>
        </div>
      </div>
    </section>
  );
}

