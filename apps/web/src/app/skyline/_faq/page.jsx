'use client';
import React, { useState } from "react";
import Image from "next/image";
import faq1 from "@/assets/images/home-1/our-resturent-1.png";
import faq2 from "@/assets/images/home-1/our-resturent-2.png";

const Faq = () => {
  const [selected, setSelected] = useState(1);

  const toggleAccordion = (index) => {
    setSelected(selected !== index ? index : null);
  };

  return (
    <>
      {/* FAQ Section */}
      <div className="faq py-[70px] md:pt-[135px] md:pb-[139px] fade-in overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-12 lg:gap-x-[54px]">
            <div className="col-span-12 lg:col-span-6">
              <h2 className="subtitle font-Roboto font-normal text-International-Orange mb-[5px]">
                Some FAQ
              </h2>
              <h1 className="skew-up title font-plus-jakarta-sans font-semibold text-white mb-[60px]">
                Frequently Asked Questions
              </h1>

              {/* Accordion */}
              <div className="">
                <div className="max-w-full mx-auto">
                  <ul className="">
                    {[1, 2, 3, 4].map((index) => (
                      <li
                        key={index}
                        className={`relative border border-white/60 bg-black/5 rounded-[30px] mb-[30px] overflow-hidden wow bounceInUp`}
                        data-wow-duration="2s"
                        data-wow-delay={`${0.5 * index}s`}
                      >
                        <button
                          type="button"
                          className="w-full text-left"
                          onClick={() => toggleAccordion(index)}
                        >
                          <div
                            className={`flex items-center justify-between px-5 md:px-[30px] py-[15px] font-Roboto font-medium text-sm md:text-[20px] leading-[32px] text-white transition-all duration-700 ${
                              selected === index
                                ? "bg-International-Orange"
                                : ""
                            }`}
                          >
                            <span>
                              What kind of recipes can I find on your website?
                            </span>
                            <svg
                              className={`w-5 h-5 text-white transform ${
                                selected === index ? "rotate-180" : ""
                              }`}
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>
                        <div
                          className={`relative overflow-hidden transition-all duration-700 ${
                            selected === index ? "max-h-auto" : "max-h-0"
                          }`}
                          style={
                            selected === index ? { maxHeight: "100%" } : {}
                          }
                        >
                          <div className="py-2 md:py-5 px-5 md:px-[30px] font-jost font-normal text-sm md:text-[16px] leading-[25px] text-white">
                            <p>
                              It is a long established fact that a reader will
                              be distracted by the readable content of a page
                              when looking at its layout. Many desktop
                              publishing packages and web page editors now use
                              Lorem Ipsum as their default.
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <div className="flex items-end gap-[30px] relative">
                <div
                  className="img max-h-[300px] md:max-h-[400px] md:max-w-[100% - 1rem] lg:max-w-xl lg:max-h-[659px] w-full h-full overflow-hidden rounded-[5px] wow bounceInDown"
                  data-wow-duration="2s"
                  data-wow-delay=".5s"
                >
                  <Image
                    className="w-full h-full"
                    src={faq1}
                    alt="FAQ 1"
                  />
                </div>
                <div
                  className="vertical-border w-[19px] h-[300px] bg-International-Orange wow bounceInRight"
                  data-wow-duration="2s"
                  data-wow-delay="1s"
                ></div>
                <div
                  className="img max-w-[200px] lg:max-w-[295px] max-h-[300px] lg:max-h-[400px] w-full h-full overflow-hidden rounded-[20px] bg-white absolute top-[8rem] right-[-0.5rem] lg:right-[-3rem] wow bounceInLeft"
                  data-wow-duration="2s"
                  data-wow-delay="1.5s"
                >
                  <Image
                    className="w-full h-full p-1 md:p-[10px] rounded-[20px]"
                    src={faq2}
                    alt="FAQ 2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;




