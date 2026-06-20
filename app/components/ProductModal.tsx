"use client";

import { useEffect } from "react";
import Image from "next/image";

interface Ingredient {
  name: string;
  dosage: string;
  desc: string;
}

interface ProductDetails {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  servings: string;
  description: string;
  ingredients: Ingredient[];
  benefits: string[];
  usage: string;
  certifications: string[];
}

interface ProductModalProps {
  productId: string | null;
  onClose: () => void;
  onAddToCart: (item: { id: string; name: string; price: number; image: string; servings: string }) => void;
}

const PRODUCT_DATA: Record<string, ProductDetails> = {
  "trail-mix": {
    id: "trail-mix",
    name: "Seeds & Dried Fruits Trail Mix",
    category: "Nutritious Blend for Energy & Wellness",
    price: 199.00,
    image: "/images/trail_mix.jpg",
    servings: "250g | Trail Mix",
    description: "A premium energy-boosting blend of carefully selected raw seeds, roasted nuts, and dried whole fruits. Perfectly balanced to deliver steady physical energy, antioxidant wellness, and daily satiety without artificial additives.",
    ingredients: [
      { name: "Roasted Almonds", dosage: "50g", desc: "Source of healthy monounsaturated fats and Vitamin E" },
      { name: "Roasted Cashew Nuts", dosage: "50g", desc: "Creamy nuts rich in magnesium and essential minerals" },
      { name: "Pumpkin Seeds (Pepitas)", dosage: "50g", desc: "Zinc-rich seeds supporting immune and metabolic health" },
      { name: "Sunflower Seeds", dosage: "50g", desc: "Antioxidant-dense seeds supplying trace selenium" },
      { name: "Dehydrated Cranberries & Raisins", dosage: "50g", desc: "Naturally sweet whole fruits providing quick energy" },
    ],
    benefits: [
      "Provides sustained daily energy without sugar spikes",
      "Rich source of dietary fiber, trace minerals, and healthy fats",
      "Antioxidant-rich whole ingredients support immunity",
    ],
    usage: "Consume a handful (approx. 30g) as a mid-morning or pre-workout snack, or sprinkle over yogurt and morning cereals.",
    certifications: ["100% Natural Ingredients", "Preservative Free", "Gluten-Free & Vegan Approved"],
  },
  "salted-granola": {
    id: "salted-granola",
    name: "Salted Granola",
    category: "Nutritious Blend for Health & Wellness",
    price: 179.00,
    image: "/images/salted_granola.jpg",
    servings: "250g | Granola",
    description: "An culinary salted granola toasted to golden perfection with a touch of raw honey, rock salt, and whole grains. Ideal for long-lasting morning energy and gut-healthy fiber intake.",
    ingredients: [
      { name: "Rolled Whole Oats", dosage: "120g", desc: "Beta-glucan rich soluble fiber supporting heart health" },
      { name: "Whole Almonds & Seeds", dosage: "40g", desc: "Adds protein, vitamin E, and robust satisfying crunch" },
      { name: "Raw Honey & Coconut Oil", dosage: "40g", desc: "Natural sweeteners and fats for healthy baking" },
      { name: "Pink Himalayan Rock Salt", dosage: "2g", desc: "Unrefined mineral salt adding savory complexity" },
    ],
    benefits: [
      "High in soluble dietary fiber supporting prebiotic gut flora",
      "Slow-burning complex carbohydrates provide sustained energy",
      "Savory-sweet flavor profile with low sugar",
    ],
    usage: "Serve 40g of granola with cold milk, Greek yogurt, or almond milk. Top with fresh berries for a premium breakfast experience.",
    certifications: ["High Fiber Content", "No Refined Sugar", "Baked in Small Batches"],
  },
  "chocolate-powder": {
    id: "chocolate-powder",
    name: "Daily Nutrition Powder - Chocolate",
    category: "Nutritious Blend for Energy & Health",
    price: 199.00,
    image: "/images/chocolate_powder.jpg",
    servings: "250g | Powder",
    description: "A premium everyday wellness powder with a rich chocolate flavor. Crafted to deliver complete daily vitamins, bioavailable protein, and immune-supporting antioxidants to fuel modern, active lives.",
    ingredients: [
      { name: "Premium Cocoa Powder", dosage: "30g", desc: "Pure dark cocoa rich in polyphenols and natural flavor" },
      { name: "Multi-Source Plant Protein", dosage: "15g", desc: "Complete amino acid isolate for muscle maintenance" },
      { name: "Essential Vitamin & Mineral Mix", dosage: "2g", desc: "Contains full-spectrum B-complex, Vitamin C, and Zinc" },
      { name: "Prebiotic Fiber (Inulin)", dosage: "3g", desc: "Supports gut flora health and enhances digestibility" },
    ],
    benefits: [
      "Rich, satisfying chocolate taste from premium cocoa",
      "Boosts daily physical recovery, metabolism, and immune health",
      "No artificial colors or heavy fillers, zero bloating",
    ],
    usage: "Add 1 scoop (25g) to 8-10 oz of chilled milk or plant-based milk. Shake well or blend for 20 seconds. Drink daily.",
    certifications: ["Clinical Grade Formula", "Zero Aspartame", "Third-Party Purity Verified"],
  },
  "vanilla-powder": {
    id: "vanilla-powder",
    name: "Daily Nutrition Powder - Vanilla",
    category: "Complete Nutrition for Everyday Health",
    price: 199.00,
    image: "/images/vanilla_powder.jpg",
    servings: "250g | Powder",
    description: "Our complete daily nutrition formula with a smooth vanilla bean flavor. Blends essential plant-based nutrients, digestive enzymes, and prebiotic fibers to support baseline gut health and physical performance.",
    ingredients: [
      { name: "Natural Vanilla Bean Extract", dosage: "25g", desc: "Organic vanilla bean providing a smooth clean flavor profile" },
      { name: "Bioavailable Plant Isolate Protein", dosage: "15g", desc: "Highly digestible yellow pea and sprouted rice protein" },
      { name: "Digestive Enzyme Blend", dosage: "150mg", desc: "Contains amylase, protease, and lipase to prevent gut heavy feeling" },
      { name: "Vitamin & Mineral Complex", dosage: "2g", desc: "Supplies essential iron, magnesium, and active trace minerals" },
    ],
    benefits: [
      "Smooth, neutral vanilla profile suitable for custom shakes",
      "Full-spectrum baseline nutrition to support physical vitality",
      "Gut-friendly formulation with quick cellular absorption",
    ],
    usage: "Blend 1 scoop (25g) with water, milk, or blend with frozen bananas and oats for a filling meal replacement.",
    certifications: ["Naturally Flavored", "Soy-Free & Dairy-Free", "Made in GMP Certified Facility"],
  },
  "calcium-laddoo": {
    id: "calcium-laddoo",
    name: "Calcium Rich Laddoo",
    category: "Natural Source for Stronger Bones & Health",
    price: 179.00,
    image: "/images/calcium_laddoo.jpg",
    servings: "250g | Laddoo",
    description: "A traditional healthy bite packed with bioavailable calcium from sesame seeds, jaggery, and nuts. Formulated to support bone density, joint health, and post-activity recovery naturally.",
    ingredients: [
      { name: "Organic Sesame Seeds (Til)", dosage: "100g", desc: "Extremely rich plant source of calcium and magnesium" },
      { name: "Pure Organic Jaggery (Gur)", dosage: "80g", desc: "Iron-rich unrefined sugarcane juice binding agent" },
      { name: "Roasted Peanuts & Almonds", dosage: "50g", desc: "Provides protein, vitamin E, and delicious nutty crunch" },
      { name: "Pure Ghee (Clarified Butter)", dosage: "20g", desc: "Traditional fat source aiding in absorption of fat-soluble vitamins" },
    ],
    benefits: [
      "Natural plant-based source of highly bioavailable calcium",
      "Traditional recipe packed with active iron and trace elements",
      "Highly satisfying energy ball for joint and skeletal health",
    ],
    usage: "Enjoy 1-2 laddoos daily as a healthy evening snack, especially after a meal or a physical workout.",
    certifications: ["100% Traditional Recipe", "No Preservatives", "Handcrafted in Small Batches"],
  },
};

