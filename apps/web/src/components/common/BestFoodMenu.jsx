'use client';

import { useSkylineLandingLocale } from "@/lib/useSkylineLandingLocale";
import React from "react";
import Link from "next/link";
import { bestFoodMenu } from "../data/bestFoodMenu";
import Image from "next/image";
import bestFoodMenu1 from "./../../assets/images/home-1/best-food-menu-1.png";
import bestFoodMenu2 from "./../../assets/images/home-1/best-food-menu-2.png";

const frenchDescriptions = [
  "Poulet tandoori effiloche dans une sauce cremeuse tomate-beurre.",
  "Lentilles noires et haricots rouges mijotes au beurre et a la creme.",
  "Poulet marine puis cuit au tandoor.",
  "Brochettes de paneer aux sauces tandoori et coriandre.",
];

const BestFoodMenu = () => {
  const { isFrench } = useSkylineLandingLocale();

  const copy = isFrench
    ? {
        subtitle: "Specialites du Chef",
        title: "Plats signatures",
        viewMenu: "Voir le menu complet",
        openingHours: "Horaires d'ouverture",
        hoursText: "Mar - Dim: 12h - 15h et 18h - 23h",
      }
    : {
        subtitle: "Chef's Specials",
        title: "Signature Dishes",
        viewMenu: "View Full Menu",
        openingHours: "Opening Hours",
        hoursText: "Tue - Sun: 12PM - 3PM & 6PM - 11PM",
      };

  return (
    <div className="best-food-menu-wrapper bg-Dark-Cyan-Green overflow-hidden">
      <div className="container pt-[70px] md:pt-[140px] pb-[140px]">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="font-satisfy font-normal text-International-Orange flex items-center justify-center gap-3 text-lg md:text-xl mb-4">
            <span>
              <svg width="13" height="30" viewBox="0 0 13 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.02392 28.6457L7.97935 17.6722C9.169 17.5219 10.2426 17.1711 11.1421 16.6701C12.3607 15.9518 13.0281 15.0165 12.9991 14.0144L12.9701 11.2919L12.4768 0.418535C12.4478 0.201403 12.1286 0.000973324 11.7224 0.000973324C11.2872 -0.0157292 10.939 0.184701 10.91 0.435238L10.5908 10.5903L7.66018 10.6071L7.25396 0.435238C7.22494 0.201404 6.87675 0.000973324 6.47053 0.000973324C6.00628 -0.0157292 5.62907 0.184701 5.62907 0.451941L5.3099 10.6071L2.3793 10.6238L1.94406 0.451941C1.91504 0.234808 1.59587 0.0343784 1.18965 0.0343784C0.754411 0.0176759 0.40622 0.218106 0.377205 0.468643L0 11.3253L0.0290154 14.0645C0.0290154 15.8349 2.23422 17.3215 5.1358 17.6889L4.43942 28.6624C4.43942 28.6847 4.43942 28.707 4.43942 28.7292C4.49745 29.4475 5.54202 30.032 6.81872 29.9986C8.0664 29.9819 9.08195 29.3639 9.02392 28.6457Z" fill="#FFD84D" />
              </svg>
            </span>
            {copy.subtitle}
          </h2>
          <h2 className="text-2xl md:text-4xl lg:text-[48px] font-plus-jakarta-sans font-semibold text-white leading-tight">{copy.title}</h2>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                <Image className="w-full h-full object-cover" src={bestFoodMenu1} alt="Signature dish presentation" />
                <div className="absolute inset-0 bg-gradient-to-t from-Cyan/60 to-transparent" />
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <div className="space-y-4 md:space-y-6">
              {bestFoodMenu.map((item, index) => (
                <div
                  key={item.name}
                  className="group flex items-center gap-4 md:gap-6 bg-Cyan/40 rounded-2xl p-4 md:p-6 border border-white/5 hover:border-International-Orange/30 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-International-Orange/10 flex items-center justify-center">
                    <span className="font-plus-jakarta-sans font-semibold text-International-Orange text-sm md:text-base">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h4 className="font-plus-jakarta-sans font-semibold text-white text-base md:text-lg lg:text-xl truncate">
                        {item.name}
                      </h4>
                      <span className="font-inter font-semibold text-International-Orange text-sm md:text-base whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                    <p className="font-jost text-sm text-white/60 line-clamp-1">
                      {isFrench ? frenchDescriptions[index] : item.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-International-Orange/20 transition-colors duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-International-Orange">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 md:mt-12">
              <Link
                href="/skyline/our-menu"
                className="group inline-flex items-center justify-center gap-2 bg-transparent border-2 border-International-Orange px-6 py-3 rounded-full font-jost font-semibold text-sm md:text-base text-International-Orange hover:bg-International-Orange hover:text-Cyan transition-all duration-300"
              >
                <span>{copy.viewMenu}</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
            <div className="hidden md:block bg-Cyan/40 rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-International-Orange/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-International-Orange">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <span className="font-plus-jakarta-sans font-semibold text-white">{copy.openingHours}</span>
              </div>
              <p className="font-jost text-white/70 text-sm">{copy.hoursText}</p>
            </div>

            <div className="hidden lg:block flex-1">
              <div className="relative rounded-2xl overflow-hidden h-full min-h-[300px]">
                <Image className="w-full h-full object-cover" src={bestFoodMenu2} alt="Restaurant ambiance" />
                <div className="absolute inset-0 bg-gradient-to-t from-Cyan/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestFoodMenu;
