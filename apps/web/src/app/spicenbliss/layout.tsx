"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CartProvider, useCart } from "./context/CartContext";
import { FaShoppingCart, FaTimes, FaPlus, FaMinus, FaTrash, FaBars } from "react-icons/fa";

function SpiceHeader() {
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0D2221]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        {/* Brand Logo & Name */}
        <Link href="/spicenbliss" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl border border-[#FFD84D]/30 bg-white/5 p-1 flex items-center justify-center transition-colors duration-300 group-hover:border-[#FFD84D]">
            <Image
              src="/assets/images/spice_n_bliss_logo.png"
              alt="Spice n Bliss Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-plus-jakarta-sans text-lg font-bold tracking-tight text-white group-hover:text-[#FFD84D] transition-colors duration-300">
              Spice n Bliss
            </span>
            <span className="block text-[9px] uppercase tracking-[0.25em] text-[#FFD84D]/80">
              Curated Accessories
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-jost text-sm uppercase tracking-[0.15em]">
          <Link href="/spicenbliss" className="text-white/80 hover:text-[#FFD84D] transition-colors duration-300">
            Home
          </Link>
          <Link href="/spicenbliss/shop" className="text-white/80 hover:text-[#FFD84D] transition-colors duration-300">
            Shop Collection
          </Link>
          <Link href="/spicenbliss/about" className="text-white/80 hover:text-[#FFD84D] transition-colors duration-300">
            Our Story
          </Link>
          <Link href="/spicenbliss/contact" className="text-white/80 hover:text-[#FFD84D] transition-colors duration-300">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Back to Gateway */}
          <Link
            href="/"
            className="hidden sm:inline-block font-jost text-xs uppercase tracking-wider text-white/50 hover:text-white border border-white/20 hover:border-white/50 rounded-full px-4 py-1.5 transition-all duration-300"
          >
            Delhi Darbar Group
          </Link>

          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full border border-white/10 bg-white/5 text-white hover:border-[#FFD84D] hover:text-[#FFD84D] transition-all duration-300"
            aria-label="Open Shopping Cart"
          >
            <FaShoppingCart className="w-5.5 h-5.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#FFD84D] text-[10px] font-bold text-[#102B2A] shadow-lg animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#FFD84D] md:hidden transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0D2221] px-6 py-6 space-y-4 flex flex-col font-jost text-sm uppercase tracking-wider animate-fadeIn">
          <Link
            href="/spicenbliss"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/80 hover:text-[#FFD84D] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/spicenbliss/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/80 hover:text-[#FFD84D] transition-colors"
          >
            Shop Collection
          </Link>
          <Link
            href="/spicenbliss/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/80 hover:text-[#FFD84D] transition-colors"
          >
            Our Story
          </Link>
          <Link
            href="/spicenbliss/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/80 hover:text-[#FFD84D] transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center text-white/50 border border-white/10 rounded-lg py-2 mt-4 text-xs hover:border-[#FFD84D] hover:text-[#FFD84D]"
          >
            Delhi Darbar Group
          </Link>
        </div>
      )}
    </header>
  );
}