export default function ProductModal({ productId, onClose, onAddToCart }: ProductModalProps) {
  useEffect(() => {
    if (productId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [productId]);

  if (!productId) return null;

  const product = PRODUCT_DATA[productId];
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-body select-none">
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-primary/45 backdrop-blur-lg transition-opacity animate-in fade-in duration-300"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 md:p-12">
        {/* Modal Container */}
        <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 border border-primary/5 flex flex-col md:flex-row">
          
          {/* Close Button Mobile */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-on-surface-variant hover:text-primary bg-white/80 backdrop-blur-md rounded-full shadow-md md:shadow-none hover:bg-primary/5 md:bg-transparent"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>

          {/* Left: Product Media / visual */}
          <div className="w-full md:w-5/12 bg-surface relative min-h-[300px] md:min-h-[500px] border-r border-primary/5">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            {/* Certifications badges absolute */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
              {product.certifications.map((cert) => (
                <span
                  key={cert}
                  className="glass-emerald text-white text-[9px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Technical Product Content */}
          <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-between max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div>
              {/* Product Header */}
              <div className="space-y-1">
                <span className="font-mono text-secondary text-xs font-bold uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="font-display font-extrabold text-3xl text-primary tracking-tight">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-semibold text-on-surface-variant font-mono">
                    {product.servings}
                  </span>
                  <span className="font-display font-extrabold text-2xl text-primary">
                    ₹{product.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-on-surface-variant leading-relaxed mt-6">
                {product.description}
              </p>

              {/* Formulation Specifications */}
              <div className="mt-8 space-y-4">
                <h4 className="font-display font-extrabold text-sm text-primary tracking-tight uppercase flex items-center gap-1.5 border-b border-primary/5 pb-2">
                  <span className="material-symbols-outlined text-xs text-secondary">analytics</span>
                  Active Bio-Chemical Dose
                </h4>
                
                <div className="space-y-3">
                  {product.ingredients.map((ing) => (
                    <div key={ing.name} className="flex justify-between items-start gap-4">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-primary">{ing.name}</span>
                        <p className="text-[10px] text-on-surface-variant/80 font-medium max-w-[280px]">
                          {ing.desc}
                        </p>
                      </div>
                      <span className="font-mono text-xs font-bold text-secondary bg-secondary/5 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                        {ing.dosage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div className="mt-8 space-y-3">
                <h4 className="font-display font-extrabold text-sm text-primary tracking-tight uppercase flex items-center gap-1.5 border-b border-primary/5 pb-2">
                  <span className="material-symbols-outlined text-xs text-secondary">verified</span>
                  Systemic Benefits
                </h4>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="text-xs text-on-surface-variant font-medium flex items-start gap-2">
                      <span className="material-symbols-outlined text-secondary text-[14px] mt-0.5">check_circle</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Directions */}
              <div className="mt-8 space-y-2">
                <h4 className="font-display font-extrabold text-sm text-primary tracking-tight uppercase flex items-center gap-1.5 border-b border-primary/5 pb-2">
                  <span className="material-symbols-outlined text-xs text-secondary">clinical_trial</span>
                  Suggested Usage
                </h4>
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                  {product.usage}
                </p>
              </div>
            </div>

            {/* CTA controls */}
            <div className="mt-10 pt-6 border-t border-primary/5 flex items-center gap-4">
              <button
                onClick={() => {
                  onAddToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    servings: product.servings,
                  });
                  onClose();
                }}
                className="flex-1 bg-primary text-white py-4 rounded-full font-bold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                Add to Bag
                <span className="material-symbols-outlined text-sm">shopping_cart</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
