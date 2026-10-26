import React, { useId } from "react";

interface LuvelleLogoMarkProps {
  className?: string;
  size?: number | string;
  height?: number | string;
  variant?: "svg" | "image";
  theme?: "gold" | "dark" | "light" | "bronze" | "currentColor";
}

export default function LuvelleLogoMark({
  className = "",
  size,
  height,
  variant = "svg",
  theme = "gold",
}: LuvelleLogoMarkProps) {
  const gradientId = useId().replace(/:/g, "_");

  // Determine height and width
  const effectiveHeight =
    height !== undefined
      ? typeof height === "number"
        ? height
        : parseInt(height as string, 10) || 48
      : size !== undefined
      ? typeof size === "number"
        ? size
        : parseInt(size as string, 10) || 48
      : 48;

  const effectiveWidth = Math.round(effectiveHeight * 0.723);

  if (variant === "image") {
    return (
      <div
        style={{ width: `${effectiveWidth}px`, height: `${effectiveHeight}px` }}
        className={`relative shrink-0 select-none inline-block ${className}`}
      >
        <img
          src="/images/luvelle-mark.png"
          alt="LUVELLE INTERIORS architectural mark"
          width={effectiveWidth}
          height={effectiveHeight}
          className="w-full h-full object-contain filter drop-shadow-sm"
          loading="eager"
        />
      </div>
    );
  }

  // Gradients for Dark (Gold) and Light (Deep Burnished Bronze) themes
  const isLightBg = theme === "dark" || theme === "bronze";
  const strokeUrl = `url(#grad_${gradientId})`;
  const strokeColor =
    theme === "currentColor"
      ? "currentColor"
      : theme === "light"
      ? "#F9F8F3"
      : strokeUrl;

  return (
    <div
      style={{ width: `${effectiveWidth}px`, height: `${effectiveHeight}px` }}
      className={`relative shrink-0 select-none inline-flex items-center justify-center transition-transform duration-300 ${className}`}
    >
      <svg
        viewBox="42 22 128 177"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)]"
        aria-hidden="true"
        shapeRendering="geometricPrecision"
      >
        <defs>
          {isLightBg ? (
            /* High-contrast deep antique bronze for light/cream backgrounds (contrast > 5.5:1) */
            <linearGradient id={`grad_${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B38538" />
              <stop offset="35%" stopColor="#966C24" />
              <stop offset="70%" stopColor="#7A5215" />
              <stop offset="100%" stopColor="#5E3C0B" />
            </linearGradient>
          ) : (
            /* Luminous radiant champagne gold for dark backgrounds & hero overlays */
            <linearGradient id={`grad_${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF7E6" />
              <stop offset="20%" stopColor="#F5DC9E" />
              <stop offset="60%" stopColor="#D4B685" />
              <stop offset="100%" stopColor="#A88242" />
            </linearGradient>
          )}
        </defs>

        {/* Outer Arch */}
        <path
          d="M 46 80 A 54 54 0 0 1 154 80 V 195"
          stroke={strokeColor}
          strokeWidth="4.5"
        />

        {/* Architectural Fluting Right Line */}
        <line
          x1="166"
          y1="66"
          x2="166"
          y2="195"
          stroke={strokeColor}
          strokeWidth="4.2"
        />

        {/* Inner Arch */}
        <path
          d="M 62 80 A 38 38 0 0 1 138 80 V 156"
          stroke={strokeColor}
          strokeWidth="3.6"
        />

        {/* Pendant Cord */}
        <line
          x1="100"
          y1="42"
          x2="100"
          y2="88"
          stroke={strokeColor}
          strokeWidth="3.2"
        />

        {/* Pendant Lamp Shade */}
        <path
          d="M 94 88 C 94 86 106 86 106 88 L 116 104 C 116 107 84 107 84 104 Z"
          stroke={strokeColor}
          strokeWidth="3.4"
        />

        {/* Bulb */}
        <circle
          cx="100"
          cy="107"
          r="3.5"
          stroke={strokeColor}
          strokeWidth="2.4"
        />

        {/* Armchair: Left High Back & Curved Wing */}
        <path
          d="M 62 142 C 64 135 73 134 78 139 C 83 144 98 152 114 154"
          stroke={strokeColor}
          strokeWidth="3.6"
        />

        {/* Armchair: Seat Cushion Surface */}
        <path
          d="M 62 162 C 78 159 104 159 126 161"
          stroke={strokeColor}
          strokeWidth="3.2"
        />

        {/* Armchair: Lower Cushion / Apron */}
        <path
          d="M 62 172 C 82 172 110 172 134 172"
          stroke={strokeColor}
          strokeWidth="3.2"
        />

        {/* Armchair: Right Bolster Armrest */}
        <path
          d="M 114 154 C 124 153 134 156 136 162 C 138 168 135 172 126 172"
          stroke={strokeColor}
          strokeWidth="3.2"
        />

        {/* Armchair Plinth / Base Feet */}
        <line
          x1="70"
          y1="172"
          x2="70"
          y2="195"
          stroke={strokeColor}
          strokeWidth="3.6"
        />
        <line
          x1="128"
          y1="172"
          x2="128"
          y2="195"
          stroke={strokeColor}
          strokeWidth="3.6"
        />

        {/* Floor Base Line */}
        <line
          x1="46"
          y1="195"
          x2="154"
          y2="195"
          stroke={strokeColor}
          strokeWidth="4.5"
        />
      </svg>
    </div>
  );
}
