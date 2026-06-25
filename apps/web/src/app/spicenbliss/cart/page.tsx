"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { FaMinus, FaPlus, FaTrash, FaShoppingCart, FaArrowRight } from "react-icons/fa";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [giftWrap, setGiftWrap] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/20">
          <FaShoppingCart className="w-10 h-10" />
        </div>
        <div className="space-y-2 max-w-sm">
          <h1 className="font-plus-jakarta-sans text-2xl font-bold text-white">Your Cart is Empty</h1>
          <p className="font-jost text-white/50 text-sm">
            You currently have no accessories in your shopping cart bag. Browse the collections to add items.
          </p>
        </div>
        <Link
          href="/spicenbliss/shop"
          className="rounded-full bg-[#FFD84D] px-8 py-3.5 font-jost text-xs uppercase tracking-wider font-semibold text-[#102B2A] hover:bg-[#ffe073] transition-all duration-300"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 space-y-12">
      {/* Title */}
      <div className="text-left space-y-2">
        <h1 className="font-plus-jakarta-sans text-3xl font-bold text-white tracking-tight">Your Shopping Bag</h1>
        <p className="font-jost text-white/50 text-xs uppercase tracking-wider">
          Review items in your order bag prior to proceeding
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Items Table List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border border-white/10 bg-[#1B3030]/25 rounded-3xl overflow-hidden">
            {/* Header row (Desktop) */}
            <div className="hidden md:grid grid-cols-12 gap-4 bg-white/5 px-6 py-4 border-b border-white/10 font-jost text-xs uppercase tracking-widest text-[#FFD84D] font-semibold">
              <div className="col-span-8">Product details</div>
              <div className="col-span-4 text-right">Quantity</div>
            </div>

            {/* Items */}
            <div className="divide-y divide-white/5 px-6">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 items-center"
                >
                  {/* Product detail */}
                  <div className="col-span-12 md:col-span-8 flex items-center gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <Link
                        href={`/spicenbliss/product/${item.product.id}`}
                        className="font-plus-jakarta-sans font-semibold text-white text-base hover:text-[#FFD84D] transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <span className="block font-jost text-xs text-white/40 uppercase tracking-widest">
                        {item.product.category}
                      </span>
                    </div>
                  </div>

                  {/* Qty Controls & Remove (Prices removed) */}
                  <div className="col-span-12 md:col-span-4 flex justify-between md:justify-end items-center gap-6">
                    <div className="flex items-center border border-white/10 bg-white/5 rounded-full px-2.5 py-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-white/60 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus className="w-2.5 h-2.5" />
                      </button>
                      <span className="mx-3 text-white text-xs font-semibold w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-white/60 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <FaPlus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-white/40 hover:text-[#e11d48] p-1.5 transition-colors animate-pulse"
                      aria-label="Remove item"
                    >
                      <FaTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom notes and gift wrap options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Gift Wrap options */}
            <div className="rounded-3xl border border-white/5 bg-[#1B3030]/15 p-6 space-y-4 text-left">
              <h3 className="font-plus-jakarta-sans font-semibold text-white text-sm">Premium Gift Wrapping</h3>
              <p className="font-jost text-white/50 text-xs leading-relaxed">
                Add premium hard-shell packaging with personalized calligraphy notes and wax sealing details.
              </p>
              <label className="flex items-center gap-3 cursor-pointer group pt-1">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="rounded border-white/10 bg-white/5 text-[#FFD84D] focus:ring-[#FFD84D] focus:ring-offset-0 focus:outline-none w-4 h-4"
                />
                <span className="font-jost text-xs text-white/80 group-hover:text-white transition-colors">
                  Yes, add premium gift wrap details
                </span>
              </label>
            </div>

            {/* Special Instructions */}
            <div className="rounded-3xl border border-white/5 bg-[#1B3030]/15 p-6 space-y-3 text-left">
              <h3 className="font-plus-jakarta-sans font-semibold text-white text-sm">Special Order Instructions</h3>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Include custom wrist size measurements or specific shipping requests here..."
                rows={3}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white placeholder-white/30 focus:border-[#FFD84D] focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Order Setup Card */}
        <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-gradient-to-b from-[#1B3030] to-[#0D2221] p-6 space-y-6 text-left shadow-2xl relative overflow-hidden">
          {/* ambient glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#FFD84D]/5 rounded-full blur-[70px] pointer-events-none" />

          <h3 className="font-plus-jakarta-sans font-semibold text-white text-lg pb-4 border-b border-white/5">
            Order Details
          </h3>

          <div className="space-y-3 font-jost text-sm text-white/70">
            <p>Your package will be carefully hand-threaded and wire-wrapped by our master artisans.</p>
            <p>Items will be wrapped in our signature fragrance-infused unbleached linen bags and shipped inside FSC-certified recycled boxes.</p>
            <p className="text-xs text-[#FFD84D] font-semibold">&bull; Includes DHL Insured Courier Delivery</p>
          </div>

          <Link
            href="/spicenbliss/checkout"
            className="group flex items-center justify-center gap-3 w-full rounded-full bg-[#FFD84D] hover:bg-[#ffe073] text-[#102B2A] font-bold font-jost text-sm uppercase tracking-wider py-4 transition-all duration-300 hover:scale-[1.01]"
          >
            Proceed to Setup Order
            <FaArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="text-center pt-2">
            <Link
              href="/spicenbliss/shop"
              className="inline-block font-jost text-xs uppercase tracking-wider text-white/40 hover:text-[#FFD84D] transition-colors"
            >
              Continue Browsing Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
