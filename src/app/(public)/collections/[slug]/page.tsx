import type { Metadata } from "next";
import CollectionDetailClient from "./CollectionDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Rich per-slug SEO data
const SLUG_SEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  "new-wedding-collection": {
    title: "New Wedding Collection 2024 - Luxury Wedding Card Maker | Mira Cards",
    description: "Explore handcrafted luxury wedding invitations with heritage borders, gold foil stamping, and custom embossing. Serving Ahmedabad, Vadodara, and Gandhinagar, with international delivery.",
    keywords: ["new wedding collection", "luxury wedding card maker", "new wedding invitation design India", "wedding cards Ahmedabad", "wedding cards Vadodara", "wedding cards Gandhinagar", "premium wedding cards Gujarat"],
  },
  "babyshower-video-invitation": {
    title: "Babyshower Video Invitation Maker & Animated Cards | Mira Cards",
    description: "Animated MP4 baby shower video invitations for WhatsApp, with custom caricature designs and music. Serving Ahmedabad, Vadodara, Gandhinagar, and international customers.",
    keywords: ["babyshower video invitation maker", "animated babyshower invitation India", "WhatsApp babyshower video card", "baby shower video invitation Ahmedabad", "baby shower video invitation Vadodara", "baby shower video invitation Gandhinagar", "babyshower invitation card maker Gujarat"],
  },
  "babyshower-invitation-card": {
    title: "Babyshower Invitation Card Maker - Custom Printed Cards | Mira Cards",
    description: "Pastel baby shower invitation cards with custom illustrations and envelopes, printed on premium cardstock. Serving Ahmedabad, Vadodara, Gandhinagar, and overseas customers.",
    keywords: ["babyshower invitation card maker", "custom baby shower invitations Ahmedabad", "custom baby shower invitations Vadodara", "custom baby shower invitations Gandhinagar", "pastel babyshower invitation India", "printed babyshower card Gujarat", "babyshower card design maker"],
  },
  "royal-invitations": {
    title: "Royal Luxury Wedding Invitation Cards - Velvet & Gold Foil | Mira Cards",
    description: "Royal wedding invitation cards with velvet envelopes, gold foil monograms, and laser-cut borders. Serving Ahmedabad, Vadodara, Gandhinagar, and international customers.",
    keywords: ["royal wedding invitation India", "luxury velvet wedding card", "gold foil wedding invitation", "royal wedding invitations Ahmedabad", "royal wedding invitations Vadodara", "royal wedding invitations Gandhinagar"],
  },
  "box-wedding-invitations": {
    title: "Luxury Box Wedding Invitation Maker - Rigid Sets | Mira Cards",
    description: "Luxury rigid box wedding invitation sets with silk-lined compartments and coordinated inserts. Serving Ahmedabad, Vadodara, Gandhinagar, and international customers.",
    keywords: ["box wedding invitation maker India", "luxury rigid box wedding card", "custom box invitation Ahmedabad", "custom box invitation Vadodara", "custom box invitation Gandhinagar", "wedding box card designer Gujarat"],
  },
  "laser-cut-invitations": {
    title: "Laser Cut Wedding Invitation Card Maker - Intricate Designs | Mira Cards",
    description: "Precision laser-cut wedding cards with palace jaali and floral mandap patterns on premium card stock. Serving Ahmedabad, Vadodara, Gandhinagar, and worldwide.",
    keywords: ["laser cut wedding invitation India", "laser cut wedding card maker", "jaali wedding card design", "laser cut invitation Ahmedabad", "laser cut invitation Vadodara", "laser cut invitation Gandhinagar", "laser cut wedding card Gujarat"],
  },
  "foil-wedding-invitations": {
    title: "Foil Stamped & Embossed Wedding Card Maker | Mira Cards",
    description: "Foil-stamped wedding invitations in gold, rose gold, silver, or copper with embossed details. Serving Ahmedabad, Vadodara, Gandhinagar, and international customers.",
    keywords: ["foil wedding card maker India", "gold foil wedding invitation", "embossed wedding card", "rose gold wedding invitation Ahmedabad", "rose gold wedding invitation Vadodara", "rose gold wedding invitation Gandhinagar", "metallic wedding card Gujarat"],
  },
  "acrylic-wedding-cards": {
    title: "Acrylic Wedding Invitation Card Maker - Clear & Frosted | Mira Cards",
    description: "Clear, frosted, and tinted acrylic wedding invitations with laser engraving and screen printing. Serving Ahmedabad, Vadodara, Gandhinagar, and overseas customers.",
    keywords: ["acrylic wedding invitation maker India", "clear acrylic wedding card", "frosted wedding invitation", "acrylic wedding invitations Ahmedabad", "acrylic wedding invitations Vadodara", "acrylic wedding invitations Gandhinagar", "modern wedding invitation Gujarat"],
  },
  "digital-wedding-invitations": {
    title: "Digital & Video Wedding Invitation Maker - Animated MP4 | Mira Cards",
    description: "Animated video wedding invitations with custom caricatures, music, and WhatsApp sharing. Serving Ahmedabad, Vadodara, Gandhinagar, and international customers.",
    keywords: ["digital wedding invitation maker India", "video wedding invitation", "animated wedding invitation", "WhatsApp wedding video card", "digital wedding invitation Ahmedabad", "digital wedding invitation Vadodara", "digital wedding invitation Gandhinagar"],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const seoData = SLUG_SEO[slug];

  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      alternates: {
        canonical: `https://miracards.in/collections/${slug}`,
      },
      openGraph: {
        url: `https://miracards.in/collections/${slug}`,
        title: seoData.title,
        description: seoData.description,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: seoData.title }],
      },
    };
  }

  // Fallback for any other slugs
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${title} - Custom Wedding Card Maker | Mira Cards`,
    description: `Explore our ${title} collection of handcrafted wedding invitations, with gold foil, velvet, acrylic, and premium finishes. Serving Ahmedabad, Vadodara, Gandhinagar, and international customers.`,
    alternates: {
      canonical: `https://miracards.in/collections/${slug}`,
    },
    openGraph: {
      url: `https://miracards.in/collections/${slug}`,
      title: `${title} - Custom Wedding Card Maker | Mira Cards`,
      description: `Premium custom ${title} for customers in Ahmedabad, Vadodara, Gandhinagar, across India, and overseas.`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `Mira Cards - ${title}` }],
    },
  };
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <CollectionDetailClient slug={slug} />;
}
