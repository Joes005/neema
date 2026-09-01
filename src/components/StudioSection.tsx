"use client";

import React from "react";
import Link from "next/link";
import StudioCarousel from "./StudioCarousel";

export default function StudioSection() {
  return (
    <>
      {/* SCENE 04 — STUDIO INTRO */}
      <section id="studio" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28 text-[#1C1B18] bg-[#F9F8F3]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow-ink">The studio</p>
            <div className="rule-beige mt-5"></div>
            <h2 className="display-2 mt-8">
              A premium residential interior design and execution studio serving Chennai and its surrounding areas.
            </h2>
            <p className="lede mt-8">
              NEEMA HOMES creates personalised residences for projects typically valued between ₹25 lakh and ₹1 crore, combining in-house design and execution with transparent decisions, carefully selected specialists and rigorous quality control.
            </p>
            <div className="mt-10">
              <Link
                className="link-hover link-hover--scribble text-[13px] font-bold uppercase tracking-[0.16em] text-[#1C1B18]"
                href="/studio"
              >
                <span>About the studio</span>
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
          <div className="relative w-full overflow-visible">
            <StudioCarousel />
          </div>
        </div>
      </section>

      {/* SCENE 05 — STUDIO PRINCIPLES */}
      <section className="border-y border-[#E5E1D8] bg-[#F2EFE9] text-[#1C1B18]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
            <article className="border-t border-[#E5E1D8] pt-8">
              <p className="eyebrow text-[#C5A880]">01</p>
              <h3 className="mt-5 font-serif text-2xl">Personalised by design</h3>
              <p className="mt-4 text-base leading-relaxed text-[#66635B]">
                Every person and every residence is unique. The plan begins with how you actually live, not with a template.
              </p>
            </article>
            <article className="border-t border-[#E5E1D8] pt-8">
              <p className="eyebrow text-[#C5A880]">02</p>
              <h3 className="mt-5 font-serif text-2xl">Design and execution in one house</h3>
              <p className="mt-4 text-base leading-relaxed text-[#66635B]">
                Drawings and delivery sit under one roof, so intent survives the site. Nothing is handed off and diluted.
              </p>
            </article>
            <article className="border-t border-[#E5E1D8] pt-8">
              <p className="eyebrow text-[#C5A880]">03</p>
              <h3 className="mt-5 font-serif text-2xl">Transparent decisions</h3>
              <p className="mt-4 text-base leading-relaxed text-[#66635B]">
                Specifications, selections and costs are made visible before work begins, and stay visible while it runs.
              </p>
            </article>
            <article className="border-t border-[#E5E1D8] pt-8">
              <p className="eyebrow text-[#C5A880]">04</p>
              <h3 className="mt-5 font-serif text-2xl">Rigorous quality control</h3>
              <p className="mt-4 text-base leading-relaxed text-[#66635B]">
                Carefully selected specialists work to defined checks at every stage, from carcass to final finish.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}


