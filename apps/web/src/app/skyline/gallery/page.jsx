'use client';
import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { galleryItems } from "@/components/data/galleryData";
import SubPageBanner from "@/components/banner/SubPageBanner";
import heroBg from "@/assets/images/About-Us/hero-bg-pexels.jpg";
import { useSkylineLandingLocale } from "@/lib/useSkylineLandingLocale";

const INITIAL_COUNT = 12; // 3 columns × 4 rows
const LOAD_MORE_COUNT = 9; // 3 columns × 3 rows

const GalleryPage = () => {
  const { isFrench } = useSkylineLandingLocale();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const thumbnailStripRef = useRef(null);
  const activeThumbnailRef = useRef(null);

  const visibleItems = galleryItems.slice(0, visibleCount);
  const hasMore = visibleCount < galleryItems.length;
  const isLightboxOpen = selectedIndex !== null;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, galleryItems.length));
  };

  const goToPrev = useCallback(() => {
    setSelectedIndex(prev => (prev > 0 ? prev - 1 : galleryItems.length - 1));
  }, []);

  const goToNext = useCallback(() => {
    setSelectedIndex(prev => (prev < galleryItems.length - 1 ? prev + 1 : 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goToPrev();
      else if (e.key === "ArrowRight") goToNext();
      else if (e.key === "Escape") setSelectedIndex(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, goToPrev, goToNext]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (isLightboxOpen && activeThumbnailRef.current && thumbnailStripRef.current) {
      const strip = thumbnailStripRef.current;
      const thumb = activeThumbnailRef.current;
      const stripRect = strip.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();

      const scrollLeft = thumb.offsetLeft - strip.offsetWidth / 2 + thumb.offsetWidth / 2;
      strip.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [selectedIndex, isLightboxOpen]);

  return (
    <>
      {/* Banner Section */}
      <SubPageBanner heroBg={heroBg} />

      {/* Gallery Section */}
      <div className="project-gallery overflow-hidden bg-Dark-Cyan-Green">
        <div className="py-[70px] md:pt-[100px] md:pb-[120px]">
          <div className="container">
            {/* Gallery Grid - 3 columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {visibleItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-lg cursor-pointer aspect-square"
                  onClick={() => setSelectedIndex(galleryItems.findIndex(g => g.id === item.id))}
                >
                  <Image
                    src={item.image}
                    unoptimized
                    alt="Gallery image"
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    priority={index < 12}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex flex-col items-center justify-center mt-12 md:mt-16">
                <button 
                  onClick={handleLoadMore}
                  className="group inline-flex items-center justify-center gap-[7px] bg-transparent border-2 border-International-Orange px-[32px] py-3 rounded-md font-jost font-semibold text-[16px] text-International-Orange hover:bg-International-Orange hover:text-white transition-all duration-500"
                >
                  <span>{isFrench ? "Voir plus" : "Load More"}</span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-y-1 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <p className="text-white/50 text-sm mt-3 font-jost">
                  {isFrench
                    ? `Affichage de ${Math.min(visibleCount, galleryItems.length)} sur ${galleryItems.length} images`
                    : `Showing ${Math.min(visibleCount, galleryItems.length)} of ${galleryItems.length} images`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Carousel Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Top Bar - Close & Counter */}
          <div className="flex items-center justify-between px-4 md:px-8 py-4 flex-shrink-0">
            <span className="text-white/60 text-sm font-jost">
              {selectedIndex + 1} / {galleryItems.length}
            </span>
            <button 
              onClick={() => setSelectedIndex(null)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-International-Orange transition-colors duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Main Image Area */}
          <div 
            className="flex-1 flex items-center justify-center relative px-4 md:px-20 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            <button 
              onClick={goToPrev}
              className="absolute left-2 md:left-6 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-International-Orange transition-colors duration-300"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Current Image */}
            <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden mx-auto">
              <Image
                key={selectedIndex}
                src={galleryItems[selectedIndex].image}
                unoptimized
                alt="Gallery image"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Next Button */}
            <button 
              onClick={goToNext}
              className="absolute right-2 md:right-6 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-International-Orange transition-colors duration-300"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div 
            className="flex-shrink-0 py-4 px-4 md:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={thumbnailStripRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide py-1"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {galleryItems.map((item, index) => (
                <button
                  key={item.id}
                  ref={index === selectedIndex ? activeThumbnailRef : null}
                  onClick={() => setSelectedIndex(index)}
                  className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === selectedIndex
                      ? "ring-2 ring-International-Orange ring-offset-2 ring-offset-black opacity-100 scale-105"
                      : "opacity-40 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={item.image}
                    unoptimized
                    alt="Thumbnail"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hide scrollbar for thumbnail strip */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default GalleryPage;
