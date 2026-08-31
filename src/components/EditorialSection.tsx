"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function EditorialSection() {
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
          src="/images/materials-preview.jpg"
          alt="Teak veneer, stone tile, brass strip and linen samples on a drawing"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(33, 31, 27, 0.62)" }}></div>
      <div className="relative mx-auto flex min-h-[80vh] max-w-7xl items-center px-6 py-24 text-[#F9F8F3] lg:px-10">
        <div className="max-w-xl">
          <p className="eyebrow text-[#C5A880]">Materials &amp; specialists</p>
          <h2 className="display-2 mt-5 text-[#F9F8F3]">Selected once, checked repeatedly.</h2>
          <p className="mt-6 text-base leading-relaxed text-[#F9F8F3]/80">
            Finishes, hardware and joinery are chosen against how they will age in a Chennai home: heat, humidity and daily use included. Every specialist on site works to the same specification you approved.
          </p>
          <div className="mt-10">
            <Link href="/process" className="btn-ink bg-[#C5A880] text-[#1C1B18] hover:bg-[#F9F8F3]">
              See the process
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


