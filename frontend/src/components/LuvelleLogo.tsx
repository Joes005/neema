import React from "react";
import LuvelleLogoMark from "./LuvelleLogoMark";

interface LuvelleLogoProps {
  className?: string;
  markSize?: number;
  height?: number;
  showText?: boolean;
  showTagline?: boolean;
  layout?: "horizontal" | "stacked";
  theme?: "dark" | "light" | "auto";
  variant?: "vector" | "image";
}

export default function LuvelleLogo({
  className = "",
  markSize,
  height,
  showText = true,
  showTagline = false,
  layout = "horizontal",
  theme = "auto",
  variant = "image",
}: LuvelleLogoProps) {
  // If variant is "image", render the high-res authentic brand asset
  if (variant === "image") {
    const isDarkBg = theme === "dark";
    const imgSrc =
      layout === "horizontal"
        ? isDarkBg
          ? "/images/luvelle-horizontal-dark.png"
          : "/images/luvelle-horizontal-light.png"
        : isDarkBg
        ? "/images/luvelle-logo-dark.png"
        : "/images/luvelle-logo-light.png";

    return (
      <div
        className={`inline-flex items-center shrink-0 select-none ${
          !height && !className.includes("h-") ? "h-10" : ""
        } ${className}`}
        style={height ? { height: `${height}px` } : undefined}
      >
        <img
          src={imgSrc}
          alt="LUVELLE INTERIORS"
          className="h-full w-auto max-w-full object-contain filter drop-shadow-sm transition-opacity duration-300"
          loading="eager"
        />
      </div>
    );
  }

  // Pure Vector Rendering (Zero blur, infinite crispness at any screen density)
  const isDark = theme === "dark";
  const isLight = theme === "light";

  // Text color classes
  const mainTextColor = isDark
    ? "text-[#F9F8F3]"
    : isLight
    ? "text-[#1C1B18]"
    : "text-current";

  const goldTextColor = "text-[#C5A880]";
  const taglineColor = isDark
    ? "text-[#F9F8F3]/65"
    : isLight
    ? "text-[#1C1B18]/65"
    : "text-current opacity-70";

  // Computed mark size based on height
  const effectiveHeight = height || 40;
  const calculatedMarkSize =
    markSize || (layout === "horizontal" ? Math.round(effectiveHeight * 0.95) : Math.round(effectiveHeight * 0.8));

  if (layout === "stacked") {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        {/* Architectural Icon Mark */}
        <LuvelleLogoMark size={calculatedMarkSize} theme="gold" />

        {showText && (
          <div className="mt-3.5 flex flex-col items-center">
            {/* Wordmark: LUVELLE with signature gold E */}
            <div
              className={`font-serif tracking-[0.32em] uppercase font-medium leading-none ${mainTextColor}`}
              style={{ fontSize: `${Math.round(calculatedMarkSize * 0.42)}px` }}
            >
              <span>LUVELL</span>
              <span className="bg-gradient-to-br from-[#F5E4C3] via-[#C5A880] to-[#8E6E36] bg-clip-text text-transparent">
                E
              </span>
            </div>

            {/* INTERIORS with hairlines */}
            <div className="mt-2.5 flex items-center justify-center gap-2.5 w-full max-w-[280px]">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A880]/70 to-[#C5A880]" />
              <span
                className="font-sans text-[0.62em] font-normal uppercase tracking-[0.45em] text-[#C5A880]"
                style={{ fontSize: `${Math.max(9, Math.round(calculatedMarkSize * 0.15))}px` }}
              >
                INTERIORS
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C5A880]/70 to-[#C5A880]" />
            </div>

            {/* Tagline */}
            {showTagline && (
              <p
                className={`mt-2 font-sans font-normal uppercase tracking-[0.24em] ${taglineColor}`}
                style={{ fontSize: `${Math.max(8, Math.round(calculatedMarkSize * 0.11))}px` }}
              >
                DESIGNING SPACES. DEFINING LIFESTYLES.
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  // Horizontal Layout (Standard for Navbars and Headers)
  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${
        !height && !className.includes("h-") ? "h-10" : ""
      } ${className}`}
      style={height ? { height: `${height}px` } : undefined}
    >
      <LuvelleLogoMark size={calculatedMarkSize} theme="gold" />

      {showText && (
        <div className="flex flex-col justify-center text-left leading-none tracking-normal">
          {/* Brand Name */}
          <div
            className={`font-serif font-medium tracking-[0.26em] uppercase flex items-baseline ${mainTextColor}`}
            style={{ fontSize: `${Math.max(14, Math.round(effectiveHeight * 0.46))}px` }}
          >
            <span>LUVELL</span>
            <span className="bg-gradient-to-br from-[#F5E4C3] via-[#C5A880] to-[#8E6E36] bg-clip-text text-transparent">
              E
            </span>
          </div>

          {/* Subtitle INTERIORS */}
          <div
            className="font-sans font-normal tracking-[0.42em] uppercase text-[#C5A880] mt-1"
            style={{ fontSize: `${Math.max(8, Math.round(height * 0.2))}px` }}
          >
            INTERIORS
          </div>
        </div>
      )}
    </div>
  );
}
