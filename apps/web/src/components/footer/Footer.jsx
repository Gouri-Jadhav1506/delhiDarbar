'use client';

import { useSkylineLanguage } from "@/context/SkylineLanguageContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  const { locale } = useSkylineLanguage();
  const isFrenchLanding = pathname.startsWith("/skyline") && locale === "fr";

  const content = isFrenchLanding
    ? {
        description:
          "Decouvrez une cuisine indienne authentique dans un cadre d'exception. Installe au sommet du Rainbow Building, Skyline offre une vue panoramique, des saveurs raffinees et des moments inoubliables.",
        navigate: "Navigation",
        explore: "Explorer",
        getInTouch: "Nous contacter",
        navLinks: [
          { label: "Accueil", href: "/skyline" },
          { label: "A propos", href: "/skyline/about-us" },
          { label: "Services", href: "/skyline/services" },
          { label: "Notre menu", href: "/skyline/our-menu" },
          { label: "Galerie", href: "/skyline/gallery" },
          { label: "Contact", href: "/skyline/contact-us" },
        ],
        exploreLinks: [
          { label: "Galerie", href: "/skyline/gallery" },
          { label: "Notre menu", href: "/skyline/our-menu" },
          { label: "Nos services", href: "/skyline/services" },
        ],
        rights: "Tous droits reserves.",
        privacy: "Politique de confidentialite",
        terms: "Conditions d'utilisation",
      }
    : {
        description:
          "Experience authentic Indian cuisine at its finest. Perched atop the Rainbow Building, Skyline offers panoramic views, exquisite flavors, and unforgettable moments.",
        navigate: "Navigate",
        explore: "Explore",
        getInTouch: "Get in Touch",
        navLinks: [
          { label: "Home", href: "/skyline" },
          { label: "About Us", href: "/skyline/about-us" },
          { label: "Services", href: "/skyline/services" },
          { label: "Our Menu", href: "/skyline/our-menu" },
          { label: "Gallery", href: "/skyline/gallery" },
          { label: "Contact", href: "/skyline/contact-us" },
        ],
        exploreLinks: [
          { label: "Gallery", href: "/skyline/gallery" },
          { label: "Our Menu", href: "/skyline/our-menu" },
          { label: "Our Services", href: "/skyline/services" },
        ],
        rights: "All Rights Reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
      };

  return (
    <footer className="bg-Dark-Cyan-Green overflow-hidden">
      <div className="container">
        <div className="pt-16 md:pt-24 pb-12 md:pb-16 border-b border-white/10">
          <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="col-span-12 md:col-span-5">
              <Link href="/skyline" className="inline-block mb-5">
                <Image
                  className="h-[52px] w-auto"
                  src="/assets/images/skyline.png"
                  alt="Skyline Delhi Darbar"
                  width={215}
                  height={52}
                  style={{ width: 'auto' }}
                />
              </Link>
              <p className="font-jost text-white/50 text-[15px] leading-relaxed max-w-sm mb-6">{content.description}</p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-International-Orange hover:border-International-Orange hover:text-white transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-International-Orange hover:border-International-Orange hover:text-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.25-3.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/2250575413751"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-International-Orange hover:border-International-Orange hover:text-white transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="col-span-6 md:col-span-2">
              <h4 className="font-plus-jakarta-sans font-semibold text-[15px] text-white uppercase tracking-wider mb-6">
                {content.navigate}
              </h4>
              <ul className="flex flex-col gap-[14px]">
                {content.navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-jost text-[15px] text-white/50 hover:text-International-Orange hover:pl-1 transition-all duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-6 md:col-span-2">
              <h4 className="font-plus-jakarta-sans font-semibold text-[15px] text-white uppercase tracking-wider mb-6">
                {content.explore}
              </h4>
              <ul className="flex flex-col gap-[14px]">
                {content.exploreLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-jost text-[15px] text-white/50 hover:text-International-Orange hover:pl-1 transition-all duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-12 md:col-span-3">
              <h4 className="font-plus-jakarta-sans font-semibold text-[15px] text-white uppercase tracking-wider mb-6">
                {content.getInTouch}
              </h4>
              <ul className="flex flex-col gap-5">
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DF3F01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <span className="font-jost text-[14px] text-white/50 leading-relaxed">
                    Rainbow Building, Riviera Synacassi,
                    <br />
                    Abidjan, Cote d&apos;Ivoire
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DF3F01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </span>
                  <div className="flex flex-col">
                    <a
                      href="tel:+2250575413751"
                      className="font-jost text-[14px] text-white/50 hover:text-International-Orange transition-colors duration-300"
                    >
                      +225 0575 413 751
                    </a>
                    <a
                      href="tel:+2250709130101"
                      className="font-jost text-[14px] text-white/50 hover:text-International-Orange transition-colors duration-300"
                    >
                      +225 0709 130 101
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DF3F01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                    </svg>
                  </span>
                  <a
                    href="mailto:delhidarbarabidjan@gmail.com"
                    className="font-jost text-[14px] text-white/50 hover:text-International-Orange transition-colors duration-300 break-all"
                  >
                    delhidarbarabidjan@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <p className="font-jost text-[13px] text-white/30 text-center md:text-left">
            &copy; {new Date().getFullYear()} Skyline Delhi Darbar. {content.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/skyline/privacy-policy"
              className="font-jost text-[13px] text-white/30 hover:text-white/60 transition-colors duration-300"
            >
              {content.privacy}
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link
              href="/skyline/terms-of-service"
              className="font-jost text-[13px] text-white/30 hover:text-white/60 transition-colors duration-300"
            >
              {content.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
