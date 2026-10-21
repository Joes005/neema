import type { Metadata } from "next";
import { Jost, Playfair_Display } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUVELLE INTERIORS | Designing Spaces. Defining Lifestyles. · Luxury Residential Studio",
  description:
    "LUVELLE INTERIORS creates bespoke signature residences: in-house spatial architecture, tailored joinery, transparent decisions, and rigorous execution in Erode & Tamil Nadu.",
  keywords: [
    "Luxury interior design Erode",
    "LUVELLE INTERIORS",
    "Residential interior designer Erode Tamil Nadu",
    "Bespoke joinery",
    "Architectural interiors",
    "Turnkey residence execution",
    "Kavin Govindaraj Interior Designer",
  ],
  authors: [{ name: "LUVELLE INTERIORS" }],
  openGraph: {
    title: "LUVELLE INTERIORS | Designing Spaces. Defining Lifestyles.",
    description:
      "A signature residence, created with clarity and delivered with conviction. In-house interior design and execution studio.",
    url: "https://www.luvelleinteriors.com",
    siteName: "LUVELLE INTERIORS",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-living.jpg",
        width: 1920,
        height: 1080,
        alt: "LUVELLE INTERIORS Luxury Residence Interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUVELLE INTERIORS | Designing Spaces. Defining Lifestyles.",
    description: "Designing Spaces. Defining Lifestyles. · Luxury Residential Studio",
    images: ["/images/hero-living.jpg"],
  },
  metadataBase: new URL("https://www.luvelleinteriors.com"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InteriorDesignFirm",
    name: "LUVELLE INTERIORS",
    slogan: "Designing Spaces. Defining Lifestyles.",
    url: "https://www.luvelleinteriors.com",
    email: "hello@luvelleinteriors.com",
    telephone: "+91-99444-99167",
    founder: {
      "@type": "Person",
      name: "Kavin Govindaraj",
      jobTitle: "Founder & Interior Designer",
    },
    areaServed: "Erode, Tamil Nadu, India",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Erode",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  };

  return (
    <html
      lang="en"
      className={`${jost.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#141312] text-[#F7F5F0] font-sans selection:bg-[#C5A880] selection:text-[#141312] min-h-screen flex flex-col overflow-x-clip">
        {children}
      </body>
    </html>
  );
}

