"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { FaStar, FaPlus, FaMinus, FaShippingFast, FaUndo, FaLock, FaChevronRight } from "react-icons/fa";

interface ProductDetailClientProps {
  id: string;
}

export default function ProductDetailClient({ id }: ProductDetailClientProps) {
  const { addToCart, products } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "materials" | "shipping">("details");

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <p className="text-white font-plus-jakarta-sans text-xl font-bold">Piece Not Found</p>
        <p className="text-white/50 font-jost max-w-xs">
          The accessory you are looking for does not exist in our current collection vaults.
        </p>
        <Link
          href="/spicenbliss/shop"
          className="rounded-full bg-[#FFD84D] px-6 py-2.5 font-jost text-xs uppercase tracking-wider font-semibold text-[#102B2A] hover:bg-[#ffe073] transition-all"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  // Get related products (exclude current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // If we don't have enough in the same category, grab others
  if (relatedProducts.length < 3) {
    const others = products
      .filter((p) => p.id !== product.id && !relatedProducts.some((r) => r.id === p.id))
      .slice(0, 3 - relatedProducts.length);
    relatedProducts.push(...others);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 space-y-20">
      {/* Breadcrumbs */}
      <nav className="font-jost text-xs uppercase tracking-wider text-white/40 flex items-center gap-2">
        <Link href="/spicenbliss" className="hover:text-[#FFD84D] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/spicenbliss/shop" className="hover:text-[#FFD84D] transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-white/80">{product.name}</span>
      </nav>

      {/* Main product presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Image Showcase */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="group relative w-full aspect-square max-w-[500px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-tr from-[#1B3030] to-[#0D2221] flex items-center justify-center p-6 shadow-2xl">
            {/* Soft decorative glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFD84D]/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#FFD84D]/5 rounded-full blur-[65px] pointer-events-none" />
            
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-102"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />
          </div>
        </div>

        {/* Right Column: Buying Details */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <div className="space-y-3">
            <span className="inline-block font-jost text-xs uppercase tracking-[0.25em] text-[#FFD84D] font-semibold">
              Capsule Collection
            </span>
            <h1 className="font-plus-jakarta-sans text-3xl md:text-4xl font-bold text-white tracking-tight">
              {product.name}
            </h1>

            {/* Ratings & reviews */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? "text-[#FFD84D]" : "text-white/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-white text-xs font-semibold">{product.rating}</span>
              <span className="text-white/40 text-xs">({product.reviews} customer reviews)</span>
            </div>
          </div>

          {/* Status Info (Price removed) */}
          <div className="border-y border-white/10 py-5 flex items-center justify-between">
            <span className="rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-[10px] uppercase tracking-wider text-[#FFD84D] font-semibold">
              In Stock & Ready
            </span>
          </div>

          {/* Short Description */}
          <p className="font-jost text-[#B4C4C4] text-base leading-relaxed">
            {product.desc}
          </p>

          {/* Actions & Buying Options */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Qty Counter */}
              <div className="flex items-center border border-white/10 bg-white/5 rounded-full px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-white/60 hover:text-white"
                  aria-label="Decrease quantity"
                >
                  <FaMinus className="w-3 h-3" />
                </button>
                <span className="mx-4 text-white font-medium w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-white/60 hover:text-white"
                  aria-label="Increase quantity"
                >
                  <FaPlus className="w-3 h-3" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 rounded-full bg-[#FFD84D] hover:bg-[#ffe073] text-[#102B2A] font-bold font-jost text-sm uppercase tracking-wider py-4 px-8 transition-all duration-300 hover:scale-[1.01] shadow-xl shadow-[#FFD84D]/10"
              >
                Add to Quote Request
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-[10px] font-jost uppercase tracking-wider text-white/50 text-center">
              <div className="flex flex-col items-center gap-1.5">
                <FaShippingFast className="w-4 h-4 text-[#FFD84D]/70" />
                <span>Free Express</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <FaUndo className="w-4 h-4 text-[#FFD84D]/70" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <FaLock className="w-4 h-4 text-[#FFD84D]/70" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>

          {/* Detailed Specifications Tabs */}
          <div className="space-y-4 pt-4">
            <div className="flex border-b border-white/10 font-jost text-xs uppercase tracking-widest">
              <button
                onClick={() => setActiveTab("details")}
                className={`pb-3 pr-6 font-semibold transition-colors ${
                  activeTab === "details" ? "text-[#FFD84D] border-b-2 border-[#FFD84D]" : "text-white/50"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab("materials")}
                className={`pb-3 px-6 font-semibold transition-colors ${
                  activeTab === "materials" ? "text-[#FFD84D] border-b-2 border-[#FFD84D]" : "text-white/50"
                }`}
              >
                Materials
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`pb-3 px-6 font-semibold transition-colors ${
                  activeTab === "shipping" ? "text-[#FFD84D] border-b-2 border-[#FFD84D]" : "text-white/50"
                }`}
              >
                Delivery & Gift
              </button>
            </div>

            <div className="py-2 font-jost text-sm text-[#B4C4C4]/85 leading-relaxed">
              {activeTab === "details" && (
                <ul className="list-disc list-inside space-y-2">
                  {product.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              )}
              {activeTab === "materials" && (
                <p>{product.materials}</p>
              )}
              {activeTab === "shipping" && (
                <p>
                  Every piece is shipped via insured DHL express delivery in 2-4 business days. Items are packaged securely in linen jewelry pouches inside our signature hard-shell presentation box. Free return label included inside.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended related products */}
      <section className="space-y-8 pt-12 border-t border-white/10">
        <h2 className="font-plus-jakarta-sans text-2xl font-bold text-white text-left">
          Complete the Journey
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              className="group relative rounded-3xl border border-white/5 bg-[#1B3030]/15 p-4 flex flex-col justify-between hover:border-[#FFD84D]/20 hover:bg-[#1B3030]/30 transition-all duration-300"
            >
              <div>
                <Link
                  href={`/spicenbliss/product/${rel.id}`}
                  className="block aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-[#1B3030] to-[#0D2221] relative border border-white/5"
                >
                  <Image
                    src={rel.image}
                    alt={rel.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 250px"
                  />
                </Link>

                <div className="mt-4 space-y-1">
                  <span className="font-jost text-[9px] uppercase tracking-widest text-[#FFD84D]/80">
                    {rel.category}
                  </span>
                  <Link
                    href={`/spicenbliss/product/${rel.id}`}
                    className="block font-plus-jakarta-sans font-semibold text-white text-sm hover:text-[#FFD84D] transition-colors line-clamp-1"
                  >
                    {rel.name}
                  </Link>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-center">
                <Link
                  href={`/spicenbliss/product/${rel.id}`}
                  className="w-full text-center rounded-full bg-white/5 hover:bg-[#FFD84D] border border-white/10 hover:border-[#FFD84D] hover:text-[#102B2A] text-white px-4 py-1.5 text-[10px] font-semibold font-jost uppercase tracking-wider transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
