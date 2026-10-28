import React from "react";

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
  // Determine height and width maintaining true aspect ratio (577 x 730)
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

  const effectiveWidth = Math.round(effectiveHeight * (577 / 730));

  // Select radiant gold for dark backgrounds, and rich antique bronze for light backgrounds
  const isGold = theme === "gold" || theme === "dark";
  const markSrc =
    variant === "image"
      ? isGold
        ? "/images/luvelle-mark-gold.png"
        : "/images/luvelle-mark.png"
      : isGold
      ? "/images/luvelle-mark-gold.svg"
      : "/images/luvelle-mark.svg";

  return (
    <div
      style={{ width: `${effectiveWidth}px`, height: `${effectiveHeight}px` }}
      className={`relative shrink-0 select-none inline-flex items-center justify-center transition-transform duration-300 ${className}`}
    >
      <img
        src={markSrc}
        alt="LUVELLE INTERIORS architectural mark"
        width={effectiveWidth}
        height={effectiveHeight}
        className="w-full h-full object-contain filter drop-shadow-sm pointer-events-none select-none"
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
