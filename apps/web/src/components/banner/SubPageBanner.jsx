'use client';

import { useSkylineLandingLocale } from "@/lib/useSkylineLandingLocale";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LABELS = {
  en: {
    home: "Home",
    skyline: "Skyline",
    "about-us": "About Us",
    services: "Services",
    "our-menu": "Our Menu",
    gallery: "Gallery",
    "contact-us": "Contact Us",
    "privacy-policy": "Privacy Policy",
    "terms-of-service": "Terms of Service",
  },
  fr: {
    home: "Accueil",
    skyline: "Skyline",
    "about-us": "A propos",
    services: "Services",
    "our-menu": "Notre menu",
    gallery: "Galerie",
    "contact-us": "Contact",
    "privacy-policy": "Politique de confidentialite",
    "terms-of-service": "Conditions d'utilisation",
  },
};

const SubPageBanner = ({ heroBg }) => {
  const pathname = usePathname();
  const { isFrench } = useSkylineLandingLocale();
  const localeKey = isFrench ? "fr" : "en";
  const labels = LABELS[localeKey];

  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1] || "skyline";
  const pageName = labels[lastSegment] || lastSegment.split("-").join(" ");

  return (
    <div className="banner relative">
      <div className="banner-slider-item bg-black/50 relative z-[1]">
        <div className="container py-[70px] md:py-[171px]">
          <h1 className="font-plus-jakarta-sans font-bold text-3xl md:text-[30px] lg:text-[48px] leading-[60px] text-white split-collab capitalize text-center md:text-left">
            {pageName}
          </h1>
        </div>
        <div className="breadcum absolute bottom-0 right-0 z-10 w-[300px] lg:w-[453px] bg-International-Orange hidden md:flex items-center justify-start py-[14px] px-[31px] gap-1 font-plus-jakarta-sans font-medium text-base md:text-[18px] leading-[28px] text-white rounded-tl-[5px] capitalize">
          <Link href="/skyline">{labels.home}</Link>
          <span>/</span>
          <span>{pageName}</span>
        </div>
      </div>
      <Image src={heroBg} alt="hero background" fill priority className="object-cover" sizes="100vw" />
    </div>
  );
};

export default SubPageBanner;
