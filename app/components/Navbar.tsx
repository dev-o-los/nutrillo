"use client";

import { useState, useEffect } from "react";

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
  onSearchOpen: () => void;
}

export default function Navbar({ cartCount, onCartOpen, onSearchOpen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const progress = Math.min(scrollY / 120, 1);

  const navLinks = [
    { name: "Products", href: "#products" },
    { name: "Philosophy", href: "#philosophy" },
    { name: "About Us", href: "#about" },
    { name: "Contact Us", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ease-out"
      style={{
        paddingTop: `${progress * 16}px`,
        paddingLeft: `${progress * 16}px`,
        paddingRight: `${progress * 16}px`,
      }}
    >
      <div 
        className="w-full max-w-7xl flex items-center justify-between relative z-20 transition-all duration-300 ease-out"
        style={{
          borderRadius: progress === 0 ? "0px" : `${progress * 9999}px`,
          borderBottomWidth: "1px",
          borderStyle: "solid",
          borderColor: progress === 0 ? "rgba(0, 53, 39, 0.05)" : `rgba(0, 53, 39, ${0.05 + progress * 0.08})`,
          background: progress === 0 ? "rgba(247, 249, 251, 0)" : `rgba(247, 249, 251, ${progress * 0.94})`,
          backdropFilter: progress === 0 ? "none" : `blur(${progress * 24}px)`,
          WebkitBackdropFilter: progress === 0 ? "none" : `blur(${progress * 24}px)`,
          boxShadow: progress === 0 ? "none" : `0 ${progress * 12}px ${progress * 40}px -10px rgba(0, 53, 39, ${progress * 0.04})`,
          paddingTop: `${16 - progress * 4}px`, // py-4 to py-3
          paddingBottom: `${16 - progress * 4}px`,
          paddingLeft: `${24 + progress * 8}px`, // px-6 to px-8
          paddingRight: `${24 + progress * 8}px`,
        }}
      >
        
        {/* Left: Brand Logo */}
        <a href="#" className="flex items-center gap-2 cursor-pointer select-none group">
          <span className="material-symbols-outlined text-primary text-2xl group-hover:rotate-12 transition-transform duration-300">
            eco
          </span>
          <span className="font-display font-extrabold text-xl tracking-tight text-primary">
            NUTRILLO
          </span>
        </a>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-on-surface-variant">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="hover:text-primary transition-colors duration-250 relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search trigger */}
          <button
            onClick={onSearchOpen}
            className="p-2 text-primary hover:bg-primary/5 rounded-full transition-colors duration-200"
            aria-label="Search formulations"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* Cart trigger */}
          <button
            onClick={onCartOpen}
            className="p-2 text-primary hover:bg-primary/5 rounded-full transition-colors duration-200 relative"
            aria-label="Open shopping bag"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-primary hover:bg-primary/5 rounded-full md:hidden transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Slide Down overlay) */}
      {mobileMenuOpen && (
        <div 
          className="absolute left-4 right-4 bg-white/95 backdrop-blur-xl border border-primary/10 rounded-3xl p-6 shadow-2xl md:hidden z-10 animate-in fade-in slide-in-from-top-4 duration-300"
          style={{
            top: `${progress * 16 + 64}px`
          }}
        >
          <div className="flex flex-col gap-4 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-base font-bold text-on-surface-variant hover:text-primary py-2 transition-colors border-b border-primary/5 last:border-0"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
