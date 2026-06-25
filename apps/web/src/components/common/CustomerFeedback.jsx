'use client';

import { useSkylineLandingLocale } from "@/lib/useSkylineLandingLocale";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const CustomerFeedback = () => {
  const { isFrench } = useSkylineLandingLocale();

  const testimonials = isFrench
    ? [
        {
          id: 1,
          name: "ZodiacTravels",
          location: "Voyageur international",
          quote:
            "Lieu propre et bien eclaire, service efficace. Le proprietaire a pris la commande et la cuisine etait excellente. Je reviendrai.",
          rating: 5,
        },
        {
          id: 2,
          name: "Paramjeet S",
          location: "Hyderabad, Inde",
          quote: "Bonne cuisine, un peu couteuse, mais l'experience vaut la visite.",
          rating: 4,
        },
        {
          id: 3,
          name: "RTapan",
          location: "Ahmedabad, Inde",
          quote:
            "Nous avons pris dejeuner et diner ici. Saveurs excellentes et service fiable, y compris la livraison a l'hotel.",
          rating: 5,
        },
        {
          id: 4,
          name: "capetownbiker",
          location: "Blantyre, Malawi",
          quote:
            "Dejeuner avec des collegues: tres bonne cuisine, service au niveau, et selection indienne solide. Adresse a essayer.",
          rating: 5,
        },
      ]
    : [
        {
          id: 1,
          name: "ZodiacTravels",
          location: "World Traveler",
          quote:
            "Well-lit, clean place with great service. The owner took our order and spoke good English. Food was impressive and came fast. Will definitely return!",
          rating: 5,
        },
        {
          id: 2,
          name: "Paramjeet S",
          location: "Hyderabad, India",
          quote:
            "Food is good but can get expensive. Worth visiting and eating here. They've moved to a new location this time.",
          rating: 4,
        },
        {
          id: 3,
          name: "RTapan",
          location: "Ahmedabad, India",
          quote:
            "Had lunch and dinner here. Food tastes great and they deliver to your hotel in Abidjan. Worth trying their Indian veg and non-veg dishes.",
          rating: 5,
        },
        {
          id: 4,
          name: "capetownbiker",
          location: "Blantyre, Malawi",
          quote:
            "Had lunch with business colleagues. Food and service were top notch with nice Indian selection. Surprisingly empty for such quality. Worth stopping by!",
          rating: 5,
        },
      ];

  return (
    <div className="customer-feedback-section bg-shape bg-no-repeat bg-cover bg-center pt-[70px] md:pt-[140px] pb-[140px] overflow-hidden">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-satisfy font-normal text-International-Orange flex items-center justify-center gap-3 text-lg md:text-xl mb-4">
            <span>
              <svg width="13" height="30" viewBox="0 0 13 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.02392 28.6457L7.97935 17.6722C9.169 17.5219 10.2426 17.1711 11.1421 16.6701C12.3607 15.9518 13.0281 15.0165 12.9991 14.0144L12.9701 11.2919L12.4768 0.418535C12.4478 0.201403 12.1286 0.000973324 11.7224 0.000973324C11.2872 -0.0157292 10.939 0.184701 10.91 0.435238L10.5908 10.5903L7.66018 10.6071L7.25396 0.435238C7.22494 0.201404 6.87675 0.000973324 6.47053 0.000973324C6.00628 -0.0157292 5.62907 0.184701 5.62907 0.451941L5.3099 10.6071L2.3793 10.6238L1.94406 0.451941C1.91504 0.234808 1.59587 0.0343784 1.18965 0.0343784C0.754411 0.0176759 0.40622 0.218106 0.377205 0.468643L0 11.3253L0.0290154 14.0645C0.0290154 15.8349 2.23422 17.3215 5.1358 17.6889L4.43942 28.6624C4.43942 28.6847 4.43942 28.707 4.43942 28.7292C4.49745 29.4475 5.54202 30.032 6.81872 29.9986C8.0664 29.9819 9.08195 29.3639 9.02392 28.6457Z" fill="#FFD84D" />
              </svg>
            </span>
            {isFrench ? "Temoignages" : "Testimonials"}
          </h2>
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-plus-jakarta-sans font-semibold text-white leading-tight">
            {isFrench ? "Ce que disent nos clients" : "What Our Clients Say"}
          </h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          loop
          autoHeight={false}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-14"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <div className="bg-Cyan/40 rounded-2xl p-6 md:p-8 border border-white/5 h-full min-h-[280px] flex flex-col">
                <div className="mb-4">
                  <svg width="32" height="24" viewBox="0 0 34 26" fill="none" className="text-International-Orange">
                    <path d="M25.5202 25.625C20.862 25.625 17.4994 21.7793 17.4995 16.0851C17.5293 7.8118 23.7488 1.96232 32.7213 0.838982C33.5537 0.734764 33.8747 1.88791 33.1081 2.22877C29.6653 3.75964 27.9265 5.70224 27.7019 7.62503C27.5341 9.06158 28.315 10.32 29.2956 10.5556C31.8378 11.1665 33.541 14.3323 33.541 17.6042C33.541 22.034 29.95 25.625 25.5202 25.625Z" fill="currentColor" />
                    <path d="M8.0202 25.625C3.36198 25.625 -0.00063324 21.7793 -0.000520706 16.0851C0.0293121 7.8118 6.24879 1.96232 15.2213 0.838982C16.0537 0.734764 16.3747 1.88791 15.6081 2.22877C12.1653 3.75964 10.4265 5.70224 10.2019 7.62503C10.0341 9.06158 10.8151 10.32 11.7956 10.5556C14.3378 11.1665 16.041 14.3323 16.041 17.6042C16.041 22.034 12.45 25.625 8.0202 25.625Z" fill="currentColor" />
                  </svg>
                </div>

                <p className="font-jost text-white/80 text-sm md:text-base leading-relaxed flex-grow mb-6">{item.quote}</p>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={`${item.id}-${i}`}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={i < item.rating ? "currentColor" : "none"}
                      className={i < item.rating ? "text-International-Orange" : "text-white/20"}
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-International-Orange/20 flex items-center justify-center">
                    <span className="font-plus-jakarta-sans font-semibold text-International-Orange text-sm">{item.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-plus-jakarta-sans font-semibold text-white text-sm">{item.name}</h4>
                    <p className="font-jost text-white/50 text-xs">{item.location}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CustomerFeedback;
