'use client';
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "./../../assets/images/logo.png";

const Header3 = () => {
  // State to manage dropdowns
  const [openPages, setOpenPages] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollPosition, setPosition] = useState({ scrollY: 0 });

  // Refs to detect outside clicks
  const pagesRef = useRef(null);

  // Functions to toggle each dropdown
  const togglePagesDropdown = () => {
    setOpenPages(!openPages);
  };

   // Effect to handle outside clicks
   useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click was outside the dropdown
      if (pagesRef.current && !pagesRef.current.contains(event.target)) {
        setOpenPages(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      setPosition({ scrollY: window.scrollY });
    };
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return (
    <>
      <div className={`header absolute w-full pt-6 z-20 header--sticky ${scrollPosition.scrollY > 300 && 'sticky'}`}>
        <div className="container">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <nav>
                <div className="flex items-center justify-between">
                  <div className="flex flex-1 w-full items-center justify-between">
                    <Link
                      href="/"
                      className="w-full md:max-w-[200px] lg:max-w-[215px] min-w-[215px]"
                    >
                      <Image src={logo} className="h-[56px] w-auto" alt="Logo" priority />
                    </Link>
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      type="button"
                      className="inline-flex items-center p-2 ms-3 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-Beer transition-colors"
                      aria-controls="navbar-dropdown"
                      aria-expanded={isMobileMenuOpen}
                    >
                      <span className="sr-only">Open main menu</span>
                      {isMobileMenuOpen ? (
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 17 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div
                    className={`${isMobileMenuOpen ? "block animate-fade-in-down" : "hidden"} w-full md:block md:w-auto absolute md:relative left-0 top-full bg-Deep-Teal md:bg-transparent rounded-b-xl shadow-2xl md:shadow-none overflow-hidden transition-all duration-300 mt-2 md:mt-0`}
                    id="navbar-dropdown"
                  >
                    <ul className="flex flex-col items-start px-6 md:items-center py-6 md:py-2 md:flex-row md:mt-0 md:text-sm md:border-0 gap-y-4 md:gap-x-[20px] lg:gap-x-[40px] xl:gap-x-[57px] font-jost font-normal leading-[26px] text-[18px] text-white">
                      {/* Home Dropdown */}
                      <li>
                        <Link
                          href="/"
                          className="flex flex-row items-center w-full md:w-auto md:inline-flex"
                        >
                          Home
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/skyline/about-us"
                          className="flex flex-row items-center w-full text-sm font-semibold text-left bg-transparent md:w-auto md:inline-flex text-white"
                        >
                          About Us
                        </Link>
                      </li>

                      {/* Pages Dropdown */}
                      <li>
                        <Link
                          href="/skyline/our-menu"
                          className="flex flex-row items-center w-full text-sm font-semibold text-left bg-transparent md:w-auto md:inline-flex text-white"
                        >
                          Our Menu
                        </Link>
                      </li>

                      {/* Simple Navigation Items */}

                      <li>
                        <Link href="/skyline/contact-us" className="hover:text-Deep-Teal">
                          Contacts
                        </Link>
                      </li>
                      <li className="inline-block hidden">
                        <Link
                          href="#"
                          className="btn inline-flex items-center justify-center gap-x-[7px] font-jost font-normal leading-[40px] md:leading-[56px] text-[14px] md:text-[14px] text-white bg-Beer px-[12px] lg:px-[41px] rounded-md"
                        >
                          <span className="btn__ink"></span>
                          <div className="btn__inner">Book Now</div>
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
                              />
                            </svg>
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header3;
