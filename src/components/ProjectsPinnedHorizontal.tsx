"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { defaultProjects, ProjectItem } from "@/data/projectsData";

export default function ProjectsPinnedHorizontal() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const triggerEl = triggerRef.current;
    const trackEl = trackRef.current;
    if (!triggerEl || !trackEl) return;

    const cards = gsap.utils.toArray<HTMLElement>(".project-card-node");
    const totalWidth = trackEl.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Horizontal Scroll Animation Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: () => `+=${totalWidth + 1200}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Move track horizontally
      tl.to(trackEl, {
        x: -totalWidth,
        ease: "none",
      });

      // Project Card Scale Transitions: 40% -> 100% -> 40% as they reach center viewport
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.82, opacity: 0.65 },
          {
            scale: 1.0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 85%",
              end: "center center",
              scrub: true,
            },
          }
        );

        gsap.to(card, {
          scale: 0.82,
          opacity: 0.65,
          ease: "power2.in",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: "center center",
            end: "right 15%",
            scrub: true,
          },
        });
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section id="projects" ref={triggerRef} className="relative bg-[#1C1B18] text-[#F9F8F3] overflow-hidden">
      {/* Desktop View: Pinned Horizontal Journey */}
      {!isMobile ? (
        <div className="h-screen w-full flex flex-col justify-between py-12">
          {/* Header */}
          <div className="mx-auto max-w-7xl px-6 lg:px-10 w-full flex justify-between items-end">
            <div>
              <p className="eyebrow text-[#C5A880]">05 · Spatial Journey</p>
              <h2 className="display-1 mt-2 text-[#F9F8F3]">Selected Residences</h2>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs uppercase tracking-widest text-[#F9F8F3]/60">
                SCROLL DOWN TO TRAVEL THROUGH PROJECTS
              </span>
            </div>
          </div>

          {/* Horizontal Track */}
          <div className="relative w-full overflow-hidden flex-1 my-8">
            <div
              ref={trackRef}
              className="flex items-center gap-12 lg:gap-16 px-12 lg:px-20 w-max h-full"
            >
              {defaultProjects.map((project: ProjectItem, idx: number) => (
                <div
                  key={project.id}
                  data-cursor="VIEW"
                  onClick={() => setActiveProject(project)}
                  className="project-card-node relative shrink-0 w-[75vw] max-w-[900px] h-full rounded-2xl overflow-hidden shadow-2xl border border-[#F9F8F3]/15 cursor-pointer group transition-transform duration-500"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B18] via-transparent to-transparent opacity-90" />

                  {/* Project Info Card Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-8 lg:p-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                    <div>
                      <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-xs font-bold tracking-widest uppercase text-[#C5A880] rounded border border-white/10">
                        0{idx + 1} · {project.location}
                      </span>
                      <h3 className="display-2 mt-2 text-[#F9F8F3] font-serif">{project.title}</h3>
                      <p className="mt-2 text-sm text-[#F9F8F3]/80 font-light max-w-lg">
                        {project.roomType}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-full bg-[#C5A880] text-[#1C1B18] text-xs font-bold uppercase tracking-wider group-hover:bg-[#F9F8F3] transition-colors"
                    >
                      Inspect Residence
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Bar */}
          <div className="mx-auto max-w-7xl px-6 lg:px-10 w-full flex justify-between items-center text-xs text-[#F9F8F3]/50">
            <span>01 — 07 RESIDENCES</span>
            <Link href="/projects" className="hover:text-[#C5A880] uppercase tracking-widest transition-colors">
              VIEW FULL PORTFOLIO →
            </Link>
          </div>
        </div>
      ) : (
        /* Mobile Fallback: Vertical Stack with Scale Animations */
        <div className="py-12 px-4 sm:px-6 max-w-xl mx-auto flex flex-col gap-10">
          <div className="text-center">
            <p className="eyebrow text-[#C5A880]">05 · Selected Work</p>
            <h2 className="display-1 mt-2 text-[#F9F8F3]">Residences</h2>
          </div>

          {defaultProjects.map((project: ProjectItem, idx: number) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#F9F8F3]/15 shadow-xl"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-[11px] font-bold text-[#C5A880] uppercase tracking-widest rounded border border-white/10">
                  0{idx + 1} · {project.location}
                </span>
                <h3 className="text-2xl font-serif mt-1">{project.title}</h3>
                <p className="text-xs opacity-80 mt-1">{project.roomType}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Doorway Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative max-w-4xl w-full bg-[#1C1B18] border border-[#C5A880]/30 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-12 text-[#F9F8F3] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#C5A880] hover:text-white cursor-pointer px-3 py-1 bg-[#141312] border border-[#C5A880]/30 rounded-full"
            >
              CLOSE ✕
            </button>

            <span className="eyebrow text-[#C5A880]">{activeProject.location}</span>
            <h2 className="display-1 mt-2">{activeProject.title}</h2>
            <p className="lede mt-4">{activeProject.roomType}</p>
            <p className="mt-6 text-sm text-[#F9F8F3]/80 leading-relaxed">{activeProject.description}</p>

            {activeProject.quote && (
              <blockquote className="mt-6 italic font-serif text-lg text-[#C5A880] border-l-2 border-[#C5A880] pl-4">
                &ldquo;{activeProject.quote}&rdquo;
              </blockquote>
            )}

            <div className="mt-10 flex gap-4">
              <Link href="/contact" className="btn-ink bg-[#C5A880] text-[#1C1B18]">
                Inquire About Similar Residence
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
