"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 1200);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
          }}
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F9F8F3] text-[#1C1B18] select-none"
        >
          <div className="relative flex items-center justify-center font-light scale-[0.55] sm:scale-75 md:scale-90 lg:scale-100 font-sans">
            <div className="relative">
              {/* Animated dot */}
              <div className="absolute z-10 top-[40px] left-[85px] w-[6px] h-[6px] bg-[#1C1B18] rounded-full animate-dot-move" />

              {/* Animated Loading Text */}
              <p className="relative m-0 whitespace-nowrap text-[3.75rem] text-[#1C1B18]" aria-label="Loading">
                <span className="inline-block relative tracking-[8px] transform origin-[100%_70%] animate-l-bounce">L</span>
                <span className="inline-block relative tracking-[8px]">o</span>
                <span className="inline-block relative tracking-[8px]">a</span>
                <span className="inline-block relative tracking-[8px]">d</span>
                <span className="inline-block relative tracking-[8px] transform origin-[100%_70%] animate-letter-stretch">ı</span>
                <span className="inline-block relative tracking-[8px]">n</span>
                <span className="inline-block relative tracking-[8px]">g</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

