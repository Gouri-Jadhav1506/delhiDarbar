"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./context/CartContext";
import { FaArrowRight, FaStar, FaQuoteLeft } from "react-icons/fa";

export default function SpiceHomePage() {
  const { addToCart, products } = useCart();
  const featuredProducts = products.slice(0, 3);

  const testimonials = [
    {
      name: "Sonia K.",
      role: "Verified Collector",
      text: "The Elysian Amber Bracelet feels so organic and weighted. The packaging smelled faintly of cardamom and wood, a true bliss when opening!",
      stars: 5,
    },
    {
      name: "Jean-Pierre D.",
      role: "Gifting Client",
      text: "Bought the Ethnic Pink Stone Oxidized Earrings for my wife. The craftsmanship is flawless, and the detailing is incredibly high quality. Courier arrived in 2 days.",
      stars: 5,
    },
  ];

  return (
    <div className="space-y-24 pb-24">
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0D2221] via-[#102B2A] to-[#0D2221] px-4 py-20">
        {/* Decorative glows */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#FFD84D]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#FFD84D]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Text */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <span className="inline-block font-plus-jakarta-sans text-xs uppercase tracking-[0.4em] text-[#FFD84D] font-semibold">
              Now Available Worldwide
            </span>
            <h1 className="font-plus-jakarta-sans text-4xl sm:text-6xl xl:text-7xl font-bold text-white leading-[1.15] tracking-tight">
              Spices of Life, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD84D] via-[#ffe073] to-[#FFD84D]">
                Harmony of Bliss
              </span>
            </h1>
            <p className="font-jost text-[#B4C4C4] text-base sm:text-lg leading-relaxed max-w-xl">
              A curated boutique of fine bracelets, statement earrings, and premium accessories, meticulously designed and delivered to your doorstep.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/spicenbliss/shop"
                className="group flex items-center gap-3 rounded-full bg-[#FFD84D] hover:bg-[#ffe073] px-8 py-4 text-sm font-semibold font-jost uppercase tracking-wider text-[#102B2A] shadow-xl shadow-[#FFD84D]/15 transition-all duration-300 hover:scale-[1.02]"
              >
                Explore Collection
                <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/spicenbliss/about"
                className="rounded-full border border-white/20 hover:border-white/50 bg-white/5 px-8 py-4 text-sm font-jost uppercase tracking-wider text-white transition-all duration-300"
              >
                Our Philosophy
              </Link>
            </div>
          </div>

          {/* Hero Feature Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="group relative w-full max-w-[380px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 backdrop-blur shadow-2xl transition-all duration-500 hover:border-[#FFD84D]/30">
              {/* Product Glow */}
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#FFD84D]/20 rounded-full blur-[50px] pointer-events-none" />
              
              {/* Image box */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-[#0a1c1c] to-[#041314] border border-white/5 flex items-center justify-center p-4">
                <Image
                  src="/assets/images/spicenbliss/bracelet_1.jpg"
                  alt="Featured Elysian Amber Bracelet"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 380px"
                  priority
                />
              </div>

              {/* Tag */}
              <span className="absolute top-10 left-10 rounded-full bg-[#FFD84D] px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#102B2A]">
                Best Seller
              </span>

              {/* Info & Cart Add */}
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <h3 className="font-plus-jakarta-sans font-semibold text-white text-lg group-hover:text-[#FFD84D] transition-colors">
                    Elysian Amber Bracelet
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <FaStar className="w-3.5 h-3.5 text-[#FFD84D]" />
                    <span className="text-white text-xs font-semibold">4.8</span>
                    <span className="text-white/40 text-xs">(24 reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => products[0] && addToCart(products[0])}
                    className="inline-block font-jost text-[10px] uppercase tracking-wider font-semibold border border-[#FFD84D] text-[#FFD84D] hover:bg-[#FFD84D] hover:text-[#102B2A] rounded-full px-4 py-1.5 transition-all duration-300"
                  >
                    Quick Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Value Highlights */}
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-3xl border border-white/5 bg-[#1B3030]/45 p-8 text-center space-y-4 hover:border-white/10 transition-colors duration-300">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#FFD84D]/10 flex items-center justify-center border border-[#FFD84D]/20 text-[#FFD84D]">
              <span className="font-bold text-lg">01</span>
            </div>
            <h3 className="font-plus-jakarta-sans text-lg font-semibold text-white">Artisan Craft</h3>
            <p className="text-[#B4C4C4]/70 font-jost text-sm leading-relaxed">
              Every bracelet and earring is assembled and polished by hand, making every single piece entirely unique.
            </p>
          </div>

          <div className="rounded-3xl border border-white/5 bg-[#1B3030]/45 p-8 text-center space-y-4 hover:border-white/10 transition-colors duration-300">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#FFD84D]/10 flex items-center justify-center border border-[#FFD84D]/20 text-[#FFD84D]">
              <span className="font-bold text-lg">02</span>
            </div>
            <h3 className="font-plus-jakarta-sans text-lg font-semibold text-white">Natural Elements</h3>
            <p className="text-[#B4C4C4]/70 font-jost text-sm leading-relaxed">
              We exclusively use natural gemstones like Baltic amber, green jade, rainbow moonstone, and freshwater pearls.
            </p>
          </div>

          <div className="rounded-3xl border border-white/5 bg-[#1B3030]/45 p-8 text-center space-y-4 hover:border-white/10 transition-colors duration-300">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#FFD84D]/10 flex items-center justify-center border border-[#FFD84D]/20 text-[#FFD84D]">
              <span className="font-bold text-lg">03</span>
            </div>
            <h3 className="font-plus-jakarta-sans text-lg font-semibold text-white">To Your Door</h3>
            <p className="text-[#B4C4C4]/70 font-jost text-sm leading-relaxed">
              Wrapped in our signature fragrance-infused linen bags and eco-friendly boxes, shipped worldwide directly to you.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Category Showcase Grid */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="font-jost text-xs uppercase tracking-[0.3em] text-[#FFD84D]">Capsule Series</span>
          <h2 className="font-plus-jakarta-sans text-3xl md:text-4xl font-bold text-white">Curated Collections</h2>
          <div className="w-12 h-0.5 bg-[#FFD84D] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bracelets */}
          <Link
            href="/spicenbliss/shop?category=Bracelets"
            className="group relative h-96 rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-end p-8 transition-transform duration-500 hover:scale-[1.01]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />
            <div className="absolute inset-0 bg-[#0a2325]/45 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
            
            {/* Category visual representation */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <span className="font-satisfy text-8xl text-white/5 select-none pointer-events-none uppercase">Beads</span>
            </div>

            <div className="relative z-20 space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#FFD84D] font-semibold">Capsule 01</span>
              <h3 className="font-plus-jakarta-sans font-bold text-white text-2xl group-hover:text-[#FFD84D] transition-colors">
                Refined Wristwear
              </h3>
              <p className="text-white/60 font-jost text-xs leading-relaxed max-w-xs">
                Hand-knotted stone beads and gold accents.
              </p>
            </div>
          </Link>

          {/* Earrings */}
          <Link
            href="/spicenbliss/shop?category=Earrings"
            className="group relative h-96 rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-end p-8 transition-transform duration-500 hover:scale-[1.01]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />
            <div className="absolute inset-0 bg-[#25170a]/45 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
            
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <span className="font-satisfy text-8xl text-white/5 select-none pointer-events-none uppercase">Drop</span>
            </div>

            <div className="relative z-20 space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#FFD84D] font-semibold">Capsule 02</span>
              <h3 className="font-plus-jakarta-sans font-bold text-white text-2xl group-hover:text-[#FFD84D] transition-colors">
                Sculpted Earpieces
              </h3>
              <p className="text-white/60 font-jost text-xs leading-relaxed max-w-xs">
                Lotus carvings, moonstones, and drop hoops.
              </p>
            </div>
          </Link>

          {/* Accessories */}
          <Link
            href="/spicenbliss/shop?category=Accessories"
            className="group relative h-96 rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-end p-8 transition-transform duration-500 hover:scale-[1.01]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />
            <div className="absolute inset-0 bg-[#14231b]/45 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
            
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <span className="font-satisfy text-8xl text-white/5 select-none pointer-events-none uppercase">Cuffs</span>
            </div>

            <div className="relative z-20 space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#FFD84D] font-semibold">Capsule 03</span>
              <h3 className="font-plus-jakarta-sans font-bold text-white text-2xl group-hover:text-[#FFD84D] transition-colors">
                Adornment & Accents
              </h3>
              <p className="text-white/60 font-jost text-xs leading-relaxed max-w-xs">
                Textured brass cuffs, carnelian rings, and delicate anklets.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Best Sellers Products Showcase */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 text-left">
            <span className="font-jost text-xs uppercase tracking-[0.3em] text-[#FFD84D]">Popular Pieces</span>
            <h2 className="font-plus-jakarta-sans text-3xl font-bold text-white">The Best Sellers</h2>
          </div>
          <Link
            href="/spicenbliss/shop"
            className="inline-flex items-center gap-2 font-jost text-xs uppercase tracking-widest text-[#FFD84D] hover:text-white transition-colors"
          >
            View All Pieces <FaArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-3xl border border-white/5 bg-[#1B3030]/30 p-5 flex flex-col justify-between hover:border-[#FFD84D]/20 hover:bg-[#1B3030]/45 transition-all duration-300"
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
                    <FaStar className="w-3 h-3 text-[#FFD84D]" />
                    <span className="text-white text-xs font-semibold">{product.rating}</span>
                    <span className="text-white/40 text-[10px]">({product.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Cart CTA (Price removed) */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full rounded-full bg-white/5 hover:bg-[#FFD84D] border border-white/10 hover:border-[#FFD84D] hover:text-[#102B2A] text-white px-5 py-2 text-xs font-semibold font-jost uppercase tracking-wider transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Split Brand Philosophy Section */}
      <section className="bg-gradient-to-r from-[#0D2221] via-[#102B2A] to-[#0D2221] border-y border-white/5 py-24 px-4 md:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-left">
            <span className="font-jost text-xs uppercase tracking-[0.3em] text-[#FFD84D]">Ethical Sourcing</span>
            <h2 className="font-plus-jakarta-sans text-3xl md:text-5xl font-bold text-white leading-tight">
              Raw Organic Elegance
            </h2>
            <div className="w-12 h-0.5 bg-[#FFD84D]" />
            
            <p className="text-[#B4C4C4] font-jost text-base leading-relaxed">
              Our designs represent the duality of Spice (energy, colors, textures of the earth) and Bliss (minimalist harmony, calm silver, raw stone). We source our gems ethically from trusted local suppliers, ensuring fair practices and zero synthetic compounds.
            </p>
            <p className="text-[#B4C4C4]/70 font-jost text-sm leading-relaxed">
              Every detail is engineered with longevity in mind: using tarnish-resistant sterling silver or heavy gold vermeil wire wrapping, designed to be passed down through generations.
            </p>

            <div className="pt-4">
              <Link
                href="/spicenbliss/about"
                className="group inline-flex items-center gap-3 font-semibold font-jost text-xs uppercase tracking-widest text-[#FFD84D] hover:text-white transition-colors"
              >
                Learn About Our Artisan Process
                <FaArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Philosophy Visual block */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-[#1B3030]/45 flex items-center justify-center p-8">
            {/* Decorative layout */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-[#FFD84D]/10" />
            <div className="text-center relative z-10 space-y-4 max-w-md">
              <span className="font-satisfy text-4xl text-[#FFD84D] block">Sustainable Luxury</span>
              <p className="font-jost text-white/80 text-sm leading-relaxed">
                "We believe that true beauty leaves no scars. All our packaging is 100% recyclable, made from unbleached linen and FSC-certified paper."
              </p>
              <div className="mx-auto w-8 h-px bg-white/30" />
              <span className="block font-plus-jakarta-sans text-[10px] uppercase tracking-wider text-white/50">Spice n Bliss Pledge</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="font-jost text-xs uppercase tracking-[0.3em] text-[#FFD84D]">Voices of Bliss</span>
          <h2 className="font-plus-jakarta-sans text-3xl font-bold text-white">Collector Reviews</h2>
          <div className="w-12 h-0.5 bg-[#FFD84D] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-white/5 bg-[#1B3030]/25 p-8 relative overflow-hidden text-left flex flex-col justify-between"
            >
              <FaQuoteLeft className="absolute -top-4 -right-4 w-24 h-24 text-white/[0.02] pointer-events-none" />
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(t.stars)].map((_, i) => (
                    <FaStar key={i} className="w-3.5 h-3.5 text-[#FFD84D]" />
                  ))}
                </div>
                <p className="text-white/80 font-jost text-sm leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <h4 className="font-plus-jakarta-sans text-white text-sm font-semibold">{t.name}</h4>
                  <span className="text-[#B4C4C4]/50 font-jost text-[10px] uppercase tracking-wider">{t.role}</span>
                </div>
                <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[8px] uppercase tracking-wider text-[#FFD84D]">
                  Verified Purchase
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
