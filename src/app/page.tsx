"use client";

import React, { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ChapterTracker from "@/components/ChapterTracker";
import InitialLoader from "@/components/InitialLoader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStatement from "@/components/BrandStatement";
import StudioSection from "@/components/StudioSection";
import SpatialServices from "@/components/SpatialServices";
import ProjectsPinnedHorizontal from "@/components/ProjectsPinnedHorizontal";
import MaterialStoryteller from "@/components/MaterialStoryteller";
import BeforeAfterScroll from "@/components/BeforeAfterScroll";
import EditorialSection from "@/components/EditorialSection";
import ConsultationCTA from "@/components/ConsultationCTA";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SmoothScroll>
      {/* Contextual Cursor & Progress Tracker */}
      <CustomCursor />
      <ChapterTracker />

      <div className="relative z-0 bg-[#1C1B18]">
        <div className="relative z-10 bg-[#F9F8F3] text-[#1C1B18] min-h-screen flex flex-col overflow-x-clip shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
          {/* 1. Initial Page Load Layer */}
          <InitialLoader onComplete={() => setIsLoaded(true)} />

          {/* 2. Global Header / Navigation */}
          <Navbar />

          <main className="flex-1">
            {/* 3. Hero Section (Camera Zoom-Through Entrance) */}
            <Hero isLoaded={isLoaded} />

            {/* 4. Brand Statement (Editorial Words) */}
            <BrandStatement />

            {/* 5. Studio Intro */}
            <StudioSection />

            {/* 7. Spatial Services Chapters */}
            <SpatialServices />

            {/* 8. Selected Work (Pinned Horizontal Journey & Scale Transitions) */}
            <ProjectsPinnedHorizontal />

            {/* 9. Tactile Material Sensory Storytelling */}
            <MaterialStoryteller />

            {/* 10. Scroll-Driven Before / After Transformation */}
            <BeforeAfterScroll />

            {/* 11. Design & Execution Pillars */}
            <EditorialSection />

            {/* 12. Consultation CTA */}
            <ConsultationCTA />
          </main>
        </div>

        {/* 13. Dark Footer Reveal */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
