"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SearchProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (id: string) => void;
}

const PRODUCTS: SearchProduct[] = [
  {
    id: "trail-mix",
    name: "Seeds & Dried Fruits Trail Mix",
    category: "Nutritious Blend for Energy & Wellness",
    price: "₹199.00",
    image: "/images/trail_mix.jpg",
  },
  {
    id: "salted-granola",
    name: "Salted Granola",
    category: "Nutritious Blend for Health & Wellness",
    price: "₹179.00",
    image: "/images/salted_granola.jpg",
  },
  {
    id: "chocolate-powder",
    name: "Daily Nutrition Powder - Chocolate",
    category: "Nutritious Blend for Energy & Health",
    price: "₹199.00",
    image: "/images/chocolate_powder.jpg",
  },
  {
    id: "vanilla-powder",
    name: "Daily Nutrition Powder - Vanilla",
    category: "Complete Nutrition for Everyday Health",
    price: "₹199.00",
    image: "/images/vanilla_powder.jpg",
  },
  {
    id: "calcium-laddoo",
    name: "Calcium Rich Laddoo",
    category: "Natural Source for Stronger Bones & Health",
    price: "₹179.00",
    image: "/images/calcium_laddoo.jpg",
  },
];

const SUGGESTIONS = ["Trail Mix", "Granola", "Daily Nutrition", "Laddoo", "Calcium", "Organic Blend"];

export default function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleProductClick = (id: string) => {
    onSelectProduct(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-body select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-primary/70 backdrop-blur-2xl transition-opacity animate-in fade-in duration-300"
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 md:p-20">
        <div className="w-full max-w-2xl bg-white/95 rounded-3xl p-6 shadow-2xl relative z-10 animate-in zoom-in-95 duration-250 border border-white/20">
          
          {/* Search Header */}
          <div className="relative flex items-center mb-6">
            <span className="material-symbols-outlined absolute left-4 text-outline text-xl">search</span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search premium formulations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-primary/5 border border-primary/10 rounded-2xl pl-12 pr-12 py-4 text-primary text-sm font-semibold placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 p-1 text-on-surface-variant hover:text-primary rounded-full hover:bg-primary/5 transition-all"
              >
                <span className="material-symbols-outlined text-sm font-bold">close</span>
              </button>
            )}
          </div>

          {/* Quick Suggestions (if query empty) */}
          {!query && (
            <div className="mb-8 space-y-3">
              <h4 className="text-[10px] font-mono font-bold text-outline tracking-wider uppercase">
                Trending Searches
              </h4>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setQuery(sug)}
                    className="bg-primary/5 text-primary text-xs font-semibold px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results section */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-bold text-outline tracking-wider uppercase">
              {query ? `Search Results (${filteredProducts.length})` : "Formulations"}
            </h4>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant/60">
                <span className="material-symbols-outlined text-4xl block mb-2 opacity-50">science</span>
                <p className="text-sm font-medium">No organic blends matched your query.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-primary/5 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="relative w-12 h-12 bg-surface rounded-xl overflow-hidden border border-primary/5">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-display font-extrabold text-sm text-primary group-hover:text-secondary transition-colors leading-tight">
                        {product.name}
                      </h5>
                      <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">
                        {product.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-xs text-primary">{product.price}</span>
                      <span className="material-symbols-outlined text-sm text-outline opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Footer */}
          <div className="mt-8 pt-4 border-t border-primary/5 flex items-center justify-between text-[10px] font-mono text-outline tracking-widest">
            <span>PRESS ESC TO CLOSE</span>
            <span>NUTRILLO LABS</span>
          </div>

        </div>
      </div>
    </div>
  );
}
