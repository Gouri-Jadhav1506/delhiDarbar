"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaSearchPlus, FaCropAlt } from "react-icons/fa";

interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  fileType: string;
  onClose: () => void;
  onCrop: (croppedBase64: string) => void;
}

export default function ImageCropModal({
  isOpen,
  imageSrc,
  fileType,
  onClose,
  onCrop,
}: ImageCropModalProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  const imageRef = useRef<HTMLImageElement | null>(null);

  // Reset states when a new image is loaded
  useEffect(() => {
    if (imageSrc) {
      setScale(1);
      setOffset({ x: 0, y: 0 });
    }
  }, [imageSrc]);

  if (!isOpen || !imageSrc) return null;

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const aspect = img.naturalWidth / img.naturalHeight;
    let w = 300;
    let h = 300;

    // Adjust size to cover the 300x300 container
    if (aspect > 1) {
      w = 300 * aspect;
    } else {
      h = 300 / aspect;
    }
    setDimensions({ width: w, height: h });
  };

  // Dragging handlers
  const handleStartDrag = (clientX: number, clientY: number) => {
    setDragging(true);
    setDragStart({ x: clientX - offset.x, y: clientY - offset.y });
  };

  const handleMoveDrag = (clientX: number, clientY: number) => {
    if (!dragging) return;
    setOffset({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const handleEndDrag = () => {
    setDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStartDrag(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMoveDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleStartDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleMoveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleCrop = () => {
    if (!imageRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Scaled dimensions based on 300px viewport mapping to 500px output
    const multiplier = 500 / 300;
    const w = dimensions.width;
    const h = dimensions.height;

    // Calculate drawing position of image on the canvas
    const drawX = (150 + offset.x - (w * scale) / 2) * multiplier;
    const drawY = (150 + offset.y - (h * scale) / 2) * multiplier;
    const drawW = w * scale * multiplier;
    const drawH = h * scale * multiplier;

    // Draw image onto canvas
    ctx.drawImage(imageRef.current, drawX, drawY, drawW, drawH);

    // Export using the appropriate mime type
    const mimeType = fileType || "image/jpeg";
    const quality = mimeType === "image/png" ? undefined : 0.85;
    const croppedDataUrl = canvas.toDataURL(mimeType, quality);

    onCrop(croppedDataUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative max-w-md w-full bg-[#102B2A] border border-white/10 rounded-3xl p-6 shadow-2xl z-10 animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-white/60 hover:bg-white/5 hover:text-white transition-colors"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        <h2 className="font-plus-jakarta-sans text-lg font-bold text-white mb-2 text-left border-b border-white/5 pb-3">
          Crop Product Image
        </h2>

        <p className="font-jost text-xs text-white/50 text-left mb-6 leading-relaxed">
          Drag the image to adjust position and use the slider below to zoom. The dashed frame shows the exact square boundary that will showcase the product.
        </p>

        {/* Cropping Viewport */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleEndDrag}
          onMouseLeave={handleEndDrag}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleEndDrag}
          className="w-[300px] h-[300px] overflow-hidden relative rounded-2xl border border-white/15 bg-black/40 mx-auto select-none cursor-move flex items-center justify-center"
        >
          <img
            ref={imageRef}
            src={imageSrc}
            alt="Crop source"
            onLoad={handleImageLoad}
            className="absolute max-w-none pointer-events-none"
            style={{
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            }}
          />

          {/* Guide Overlay Frame */}
          <div className="absolute inset-0 border-2 border-dashed border-[#FFD84D]/50 rounded-2xl pointer-events-none shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]" />
        </div>

        {/* Zoom Control Slider */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between items-center text-xs text-white/60 font-jost">
            <span className="flex items-center gap-1.5">
              <FaSearchPlus className="w-3.5 h-3.5 text-[#FFD84D]" /> Zoom Level
            </span>
            <span className="font-mono text-[10px] bg-white/5 px-2 py-0.5 rounded-md">
              {Math.round(scale * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FFD84D]"
          />
        </div>

        {/* Actions Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 flex justify-end gap-3 font-jost text-xs uppercase tracking-wider font-semibold">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/20 hover:border-white/40 text-white px-5 py-2.5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCrop}
            className="rounded-full bg-[#FFD84D] hover:bg-[#ffe073] text-[#102B2A] px-6 py-2.5 transition-colors flex items-center gap-1.5"
          >
            <FaCropAlt className="w-3.5 h-3.5" /> Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
}
