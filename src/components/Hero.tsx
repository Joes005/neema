"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionTemplate,
} from "framer-motion";

interface HeroProps {
  isLoaded?: boolean;
}

export default function Hero({ isLoaded: isLoadedProp }: HeroProps) {
  const [internalLoaded, setInternalLoaded] = useState(false);
  const [isEntranceComplete, setIsEntranceComplete] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInternalLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const isLoaded = isLoadedProp ?? internalLoaded;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsDesktop(!isTouch);
    }
  }, []);

  // Mouse Parallax
  const mouseX = useSpring(0, { stiffness: 35, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 35, damping: 20 });
  
  // Mouse Coordinates for Mask Reveal
  const maskX = useSpring(50, { stiffness: 50, damping: 20 });
  const maskY = useSpring(50, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (!isDesktop || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      
      // Parallax
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      mouseX.set(x * 8);
      mouseY.set(y * 8);
      
      // Mask coordinates (percentages)
      maskX.set((e.clientX / innerWidth) * 100);
      maskY.set((e.clientY / innerHeight) * 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop, shouldReduceMotion, mouseX, mouseY, maskX, maskY]);

  const textMouseX = useTransform(mouseX, (val) => val * 0.4);
  const textMouseY = useTransform(mouseY, (val) => val * 0.4);

  // Scroll Parallax & Camera Zoom-Through
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Phase 1 (0 to 0.4): Blur clears around mouse, page doesn't move/zoom.
  // Phase 2 (0.4 to 1.0): Camera zooms, text fades/moves.
  const cameraZoomScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [1.0, 1.0, 1.15, 1.32]
  );

  // Text exits upward as camera moves into space
  const textY = useTransform(scrollYProgress, [0, 0.4, 0.8], ["0%", "0%", "-40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 0.8], [1, 1, 0.8, 0]);
  const darkOverlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [0.25, 0.25, 0.45, 0.75]
  );

  // Center outward clear reveal based on scroll and mouse position
  // Starts with a 15% radius flashlight around cursor, grows to 150% to reveal fully
  const clearRadius = useTransform(scrollYProgress, [0, 0.4], [15, 150]);
  const sharpMaskImage = useMotionTemplate`radial-gradient(circle at ${maskX}% ${maskY}%, black ${clearRadius}%, transparent calc(${clearRadius}% + 15%))`;

  // Room Reveal Variants (Bottom -> Top mask)
  const revealVariants = {
    hidden: {
      clipPath: "inset(100% 0% 0% 0%)",
    },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: shouldReduceMotion ? 0.01 : 1.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Image Entrance Variants (No filter, as we now handle blur on scroll)
  const imageVariants = {
    hidden: {
      scale: 1.08,
    },
    visible: {
      scale: 1.0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 1.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    idle: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section id="hero" ref={containerRef} className="relative bg-[#1C1B18]">
      <div
        className="relative h-[200vh] w-full bg-[#1C1B18]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Layer 1: Camera Zoom Transformation Wrapper */}
          <motion.div
            style={{ scale: shouldReduceMotion ? 1 : cameraZoomScale }}
            className="relative h-full w-full origin-center"
          >
            {/* Layer 2: Room Reveal Mask (Bottom -> Top) */}
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={revealVariants}
              className="relative h-full w-full overflow-hidden"
            >
              {/* Layer 3: Mouse Parallax & Breathing Image */}
              <motion.div
                style={{
                  x: isDesktop && !shouldReduceMotion ? mouseX : 0,
                  y: isDesktop && !shouldReduceMotion ? mouseY : 0,
                }}
                initial="hidden"
                animate={
                  shouldReduceMotion
                    ? "visible"
                    : !isLoaded
                    ? "hidden"
                    : isEntranceComplete
                    ? "idle"
                    : "visible"
                }
                variants={imageVariants}
                onAnimationComplete={() => {
                  if (isLoaded) setIsEntranceComplete(true);
                }}
                className="relative h-full w-full bg-[#141312]"
              >
                {/* Blurred Base Image */}
                <Image
                  src="/images/hero-living.jpg"
                  alt="Living room of a personalised residence designed by NEEMA HOMES (blurred)"
                  fill
                  priority
                  sizes="100vw"
                  className="h-full w-full object-cover blur-[12px] brightness-75 scale-[1.03]"
                />

                {/* Sharp Image Layer revealing from center on scroll */}
                <motion.div
                  style={{
                    maskImage: sharpMaskImage,
                    WebkitMaskImage: sharpMaskImage,
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src="/images/hero-living.jpg"
                    alt="Living room clear"
                    fill
                    priority
                    sizes="100vw"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Dynamic Dark Overlay for smooth Hero -> About transition */}
          <motion.div
            style={{ opacity: darkOverlayOpacity }}
            className="absolute inset-0 bg-black pointer-events-none z-10"
          />

          {/* Content Overlay with Scroll Displace */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="absolute inset-0 z-20 flex items-end"
          >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pb-10 sm:pb-16 lg:px-10 lg:pb-24">
              <motion.div
                style={{
                  x: isDesktop && !shouldReduceMotion ? textMouseX : 0,
                  y: isDesktop && !shouldReduceMotion ? textMouseY : 0,
                  textShadow: "0 2px 25px rgba(0,0,0,0.5)",
                }}
                className="max-w-3xl"
              >
                {/* Eyebrow Reveal */}
                <div className="overflow-hidden">
                  <motion.p
                    initial={{ y: "110%", opacity: 0 }}
                    animate={
                      isLoaded || shouldReduceMotion
                        ? { y: "0%", opacity: 1 }
                        : { y: "110%", opacity: 0 }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0.01 : 1.2,
                      delay: shouldReduceMotion ? 0 : 0.3,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                    className="eyebrow text-[#C5A880]"
                  >
                    Chennai · Residential Interiors
                  </motion.p>
                </div>

                {/* Main Heading Reveal */}
                <h1 className="display-1 mt-6 text-[#F9F8F3]">
                  <span className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: "110%", opacity: 0 }}
                      animate={
                        isLoaded || shouldReduceMotion
                          ? { y: "0%", opacity: 1 }
                          : { y: "110%", opacity: 0 }
                      }
                      transition={{
                        duration: shouldReduceMotion ? 0.01 : 1.3,
                        delay: shouldReduceMotion ? 0 : 0.45,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                    >
                      A signature residence, created with
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: "110%", opacity: 0 }}
                      animate={
                        isLoaded || shouldReduceMotion
                          ? { y: "0%", opacity: 1 }
                          : { y: "110%", opacity: 0 }
                      }
                      transition={{
                        duration: shouldReduceMotion ? 0.01 : 1.3,
                        delay: shouldReduceMotion ? 0 : 0.58,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                    >
                      clarity and delivered with conviction.
                    </motion.span>
                  </span>
                </h1>

                {/* Supporting Text Reveal */}
                <div className="overflow-hidden mt-6">
                  <motion.p
                    initial={{ y: "110%", opacity: 0 }}
                    animate={
                      isLoaded || shouldReduceMotion
                        ? { y: "0%", opacity: 1 }
                        : { y: "110%", opacity: 0 }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0.01 : 1.2,
                      delay: shouldReduceMotion ? 0 : 0.72,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                    className="max-w-xl font-serif text-xl italic text-[#C5A880]"
                  >
                    Curating Signature Spaces
                  </motion.p>
                </div>

                {/* CTA Button Reveal */}
                <div className="overflow-hidden mt-10">
                  <motion.div
                    initial={{ y: "110%", opacity: 0 }}
                    animate={
                      isLoaded || shouldReduceMotion
                        ? { y: "0%", opacity: 1 }
                        : { y: "110%", opacity: 0 }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0.01 : 1.2,
                      delay: shouldReduceMotion ? 0 : 0.85,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                    className="flex flex-wrap gap-4"
                  >
                    <Link
                      href="/contact"
                      className="btn-ink bg-[#C5A880] text-[#1C1B18] hover:bg-[#F9F8F3]"
                    >
                      Start a project
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Micro UI: Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={
                isLoaded || shouldReduceMotion
                  ? { opacity: 0.6, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{
                duration: shouldReduceMotion ? 0.01 : 1,
                delay: shouldReduceMotion ? 0 : 1.1,
              }}
              className="absolute bottom-8 right-8 hidden lg:flex items-center gap-3 text-[#F9F8F3]/70 text-[11px] font-sans uppercase tracking-[0.2em]"
            >
              <span>Scroll to enter space</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-[1px] h-6 bg-[#C5A880]/80"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
