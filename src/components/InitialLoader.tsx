"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import NeemaLogoMark from "./NeemaLogoMark";

interface InitialLoaderProps {
  onComplete?: () => void;
}

export default function InitialLoader({ onComplete }: InitialLoaderProps) {
  const [stage, setStage] = useState<"markOnly" | "animating" | "complete">("markOnly");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Animation Sequence Timeline:
    // 0ms - 850ms: 4K Official Metallic Gold Icon Mark appears centered
    // 850ms: Mark glides left while NEEMA HOMES metallic gold text unveils
    // 2800ms: Smooth overlay fade-out to reveal Hero section
    const shiftTimer = setTimeout(() => {
      setStage("animating");
    }, 850);

    const completeTimer = setTimeout(() => {
      setStage("complete");
      setIsLoading(false);
      document.body.style.overflow = "";
      onComplete?.();
    }, 2850);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(shiftTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="neema-4k-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.75, ease: [0.65, 0, 0.35, 1] },
          }}
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F9F8F3] text-[#1C1B18] select-none overflow-hidden"
        >
          {/* Ambient Gold Radial Glow */}
          <div className="absolute inset-0 bg-radial-gradient from-[#C5A880]/20 via-transparent to-transparent pointer-events-none opacity-90" />

          <div className="relative flex items-center justify-center font-sans px-6">
            <motion.div
              className="flex items-center justify-center gap-4 sm:gap-6"
              initial={false}
            >
              {/* 1. 4K Official Metallic Gold Fingerprint & Arch Icon Mark */}
              <motion.div
                initial={{ opacity: 0, scale: 0.84, y: 10 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex-shrink-0"
              >
                <NeemaLogoMark
                  size={stage === "markOnly" ? 108 : 92}
                  className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </motion.div>

              {/* 2. 4K Official Metallic Gold Typography Unveil */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: stage === "markOnly" ? 0 : "auto",
                  opacity: stage === "markOnly" ? 0 : 1,
                }}
                transition={{
                  duration: 0.95,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden flex flex-col justify-center text-left whitespace-nowrap"
              >
                <div className="pl-1 sm:pl-3 flex flex-col leading-[1.05]">
                  {/* Line 1: NEEMA */}
                  <motion.span
                    initial={{ x: -25, opacity: 0 }}
                    animate={{
                      x: stage === "markOnly" ? -25 : 0,
                      opacity: stage === "markOnly" ? 0 : 1,
                    }}
                    transition={{
                      duration: 0.75,
                      delay: 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-sans text-[1.65rem] sm:text-[2.25rem] font-normal tracking-[0.26em] uppercase text-[#B8975A] drop-shadow-sm"
                  >
                    NEEMA
                  </motion.span>

                  {/* Line 2: HOMES */}
                  <motion.span
                    initial={{ x: -25, opacity: 0 }}
                    animate={{
                      x: stage === "markOnly" ? -25 : 0,
                      opacity: stage === "markOnly" ? 0 : 1,
                    }}
                    transition={{
                      duration: 0.75,
                      delay: 0.24,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-sans text-[1.65rem] sm:text-[2.25rem] font-normal tracking-[0.26em] uppercase text-[#C5A880] drop-shadow-sm"
                  >
                    HOMES
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
