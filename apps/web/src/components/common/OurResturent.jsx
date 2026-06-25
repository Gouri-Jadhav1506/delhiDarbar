'use client';

import { useSkylineLandingLocale } from "@/lib/useSkylineLandingLocale";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import OurResturent1 from "./../../assets/images/home-1/our-resturent-1.png";

const OurResturent = () => {
  const { isFrench } = useSkylineLandingLocale();

  const copy = isFrench
    ? {
        subtitle: "Notre Restaurant",
        title: "Vivez une soiree parfaite chez Skyline",
        description:
          "Skyline marie des saveurs indiennes authentiques avec une ambiance rooftop moderne. Une cuisine d'exception et une vue memorable pour une experience unique.",
        features: [
          { title: "Ambiance Rooftop", text: "Terrasse ouverte avec vue panoramique sur la ville" },
          { title: "Indien Moderne", text: "Interpetations contemporaines de recettes classiques" },
          { title: "Qualite Premium", text: "Ingredients frais selectionnes chaque jour" },
          { title: "Chefs Experts", text: "Des chefs experimentes pour une cuisine maitrisee" },
        ],
        button: "Decouvrir notre histoire",
      }
    : {
        subtitle: "Our Restaurant",
        title: "Experience the Perfect Evening at Skyline",
        description:
          "Skyline blends authentic Indian flavors with a modern rooftop ambiance. Where exceptional cuisine meets breathtaking views for an unforgettable dining experience.",
        features: [
          { title: "Rooftop Ambience", text: "Open-air terrace with panoramic city views" },
          { title: "Modern Indian", text: "Contemporary twists on classic recipes" },
          { title: "Premium Quality", text: "Fresh ingredients sourced daily" },
          { title: "Expert Chefs", text: "Culinary masters with decades of experience" },
        ],
        button: "Discover Our Story",
      };

  return (
    <div className="our-restaurant-wrapper bg-Dark-Cyan-Green overflow-hidden">
      <div className="container pt-[70px] md:pt-[140px] pb-[140px]">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="col-span-12 block lg:hidden mb-2">
            <h2 className="font-satisfy font-normal text-International-Orange flex items-center gap-3 text-lg md:text-xl mb-3">
              <span>
                <svg width="13" height="30" viewBox="0 0 13 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.02392 28.6457L7.97935 17.6722C9.169 17.5219 10.2426 17.1711 11.1421 16.6701C12.3607 15.9518 13.0281 15.0165 12.9991 14.0144L12.9701 11.2919L12.4768 0.418535C12.4478 0.201403 12.1286 0.000973324 11.7224 0.000973324C11.2872 -0.0157292 10.939 0.184701 10.91 0.435238L10.5908 10.5903L7.66018 10.6071L7.25396 0.435238C7.22494 0.201404 6.87675 0.000973324 6.47053 0.000973324C6.00628 -0.0157292 5.62907 0.184701 5.62907 0.451941L5.3099 10.6071L2.3793 10.6238L1.94406 0.451941C1.91504 0.234808 1.59587 0.0343784 1.18965 0.0343784C0.754411 0.0176759 0.40622 0.218106 0.377205 0.468643L0 11.3253L0.0290154 14.0645C0.0290154 15.8349 2.23422 17.3215 5.1358 17.6889L4.43942 28.6624C4.43942 28.6847 4.43942 28.707 4.43942 28.7292C4.49745 29.4475 5.54202 30.032 6.81872 29.9986C8.0664 29.9819 9.08195 29.3639 9.02392 28.6457Z" fill="#FFD84D" />
                </svg>
              </span>
              {copy.subtitle}
            </h2>
            <h2 className="text-3xl md:text-4xl font-plus-jakarta-sans font-semibold text-white leading-tight mb-4">{copy.title}</h2>
            <p className="font-jost text-white/70 text-base md:text-lg leading-relaxed max-w-xl">{copy.description}</p>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
                <Image className="w-full h-full object-cover" src={OurResturent1} alt="Our restaurant interior" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-Cyan/40 to-transparent" />
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:pl-8 mt-6 lg:mt-0">
            <div className="hidden lg:block mb-8">
              <h2 className="font-satisfy font-normal text-International-Orange flex items-center gap-3 text-xl mb-3">
                <span>
                  <svg width="13" height="30" viewBox="0 0 13 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.02392 28.6457L7.97935 17.6722C9.169 17.5219 10.2426 17.1711 11.1421 16.6701C12.3607 15.9518 13.0281 15.0165 12.9991 14.0144L12.9701 11.2919L12.4768 0.418535C12.4478 0.201403 12.1286 0.000973324 11.7224 0.000973324C11.2872 -0.0157292 10.939 0.184701 10.91 0.435238L10.5908 10.5903L7.66018 10.6071L7.25396 0.435238C7.22494 0.201404 6.87675 0.000973324 6.47053 0.000973324C6.00628 -0.0157292 5.62907 0.184701 5.62907 0.451941L5.3099 10.6071L2.3793 10.6238L1.94406 0.451941C1.91504 0.234808 1.59587 0.0343784 1.18965 0.0343784C0.754411 0.0176759 0.40622 0.218106 0.377205 0.468643L0 11.3253L0.0290154 14.0645C0.0290154 15.8349 2.23422 17.3215 5.1358 17.6889L4.43942 28.6624C4.43942 28.6847 4.43942 28.707 4.43942 28.7292C4.49745 29.4475 5.54202 30.032 6.81872 29.9986C8.0664 29.9819 9.08195 29.3639 9.02392 28.6457Z" fill="#FFD84D" />
                  </svg>
                </span>
                {copy.subtitle}
              </h2>
              <h2 className="text-[44px] font-plus-jakarta-sans font-semibold text-white leading-tight mb-4">{copy.title}</h2>
              <p className="font-jost text-white/70 text-lg leading-relaxed max-w-xl">{copy.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {copy.features.map((feature, index) => (
                <div key={feature.title} className="flex items-start gap-4 bg-Cyan/40 rounded-2xl p-4 border border-white/5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-International-Orange/10 flex items-center justify-center">
                    {index === 0 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-International-Orange">
                        <path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-9a2 2 0 012-2h4a2 2 0 012 2v9" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-International-Orange">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-International-Orange">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-International-Orange">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-plus-jakarta-sans font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="font-jost text-sm text-white/60">{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/skyline/about-us"
              className="group inline-flex items-center justify-center gap-3 bg-International-Orange px-8 py-4 rounded-full font-jost font-semibold text-base text-Cyan hover:bg-white transition-all duration-300 w-full sm:w-auto"
            >
              <span>{copy.button}</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurResturent;
