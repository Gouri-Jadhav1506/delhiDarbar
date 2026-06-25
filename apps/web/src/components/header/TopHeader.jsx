'use client';

import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const TopHeader = () => {
  const address = "Immeuble Rainbow, Riviera 3, Cite Synacassi 2";

  return (
    <header className="header-wrapper">
      <div className="top-header relative z-50 bg-Deep-Teal border-b border-white/5">
        <div className="container hidden md:block">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <div className="flex items-center justify-start w-full">
                <ul className="flex items-center justify-center bg-Deep-Teal px-[31px] py-[12px] gap-6 text-International-Orange h-full">
                  <li>
                    <Link href="#" className="text-International-Orange hover:text-white transition-colors">
                      <FaFacebookF size={14} />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-International-Orange hover:text-white transition-colors">
                      <FaTwitter size={14} />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-International-Orange hover:text-white transition-colors">
                      <FaInstagram size={14} />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-International-Orange hover:text-white transition-colors">
                      <FaYoutube size={14} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-span-6">
              <div className="flex items-center justify-end h-full text-white">
                <p className="font-jost font-normal text-[15px] leading-[24px] inline-flex items-center gap-2">
                  <svg width="14" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.45294 0C4.74221 0.00228587 3.1022 0.687839 1.89253 1.90633C0.682859 3.12482 0.00226932 4.77679 0 6.5C0 11.1665 6.01199 17.011 6.26741 17.2575C6.3171 17.3061 6.38365 17.3334 6.45294 17.3334C6.52222 17.3334 6.58877 17.3061 6.63846 17.2575C6.89389 17.011 12.9059 11.1665 12.9059 6.5C12.9036 4.77679 12.223 3.12482 11.0133 1.90633C9.80368 0.687839 8.16366 0.00228587 6.45294 0ZM6.45294 9.47917C5.86798 9.47917 5.29616 9.30444 4.80978 8.97709C4.32341 8.64973 3.94433 8.18445 3.72047 7.64008C3.49662 7.09571 3.43805 6.4967 3.55217 5.91879C3.66629 5.34089 3.94797 4.81006 4.3616 4.39341C4.77523 3.97677 5.30222 3.69303 5.87594 3.57808C6.44966 3.46313 7.04433 3.52212 7.58476 3.74761C8.12519 3.9731 8.5871 4.35494 8.91209 4.84486C9.23707 5.33479 9.41053 5.91078 9.41053 6.5C9.41006 7.28998 9.09831 8.04747 8.54375 8.60607C7.9892 9.16467 7.2372 9.47869 6.45294 9.47917Z" fill="#FFD84D" />
                  </svg>
                  {address}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container md:hidden py-2">
          <div className="flex items-center justify-center gap-2 text-white/90 mb-2">
            <svg width="12" height="14" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.45294 0C4.74221 0.00228587 3.1022 0.687839 1.89253 1.90633C0.682859 3.12482 0.00226932 4.77679 0 6.5C0 11.1665 6.01199 17.011 6.26741 17.2575C6.3171 17.3061 6.38365 17.3334 6.45294 17.3334C6.52222 17.3334 6.58877 17.3061 6.63846 17.2575C6.89389 17.011 12.9059 11.1665 12.9059 6.5C12.9036 4.77679 12.223 3.12482 11.0133 1.90633C9.80368 0.687839 8.16366 0.00228587 6.45294 0ZM6.45294 9.47917C5.86798 9.47917 5.29616 9.30444 4.80978 8.97709C4.32341 8.64973 3.94433 8.18445 3.72047 7.64008C3.49662 7.09571 3.43805 6.4967 3.55217 5.91879C3.66629 5.34089 3.94797 4.81006 4.3616 4.39341C4.77523 3.97677 5.30222 3.69303 5.87594 3.57808C6.44966 3.46313 7.04433 3.52212 7.58476 3.74761C8.12519 3.9731 8.5871 4.35494 8.91209 4.84486C9.23707 5.33479 9.41053 5.91078 9.41053 6.5C9.41006 7.28998 9.09831 8.04747 8.54375 8.60607C7.9892 9.16467 7.2372 9.47869 6.45294 9.47917Z" fill="#FFD84D" />
            </svg>
            <span className="font-jost text-[11px] text-white/80 whitespace-nowrap">{address}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="#" className="text-International-Orange hover:text-white transition-colors">
                <FaFacebookF size={14} />
              </Link>
              <Link href="#" className="text-International-Orange hover:text-white transition-colors">
                <FaInstagram size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
