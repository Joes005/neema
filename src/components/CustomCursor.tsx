"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch || shouldReduceMotion) return;
    setIsDesktop(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Check for elements with data-cursor attribute
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;

      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible, shouldReduceMotion]);

  if (!isDesktop || shouldReduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full text-[#1C1B18] backdrop-blur-[2px] transition-colors duration-300"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        width: isHovered ? (cursorText ? 84 : 48) : 14,
        height: isHovered ? (cursorText ? 84 : 48) : 14,
        backgroundColor: isHovered
          ? "rgba(197, 168, 128, 0.92)"
          : "rgba(249, 248, 243, 0.95)",
        boxShadow: isHovered
          ? "0 0 30px rgba(197, 168, 128, 0.4)"
          : "0 0 10px rgba(0, 0, 0, 0.2)",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 28,
      }}
    >
      {isHovered && cursorText && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-[#1C1B18] select-none"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
}
