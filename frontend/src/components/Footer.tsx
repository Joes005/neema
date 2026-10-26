import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LuvelleLogo from "./LuvelleLogo";

interface FooterProps {
  variant?: "reveal" | "standard";
}

export default function Footer({ variant = "standard" }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (variant !== "reveal" || !footerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      setFooterHeight(entries[0].contentRect.height);
    });
    
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [variant]);

  const footerContent = (
    <>
      <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 px-4 sm:px-6 py-10 sm:py-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-10">
        <div>
          <LuvelleLogo theme="dark" layout="horizontal" size="xl" className="origin-left" />
          <p className="mt-5 sm:mt-6 max-w-sm font-serif text-lg sm:text-xl italic text-[#C5A880]">
            Designing Spaces. Defining Lifestyles.
          </p>
          <p className="mt-3 sm:mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-[#F9F8F3]/70">
            A signature residence, created with clarity and delivered with conviction across bespoke architectural commissions.
          </p>
        </div>

        <div>
          <p className="eyebrow text-[#C5A880]">Navigate</p>
          <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-sm">
            <li><Link to="/services" className="transition-colors hover:text-[#C5A880]">Services</Link></li>
            <li><Link to="/projects" className="transition-colors hover:text-[#C5A880]">Projects</Link></li>
            <li><Link to="/gallery" className="transition-colors hover:text-[#C5A880]">Gallery</Link></li>
            <li><Link to="/process" className="transition-colors hover:text-[#C5A880]">Process</Link></li>
            <li><Link to="/studio" className="transition-colors hover:text-[#C5A880]">Studio</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-[#C5A880]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-[#C5A880]">Studio</p>
          <address className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-sm not-italic text-[#F9F8F3]/80">
            <p>Bespoke Architecture & Interior Studio</p>
            <p>
              <a href="tel:+919944499167" className="transition-colors hover:text-[#C5A880]">
                +91 99444 99167
              </a>
            </p>
            <p>
              <a href="mailto:studio@luvelleinteriors.com" className="transition-colors hover:text-[#C5A880]">
                studio@luvelleinteriors.com
              </a>
            </p>
            <p>
              <a href="https://www.luvelleinteriors.com" className="transition-colors hover:text-[#C5A880]" rel="noreferrer">
                www.luvelleinteriors.com
              </a>
            </p>
          </address>
        </div>
      </div>

      {/* Giant LUVELLE wordmark */}
      <div className="overflow-hidden px-4 sm:px-6 lg:px-10" aria-hidden="true">
        <span
          className="block select-none whitespace-nowrap text-center leading-[0.8] tracking-[0.04em] text-[#F9F8F3]/10 text-[clamp(3.5rem,19vw,20rem)] font-serif font-light"
        >
          LUVELLE
        </span>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-[#F9F8F3]/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2.5 px-4 sm:px-6 py-6 text-xs text-[#F9F8F3]/60 sm:flex-row sm:items-center sm:justify-between lg:px-10 text-center sm:text-left">
          <p>
            © 2026{" "}
            <a
              href="https://digital-tact-solutions.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F9F8F3]/80 hover:text-[#C5A880] transition-colors underline decoration-white/20 hover:decoration-[#C5A880] underline-offset-4"
            >
              Digital Tact Solutions
            </a>
            . All rights reserved.
          </p>
          <p>Residential interior design and turnkey execution</p>
        </div>
      </div>
    </>
  );

  if (variant === "standard") {
    return (
      <footer className="bg-[#1C1B18] text-[#F9F8F3] w-full relative z-10 border-t border-[#C5A880]/20">
        {footerContent}
      </footer>
    );
  }

  return (
    <>
      {/* Spacer matching footer height */}
      <div style={{ height: footerHeight }} className="w-full relative z-0 pointer-events-none" />
      
      {/* Fixed footer behind content */}
      <footer 
        ref={footerRef}
        className="bg-[#1C1B18] text-[#F9F8F3] fixed bottom-0 left-0 w-full -z-10"
      >
        {footerContent}
      </footer>
    </>
  );
}
