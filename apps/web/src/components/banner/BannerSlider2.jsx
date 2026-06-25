'use client';

import { useSkylineLandingLocale } from "@/lib/useSkylineLandingLocale";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import heroBg from "./../../assets/images/home-1/hero-slider.png";
import heroBg2 from "./../../assets/images/home-1/hero-slider2.png";

const BannerSlider2 = () => {
  const { isFrench } = useSkylineLandingLocale();

  const copy = isFrench
    ? {
        subtitle1: "Dinez au-dessus de la ville. Celebrez sous les etoiles.",
        title1: "Une nouvelle vue, une nouvelle ambiance",
        title1Line2: "Une nouvelle ere de la cuisine.",
        exploreMenu: "Explorer le menu",
        subtitle2: "Votre echappee Skyline commence ici",
        title2: "Des nuits vibrantes",
        title2Line2: "au-dessus de la ville",
      }
    : {
        subtitle1: "Dine above the city. Celebrate beneath the stars.",
        title1: "A New View, New Vibe",
        title1Line2: "A New Era of Dining.",
        exploreMenu: "Explore Menu",
        subtitle2: "Your skyline escape begins here",
        title2: "Where Nights Come",
        title2Line2: "Alive Above the City",
      };

  return (
    <Swiper
      className="swiper banner-slider"
      slidesPerView={1}
      spaceBetween={20}
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      loop
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      modules={[Navigation, Autoplay]}
    >
      <SwiperSlide className="swiper-slide banner-slider-item flex items-center justify-center relative overflow-hidden">
        <div className="bg-black/60 w-full h-full text-center relative z-10 pt-[140px] pb-[70px] md:pt-[150px] md:pb-[150px] lg:pt-[256px] lg:pb-[260px]">
          <p className="banner-subtitle flex items-center justify-center text-center gap-[10px] md:gap-[30px] font-satisfy text-[12px] md:text-[18px] xl:text-[24px] lg:text-[20px] xl:leading-[32px] lg:leading-[25px] text-Beer mb-2 md:mb-4 px-4 overflow-hidden">
            <span>
              <svg width="67" height="12" viewBox="0 0 67 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M66.7735 6L61 0.226497L55.2265 6L61 11.7735L66.7735 6ZM61 5L8.74228e-08 4.99999L-8.74228e-08 6.99999L61 7L61 5Z" fill="#FFD84D" />
              </svg>
            </span>
            {copy.subtitle1}
          </p>
          <p className="banner-title split-collab font-plus-jakarta-sans font-extrabold text-[28px] leading-[1.2] sm:text-[40px] md:text-[60px] xl:text-[110px] lg:text-[60px] xl:leading-[145px] lg:leading-[65px] text-white mb-[30px] xl:mb-[88px] lg:mb-[40px] capitalize px-4">
            {copy.title1}
            <br />
            {copy.title1Line2}
          </p>
          <div className="flex items-center justify-center gap-x-2 md:gap-x-[27px]">
            <Link
              href="/skyline/our-menu"
              className="btn inline-flex items-center justify-center gap-[7px] bg-Beer px-[12px] md:px-[41px] rounded-md font-jost font-medium md:font-semibold text-[12px] md:text-[16px] xl:text-[18px] lg:text-[16px] leading-[38px] xl:leading-[58px] lg:leading-[45px] text-white"
            >
              <span className="btn__ink" />
              <div className="btn__inner">{copy.exploreMenu}</div>
              <span>
                <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.23096 5.78125L1.66846 10.4062C1.51221 10.5625 1.26221 10.5625 1.13721 10.4062L0.512207 9.78125C0.355957 9.625 0.355957 9.40625 0.512207 9.25L4.19971 5.5L0.512207 1.78125C0.355957 1.625 0.355957 1.375 0.512207 1.25L1.13721 0.625C1.26221 0.46875 1.51221 0.46875 1.66846 0.625L6.23096 5.25C6.38721 5.40625 6.38721 5.625 6.23096 5.78125Z" fill="#0F3435" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
        <Image src={heroBg} alt="hero background" fill priority className="object-cover" sizes="100vw" />
      </SwiperSlide>

      <SwiperSlide className="swiper-slide banner-slider-item flex items-center justify-center relative overflow-hidden">
        <div className="bg-black/60 w-full h-full text-center relative z-10 pt-[140px] pb-[70px] md:pt-[150px] md:pb-[150px] lg:pt-[256px] lg:pb-[260px]">
          <p className="banner-subtitle flex items-center justify-center text-center gap-[10px] md:gap-[30px] font-satisfy text-[12px] md:text-[18px] xl:text-[24px] lg:text-[20px] xl:leading-[32px] lg:leading-[25px] text-Beer mb-2 md:mb-4 px-4 overflow-hidden">
            <span>
              <svg width="67" height="12" viewBox="0 0 67 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M66.7735 6L61 0.226497L55.2265 6L61 11.7735L66.7735 6ZM61 5L8.74228e-08 4.99999L-8.74228e-08 6.99999L61 7L61 5Z" fill="#FFD84D" />
              </svg>
            </span>
            {copy.subtitle2}
          </p>
          <p className="banner-title split-collab font-plus-jakarta-sans font-extrabold text-[28px] leading-[1.2] sm:text-[40px] md:text-[60px] xl:text-[110px] lg:text-[60px] xl:leading-[145px] lg:leading-[65px] text-white mb-[30px] xl:mb-[88px] lg:mb-[40px] capitalize px-4">
            {copy.title2}
            <br />
            {copy.title2Line2}
          </p>
          <div className="flex items-center justify-center gap-x-2 md:gap-x-[27px]">
            <Link
              href="https://www.tripadvisor.com/Restaurant_Review-g297513-d1213994-Reviews-Delhi_Darbar-Abidjan_Lagunes_Region.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center justify-center gap-[7px] bg-Beer px-[12px] md:px-[41px] rounded-md font-jost font-medium md:font-semibold text-[12px] md:text-[16px] xl:text-[18px] lg:text-[16px] leading-[38px] xl:leading-[58px] lg:leading-[45px] text-white"
            >
              <span className="btn__ink" />
              <div className="btn__inner">Tripadvisor</div>
              <span>
                <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.23096 5.78125L1.66846 10.4062C1.51221 10.5625 1.26221 10.5625 1.13721 10.4062L0.512207 9.78125C0.355957 9.625 0.355957 9.40625 0.512207 9.25L4.19971 5.5L0.512207 1.78125C0.355957 1.625 0.355957 1.375 0.512207 1.25L1.13721 0.625C1.26221 0.46875 1.51221 0.46875 1.66846 0.625L6.23096 5.25C6.38721 5.40625 6.38721 5.625 6.23096 5.78125Z" fill="#0F3435" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
        <Image src={heroBg2} alt="hero background" fill priority className="object-cover" sizes="100vw" />
      </SwiperSlide>

      <div className="swiper-button-prev border !w-10 !h-10 md:!w-[66px] md:!h-[66px] rounded-full flex items-center justify-center hover:bg-white group lg:!left-[120px] xl:!left-[183px] after:content-none !top-[70%] md:!top-[50%]">
        <svg className="!w-5" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className="group-hover:fill-Beer"
            d="M0.223772 5.27955L5.27967 0.223543C5.42399 0.0792188 5.61635 0 5.82145 0C6.02678 0 6.21902 0.0793326 6.36335 0.223543L6.82238 0.682693C6.96659 0.82679 7.04604 1.01926 7.04604 1.22448C7.04604 1.42958 6.96659 1.62854 6.82238 1.77264L3.87285 4.72866H13.2437C13.6662 4.72866 14 5.05942 14 5.48203V6.13115C14 6.55376 13.6662 6.91788 13.2437 6.91788H3.83939L6.82227 9.8904C6.96648 10.0347 7.04593 10.222 7.04593 10.4272C7.04593 10.6322 6.96648 10.8221 6.82227 10.9663L6.36323 11.424C6.21891 11.5683 6.02667 11.647 5.82134 11.647C5.61623 11.647 5.42388 11.5673 5.27955 11.423L0.223659 6.3671C0.0789928 6.22232 -0.000566483 6.02905 1.90735e-06 5.82361C-0.000452995 5.61748 0.0789928 5.4241 0.223772 5.27955Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="swiper-button-next border !w-10 !h-10 md:!w-[66px] md:!h-[66px] rounded-full flex items-center justify-center hover:bg-white group lg:!right-[120px] xl:!right-[183px] after:content-none !top-[70%] md:!top-[50%]">
        <svg className="rotate-180 !w-5" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className="group-hover:fill-Beer"
            d="M0.223772 5.27955L5.27967 0.223543C5.42399 0.0792188 5.61635 0 5.82145 0C6.02678 0 6.21902 0.0793326 6.36335 0.223543L6.82238 0.682693C6.96659 0.82679 7.04604 1.01926 7.04604 1.22448C7.04604 1.42958 6.96659 1.62854 6.82238 1.77264L3.87285 4.72866H13.2437C13.6662 4.72866 14 5.05942 14 5.48203V6.13115C14 6.55376 13.6662 6.91788 13.2437 6.91788H3.83939L6.82227 9.8904C6.96648 10.0347 7.04593 10.222 7.04593 10.4272C7.04593 10.6322 6.96648 10.8221 6.82227 10.9663L6.36323 11.424C6.21891 11.5683 6.02667 11.647 5.82134 11.647C5.61623 11.647 5.42388 11.5673 5.27955 11.423L0.223659 6.3671C0.0789928 6.22232 -0.000566483 6.02905 1.90735e-06 5.82361C-0.000452995 5.61748 0.0789928 5.4241 0.223772 5.27955Z"
            fill="white"
          />
        </svg>
      </div>
    </Swiper>
  );
};

export default BannerSlider2;
