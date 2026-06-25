'use client';
import React from 'react';
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import foodSlider1 from "./../../assets/images/food-slider/food-slider-1.png";
import foodSlider2 from "./../../assets/images/food-slider/food-slider-2.png";
import foodSlider3 from "./../../assets/images/food-slider/food-slider-3.png";
import foodSlider4 from "./../../assets/images/food-slider/food-slider-4.png";
import foodSlider5 from "./../../assets/images/food-slider/food-slider-5.png";
import foodSlider6 from "./../../assets/images/food-slider/food-slider-6.png";
import foodSlider7 from "./../../assets/images/food-slider/food-slider-7.png";
import foodSlider8 from "./../../assets/images/food-slider/food-slider-8.png";
import foodSlider9 from "./../../assets/images/food-slider/food-slider-9.png";
import foodSlider10 from "./../../assets/images/food-slider/food-slider-10.png";

const foodImages = [
  { src: foodSlider1, alt: "Delicious Indian cuisine" },
  { src: foodSlider2, alt: "Authentic flavors" },
  { src: foodSlider3, alt: "Fresh ingredients" },
  { src: foodSlider4, alt: "Signature dishes" },
  { src: foodSlider5, alt: "Traditional recipes" },
  { src: foodSlider6, alt: "Exquisite presentation" },
  { src: foodSlider7, alt: "Culinary delights" },
  { src: foodSlider8, alt: "Gourmet food" },
  { src: foodSlider9, alt: "Flavorful dishes" },
  { src: foodSlider10, alt: "Premium quality" }
];

const MarqueeSlider = () => {
  return (
    <>
      <div className="bg-Dark-Cyan-Green">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
          <Swiper
            className="marquee-slider"
            modules={[Autoplay]}
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={0}
            loop={true}
            speed={6000}
            autoplay={{ delay: 1, disableOnInteraction: true }}
            allowTouchMove={false}
          >
            {foodImages.map((image, index) => (
              <SwiperSlide
                key={index}
                className="swiper-slide wow overlay-anim zoom-effect overflow-hidden"
                data-wow-duration=".5s"
                data-wow-delay={`${0.3 + (index * 0.2)}s`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={200}
                  className="object-cover"
                />
              </SwiperSlide>
            ))}
            {/* Duplicate for seamless loop */}
            {foodImages.map((image, index) => (
              <SwiperSlide
                key={`dup-${index}`}
                className="swiper-slide wow overlay-anim zoom-effect overflow-hidden"
                data-wow-duration=".5s"
                data-wow-delay={`${0.3 + (index * 0.2)}s`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={200}
                  className="object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarqueeSlider;
