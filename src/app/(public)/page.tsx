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
      "alternateName": ["Mira Cards Ahmedabad", "Mira Cards Wedding Invitations"],
      "description": "Custom wedding invitation design, printing, and digital invitation services for Ahmedabad, Vadodara, Gandhinagar, and international customers.",
      "url": "https://miracards.in",
      "telephone": "+917046441356",
      "priceRange": "₹₹₹",
      "image": "https://miracards.in/og-image.jpg",
      "logo": "https://miracards.in/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ahmedabad",
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
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "City", "name": "Surat" },
        { "@type": "City", "name": "Ahmedabad" },
        { "@type": "City", "name": "Gandhinagar" },
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
      "description": "Luxury Wedding Card Maker & Invitation Designer in Ahmedabad, Gujarat",
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
      "name": "Mira Cards - Luxury Wedding Card Maker & Invitation Designer | Ahmedabad, Gujarat, India",
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
  title: "Wedding Cards in Ahmedabad, Vadodara & Gandhinagar | Mira Cards",
  description:
    "Custom wedding invitation cards for Ahmedabad, Vadodara and Gandhinagar, with Gujarati kankotri, premium printing, digital invites and international delivery.",
  keywords: [
    "wedding cards in Ahmedabad",
    "wedding invitation cards Ahmedabad",
    "wedding card manufacturer Ahmedabad",
    "wedding card designer Ahmedabad",
    "luxury wedding cards Ahmedabad",
    "customized wedding cards Ahmedabad",
    "designer wedding cards Ahmedabad",
    "wedding invitation designer Ahmedabad",
    "premium wedding invitation cards",
    "Indian wedding invitation cards",
    "wedding card printing Ahmedabad",
    "wedding invitation printing Ahmedabad",
    "personalized wedding invitation cards",
    "exclusive wedding cards Ahmedabad",
    "best wedding invitation cards Ahmedabad",
    "luxury wedding invitation cards",
    "premium wedding cards Ahmedabad",
    "luxury Indian wedding invitations",
    "designer wedding invitation cards",
    "royal wedding invitation cards",
    "elegant wedding invitation cards",
    "exclusive wedding invitation designs",
    "premium box wedding invitations",
    "luxury wedding card designer",
    "customized luxury wedding invitations",
    "Gujarati wedding cards Ahmedabad",
    "Gujarati kankotri Ahmedabad",
    "Gujarati wedding invitation cards",
    "Gujarati marriage invitation cards",
    "Hindu wedding cards Ahmedabad",
    "customized Gujarati kankotri",
    "wedding card design Ahmedabad",
    "wedding invitation design Ahmedabad",
    "customized wedding invitation design",
    "wedding cards in Gujarat",
    "wedding cards Vadodara",
    "wedding cards Gandhinagar",
    "luxury wedding invitations India",
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
  title: "Wedding Cards in Ahmedabad, Vadodara & Gandhinagar | Mira Cards",
  description: "Custom wedding invitation cards, Gujarati kankotri, premium printing, and digital invites for Gujarat and international customers.",
   images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Mira Cards - Luxury Wedding Card Maker" }],
  },
};

export default function HomePage() {
  const storyCards = [
    {
      title: "A Coordinated Suite, On Paper or Online",
      description:
        "Complete your personalized wedding invitation suite with save-the-date cards, RSVP and itinerary inserts, menus, place cards, thank-you notes, money envelopes, welcome notes, gift tags, stickers, and coordinated gift packaging. Digital wedding invitations and an online RSVP website make it easy to share event updates with guests in India and abroad. We also create designs for baby showers, housewarmings, Vastupujan, and welcome boards. Contact Mira Cards to discuss your guest list, timeline, and delivery location.",
    },
    {
      title: "Premium Materials and Finishing",
      description:
        "Explore gold foil wedding invitations, laser-cut wedding cards, acrylic invitations, velvet details, embossed finishes, and customized box wedding cards. Compare handmade, modern, royal-inspired, and traditional designs, including exclusive invitation designs and premium box wedding invitations. Discuss paper, printing, and finishing with a luxury wedding card designer before approving a customized luxury invitation.",
    },
    {
      title: "Gujarati Kankotri, Made Personal",
      description:
        "From traditional Gujarati wedding cards, Gujarati marriage invitation cards, and customized Gujarati kankotri to contemporary Hindu wedding cards and Indian marriage invitations, your suite can reflect family traditions alongside your own style. Choose wording, colors, and motifs for engagement invitations and ceremony stationery.",
    },
    {
      title: "  Luxury Wedding Cards & Gujarati Kankotri for Ahmedabad Weddings",
      description:
        "Planning a wedding in Ahmedabad, Vadodara, or Gandhinagar? Explore custom wedding cards, designer wedding invitations, and wedding card printing with personalized wording and finishes. Compare elegant, premium, and luxury Indian wedding invitations, request a quote, and plan delivery across Gujarat. International customers can enquire about worldwide shipping for their invitation order.",
    },

  ];

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
      <section
        aria-labelledby="ahmedabad-invitations-heading"
        className="section"
        style={{ background: "var(--bg-card)", padding: "clamp(3rem, 7vw, 6rem) 0" }}
      >
        <div className="container" style={{ maxWidth: "960px" }}>
          <div style={{ marginBottom: "2rem", textAlign: "center" }}>
            <span className="section-label">Ahmedabad · Vadodara · Gandhinagar · Worldwide</span>
            <h2
              id="ahmedabad-invitations-heading"
              className="text-section-heading"
              style={{ color: "var(--text)", marginTop: "0.5rem" }}
            >
              Luxury Wedding Cards & Gujarati Kankotri for Ahmedabad Weddings
            </h2>
          </div>

          
          <div className="mobile-story-cards" aria-label="Wedding invitation feature slider">
            {storyCards.map((card) => (
              <div
                key={card.title}
                className="mobile-story-card"
                style={{
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                  fontSize: "0.96rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <h3 style={{ color: "var(--text)", fontSize: "1.1rem", margin: 0, lineHeight: 1.4 }}>
                  {card.title}
                </h3>
                <p style={{ margin: 0 }}>{card.description}</p>
              </div>
            ))}
            <div
              className="mobile-story-card"
              style={{
                color: "var(--text-muted)",
                lineHeight: 1.7,
                fontSize: "0.96rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <p style={{ margin: 0 }}>
                Planning a wedding in Ahmedabad, Vadodara, or Gandhinagar? Explore custom wedding
                cards, designer wedding invitations, and wedding card printing with personalized
                wording and finishes. Compare elegant, premium, and luxury Indian wedding invitations,
                request a quote, and plan delivery across Gujarat. International customers can enquire
                about worldwide shipping for their invitation order.
              </p>
            </div>
          </div>
        </div>
      </section>
      <InquiryCTA />
    </>
  );
}
