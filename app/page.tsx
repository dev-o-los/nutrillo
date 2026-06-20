"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import BioBackground from "./components/BioBackground";
import ProductSlider from "./components/ProductSlider";
import CartDrawer, { CartItem } from "./components/CartDrawer";
import SearchModal from "./components/SearchModal";
import ProductModal from "./components/ProductModal";

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Contact Form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  const handleAddToCart = (product: { id: string; name: string; price: number; image: string; servings: string }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    // Auto-open cart drawer for visual confirmation
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setIsContactSubmitted(true);
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col font-body bg-background text-on-surface overflow-x-hidden">

      {/* Bioactive Animated Gradient Canvas Overlay */}
      <BioBackground />

      {/* Floating Header */}
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
        onSearchOpen={() => setIsSearchOpen(true)}
      />

      {/* HERO SECTION */}
      <section className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 overflow-hidden">
        {/* Decorative Floating Particles */}
        <div className="floating-particle bg-secondary/15 w-72 h-72 top-1/4 -left-20 pointer-events-none" />
        <div className="floating-particle bg-primary/10 w-96 h-96 bottom-1/4 -right-20 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center text-center">

          {/* Typography */}
          <div className="max-w-4xl mx-auto space-y-8 select-none flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-4 py-1.5 text-xs font-bold text-primary">
              <span className="material-symbols-outlined text-xs">verified</span>
              Bio-Active Nutrition Systems
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold text-primary leading-[1.08] tracking-tight">
              Nature’s Finest,<br />
              <span className="text-secondary">Reimagined.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-medium">
              NUTRILLO: Premium nutritional excellence delivered through bio-available science, cellular synergy, and organic purity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <a
                href="#products"
                onClick={(e) => scrollToSection(e, "#products")}
                className="w-full sm:w-auto bg-primary text-white text-center font-bold px-10 py-4 rounded-full hover:bg-secondary hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Shop Now
              </a>
              <a
                href="#science"
                onClick={(e) => scrollToSection(e, "#science")}
                className="w-full sm:w-auto glass-panel text-primary text-center font-bold px-10 py-4 rounded-full hover:bg-primary hover:text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Science
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* INFINITE MARQUEE STRIP */}
      <div className="bg-primary py-6 overflow-hidden border-y border-white/10 relative z-10 select-none">
        <div className="animate-marquee flex whitespace-nowrap w-max">
          <div className="flex items-center justify-start gap-10 shrink-0">
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">verified</span> 100% Organic Ingredients
            </span>
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">science</span> Clinical-Strength Formula
            </span>
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">eco</span> Zero Synthetic Bindings
            </span>
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">bolt</span> High Bio-Availability
            </span>
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">spa</span> Gluten-Free & Vegan
            </span>
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">fact_check</span> Third-Party Lab Tested
            </span>
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">forest</span> Sustainably Harvested
            </span>
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">biotech</span> Advanced Bio-Actives
            </span>
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">shield</span> Purity Guaranteed
            </span>
          </div>
          {/* Duplicate for seamless looping */}
          <div className="flex items-center justify-start gap-10 shrink-0">
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">verified</span> 100% Organic Ingredients
            </span>
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">science</span> Clinical-Strength Formula
            </span>
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">eco</span> Zero Synthetic Bindings
            </span>
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">bolt</span> High Bio-Availability
            </span>
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">spa</span> Gluten-Free & Vegan
            </span>
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">fact_check</span> Third-Party Lab Tested
            </span>
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">forest</span> Sustainably Harvested
            </span>
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">biotech</span> Advanced Bio-Actives
            </span>
            <span className="font-mono text-secondary-fixed text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 whitespace-nowrap font-bold">
              <span className="material-symbols-outlined text-[16px] text-secondary">shield</span> Purity Guaranteed
            </span>
          </div>
        </div>
      </div>

      {/* CINEMATIC SHOWCASE (PRODUCT SLIDER) */}
      <ProductSlider
        onSelectProduct={setSelectedProductId}
        onAddToCart={handleAddToCart}
      />

      {/* PHILOSOPHY / CALLOUT SECTION */}
      <section id="science" className="py-24 relative overflow-hidden bg-primary text-white select-none">
        {/* Glow decorative effects */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none bg-radial from-secondary/40 to-transparent blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-8">
            <h4 className="font-mono text-secondary-fixed font-bold text-xs tracking-widest uppercase">
              our philosophy
            </h4>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] text-white">
              The intersection of bio-active science and raw nature.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-on-primary-container leading-relaxed">
              We believe that the most potent nutritional benefits originate in whole botanicals, preserved in their complex ecological synergy. Every Nutrillo formulation respects the biology of the ingredient, protecting it to deliver absolute bioavailability to your body.
            </p>

            {/* Interactive Grid Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
              <div className="group cursor-default">
                <p className="font-display text-4xl font-extrabold text-secondary-fixed mb-1 group-hover:scale-105 transition-transform duration-350">
                  98%
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-on-primary-container font-bold">
                  Bio-Availability
                </p>
              </div>
              <div className="group cursor-default">
                <p className="font-display text-4xl font-extrabold text-secondary-fixed mb-1 group-hover:scale-105 transition-transform duration-350">
                  0%
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-on-primary-container font-bold">
                  Synthetic Fillers
                </p>
              </div>
              <div className="group cursor-default">
                <p className="font-display text-4xl font-extrabold text-secondary-fixed mb-1 group-hover:scale-105 transition-transform duration-350">
                  12k+
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-on-primary-container font-bold">
                  Five-Star Reviews
                </p>
              </div>
              <div className="group cursor-default">
                <p className="font-display text-4xl font-extrabold text-secondary-fixed mb-1 group-hover:scale-105 transition-transform duration-350">
                  Pure
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-on-primary-container font-bold">
                  Trace Testing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER & NEWSLETTER */}
      <footer id="reviews" className="pt-24 pb-12 bg-background relative z-10">
        <div className="container mx-auto px-6">

          {/* Glassmorphic Contact Us Box */}
          <div className="glass-emerald rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-xl text-center lg:text-left space-y-2">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Contact Us
                </h2>
                <p className="text-on-primary-container text-sm sm:text-base font-medium">
                  Have questions about our bio-active formulations, ingredient sourcing, or your orders? Leave us a message and our team will respond within 24 hours.
                </p>
              </div>

              <div className="w-full max-w-md">
                {isContactSubmitted ? (
                  <div className="bg-white/10 border border-white/20 rounded-3xl p-6 text-center text-white flex flex-col items-center justify-center gap-3 animate-in zoom-in duration-300">
                    <span className="material-symbols-outlined text-secondary text-4xl">check_circle</span>
                    <div className="space-y-1">
                      <p className="font-bold text-base">Message Sent Successfully</p>
                      <p className="text-xs text-on-primary-container font-medium">We will reach back to you shortly.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white/20 transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white/20 transition-all"
                    />
                    <textarea
                      placeholder="Your Message"
                      required
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white/20 transition-all resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full bg-secondary text-primary font-extrabold py-3.5 rounded-full hover:bg-secondary-container hover:shadow-lg transition-all duration-250 cursor-pointer text-sm font-bold flex items-center justify-center gap-2"
                    >
                      Send Message
                      <span className="material-symbols-outlined text-sm">send</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Glow backing */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary blur-[100px] opacity-20 pointer-events-none" />
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16 select-none">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">eco</span>
                <span className="font-display font-extrabold text-2xl tracking-tight text-primary">
                  NUTRILLO
                </span>
              </div>
              <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed max-w-sm">
                Redefining the standards of premium nutrition through clinical precision and organic mastery. Since 2026.
              </p>

              {/* Social icons */}
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full border border-outline/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                  <span className="material-symbols-outlined text-sm">share</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-outline/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-outline/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-display font-extrabold text-sm text-primary tracking-tight uppercase">
                Shop
              </h5>
              <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant font-medium">
                <li><a href="#products" onClick={(e) => scrollToSection(e, "#products")} className="hover:text-primary transition-colors">All Products</a></li>
                <li><a href="#products" onClick={(e) => scrollToSection(e, "#products")} className="hover:text-primary transition-colors">Superfoods</a></li>
                <li><a href="#products" onClick={(e) => scrollToSection(e, "#products")} className="hover:text-primary transition-colors">Capsules</a></li>
                <li><a href="#products" onClick={(e) => scrollToSection(e, "#products")} className="hover:text-primary transition-colors">Bundles</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="font-display font-extrabold text-sm text-primary tracking-tight uppercase">
                Science
              </h5>
              <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant font-medium">
                <li><a href="#science" onClick={(e) => scrollToSection(e, "#science")} className="hover:text-primary transition-colors">Clinical Trials</a></li>
                <li><a href="#science" onClick={(e) => scrollToSection(e, "#science")} className="hover:text-primary transition-colors">Ingredients</a></li>
                <li><a href="#science" onClick={(e) => scrollToSection(e, "#science")} className="hover:text-primary transition-colors">Lab Reports</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="font-display font-extrabold text-sm text-primary tracking-tight uppercase">
                Company
              </h5>
              <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant font-medium">
                <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Partnerships</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="font-display font-extrabold text-sm text-primary tracking-tight uppercase">
                Support
              </h5>
              <ul className="space-y-2 text-xs sm:text-sm text-on-surface-variant font-medium">
                <li><a href="#" className="hover:text-primary transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Returns policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Get in touch</a></li>
              </ul>
            </div>
          </div>

          {/* Subfooter */}
          <div className="pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">
            <p>© 2026 NUTRILLO. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(id) => setSelectedProductId(id)}
      />

      {/* Science formulation detail Modal */}
      <ProductModal
        productId={selectedProductId}
        onClose={() => setSelectedProductId(null)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
