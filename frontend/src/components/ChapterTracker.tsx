"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const chapters = [
  { id: "hero", number: "01", title: "ENTER THE SPACE" },
  { id: "brand", number: "02", title: "THE IDEA" },
  { id: "studio", number: "03", title: "THE STUDIO" },
  { id: "blueprint", number: "04", title: "BLUEPRINT" },
  { id: "services", number: "05", title: "SPATIAL CHAPTERS" },
  { id: "projects", number: "06", title: "SELECTED WORK" },
  { id: "materials", number: "07", title: "SENSORY MATERIALS" },
  { id: "cta", number: "08", title: "CREATE RESIDENCE" },
];

export default function ChapterTracker() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 250);

      const viewportCenter = scrollY + window.innerHeight * 0.45;

      let foundIndex = 0;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + scrollY;
          if (viewportCenter >= top) {
            foundIndex = i;
            break;
          }
        }
      }

      setActiveChapter(foundIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const current = chapters[activeChapter] || chapters[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="fixed left-6 bottom-8 z-40 hidden md:flex items-center gap-4 pointer-events-none select-none"
    >
      <div className="flex items-center gap-2 bg-[#1C1B18]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#F9F8F3]/15 shadow-xl text-[#F9F8F3]">
        <span className="font-sans text-[11px] font-bold tracking-[0.16em] text-[#C5A880]">
          {current.number} / 08
        </span>
        <span className="h-3 w-px bg-[#F9F8F3]/20" />
        <AnimatePresence mode="wait">
          <motion.span
            key={current.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F9F8F3]/90"
          >
            {current.title}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

