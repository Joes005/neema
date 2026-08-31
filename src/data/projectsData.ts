export interface ProjectItem {
  id: string;
  title: string;
  roomType: string;
  location: string;
  image: string;
  description: string;
  quote?: string;
}

export const defaultProjects: ProjectItem[] = [
  {
    id: "foyer-01",
    title: "The Fluted Foyer",
    roomType: "Foyer & Entryway",
    location: "Poes Garden, Chennai",
    image: "/images/project-foyer.jpg",
    description: "Vertical fluted teak wood slats, concealed ambient light channels, and warm Italian marble flooring.",
    quote: "An entrance designed to calm the mind immediately upon arrival.",
  },
  {
    id: "dining-02",
    title: "Travertine Dining Suite",
    roomType: "Dining Space",
    location: "Boat Club, Chennai",
    image: "/images/project-dining.jpg",
    description: "Monolithic travertine stone table paired with custom solid teak seating and brass architectural lighting.",
    quote: "A center for slow meals and unhurried conversation.",
  },
  {
    id: "living-03",
    title: "The Signature Pavilion",
    roomType: "Living Room",
    location: "Nungambakkam, Chennai",
    image: "/images/hero-living.jpg",
    description: "Double-height living space with wall-to-wall garden glass framing, teak ceiling beams, and linen sofas.",
    quote: "Proportions tuned to coastal light and natural airflow.",
  },
  {
    id: "kitchen-04",
    title: "Matte Slate Kitchen",
    roomType: "Bespoke Kitchen",
    location: "ECR Beach Residence, Chennai",
    image: "/images/project-kitchen.jpg",
    description: "Handleless matte dark cabinetry, light granite island counter, and integrated concealed storage.",
    quote: "Precision engineering meets quiet architectural minimalism.",
  },
  {
    id: "bedroom-05",
    title: "Linen & Teak Sanctuary",
    roomType: "Master Bedroom",
    location: "RA Puram, Chennai",
    image: "/images/project-bedroom.jpg",
    description: "Soft upholstered headboard paneling, indirect cove lighting, and acoustic timber accents.",
    quote: "A restful atmosphere built around texture and light.",
  },
  {
    id: "bath-06",
    title: "Travertine Spa Retreat",
    roomType: "Master Bathroom",
    location: "Adyar, Chennai",
    image: "/images/project-bath.jpg",
    description: "Vein-matched travertine stone, freestanding bathtub, custom floating teak vanity, and bronze fittings.",
    quote: "Daily rituals elevated by tactile natural stone.",
  },
  {
    id: "wardrobe-07",
    title: "Bronze Glass Wardrobe",
    roomType: "Dressing Suite",
    location: "Kotturpuram, Chennai",
    image: "/images/project-wardrobe.jpg",
    description: "Custom floor-to-ceiling glass wardrobe joinery with warm integrated shelf lighting and teak internals.",
    quote: "Storage designed like a luxury boutique display.",
  },
];
