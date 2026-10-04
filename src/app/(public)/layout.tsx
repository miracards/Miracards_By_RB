import dynamic from "next/dynamic";
import Script from "next/script";
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
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','2238276370067641');fbq('track','PageView');`,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=2238276370067641&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
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
