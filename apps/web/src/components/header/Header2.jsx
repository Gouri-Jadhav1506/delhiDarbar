 'use client';
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "./../../assets/images/logo.png";

const Header2 = () => {
  // Dropdown states
  const [openPages, setOpenPages] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [scrollPosition, setPosition] = useState({ scrollY: 0 });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refs for detecting outside clicks
  // Refs to detect outside clicks
  const pagesRef = useRef(null);

  const togglePagesDropdown = () => {
    setOpenPages(!openPages);
  };

  // Function to open the modal
  const openAuthModal = () => {
    setIsModalOpen(true);
  };

  // Effect to handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click was outside any of the dropdowns
      if (pagesRef.current && !pagesRef.current.contains(event.target)) {
        setOpenPages(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
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
      <div className={`header w-full pt-6 z-20 header--sticky relative ${scrollPosition.scrollY > 300 && 'sticky'}`}>
        <div className="max-w-[1624px] px-3 mx-auto">
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
                    <ul className="flex flex-col items-start px-6 md:items-center py-6 md:py-2 md:flex-row md:mt-0 md:text-sm md:border-0 gap-y-4 md:gap-x-[20px] lg:gap-x-[20px] xl:gap-x-[57px] font-jost font-normal leading-[26px] text-[18px] text-white">
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
                          className="flex flex-row items-center w-full text-sm font-semibold text-left bg-transparent md:w-auto md:inline-flex text-white hover:text-Deep-Teal"
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
                      <li>
                        <Link
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            openAuthModal();
                          }}
                          className="flex flex-row items-center w-full md:w-auto md:inline-flex"
                        >
                          <span className="md:w-[25px] lg:w-[41px] md:h-[25px] lg:h-[41px] p-1 rounded-full border flex items-center justify-center">
                            <svg
                              className="md:w-[12px] lg:w-[14px] md:h-[12px] lg:h-[14px]"
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.8223 11.873C13.0508 12.127 13.0508 12.5078 12.7969 12.7363L12.0859 13.4473C11.8574 13.7012 11.4766 13.7012 11.2227 13.4473L8.70898 10.9336C8.58203 10.8066 8.53125 10.6543 8.53125 10.502V10.0703C7.61719 10.7812 6.5 11.1875 5.28125 11.1875C2.36133 11.1875 0 8.82617 0 5.90625C0 3.01172 2.36133 0.625 5.28125 0.625C8.17578 0.625 10.5625 3.01172 10.5625 5.90625C10.5625 7.15039 10.1309 8.26758 9.44531 9.15625H9.85156C10.0039 9.15625 10.1562 9.23242 10.2832 9.33398L12.8223 11.873ZM5.28125 9.15625C7.05859 9.15625 8.53125 7.70898 8.53125 5.90625C8.53125 4.12891 7.05859 2.65625 5.28125 2.65625C3.47852 2.65625 2.03125 4.12891 2.03125 5.90625C2.03125 7.70898 3.47852 9.15625 5.28125 9.15625Z"
                                fill="white"
                              />
                            </svg>
                          </span>
                        </Link>
                      </li>
                      <li className="inline-block hidden">
                        <Link
                          href="#"
                          className="btn inline-flex items-center justify-center gap-x-[7px] font-jost font-normal leading-[40px] md:leading-[56px] text-[14px] md:text-[14px] text-white bg-Bright-Orange px-[12px] lg:px-[41px] rounded-md"
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
        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed z-10 left-0 top-0 h-full w-full flex items-center justify-center py-3 px-2 overflow-y-auto bg-black/30 transition duration-300"
            id="authOverlay"
          >
            <div className="relative bg-white w-full max-w-md p-4 rounded-md shadow-lg scale-y-100 transition duration-300">
              <h3 className="font-bold text-xl mb-4">Authentication</h3>
              <p className="text-gray-600 mb-4">
                Please log in to access your account.
              </p>
              <button
                onClick={closeAuthModal}
                className="bg-Deep-Teal text-white w-[100px] py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header2;
