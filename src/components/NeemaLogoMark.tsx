"use client";

import React from "react";
import Image from "next/image";

interface NeemaLogoMarkProps {
  className?: string;
  size?: number | string;
}

export default function NeemaLogoMark({
  className = "",
  size = 48,
}: NeemaLogoMarkProps) {
  const widthNum = typeof size === "number" ? size : 48;
  const heightNum = widthNum * 1.15;

  return (
    <div
      style={{ width: `${widthNum}px`, height: `${heightNum}px` }}
      className={`relative shrink-0 select-none inline-block ${className}`}
    >
      {/* 4K Official Standalone Logo Mark Image */}
      <Image
        src="/images/neema-mark.png"
        alt="NEEMA HOMES fingerprint icon mark"
        width={600}
        height={700}
        priority
        className="w-full h-full object-contain filter drop-shadow-sm"
      />
    </div>
  );
}
