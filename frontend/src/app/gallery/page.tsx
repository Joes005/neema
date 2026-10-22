import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "@/components/ui/Image";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, RefreshCw, Sparkles, Layers, SlidersHorizontal } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

export interface GalleryItem {
  id: number | string;
  title: string;
  category: string;
  image_url?: string;
  src?: string;
  image?: string;
  description?: string;
  quote?: string;
  span_classes?: string;
  spanClasses?: string;
  is_featured?: boolean;
}

const fallbackGallery: GalleryItem[] = [
  {
    id: 1,
    title: "Double-Height Zen Living",
    category: "LIVING",
    src: "/images/hero-living.jpg",
    spanClasses: "col-span-1 md:col-span-2 row-span-2",
    description: "Expansive double-height living room featuring warm oak panelling, integrated ambient cove lighting, and custom low-slung seating.",
    quote: "Proportions tuned to coastal light and natural airflow."
  },
  {
    id: 2,
    title: "Architectural Marble Kitchen",
    category: "KITCHEN",
    src: "/images/project-kitchen.jpg",
    spanClasses: "col-span-1 md:col-span-2 row-span-2",
    description: "Monolithic quartzite island with dark graphite matte cabinetry, flush appliances, and concealed pantry access.",
    quote: "Precision engineering meets quiet architectural minimalism."
  },
  {
    id: 3,
    title: "Primary Master Suite",
    category: "BEDROOM",
    src: "/images/project-bedroom.jpg",
    spanClasses: "col-span-1 md:col-span-2 row-span-2",
    description: "Serene bedroom sanctuary wrapped in fluted timber walls, tactile linen upholstery, and architectural recessed illumination.",
    quote: "A restful atmosphere built around texture and light."
  },
  {
    id: 4,
    title: "Bespoke Dining Pavilion",
    category: "LIVING",
    src: "/images/project-dining.jpg",
    spanClasses: "col-span-1 md:col-span-3 row-span-2",
    description: "Custom brass pendant lighting suspended over an 8-seater travertine dining table with full-height garden glass.",
    quote: "A center for slow meals and unhurried conversation."
  },
  {
    id: 5,
    title: "Walk-in Wardrobe System",
    category: "JOINERY",
    src: "/images/project-wardrobe.jpg",
    spanClasses: "col-span-1 md:col-span-3 row-span-2",
    description: "Bronze-framed glass wardrobes with sensor-activated warm interior lighting, leather drawer inserts, and velvet display trays.",
    quote: "Storage designed like a luxury boutique display."
  },
  {
    id: 6,
    title: "Grand Entrance Foyer",
    category: "LIVING",
    src: "/images/project-foyer.jpg",
    spanClasses: "col-span-1 md:col-span-2 row-span-2",
    description: "Statuary marble floor inlay paired with vertical fluted teak wall panels and sculptural accent pedestals.",
    quote: "An entrance designed to calm the mind immediately upon arrival."
  },
  {
    id: 7,
    title: "Sanctuary Spa Bathroom",
    category: "BATH",
    src: "/images/project-bath.jpg",
    spanClasses: "col-span-1 md:col-span-2 row-span-2",
    description: "Freestanding stone soak tub set against backlit travertine walls and warm oak vanity joinery.",
    quote: "Daily rituals elevated by tactile natural stone."
  },
  {
    id: 8,
    title: "Private Cinema & Lounge",
    category: "LIVING",
    src: "/images/project_theater.png",
    spanClasses: "col-span-1 md:col-span-2 row-span-2",
    description: "Acoustically optimized private lounge with plush velvet seating, dark timber wall baffles, and starburst ceiling lights.",
    quote: "Immersive acoustic comfort and atmospheric warmth."
  },
  {
    id: 9,
    title: "Artisan Wood Workshop",
    category: "JOINERY",
    src: "/images/artisan_workshop.png",
    spanClasses: "col-span-1 md:col-span-3 row-span-2",
    description: "Handcrafted millwork and custom furniture detailing crafted by master wood artisans.",
    quote: "Crafted by master hands with precision joinery."
  },
  {
    id: 10,
    title: "Gourmet Marble Kitchen & Bar",
    category: "KITCHEN",
    src: "/images/spatial_joinery.png",
    spanClasses: "col-span-1 md:col-span-3 row-span-2",
    description: "Integrated breakfast counter bar with fluted glass cabinetry and brushed brass accents.",
    quote: "The social core of a contemporary residence."
  }
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(fallbackGallery);
  const [loading, setLoading] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [lastSynced, setLastSynced] = useState<string>("");

  const fetchGallery = async () => {
    setLoading(true);
    try {
      // Try configured API_BASE_URL and localhost fallbacks
      const targetUrls = [
        `${API_BASE_URL}/api/gallery`,
        "http://127.0.0.1:8000/api/gallery",
        "http://localhost:8000/api/gallery"
      ];

      let fetchedData: GalleryItem[] | null = null;
      for (const url of targetUrls) {
        try {
          const res = await fetch(url, { headers: { Accept: "application/json" } });
          if (res.ok) {
            const json = await res.json();
            if (json.success && Array.isArray(json.data) && json.data.length > 0) {
              fetchedData = json.data;
              setIsLiveConnected(true);
              break;
            }
          }
        } catch {
          // try next
        }
      }

      if (fetchedData && fetchedData.length > 0) {
        setItems(fetchedData);
        setLastSynced(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      }
    } catch {
      // Keep existing items
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Compute dynamic categories
  const categories = ["ALL", ...Array.from(new Set(items.map((i) => i.category.toUpperCase())))];

  const filteredItems = activeCategory === "ALL" 
    ? items 
    : items.filter((i) => i.category.toUpperCase() === activeCategory);

  return (
    <div className="relative z-0 bg-[#1C1B18]">
      <div className="relative z-10 bg-[#F9F8F3] text-[#1C1B18] min-h-screen flex flex-col overflow-x-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        <Navbar />

        <main className="flex-1">
          {/* Header Section */}
          <section className="pt-28 sm:pt-36 pb-12 lg:pb-16 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto border-b border-[#1C1B18]/10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="eyebrow text-[#71552F]">STUDIO GALLERY</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#C5A880]/15 text-[#8E6E36] border border-[#C5A880]/30">
                    <span className={`w-1.5 h-1.5 rounded-full ${isLiveConnected ? "bg-emerald-500 animate-pulse" : "bg-[#C5A880]"}`} />
                    {isLiveConnected ? "Backend Sync Active" : "Studio Archive"}
                  </span>
                </div>
                <h1 className="display-1 text-[#1C1B18] max-w-3xl leading-[1.08]">
                  Curated Spatial Archive
                </h1>
                <p className="mt-4 sm:mt-5 max-w-2xl text-[#1C1B18]/80 text-[14px] sm:text-[15px] font-normal leading-relaxed">
                  A continuously updated collection of residential interior commissions, bespoke joinery details, and spatial executions — synced live with our backend management system.
                </p>
              </div>

              {/* Sync / Refresh Button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={fetchGallery}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1C1B18] text-[#F9F8F3] hover:bg-[#C5A880] hover:text-[#1C1B18] transition-all text-xs font-bold uppercase tracking-wider disabled:opacity-50 cursor-pointer shadow-md"
                  title="Pull newly added images from the backend"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                  <span>{loading ? "Syncing..." : "Sync Gallery"}</span>
                </button>
                {lastSynced && (
                  <span className="text-[11px] font-mono text-[#1C1B18]/50 hidden sm:inline">
                    Updated {lastSynced}
                  </span>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-10 flex flex-wrap items-center gap-2 pt-6 border-t border-[#1C1B18]/10">
              <span className="text-xs uppercase tracking-widest text-[#1C1B18]/50 mr-2 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider transition-all duration-300 uppercase cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#1C1B18] text-[#F9F8F3] shadow-md scale-105"
                      : "bg-[#1C1B18]/5 text-[#1C1B18]/80 hover:bg-[#1C1B18]/10 border border-[#1C1B18]/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <span className="ml-auto text-xs text-[#1C1B18]/60 font-mono hidden md:inline">
                {filteredItems.length} {filteredItems.length === 1 ? "Item" : "Items"}
              </span>
            </div>
          </section>

          {/* Gallery Bento Grid */}
          <section className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto py-12 lg:py-16">
            <motion.div 
              layout 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence>
                {filteredItems.map((item, idx) => {
                  const imageSrc = item.image_url || item.src || item.image || "/images/hero-living.jpg";
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.4) }}
                      onClick={() => setSelectedItem(item)}
                      className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#1C1B18] border border-[#1C1B18]/10 shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                    >
                      <Image
                        src={imageSrc}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />

                      {/* Ambient Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                      
                      {/* Top Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-2.5 py-1 bg-white/15 backdrop-blur-md text-[10px] font-bold tracking-[0.2em] uppercase text-[#F5E4C3] rounded border border-white/20 shadow-sm">
                          {item.category}
                        </span>
                      </div>

                      {/* Quick Inspect Icon */}
                      <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:bg-[#C5A880] group-hover:text-[#1C1B18] transition-all duration-300 border border-white/20">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>

                      {/* Bottom Info Block */}
                      <div className="absolute bottom-5 inset-x-5 z-10 text-white">
                        <h3 className="font-serif text-lg sm:text-xl font-normal leading-snug group-hover:text-[#F5E4C3] transition-colors">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="mt-1.5 text-xs text-white/75 line-clamp-2 font-light leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
              <div className="py-24 text-center">
                <Layers className="w-12 h-12 text-[#C5A880]/50 mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-[#1C1B18]">No Works in this Category</h3>
                <p className="text-sm text-[#1C1B18]/70 mt-2 max-w-sm mx-auto">
                  Select &ldquo;ALL&rdquo; or add items via the Laravel backend admin dashboard to populate this category.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveCategory("ALL")}
                  className="mt-6 px-5 py-2 rounded-full bg-[#1C1B18] text-[#F9F8F3] text-xs font-bold uppercase tracking-wider hover:bg-[#C5A880] hover:text-[#1C1B18] transition-colors cursor-pointer"
                >
                  Show All Items
                </button>
              </div>
            )}
          </section>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
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
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#C5A880] hover:text-[#1C1B18] transition-colors duration-300 border border-white/20 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Modal Image View */}
                  <div className="relative lg:col-span-7 h-[300px] sm:h-[420px] lg:h-[550px] w-full bg-black">
                    <Image
                      src={selectedItem.image_url || selectedItem.src || selectedItem.image || "/images/hero-living.jpg"}
                      alt={selectedItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Modal Details Section */}
                  <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-[#1C1B18]">
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="px-3 py-1 bg-[#C5A880]/20 text-[#C5A880] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full border border-[#C5A880]/30">
                          {selectedItem.category}
                        </span>
                        {selectedItem.is_featured && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-[#C5A880] font-mono uppercase tracking-wider">
                            <Sparkles className="w-3 h-3" /> Featured
                          </span>
                        )}
                      </div>

                      <h2 className="font-serif text-2xl md:text-3xl font-light leading-snug mb-4 text-[#F9F8F3]">
                        {selectedItem.title}
                      </h2>

                      <div className="w-12 h-[1px] bg-[#C5A880] mb-6" />

                      {selectedItem.description && (
                        <p className="text-sm text-[#F9F8F3]/80 font-light leading-relaxed mb-6">
                          {selectedItem.description}
                        </p>
                      )}

                      {selectedItem.quote && (
                        <blockquote className="italic font-serif text-sm text-[#C5A880] border-l-2 border-[#C5A880] pl-4 my-6">
                          &ldquo;{selectedItem.quote}&rdquo;
                        </blockquote>
                      )}
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-white/50 font-mono">
                        Item #{selectedItem.id}
                      </span>
                      <Link
                        to="/contact"
                        onClick={() => setSelectedItem(null)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5A880] text-[#1C1B18] text-xs font-bold uppercase tracking-wider hover:bg-[#F9F8F3] transition-colors"
                      >
                        Enquire About Similar Space
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Callout */}
          <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto text-center border-t border-[#1C1B18]/10 mt-12">
            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1B18] leading-tight mb-4">
              Looking for something tailored to your residence?
            </h2>
            <p className="text-[#1C1B18]/80 text-[15px] font-normal mb-8 max-w-xl mx-auto">
              Our studio handles full spatial architectural execution, custom millwork, and turnkey handover.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1C1B18] text-[#F9F8F3] hover:bg-[#C5A880] hover:text-[#1C1B18] transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em] shadow-xl"
            >
              <span>Schedule a Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
