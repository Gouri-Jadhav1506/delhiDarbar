'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryItems } from "../data/galleryData";

const DISPLAY_COUNT = 6; // 3 columns × 2 rows

const ProjectGallery = () => {
  const displayItems = galleryItems.slice(0, DISPLAY_COUNT);

  return (
    <div className="project-gallery overflow-hidden bg-Dark-Cyan-Green">
      <div className="md:bg-shape bg-no-repeat bg-customBgSize2 bg-center pt-[70px] md:pt-[140px] pb-[140px]">
        <div className="container">
          {/* Header */}
          <div className="grid grid-cols-12">
            <div className="col-span-12 text-center mb-[50px] md:mb-[70px]">
              <h2 className="section-subtitle font-satisfy font-normal subtitle text-International-Orange flex items-center justify-center gap-[15px]">
                <span>
                  <svg
                    width="13"
                    height="30"
                    viewBox="0 0 13 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.02392 28.6457L7.97935 17.6722C9.169 17.5219 10.2426 17.1711 11.1421 16.6701C12.3607 15.9518 13.0281 15.0165 12.9991 14.0144L12.9701 11.2919L12.4768 0.418535C12.4478 0.201403 12.1286 0.000973324 11.7224 0.000973324C11.2872 -0.0157292 10.939 0.184701 10.91 0.435238L10.5908 10.5903L7.66018 10.6071L7.25396 0.435238C7.22494 0.201404 6.87675 0.000973324 6.47053 0.000973324C6.00628 -0.0157292 5.62907 0.184701 5.62907 0.451941L5.3099 10.6071L2.3793 10.6238L1.94406 0.451941C1.91504 0.234808 1.59587 0.0343784 1.18965 0.0343784C0.754411 0.0176759 0.40622 0.218106 0.377205 0.468643L0 11.3253L0.0290154 14.0645C0.0290154 15.8349 2.23422 17.3215 5.1358 17.6889L4.43942 28.6624C4.43942 28.6847 4.43942 28.707 4.43942 28.7292C4.49745 29.4475 5.54202 30.032 6.81872 29.9986C8.0664 29.9819 9.08195 29.3639 9.02392 28.6457Z"
                      fill="#FFD84D"
                    />
                  </svg>
                </span>
                Our Gallery
              </h2>
              <h1 className="title font-plus-jakarta-sans font-semibold text-white mb-[30px] md:mb-[50px] skew-up">
                Capturing Moments of Excellence
              </h1>
            </div>
          </div>

          {/* Image Grid - 3 columns × 2 rows */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {displayItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer aspect-square"
              >
                <Image
                  src={item.image}
                  unoptimized
                  alt="Gallery image"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  priority={index < 6}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* View Full Gallery Button */}
          <div className="flex items-center justify-center mt-12 md:mt-16">
            <Link
              href="/skyline/gallery"
              className="group inline-flex items-center justify-center gap-[10px] bg-transparent border-2 border-International-Orange px-[36px] py-3 rounded-md font-jost font-semibold text-[16px] text-International-Orange hover:bg-International-Orange hover:text-white transition-all duration-500"
            >
              <span>View Full Gallery</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;
