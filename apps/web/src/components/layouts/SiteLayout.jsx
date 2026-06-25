'use client';
import ScrollToTop from "@/components/common/ScrollToTop";
import Footer from "@/components/footer/Footer";
import Header1 from "@/components/header/Header1";
import TopHeader from "@/components/header/TopHeader";
import { SkylineLanguageProvider } from "@/context/SkylineLanguageContext";
import { useEffect } from "react";
import "wow.js/css/libs/animate.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SiteLayout = ({ children }) => {
  useEffect(() => {
    // Lazy-load WOW on the client to avoid SSR window references.
    import("wow.js").then(({ default: WOW }) => {
      new WOW().init();
    });
  }, []);

  return (
    <div className="bg-Deep-Teal">
      <SkylineLanguageProvider>
        <ScrollToTop>
          <TopHeader />
          <Header1 />
          {children}
          <Footer />
        </ScrollToTop>
      </SkylineLanguageProvider>
    </div>
  );
};

export default SiteLayout;
