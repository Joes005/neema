import React from "react";
import LuvelleLogoMark from "./LuvelleLogoMark";

export interface LuvelleLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
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
  size,
  markSize,
  height,
  showText = true,
  showTagline = false,
  layout = "horizontal",
  theme = "auto",
  variant = "vector",
}: LuvelleLogoProps) {
  // Raster image fallback if explicitly requested
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
          !height && !className.includes("h-") ? "h-12" : ""
        } ${className}`}
        style={height ? { height: `${height}px` } : undefined}
      >
        <img
          src={imgSrc}
          alt="LUVELLE INTERIORS"
          className="h-full w-auto max-w-full object-contain filter drop-shadow-md transition-opacity duration-300"
          loading="eager"
        />
      </div>
    );
  }

  // Pure Vector Rendering - Infinite sharpness at 100% clarity across all screens
  const isDark = theme === "dark";
  const isLight = theme === "light";

  // Sizing Presets / Dimensions
  let markH = markSize;
  let textScaleStyle: React.CSSProperties | undefined;

  if (height) {
    markH = markSize || (layout === "horizontal" ? Math.round(height * 0.95) : Math.round(height * 0.85));
    textScaleStyle = {
      fontSize: `${Math.round(height * 0.58)}px`,
    };
  } else if (size === "sm") {
    markH = 38;
  } else if (size === "md") {
    markH = 46;
  } else if (size === "lg") {
    markH = 54;
  } else if (size === "xl") {
    markH = 66;
  }

  // Theme-based Colors for Extreme Legibility & Luxury Contrast
  const markTheme = isLight ? "bronze" : "gold";

  // Wordmark Colors - Individual clean colors with matching subtle text-shadow
  const luvellColor = isDark
    ? "text-[#FFFFFF] [text-shadow:_0_2px_8px_rgba(0,0,0,0.85)]"
    : isLight
    ? "text-[#121110]"
    : "text-current";

  // Signature Gold E - Pure luminous radiant gold matching the architectural mark
  const goldEColor = isDark
    ? "text-[#D4BC84] [text-shadow:_0_2px_8px_rgba(0,0,0,0.85)]"
    : isLight
    ? "text-[#8E6420]"
    : "text-[#D4BC84]";

  // Subtitle INTERIORS Color
  const interiorsTextColor = isDark
    ? "text-[#E8D4A8] font-semibold [text-shadow:_0_1px_4px_rgba(0,0,0,0.85)]"
    : "text-[#785114] font-semibold";

  // Hairline Rules Colors
  const hairlineLeft = isDark
    ? "bg-gradient-to-r from-transparent via-[#D4BC84]/70 to-[#D4BC84]"
    : "bg-gradient-to-r from-transparent via-[#8E6420]/60 to-[#8E6420]";

  const hairlineRight = isDark
    ? "bg-gradient-to-l from-transparent via-[#D4BC84]/70 to-[#D4BC84]"
    : "bg-gradient-to-l from-transparent via-[#8E6420]/60 to-[#8E6420]";

  // Tagline Color
  const taglineColor = isDark ? "text-[#FDFCF7]/80" : "text-[#141311]/80";

  // STACKED LAYOUT (e.g. for hero centers or large vertical lockups)
  if (layout === "stacked") {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        {/* Architectural Icon Mark */}
        <LuvelleLogoMark height={markH || 64} theme={markTheme} />

        {showText && (
          <div className="mt-4 flex flex-col items-center">
            {/* Wordmark: LUVELLE with signature gold E */}
            <div
              className={`font-cinzel tracking-[0.20em] uppercase font-bold leading-none flex items-baseline ${
                !textScaleStyle ? "text-3xl sm:text-4xl lg:text-5xl" : ""
              }`}
              style={textScaleStyle}
            >
              <span className={luvellColor}>LUVELL</span>
              <span className={goldEColor}>E</span>
            </div>

            {/* INTERIORS with hairlines */}
            <div className="mt-3.5 flex items-center justify-center gap-3.5 w-full max-w-[320px]">
              <div className={`h-[1.5px] flex-1 ${hairlineLeft}`} />
              <span
                className={`font-sans text-[12px] sm:text-[14px] uppercase tracking-[0.45em] ${interiorsTextColor}`}
              >
                INTERIORS
              </span>
              <div className={`h-[1.5px] flex-1 ${hairlineRight}`} />
            </div>

            {/* Tagline */}
            {showTagline && (
              <p
                className={`mt-3 font-sans text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.28em] ${taglineColor}`}
              >
                DESIGNING SPACES. DEFINING LIFESTYLES.
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  // HORIZONTAL LAYOUT (Standard for Headers, Navbars, and Footers)
  return (
    <div
      className={`inline-flex items-center gap-3 sm:gap-4 select-none shrink-0 ${className}`}
      style={height ? { height: `${height}px` } : undefined}
    >
      {/* Icon Mark */}
      <div className="shrink-0 flex items-center">
        {markH ? (
          <LuvelleLogoMark height={markH} theme={markTheme} />
        ) : (
          <div className="h-[40px] xs:h-[44px] sm:h-[48px] lg:h-[54px] flex items-center">
            <LuvelleLogoMark
              className="h-full w-auto"
              height={52}
              theme={markTheme}
            />
          </div>
        )}
      </div>

      {showText && (
        <div className="flex flex-col justify-center text-left leading-none tracking-normal">
          {/* Brand Name Wordmark - Substantially larger, bold, authoritative */}
          <div
            className={`font-cinzel font-bold tracking-[0.16em] sm:tracking-[0.18em] uppercase flex items-baseline leading-[1.05] ${
              !textScaleStyle
                ? size === "sm"
                  ? "text-[20px] sm:text-[22px]"
                  : size === "md"
                  ? "text-[23px] sm:text-[26px]"
                  : size === "lg"
                  ? "text-[27px] sm:text-[31px]"
                  : size === "xl"
                  ? "text-[30px] sm:text-[36px] lg:text-[42px]"
                  : "text-[21px] xs:text-[24px] sm:text-[27px] lg:text-[31px]"
                : ""
            }`}
            style={textScaleStyle}
          >
            <span className={luvellColor}>LUVELL</span>
            <span className={goldEColor}>E</span>
          </div>

          {/* Subtitle INTERIORS with delicate hairline rule */}
          <div className="flex items-center gap-2 sm:gap-2.5 mt-1 sm:mt-1.5">
            <div
              className={`font-sans uppercase tracking-[0.34em] sm:tracking-[0.38em] leading-none ${interiorsTextColor} ${
                size === "sm"
                  ? "text-[9.5px] sm:text-[10.5px]"
                  : size === "md"
                  ? "text-[11px] sm:text-[12px]"
                  : size === "lg"
                  ? "text-[12.5px] sm:text-[14px]"
                  : size === "xl"
                  ? "text-[13px] sm:text-[15px] lg:text-[16px]"
                  : "text-[10px] xs:text-[11.5px] sm:text-[12.5px] lg:text-[13.5px]"
              }`}
            >
              INTERIORS
            </div>
            <div
              className={`h-[1.5px] flex-1 min-w-[24px] max-w-[45px] sm:max-w-[75px] ${hairlineRight}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
