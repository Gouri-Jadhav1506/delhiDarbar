"use client";

import React, { useState, useEffect, useRef } from "react";
import ImageCropModal from "./ImageCropModal";
import Link from "next/link";
import Image from "next/image";
import { useCart, Product, Order, Subscriber } from "../context/CartContext";
import {
  FaLock,
  FaPlus,
  FaTrash,
  FaEdit,
  FaSignOutAlt,
  FaChartLine,
  FaBoxOpen,
  FaClipboardList,
  FaEnvelopeOpenText,
  FaSearch,
  FaStar,
  FaTimes,
  FaCheck,
  FaUser,
  FaFileExport
} from "react-icons/fa";

export default function AdminPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    subscribers
  } = useCart();

  // Authentication state
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "subscribers">("overview");

  // Products CRUD State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productForm, setProductForm] = useState<Omit<Product, "id">>({
    name: "",
    price: 100, // kept as standard placeholder backend value
    category: "Bracelets",
    image: "/assets/images/spicenbliss/bracelet_1.jpg",
    rating: 4.5,
    reviews: 1,
    desc: "",
    materials: "",
    details: [""]
  });
  const [detailInput, setDetailInput] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [uploadImageSrc, setUploadImageSrc] = useState<string | null>(null);
  const [uploadFileType, setUploadFileType] = useState<string>("image/jpeg");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadFileType(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setUploadImageSrc(reader.result);
        setCropModalOpen(true);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCropComplete = (croppedBase64: string) => {
    setProductForm((prev) => ({ ...prev, image: croppedBase64 }));
  };

  // Orders State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderStatusFilter, setOrderStatusFilter] = useState<"All" | "Pending" | "Shipped" | "Delivered">("All");

  // Search States
  const [productSearch, setProductSearch] = useState("");
  const [subscriberSearch, setSubscriberSearch] = useState("");

  // Check login state on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("spicenbliss_admin_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "skylineadmin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("spicenbliss_admin_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid passcode. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("spicenbliss_admin_auth");
    setPasscode("");
  };

  // Product CRUD Action Handlers
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      price: 100,
      category: "Bracelets",
      image: "/assets/images/spicenbliss/bracelet_1.jpg",
      rating: 4.8,
      reviews: 12,
      desc: "",
      materials: "",
      details: ["Individual artisan threading Details", "Includes luxury linen Pouch"]
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price || 100,
      category: product.category,
      image: product.image,
      rating: product.rating,
      reviews: product.reviews,
      desc: product.desc,
      materials: product.materials,
      details: [...product.details]
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.desc) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editingProduct) {
      // Update
      updateProduct({
        ...productForm,
        id: editingProduct.id
      });
    } else {
      // Create
      const newId = (products.length > 0 ? Math.max(...products.map(p => parseInt(p.id) || 0)) + 1 : 1).toString();
      addProduct({
        ...productForm,
        id: newId
      });
    }
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to remove this piece from the vault collections?")) {
      deleteProduct(id);
    }
  };

  // Details bullet point management
  const addDetailBullet = () => {
    if (detailInput.trim()) {
      setProductForm(prev => ({
        ...prev,
        details: [...prev.details, detailInput.trim()]
      }));
      setDetailInput("");
    }
  };

  const removeDetailBullet = (index: number) => {
    setProductForm(prev => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index)
    }));
  };

  // Filters for lists
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(o => {
    const matchesStatus = orderStatusFilter === "All" || o.status === orderStatusFilter;
    return matchesStatus;
  });

  const filteredSubscribers = subscribers.filter(s =>
    s.email.toLowerCase().includes(subscriberSearch.toLowerCase())
  );

  // Compute metrics
  const avgRating = products.length > 0
    ? (products.reduce((acc, curr) => acc + curr.rating, 0) / products.length).toFixed(1)
    : "0.0";
  const pendingOrdersCount = orders.filter(o => o.status === "Pending").length;

  // Render Lock Screen if Unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-20 relative overflow-hidden bg-gradient-to-b from-[#0D2221] via-[#102B2A] to-[#0D2221]">
        {/* ambient background glows */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#FFD84D]/5 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#FFD84D]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-md w-full rounded-3xl border border-white/10 bg-gradient-to-b from-[#1B3030]/30 to-[#0D2221]/50 p-8 text-center space-y-8 backdrop-blur-md shadow-2xl relative">
          <div className="w-16 h-16 rounded-2xl bg-[#FFD84D]/10 border border-[#FFD84D]/20 flex items-center justify-center mx-auto text-[#FFD84D]">
            <FaLock className="w-6 h-6 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h1 className="font-plus-jakarta-sans text-2xl font-bold text-white tracking-tight">Admin Vault Authorization</h1>
            <p className="font-jost text-white/50 text-xs uppercase tracking-widest">
              Passcode Required to Access Showroom Database
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-2">
              <label className="font-jost text-xs text-white/60">Passcode</label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#FFD84D] focus:outline-none transition-colors"
              />
            </div>

            {authError && (
              <p className="text-red-400 text-xs font-jost text-center">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-[#FFD84D] hover:bg-[#ffe073] text-[#102B2A] py-3.5 font-bold font-jost text-xs uppercase tracking-wider transition-all duration-300"
            >
              Verify Security Key
            </button>
          </form>

          <p className="font-jost text-[10px] text-white/30 pt-2 border-t border-white/5">
            Default Key: <span className="font-mono text-[#FFD84D]">skylineadmin</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 space-y-8 min-h-[90vh]">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="text-left space-y-1">
          <span className="font-jost text-[10px] uppercase tracking-[0.3em] text-[#FFD84D] font-semibold">
            Skyline Theme Console
          </span>
          <h1 className="font-plus-jakarta-sans text-3xl font-bold text-white tracking-tight">
            Spice n Bliss Database Manager
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 self-start sm:self-center rounded-full border border-white/10 hover:border-[#FFD84D] hover:text-[#FFD84D] px-5 py-2.5 text-xs font-semibold font-jost uppercase tracking-wider text-white transition-colors duration-300"
        >
          <FaSignOutAlt className="w-3.5 h-3.5" /> Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Admin Navigation Tabs / Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-2 rounded-3xl border border-white/10 bg-gradient-to-b from-[#1B3030]/20 to-transparent p-4 font-jost text-xs uppercase tracking-widest text-left">
          <span className="hidden lg:block px-4 py-2 text-[10px] text-white/30 uppercase tracking-[0.2em] font-semibold border-b border-white/5 mb-2">
            Database Models
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-2 w-full">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-3 py-3 px-4 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === "overview"
                  ? "text-[#102B2A] bg-[#FFD84D]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <FaChartLine className="w-4 h-4" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center justify-between py-3 px-4 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === "products"
                  ? "text-[#102B2A] bg-[#FFD84D]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span className="flex items-center gap-3">
                <FaBoxOpen className="w-4 h-4" />
                <span>Showcase Items</span>
              </span>
              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                activeTab === "products" ? "bg-[#102B2A]/10 text-[#102B2A]" : "bg-white/5 text-white/40"
              }`}>
                {products.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center justify-between py-3 px-4 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === "orders"
                  ? "text-[#102B2A] bg-[#FFD84D]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span className="flex items-center gap-3">
                <FaClipboardList className="w-4 h-4" />
                <span>Orders</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                  activeTab === "orders" ? "bg-[#102B2A]/10 text-[#102B2A]" : "bg-white/5 text-white/40"
                }`}>
                  {orders.length}
                </span>
                {pendingOrdersCount > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                    activeTab === "orders" ? "bg-red-500 text-white animate-pulse" : "bg-[#FFD84D] text-[#102B2A]"
                  }`}>
                    {pendingOrdersCount}
                  </span>
                )}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("subscribers")}
              className={`flex items-center justify-between py-3 px-4 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === "subscribers"
                  ? "text-[#102B2A] bg-[#FFD84D]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span className="flex items-center gap-3">
                <FaEnvelopeOpenText className="w-4 h-4" />
                <span>Subscribers</span>
              </span>
              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                activeTab === "subscribers" ? "bg-[#102B2A]/10 text-[#102B2A]" : "bg-white/5 text-white/40"
              }`}>
                {subscribers.length}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content Panel */}
        <div className="lg:col-span-3 w-full">
          {/* 1. OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Stats Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="rounded-3xl border border-white/5 bg-[#1B3030]/25 p-6 space-y-4 text-left">
                  <span className="font-jost text-[10px] uppercase tracking-widest text-[#FFD84D]">Showroom Items</span>
                  <div className="flex items-center justify-between">
                    <span className="font-plus-jakarta-sans text-3xl font-bold text-white">{products.length}</span>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/50">
                      <FaBoxOpen className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/5 bg-[#1B3030]/25 p-6 space-y-4 text-left">
                  <span className="font-jost text-[10px] uppercase tracking-widest text-[#FFD84D]">Pending Requests</span>
                  <div className="flex items-center justify-between">
                    <span className="font-plus-jakarta-sans text-3xl font-bold text-white">{pendingOrdersCount}</span>
                    <div className="p-2 rounded-xl bg-[#FFD84D]/10 border border-[#FFD84D]/25 text-[#FFD84D]">
                      <FaClipboardList className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/5 bg-[#1B3030]/25 p-6 space-y-4 text-left">
                  <span className="font-jost text-[10px] uppercase tracking-widest text-[#FFD84D]">Newsletter Subs</span>
                  <div className="flex items-center justify-between">
                    <span className="font-plus-jakarta-sans text-3xl font-bold text-white">{subscribers.length}</span>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/50">
                      <FaEnvelopeOpenText className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/5 bg-[#1B3030]/25 p-6 space-y-4 text-left">
                  <span className="font-jost text-[10px] uppercase tracking-widest text-[#FFD84D]">Average Rating</span>
                  <div className="flex items-center justify-between">
                    <span className="font-plus-jakarta-sans text-3xl font-bold text-white">{avgRating}</span>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/50">
                      <FaStar className="w-5 h-5 text-[#FFD84D]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* SVG Interactive Chart Block */}
                <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-b from-[#1B3030]/25 to-transparent p-6 text-left space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-plus-jakarta-sans font-semibold text-white text-base">Showcase Inquiry Trends</h3>
                    <span className="font-jost text-[10px] text-white/40 uppercase tracking-widest">Simulated 7 Days</span>
                  </div>
                  <div className="h-48 relative flex items-end">
                    {/* SVG Line Chart */}
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150">
                      <defs>
                        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FFD84D" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#FFD84D" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Grid Lines */}
                      <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      
                      {/* Area fill */}
                      <path
                        d="M0 120 Q50 60 100 100 T200 40 T300 80 T400 30 L400 150 L0 150 Z"
                        fill="url(#glow)"
                      />
                      {/* Curve Path */}
                      <path
                        d="M0 120 Q50 60 100 100 T200 40 T300 80 T400 30"
                        fill="none"
                        stroke="#FFD84D"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      {/* Data Points */}
                      <circle cx="100" cy="100" r="4.5" fill="#102B2A" stroke="#FFD84D" strokeWidth="2.5" />
                      <circle cx="200" cy="40" r="4.5" fill="#102B2A" stroke="#FFD84D" strokeWidth="2.5" />
                      <circle cx="300" cy="80" r="4.5" fill="#102B2A" stroke="#FFD84D" strokeWidth="2.5" />
                      <circle cx="400" cy="30" r="4.5" fill="#102B2A" stroke="#FFD84D" strokeWidth="2.5" />
                    </svg>
                    <div className="absolute bottom-2 left-0 right-0 flex justify-between px-2 font-jost text-[9px] uppercase tracking-wider text-white/30">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="rounded-3xl border border-white/5 bg-[#1B3030]/15 p-6 text-left space-y-6">
                  <h3 className="font-plus-jakarta-sans font-semibold text-white text-base">Quick Shortcuts</h3>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleOpenAddModal}
                      className="flex items-center justify-between w-full rounded-2xl border border-white/5 hover:border-[#FFD84D]/30 bg-white/[0.02] hover:bg-white/[0.05] p-4 text-left font-jost text-xs uppercase tracking-wider text-white transition-all group"
                    >
                      <span className="flex items-center gap-2.5">
                        <FaPlus className="text-[#FFD84D]" /> Add Showcase Piece
                      </span>
                      <span className="text-white/30 group-hover:text-[#FFD84D]">&rarr;</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="flex items-center justify-between w-full rounded-2xl border border-white/5 hover:border-[#FFD84D]/30 bg-white/[0.02] hover:bg-white/[0.05] p-4 text-left font-jost text-xs uppercase tracking-wider text-white transition-all group"
                    >
                      <span className="flex items-center gap-2.5">
                        <FaClipboardList className="text-[#FFD84D]" /> Process Orders
                      </span>
                      <span className="text-white/30 group-hover:text-[#FFD84D]">&rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. PRODUCTS TAB (CRUD) */}
          {activeTab === "products" && (
            <div className="space-y-6 animate-fadeIn text-left">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search pieces..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-4 pr-10 text-xs text-white placeholder-white/30 focus:border-[#FFD84D] focus:outline-none"
                  />
                  <FaSearch className="absolute right-3.5 top-3 w-3.5 h-3.5 text-white/30" />
                </div>

                {/* Add trigger */}
                <button
                  onClick={handleOpenAddModal}
                  className="flex items-center gap-2 self-end sm:self-center rounded-full bg-[#FFD84D] hover:bg-[#ffe073] text-[#102B2A] px-6 py-3 text-xs font-bold font-jost uppercase tracking-wider transition-all duration-300 hover:scale-[1.01]"
                >
                  <FaPlus /> Add New Piece
                </button>
              </div>

              {/* Products grid / list */}
              <div className="border border-white/10 bg-[#1B3030]/25 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full font-jost text-sm text-left">
                    <thead className="bg-white/5 border-b border-white/10 text-[#FFD84D] text-xs uppercase tracking-widest font-semibold">
                      <tr>
                        <th className="px-6 py-4">Thumbnail</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Rating</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-white/70">
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-white/30">
                            No catalog items found. Try another search.
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((p) => (
                          <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-3">
                              <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                                <Image src={p.image} alt={p.name} fill className="object-cover" sizes="48px" />
                              </div>
                            </td>
                            <td className="px-6 py-3 font-semibold text-white">
                              <Link href={`/spicenbliss/product/${p.id}`} className="hover:text-[#FFD84D] transition-colors">
                                {p.name}
                              </Link>
                            </td>
                            <td className="px-6 py-3 text-xs tracking-wider uppercase text-white/50">{p.category}</td>
                            <td className="px-6 py-3">
                              <div className="flex items-center gap-1.5">
                                <FaStar className="w-3.5 h-3.5 text-[#FFD84D]" />
                                <span>{p.rating}</span>
                                <span className="text-white/30 text-xs">({p.reviews})</span>
                              </div>
                            </td>
                            <td className="px-6 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleOpenEditModal(p)}
                                  className="p-2 rounded-lg bg-white/5 hover:bg-[#FFD84D]/10 hover:text-[#FFD84D] transition-colors"
                                  title="Edit piece details"
                                >
                                  <FaEdit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(p.id)}
                                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                  title="Delete piece from catalog"
                                >
                                  <FaTrash className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="space-y-6 animate-fadeIn text-left">
              {/* Status Filters */}
              <div className="flex flex-wrap gap-2 border-b border-white/5 pb-3 font-jost text-xs uppercase tracking-wider">
                {["All", "Pending", "Shipped", "Delivered"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setOrderStatusFilter(status as any)}
                    className={`px-4 py-1.5 rounded-full border transition-all ${
                      orderStatusFilter === status
                        ? "bg-[#FFD84D] border-[#FFD84D] text-[#102B2A] font-semibold"
                        : "border-white/10 text-white/50 hover:text-white"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Orders Log Table */}
              <div className="border border-white/10 bg-[#1B3030]/25 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full font-jost text-sm text-left">
                    <thead className="bg-white/5 border-b border-white/10 text-[#FFD84D] text-xs uppercase tracking-widest font-semibold">
                      <tr>
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Items Count</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-white/70">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-white/30">
                            No orders recorded. Try checking out an item in the shop!
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((o) => {
                          const itemCount = o.items.reduce((acc, curr) => acc + curr.quantity, 0);
                          return (
                            <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-6 py-3 font-mono font-semibold text-white">{o.id}</td>
                              <td className="px-6 py-3">
                                <span className="block text-white font-medium">{o.customerName}</span>
                                <span className="block text-white/40 text-xs">{o.email}</span>
                              </td>
                              <td className="px-6 py-3">{itemCount} items</td>
                              <td className="px-6 py-3 text-white/50 text-xs">{o.date}</td>
                              <td className="px-6 py-3">
                                <span
                                  className={`rounded-full px-3 py-1 text-[9px] uppercase tracking-wider font-bold ${
                                    o.status === "Pending"
                                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                      : o.status === "Shipped"
                                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  }`}
                                >
                                  {o.status}
                                </span>
                              </td>
                              <td className="px-6 py-3 text-right">
                                <div className="flex justify-end gap-2">
                                  {/* Status Select dropdown */}
                                  <select
                                    value={o.status}
                                    onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                                    className="rounded-xl border border-white/10 bg-[#1B3030] text-xs font-medium text-white py-1 px-2.5 focus:outline-none focus:border-[#FFD84D] cursor-pointer"
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                  </select>
                                  <button
                                    onClick={() => setSelectedOrder(o)}
                                    className="px-3.5 py-1 rounded-xl bg-white/5 border border-white/10 hover:border-[#FFD84D] text-xs hover:text-[#FFD84D] transition-colors"
                                  >
                                    View Details
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 4. SUBSCRIBERS TAB */}
          {activeTab === "subscribers" && (
            <div className="space-y-6 animate-fadeIn text-left">
              {/* Search bar & export block */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:max-w-xs">
                  <input
                    type="text"
                    value={subscriberSearch}
                    onChange={(e) => setSubscriberSearch(e.target.value)}
                    placeholder="Search email..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-4 pr-10 text-xs text-white placeholder-white/30 focus:border-[#FFD84D] focus:outline-none"
                  />
                  <FaSearch className="absolute right-3.5 top-3 w-3.5 h-3.5 text-white/30" />
                </div>

                <button
                  onClick={() => alert("Subscribers list exported as CSV! (Mock Action)")}
                  className="flex items-center gap-2 rounded-full border border-[#FFD84D]/30 hover:border-[#FFD84D] text-white hover:text-[#FFD84D] px-6 py-2.5 text-xs font-semibold font-jost uppercase tracking-wider transition-colors"
                >
                  <FaFileExport /> Export List
                </button>
              </div>

              {/* Subscribers Table */}
              <div className="border border-white/10 bg-[#1B3030]/25 rounded-3xl overflow-hidden">
                <table className="w-full font-jost text-sm text-left">
                  <thead className="bg-white/5 border-b border-white/10 text-[#FFD84D] text-xs uppercase tracking-widest font-semibold">
                    <tr>
                      <th className="px-6 py-4">Index</th>
                      <th className="px-6 py-4">Email Address</th>
                      <th className="px-6 py-4">Date Subscribed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/70">
                    {filteredSubscribers.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-white/30">
                          No matching subscribers logs found.
                        </td>
                      </tr>
                    ) : (
                      filteredSubscribers.map((s, idx) => (
                        <tr key={s.email} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-3 font-mono text-white/30">{idx + 1}</td>
                          <td className="px-6 py-3 font-medium text-white">{s.email}</td>
                          <td className="px-6 py-3 text-white/50 text-xs">{s.date}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- MODAL DIALOGS --- */}

      {/* A. PRODUCT CRUD MODAL FORM */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsProductModalOpen(false)} />
          
          <div className="relative max-w-lg w-full bg-[#102B2A] border border-white/10 rounded-3xl p-6 shadow-2xl relative z-10 animate-scaleIn">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-4 right-4 rounded-full p-2 text-white/60 hover:bg-white/5 hover:text-white"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            <h2 className="font-plus-jakarta-sans text-xl font-bold text-white mb-6 text-left border-b border-white/5 pb-3">
              {editingProduct ? `Edit Collection: ${editingProduct.name}` : "Add New Artisan Piece"}
            </h2>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-left max-h-[70vh] overflow-y-auto pr-2">
              <div className="space-y-1">
                <label className="font-jost text-xs text-white/60">Product Name</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Skyline Gold Cuff"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#FFD84D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-jost text-xs text-white/60">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full rounded-xl border border-white/10 bg-[#1B3030] px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFD84D]"
                  >
                    <option value="Bracelets">Bracelets</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="font-jost text-xs text-white/60 block">Product Image</label>
                  <div className="flex items-center gap-3">
                    <div className="relative h-[38px] w-[38px] overflow-hidden rounded-xl border border-white/10 bg-[#1B3030]/40 flex-shrink-0">
                      {productForm.image ? (
                        <Image
                          src={productForm.image}
                          alt="Product preview"
                          fill
                          className="object-cover"
                          sizes="38px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20 text-[9px]">
                          No image
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 rounded-xl border border-white/10 hover:border-[#FFD84D]/50 hover:bg-white/5 text-white py-2.5 text-[10px] uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-1.5 h-[38px]"
                    >
                      <FaPlus className="w-2.5 h-2.5" /> Upload Image
                    </button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-jost text-xs text-white/60">Description</label>
                <textarea
                  required
                  rows={2}
                  value={productForm.desc}
                  onChange={(e) => setProductForm(prev => ({ ...prev, desc: e.target.value }))}
                  placeholder="Artisan description text details..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#FFD84D] focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-jost text-xs text-white/60">Materials Used</label>
                <input
                  type="text"
                  required
                  value={productForm.materials}
                  onChange={(e) => setProductForm(prev => ({ ...prev, materials: e.target.value }))}
                  placeholder="e.g. 925 Sterling Silver, Grade A Jade stones"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#FFD84D] focus:outline-none"
                />
              </div>

              {/* Bullet Details Manager */}
              <div className="space-y-2.5">
                <label className="font-jost text-xs text-white/60 block">Bullet Specifications</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={detailInput}
                    onChange={(e) => setDetailInput(e.target.value)}
                    placeholder="Add specification bullet..."
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white placeholder-white/20 focus:border-[#FFD84D] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addDetailBullet}
                    className="rounded-xl bg-[#FFD84D] hover:bg-[#ffe073] text-[#102B2A] font-bold font-jost text-xs px-4 transition-colors"
                  >
                    Add
                  </button>
                </div>

                <ul className="space-y-1.5 max-h-24 overflow-y-auto border border-white/5 bg-white/[0.01] rounded-xl p-2.5">
                  {productForm.details.length === 0 ? (
                    <span className="text-[10px] text-white/35 font-jost">No specification bullets added yet.</span>
                  ) : (
                    productForm.details.map((detail, idx) => (
                      <li key={idx} className="flex justify-between items-center text-xs text-white/80 font-jost">
                        <span>&bull; {detail}</span>
                        <button
                          type="button"
                          onClick={() => removeDetailBullet(idx)}
                          className="text-red-400 hover:text-red-300 p-1 text-[10px]"
                        >
                          Remove
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end gap-3 font-jost text-xs uppercase tracking-wider font-semibold">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="rounded-full border border-white/25 hover:border-white/50 text-white px-5 py-2.5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#FFD84D] hover:bg-[#ffe073] text-[#102B2A] px-6 py-2.5 transition-colors"
                >
                  Save Piece
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* B. ORDER DETAIL VIEWER DIALOG */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          
          <div className="relative max-w-lg w-full bg-[#102B2A] border border-white/10 rounded-3xl p-6 shadow-2xl relative z-10 animate-scaleIn text-left space-y-6">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 rounded-full p-2 text-white/60 hover:bg-white/5 hover:text-white"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            {/* Header info */}
            <div className="pb-4 border-b border-white/5 space-y-2">
              <span className="rounded-full bg-[#FFD84D]/10 border border-[#FFD84D]/20 px-3 py-0.5 text-[9px] uppercase tracking-wider font-bold text-[#FFD84D]">
                Order {selectedOrder.status}
              </span>
              <h2 className="font-plus-jakarta-sans text-xl font-bold text-white">Order Inquiry {selectedOrder.id}</h2>
              <span className="block text-white/40 font-jost text-xs">{selectedOrder.date}</span>
            </div>

            {/* Customer Shipping details */}
            <div className="space-y-3 font-jost text-sm text-white/80">
              <h3 className="font-plus-jakarta-sans font-semibold text-[#FFD84D] text-xs uppercase tracking-widest">
                Customer Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-white/40 text-[10px] uppercase">Name</span>
                  <span className="font-semibold">{selectedOrder.customerName}</span>
                </div>
                <div>
                  <span className="block text-white/40 text-[10px] uppercase">Email</span>
                  <span className="font-mono text-xs">{selectedOrder.email}</span>
                </div>
              </div>
              <div className="pt-2">
                <span className="block text-white/40 text-[10px] uppercase">Destination Address</span>
                <p className="leading-relaxed">
                  {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.zip}, {selectedOrder.country}
                </p>
              </div>
            </div>

            {/* Cart Items list */}
            <div className="space-y-3">
              <h3 className="font-plus-jakarta-sans font-semibold text-[#FFD84D] text-xs uppercase tracking-widest">
                Requested items
              </h3>
              <div className="divide-y divide-white/5 max-h-40 overflow-y-auto border border-white/5 bg-white/[0.01] rounded-2xl p-3 space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 py-2 first:pt-0 last:pb-0 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div className="text-left">
                        <p className="text-white text-xs font-semibold font-plus-jakarta-sans line-clamp-1">{item.product.name}</p>
                        <p className="text-white/40 text-[10px]">{item.product.category}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#FFD84D] font-bold">Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer buttons */}
            <div className="pt-4 border-t border-white/5 flex justify-end gap-3 font-jost text-xs uppercase tracking-wider font-semibold">
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2.5 transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      <ImageCropModal
        isOpen={cropModalOpen}
        imageSrc={uploadImageSrc}
        fileType={uploadFileType}
        onClose={() => setCropModalOpen(false)}
        onCrop={handleCropComplete}
      />
    </div>
  );
}
