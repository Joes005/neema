import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Mail, MapPin, Globe, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import LuvelleLogo from "./LuvelleLogo";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "Services", href: "/services", number: "01" },
  { name: "Projects", href: "/projects", number: "02" },
  { name: "Gallery", href: "/gallery", number: "03" },
  { name: "Process", href: "/process", number: "04" },
  { name: "Studio", href: "/studio", number: "05" },
  { name: "Contact", href: "/contact", number: "06" },
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
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#141312] text-[#F7F5F0] px-4 py-5 sm:px-8 sm:py-8 md:px-12 md:py-10 overflow-y-auto min-h-screen min-h-[100dvh]"
        >
          {/* Background subtle typography watermark */}
          <div className="pointer-events-none absolute right-4 bottom-4 select-none font-serif text-[clamp(4.5rem,20vw,24rem)] font-light leading-none text-[#F7F5F0]/[0.03]">
            LUVELLE
          </div>

          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between z-10 border-b border-[#F7F5F0]/10 pb-4 sm:pb-6">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-3 group"
            >
              <LuvelleLogo className="h-7 sm:h-9 w-auto max-w-[160px] sm:max-w-none" theme="dark" />
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F7F5F0]/80 hover:text-[#C5A880] transition-colors group cursor-pointer"
            >
              <span>Close</span>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#F7F5F0]/20 flex items-center justify-center group-hover:border-[#C5A880] transition-colors">
                <X className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Main Navigation Items */}
          <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center py-6 sm:py-8 z-10">
            <div className="lg:col-span-8 flex flex-col space-y-3 sm:space-y-4 md:space-y-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  custom={idx}
                  variants={itemVariants}
                  className="group overflow-hidden"
                >
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className="inline-flex items-baseline gap-4 sm:gap-6 md:gap-10 font-serif text-[clamp(1.75rem,5.5vw,4.5rem)] font-light tracking-tight text-[#F7F5F0]/80 hover:text-[#F7F5F0] hover:translate-x-2 sm:hover:translate-x-3 transition-all duration-300"
                  >
                    <span className="font-sans text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.25em] text-[#C5A880]">
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
            <div className="lg:col-span-4 flex flex-col space-y-6 sm:space-y-8 border-t lg:border-t-0 lg:border-l border-[#F7F5F0]/10 pt-6 lg:pt-0 lg:pl-12">
              <div>
                <p className="eyebrow mb-2 sm:mb-3">Residential Interior Studio</p>
                <p className="font-serif text-lg sm:text-xl text-[#F7F5F0]">
                  Designing Spaces. Defining Lifestyles.
                </p>
                <p className="text-sm font-light text-[#F7F5F0]/60 mt-2 leading-relaxed">
                  A signature residence, created with clarity and delivered with conviction across bespoke commissions.
                </p>
              </div>

              <div className="space-y-3 text-sm text-[#F7F5F0]/80">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A880]" />
                  <span>Bespoke Architecture & Interior Studio</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C5A880]" />
                  <a
                    href="mailto:hello@luvelleinteriors.com"
                    className="hover:text-[#C5A880] transition-colors"
                  >
                    hello@luvelleinteriors.com
                  </a>
                </div>
              </div>

              <div>
                <p className="eyebrow mb-3">Connect</p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.luvelleinteriors.com"
                    aria-label="Website"
                    className="w-10 h-10 rounded-full border border-[#F7F5F0]/20 flex items-center justify-center hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com/luvelle.interiors"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Social"
                    className="w-10 h-10 rounded-full border border-[#F7F5F0]/20 flex items-center justify-center hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/contact"
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
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#F7F5F0]/60 border-t border-[#F7F5F0]/10 pt-6 z-10">
            <p>
              © 2026{" "}
              <a
                href="https://digital-tact-solutions.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C5A880] transition-colors underline decoration-white/20 underline-offset-4"
              >
                Digital Tact Solutions
              </a>
              . All rights reserved.
            </p>
            <p className="mt-2 sm:mt-0 font-serif italic text-[#C5A880]/70">
              Designing spaces. Defining lifestyles.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
