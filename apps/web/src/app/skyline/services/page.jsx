'use client';

import heroBg from "@/assets/images/About-Us/hero-bg-pexels.jpg";
import SubPageBanner from "@/components/banner/SubPageBanner";
import MarqueeSlider from "@/components/common/MarqueeSlider";
import { useSkylineLandingLocale } from "@/lib/useSkylineLandingLocale";
import Link from "next/link";
import React from "react";

const services = {
  en: [
    {
      title: "Rooftop Dining",
      description: "Experience authentic Indian cuisine with panoramic city views. Our rooftop setting turns each meal into a refined occasion.",
    },
    {
      title: "Takeaway & Delivery",
      description: "Enjoy Skyline from home with careful packaging, fresh ingredients, and consistent quality from kitchen to doorstep.",
    },
    {
      title: "Private Events",
      description: "From intimate gatherings to larger celebrations, we create tailored experiences with curated menus and dedicated service.",
    },
    {
      title: "Corporate Catering",
      description: "Bring Skyline to your office or venue with elegant presentation, strong execution, and signature hospitality.",
    },
  ],
  fr: [
    {
      title: "Restauration Rooftop",
      description: "Vivez une cuisine indienne authentique avec une vue panoramique sur la ville. Notre rooftop transforme chaque repas en moment d'exception.",
    },
    {
      title: "A emporter et livraison",
      description: "Profitez de Skyline chez vous avec un emballage soigne, des ingredients frais et une qualite constante du depart cuisine jusqu'a la livraison.",
    },
    {
      title: "Evenements prives",
      description: "Des rencontres intimistes aux grandes celebrations, nous concevons des experiences sur mesure avec menu adapte et service dedie.",
    },
    {
      title: "Catering corporate",
      description: "Apportez l'experience Skyline dans vos bureaux ou sur votre lieu d'evenement avec une execution elegante et une vraie hospitalite.",
    },
  ],
};

const icons = [
  <svg key="rooftop" className="w-8 h-8" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 38H42" strokeLinecap="round" />
    <path d="M10 38V34C10 26.268 16.268 20 24 20C31.732 20 38 26.268 38 34V38" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M24 20V10" strokeLinecap="round" />
    <circle cx="24" cy="8" r="2" />
  </svg>,
  <svg key="delivery" className="w-8 h-8" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="8" y="14" width="20" height="24" rx="3" />
    <path d="M28 22H34L40 30V35C40 36.657 38.657 38 37 38H28" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="38" r="4" />
    <circle cx="35" cy="38" r="4" />
  </svg>,
  <svg key="events" className="w-8 h-8" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="8" y="18" width="32" height="22" rx="3" />
    <path d="M16 18V12C16 9.791 17.791 8 20 8H28C30.209 8 32 9.791 32 12V18" strokeLinecap="round" />
    <path d="M8 26H18V30H30V26H40" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="catering" className="w-8 h-8" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M24 6L28 14H20L24 6Z" strokeLinejoin="round" />
    <path d="M16 14H32" strokeLinecap="round" />
    <path d="M18 14V18C18 22 20 26 24 26C28 26 30 22 30 18V14" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M24 26V30" strokeLinecap="round" />
    <rect x="14" y="30" width="20" height="4" rx="1" />
    <path d="M10 42H38" strokeLinecap="round" />
    <path d="M16 34L14 42" strokeLinecap="round" />
    <path d="M32 34L34 42" strokeLinecap="round" />
  </svg>,
];

const ServicesPage = () => {
  const { isFrench } = useSkylineLandingLocale();
  const localeKey = isFrench ? "fr" : "en";
  const copy = isFrench
    ? {
        tag: "Ce que nous proposons",
        title: "Nos services",
        intro: "Du diner rooftop intimiste au catering pour evenement, nous apportons l'esprit de l'hospitalite indienne a chaque experience.",
        ctaTitle: "Pret a vivre l'experience Skyline ?",
        ctaText: "Que vous prepariez un diner, un evenement corporate ou une celebration privee, notre equipe peut structurer une experience sur mesure.",
        ctaButton: "Nous contacter",
      }
    : {
        tag: "What We Offer",
        title: "Our Services",
        intro: "From intimate rooftop dinners to larger catering requirements, we bring the essence of Indian hospitality to every format.",
        ctaTitle: "Ready to Experience Skyline?",
        ctaText: "Whether you are planning dinner, a corporate event, or a special celebration, our team can shape the right setup for you.",
        ctaButton: "Contact Us",
      };

  return (
    <>
      <SubPageBanner heroBg={heroBg} />

      <section className="bg-Dark-Cyan-Green py-20 md:py-32">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="text-International-Orange font-satisfy text-xl md:text-2xl">{copy.tag}</span>
            <h2 className="text-3xl md:text-5xl font-plus-jakarta-sans font-semibold text-white mt-3 mb-6">{copy.title}</h2>
            <p className="text-[#B4C4C4] font-jost text-base md:text-lg leading-relaxed">{copy.intro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services[localeKey].map((service, index) => (
              <div key={service.title} className="group rounded-2xl border border-white/10 bg-[#0a1c1c]/50 p-8 hover:border-International-Orange/30 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-International-Orange/10 flex items-center justify-center text-International-Orange group-hover:bg-International-Orange group-hover:text-white transition-all duration-300">
                    {icons[index]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-plus-jakarta-sans font-semibold text-xl mb-3 group-hover:text-International-Orange transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#8A9A9A] font-jost text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-Dark-Cyan-Green py-16 md:py-24 border-t border-white/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-plus-jakarta-sans font-semibold text-white mb-4">{copy.ctaTitle}</h2>
            <p className="text-[#8A9A9A] font-jost mb-8 max-w-2xl mx-auto">{copy.ctaText}</p>
            <Link
              href="/skyline/contact-us"
              className="inline-flex items-center justify-center gap-2 font-jost font-medium text-base text-white bg-International-Orange py-3 px-8 rounded-lg hover:bg-International-Orange/90 transition-all duration-300"
            >
              {copy.ctaButton}
              <svg className="w-4 h-4" viewBox="0 0 13 13" fill="none">
                <path d="M7.135 9.775C6.896 10.014 6.51 10.014 6.274 9.775C6.038 9.537 6.035 9.151 6.274 8.915L8.077 7.112H3.453C3.115 7.112 2.844 6.841 2.844 6.503C2.844 6.165 3.115 5.894 3.453 5.894H8.077L6.274 4.091C6.035 3.852 6.035 3.466 6.274 3.23C6.513 2.994 6.899 2.991 7.135 3.23L9.979 6.071C10.217 6.31 10.217 6.696 9.979 6.932L7.135 9.775Z" fill="white" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <MarqueeSlider />
    </>
  );
};

export default ServicesPage;
