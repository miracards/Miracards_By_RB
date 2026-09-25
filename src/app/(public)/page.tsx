import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";

const TrustBadges = dynamic(() => import("@/components/sections/TrustBadges"));
const FeaturedCollections = dynamic(() => import("@/components/sections/FeaturedCollections"));
const CraftsmanshipSection = dynamic(() => import("@/components/sections/CraftsmanshipSection"));
const ProcessSection = dynamic(() => import("@/components/sections/ProcessSection"));
const RealWeddings = dynamic(() => import("@/components/sections/RealWeddings"));
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"));
const InquiryCTA = dynamic(() => import("@/components/sections/InquiryCTA"));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://miracards.in/#business",
      "name": "Mira Cards",
      "alternateName": ["Mira Cards Surat", "Mira Cards Wedding Invitations"],
      "description": "Premium wedding card maker & digital invitation designer in Surat, Gujarat. Custom luxury handcrafted cards, foil stamping, laser-cut, box sets, acrylic suites & animated video invites. Shipping worldwide.",
      "url": "https://miracards.in",
      "telephone": "+917046441356",
      "priceRange": "₹₹₹",
      "image": "https://miracards.in/og-image.jpg",
      "logo": "https://miracards.in/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Surat",
        "addressRegion": "Gujarat",
        "addressCountry": "IN",
        "postalCode": "395001"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 21.1702,
        "longitude": 72.8311
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          "opens": "10:00",
          "closes": "20:00"
        }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+917046441356",
          "contactType": "customer service",
          "availableLanguage": ["English", "Hindi", "Gujarati"],
          "contactOption": "TollFree",
          "areaServed": ["IN", "US", "AU", "GB", "CA", "AE"]
        }
      ],
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "Australia" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "Canada" },
        { "@type": "City", "name": "Surat" },
        { "@type": "City", "name": "Ahmedabad" },
        { "@type": "City", "name": "Vadodara" },
        { "@type": "City", "name": "Rajkot" },
        { "@type": "City", "name": "Mumbai" },
        { "@type": "City", "name": "Delhi" },
        { "@type": "City", "name": "Bangalore" },
        { "@type": "City", "name": "Hyderabad" },
        { "@type": "City", "name": "Pune" },
        { "@type": "AdministrativeArea", "name": "Gujarat" },
        { "@type": "AdministrativeArea", "name": "Maharashtra" },
        { "@type": "AdministrativeArea", "name": "Rajasthan" }
      ],
      "sameAs": [
        "https://www.instagram.com/miracards.in",
        "https://wa.me/917046441356"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Wedding Card Maker & Invitation Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Wedding Card Making",
              "description": "Handcrafted luxury wedding invitation cards with gold foil, velvet, and premium materials"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Digital & Video Invitation Design",
              "description": "Animated MP4 video invitations for WhatsApp sharing, custom caricature designs"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Babyshower Invitation Cards",
              "description": "Custom printed babyshower invitation cards with pastel themes and playful illustrations"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Laser Cut Wedding Invitations",
              "description": "Precision laser-cut wedding cards with intricate floral and geometric patterns"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Acrylic Wedding Invitations",
              "description": "Modern clear, frosted, and tinted acrylic wedding invitation cards"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Box Wedding Invitations",
              "description": "Luxury rigid box wedding invitation sets with silk-lined compartments"
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://miracards.in/#website",
      "url": "https://miracards.in",
      "name": "Mira Cards",
      "description": "Luxury Wedding Card Maker & Invitation Designer in Surat, Gujarat",
      "publisher": { "@id": "https://miracards.in/#business" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://miracards.in/collections?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://miracards.in/#webpage",
      "url": "https://miracards.in",
      "name": "Mira Cards - Luxury Wedding Card Maker & Invitation Designer | Surat, Gujarat, India",
      "isPartOf": { "@id": "https://miracards.in/#website" },
      "about": { "@id": "https://miracards.in/#business" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://miracards.in/og-image.jpg"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://miracards.in" }
        ]
      }
    }
  ]
};

export const metadata: Metadata = {
  title: "Mira Cards - Luxury Wedding Card Maker & Digital Invitation Designer | Surat, Gujarat, India",
  description:
    "Premium wedding card maker & digital invitation designer in Surat, Gujarat. Custom luxury handcrafted cards, foil stamping, laser-cut designs, rigid box sets, acrylic suites & animated video invites. Worldwide shipping to India, USA, Australia & beyond. Request a free quote today.",
  keywords: [
    "wedding card maker Surat",
    "wedding card maker Gujarat",
    "wedding invitation maker India",
    "card making services Surat",
    "luxury wedding invitation designer",
    "wedding cards near me",
    "digital invitation maker",
    "video wedding invitation India",
    "babyshower invitation card maker",
    "custom wedding stationery Surat",
  ],
  alternates: {
    canonical: "https://miracards.in",
    languages: {
      "en-IN": "https://miracards.in",
      "en-US": "https://miracards.in",
      "en-AU": "https://miracards.in",
    },
  },
  openGraph: {
    url: "https://miracards.in",
    title: "Mira Cards - Luxury Wedding Card Maker & Invitation Designer | Surat, Gujarat",
    description: "Premium wedding card maker in Surat, Gujarat. Worldwide shipping to India, USA, Australia.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Mira Cards - Luxury Wedding Card Maker" }],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <TrustBadges />
      <FeaturedCollections />
      <CraftsmanshipSection />
      <ProcessSection />
      <RealWeddings />
      <TestimonialsSection />
      <InquiryCTA />
    </>
  );
}
