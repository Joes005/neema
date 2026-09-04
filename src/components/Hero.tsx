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
  useMotionValue,
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

  // ── Entrance Choreography (autoplay, not scroll-linked) ────────────────
  // The door swings open and the copy arrives automatically once the page
  // has loaded, on a timer — not in response to how far the visitor has
  // scrolled. Gating this on scroll meant a visitor had to scroll partway
  // through an animation that plays out at a fixed pace regardless, which
  // is what read as laggy/disconnected from the actual scroll gesture,
  // especially on mobile. Only what happens *after* the intro settles (the
  // copy exiting upward, the camera zooming into the next section) is still
  // driven by scroll — that part continues exactly as before.
  const [doorOpen, setDoorOpen] = useState(false);
  const [textEntranceDone, setTextEntranceDone] = useState(false);
  const hasOpenedOnceRef = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (shouldReduceMotion) {
      setDoorOpen(true);
      hasOpenedOnceRef.current = true;
      return;
    }
    // Doors stay shut for a hair so the opening reads as a deliberate beat
    // rather than firing the instant the loader clears.
    const openTimer = setTimeout(() => {
      setDoorOpen(true);
      hasOpenedOnceRef.current = true;
    }, 350);
    return () => clearTimeout(openTimer);
  }, [isLoaded, shouldReduceMotion]);

  // Once the visitor has scrolled back up to the very top of the hero — after
  // having opened it and explored further down — shut the door again so
  // returning to the top doesn't leave it hanging open. Scrolling back down
  // from there reopens it the same way it opened the first time. Two
  // different thresholds (rather than one) give it a little hysteresis so it
  // doesn't flicker open/closed from tiny scroll jitter right at the top.
  useEffect(() => {
    if (shouldReduceMotion) return;
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (!hasOpenedOnceRef.current) return;
      if (v <= 0.004) setDoorOpen(false);
      else if (v > 0.02) setDoorOpen(true);
    });
    return unsubscribe;
  }, [scrollYProgress, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setTextEntranceDone(true);
      return;
    }
    if (!doorOpen) {
      setTextEntranceDone(false);
      return;
    }
    // The last line (the CTA) starts at 4 * TEXT_STAGGER and takes ~0.9s to
    // settle — this is roughly when the intro is fully done and it's safe
    // to let scroll start driving the copy's exit.
    const settleTimer = setTimeout(() => setTextEntranceDone(true), 1250);
    return () => clearTimeout(settleTimer);
  }, [doorOpen, shouldReduceMotion]);

  const doorTransition = { duration: 1.1, ease: [0.65, 0, 0.35, 1] as const };
  const leftDoorVariants = {
    closed: { rotateY: 0, transition: doorTransition },
    open: { rotateY: 100, transition: doorTransition },
  };
  const rightDoorVariants = {
    closed: { rotateY: 0, transition: doorTransition },
    open: { rotateY: -100, transition: doorTransition },
  };

  const TEXT_STAGGER = 0.08; // seconds between each line's entrance start
  const textEnterTransition = (index: number) =>
    shouldReduceMotion
      ? { duration: 0.01 }
      : { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: index * TEXT_STAGGER };

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

  // Once the intro has settled, continued scrolling carries the whole copy
  // block up and out together as one shared motion value (every line always
  // exited in lockstep — only the entrance was staggered). scrollYProgress
  // is live from the moment the section mounts, so it's mirrored into this
  // value only after the intro is actually done, then spring-smoothed in
  // case the visitor scrolled ahead during the intro and it needs to catch
  // up rather than snap.
  const rawExitY = useTransform(scrollYProgress, [0, 0.35], ["0%", "-250%"]);
  const scrollExitY = useMotionValue("0%");
  useEffect(() => {
    if (!textEntranceDone) return;
    scrollExitY.set(rawExitY.get());
    const unsubscribe = rawExitY.on("change", (v) => scrollExitY.set(v));
    return unsubscribe;
  }, [textEntranceDone, rawExitY, scrollExitY]);
  const smoothScrollExitY = useSpring(scrollExitY, { stiffness: 260, damping: 32 });

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

  // Forces each text-reveal mask onto its own compositing layer so iOS Safari
  // repaints it fresh every scroll frame instead of occasionally showing a
  // stale, un-clipped frame of the animated text bleeding through as a ghost.
  const maskLayerStyle: React.CSSProperties = {
    transform: "translateZ(0)",
    WebkitTransform: "translateZ(0)",
    willChange: "transform",
  };

  return (
    <section id="hero" ref={containerRef} className="relative bg-[#1C1B18]">
      <div
        // Was 200vh: with the door/text entrance now automatic (no scroll
        // budget spent on them), that height left ~65vh of pure zoom/glow
        // with nothing textual happening between the copy exiting and the
        // next section actually arriving — enough to feel like the page had
        // stalled. Shortening it compresses the exit + zoom + glow + handoff
        // together proportionally, so the section hands off to the next one
        // soon after the text goes, not long after.
        className="relative h-[150vh] w-full bg-[#1C1B18]"
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
              // `isolation: isolate` pins the door's 3D perspective/preserve-3d
              // context to its own compositing layer. Without it, iOS Safari can
              // let this layer's 3D transform bleed into how it repaints the
              // sibling text layer below, showing stale frames of the masked
              // heading text ghosted through — the doubled/smeared text some
              // visitors saw on scroll.
              style={{ perspective: "2200px", isolation: "isolate" }}
              aria-hidden="true"
            >
              {/* Left Leaf */}
              <motion.div
                initial="closed"
                animate={doorOpen ? "open" : "closed"}
                variants={leftDoorVariants}
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  // backdrop-filter compositing two 3D-transformed layers every scroll
                  // frame is heavy on mobile GPUs and is what makes the door swing (and
                  // the text arriving right after it) feel laggy on phones. Desktop
                  // pointers keep the frosted-glass blur; touch/narrow viewports get an
                  // opaque tint instead — visually reads the same as a shut door, at a
                  // fraction of the paint cost.
                  ...(isDesktop
                    ? {
                        backdropFilter: "blur(10px) saturate(1.4)",
                        WebkitBackdropFilter: "blur(10px) saturate(1.4)",
                      }
                    : {
                        backgroundColor: "rgba(20,19,18,0.94)",
                      }),
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
                initial="closed"
                animate={doorOpen ? "open" : "closed"}
                variants={rightDoorVariants}
                style={{
                  transformOrigin: "right center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  ...(isDesktop
                    ? {
                        backdropFilter: "blur(10px) saturate(1.4)",
                        WebkitBackdropFilter: "blur(10px) saturate(1.4)",
                      }
                    : {
                        backgroundColor: "rgba(20,19,18,0.94)",
                      }),
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
          <div className="absolute inset-0 z-20 flex items-end" style={{ isolation: "isolate" }}>
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
              {/* Shared scroll-driven exit — the whole copy block moves up and out
                  together once the autoplay entrance below has settled. */}
              <motion.div style={{ y: shouldReduceMotion ? "0%" : smoothScrollExitY }}>
                <motion.div
                  style={{
                    x: isDesktop && !shouldReduceMotion ? textMouseX : 0,
                    y: isDesktop && !shouldReduceMotion ? textMouseY : 0,
                    textShadow: "0 2px 30px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.9)",
                  }}
                  className="max-w-3xl"
                >
                  {/* Eyebrow Reveal */}
                  <div className="overflow-hidden" style={maskLayerStyle}>
                    <motion.p
                      initial={{ y: "-110%" }}
                      animate={{ y: doorOpen ? "0%" : "-110%" }}
                      transition={textEnterTransition(0)}
                      className="eyebrow text-[#C5A880]"
                    >
                      Chennai · Residential Interiors
                    </motion.p>
                  </div>

                  {/* Main Heading Reveal */}
                  <h1 className="display-1 mt-6 text-[#F9F8F3]">
                    <span className="block overflow-hidden" style={maskLayerStyle}>
                      <motion.span
                        className="block"
                        initial={{ y: "-110%" }}
                        animate={{ y: doorOpen ? "0%" : "-110%" }}
                        transition={textEnterTransition(1)}
                      >
                        A signature residence, created with
                      </motion.span>
                    </span>
                    <span className="block overflow-hidden" style={maskLayerStyle}>
                      <motion.span
                        className="block"
                        initial={{ y: "-110%" }}
                        animate={{ y: doorOpen ? "0%" : "-110%" }}
                        transition={textEnterTransition(2)}
                      >
                        clarity and delivered with conviction.
                      </motion.span>
                    </span>
                  </h1>

                  {/* Supporting Text Reveal */}
                  <div className="overflow-hidden mt-6" style={maskLayerStyle}>
                    <motion.p
                      initial={{ y: "-110%" }}
                      animate={{ y: doorOpen ? "0%" : "-110%" }}
                      transition={textEnterTransition(3)}
                      className="max-w-xl font-serif text-xl italic text-[#C5A880]"
                    >
                      Curating Signature Spaces
                    </motion.p>
                  </div>

                  {/* CTA Button Reveal */}
                  <div className="overflow-hidden mt-10" style={maskLayerStyle}>
                    <motion.div
                      initial={{ y: "-110%" }}
                      animate={{ y: doorOpen ? "0%" : "-110%" }}
                      transition={textEnterTransition(4)}
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
                <span>Scroll to continue</span>
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
