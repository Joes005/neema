"use client";

import React from "react";
import Image from "next/image";
import NeemaLogoMark from "./NeemaLogoMark";

interface NeemaLogoProps {
  className?: string;
  markSize?: number;
  height?: number;
  showText?: boolean;
  layout?: "horizontal" | "vertical";
  variant?: "image" | "custom";
}

export default function NeemaLogo({
  className = "",
  markSize = 44,
  height = 42,
  showText = true,
  variant = "image",
}: NeemaLogoProps) {
  if (variant === "image" && showText) {
    return (
      <div
        className={`inline-flex items-center shrink-0 select-none ${className}`}
        style={{ height: `${height}px` }}
      >
        {/* 4K Official High-Resolution Metallic Gold Transparent Logo Image */}
        <Image
          src="/images/neema-logo.png"
          alt="NEEMA HOMES logo"
          width={500}
          height={200}
          priority
          className="h-full w-auto object-contain filter drop-shadow-sm"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      <NeemaLogoMark size={markSize} />
      {showText && (
        <div className="flex flex-col justify-center text-left leading-[1.05] tracking-[0.25em] uppercase font-sans">
          <span className="font-sans text-[1.1em] font-normal text-[#C5A880]">
            NEEMA
          </span>
          <span className="font-sans text-[1.1em] font-normal text-[#C5A880]">
            HOMES
          </span>
        </div>
      )}
    </div>
  );
}
