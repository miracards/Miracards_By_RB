import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Geist, Great_Vibes, Monsieur_La_Doulaise, Herr_Von_Muellerhoff } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const greatVibes = Great_Vibes({ weight: "400", subsets: ['latin'], variable: '--font-great-vibes' });
const monsieurLaDoulaise = Monsieur_La_Doulaise({ weight: "400", subsets: ['latin'], variable: '--font-monsieur-la-doulaise' });
const herrVonMuellerhoff = Herr_Von_Muellerhoff({ weight: "400", subsets: ['latin'], variable: '--font-herr-von-muellerhoff' });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#071321" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://miracards.in"),
  title: {
    default: "Mira Cards - Luxury Wedding Card Maker & Invitation Designer | Surat, Gujarat, India",
    template: "%s | Mira Cards",
  },
  description:
    "Premium wedding card maker & digital invitation designer in Surat, Gujarat. Custom luxury handcrafted cards, foil stamping, laser-cut designs, rigid box sets, acrylic suites & animated video invites. Worldwide shipping to India, USA, Australia & beyond.",
  keywords: [
    // Card Making - Core
    "wedding card maker",
    "wedding card maker Surat",
    "wedding card maker Gujarat",
    "wedding card maker India",
    "wedding card maker near me",
    "card making services India",
    "custom card making",
    "invitation card maker",
    "invitation card maker Surat",
    "wedding invitation maker",
    "wedding invitation designer",
    // City & State Targeting
    "wedding cards Surat",
    "wedding invitation Surat",
    "wedding cards Gujarat",
    "wedding invitation Gujarat",
    "wedding cards Ahmedabad",
    "wedding cards Vadodara",
    "wedding cards Mumbai",
    "wedding cards Delhi",
    "wedding cards Rajkot",
    "wedding cards Baroda",
    "wedding invitation Ahmedabad",
    // International Targeting
    "wedding invitation USA",
    "Indian wedding invitation USA",
    "wedding card designer USA",
    "wedding invitation Australia",
    "Indian wedding card Australia",
    "NRI wedding invitations",
    "Indian wedding cards worldwide",
    "luxury wedding cards overseas",
    // Product Types
    "luxury wedding invitations india",
    "indian wedding cards",
    "bespoke wedding invitations",
    "gujarati wedding invitation",
    "gujarati wedding cards",
    "hindu wedding cards",
    "muslim wedding invitation",
    "sikh wedding invitation",
    "south indian wedding invitation",
    "destination wedding invitations",
    "foil wedding invitations",
    "laser cut wedding cards",
    "acrylic wedding invitations",
    "box wedding invitations",
    "digital wedding invitation",
    "video wedding invitation",
    "animated wedding invitation",
    "babyshower invitation card",
    "babyshower video invitation",
    "custom wedding stationery india",
    "luxury wedding stationery",
    "premium wedding cards",
    "handcrafted wedding invitations",
    // Brand
    "miracards",
    "mira cards",
    "mira cards surat",
  ],
  authors: [{ name: "Mira Cards", url: "https://miracards.in" }],
  creator: "Mira Cards",
  publisher: "Mira Cards",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["en_US", "en_AU", "en_GB"],
    url: "https://miracards.in",
    siteName: "Mira Cards",
    title: "Mira Cards - Luxury Wedding Card Maker & Invitation Designer | Surat, Gujarat, India",
    description:
      "Premium wedding card maker & digital invitation designer in Surat, Gujarat. Worldwide shipping to India, USA, Australia & beyond.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mira Cards - Luxury Wedding Card Maker & Invitation Designer in Surat, Gujarat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mira Cards - Luxury Wedding Card Maker | Surat, Gujarat, India",
    description:
      "Premium wedding card maker & digital invitation designer in Surat, Gujarat. Shipping worldwide to India, USA, Australia.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://miracards.in",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/manifest.json",
  category: "Wedding Stationery & Invitations",
  classification: "Wedding Card Maker, Invitation Designer, Digital Invitation",
};

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AnnouncementBar from "@/components/shared/AnnouncementBar";
import WhatsAppFAB from "@/components/shared/WhatsAppFAB";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Local fonts — Linux Biolinum (body/UI) + Hearthway (logo/signature) */}
        <style>{`
          @font-face {
            font-family: 'Linux Biolinum';
            src: url('/fonts/LinBiolinum_R.ttf') format('truetype');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Linux Biolinum';
            src: url('/fonts/LinBiolinum_RB.ttf') format('truetype');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Linux Biolinum';
            src: url('/fonts/LinBiolinum_RI.ttf') format('truetype');
            font-weight: 400;
            font-style: italic;
            font-display: swap;
          }
          @font-face {
            font-family: 'Hearthway';
            src: url('/fonts/Hearthway.otf') format('opentype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
          html, body, * {
            font-family: 'Linux Biolinum', system-ui, sans-serif;
          }
          :root {
            --font-sans:      'Linux Biolinum', system-ui, sans-serif;
            --font-body:      'Linux Biolinum', system-ui, sans-serif;
            --font-display:   'Linux Biolinum', Georgia, serif;
            --font-heading:   'Linux Biolinum', Georgia, serif;
            --font-alt:       'Linux Biolinum', system-ui, sans-serif;
            --font-number:    'Linux Biolinum', system-ui, sans-serif;
            --font-hearthway: 'Hearthway', cursive;
            --font-signature: 'Hearthway', cursive;
            --font-logo:      'Hearthway', cursive;
          }
        `}</style>
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Surat, Gujarat, India" />
        <meta name="geo.position" content="21.1702;72.8311" />
        <meta name="ICBM" content="21.1702, 72.8311" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="target" content="all" />
        <meta name="coverage" content="Worldwide" />
        <meta name="rating" content="General" />
      </head>
      <body
        className={cn(
          geist.variable,
          greatVibes.variable,
          monsieurLaDoulaise.variable,
          herrVonMuellerhoff.variable,
        )}
      >
        <ThemeProvider>
          {/* Global iOS Background Glass Blobs */}
          <div className="bg-blobs-container" aria-hidden="true">
            <div className="bg-blob blob-1" />
            <div className="bg-blob blob-2" />
            <div className="bg-blob blob-3" />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

