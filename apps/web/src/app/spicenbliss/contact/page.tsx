"use client";

import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaCheckCircle } from "react-icons/fa";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Clear fields
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <span className="font-jost text-xs uppercase tracking-[0.3em] text-[#FFD84D] font-semibold">
          Customer Circle
        </span>
        <h1 className="font-plus-jakarta-sans text-4xl font-bold text-white tracking-tight">
          Connect With Us
        </h1>
        <p className="font-jost text-[#B4C4C4] text-sm leading-relaxed">
          Questions about sizing, custom commissions, or orders? Drop us a line and our studio representatives will respond in 24 hours.
        </p>
        <div className="w-12 h-0.5 bg-[#FFD84D] mx-auto mt-2" />
      </div>

      {/* Main Grid: Form + Address cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#1B3030] to-[#0D2221] p-8 text-center space-y-4 shadow-xl animate-fadeIn">
              <FaCheckCircle className="w-12 h-12 text-[#FFD84D] mx-auto" />
              <h2 className="font-plus-jakarta-sans text-xl font-bold text-white">Message Transmitted!</h2>
              <p className="font-jost text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                Thank you for reaching out. We have logged your request and sent a receipt confirmation to your inbox.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 rounded-full border border-white/20 hover:border-white/50 px-6 py-2.5 text-xs font-jost uppercase tracking-wider text-white transition-colors hover:text-[#FFD84D] hover:border-[#FFD84D]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-3xl border border-white/5 bg-[#1B3030]/25 p-8 space-y-5 text-left">
              <h2 className="font-plus-jakarta-sans text-lg font-semibold text-white pb-3 border-b border-white/5">
                Send a Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-jost text-xs text-white/60">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marie Dubois"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#FFD84D] focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-jost text-xs text-white/60">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marie.d@example.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#FFD84D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-jost text-xs text-white/60">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Sizing query for Amber Bracelet"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#FFD84D] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="font-jost text-xs text-white/60">Message</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your details or questions here..."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-xs text-white placeholder-white/20 focus:border-[#FFD84D] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#FFD84D] hover:bg-[#ffe073] text-[#102B2A] font-bold font-jost text-xs uppercase tracking-wider py-4 transition-all duration-300"
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Address details */}
        <div className="lg:col-span-5 space-y-6 text-left">
          {/* Card 1: Studio Details */}
          <div className="rounded-3xl border border-white/5 bg-[#1B3030]/20 p-6 space-y-4">
            <h3 className="font-plus-jakarta-sans font-semibold text-[#FFD84D] text-sm uppercase tracking-wider">
              Studio Boutique
            </h3>
            
            <div className="space-y-4 font-jost text-sm text-[#B4C4C4]/85">
              <div className="flex gap-3 items-start">
                <FaMapMarkerAlt className="w-4 h-4 text-[#FFD84D] mt-0.5 flex-shrink-0" />
                <span>
                  Spice n Bliss Studio <br />
                  Delhi Darbar Group Building, Abidjan, Côte d'Ivoire
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <FaPhoneAlt className="w-4 h-4 text-[#FFD84D] flex-shrink-0" />
                <span>+225 05 75 41 37 51</span>
              </div>
              <div className="flex gap-3 items-center">
                <FaEnvelope className="w-4 h-4 text-[#FFD84D] flex-shrink-0" />
                <span>spicenbliss@delhidarbargroup.com</span>
              </div>
            </div>
          </div>

          {/* Card 2: Quick WhatsApp Support */}
          <div className="rounded-3xl border border-white/5 bg-[#1B3030]/20 p-6 space-y-4">
            <h3 className="font-plus-jakarta-sans font-semibold text-[#FFD84D] text-sm uppercase tracking-wider">
              WhatsApp Support
            </h3>
            <p className="font-jost text-xs text-white/50 leading-relaxed">
              Want a quick response regarding order details or looking to view raw gemstones prior to stringing? Message our WhatsApp desk directly.
            </p>
            <a
              href="https://wa.me/2250575413751"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full rounded-full border-[#FFD84D] hover:bg-[#FFD84D] text-[#FFD84D] hover:text-[#102B2A] font-semibold font-jost text-xs uppercase tracking-wider py-3 transition-colors duration-300"
            >
              <FaWhatsapp className="w-4 h-4" /> Message WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
