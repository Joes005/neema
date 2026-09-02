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
  title: "NEEMA HOMES | Signature Residential Interiors & Execution Chennai",
  description:
    "NEEMA HOMES creates signature personalized residences in Chennai: in-house architectural design, bespoke joinery, transparent decisions and rigorous quality control.",
  keywords: [
    "Luxury interior design Chennai",
    "Residential interior studio",
    "Bespoke joinery",
    "Architectural interiors",
    "Turnkey home execution",
  ],
  authors: [{ name: "NEEMA HOMES" }],
  openGraph: {
    title: "NEEMA HOMES | Signature Residential Interiors",
    description:
      "A signature residence, created with clarity and delivered with conviction. In-house design and execution in Chennai.",
    url: "https://neema-homes.vercel.app",
    siteName: "NEEMA HOMES",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-living.jpg",
        width: 1920,
        height: 1080,
        alt: "NEEMA HOMES Luxury Residence Interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEEMA HOMES | Luxury Residential Interiors",
    description: "Curating Signature Spaces in Chennai",
    images: ["/images/hero-living.jpg"],
  },
  metadataBase: new URL("https://neema-homes.vercel.app"),
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
    name: "NEEMA HOMES",
    slogan: "Curating Signature Spaces",
    url: "https://neema-homes.vercel.app",
    email: "info@company.com",
    areaServed: "Chennai, Tamil Nadu, India",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
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

