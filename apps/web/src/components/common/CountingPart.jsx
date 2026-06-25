'use client';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const CountingPart = () => {
  const countersRef = useRef([]);

  useEffect(() => {
    countersRef.current.forEach((counter) => {
      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: counter.getAttribute("data-count"),
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          snap: { innerText: 1 },
          onUpdate: function () {
            counter.innerText = Math.ceil(counter.innerText);
          }
        }
      );
    });
  }, []);

  return (
    <>
      <div className="counting-part-wrapper overflow-hidden fade-in">
        <div className="container">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <div className="flex items-center justify-between flex-col md:flex-row">
                <div className="text-center">
                  <h2 className="font-plus-jakarta-sans font-bold text-[45px] lg:text-[96px] leading-[120px] text-white mb-5 lg:mb-[47px]">
                    <span
                      className="counter"
                      data-count="25"
                      ref={(el) => (countersRef.current[0] = el)}
                    ></span>
                  </h2>
                  <p className="font-plus-jakarta-sans font-medium text-sm lg:text-base leading-[32px] text-white">
                    Years Of Experience
                  </p>
                </div>
                <div className="">
                  <p className="relative before:dashed-border w-[49px]"></p>
                </div>
                <div className="text-center">
                  <h2 className="font-plus-jakarta-sans font-bold text-[45px] lg:text-[96px] leading-[120px] text-Beer text-stroke-1 mb-5 lg:mb-[47px]">
                    <span
                      className="counter"
                      data-count="3"
                      ref={(el) => (countersRef.current[1] = el)}
                    ></span>
                    k
                  </h2>
                  <p className="font-plus-jakarta-sans font-medium text-sm lg:text-base leading-[32px] text-Beer">
                    Project completed
                  </p>
                </div>
                <div>
                  <p className="relative before:dashed-border w-[49px]"></p>
                </div>
                <div className="text-center">
                  <h2 className="font-plus-jakarta-sans font-bold text-[45px] lg:text-[96px] leading-[120px] text-white mb-5 lg:mb-[47px]">
                    <span
                      className="counter"
                      data-count="48"
                      ref={(el) => (countersRef.current[2] = el)}
                    ></span>
                  </h2>
                  <p className="font-plus-jakarta-sans font-medium text-sm lg:text-base leading-[32px] text-white">
                    Professionals Team Member
                  </p>
                </div>
                <div>
                  <p className="relative before:dashed-border w-[49px]"></p>
                </div>
                <div className="text-center">
                  <h2 className="font-plus-jakarta-sans font-bold text-[45px] lg:text-[96px] leading-[120px] text-transparent text-stroke-1 mb-5 lg:mb-[47px]">
                    <span
                      className="counter text-Beer"
                      data-count="92"
                      ref={(el) => (countersRef.current[3] = el)}
                    ></span>
                  </h2>
                  <p className="font-plus-jakarta-sans font-medium text-sm lg:text-base leading-[32px] text-Beer">
                    Awards Winning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountingPart;
