import type { Metadata } from "next";
import CollectionDetailClient from "./CollectionDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Rich per-slug SEO data
const SLUG_SEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  "new-wedding-collection": {
    title: "New Wedding Collection 2024 - Luxury Wedding Card Maker | Mira Cards",
    description: "Explore Mira Cards' latest luxury wedding invitation collection. Premium handcrafted cards with heritage borders, gold foil stamping, and custom embossing. Wedding card maker in Surat, Gujarat — shipping to India, USA, Australia.",
    keywords: ["new wedding collection 2024", "luxury wedding card maker", "new wedding invitation design India", "latest wedding cards Surat", "premium wedding cards Gujarat"],
  },
  "babyshower-video-invitation": {
    title: "Babyshower Video Invitation Maker & Animated Cards | Mira Cards",
    description: "Cute animated MP4 babyshower video invitations for WhatsApp sharing. Custom caricature designs and gentle background music. India's top baby shower video invitation maker — shipping worldwide.",
    keywords: ["babyshower video invitation maker", "animated babyshower invitation India", "WhatsApp babyshower video card", "baby shower video maker Surat", "babyshower invitation card maker Gujarat"],
  },
  "babyshower-invitation-card": {
    title: "Babyshower Invitation Card Maker - Custom Printed Cards | Mira Cards",
    description: "Playful pastel-themed babyshower invitation cards printed on premium 300 GSM cardstock. Custom illustrations and themed envelopes. Babyshower invitation card maker in Surat, Gujarat — worldwide delivery.",
    keywords: ["babyshower invitation card maker", "custom babyshower card Surat", "pastel babyshower invitation India", "printed babyshower card Gujarat", "babyshower card design maker"],
  },
  "royal-invitations": {
    title: "Royal Luxury Wedding Invitation Cards - Velvet & Gold Foil | Mira Cards",
    description: "Majestic royal wedding invitation cards crafted with velvet envelopes, gold foil monograms, and laser-cut borders. Premium luxury wedding card maker in Surat, Gujarat.",
    keywords: ["royal wedding invitation India", "luxury velvet wedding card", "gold foil wedding invitation", "royal wedding card maker Surat"],
  },
  "box-wedding-invitations": {
    title: "Luxury Box Wedding Invitation Maker - Rigid Sets | Mira Cards",
    description: "Bespoke luxury rigid box wedding invitation sets with silk-lined compartments. Premium unboxing experience for your wedding celebration. Box wedding invitation maker in Surat, Gujarat.",
    keywords: ["box wedding invitation maker India", "luxury rigid box wedding card", "custom box invitation Surat", "wedding box card designer Gujarat"],
  },
  "laser-cut-invitations": {
    title: "Laser Cut Wedding Invitation Card Maker - Intricate Designs | Mira Cards",
    description: "Precision laser-cut wedding cards with intricate palace jaali and floral mandap patterns. Gatefold closures on pearlized card stock. Laser cut invitation card maker in Surat, Gujarat.",
    keywords: ["laser cut wedding invitation India", "laser cut wedding card maker", "jaali wedding card design", "laser cut invitation Surat", "laser cut wedding card Gujarat"],
  },
  "foil-wedding-invitations": {
    title: "Foil Stamped & Embossed Wedding Card Maker | Mira Cards",
    description: "Hot foil stamped wedding invitations in gold, rose-gold, silver, and copper with deep letterpress embossing. Premium foil wedding card maker in Surat, Gujarat.",
    keywords: ["foil wedding card maker India", "gold foil wedding invitation", "embossed wedding card", "rose gold wedding invitation Surat", "metallic wedding card Gujarat"],
  },
  "acrylic-wedding-cards": {
    title: "Acrylic Wedding Invitation Card Maker - Clear & Frosted | Mira Cards",
    description: "Modern clear, frosted, and tinted acrylic wedding invitation cards with laser engraving and silk screen printing. Acrylic wedding card maker in Surat, Gujarat.",
    keywords: ["acrylic wedding invitation maker India", "clear acrylic wedding card", "frosted wedding invitation", "acrylic card maker Surat", "modern wedding invitation Gujarat"],
  },
  "digital-wedding-invitations": {
    title: "Digital & Video Wedding Invitation Maker - Animated MP4 | Mira Cards",
    description: "Premium animated MP4 video wedding invitations with custom caricatures, background music, and WhatsApp optimization. Digital wedding invitation maker in Surat, Gujarat.",
    keywords: ["digital wedding invitation maker India", "video wedding invitation", "animated wedding invitation", "WhatsApp wedding video card", "digital invitation maker Surat"],
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
    description: `Explore our ${title} collection. Handcrafted luxury wedding invitations made with gold foil, velvet, acrylic, and premium materials. Designed in Surat, Gujarat — shipping to India, USA, Australia & worldwide.`,
    alternates: {
      canonical: `https://miracards.in/collections/${slug}`,
    },
    openGraph: {
      url: `https://miracards.in/collections/${slug}`,
      title: `${title} - Custom Wedding Card Maker | Mira Cards`,
      description: `Premium custom ${title} designed in Surat, Gujarat. Shipping worldwide.`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `Mira Cards - ${title}` }],
    },
  };
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <CollectionDetailClient slug={slug} />;
}