function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Side Panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-[#102B2A] border-l border-white/10 flex flex-col shadow-2xl animate-slideInRight">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <h2 className="font-plus-jakarta-sans text-lg font-semibold text-white">Your Shopping Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-full p-2 text-white/60 hover:bg-white/5 hover:text-white transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/30">
                  <FaShoppingCart className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-white text-base font-semibold">Your cart is empty</p>
                  <p className="text-white/50 text-sm">Add some exquisite pieces to begin your journey.</p>
                </div>
                <Link
                  href="/spicenbliss/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block mt-4 rounded-full bg-[#FFD84D] px-6 py-2.5 font-jost text-xs uppercase tracking-wider font-semibold text-[#102B2A] hover:bg-[#ffe073] transition-all duration-300"
                >
                  Browse Shop
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-b-0"
                >
                  {/* Thumbnail */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <Link
                      href={`/spicenbliss/product/${item.product.id}`}
                      onClick={() => setIsCartOpen(false)}
                      className="text-white font-plus-jakarta-sans font-medium text-sm hover:text-[#FFD84D] transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <span className="block font-jost text-[10px] text-white/40 uppercase tracking-widest mt-1">
                      {item.product.category}
                    </span>

                    {/* Qty & Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-white/10 bg-white/5 rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-white/60 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus className="w-2.5 h-2.5" />
                        </button>
                        <span className="mx-3 text-white text-xs font-medium w-4 text-center">
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

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-white/40 hover:text-[#e11d48] p-1.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <FaTrash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Subtotal & Footer Actions */}
          {cart.length > 0 && (
            <div className="border-t border-white/10 bg-black/20 px-6 py-6 space-y-4">
              <p className="text-white/50 text-xs font-jost text-center">
                Ready to review and set up your order.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Link
                  href="/spicenbliss/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="flex items-center justify-center rounded-full border border-white/20 hover:border-white/50 text-white font-jost text-xs uppercase tracking-wider py-3 transition-colors hover:text-[#FFD84D] hover:border-[#FFD84D]"
                >
                  View Cart
                </Link>
                <Link
                  href="/spicenbliss/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="flex items-center justify-center rounded-full bg-[#FFD84D] hover:bg-[#ffe073] text-[#102B2A] font-bold font-jost text-xs uppercase tracking-wider py-3 transition-all"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SpiceFooter() {
  const { addSubscriber } = useCart();
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");
    setPreviewUrl(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        addSubscriber(email);
        if (data.previewUrl) {
          setPreviewUrl(data.previewUrl);
        }
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#031112] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Brand Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border border-[#FF6B35]/30 bg-white/5 p-1 flex items-center justify-center">
                <Image
                  src="/assets/images/spice_n_bliss_logo.png"
                  alt="Spice n Bliss Logo"
                  width={45}
                  height={45}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-plus-jakarta-sans text-lg font-bold tracking-tight">Spice n Bliss</span>
                <span className="block text-[8px] uppercase tracking-[0.25em] text-[#FF6B35]/80">Curated Accessories</span>
              </div>
            </div>
            <p className="text-[#B4C4C4]/70 font-jost text-sm leading-relaxed max-w-xs">
              A curated boutique of fine bracelets, statement earrings, and premium accessories designed to elevate your everyday bliss.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-plus-jakarta-sans font-semibold text-[#FF6B35] text-xs uppercase tracking-widest">Shop & Explore</h4>
            <ul className="space-y-2.5 font-jost text-sm text-[#B4C4C4]/70">
              <li>
                <Link href="/spicenbliss" className="hover:text-white transition-colors">Home Landing</Link>
              </li>
              <li>
                <Link href="/spicenbliss/shop" className="hover:text-white transition-colors">Catalog / All Products</Link>
              </li>
              <li>
                <Link href="/spicenbliss/about" className="hover:text-white transition-colors">Our Philosophy</Link>
              </li>
              <li>
                <Link href="/spicenbliss/contact" className="hover:text-white transition-colors">Customer Support</Link>
              </li>
            </ul>
          </div>

          {/* Craftsmanship details */}
          <div className="space-y-4">
            <h4 className="font-plus-jakarta-sans font-semibold text-[#FF6B35] text-xs uppercase tracking-widest">Our Guarantees</h4>
            <ul className="space-y-2.5 font-jost text-sm text-[#B4C4C4]/70">
              <li>100% Handcrafted Pieces</li>
              <li>Ethically Sourced Materials</li>
              <li>Luxurious Sustainable Packaging</li>
              <li>Free Global Courier Delivery</li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h4 className="font-plus-jakarta-sans font-semibold text-[#FF6B35] text-xs uppercase tracking-widest">Stay Connected</h4>
            <p className="text-[#B4C4C4]/70 font-jost text-sm leading-relaxed">
              Subscribe to unlock early-access to new capsule drops and collections.
            </p>
            
            {status === "success" ? (
              <div className="rounded-2xl border border-[#FF6B35]/30 bg-white/5 p-5 space-y-3 shadow-xl animate-fadeIn text-left backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#FF6B35]">
                  <svg className="w-5 h-5 animate-bounce flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-plus-jakarta-sans text-xs font-bold tracking-tight text-white">Joined Successfully!</span>
                </div>
                <p className="text-[#B4C4C4]/80 font-jost text-xs leading-relaxed">
                  Thank you for joining our circle of bliss. A confirmation welcome email has been sent.
                </p>
                {previewUrl && (
                  <div className="pt-2 border-t border-white/5">
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-jost text-[10px] uppercase tracking-wider text-[#FF6B35] hover:text-[#ff7b4b] transition-all font-semibold"
                    >
                      <span>Preview Email</span>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    required
                    disabled={status === "loading"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-l-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/40 focus:border-[#FF6B35] focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="rounded-r-full bg-[#FF6B35] hover:bg-[#ff7b4b] px-4 font-jost text-xs uppercase tracking-wider font-semibold text-white transition-all flex items-center justify-center min-w-[70px] disabled:bg-neutral-600 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      "Join"
                    )}
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-[#FF6B35] font-jost text-xs mt-1 text-left animate-fadeIn">
                    {errorMessage}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="border-t border-white/10 pt-8 text-center flex flex-col md:flex-row md:justify-between items-center gap-4 text-xs font-jost text-[#B4C4C4]/40">
          <p>&copy; {new Date().getFullYear()} Spice n Bliss (Delhi Darbar Group). All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function SpiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0D2221] flex flex-col">
        {/* CSS custom animations */}
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.25s ease-out forwards;
          }
          .animate-slideInRight {
            animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>

        <SpiceHeader />
        <main className="flex-1">
          {children}
        </main>
        <CartDrawer />
        <SpiceFooter />
      </div>
    </CartProvider>
  );
}
