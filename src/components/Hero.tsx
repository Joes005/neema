"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section ref={containerRef} className="relative">
      <div className="relative h-screen w-full overflow-hidden bg-[#1C1B18]">
        <motion.div
          style={{ scale: imageScale, y: imageY }}
          className="relative h-full w-full"
        >
          <Image
            src="/images/hero-living.jpg"
            alt="Living room of a personalised residence designed by NEEMA HOMES"
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end bg-black/25">
          <div className="mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10 lg:pb-24">
            <div
              className="max-w-3xl"
              style={{ textShadow: "0 1px 20px rgba(0,0,0,0.32)" }}
            >
              <p className="eyebrow text-[#C5A880]">
                Chennai · Residential Interiors
              </p>
              <h1 className="display-1 mt-6 text-[#F9F8F3]">
                A signature residence, created with clarity and delivered with conviction.
              </h1>
              <p className="mt-6 max-w-xl font-serif text-xl italic text-[#C5A880]">
                Curating Signature Spaces
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="btn-ink bg-[#C5A880] text-[#1C1B18] hover:bg-[#F9F8F3]"
                >
                  Start a project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


