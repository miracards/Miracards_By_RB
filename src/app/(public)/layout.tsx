import dynamic from "next/dynamic";
import Navbar from "@/components/shared/Navbar";
import AnnouncementBar from "@/components/shared/AnnouncementBar";

const Footer = dynamic(() => import("@/components/shared/Footer"));
const WhatsAppFAB = dynamic(() => import("@/components/shared/WhatsAppFAB"));

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" role="main">
        {children}
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
