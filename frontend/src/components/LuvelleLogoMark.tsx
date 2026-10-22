import React from "react";

interface LuvelleLogoMarkProps {
  className?: string;
  size?: number | string;
  variant?: "svg" | "image";
  theme?: "gold" | "dark" | "light" | "currentColor";
}

export default function LuvelleLogoMark({
  className = "",
  size = 48,
  variant = "image",
  theme = "gold",
}: LuvelleLogoMarkProps) {
  const widthNum = typeof size === "number" ? size : parseInt(size as string, 10) || 48;
  const heightNum = Math.round(widthNum * 1.1);

  if (variant === "image") {
    return (
      <div
        style={{ width: `${widthNum}px`, height: `${heightNum}px` }}
        className={`relative shrink-0 select-none inline-block ${className}`}
      >
        <img
          src="/images/luvelle-mark.png"
          alt="LUVELLE INTERIORS architectural mark"
          width={widthNum}
          height={heightNum}
          className="w-full h-full object-contain filter drop-shadow-sm"
          loading="eager"
        />
      </div>
    );
  }

  // Choose stroke / gradient
  const strokeColor =
    theme === "currentColor"
      ? "currentColor"
      : theme === "dark"
      ? "#1C1B18"
      : theme === "light"
      ? "#F9F8F3"
      : "url(#luvelleGoldMarkGrad)";

  return (
    <div
      style={{ width: `${widthNum}px`, height: `${heightNum}px` }}
      className={`relative shrink-0 select-none inline-block transition-transform duration-300 ${className}`}
    >
      <svg
        viewBox="0 0 200 220"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(197,168,128,0.18)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="luvelleGoldMarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E4C3" />
            <stop offset="35%" stopColor="#D4BC84" />
            <stop offset="70%" stopColor="#B8975A" />
            <stop offset="100%" stopColor="#8E6E36" />
          </linearGradient>
        </defs>

        {/* Outer Arch */}
        <path
          d="M 46 80 A 54 54 0 0 1 154 80 V 195"
          stroke={strokeColor}
          strokeWidth="2.6"
        />

        {/* Architectural Fluting Right Line */}
        <line
          x1="166"
          y1="66"
          x2="166"
          y2="195"
          stroke={strokeColor}
          strokeWidth="2.6"
        />

        {/* Inner Arch */}
        <path
          d="M 62 80 A 38 38 0 0 1 138 80 V 156"
          stroke={strokeColor}
          strokeWidth="2.2"
        />

        {/* Pendant Cord */}
        <line
          x1="100"
          y1="42"
          x2="100"
          y2="88"
          stroke={strokeColor}
          strokeWidth="2.0"
        />

        {/* Pendant Lamp Shade */}
        <path
          d="M 94 88 C 94 86 106 86 106 88 L 116 104 C 116 107 84 107 84 104 Z"
          stroke={strokeColor}
          strokeWidth="2.0"
        />

        {/* Bulb */}
        <circle
          cx="100"
          cy="107"
          r="2.8"
          stroke={strokeColor}
          strokeWidth="1.6"
        />

        {/* Armchair: Left High Back & Curved Wing */}
        <path
          d="M 62 142 C 64 135 73 134 78 139 C 83 144 98 152 114 154"
          stroke={strokeColor}
          strokeWidth="2.2"
        />

        {/* Armchair: Seat Cushion Surface */}
        <path
          d="M 62 162 C 78 159 104 159 126 161"
          stroke={strokeColor}
          strokeWidth="2.0"
        />

        {/* Armchair: Lower Cushion / Apron */}
        <path
          d="M 62 172 C 82 172 110 172 134 172"
          stroke={strokeColor}
          strokeWidth="2.0"
        />

        {/* Armchair: Right Bolster Armrest */}
        <path
          d="M 114 154 C 124 153 134 156 136 162 C 138 168 135 172 126 172"
          stroke={strokeColor}
          strokeWidth="2.0"
        />

        {/* Armchair Plinth / Base Feet */}
        <line
          x1="70"
          y1="172"
          x2="70"
          y2="195"
          stroke={strokeColor}
          strokeWidth="2.2"
        />
        <line
          x1="128"
          y1="172"
          x2="128"
          y2="195"
          stroke={strokeColor}
          strokeWidth="2.2"
        />

        {/* Floor Base Line */}
        <line
          x1="46"
          y1="195"
          x2="154"
          y2="195"
          stroke={strokeColor}
          strokeWidth="2.6"
        />
      </svg>
    </div>
  );
}
