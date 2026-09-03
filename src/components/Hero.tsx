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
    if (typeof window === "undefined") return;

    // Require both a fine pointer AND a wide (desktop-layout) viewport.
    // Pointer-type detection alone isn't reliable across every device-preview
    // tool, and a mouse-following flashlight makes no sense on a narrow
    // mobile layout regardless — it just freezes at a random cursor spot
    // and bleeds through the translucent glass door as a stray dot.
    const updateIsDesktop = () => {
      const isFinePointer = window.matchMedia("(pointer: fine)").matches;
      const isWideViewport = window.innerWidth >= 1024;
      setIsDesktop(isFinePointer && isWideViewport);
    };

    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);

  // Mouse Parallax
  const mouseX = useSpring(0, { stiffness: 35, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 35, damping: 20 });

  useEffect(() => {
    if (!isDesktop || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      mouseX.set(x * 8);
      mouseY.set(y * 8);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop, shouldReduceMotion, mouseX, mouseY]);

  const textMouseX = useTransform(mouseX, (val) => val * 0.4);
  const textMouseY = useTransform(mouseY, (val) => val * 0.4);

  // Scroll Parallax & Camera Zoom-Through
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ── Scroll Choreography ──────────────────────────────────────────────
  // The very first frame (scroll = 0) is a shut glass door over a blurred
  // room. Scrolling swings the door open, clears the blur, and brings the
  // copy in from above. Further scrolling then zooms/dims into the handoff
  // to the next (off-white) section.
  const DOOR_OPEN_END = 0.22; // door is fully open and blur is clear by here

  // Doors stay shut for a hair so the opening reads as a response to
  // scrolling rather than firing on the very first pixel, then swing open.
  const doorKeyframes = [0, 0.02, DOOR_OPEN_END];
  const leftDoorRotateY = useTransform(scrollYProgress, doorKeyframes, [0, 0, 100]);
  const rightDoorRotateY = useTransform(scrollYProgress, doorKeyframes, [0, 0, -100]);


  // Camera holds steady through the reveal, then zooms as we move toward the next section
  const cameraZoomScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [1.0, 1.0, 1.15, 1.32]
  );

  // Warm light bridging the cut into the next (off-white) section — a soft
  // radial glow that grows to flood the screen rather than fading in.
  const doorGlowScale = useTransform(scrollYProgress, [0.7, 0.78, 0.92, 1], [0.001, 0.001, 1, 2.2]);

  // Scroll indicator slides away the moment the visitor actually starts scrolling
  const indicatorScrollY = useTransform(scrollYProgress, [0, 0.06], ["0%", "150%"]);

  // Copy starts arriving the instant the door finishes opening (no extra
  // delay), slides down from above, holds only briefly, then continued
  // scrolling carries it straight on up and out — one continuous scroll
  // gesture rather than door / pause / text / pause / exit. Slight stagger
  // per line.
  const eyebrowY = useTransform(scrollYProgress, [DOOR_OPEN_END, 0.32, 0.46, 0.495], ["-110%", "0%", "0%", "-250%"]);
  const headingLine1Y = useTransform(scrollYProgress, [DOOR_OPEN_END + 0.025, 0.345, 0.46, 0.495], ["-110%", "0%", "0%", "-250%"]);
  const headingLine2Y = useTransform(scrollYProgress, [DOOR_OPEN_END + 0.05, 0.37, 0.46, 0.495], ["-110%", "0%", "0%", "-250%"]);
  const subTextY = useTransform(scrollYProgress, [DOOR_OPEN_END + 0.075, 0.395, 0.46, 0.495], ["-110%", "0%", "0%", "-250%"]);
  const ctaY = useTransform(scrollYProgress, [DOOR_OPEN_END + 0.1, 0.42, 0.46, 0.495], ["-110%", "0%", "0%", "-250%"]);

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
                {/* Room image — always sharp and clean. The frosted glass door
                    (its own backdrop-blur) is what obscures the room while
                    shut; no separate image blur/reveal mask needed. */}
                <Image
                  src="/images/hero-living.jpg"
                  alt="Living room of a personalised residence designed by NEEMA HOMES"
                  fill
                  priority
                  sizes="100vw"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Warm light bleeding through as we approach the next section — grows to
              flood the screen rather than fading in, so it stays reliable across browsers */}
          {!shouldReduceMotion && (
            <motion.div
              style={{ scale: doorGlowScale }}
              className="absolute inset-0 pointer-events-none z-[15] origin-center"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(249,248,243,0.95) 0%, rgba(238,225,196,0.85) 35%, rgba(197,168,128,0.55) 65%, rgba(28,27,24,0) 100%)",
                }}
              />
            </motion.div>
          )}

          {/* Glass Door Transition: closes over the room, then swings open to enter the space */}
          {!shouldReduceMotion && (
            <div
              className="absolute inset-0 z-30 pointer-events-none"
              style={{ perspective: "2200px" }}
              aria-hidden="true"
            >
              {/* Left Leaf */}
              <motion.div
                style={{
                  rotateY: leftDoorRotateY,
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  backdropFilter: "blur(10px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(10px) saturate(1.4)",
                  boxShadow:
                    "inset 0 0 0 1px rgba(197,168,128,0.35), inset 0 0 60px rgba(0,0,0,0.3), 6px 0 30px rgba(0,0,0,0.35)",
                  borderRight: "2px solid rgba(197,168,128,0.65)",
                }}
                className="door-leaf-grid-left absolute left-0 top-0 h-full w-1/2"
              >
                {/* Lever handle: mounting knobs + bar, reads as real hardware on its own */}
                <div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1">
                  <div className="h-[7px] w-[7px] rounded-full bg-gradient-to-br from-[#E8D4A8] to-[#8B7355] shadow-[0_0_8px_rgba(197,168,128,0.6)]" />
                  <div className="h-20 w-[3px] rounded-full bg-gradient-to-b from-[#E8D4A8] via-[#C5A880] to-[#8B7355] shadow-[0_0_12px_rgba(197,168,128,0.5)]" />
                  <div className="h-[7px] w-[7px] rounded-full bg-gradient-to-br from-[#E8D4A8] to-[#8B7355] shadow-[0_0_8px_rgba(197,168,128,0.6)]" />
                </div>
              </motion.div>

              {/* Right Leaf */}
              <motion.div
                style={{
                  rotateY: rightDoorRotateY,
                  transformOrigin: "right center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  backdropFilter: "blur(10px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(10px) saturate(1.4)",
                  boxShadow:
                    "inset 0 0 0 1px rgba(197,168,128,0.35), inset 0 0 60px rgba(0,0,0,0.3), -6px 0 30px rgba(0,0,0,0.35)",
                  borderLeft: "2px solid rgba(197,168,128,0.65)",
                }}
                className="door-leaf-grid-right absolute right-0 top-0 h-full w-1/2"
              >
                {/* Lever handle: mounting knobs + bar, reads as real hardware on its own */}
                <div className="absolute left-6 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1">
                  <div className="h-[7px] w-[7px] rounded-full bg-gradient-to-br from-[#E8D4A8] to-[#8B7355] shadow-[0_0_8px_rgba(197,168,128,0.6)]" />
                  <div className="h-20 w-[3px] rounded-full bg-gradient-to-b from-[#E8D4A8] via-[#C5A880] to-[#8B7355] shadow-[0_0_12px_rgba(197,168,128,0.5)]" />
                  <div className="h-[7px] w-[7px] rounded-full bg-gradient-to-br from-[#E8D4A8] to-[#8B7355] shadow-[0_0_8px_rgba(197,168,128,0.6)]" />
                </div>
              </motion.div>
            </div>
          )}

          {/* Content Overlay — copy slides in from above as the door opens on scroll */}
          <div className="absolute inset-0 z-20 flex items-end">
            {/* Static legibility scrim behind the copy — deliberately not scroll-animated.
                Spans the full viewport (not just a bottom box) so both gradients fade to
                true zero within the div itself, instead of getting hard-clipped where a
                shorter box would end and leaving a visible seam. */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,9,8,0.72) 0%, rgba(10,9,8,0.4) 26%, rgba(10,9,8,0.08) 52%, transparent 75%), linear-gradient(to right, rgba(10,9,8,0.45) 0%, rgba(10,9,8,0.15) 40%, transparent 65%)",
              }}
            />
            <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 pb-10 sm:pb-16 lg:px-10 lg:pb-24">
              <motion.div
                style={{
                  x: isDesktop && !shouldReduceMotion ? textMouseX : 0,
                  y: isDesktop && !shouldReduceMotion ? textMouseY : 0,
                  textShadow: "0 2px 30px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.9)",
                }}
                className="max-w-3xl"
              >
                {/* Eyebrow Reveal */}
                <div className="overflow-hidden">
                  <motion.p
                    style={{ y: shouldReduceMotion ? "0%" : eyebrowY }}
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
                      style={{ y: shouldReduceMotion ? "0%" : headingLine1Y }}
                    >
                      A signature residence, created with
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span
                      className="block"
                      style={{ y: shouldReduceMotion ? "0%" : headingLine2Y }}
                    >
                      clarity and delivered with conviction.
                    </motion.span>
                  </span>
                </h1>

                {/* Supporting Text Reveal */}
                <div className="overflow-hidden mt-6">
                  <motion.p
                    style={{ y: shouldReduceMotion ? "0%" : subTextY }}
                    className="max-w-xl font-serif text-xl italic text-[#C5A880]"
                  >
                    Curating Signature Spaces
                  </motion.p>
                </div>

                {/* CTA Button Reveal */}
                <div className="overflow-hidden mt-10">
                  <motion.div
                    style={{ y: shouldReduceMotion ? "0%" : ctaY }}
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

            {/* Micro UI: Scroll Indicator — slides away once the visitor starts scrolling */}
            <motion.div
              style={{ y: shouldReduceMotion ? undefined : indicatorScrollY }}
              className="absolute bottom-8 right-8 hidden lg:block"
            >
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
                className="flex items-center gap-3 text-[#F9F8F3]/70 text-[11px] font-sans uppercase tracking-[0.2em]"
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
      </div>
    </section>
  );
}
