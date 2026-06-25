'use client';

import { useSkylineLandingLocale } from "@/lib/useSkylineLandingLocale";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { theBestFood } from "../data/theBestFoodData";

const frenchDescriptions = [
  "Frites croustillantes relevees aux epices peri peri.",
  "Bouchees lactees traditionnelles dans un sirop a la cardamome.",
  "Bouillon de legumes au wok avec nouilles croustillantes.",
  "Soupe classique relevee et acidulee avec legumes frais.",
];

const TheBestFood = () => {
  const { isFrench } = useSkylineLandingLocale();

  const copy = isFrench
    ? {
        subtitle: "Meilleurs prix",
        title: "Qualite premium, excellent rapport qualite-prix",
        viewMenu: "Voir le menu complet",
      }
    : {
        subtitle: "Best Prices",
        title: "Premium Quality, Great Value",
        viewMenu: "View Full Menu",
      };

  return (
    <div className="the-best-food overflow-hidden bg-Cyan">
      <div className="md:bg-shape bg-no-repeat bg-customBgSize2 bg-center pt-[70px] md:pt-[140px] pb-[140px]">
        <div className="container">
          <div className="text-center mb-8 md:mb-12 lg:mb-24">
            <h2 className="section-subtitle font-satisfy font-normal text-International-Orange flex items-center justify-center gap-3 mb-3">
              <span>
                <svg width="13" height="30" viewBox="0 0 13 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.02392 28.6457L7.97935 17.6722C9.169 17.5219 10.2426 17.1711 11.1421 16.6701C12.3607 15.9518 13.0281 15.0165 12.9991 14.0144L12.9701 11.2919L12.4768 0.418535C12.4478 0.201403 12.1286 0.000973324 11.7224 0.000973324C11.2872 -0.0157292 10.939 0.184701 10.91 0.435238L10.5908 10.5903L7.66018 10.6071L7.25396 0.435238C7.22494 0.201404 6.87675 0.000973324 6.47053 0.000973324C6.00628 -0.0157292 5.62907 0.184701 5.62907 0.451941L5.3099 10.6071L2.3793 10.6238L1.94406 0.451941C1.91504 0.234808 1.59587 0.0343784 1.18965 0.0343784C0.754411 0.0176759 0.40622 0.218106 0.377205 0.468643L0 11.3253L0.0290154 14.0645C0.0290154 15.8349 2.23422 17.3215 5.1358 17.6889L4.43942 28.6624C4.43942 28.6847 4.43942 28.707 4.43942 28.7292C4.49745 29.4475 5.54202 30.032 6.81872 29.9986C8.0664 29.9819 9.08195 29.3639 9.02392 28.6457Z" fill="#FFD84D" />
                </svg>
              </span>
              {copy.subtitle}
            </h2>
            <h2 className="text-2xl md:text-4xl lg:text-[55px] font-plus-jakarta-sans font-semibold text-white leading-tight">{copy.title}</h2>
          </div>

          <div className="md:hidden">
            <div className="space-y-4">
              {theBestFood.slice(0, 4).map((item, index) => (
                <div key={item.name} className="flex items-center gap-4 bg-Cyan/50 rounded-2xl p-3 border border-white/10">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    <Image className="w-full h-full object-cover" src={item.image} alt={item.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-plus-jakarta-sans font-bold text-white text-base mb-1 truncate">{item.name}</h3>
                    <p className="font-jost text-sm text-white/70 line-clamp-1 mb-1">
                      {isFrench ? frenchDescriptions[index] : item.description}
                    </p>
                    <span className="font-inter font-semibold text-International-Orange text-sm">{item.price}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-International-Orange">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:grid grid-cols-12 gap-6 lg:gap-8">
            {theBestFood.map((item, index) => (
              <div key={item.name} className="col-span-6 lg:col-span-3">
                <div className="bg-Cyan/30 text-center flex items-center justify-center flex-col px-4 pb-8 rounded-tl-[3rem] rounded-br-[3rem] border border-white/5 hover:border-International-Orange/30 transition-all duration-500 group">
                  <div className="img w-[140px] h-[140px] lg:w-[180px] lg:h-[180px] relative overflow-hidden rounded-full border-4 border-International-Orange/20 -mt-12 lg:-mt-16 mb-4">
                    <Image className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.image} alt={item.name} />
                  </div>
                  <div className="content px-2">
                    <span className="block font-plus-jakarta-sans font-bold text-white text-base lg:text-lg">{item.name}</span>
                    <span className="block font-inter font-semibold text-International-Orange text-sm lg:text-base mb-2">{item.price}</span>
                    <p className="font-jost text-sm text-white/70 line-clamp-2">{isFrench ? frenchDescriptions[index] : item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 md:mt-12">
            <Link
              href="/skyline/our-menu"
              className="group inline-flex items-center justify-center gap-2 bg-International-Orange px-6 py-3 rounded-full font-jost font-semibold text-sm md:text-base text-Cyan hover:bg-white transition-all duration-300"
            >
              <span>{copy.viewMenu}</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheBestFood;
