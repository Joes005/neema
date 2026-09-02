"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, X, Maximize2, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface ProjectItem {
  id: number;
  title: string;
  category: "LIVING" | "KITCHEN" | "BEDROOM" | "BATH" | "JOINERY";
  location: string;
  src: string;
  spanClasses: string; // Tailored col & row spans for 100% gapless bento packing
  description: string;
  isFeatured?: boolean;
}

const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: "Double-Height Zen Living",
    category: "LIVING",
    location: "ECR Seaside, Chennai",
    src: "/images/hero-living.jpg",
    spanClasses: "col-span-1 md:col-span-2 row-span-2",
    description: "Expansive double-height living room featuring warm oak panelling, integrated ambient cove lighting, and custom low-slung seating."
  },
  {
    id: 2,
    title: "Architectural Marble Kitchen",
    category: "KITCHEN",
    location: "Nungambakkam",
    src: "/images/project-kitchen.jpg",
    spanClasses: "col-span-1 md:col-span-2 row-span-2",
    description: "Monolithic quartzite island with dark graphite matte cabinetry, flush appliances, and concealed pantry access."
  },
  {
    id: 3,
    title: "Primary Master Suite",
    category: "BEDROOM",
    location: "Boat Club Avenue",
    src: "/images/project-bedroom.jpg",
    spanClasses: "col-span-1 md:col-span-2 row-span-2",
    description: "Serene bedroom sanctuary wrapped in fluted timber walls, tactile linen upholstery, and architectural recessed illumination."
  },
  {
    id: 4,
    title: "Bespoke Dining Pavilion",
    category: "LIVING",
    location: "Poes Garden",
    src: "/images/project-dining.jpg",
    spanClasses: "col-span-1 md:col-span-3 row-span-2",
    description: "Custom brass brassier pendant lighting suspended over an 8-seater travertine dining table with full-height garden glass."
  },
  {
    id: 5,
    title: "Walk-in Wardrobe System",
    category: "JOINERY",
    location: "Harrington Road",
    src: "/images/project-wardrobe.jpg",
    spanClasses: "col-span-1 md:col-span-3 row-span-2",
    description: "Bronze-framed glass wardrobes with sensor-activated warm interior lighting, leather drawer inserts, and velvet display trays."
  },
  {
    id: 6,
    title: "Grand Entrance Foyer",
    category: "LIVING",
    location: "RA Puram",
    src: "/images/project-foyer.jpg",
    spanClasses: "col-span-1 md:col-span-2 row-span-2",
    description: "Statuary marble floor inlay paired with vertical fluted teak wall panels and sculptural accent pedestals."
  },
  {
    id: 7,
    title: "Sanctuary Spa Bathroom",
    category: "BATH",
    location: "Alwarpet",
    src: "/images/project-bath.jpg",
    spanClasses: "col-span-1 md:col-span-2 row-span-2",
    description: "Freestanding stone soak tub set against backlit travertine walls and warm oak vanity joinery."
  },
  {
    id: 8,
    title: "Private Cinema & Lounge",
    category: "LIVING",
    location: "Kotturpuram",
    src: "/images/project_theater.png",
    spanClasses: "col-span-1 md:col-span-2 row-span-2",
    description: "Acoustically optimized private lounge with plush velvet seating, dark timber wall baffles, and starburst ceiling lights."
  },
  {
    id: 9,
    title: "Artisan Wood Workshop",
    category: "JOINERY",
    location: "Adyar Studio",
    src: "/images/spatial_joinery.png",
    spanClasses: "col-span-1 md:col-span-3 row-span-2",
    description: "Handcrafted millwork and custom furniture detailing crafted by master wood artisans."
  },
  {
    id: 10,
    title: "Gourmet Marble Kitchen & Bar",
    category: "KITCHEN",
    location: "Boat Club",
    src: "/images/project_bedroom.png",
    spanClasses: "col-span-1 md:col-span-3 row-span-2",
    description: "Integrated breakfast counter bar with fluted glass cabinetry and brushed brass accents.",
    isFeatured: true
  }
];

const categories = ["ALL", "LIVING", "KITCHEN", "BEDROOM", "JOINERY", "BATH"] as const;

