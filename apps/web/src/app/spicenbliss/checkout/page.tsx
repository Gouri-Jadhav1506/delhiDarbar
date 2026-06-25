"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { FaCheckCircle, FaLock, FaArrowRight } from "react-icons/fa";

export default function CheckoutPage() {
  const { cart, clearCart, addOrder } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping/Billing Form, 3: Complete Success
  const [submittedOrderId, setSubmittedOrderId] = useState("");

  // Form states
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("United States");

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = addOrder({
      customerName: `${firstName} ${lastName}`,
      email,
      address,
      city,
      zip,
      country,
      items: cart,
    });
    setSubmittedOrderId(orderId || "");
    setStep(3);
    clearCart(); // Clear active cart state on success
  };

  // If cart is empty and we aren't in success step, redirect to shop
  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <p className="text-white font-plus-jakarta-sans text-xl font-bold">No Items for Quote</p>
        <p className="text-white/55 font-jost max-w-xs">
          Your quote request list is empty. Please add items to your quote list before submitting.
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

  // STEP 3: Order Completed successfully
  if (step === 3) {
    const orderNumber = submittedOrderId || `SB-${Math.floor(100000 + Math.random() * 900000)}`;
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full rounded-3xl border border-white/10 bg-gradient-to-b from-[#1B3030] to-[#0D2221] p-8 text-center space-y-6 shadow-2xl relative overflow-hidden animate-fadeIn">
          {/* ambient glows */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FFD84D]/15 rounded-full blur-[60px]" />

          <FaCheckCircle className="w-16 h-16 text-[#FFD84D] mx-auto animate-bounce" />
          
          <div className="space-y-2">
            <span className="font-jost text-[10px] uppercase tracking-[0.25em] text-[#FFD84D] font-semibold">
              Quote Request Confirmed
            </span>
            <h1 className="font-plus-jakarta-sans text-2xl font-bold text-white">
              Request Submitted Successfully!
            </h1>
            <p className="font-jost text-white/55 text-sm leading-relaxed">
              Thank you for your request. We will review your quote inquiry and follow up shortly.
            </p>
          </div>

          <div className="border border-white/5 bg-white/[0.02] rounded-2xl p-4 text-left font-jost text-sm space-y-2 text-white/70">
            <div className="flex justify-between">
              <span>Inquiry Quote Number</span>
              <span className="text-white font-mono font-semibold">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Response Method</span>
              <span className="text-white">Email Consultation</span>
            </div>
            <div className="flex justify-between">
              <span>Est. Response Time</span>
              <span className="text-white">Within 24 Hours</span>
            </div>
          </div>

          <p className="font-jost text-xs text-[#B4C4C4]/50 leading-relaxed">
            A confirmation receipt and a summary of your inquiry details have been sent to your email.
          </p>

          <div className="pt-2">
            <Link
              href="/spicenbliss/shop"
              className="block rounded-full bg-[#FFD84D] hover:bg-[#ffe073] text-[#102B2A] font-bold font-jost text-xs uppercase tracking-wider py-4 transition-all duration-300"
            >
              Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 space-y-12">
      {/* Title */}
      <div className="text-left space-y-3">
        <h1 className="font-plus-jakarta-sans text-3xl font-bold text-white tracking-tight">Quote Request Vault</h1>
        {/* Checkout progress steps */}
        <div className="flex items-center gap-4 font-jost text-xs uppercase tracking-wider text-[#FFD84D] font-semibold">
          <span>01. Request Details</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Forms */}
        <div className="lg:col-span-8">
          {step === 1 && (
            <form onSubmit={handleShippingSubmit} className="rounded-3xl border border-white/5 bg-[#1B3030]/25 p-8 space-y-6 text-left">
              <h2 className="font-plus-jakarta-sans text-lg font-semibold text-white pb-3 border-b border-white/5 flex justify-between items-center">
                <span>Request Details</span>
                <span className="flex items-center gap-1.5 font-jost text-xs text-emerald-400 font-normal">
                  <FaLock className="w-3.5 h-3.5" /> Secure SSL Connection
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-jost text-xs text-white/60">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. John"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#FFD84D] focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-jost text-xs text-white/60">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Doe"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#FFD84D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-jost text-xs text-white/60">Email Address (for quote response)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#FFD84D] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="font-jost text-xs text-white/60">Street Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Luxury Avenue Suite A"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#FFD84D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="font-jost text-xs text-white/60">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Abidjan"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#FFD84D] focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-jost text-xs text-white/60">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="00100"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#FFD84D] focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-jost text-xs text-white/60">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#1B3030] px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFD84D] cursor-pointer"
                  >
                    <option>Cote d'Ivoire</option>
                    <option>United States</option>
                    <option>France</option>
                    <option>United Kingdom</option>
                    <option>India</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="group flex items-center gap-2 rounded-full bg-[#FFD84D] hover:bg-[#ffe073] text-[#102B2A] px-8 py-3.5 text-xs font-bold font-jost uppercase tracking-wider transition-all duration-300 hover:scale-[1.01]"
                >
                  Submit Quote Request
                  <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Quote Review Detail */}
        <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-[#1B3030]/45 p-6 space-y-6 text-left shadow-2xl relative overflow-hidden">
          <h3 className="font-plus-jakarta-sans font-semibold text-white text-lg pb-4 border-b border-white/5">
            Quote Review
          </h3>

          {/* List items */}
          <div className="divide-y divide-white/5 max-h-60 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-4 py-3 first:pt-0 last:pb-0 items-center">
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold truncate font-plus-jakarta-sans">{item.product.name}</p>
                  <p className="text-[#FFD84D] font-jost text-[10px] mt-0.5">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-4 space-y-3 font-jost text-xs text-white/50">
            <p>&bull; Insured DHL Courier Shipping included.</p>
            <p>&bull; Fragrance-infused linen bag packaging included.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
