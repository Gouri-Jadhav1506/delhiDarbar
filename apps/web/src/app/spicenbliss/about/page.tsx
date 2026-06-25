"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaChevronRight, FaLeaf, FaGem } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-24">
      {/* 1. Hero / Header Banner */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-b from-[#0D2221] via-[#102B2A] to-[#0D2221] px-4 py-16">
        <div className="absolute inset-0 bg-[#1B3030]/10 mix-blend-multiply" />
        <div className="relative z-10 text-center space-y-4 max-w-xl mx-auto">
          <span className="font-jost text-xs uppercase tracking-[0.3em] text-[#FFD84D] font-semibold">
            Our Philosophy
          </span>
          <h1 className="font-plus-jakarta-sans text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            The Story Behind <br />
            Spice n Bliss
          </h1>
          <div className="w-12 h-0.5 bg-[#FFD84D] mx-auto mt-2" />
        </div>
      </section>

      {/* 2. Duality introduction (Text + Image split) */}
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual block */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-[#1B3030]/25 flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-[#FFD84D]/15" />
            <div className="relative z-10 text-center space-y-4 max-w-xs">
              <span className="font-satisfy text-5xl text-[#FFD84D] block">Artisan Soul</span>
              <p className="font-jost text-white/75 text-xs leading-relaxed">
                "We draw inspiration from the spice routes of antiquity, where carnelian, amber, and gold were treasured assets of human connection."
              </p>
              <div className="w-8 h-px bg-white/20 mx-auto" />
            </div>
          </div>

          {/* Text block */}
          <div className="space-y-6 text-left">
            <span className="font-jost text-xs uppercase tracking-[0.3em] text-[#FFD84D] font-semibold">The Core Concept</span>
            <h2 className="font-plus-jakarta-sans text-3xl font-bold text-white">The Harmony of Duality</h2>
            <p className="font-jost text-[#B4C4C4] text-base leading-relaxed">
              **Spice n Bliss** represents the perfect union of two contrasting forces: the vibrant, textured warmth of Spice, and the serene, minimalist simplicity of Bliss. We translate this philosophy directly into our jewelry and accessory capsules.
            </p>
            <p className="font-jost text-[#B4C4C4]/70 text-sm leading-relaxed">
              Every item in our collection is curated to feature this contrast: from raw Baltic amber beads juxtaposed with high-polished gold-filled loops, to sterling silver earrings that cradle vivid natural carnelian gems.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Materials Sourcing Highlights */}
      <section className="bg-gradient-to-b from-[#0D2221] to-[#102B2A] border-y border-white/5 py-24 px-4 md:px-8">
        <div className="mx-auto max-w-7xl space-y-16">
          <div className="text-center space-y-3">
            <span className="font-jost text-xs uppercase tracking-[0.3em] text-[#FFD84D]">Materials & Ethics</span>
            <h2 className="font-plus-jakarta-sans text-3xl font-bold text-white">Ethical Luxury Pledges</h2>
            <div className="w-12 h-0.5 bg-[#FFD84D] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl bg-[#1B3030]/25 border border-white/5 p-8 space-y-4 hover:border-white/15 transition-colors">
              <FaGem className="w-8 h-8 text-[#FFD84D]/80" />
              <h3 className="font-plus-jakarta-sans text-lg font-semibold text-white">Gemstone Authenticity</h3>
              <p className="font-jost text-[#B4C4C4]/70 text-sm leading-relaxed text-left">
                We strictly use genuine minerals, amber, pearls, and stones. None of our collection items feature plastic replicas, dyed composites, or synthetic glass.
              </p>
            </div>

            <div className="rounded-3xl bg-[#1B3030]/25 border border-white/5 p-8 space-y-4 hover:border-white/15 transition-colors">
              <FaHeart className="w-8 h-8 text-[#FFD84D]/80" />
              <h3 className="font-plus-jakarta-sans text-lg font-semibold text-white">Fair Sourcing</h3>
              <p className="font-jost text-[#B4C4C4]/70 text-sm leading-relaxed text-left">
                We work directly with mineral co-operatives in the Baltic regions and Southeast Asia to procure our raw materials, ensuring artisans receive fair compensation.
              </p>
            </div>

            <div className="rounded-3xl bg-[#1B3030]/25 border border-white/5 p-8 space-y-4 hover:border-white/15 transition-colors">
              <FaLeaf className="w-8 h-8 text-[#FFD84D]/80" />
              <h3 className="font-plus-jakarta-sans text-lg font-semibold text-white">Green Packaging</h3>
              <p className="font-jost text-[#B4C4C4]/70 text-sm leading-relaxed text-left">
                Your luxury items will arrive wrapped in organic unbleached linen pouches, seated inside cardboard presentation boxes crafted from recycled FSC materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Detail Story Section */}
      <section className="mx-auto max-w-4xl px-4 text-center space-y-8">
        <h2 className="font-plus-jakarta-sans text-2xl md:text-3xl font-bold text-white">The Artisan Hand</h2>
        <p className="font-jost text-[#B4C4C4] text-base leading-relaxed">
          Every bracelet is hand-threaded on custom elastic cords, and every wire-wrap earring is shaped with delicate jewelry pliers by our team of 3 master craftsmen. We limit our capsules to small batches of 50-100 units to guarantee that every single item receives custom supervision and structural checking before shipping.
        </p>
        <div className="pt-4">
          <Link
            href="/spicenbliss/shop"
            className="group inline-flex items-center gap-3 rounded-full bg-[#FFD84D] hover:bg-[#ffe073] px-8 py-3.5 text-xs font-bold font-jost uppercase tracking-wider text-[#102B2A] transition-all duration-300"
          >
            Explore The Capsule Collection
            <FaChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
