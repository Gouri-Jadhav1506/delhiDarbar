'use client';

import { useSkylineLanguage } from "@/context/SkylineLanguageContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "./../../assets/images/logo.png";

const Header1 = () => {
  const pathname = usePathname();
  const { locale, setLocale } = useSkylineLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollPosition, setPosition] = useState({ scrollY: 0 });

  const isFrenchSkyline = pathname.startsWith("/skyline") && locale === "fr";
  const navItems = isFrenchSkyline
    ? [
        { label: "Accueil", href: "/skyline" },
        { label: "A propos", href: "/skyline/about-us" },
        { label: "Services", href: "/skyline/services" },
        { label: "Notre menu", href: "/skyline/our-menu" },
        { label: "Galerie", href: "/skyline/gallery" },
        { label: "Contact", href: "/skyline/contact-us" },
      ]
    : [
        { label: "Home", href: "/skyline" },
        { label: "About Us", href: "/skyline/about-us" },
        { label: "Service", href: "/skyline/services" },
        { label: "Our Menu", href: "/skyline/our-menu" },
        { label: "Gallery", href: "/skyline/gallery" },
        { label: "Contacts", href: "/skyline/contact-us" },
      ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const renderLanguageSwitcher = (className = "") => (
    <div className={`inline-flex items-center rounded-full border border-white/15 bg-white/5 p-1 ${className}`}>
      {[
        { code: "en", label: "EN" },
        { code: "fr", label: "FR" },
      ].map((language) => {
        const isActive = locale === language.code;

        return (
          <button
            key={language.code}
            type="button"
            onClick={() => setLocale(language.code)}
            className={`rounded-full px-3 py-1.5 font-jost text-xs font-semibold transition-colors duration-200 ${
              isActive ? "bg-International-Orange text-Cyan" : "text-white/75 hover:text-white"
            }`}
          >
            {language.label}
          </button>
        );
      })}
    </div>
  );

  useEffect(() => {
    const updatePosition = () => {
      setPosition({ scrollY: window.scrollY });
    };

    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <div className={`header w-full z-20 absolute pt-6 ${scrollPosition.scrollY > 300 && "sticky"} home-1 `}>
      <div className="container">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <nav>
              <div className="flex items-center justify-between">
                <div className="hidden md:flex relative items-center justify-between w-full gap-8">
                  <Link href="/skyline" className="flex-shrink-0 md:max-w-[200px] lg:max-w-[215px] min-w-[215px]">
                    <Image src={logo} className="h-[56px] w-auto" alt="Logo" priority />
                  </Link>

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                    {renderLanguageSwitcher("shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm")}
                  </div>

                  <div className="flex flex-1 items-center justify-end">
                    <ul className="flex items-center justify-end gap-x-[18px] lg:gap-x-[28px] xl:gap-x-[36px] font-jost text-white">
                      {navItems.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="text-sm font-semibold text-white hover:text-Beer transition-colors duration-200 whitespace-nowrap"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-1 w-full items-center justify-between md:hidden">
                  <Link href="/skyline" className="w-full md:max-w-[200px] lg:max-w-[215px] min-w-[215px]">
                    <Image src={logo} className="h-[56px] w-auto" alt="Logo" priority />
                  </Link>

                  <button
                    onClick={() => setIsMobileMenuOpen((current) => !current)}
                    type="button"
                    className="inline-flex items-center p-2 ms-3 w-10 h-10 justify-center text-sm text-white rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-Beer transition-colors"
                    aria-controls="navbar-dropdown"
                    aria-expanded={isMobileMenuOpen}
                  >
                    <span className="sr-only">{isFrenchSkyline ? "Ouvrir le menu principal" : "Open main menu"}</span>
                    {isMobileMenuOpen ? (
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                      >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                      </svg>
                    )}
                  </button>
                </div>

                <div
                  className={`${isMobileMenuOpen ? "block animate-fade-in-down" : "hidden"} w-full md:hidden absolute left-0 top-full bg-Deep-Teal rounded-b-xl shadow-2xl overflow-hidden transition-all duration-300 mt-2`}
                  id="navbar-dropdown"
                >
                  <div className="px-6 pt-6">{renderLanguageSwitcher("mb-5")}</div>
                  <ul className="flex flex-col items-start px-6 pb-6 gap-y-4 font-jost font-normal leading-[26px] text-[18px] text-white">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMobileMenu}
                          className="flex flex-row items-center w-full text-sm font-semibold text-left bg-transparent md:w-auto md:inline-flex text-white hover:text-Beer transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header1;
