'use client';
import { useSkylineLandingLocale } from "@/lib/useSkylineLandingLocale";
import React, { useState } from "react";
import Image from "next/image";

const FoodPlaySection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isFrench } = useSkylineLandingLocale();
  
  return (
    <>
       <div className="food-play-wrapper relative h-[300px] md:h-[555px] flex items-center justify-center fade-in overflow-hidden">
        <Image
          src="/assets/images/home-1/video-thumbnail.png"
          alt="Play video thumbnail"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="video-play-btn ripple">
          <button
            className="btn play-btn popup-video w-[100px] md:w-[148px] h-[100px] md:h-[148px] !rounded-full bg-International-Orange flex items-center justify-center flex-col font-plus-jakarta-sans font-medium md:font-semibold text-xs md:text-base leading-[20px] text-white"
            onClick={() => setIsOpen(true)}
          >
            <div className="btn__inner flex items-center justify-center flex-col">
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_351_722)">
                  <path
                    d="M15.7911 8.8584L15.7924 8.85933C15.8655 8.90943 15.9328 8.97599 15.9978 9.06315C16.2379 9.4193 16.1469 9.90109 15.7955 10.1428L15.7949 10.1433L4.08695 18.2257C4.08691 18.2257 4.08688 18.2257 4.08684 18.2257C3.56895 18.5829 2.86328 18.2122 2.86328 17.5833V1.41844C2.86328 0.789571 3.5689 0.418834 4.08678 0.775971C4.08684 0.776009 4.08689 0.776047 4.08695 0.776085L15.7911 8.8584Z"
                    stroke="#0F3435"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_351_722">
                    <rect
                      width="19"
                      height="19"
                      fill="white"
                      transform="translate(-0.00390625 0.000976562)"
                    />
                  </clipPath>
                </defs>
              </svg>
              {isFrench ? "voir la video" : "play video"}
            </div>
          </button>
        </div>
      </div>

       {/* Custom Video Modal */}
       {isOpen && (
         <div 
           className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-4 md:p-10"
           onClick={() => setIsOpen(false)}
         >
           <button 
             className="absolute top-10 right-10 text-white text-6xl z-[1001] hover:text-Beer transition-colors"
             onClick={() => setIsOpen(false)}
           >
             &times;
           </button>
           <div 
             className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black"
             onClick={(e) => e.stopPropagation()}
           >
             <video 
               src="https://api.delhidarbargroup.com/wp-content/uploads/2026/04/Intro.mp4" 
               controls 
               autoPlay 
               className="w-full h-full object-contain"
             />
           </div>
         </div>
       )}
    </>
  );
};

export default FoodPlaySection;