export default function ProjectsCollage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter items according to tab selection
  const filteredProjects = activeCategory === "ALL" 
    ? projectsData 
    : projectsData.filter(p => p.category === activeCategory);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Smooth scroll parallax batch animation
      const cards = gsap.utils.toArray<HTMLElement>(".bento-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  // Handle 3D Mouse Movement & Dynamic Spotlight Tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    // Set CSS custom variables for radial spotlight gradient
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.025,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section 
      ref={containerRef} 
      className="py-16 md:py-24 px-4 lg:px-10 max-w-[1440px] mx-auto"
    >
      {/* Category Filter Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${
                isActive
                  ? "bg-[#1C1B18] text-[#F9F8F3] shadow-lg shadow-[#1C1B18]/20"
                  : "bg-white/80 text-[#1C1B18]/70 hover:bg-[#1C1B18]/10 hover:text-[#1C1B18] border border-[#1C1B18]/10"
              }`}
            >
              {cat === "ALL" ? "ALL PROJECTS" : cat}
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#C5A880] rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 100% Gapless Interlocking Bento Grid Matrix */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-6 auto-rows-[200px] md:auto-rows-[220px] gap-4 md:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onMouseMove={(e) => handleMouseMove(e, item.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => setSelectedProject(item)}
              className={`bento-card relative rounded-xl overflow-hidden shadow-md group cursor-pointer border border-[#1C1B18]/10 bg-[#1C1B18] ${item.spanClasses}`}
              style={{ transformStyle: "preserve-3d", willChange: "transform" }}
            >
              {/* Dynamic Interactive Mouse Spotlight Layer */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(197, 168, 128, 0.25), transparent 80%)`,
                }}
              />

              {/* Background Image */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Dark Gradient Overlay for High Contrast Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

              {/* Featured Badge (if applicable) */}
              {item.isFeatured && (
                <div className="absolute top-4 left-4 z-10 flex items-center space-x-1.5 px-3 py-1 bg-[#C5A880] text-[#1C1B18] text-[9px] font-bold tracking-[0.2em] uppercase rounded-full shadow-md">
                  <Sparkles className="w-3 h-3" />
                  <span>FEATURED RESIDENCE</span>
                </div>
              )}

              {/* Top Right Zoom Icon Indicator */}
              <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300 group-hover:bg-[#C5A880] group-hover:text-[#1C1B18] text-white">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Content Info Block */}
              <div className="absolute bottom-5 left-5 right-5 z-10 text-white pointer-events-none flex items-end justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 bg-white/10 backdrop-blur-sm text-[9px] font-semibold tracking-[0.2em] uppercase text-[#C5A880] rounded border border-white/10 mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg md:text-xl font-normal leading-tight group-hover:text-[#F9F8F3] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#C5A880] font-mono tracking-wider mt-1 opacity-90">
                    {item.location}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#C5A880] group-hover:text-[#1C1B18] transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Full-Screen Project Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#1C1B18] text-[#F9F8F3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#C5A880] hover:text-[#1C1B18] transition-colors duration-300 border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image View */}
              <div className="relative lg:col-span-7 h-[300px] sm:h-[400px] lg:h-[550px] w-full">
                <Image
                  src={selectedProject.src}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Modal Details Section */}
              <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-[#1C1B18]">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 bg-[#C5A880]/20 text-[#C5A880] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full border border-[#C5A880]/30">
                      {selectedProject.category}
                    </span>
                    <span className="text-xs text-white/50 font-mono tracking-wider">
                      {selectedProject.location}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl md:text-3xl font-light leading-snug mb-4">
                    {selectedProject.title}
                  </h2>

                  <div className="w-12 h-[1px] bg-[#C5A880] mb-6" />

                  <p className="text-sm text-white/80 font-light leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-2 border-t border-white/10 pt-4 text-xs text-white/60">
                    <div className="flex justify-between">
                      <span>Architectural Studio:</span>
                      <span className="text-white font-medium">NEEMA HOMES</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scope:</span>
                      <span className="text-white font-medium">Interior Architecture & Joinery</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-full py-3.5 bg-[#C5A880] text-[#1C1B18] text-xs font-semibold tracking-[0.2em] uppercase rounded hover:bg-white transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>REQUEST COMPARABLE WORK</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
