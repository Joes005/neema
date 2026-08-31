"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1C1B18] text-[#F9F8F3]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-10">
        <div>
          <span className="font-sans text-[15px] font-bold uppercase tracking-[0.2em] block">
            NEEMA HOMES
          </span>
          <p className="mt-6 max-w-sm font-serif text-xl italic text-[#C5A880]">
            Curating Signature Spaces
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#F9F8F3]/70">
            A signature residence, created with clarity and delivered with conviction.
          </p>
        </div>

        <div>
          <p className="eyebrow text-[#C5A880]">Navigate</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link href="/services" className="transition-colors hover:text-[#C5A880]">Services</Link></li>
            <li><Link href="/projects" className="transition-colors hover:text-[#C5A880]">Projects</Link></li>
            <li><Link href="/process" className="transition-colors hover:text-[#C5A880]">Process</Link></li>
            <li><Link href="/studio" className="transition-colors hover:text-[#C5A880]">Studio</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-[#C5A880]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-[#C5A880]">Studio</p>
          <address className="mt-5 space-y-3 text-sm not-italic text-[#F9F8F3]/80">
            <p>Chennai, Tamil Nadu, India</p>
            <p>
              <a href="mailto:info@neemahomes.in" className="transition-colors hover:text-[#C5A880]">
                info@neemahomes.in
              </a>
            </p>
            <p>
              <a href="https://www.neemahomes.in" className="transition-colors hover:text-[#C5A880]" rel="noreferrer">
                www.neemahomes.in
              </a>
            </p>
          </address>
        </div>
      </div>

      {/* Giant NEEMA wordmark */}
      <div className="overflow-hidden px-6 lg:px-10" aria-hidden="true">
        <span
          className="block select-none whitespace-nowrap text-center leading-[0.8] tracking-[0.02em] text-[#F9F8F3]/10 text-[clamp(5rem,24vw,22rem)] font-sans font-light"
        >
          NEEMA
        </span>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-[#F9F8F3]/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-[#F9F8F3]/60 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© 2026 NEEMA HOMES. All rights reserved.</p>
          <p>Residential interior design and execution · Chennai</p>
        </div>
      </div>
    </footer>
  );
}


