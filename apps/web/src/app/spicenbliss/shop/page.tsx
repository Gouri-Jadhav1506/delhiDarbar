"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCart, Product } from "../context/CartContext";
import { FaStar, FaSearch, FaSlidersH, FaTimes } from "react-icons/fa";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const { addToCart, products } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [priceRange, setPriceRange] = useState(200);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Synchronize category state if URL parameter changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= priceRange;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Top Rated") return b.rating - a.rating;
    // Featured default
    return a.id.localeCompare(b.id);
  });

  const categories = ["All", "Bracelets", "Earrings", "Accessories"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 space-y-12">
      {/* Banner / Header */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <span className="font-jost text-xs uppercase tracking-[0.3em] text-[#FFD84D] font-semibold">
          The Vault
        </span>
        <h1 className="font-plus-jakarta-sans text-4xl font-bold text-white tracking-tight">
          Shop The Collections
        </h1>
        <p className="font-jost text-[#B4C4C4] text-sm leading-relaxed">
          Discover hand-crafted jewelry and premium accessories designed with natural minerals, amber, and organic textures.
        </p>
        <div className="w-12 h-0.5 bg-[#FFD84D] mx-auto mt-2" />
      </div>

      {/* Main Grid: Filters + Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8 border border-white/5 bg-[#1B3030]/25 rounded-3xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <h3 className="font-plus-jakarta-sans font-semibold text-white text-base flex items-center gap-2">
              <FaSlidersH className="w-4 h-4 text-[#FFD84D]" /> Filters
            </h3>
            {(selectedCategory !== "All" || searchQuery !== "") && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="font-jost text-[10px] text-white/40 hover:text-[#FFD84D] uppercase tracking-wider"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Search bar */}
          <div className="space-y-2">
            <h4 className="font-plus-jakarta-sans text-xs uppercase tracking-widest text-[#FFD84D] font-semibold">Search</h4>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find a piece..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-4 pr-10 text-xs text-white placeholder-white/30 focus:border-[#FFD84D] focus:outline-none"
              />
              <FaSearch className="absolute right-3.5 top-3 w-3.5 h-3.5 text-white/30" />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2.5">
            <h4 className="font-plus-jakarta-sans text-xs uppercase tracking-widest text-[#FFD84D] font-semibold">Categories</h4>
            <div className="flex flex-col gap-2 font-jost text-sm text-[#B4C4C4]/70">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left py-1 hover:text-[#FFD84D] transition-colors ${
                    selectedCategory === cat ? "text-[#FFD84D] font-semibold" : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* CATALOG GRID */}
        <main className="lg:col-span-9 space-y-6">
          {/* Controls Bar */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-4">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 border border-white/15 hover:border-[#FFD84D] bg-white/5 text-white rounded-xl px-4 py-2 text-xs font-semibold font-jost uppercase tracking-wider transition-all hover:text-[#FFD84D]"
              >
                <FaSlidersH className="w-3.5 h-3.5" /> Filters
              </button>
              <p className="font-jost text-xs text-white/50">
                Showing {sortedProducts.length} of {products.length} products
              </p>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline font-jost text-xs text-white/50">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-white/10 bg-[#1B3030] text-xs font-semibold text-white py-1.5 px-3 focus:outline-none focus:border-[#FFD84D] cursor-pointer"
              >
                <option>Featured</option>
                <option>Top Rated</option>
              </select>
            </div>
          </div>

          {/* Catalog grid cards */}
          {sortedProducts.length === 0 ? (
            <div className="border border-dashed border-white/10 rounded-3xl p-16 text-center space-y-4 bg-white/[0.01]">
              <p className="text-white font-plus-jakarta-sans text-lg font-medium">No pieces found</p>
              <p className="text-white/40 font-jost text-sm max-w-xs mx-auto">
                We couldn't find any items matching your selected criteria. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="rounded-full bg-[#FFD84D] px-6 py-2 text-xs font-semibold uppercase tracking-wider text-[#102B2A] hover:bg-[#ffe073] transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative rounded-3xl border border-white/5 bg-[#1B3030]/25 p-5 flex flex-col justify-between hover:border-[#FFD84D]/20 hover:bg-[#1B3030]/45 transition-all duration-300"
                >
                  <div>
                    {/* Image panel */}
                    <Link
                      href={`/spicenbliss/product/${product.id}`}
                      className="block aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-[#1B3030] to-[#0D2221] relative border border-white/5"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 350px"
                      />
                    </Link>

                    {/* Info */}
                    <div className="mt-5 space-y-2">
                      <span className="font-jost text-[10px] uppercase tracking-widest text-[#FFD84D]/80 font-medium">
                        {product.category}
                      </span>
                      <Link
                        href={`/spicenbliss/product/${product.id}`}
                        className="block font-plus-jakarta-sans font-semibold text-white text-base hover:text-[#FFD84D] transition-colors"
                      >
                        {product.name}
                      </Link>
                      <div className="flex items-center gap-1.5">
                        <FaStar className="w-3.5 h-3.5 text-[#FFD84D]" />
                        <span className="text-white text-xs font-semibold">{product.rating}</span>
                        <span className="text-white/40 text-[10px]">({product.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full rounded-full bg-white/5 hover:bg-[#FFD84D] border border-white/10 hover:border-[#FFD84D] hover:text-[#102B2A] text-white px-5 py-2 text-xs font-semibold font-jost uppercase tracking-wider transition-all duration-300"
                    >
                      Add to Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowMobileFilters(false)}
          />

          {/* Drawer container */}
          <div className="relative w-screen max-w-sm transform bg-[#102B2A] border-l border-white/10 flex flex-col p-6 shadow-2xl animate-slideInRight">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-plus-jakarta-sans font-semibold text-white text-base flex items-center gap-2">
                <FaSlidersH className="w-4 h-4 text-[#FFD84D]" /> Filters
              </h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="rounded-full p-2 text-white/60 hover:bg-white/5 hover:text-white"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto py-6 space-y-8">
              {/* Search */}
              <div className="space-y-2">
                <h4 className="font-plus-jakarta-sans text-xs uppercase tracking-widest text-[#FFD84D] font-semibold">Search</h4>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Find a piece..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-4 pr-10 text-xs text-white placeholder-white/30 focus:border-[#FFD84D] focus:outline-none"
                  />
                  <FaSearch className="absolute right-3.5 top-3.5 w-3.5 h-3.5 text-white/30" />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-2.5">
                <h4 className="font-plus-jakarta-sans text-xs uppercase tracking-widest text-[#FFD84D] font-semibold">Categories</h4>
                <div className="flex flex-col gap-3 font-jost text-sm text-[#B4C4C4]/70">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowMobileFilters(false);
                      }}
                      className={`text-left py-1 hover:text-[#FFD84D] transition-colors ${
                        selectedCategory === cat ? "text-[#FFD84D] font-semibold" : ""
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply filters footer */}
            <div className="border-t border-white/10 pt-4 flex gap-3">
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setShowMobileFilters(false);
                }}
                className="flex-1 rounded-full border border-white/20 py-2.5 font-jost text-xs uppercase tracking-wider text-white hover:text-[#FFD84D] hover:border-[#FFD84D]"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 rounded-full bg-[#FFD84D] py-2.5 font-semibold font-jost text-xs uppercase tracking-wider text-[#102B2A] hover:bg-[#ffe073] transition-all"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFD84D] border-t-transparent" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
