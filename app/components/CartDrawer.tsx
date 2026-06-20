"use client";

import { useState } from "react";
import Image from "next/image";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  servings: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = discountApplied ? subtotal * 0.15 : 0;
  
  // Free shipping threshold: $150
  const shippingThreshold = 150;
  const isFreeShipping = subtotal >= shippingThreshold || subtotal === 0;
  const shippingCost = isFreeShipping ? 0 : 9.99;
  const shippingLeft = shippingThreshold - subtotal;
  
  const total = subtotal - discountAmount + shippingCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const code = promoCode.trim().toUpperCase();
    if (code === "COLLECTIVE" || code === "NUTRILLO15") {
      setDiscountApplied(true);
      setPromoCode("");
    } else {
      setPromoError("Invalid discount code");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-body">
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        {/* Drawer Panel */}
        <div className="w-screen max-w-md bg-white flex flex-col shadow-2xl relative z-10 animate-in slide-in-from-right duration-350 ease-out">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-primary/5 flex items-center justify-between">
            <h2 className="font-display font-extrabold text-xl text-primary tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">shopping_bag</span>
              Your Bag
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-primary/5 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide space-y-6">
            
            {/* Free Shipping Tracker */}
            {cartItems.length > 0 && (
              <div className="bg-surface-container-low border border-primary/5 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  {isFreeShipping ? (
                    <span className="text-secondary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">local_shipping</span>
                      You've unlocked free shipping!
                    </span>
                  ) : (
                    <span className="text-on-surface-variant">
                      Add <span className="text-primary font-mono">₹{shippingLeft.toFixed(2)}</span> more for free shipping
                    </span>
                  )}
                  <span className="font-mono text-on-surface-variant">
                    ₹{subtotal.toFixed(2)} / ₹{shippingThreshold}
                  </span>
                </div>
                <div className="w-full bg-primary/5 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-secondary h-full transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min((subtotal / shippingThreshold) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {cartItems.length === 0 ? (
              <div className="h-96 flex flex-col items-center justify-center text-center space-y-4">
                <span className="material-symbols-outlined text-outline/30 text-7xl">shopping_cart</span>
                <div>
                  <h3 className="font-display font-bold text-lg text-primary">Your bag is empty</h3>
                  <p className="text-sm text-on-surface-variant mt-1 max-w-[240px] mx-auto">
                    Start adding premium bio-active formulas to begin your journey.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-secondary transition-colors text-sm"
                >
                  Shop Now
                </button>
              </div>
            ) : (
              <div className="divide-y divide-primary/5">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="relative w-20 h-20 bg-surface rounded-xl overflow-hidden flex-shrink-0 border border-primary/5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-display font-extrabold text-sm text-primary leading-tight">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">
                            {item.servings}
                          </p>
                        </div>
                        <span className="font-display font-bold text-sm text-primary">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-outline/20 rounded-full py-0.5 px-2 bg-surface-container-lowest">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="text-primary p-1 hover:text-secondary"
                            disabled={item.quantity <= 1}
                          >
                            <span className="material-symbols-outlined text-sm font-bold">remove</span>
                          </button>
                          <span className="font-mono text-xs font-bold px-3 text-primary">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="text-primary p-1 hover:text-secondary"
                          >
                            <span className="material-symbols-outlined text-sm font-bold">add</span>
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-xs text-on-surface-variant hover:text-error font-semibold flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer controls */}
          {cartItems.length > 0 && (
            <div className="border-t border-primary/5 p-6 bg-surface-container-lowest space-y-6">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder={discountApplied ? "15% discount active" : "Promo Code (e.g. COLLECTIVE)"}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={discountApplied}
                  className="flex-1 border border-outline/25 bg-surface-container-low rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-secondary disabled:opacity-75 disabled:text-secondary disabled:font-bold"
                />
                <button
                  type="submit"
                  disabled={discountApplied || !promoCode}
                  className="bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-secondary transition-colors disabled:opacity-50"
                >
                  Apply
                </button>
              </form>
              {promoError && (
                <p className="text-xs text-error font-semibold -mt-4 pl-4 animate-shake">
                  {promoError}
                </p>
              )}

              {/* Pricing breakdown */}
              <div className="space-y-2 text-sm text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-primary font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                
                {discountApplied && (
                  <div className="flex justify-between text-secondary font-semibold">
                    <span>Discount (15%)</span>
                    <span className="font-mono">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono text-primary font-semibold">
                    {shippingCost === 0 ? "FREE" : `₹${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="border-t border-primary/5 pt-4 flex justify-between text-base font-display font-extrabold text-primary">
                  <span>Total</span>
                  <span className="font-mono">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => alert("Redirecting to checkout... Simulated integration complete.")}
                className="w-full bg-primary text-white py-4 rounded-full font-bold hover:bg-secondary transition-colors flex items-center justify-center gap-2 group"
              >
                Proceed to Checkout
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1 duration-200">
                  arrow_forward
                </span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
