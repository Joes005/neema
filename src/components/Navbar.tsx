"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FullscreenMenu from "./FullscreenMenu";
import NeemaLogo from "./NeemaLogo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Process", href: "/process" },
    { name: "Studio", href: "/studio" },
  ];

  return (
    <>
      <header
        className={`inset-x-0 top-0 z-50 fixed transition-all duration-300 ${
          isScrolled
            ? "bg-[#1C1B18]/95 backdrop-blur-lg py-5 shadow-lg text-[#F9F8F3] border-b border-[#C5A880]/20"
            : "bg-transparent py-6 lg:py-8 text-current"
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 lg:px-10">
          {/* Brand Logo / Wordmark */}
          <Link aria-label="NEEMA HOMES home" className="min-w-0 flex items-center" href="/">
            <NeemaLogo height={48} className="scale-100 sm:scale-110 origin-left transition-transform duration-300" />
          </Link>

          {/* Nav Controls */}
          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-10 lg:flex">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-[15px] font-bold uppercase tracking-[0.18em] transition-colors hover:text-[#C5A880] ${
                      isActive ? "text-[#C5A880]" : "opacity-90"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <Link href="/contact" className="btn-ink hidden lg:inline-flex text-[15px] px-6 py-3">
              Start a project
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
              className="text-[15px] font-bold uppercase tracking-[0.18em] cursor-pointer hover:text-[#C5A880] transition-colors"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Navigation */}
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}


