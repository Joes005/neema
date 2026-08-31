import InitialLoader from "@/components/InitialLoader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStatement from "@/components/BrandStatement";
import StudioSection from "@/components/StudioSection";
import ProjectCarousel from "@/components/ProjectCarousel";
import MaterialExplorer from "@/components/MaterialExplorer";
import EditorialSection from "@/components/EditorialSection";
import JoinerySection from "@/components/JoinerySection";
import FinishSection from "@/components/FinishSection";
import ConsultationCTA from "@/components/ConsultationCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative z-0 bg-[#1C1B18]">
      <div className="relative z-10 bg-[#F9F8F3] text-[#1C1B18] min-h-screen flex flex-col overflow-x-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        {/* 1. Initial Page Load Layer */}
        <InitialLoader />

        {/* 2. Global Header / Navigation */}
        <Navbar />

        <main className="flex-1">
          {/* 3. Hero Section */}
          <Hero />

          {/* 4. Brand Statement (Clarity, Conviction, Craft, Character) */}
          <BrandStatement />

          {/* 5. Studio Section & Principles */}
          <StudioSection />

          {/* 6. Selected Work (Room by Room Carousel) */}
          <ProjectCarousel />

          {/* 7. Materials Showcase */}
          <MaterialExplorer />

          {/* 8. Materials & Specialists Editorial */}
          <EditorialSection />

          {/* 9. Joinery & Millwork Section */}
          <JoinerySection />

          {/* 10. Finishes Section */}
          <FinishSection />

          {/* 11. Consultation CTA */}
          <ConsultationCTA />
        </main>
      </div>

      {/* 12. Dark Footer (Reveal Effect) */}
      <Footer />
    </div>
  );
}

