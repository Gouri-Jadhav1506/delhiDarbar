'use client';
import React from "react";
import heroBg from "@/assets/images/blog-details/hero-bg.png";
import SubPageBanner from "@/components/banner/SubPageBanner";
import ContactForm3 from "@/components/common/ContactForm3";
import ContactInfoMap from "@/components/common/ContactInfoMap";
import MarqueeSlider from "@/components/common/MarqueeSlider";

const Reservation = () => {
  return (
    <>
      {/* banner */}
      <SubPageBanner heroBg={heroBg} />

      {/* contact form */}
      <ContactForm3 />
      {/* contact form */}

      {/* contact-info-map */}
      <ContactInfoMap />
      {/* contact-info-map */}

      {/* News-Blog */}
      <MarqueeSlider />
      {/* News-Blog */}
    </>
  );
};

export default Reservation;


