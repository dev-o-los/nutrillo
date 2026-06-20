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
  "vitality-greens": {
    id: "vitality-greens",
    name: "Vitality Greens",
    category: "Superfood & Prebiotic Complex",
    price: 64.00,
    image: "/images/vitality_greens.png",
    servings: "30 Servings | Powder",
    description: "Our flagship formulation designed to support daily digestive health, alkaline vitality, and systemic cellular regeneration. We combine dense greens with prebiotics and micro-encapsulated probiotics to ensure optimal gut microbiome integrity.",
    ingredients: [
      { name: "Organic Spirulina", dosage: "2000mg", desc: "Pure high-protein blue-green algae supporting immune modulation" },
      { name: "Organic Chlorella", dosage: "1500mg", desc: "Broken cell wall chlorella aiding in heavy metal detoxification" },
      { name: "Wheatgrass Juice Extract", dosage: "1200mg", desc: "Cold-press dehydrated grass juice loaded with chlorophyll" },
      { name: "Prebiotic Inulin (Chicory)", dosage: "2000mg", desc: "Soluble dietary fiber feeding beneficial gut bifidobacteria" },
      { name: "Spore Probiotic Blend", dosage: "5 Billion CFU", desc: "Micro-encapsulated strains resilient to stomach acidity" },
    ],
    benefits: [
      "Optimizes gut microbiome diversity & digestive comfort",
      "Alkalizes blood pH levels and increases natural energy output",
      "Aids in natural systemic cellular detoxification pathways",
    ],
    usage: "Mix 1 scoop (8g) in 10-12 oz of cold water, coconut water, or your favorite green smoothie. Consume first thing in the morning on an empty stomach.",
    certifications: ["Non-GMO Project Verified", "USDA Organic", "Third-Party ISO Lab Tested"],
  },
  "cognitive-core": {
    id: "cognitive-core",
    name: "Cognitive Core",
    category: "Nootropic Neural Support",
    price: 82.00,
    image: "/images/cognitive_core.png",
    servings: "60 Capsules | Capsule",
    description: "A clinical-strength neurological amplifier formulated to optimize neurogenesis, enhance synaptic plasticity, and promote deep flow-state concentration. It supports sustained attention span and stress resilience without caffeine crashes.",
    ingredients: [
      { name: "Organic Lion's Mane Extract", dosage: "500mg", desc: "Dual-extracted mushroom fruiting body promoting NGF (Nerve Growth Factor)" },
      { name: "L-Theanine (Suntheanine)", dosage: "200mg", desc: "Pure isomer amino acid increasing alpha brainwave activity for calm focus" },
      { name: "Bacopa Monnieri (50% Bacosides)", dosage: "300mg", desc: "Traditional botanical supporting synaptic signal speed and memory recall" },
      { name: "Rhodiola Rosea Extract", dosage: "150mg", desc: "Standardized adaptogen modulating cortisol levels during intense mental tasks" },
      { name: "Vitamin B12 (Methylcobalamin)", dosage: "500mcg", desc: "Co-enzyme form of B12 supporting cellular neurological metabolism" },
    ],
    benefits: [
      "Accelerates focus, memory retention, and learning capacity",
      "Modulates physical and emotional stress response (cortisol control)",
      "Supports long-term neurological health and NGF release",
    ],
    usage: "Take 2 capsules with a glass of water in the morning. For extended cognitive tasks, take an additional 1 capsule in the early afternoon.",
    certifications: ["Vegan Certified", "Gluten-Free", "Made in a GMP Facility"],
  },
  "elite-plant-protein": {
    id: "elite-plant-protein",
    name: "Elite Plant Protein",
    category: "Multi-Source Vegan Blend",
    price: 75.00,
    image: "/images/plant_protein.png",
    servings: "25 Servings | Powder",
    description: "A clean, allergen-free plant-based protein formula designed for athletic muscle repair, metabolic support, and recovery. Engineered with complete amino acid profiles and plant digestive enzymes to prevent bloating.",
    ingredients: [
      { name: "Organic Yellow Pea Protein", dosage: "15g", desc: "Water-extracted complete pea protein isolate rich in lysine" },
      { name: "Organic Sprouted Rice Protein", dosage: "10g", desc: "Sprouted brown rice protein supplying methionine and cysteine" },
      { name: "BCAA Blend (2:1:1 Ratio)", dosage: "5.5g", desc: "L-Leucine, L-Isoleucine, and L-Valine triggering muscle synthesis" },
      { name: "Digestive Enzyme Complex", dosage: "150mg", desc: "Amylase, protease, and lipase assisting in gut macromolecule breakdown" },
    ],
    benefits: [
      "Provides 25g of bioavailable complete vegan protein per serving",
      "Contains 5.5g BCAAs to accelerate post-workout tissue repair",
      "Ultra-smooth blend completely free of chalky textures or bloating",
    ],
    usage: "Shake or blend 1 scoop (35g) into 12 oz of water, almond milk, or post-workout smoothies. Consume within 45 minutes of finishing physical exercise.",
    certifications: ["Informed Sport Certified", "Dairy-Free & Soy-Free", "Zero Artificial Sweeteners"],
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
