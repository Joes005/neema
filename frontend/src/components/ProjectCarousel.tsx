"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const projectImages = [
  "/images/project-foyer.jpg",
  "/images/project-dining.jpg",
  "/images/hero-living.jpg",
  "/images/project-bedroom.jpg",
  "/images/project-kitchen.jpg",
  "/images/project-bath.jpg",
  "/images/project-foyer.jpg",
  "/images/project-dining.jpg",
  "/images/project-wardrobe.jpg",
  "/images/project-foyer.jpg",
  "/images/project-dining.jpg",
  "/images/hero-living.jpg",
  "/images/project-bedroom.jpg",
  "/images/project-kitchen.jpg",
  "/images/project-bath.jpg",
  "/images/project-foyer.jpg",
  "/images/project-dining.jpg",
  "/images/project-wardrobe.jpg",
];

export default function ProjectCarousel() {
  return (
    <section className="overflow-hidden bg-[#F9F8F3] text-[#1C1B18] py-12 sm:py-20 lg:py-28">
      {/* Centered Heading */}
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <p className="eyebrow-ink">Selected work</p>
        <h2 className="display-1 mt-6">Residences, room by room.</h2>
        <p className="mt-6 font-serif text-xl italic text-[#1C1B18]/80">
          The home you deserve has not been built yet.
        </p>
      </div>

      {/* 3D Cylindrical Rotating Carousel */}
      <div
        className="grid w-full place-items-center overflow-hidden mt-10 h-[clamp(480px,58vh,600px)] min-h-0 relative"
        style={{
          perspective: "35em",
          maskImage: "linear-gradient(90deg, transparent, #000 10% 90%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10% 90%, transparent)",
        }}
      >
        <div
          className="grid place-items-center [transform-style:preserve-3d]"
          style={
            {
              "--n": 18,
              "--w": "min(280px, 70vw)",
              "--ba": "calc(1turn / var(--n))",
              "--anim-dur": "32s",
              animation: "ry var(--anim-dur) linear infinite",
            } as React.CSSProperties
          }
        >
          <style>{`@keyframes ry { to { transform: rotateY(1turn); } }`}</style>
          {projectImages.map((src, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden [backface-visibility:hidden] [grid-area:1/1] relative"
              style={
                {
                  width: "var(--w)",
                  aspectRatio: "7/10",
                  "--i": idx,
                  transform:
                    "rotateY(calc(var(--i) * var(--ba))) translateZ(calc(-1 * (0.5 * var(--w) + 0.5em) / tan(0.5 * var(--ba))))",
                } as React.CSSProperties
              }
            >
              <Image
                src={src}
                alt={`Carousel project image ${idx}`}
                fill
                sizes="340px"
                className="rounded-2xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Subtext and Scribble Link Buttons */}
      <div className="mx-auto mt-16 max-w-2xl px-6 text-center lg:px-10">
        <p className="lede">
          We design and deliver private residences from a blank page: no templates, no repeated layouts, no shortcuts.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
          <Link
            className="link-hover link-hover--scribble text-[13px] font-bold uppercase tracking-[0.16em]"
            href="/contact"
          >
            <span>Request a consultation</span>
            <svg
              className="link-hover__graphic link-hover__graphic--stroke link-hover__graphic--scribble"
              width="100%"
              height="9"
              viewBox="0 0 101 9"
            >
              <path
                d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294"
                pathLength="1"
              ></path>
            </svg>
          </Link>
          <Link
            className="link-hover link-hover--scribble text-[13px] font-bold uppercase tracking-[0.16em]"
            href="/projects"
          >
            <span>See projects</span>
            <svg
              className="link-hover__graphic link-hover__graphic--stroke link-hover__graphic--scribble"
              width="100%"
              height="9"
              viewBox="0 0 101 9"
            >
              <path
                d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294"
                pathLength="1"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}


