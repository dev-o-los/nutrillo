"use client";

import { useRef } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  badge: string;
  servings: string;
  stats: { label: string; value: string }[];
}

interface ProductSliderProps {
  onSelectProduct: (id: string) => void;
  onAddToCart: (item: { id: string; name: string; price: number; image: string; servings: string }) => void;
}

const PRODUCTS: Product[] = [
  {
    id: "trail-mix",
    name: "Seeds & Dried Fruits Trail Mix",
    category: "Nutritious Blend for Energy & Wellness",
    price: 199.00,
    image: "/images/trail_mix.jpg",
    badge: "Premium Quality",
    servings: "250g | Trail Mix",
    stats: [
      { label: "Energy", value: "High" },
      { label: "Wellness", value: "Daily" },
      { label: "Premium", value: "Quality" },
    ],
  },
  {
    id: "salted-granola",
    name: "Salted Granola",
    category: "Nutritious Blend for Health & Wellness",
    price: 179.00,
    image: "/images/salted_granola.jpg",
    badge: "Premium Quality",
    servings: "250g | Granola",
    stats: [
      { label: "Fiber", value: "Rich" },
      { label: "Energy", value: "Wellness" },
      { label: "Sugar", value: "Low" },
    ],
  },
  {
    id: "chocolate-powder",
    name: "Daily Nutrition Powder - Chocolate",
    category: "Nutritious Blend for Energy & Health",
    price: 199.00,
    image: "/images/chocolate_powder.jpg",
    badge: "Chocolate Flavor",
    servings: "250g | Powder",
    stats: [
      { label: "Proteins", value: "Active" },
      { label: "Daily", value: "Health" },
      { label: "Flavour", value: "Chocolate" },
    ],
  },
  {
    id: "vanilla-powder",
    name: "Daily Nutrition Powder - Vanilla",
    category: "Complete Nutrition for Everyday Health",
    price: 199.00,
    image: "/images/vanilla_powder.jpg",
    badge: "Premium Quality",
    servings: "250g | Powder",
    stats: [
      { label: "Nutrition", value: "Complete" },
      { label: "Energy", value: "Active" },
      { label: "Synergy", value: "Pure" },
    ],
  },
  {
    id: "calcium-laddoo",
    name: "Calcium Rich Laddoo",
    category: "Natural Source for Stronger Bones & Health",
    price: 179.00,
    image: "/images/calcium_laddoo.jpg",
    badge: "Premium Quality",
    servings: "250g | Laddoo",
    stats: [
      { label: "Calcium", value: "Strong" },
      { label: "Bones", value: "Health" },
      { label: "Natural", value: "Source" },
    ],
  },
];

export default function ProductSlider({ onSelectProduct, onAddToCart }: ProductSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 450;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="products" className="py-24 bg-surface-container-lowest overflow-hidden select-none">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="font-mono text-secondary font-bold text-xs tracking-widest uppercase mb-3 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">nutrition</span>
              Elite Formulations
            </h4>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
              Our Products
            </h2>
          </div>
          
          {/* Nav arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-outline/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md"
              aria-label="Previous formulations"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-outline/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md"
              aria-label="Next formulations"
            >
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Snap Slider */}
      <div
        ref={sliderRef}
        className="flex gap-8 overflow-x-auto px-6 md:px-[calc(50vw-640px)] pb-12 scrollbar-hide snap-x snap-mandatory scroll-smooth"
      >
        {PRODUCTS.map((product) => (
          <div key={product.id} className="min-w-[300px] sm:min-w-[340px] md:min-w-[400px] snap-center">
            
            {/* Product Card Container */}
            <div className="glass-panel p-6 md:p-8 rounded-3xl product-card-hover group border border-primary/5 bg-white/50 backdrop-blur-md relative flex flex-col justify-between h-full">
              
              {/* Product Media */}
              <div>
                <div
                  onClick={() => onSelectProduct(product.id.replace("-2", ""))}
                  className="relative w-full aspect-[4/5] mb-6 rounded-2xl overflow-hidden cursor-pointer bg-surface border border-primary/5 group-hover:shadow-lg transition-shadow duration-300"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="glass-emerald text-white px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase">
                      {product.badge}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        onClick={() => onSelectProduct(product.id.replace("-2", ""))}
                        className="font-display text-2xl font-extrabold text-primary group-hover:text-secondary transition-colors cursor-pointer leading-tight"
                      >
                        {product.name}
                      </h3>
                      <p className="text-on-surface-variant text-xs font-semibold mt-1">
                        {product.category}
                      </p>
                    </div>
                    <span className="font-display text-xl font-extrabold text-primary font-mono pl-2 whitespace-nowrap">
                      ₹{product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Chemical Dosage Stats panel */}
                  <div className="flex gap-4 border-t border-primary/5 pt-4">
                    {product.stats.map((stat) => (
                      <div key={stat.label} className="text-center flex-1">
                        <p className="font-mono text-secondary font-extrabold text-lg">
                          {stat.value}
                        </p>
                        <p className="text-[9px] uppercase font-bold text-on-surface-variant/80 tracking-wider">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <div className="mt-8">
                <button
                  onClick={() =>
                    onAddToCart({
                      id: product.id.replace("-2", ""),
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      servings: product.servings,
                    })
                  }
                  className="w-full bg-primary text-white py-4 rounded-full font-bold hover:bg-secondary transition-colors duration-250 flex items-center justify-center gap-2 group shadow-sm hover:shadow-md cursor-pointer text-sm"
                >
                  Add to Bag
                  <span className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform duration-300">
                    shopping_cart
                  </span>
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
