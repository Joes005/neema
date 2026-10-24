import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./app/page";
import ProjectsPage from "./app/projects/page";
import ServicesPage from "./app/services/page";
import GalleryPage from "./app/gallery/page";
import ProcessPage from "./app/process/page";
import StudioPage from "./app/studio/page";
import ContactPage from "./app/contact/page";

import SmoothScroll from "./components/SmoothScroll";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AdminRedirect() {
  useEffect(() => {
    window.location.replace("/admin");
  }, []);
  return (
    <div className="min-h-screen bg-[#141311] flex flex-col items-center justify-center text-[#F9F8F3]">
      <div className="w-10 h-10 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="font-serif text-lg tracking-wider text-[#C5A880]">Opening Studio CMS Manager...</p>
      <p className="text-xs text-[#F9F8F3]/50 font-mono mt-1">Connecting to backend administration panel</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminRedirect />} />
          <Route path="/admin/*" element={<AdminRedirect />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}
