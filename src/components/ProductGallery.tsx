import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Headphones } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export const ProductGallery: React.FC = () => {
  const images = STORE_CONFIG.productImages;
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const current = images[activeIndex] ?? images[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Primary Frame */}
      <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden rounded-2xl border border-zinc-200 bg-[#F7F7F8]">
        {!imageError[current.id] ? (
          <img
            src={current.src}
            alt={current.alt}
            referrerPolicy="no-referrer"
            onError={() => setImageError((prev) => ({ ...prev, [current.id]: true }))}
            className={`h-full w-full object-cover transition-transform duration-300 ${current.focalClass}`}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-100 to-zinc-200 p-6 text-center">
            <Headphones className="h-12 w-12 text-zinc-400" aria-hidden="true" />
            <span className="font-display text-lg font-bold text-zinc-700">
              {STORE_CONFIG.product.name}
            </span>
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Photo précédente"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-900 shadow-sm transition-colors hover:bg-white cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Photo suivante"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-900 shadow-sm transition-colors hover:bg-white cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Caption & Thumbnails */}
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>{current.caption}</span>
        <span className="tabular-nums">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((item, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`group overflow-hidden rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#FF4D00] ring-2 ring-[#FF4D00]/20'
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#F7F7F8]">
                  <img
                    src={item.src}
                    alt={item.label}
                    referrerPolicy="no-referrer"
                    className={`h-full w-full object-cover ${item.focalClass}`}
                  />
                </div>
                <div className="bg-white px-2.5 py-2 text-xs font-medium text-zinc-800 truncate">
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
