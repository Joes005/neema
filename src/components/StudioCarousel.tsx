"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";

const images = [
  "/images/hero-living.jpg",
  "/images/project-bedroom.jpg",
  "/images/project-kitchen.jpg",
  "/images/project-dining.jpg",
  "/images/project-bath.jpg",
];

export default function StudioCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getRelativeIndex = (index: number) => {
    let diff = index - currentIndex;
    if (diff < 0) {
      diff += images.length;
    }
    return diff;
  };

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[560px] flex items-center justify-center">
      {/* Container for the stacked cards to allow overflow and positioning */}
      <div className="relative w-[70%] md:w-[75%] h-full flex items-center">
        {images.map((src, index) => {
          const relativeIndex = getRelativeIndex(index);
          const isVisible = relativeIndex <= 3;

          return (
            <AnimatePresence key={src}>
              {isVisible && (
                <motion.div
                  initial={false}
                  animate={{
                    scale: 1 - relativeIndex * 0.08,
                    x: `${relativeIndex * 22}%`,
                    zIndex: 40 - relativeIndex,
                    opacity: 1, // Keep opacity high for the visible stack
                    filter: `brightness(${1 - relativeIndex * 0.25})`,
                  }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  className={clsx(
                    "absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl origin-left bg-gray-200",
                    relativeIndex === 0 && "shadow-black/20",
                  )}
                  style={{
                    boxShadow: relativeIndex > 0 ? "-10px 0 20px rgba(0,0,0,0.15)" : undefined,
                  }}
                >
                  <Image
                    src={src}
                    alt={`Studio slide ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  {relativeIndex > 0 && (
                    <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-[-10px] sm:left-0 lg:-left-6 xl:left-0 top-1/2 -translate-y-1/2 z-50 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors shadow-lg"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} className="lg:w-6 lg:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-[-20px] sm:-right-10 lg:-right-20 xl:-right-28 top-1/2 -translate-y-1/2 z-50 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-[#1C1B18] text-white hover:bg-black transition-colors shadow-xl"
        aria-label="Next image"
      >
        <ChevronRight size={20} className="lg:w-6 lg:h-6" />
      </button>

      {/* Pagination Pills */}
      <div className="absolute -bottom-10 lg:-bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/20 backdrop-blur-md rounded-full px-3 py-2 z-50">
        {images.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="group py-1 px-[2px]"
              aria-label={`Go to slide ${index + 1}`}
            >
              <motion.div
                initial={false}
                animate={{
                  width: isActive ? 16 : 6,
                  backgroundColor: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                }}
                transition={{ duration: 0.3 }}
                className="h-[6px] rounded-full group-hover:bg-white/80 transition-colors"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
