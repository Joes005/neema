import React, { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import FullscreenMenu from "./FullscreenMenu";
import LuvelleLogo from "./LuvelleLogo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

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
    { name: "Gallery", href: "/gallery" },
    { name: "Process", href: "/process" },
    { name: "Studio", href: "/studio" },
  ];

  // Only the homepage has a dark section (the Hero) directly behind the
  // unscrolled navbar; every other page starts with a light/beige banner.
  // Once scrolled, the header always gets its own dark backdrop.
  const isDarkBg = isScrolled || pathname === "/";
  const inactiveTextClass = isDarkBg ? "text-[#F9F8F3]" : "text-[#1C1B18]";
  const activeTextClass = isDarkBg ? "text-[#C5A880]" : "text-[#71552F]";
  const hoverTextClass = isDarkBg ? "hover:text-[#C5A880]" : "hover:text-[#71552F]";

  return (
    <>
      <header
        className={`inset-x-0 top-0 z-50 fixed transition-all duration-300 ${
          isScrolled
            ? "bg-[#1C1B18]/95 backdrop-blur-lg py-3.5 sm:py-4 shadow-xl border-b border-[#C5A880]/20"
            : pathname === "/"
            ? "bg-gradient-to-b from-[#1C1B18]/85 via-[#1C1B18]/40 to-transparent py-4 sm:py-6 lg:py-7"
            : "bg-transparent py-4 sm:py-6 lg:py-7"
        } ${inactiveTextClass}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          {/* Brand Logo / Wordmark */}
          <Link aria-label="LUVELLE INTERIORS home" className="min-w-0 flex items-center" to="/">
            <LuvelleLogo
              height={46}
              theme={isDarkBg ? "dark" : "light"}
              className="scale-100 origin-left transition-all duration-300 drop-shadow-sm"
            />
          </Link>

          {/* Nav Controls */}
          <div className="flex items-center gap-2.5 sm:gap-5 lg:gap-8">
            <nav className="hidden items-center gap-10 lg:flex">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-[15px] font-bold uppercase tracking-[0.18em] transition-colors ${hoverTextClass} ${
                      isActive ? activeTextClass : `${inactiveTextClass} opacity-90`
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <Link
              to="/contact"
              className="btn-ink inline-flex text-[11px] px-3.5 py-2 sm:text-[13px] sm:px-5 sm:py-2.5 lg:text-[15px] lg:px-6 lg:py-3 whitespace-nowrap"
            >
              Start a project
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
              className={`shrink-0 text-[13px] sm:text-[15px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] cursor-pointer transition-colors ${inactiveTextClass} ${hoverTextClass}`}
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
