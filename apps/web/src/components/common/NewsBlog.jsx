import React from "react";
import Link from "next/link";
import Image from "next/image";
import MarqueeSlider from "./MarqueeSlider";

const NewsBlog = ({data}) => {
  return (
    <>
      <div className="news-blog bg-texture bg-no-repeat bg-cover bg-center overflow-hidden fade-in">
        <div className="md:bg-shape bg-no-repeat bg-customBgSize2 bg-center pt-[70px] md:pt-[140px]">
          <div className="container pb-[140px] bg-cover">
            <div className="grid grid-cols-12 gap-4 md:gap-[30px]">
              <div className="col-span-12 text-center mb-10 md:mb-[70px]">
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
                        fill="#DF3F01"
                      />
                    </svg>
                  </span>
                  News &amp; Blogs
                </h2>
                <h1 className="title font-plus-jakarta-sans font-semibold text-white skew-up">
                  Get Every Single Updates
                </h1>
              </div>

              {data.map((item, index) => (
                <div
                  key={index}
                  className="col-span-12 md:col-span-6 lg:col-span-4 bg-Dark-Cyan-Green rounded-bl-[16px] rounded-br-[16px] wow bounceInLeft group"
                  data-wow-duration="1s"
                  data-wow-delay="1s"
                >
                  <div className="img relative mb-[18px] md:mb-[35px] wow overlay-anim zoom-effect overflow-hidden">
                    <Image
                      className="w-full h-full rounded-tl-[10px] rounded-tr-[10px] object-cover"
                      src={item.image}
                      alt={item.title}
                    />
                    <div className="date absolute top-[18px] right-[18px] bg-International-Orange rounded-[3px] flex flex-col items-center justify-center py-[13px] px-5">
                      {item.date.split(" ").map((item, index) => (
                        <span
                          key={item + index}
                          className={`font-jost font-medium ${
                            index === 0 &&
                            "text-[18px] md:text-[24px] leading-[34px]"
                          } ${
                            index === 1 &&
                            "text-[14px] md:text-base leading-[23px]"
                          }  text-white`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="content px-3 md:px-[30px] pb-[20px] md:pb-[34px] border-b border-white/10 mb-5">
                    <h6 className="jost font-medium text-base leading-[23px] text-International-Orange mb-[21px]">
                      {item.category}
                    </h6>
                    <Link
                      href="/skyline/blog-details"
                      className="blockfont-plus-jakarta-sans font-semibold text-[14px] lg:text-[16px] xl:text-[21px] leading-[30px] text-white"
                    >
                      {item.title}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between px-3 md:px-[30px] pb-[34px]">
                    <p className="flex items-center justify-start gap-[7px] font-jost font-normal text-[14px] md:text-base leading-[23px] text-white">
                      <span>
                        <svg
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.75 3.75C9.40625 3.75 10.75 5.09375 10.75 6.75C10.75 8.40625 9.40625 9.75 7.75 9.75C6.09375 9.75 4.75 8.40625 4.75 6.75C4.75 5.09375 6.09375 3.75 7.75 3.75ZM7.75 8.25C8.5625 8.25 9.25 7.59375 9.25 6.75C9.25 5.9375 8.5625 5.25 7.75 5.25C6.90625 5.25 6.25 5.9375 6.25 6.75C6.25 7.59375 6.90625 8.25 7.75 8.25ZM7.75 0.75C12.0312 0.75 15.5 4.21875 15.5 8.5C15.5 12.7812 12.0312 16.25 7.75 16.25C3.46875 16.25 0 12.7812 0 8.5C0 4.21875 3.46875 0.75 7.75 0.75ZM7.75 14.75C9.28125 14.75 10.7188 14.1875 11.8125 13.25C11.3438 12.5312 10.5312 12.0625 9.625 12.0312C8.96875 12.2188 8.34375 12.3125 7.75 12.3125C7.125 12.3125 6.5 12.2188 5.84375 12.0312C4.9375 12.0312 4.125 12.5312 3.65625 13.25C4.75 14.1875 6.1875 14.75 7.75 14.75ZM12.8125 12.125C13.5625 11.125 14 9.875 14 8.5C14 5.0625 11.1875 2.25 7.75 2.25C4.28125 2.25 1.5 5.0625 1.5 8.5C1.5 9.875 1.90625 11.125 2.65625 12.125C3.40625 11.1562 4.59375 10.5 5.9375 10.5C6.25 10.5 6.75 10.8125 7.75 10.8125C8.71875 10.8125 9.21875 10.5 9.53125 10.5C10.875 10.5 12.0625 11.1562 12.8125 12.125Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      {item.author}
                    </p>
                    <p className="flex items-center justify-start gap-[7px] font-jost font-normal text-[14px] md:text-base leading-[23px] text-white">
                      <span>
                        <svg
                          width="17"
                          height="15"
                          viewBox="0 0 17 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.5 4.75C12.75 4.75 13 5 13 5.25V5.75C13 6.03125 12.75 6.25 12.5 6.25H5.5C5.21875 6.25 5 6.03125 5 5.75V5.25C5 5 5.21875 4.75 5.5 4.75H12.5ZM9.5 7.75C9.75 7.75 10 8 10 8.25V8.75C10 9.03125 9.75 9.25 9.5 9.25H5.5C5.21875 9.25 5 9.03125 5 8.75V8.25C5 8 5.21875 7.75 5.5 7.75H9.5ZM9 0.5C13.4062 0.5 17 3.4375 17 7C17 10.5938 13.4062 13.5 9 13.5C7.96875 13.5 7 13.3438 6.09375 13.0625C5.1875 13.7188 3.65625 14.5 1.75 14.5C1.4375 14.5 1.15625 14.3438 1.03125 14.0625C0.9375 13.7812 0.96875 13.4688 1.1875 13.25C1.21875 13.25 2.1875 12.1875 2.625 10.9688C1.59375 9.875 1 8.5 1 7C1 3.4375 4.5625 0.5 9 0.5ZM9 12C12.5625 12 15.5 9.78125 15.5 7C15.5 4.25 12.5625 2 9 2C5.40625 2 2.5 4.25 2.5 7C2.5 8.34375 3.15625 9.34375 3.71875 9.9375L4.375 10.625L4.03125 11.5C3.875 11.9375 3.65625 12.375 3.40625 12.75C4.15625 12.5 4.78125 12.1562 5.21875 11.8438L5.8125 11.4062L6.53125 11.625C7.3125 11.875 8.15625 12 9 12Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      Comments({item.comments})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <MarqueeSlider />
        </div>
      </div>
    </>
  );
};

export default NewsBlog;
