'use client';
import { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";
import Link from "next/link";
import Image from "next/image";
import NewsBlog from "@/components/common/NewsBlog";
import { newsBlogData } from "@/components/data/newsBlogData";
import blogStandard1 from "@/assets/images/blog-standard/blog-standard-1.png";
import blogStandard2 from "@/assets/images/blog-standard/blog-standard-2.png";
import blogStandard3 from "@/assets/images/blog-standard/blog-standard-3.png";
import blogDetails10 from "@/assets/images/blog-details/blog-details-10.png";
import blogDetails11 from "@/assets/images/blog-details/blog-details-11.png";
import blogDetails12 from "@/assets/images/blog-details/blog-details-12.png";

const Blog = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* <!-- blog details --> */}
      <div className="service-details py-[150px] fade-in">
        <div className="container">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-8 order-2 lg:order-1">
              <div className="left-bar">
                <div className="service-1 mb-[30px]">
                  <div className="comment bg-texture bg-no-repeat bg-cover bg-center py-[42px] px-8 mb-10">
                    <div className="icon mb-[15px]">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.48369 2.98633C4.94392 2.98633 5.31744 3.35985 5.31744 3.82008C5.31744 4.28031 4.94392 4.65383 4.48369 4.65383H3.7825C3.32394 4.65383 2.94875 5.02902 2.94875 5.48758V17.9938C2.94875 18.4524 3.32394 18.8276 3.7825 18.8276H11.0361C11.4588 18.8276 11.8148 19.1436 11.864 19.5638C12.0391 21.052 12.3843 24.9907 10.3708 29.1928C9.06762 31.9183 7.32341 33.7617 5.92438 34.9406C7.62523 35.014 10.1315 34.7639 12.481 33.1481C12.8604 32.8871 13.3798 32.983 13.6407 33.3624C13.9017 33.7417 13.8059 34.2611 13.4265 34.5221C9.13852 37.4702 4.40533 36.4956 3.60159 36.3163C3.2756 36.2438 3.02381 35.9845 2.96295 35.656C2.90125 35.3275 3.04214 34.994 3.31978 34.8089C4.50787 34.0168 7.12419 32.1167 8.86673 28.4724C10.4192 25.2333 10.415 22.1651 10.2816 20.4951H3.7825C2.40681 20.4951 1.28125 19.3695 1.28125 17.9938V5.48758C1.28125 4.11189 2.40681 2.98633 3.7825 2.98633H4.48369ZM17.06 30.4651C16.8398 30.8694 16.3329 31.0178 15.9286 30.7977C15.525 30.5768 15.3758 30.0699 15.5967 29.6663C17.3318 26.4897 17.1225 23.1647 17.1225 22.9963V5.48758C17.1225 5.02902 16.7473 4.65383 16.2888 4.65383H7.00662C6.54639 4.65383 6.17287 4.28031 6.17287 3.82008C6.17287 3.35985 6.54639 2.98633 7.00662 2.98633H16.2888C17.6644 2.98633 18.79 4.11189 18.79 5.48758V22.9963C18.79 23.1848 19.0043 26.9058 17.06 30.4651Z"
                          fill="#DF3F01"
                        />
                        <path
                          d="M15.2551 33.0688C15.7153 33.0688 16.0884 32.6958 16.0884 32.2356C16.0884 31.7754 15.7153 31.4023 15.2551 31.4023C14.7949 31.4023 14.4219 31.7754 14.4219 32.2356C14.4219 32.6958 14.7949 33.0688 15.2551 33.0688Z"
                          fill="#DF3F01"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M37.9658 6.34385C37.9658 6.80408 37.5923 7.1776 37.132 7.1776C36.6718 7.1776 36.2983 6.80408 36.2983 6.34385V5.48758C36.2983 5.02902 35.9231 4.65383 35.4645 4.65383H22.9583C22.4997 4.65383 22.1245 5.02902 22.1245 5.48758V17.9938C22.1245 18.4524 22.4997 18.8276 22.9583 18.8276H30.2119C30.6346 18.8276 30.9906 19.1436 31.0398 19.5638C31.2149 21.052 31.5601 24.9907 29.5466 29.1928C28.2434 31.9183 26.4992 33.7617 25.1002 34.9406C26.801 35.014 29.3065 34.7639 31.656 33.1489C36.7235 29.6397 36.2983 23.2306 36.2983 22.9963V8.86678C36.2983 8.40655 36.6718 8.03303 37.132 8.03303C37.5923 8.03303 37.9658 8.40655 37.9658 8.86678V22.9963C37.9658 23.2623 38.3743 30.5259 32.6039 34.5204L32.6023 34.5221C28.3143 37.4702 23.5811 36.4956 22.7774 36.3163C22.4514 36.2438 22.1996 35.9845 22.1387 35.656C22.077 35.3275 22.2179 34.994 22.4956 34.8089C23.6836 34.0168 26.3 32.1167 28.0425 28.4724C29.5949 25.2333 29.5907 22.1651 29.4573 20.4951H22.9583C21.5826 20.4951 20.457 19.3695 20.457 17.9938V5.48758C20.457 4.11189 21.5826 2.98633 22.9583 2.98633H35.4645C36.8402 2.98633 37.9658 4.11189 37.9658 5.48758V6.34385Z"
                          fill="#DF3F01"
                        />
                      </svg>
                    </div>
                    <p className="description font-jost font-normal text-base leading-[26px] text-white mb-10">
                      Tosser argy-bargy mush loo at public school Elizabeth up
                      the duff buggered chinwag on your bike mate don’t get
                      shirty with me super, Jeffrey bobby Richard cheesed off
                      spend a penny a load of old tosh blag horseTosser
                      argy-bargy mush loo at public school Elizabeth up the duff
                      buggered chinwag on your bike mate don’t get
                    </p>
                    <p className="title font-plus-jakarta-sans font-bold text-[24px] leading-[34px] text-International-Orange pl-12 relative after:w-[40px] after:h-[3px] after:bg-International-Orange after:rounded-[2px] after:absolute after:top-1/2 after:left-0">
                      Silvester Scott
                    </p>
                  </div>
                  <div className="img relative mb-[29px] wow overlay-anim zoom-effect overflow-hidden">
                    <Image
                      className="w-full h-full"
                      src={blogStandard1}
                      alt=""
                    />
                    <span onClick={() => setIsOpen(true)}
                      className="cursor-pointer play-btn popup-video before:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <svg
                        width="112"
                        height="112"
                        viewBox="0 0 112 112"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="56" cy="56" r="45" fill="white" />
                        <circle
                          id="dotted"
                          cx="56"
                          cy="56"
                          r="55"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinejoin="round"
                          strokeDasharray="4 4"
                        />
                        <g clipPath="url(#clip0_486_3245)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M71.0473 54.065L43.6106 38.2241C43.3597 38.078 43.0747 38.0006 42.7844 37.9995H42.7796C42.4891 38.0007 42.204 38.0782 41.9529 38.2242C41.7 38.3684 41.49 38.5774 41.3445 38.8295C41.199 39.0817 41.1233 39.3681 41.125 39.6592V71.3408C41.1239 71.6321 41.1997 71.9185 41.3449 72.1711C41.49 72.4237 41.6994 72.6334 41.9516 72.7791C42.2039 72.9248 42.4902 73.0012 42.7815 73.0006C43.0729 73.0001 43.3589 72.9225 43.6106 72.7759L71.0473 56.9349C71.2992 56.7895 71.5084 56.5803 71.6538 56.3284C71.7993 56.0766 71.8758 55.7908 71.8758 55.5C71.8758 55.2091 71.7993 54.9234 71.6538 54.6715C71.5084 54.4196 71.2992 54.2104 71.0473 54.065Z"
                            fill="#DF3F01"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_486_3245">
                            <rect
                              width="35"
                              height="35"
                              fill="white"
                              transform="translate(39 38)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  </div>
                  <span className="publish-by-date flex items-center justify-start font-jost font-normal text-[17px] leading-[26px] text-white mb-[11px]">
                    By Admin / 17 Aug 2024 / Digital
                  </span>
                  <h2 className="font-plus-jakarta-sans font-semibold text-[35px] leading-[45px] text-white mb-[15px]">
                    Restaurants Are Changing The Foods Landscape And It&apos;s
                    Fun
                  </h2>
                  <p className="font-jost font-normal text-[16px] leading-[26px] text-white mb-[30px]">
                    Global business consultancies play a critical role in
                    driving thought leadership and knowledge exchange on a
                    global scale. Through industry reports, white papers,
                    seminars, and conferences, these firms share insights, best
                    practices, and emerging trends that shape the future of
                    international business.
                  </p>
                  <Link
                    href="/skyline/blog-details"
                    className="btn inline-flex items-center justify-center gap-x-[7px] font-jost font-normal leading-[40px] md:leading-[56px] text-[14px] md:text-[14px] text-white bg-International-Orange px-[12px] lg:px-[41px] rounded-md"
                    data-abc="true"
                  >
                    <span className="btn__ink"></span>
                    <div className="btn__inner">Read More</div>
                    <span>
                      <svg
                        width="7"
                        height="11"
                        viewBox="0 0 7 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.23096 5.78125L1.66846 10.4062C1.51221 10.5625 1.26221 10.5625 1.13721 10.4062L0.512207 9.78125C0.355957 9.625 0.355957 9.40625 0.512207 9.25L4.19971 5.5L0.512207 1.78125C0.355957 1.625 0.355957 1.375 0.512207 1.25L1.13721 0.625C1.26221 0.46875 1.51221 0.46875 1.66846 0.625L6.23096 5.25C6.38721 5.40625 6.38721 5.625 6.23096 5.78125Z"
                          fill="white"
                        ></path>
                      </svg>
                    </span>
                  </Link>
                </div>
                <div className="service-1 zoom-effect mb-[30px]">
                  <div className="img overflow-hidden mb-[25px] wow overlay-anim zoom-effect">
                    <Image
                      className="w-full h-full"
                      src={blogStandard2}
                      alt=""
                    />
                  </div>
                  <span className="publish-by-date flex items-center justify-start font-jost font-normal text-[17px] leading-[26px] text-white mb-[11px]">
                    By Admin / 17 Aug 2024 / Digital
                  </span>
                  <h2 className="font-plus-jakarta-sans font-semibold text-[35px] leading-[45px] text-white mb-[15px]">
                    All the Greatest Moments of Thoroughbred
                  </h2>
                  <p className="font-jost font-normal text-[16px] leading-[26px] text-white mb-[30px]">
                    Global business consultancies play a critical role in
                    driving thought leadership and knowledge exchange on a
                    global scale. Through industry reports, white papers,
                    seminars, and conferences, these firms share insights, best
                    practices, and emerging trends that shape the future of
                    international business.
                  </p>
                  <Link
                    href="/skyline/blog-details"
                    className="btn inline-flex items-center justify-center gap-x-[7px] font-jost font-normal leading-[40px] md:leading-[56px] text-[14px] md:text-[14px] text-white bg-International-Orange px-[12px] lg:px-[41px] rounded-md"
                    data-abc="true"
                  >
                    <span className="btn__ink"></span>
                    <div className="btn__inner"> Read More</div>
                    <span>
                      <svg
                        width="7"
                        height="11"
                        viewBox="0 0 7 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.23096 5.78125L1.66846 10.4062C1.51221 10.5625 1.26221 10.5625 1.13721 10.4062L0.512207 9.78125C0.355957 9.625 0.355957 9.40625 0.512207 9.25L4.19971 5.5L0.512207 1.78125C0.355957 1.625 0.355957 1.375 0.512207 1.25L1.13721 0.625C1.26221 0.46875 1.51221 0.46875 1.66846 0.625L6.23096 5.25C6.38721 5.40625 6.38721 5.625 6.23096 5.78125Z"
                          fill="white"
                        ></path>
                      </svg>
                    </span>
                  </Link>
                </div>
                <div className="service-1 mb-10">
                  <div className="img mb-[25px] wow overlay-anim zoom-effect overflow-hidden">
                    <Image
                      src={blogStandard3}
                      alt=""
                    />
                  </div>
                  <span className="publish-by-date flex items-center justify-start font-jost font-normal text-[17px] leading-[26px] text-white mb-[11px]">
                    By Admin / 17 Aug 2024 / Digital
                  </span>
                  <h2 className="font-plus-jakarta-sans font-semibold text-[35px] leading-[45px] text-white mb-[15px]">
                    One CEO Describe That Goes Into Turning
                  </h2>
                  <p className="font-jost font-normal text-[16px] leading-[26px] text-white mb-[30px]">
                    Why Roofing are factmake 17 Reason EasierForesee the pain
                    &amp; trouble that are bounds too ensue equalidea off
                    denouncing pleasures and praising pain was borncomplete
                    account and expound the actual teachings the great the
                    master-builder of human happiness. In a free hour...
                  </p>
                  <Link
                    href="/skyline/blog-details"
                    className="btn inline-flex items-center justify-center gap-x-[7px] font-jost font-normal leading-[40px] md:leading-[56px] text-[14px] md:text-[14px] text-white bg-International-Orange px-[12px] lg:px-[41px] rounded-md"
                    data-abc="true"
                  >
                    <span className="btn__ink"></span>
                    <div className="btn__inner"> Read More</div>
                    <span>
                      <svg
                        width="7"
                        height="11"
                        viewBox="0 0 7 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.23096 5.78125L1.66846 10.4062C1.51221 10.5625 1.26221 10.5625 1.13721 10.4062L0.512207 9.78125C0.355957 9.625 0.355957 9.40625 0.512207 9.25L4.19971 5.5L0.512207 1.78125C0.355957 1.625 0.355957 1.375 0.512207 1.25L1.13721 0.625C1.26221 0.46875 1.51221 0.46875 1.66846 0.625L6.23096 5.25C6.38721 5.40625 6.38721 5.625 6.23096 5.78125Z"
                          fill="white"
                        ></path>
                      </svg>
                    </span>
                  </Link>
                </div>
                <nav aria-label="Page navigation example">
                  <ul className="pagination flex items-center justify-center gap-5">
                    <li className="page-item">
                      <Link
                        className="page-link w-[41px] h-[41px] inline-flex items-center justify-center border border-International-Orange hover:border-International-Orange hover:bg-International-Orange bg-International-Orange text-white font-Poppins font-medium text-[20px] leading-[41px] rounded-full transition-all ease-linear duration-300"
                        href="#"
                      >
                        1
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link
                        className="page-link w-[41px] h-[41px] inline-flex items-center justify-center border border-white hover:border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[20px] leading-[41px] rounded-full transition-all ease-linear duration-300"
                        href="#"
                      >
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link
                        className="page-link w-[41px] h-[41px] inline-flex items-center justify-center border border-white hover:border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[20px] leading-[41px] rounded-full transition-all ease-linear duration-300"
                        href="#"
                      >
                        <i className="fa-solid fa-chevron-right"></i>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-12 col-span-4 order-1 order-2">
              <div className="right-bar position-sticky top-0">
                <form action="#" className="mb-[26px]">
                  <div className="relative bg-texture bg-no-repeat bg-cover bg-center py-[21px] px-8 flex items-center justify-start">
                    <input
                      className="w-full h-[55px] bg-transparent border-International-Orange rounded-tl-[4px] rounded-bl-[4px] font-jost font-bold text-[16px] leading-[26px] text-white placeholder:text-International-Orange focus:ring-0 focus:shadow-none focus:border-International-Orange"
                      type="text"
                      placeholder="Search"
                    />
                    <button
                      className="bg-International-Orange w-[64px] h-[55px] rounded-tr-[4px] rounded-br-[4px] flex items-center justify-center"
                      type="submit"
                    >
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.41732 0.645996C3.68086 0.645996 0.646484 3.68037 0.646484 7.41683C0.646484 11.1533 3.68086 14.1877 7.41732 14.1877C11.1538 14.1877 14.1882 11.1533 14.1882 7.41683C14.1882 3.68037 11.1538 0.645996 7.41732 0.645996ZM7.41732 1.68766C10.5798 1.68766 13.1465 4.25433 13.1465 7.41683C13.1465 10.5793 10.5798 13.146 7.41732 13.146C4.25482 13.146 1.68815 10.5793 1.68815 7.41683C1.68815 4.25433 4.25482 1.68766 7.41732 1.68766Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.2022 17.4647L12.2033 11.4668C12.0001 11.2637 11.6699 11.2637 11.4668 11.4668C11.2637 11.6699 11.2637 12.0001 11.4668 12.2033L17.4647 18.2022C17.6689 18.4053 17.998 18.4053 18.2022 18.2022C18.4053 17.998 18.4053 17.6689 18.2022 17.4647Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
                <div className="main-service bg-texture bg-no-repeat bg-cover bg-center py-[50px] px-8 mb-[30px]">
                  <h2 className="comment-title font-plus-jakarta-sans font-semibold text-[24px] leading-[55px] text-white relative after:w-[70px] after:h-[3px] after:bg-International-Orange after:rounded-[2px] after:absolute after:bottom-0 after:left-0 mb-11">
                    Main Services
                  </h2>
                  <ul className="flex items-start justify-start flex-col gap-7 w-full">
                    <li className="w-full font-nunito font-bold text-[17px] leading-[26px] group">
                      <Link
                        className="flex items-center justify-between border-b border-white/10 pb-[15px] w-full text-white group-hover:text-International-Orange group-hover:border-International-Orange transition-all ease-linear duration-300"
                        href="#"
                      >
                        App Development
                        <span>
                          <svg
                            width="11"
                            height="15"
                            viewBox="0 0 11 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                              d="M1.88974 0.177498C1.67328 0.172737 1.46071 0.235487 1.28159 0.357119C1.10247 0.478752 0.965695 0.653256 0.890286 0.856214C0.814877 1.05917 0.804578 1.28055 0.86082 1.48963C0.917063 1.69872 1.03705 1.88499 1.20411 2.02273L7.57821 7.48333L1.20411 12.942C1.08855 13.0269 0.991769 13.1348 0.919832 13.2588C0.847895 13.3829 0.80235 13.5205 0.786049 13.663C0.769747 13.8055 0.783041 13.9498 0.825098 14.0869C0.867154 14.224 0.937067 14.351 1.03046 14.4598C1.12385 14.5687 1.23871 14.657 1.36784 14.7194C1.49697 14.7818 1.63759 14.8168 1.7809 14.8223C1.92421 14.8279 2.06712 14.8038 2.20067 14.7516C2.33423 14.6993 2.45555 14.62 2.55705 14.5187L9.85482 8.27475C9.96943 8.17695 10.0615 8.05556 10.1246 7.91875C10.1877 7.78194 10.2203 7.63303 10.2203 7.48237C10.2203 7.33171 10.1877 7.1828 10.1246 7.046C10.0615 6.90919 9.96943 6.78768 9.85482 6.68988L2.55705 0.439901C2.3727 0.276154 2.13624 0.1833 1.88974 0.177498Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </Link>
                    </li>
                    <li className="w-full font-nunito font-bold text-[17px] leading-[26px] group">
                      <Link
                        className="flex items-center justify-between border-b border-white/10 pb-[15px] w-full text-white group-hover:text-International-Orange group-hover:border-International-Orange transition-all ease-linear duration-300"
                        href="service.html"
                      >
                        SEO Marketing
                        <span>
                          <svg
                            width="11"
                            height="15"
                            viewBox="0 0 11 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                              d="M1.88974 0.177498C1.67328 0.172737 1.46071 0.235487 1.28159 0.357119C1.10247 0.478752 0.965695 0.653256 0.890286 0.856214C0.814877 1.05917 0.804578 1.28055 0.86082 1.48963C0.917063 1.69872 1.03705 1.88499 1.20411 2.02273L7.57821 7.48333L1.20411 12.942C1.08855 13.0269 0.991769 13.1348 0.919832 13.2588C0.847895 13.3829 0.80235 13.5205 0.786049 13.663C0.769747 13.8055 0.783041 13.9498 0.825098 14.0869C0.867154 14.224 0.937067 14.351 1.03046 14.4598C1.12385 14.5687 1.23871 14.657 1.36784 14.7194C1.49697 14.7818 1.63759 14.8168 1.7809 14.8223C1.92421 14.8279 2.06712 14.8038 2.20067 14.7516C2.33423 14.6993 2.45555 14.62 2.55705 14.5187L9.85482 8.27475C9.96943 8.17695 10.0615 8.05556 10.1246 7.91875C10.1877 7.78194 10.2203 7.63303 10.2203 7.48237C10.2203 7.33171 10.1877 7.1828 10.1246 7.046C10.0615 6.90919 9.96943 6.78768 9.85482 6.68988L2.55705 0.439901C2.3727 0.276154 2.13624 0.1833 1.88974 0.177498Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </Link>
                    </li>
                    <li className="w-full font-nunito font-bold text-[17px] leading-[26px] group">
                      <Link
                        className="flex items-center justify-between border-b border-white/10 pb-[15px] w-full text-white group-hover:text-International-Orange group-hover:border-International-Orange transition-all ease-linear duration-300"
                        href="service.html"
                      >
                        SEO Analysis
                        <span>
                          <svg
                            width="11"
                            height="15"
                            viewBox="0 0 11 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                              d="M1.88974 0.177498C1.67328 0.172737 1.46071 0.235487 1.28159 0.357119C1.10247 0.478752 0.965695 0.653256 0.890286 0.856214C0.814877 1.05917 0.804578 1.28055 0.86082 1.48963C0.917063 1.69872 1.03705 1.88499 1.20411 2.02273L7.57821 7.48333L1.20411 12.942C1.08855 13.0269 0.991769 13.1348 0.919832 13.2588C0.847895 13.3829 0.80235 13.5205 0.786049 13.663C0.769747 13.8055 0.783041 13.9498 0.825098 14.0869C0.867154 14.224 0.937067 14.351 1.03046 14.4598C1.12385 14.5687 1.23871 14.657 1.36784 14.7194C1.49697 14.7818 1.63759 14.8168 1.7809 14.8223C1.92421 14.8279 2.06712 14.8038 2.20067 14.7516C2.33423 14.6993 2.45555 14.62 2.55705 14.5187L9.85482 8.27475C9.96943 8.17695 10.0615 8.05556 10.1246 7.91875C10.1877 7.78194 10.2203 7.63303 10.2203 7.48237C10.2203 7.33171 10.1877 7.1828 10.1246 7.046C10.0615 6.90919 9.96943 6.78768 9.85482 6.68988L2.55705 0.439901C2.3727 0.276154 2.13624 0.1833 1.88974 0.177498Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </Link>
                    </li>
                    <li className="w-full font-nunito font-bold text-[17px] leading-[26px] group">
                      <Link
                        className="flex items-center justify-between border-b border-white/10 pb-[15px] w-full text-white group-hover:text-International-Orange group-hover:border-International-Orange transition-all ease-linear duration-300"
                        href="service.html"
                      >
                        SEO Optimization
                        <span>
                          <svg
                            width="11"
                            height="15"
                            viewBox="0 0 11 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                              d="M1.88974 0.177498C1.67328 0.172737 1.46071 0.235487 1.28159 0.357119C1.10247 0.478752 0.965695 0.653256 0.890286 0.856214C0.814877 1.05917 0.804578 1.28055 0.86082 1.48963C0.917063 1.69872 1.03705 1.88499 1.20411 2.02273L7.57821 7.48333L1.20411 12.942C1.08855 13.0269 0.991769 13.1348 0.919832 13.2588C0.847895 13.3829 0.80235 13.5205 0.786049 13.663C0.769747 13.8055 0.783041 13.9498 0.825098 14.0869C0.867154 14.224 0.937067 14.351 1.03046 14.4598C1.12385 14.5687 1.23871 14.657 1.36784 14.7194C1.49697 14.7818 1.63759 14.8168 1.7809 14.8223C1.92421 14.8279 2.06712 14.8038 2.20067 14.7516C2.33423 14.6993 2.45555 14.62 2.55705 14.5187L9.85482 8.27475C9.96943 8.17695 10.0615 8.05556 10.1246 7.91875C10.1877 7.78194 10.2203 7.63303 10.2203 7.48237C10.2203 7.33171 10.1877 7.1828 10.1246 7.046C10.0615 6.90919 9.96943 6.78768 9.85482 6.68988L2.55705 0.439901C2.3727 0.276154 2.13624 0.1833 1.88974 0.177498Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </Link>
                    </li>
                    <li className="w-full font-nunito font-bold text-[17px] leading-[26px] group">
                      <Link
                        className="flex items-center justify-between border-b border-white/10 pb-[15px] w-full text-white group-hover:text-International-Orange group-hover:border-International-Orange transition-all ease-linear duration-300"
                        href="service.html"
                      >
                        Social Media
                        <span>
                          <svg
                            width="11"
                            height="15"
                            viewBox="0 0 11 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                              d="M1.88974 0.177498C1.67328 0.172737 1.46071 0.235487 1.28159 0.357119C1.10247 0.478752 0.965695 0.653256 0.890286 0.856214C0.814877 1.05917 0.804578 1.28055 0.86082 1.48963C0.917063 1.69872 1.03705 1.88499 1.20411 2.02273L7.57821 7.48333L1.20411 12.942C1.08855 13.0269 0.991769 13.1348 0.919832 13.2588C0.847895 13.3829 0.80235 13.5205 0.786049 13.663C0.769747 13.8055 0.783041 13.9498 0.825098 14.0869C0.867154 14.224 0.937067 14.351 1.03046 14.4598C1.12385 14.5687 1.23871 14.657 1.36784 14.7194C1.49697 14.7818 1.63759 14.8168 1.7809 14.8223C1.92421 14.8279 2.06712 14.8038 2.20067 14.7516C2.33423 14.6993 2.45555 14.62 2.55705 14.5187L9.85482 8.27475C9.96943 8.17695 10.0615 8.05556 10.1246 7.91875C10.1877 7.78194 10.2203 7.63303 10.2203 7.48237C10.2203 7.33171 10.1877 7.1828 10.1246 7.046C10.0615 6.90919 9.96943 6.78768 9.85482 6.68988L2.55705 0.439901C2.3727 0.276154 2.13624 0.1833 1.88974 0.177498Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </Link>
                    </li>
                    <li className="w-full font-nunito font-bold text-[17px] leading-[26px] group">
                      <Link
                        className="flex items-center justify-between border-b border-white/10 pb-[15px] w-full text-white group-hover:text-International-Orange group-hover:border-International-Orange transition-all ease-linear duration-300"
                        href="service.html"
                      >
                        Marketing Strategy
                        <span>
                          <svg
                            width="11"
                            height="15"
                            viewBox="0 0 11 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="group-hover:fill-International-Orange transition-all ease-linear duration-300"
                              d="M1.88974 0.177498C1.67328 0.172737 1.46071 0.235487 1.28159 0.357119C1.10247 0.478752 0.965695 0.653256 0.890286 0.856214C0.814877 1.05917 0.804578 1.28055 0.86082 1.48963C0.917063 1.69872 1.03705 1.88499 1.20411 2.02273L7.57821 7.48333L1.20411 12.942C1.08855 13.0269 0.991769 13.1348 0.919832 13.2588C0.847895 13.3829 0.80235 13.5205 0.786049 13.663C0.769747 13.8055 0.783041 13.9498 0.825098 14.0869C0.867154 14.224 0.937067 14.351 1.03046 14.4598C1.12385 14.5687 1.23871 14.657 1.36784 14.7194C1.49697 14.7818 1.63759 14.8168 1.7809 14.8223C1.92421 14.8279 2.06712 14.8038 2.20067 14.7516C2.33423 14.6993 2.45555 14.62 2.55705 14.5187L9.85482 8.27475C9.96943 8.17695 10.0615 8.05556 10.1246 7.91875C10.1877 7.78194 10.2203 7.63303 10.2203 7.48237C10.2203 7.33171 10.1877 7.1828 10.1246 7.046C10.0615 6.90919 9.96943 6.78768 9.85482 6.68988L2.55705 0.439901C2.3727 0.276154 2.13624 0.1833 1.88974 0.177498Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="popular-post bg-texture bg-no-repeat bg-cover bg-center py-[50px] px-8 mb-[30px]">
                  <h2 className="comment-title font-plus-jakarta-sans font-semibold text-[24px] leading-[55px] text-white relative after:w-[70px] after:h-[3px] after:bg-International-Orange after:rounded-[2px] after:absolute after:bottom-0 after:left-0 mb-11">
                    Popular Post
                  </h2>
                  <div className="popular-post-part flex items-start justify-start flex-col gap-7">
                    <div className="popular-post-item flex items-center justify-start gap-5">
                      <div className="w-[110px] h-[110px] rounded-full overflow-hidden flex-[1_0_110px]">
                        <Image
                          className="w-[110px] h-[110px] object-cover"
                          src={blogDetails10}
                          alt="popular post"
                          width={110}
                          height={110}
                        />
                      </div>
                      <div className="content">
                        <div className="flex items-center justify-start gap-[34px] font-jost font-normal text-base leading-5 text-white mb-[18px]">
                          <span className="flex items-center justify-start gap-2">
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.875 3.125H11.25V1.875C11.25 1.70924 11.1842 1.55027 11.0669 1.43306C10.9497 1.31585 10.7908 1.25 10.625 1.25C10.4592 1.25 10.3003 1.31585 10.1831 1.43306C10.0658 1.55027 10 1.70924 10 1.875V3.125H5V1.875C5 1.70924 4.93415 1.55027 4.81694 1.43306C4.69973 1.31585 4.54076 1.25 4.375 1.25C4.20924 1.25 4.05027 1.31585 3.93306 1.43306C3.81585 1.55027 3.75 1.70924 3.75 1.875V3.125H3.125C2.62772 3.125 2.15081 3.32254 1.79917 3.67418C1.44754 4.02581 1.25 4.50272 1.25 5V5.625H13.75V5C13.75 4.50272 13.5525 4.02581 13.2008 3.67418C12.8492 3.32254 12.3723 3.125 11.875 3.125Z"
                                fill="#DF3F01"
                              />
                              <path
                                d="M1.25 11.875C1.25 12.3723 1.44754 12.8492 1.79917 13.2008C2.15081 13.5525 2.62772 13.75 3.125 13.75H11.875C12.3723 13.75 12.8492 13.5525 13.2008 13.2008C13.5525 12.8492 13.75 12.3723 13.75 11.875V6.875H1.25V11.875Z"
                                fill="#DF3F01"
                              />
                            </svg>
                            June 13
                          </span>
                          <span className="flex items-center justify-start gap-2">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                style={{maskType: "alpha"}}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                              >
                                <rect width="20" height="20" fill="#D9D9D9" />
                              </mask>
                              <g mask="url(#mask0_486_3121)">
                                <path
                                  d="M1.66406 18.3337V3.33366C1.66406 2.87533 1.8274 2.48283 2.15406 2.15616C2.48017 1.83005 2.8724 1.66699 3.33073 1.66699H16.6641C17.1224 1.66699 17.5149 1.83005 17.8416 2.15616C18.1677 2.48283 18.3307 2.87533 18.3307 3.33366V13.3337C18.3307 13.792 18.1677 14.1845 17.8416 14.5112C17.5149 14.8373 17.1224 15.0003 16.6641 15.0003H4.9974L1.66406 18.3337ZM3.33073 14.3128L4.3099 13.3337H16.6641V3.33366H3.33073V14.3128Z"
                                  fill="#DF3F01"
                                />
                              </g>
                            </svg>
                            (05)
                          </span>
                        </div>
                        <p className="font-plus-jakarta-sans font-semibold text-[18px] leading-[28px] text-white">
                          This Place Really Place For Awesome Moment
                        </p>
                      </div>
                    </div>
                    <div className="popular-post-item flex items-center justify-start gap-5">
                      <div className="w-[110px] h-[110px] rounded-full overflow-hidden flex-[1_0_110px]">
                        <Image
                          className="w-[110px] h-[110px] object-cover"
                          src={blogDetails11}
                          alt="popular post"
                          width={110}
                          height={110}
                        />
                      </div>
                      <div className="content">
                        <div className="flex items-center justify-start gap-[34px] font-jost font-normal text-base leading-5 text-white mb-[18px]">
                          <span className="flex items-center justify-start gap-2">
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.875 3.125H11.25V1.875C11.25 1.70924 11.1842 1.55027 11.0669 1.43306C10.9497 1.31585 10.7908 1.25 10.625 1.25C10.4592 1.25 10.3003 1.31585 10.1831 1.43306C10.0658 1.55027 10 1.70924 10 1.875V3.125H5V1.875C5 1.70924 4.93415 1.55027 4.81694 1.43306C4.69973 1.31585 4.54076 1.25 4.375 1.25C4.20924 1.25 4.05027 1.31585 3.93306 1.43306C3.81585 1.55027 3.75 1.70924 3.75 1.875V3.125H3.125C2.62772 3.125 2.15081 3.32254 1.79917 3.67418C1.44754 4.02581 1.25 4.50272 1.25 5V5.625H13.75V5C13.75 4.50272 13.5525 4.02581 13.2008 3.67418C12.8492 3.32254 12.3723 3.125 11.875 3.125Z"
                                fill="#DF3F01"
                              />
                              <path
                                d="M1.25 11.875C1.25 12.3723 1.44754 12.8492 1.79917 13.2008C2.15081 13.5525 2.62772 13.75 3.125 13.75H11.875C12.3723 13.75 12.8492 13.5525 13.2008 13.2008C13.5525 12.8492 13.75 12.3723 13.75 11.875V6.875H1.25V11.875Z"
                                fill="#DF3F01"
                              />
                            </svg>
                            June 13
                          </span>
                          <span className="flex items-center justify-start gap-2">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                style={{maskType: "alpha"}}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                              >
                                <rect width="20" height="20" fill="#D9D9D9" />
                              </mask>
                              <g mask="url(#mask0_486_3121)">
                                <path
                                  d="M1.66406 18.3337V3.33366C1.66406 2.87533 1.8274 2.48283 2.15406 2.15616C2.48017 1.83005 2.8724 1.66699 3.33073 1.66699H16.6641C17.1224 1.66699 17.5149 1.83005 17.8416 2.15616C18.1677 2.48283 18.3307 2.87533 18.3307 3.33366V13.3337C18.3307 13.792 18.1677 14.1845 17.8416 14.5112C17.5149 14.8373 17.1224 15.0003 16.6641 15.0003H4.9974L1.66406 18.3337ZM3.33073 14.3128L4.3099 13.3337H16.6641V3.33366H3.33073V14.3128Z"
                                  fill="#DF3F01"
                                />
                              </g>
                            </svg>
                            (05)
                          </span>
                        </div>
                        <p className="font-plus-jakarta-sans font-semibold text-[18px] leading-[28px] text-white">
                          This Place Really Place For Awesome Moment
                        </p>
                      </div>
                    </div>
                    <div className="popular-post-item flex items-center justify-start gap-5">
                      <div className="w-[110px] h-[110px] rounded-full overflow-hidden flex-[1_0_110px]">
                        <Image
                          className="w-[110px] h-[110px] object-cover"
                          src={blogDetails12}
                          alt="popular post"
                          width={110}
                          height={110}
                        />
                      </div>
                      <div className="content">
                        <div className="flex items-center justify-start gap-[34px] font-jost font-normal text-base leading-5 text-white mb-[18px]">
                          <span className="flex items-center justify-start gap-2">
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.875 3.125H11.25V1.875C11.25 1.70924 11.1842 1.55027 11.0669 1.43306C10.9497 1.31585 10.7908 1.25 10.625 1.25C10.4592 1.25 10.3003 1.31585 10.1831 1.43306C10.0658 1.55027 10 1.70924 10 1.875V3.125H5V1.875C5 1.70924 4.93415 1.55027 4.81694 1.43306C4.69973 1.31585 4.54076 1.25 4.375 1.25C4.20924 1.25 4.05027 1.31585 3.93306 1.43306C3.81585 1.55027 3.75 1.70924 3.75 1.875V3.125H3.125C2.62772 3.125 2.15081 3.32254 1.79917 3.67418C1.44754 4.02581 1.25 4.50272 1.25 5V5.625H13.75V5C13.75 4.50272 13.5525 4.02581 13.2008 3.67418C12.8492 3.32254 12.3723 3.125 11.875 3.125Z"
                                fill="#DF3F01"
                              />
                              <path
                                d="M1.25 11.875C1.25 12.3723 1.44754 12.8492 1.79917 13.2008C2.15081 13.5525 2.62772 13.75 3.125 13.75H11.875C12.3723 13.75 12.8492 13.5525 13.2008 13.2008C13.5525 12.8492 13.75 12.3723 13.75 11.875V6.875H1.25V11.875Z"
                                fill="#DF3F01"
                              />
                            </svg>
                            June 13
                          </span>
                          <span className="flex items-center justify-start gap-2">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                               style={{maskType: "alpha"}}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                              >
                                <rect width="20" height="20" fill="#D9D9D9" />
                              </mask>
                              <g mask="url(#mask0_486_3121)">
                                <path
                                  d="M1.66406 18.3337V3.33366C1.66406 2.87533 1.8274 2.48283 2.15406 2.15616C2.48017 1.83005 2.8724 1.66699 3.33073 1.66699H16.6641C17.1224 1.66699 17.5149 1.83005 17.8416 2.15616C18.1677 2.48283 18.3307 2.87533 18.3307 3.33366V13.3337C18.3307 13.792 18.1677 14.1845 17.8416 14.5112C17.5149 14.8373 17.1224 15.0003 16.6641 15.0003H4.9974L1.66406 18.3337ZM3.33073 14.3128L4.3099 13.3337H16.6641V3.33366H3.33073V14.3128Z"
                                  fill="#DF3F01"
                                />
                              </g>
                            </svg>
                            (05)
                          </span>
                        </div>
                        <p className="font-plus-jakarta-sans font-semibold text-[18px] leading-[28px] text-white">
                          This Place Really Place For Awesome Moment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="popular-tags bg-texture bg-no-repeat bg-cover bg-center py-[21px] px-8">
                  <h2 className="comment-title font-plus-jakarta-sans font-semibold text-[24px] leading-[55px] text-white relative after:w-[70px] after:h-[3px] after:bg-International-Orange after:rounded-[2px] after:absolute after:bottom-0 after:left-0 mb-11">
                    Popular Tags
                  </h2>
                  <ul className="flex items-center justify-start flex-wrap gap-[9px]">
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        Social Media
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        Digital
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        Marketing
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        Social
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        SEO Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        SEO{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        Education
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        America
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block border border-International-Orange hover:bg-International-Orange text-white font-Poppins font-medium text-[15px] leading-[45px] rounded-[3px] px-6 transition-all ease-linear duration-300"
                        href="blog-standard.html"
                      >
                        Analysis
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- blog details --> */}
      {/* news & blog */}
      <NewsBlog data={newsBlogData} />
      {/* news & blog */}
      {/* ModalVideo Component */}
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="pGbIOC83-So" // YouTube video ID
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Blog;




