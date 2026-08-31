"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Mail, MapPin, Globe, Share2 } from "lucide-react";
import Link from "next/link";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "Services", href: "/services", number: "01" },
  { name: "Projects", href: "/projects", number: "02" },
  { name: "Process", href: "/process", number: "03" },
  { name: "Studio", href: "/studio", number: "04" },
  { name: "Contact", href: "/contact", number: "05" },
];

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const overlayVariants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at 95% 5%)",
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at 95% 5%)",
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  const itemVariants = {
    closed: { y: 60, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2 + i * 0.08,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={overlayVariants}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#141312] text-[#F7F5F0] px-6 py-8 md:px-12 md:py-10"
        >
          {/* Background subtle typography watermark */}
          <div className="pointer-events-none absolute right-4 bottom-4 select-none font-serif text-[clamp(6rem,22vw,24rem)] font-light leading-none text-[#F7F5F0]/[0.03]">
            NEEMA
          </div>

          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between z-10 border-b border-[#F7F5F0]/10 pb-6">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-full border border-[#C5A880] flex items-center justify-center font-serif text-xs text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#141312] transition-colors">
                N
              </div>
              <span className="font-serif text-lg tracking-widest text-[#F7F5F0]">
                NEEMA HOMES
              </span>
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F7F5F0]/80 hover:text-[#C5A880] transition-colors group"
            >
              <span>Close</span>
              <div className="w-9 h-9 rounded-full border border-[#F7F5F0]/20 flex items-center justify-center group-hover:border-[#C5A880] transition-colors">
                <X className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Main Navigation Items */}
          <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8 z-10">
            <div className="lg:col-span-8 flex flex-col space-y-4 md:space-y-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  custom={idx}
                  variants={itemVariants}
                  className="group overflow-hidden"
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="inline-flex items-baseline gap-6 md:gap-10 font-serif text-[clamp(2.2rem,5vw,4.5rem)] font-light tracking-tight text-[#F7F5F0]/80 hover:text-[#F7F5F0] hover:translate-x-3 transition-all duration-300"
                  >
                    <span className="font-sans text-xs md:text-sm font-semibold tracking-[0.25em] text-[#C5A880]">
                      {link.number}
                    </span>
                    <span className="relative">
                      {link.name}
                      <span className="absolute left-0 bottom-1 w-0 h-[2px] bg-[#C5A880] group-hover:w-full transition-all duration-500 ease-out" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Side Studio Info inside Overlay */}
            <div className="lg:col-span-4 flex flex-col space-y-8 border-t lg:border-t-0 lg:border-l border-[#F7F5F0]/10 pt-8 lg:pt-0 lg:pl-12">
              <div>
                <p className="eyebrow mb-3">Residential Interior Studio</p>
                <p className="font-serif text-xl text-[#F7F5F0]">
                  Curating Signature Spaces
                </p>
                <p className="text-sm font-light text-[#F7F5F0]/60 mt-2 leading-relaxed">
                  A signature residence, created with clarity and delivered with conviction in Chennai & Tamil Nadu.
                </p>
              </div>

              <div className="space-y-3 text-sm text-[#F7F5F0]/80">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A880]" />
                  <span>Chennai, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C5A880]" />
                  <a
                    href="mailto:info@company.com"
                    className="hover:text-[#C5A880] transition-colors"
                  >
                    info@company.com
                  </a>
                </div>
              </div>

              <div>
                <p className="eyebrow mb-3">Connect</p>
                <div className="flex items-center gap-4">
                  <a
                    href="#"
                    aria-label="Website"
                    className="w-10 h-10 rounded-full border border-[#F7F5F0]/20 flex items-center justify-center hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="Share"
                    className="w-10 h-10 rounded-full border border-[#F7F5F0]/20 flex items-center justify-center hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="btn-ink w-full justify-between group"
                >
                  <span>Start a project</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Footer inside Overlay */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#F7F5F0]/40 border-t border-[#F7F5F0]/10 pt-6 z-10">
            <p>© 2026 NEEMA HOMES. All rights reserved.</p>
            <p className="mt-2 sm:mt-0 font-serif italic text-[#C5A880]/70">
              Personalised by design.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
