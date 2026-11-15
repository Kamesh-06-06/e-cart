import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Toast from "./components/Toast";
import ScrollToTop from "./components/ScrollToTop";
import defaultIcon from "./assets/eCart-icon.PNG";

function Cart() {
  const {
    cart,
    addToCart,
    removeFromCart,
    removeItemFromCart,
    cartCount,
    cartSubtotal,
    clearCart,
    showToast,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  // Apply promo coupon
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "ECART10") {
      const discount = Math.round(cartSubtotal * 0.1);
      setAppliedDiscount(discount);
      setCouponApplied(true);
      showToast("Coupon ECART10 applied! 10% OFF saved 🎉", "success");
    } else if (code === "SAVE500" && cartSubtotal >= 3000) {
      setAppliedDiscount(500);
      setCouponApplied(true);
      showToast("Coupon SAVE500 applied! ₹500 OFF 🎉", "success");
    } else {
      showToast("Invalid promo code. Try 'ECART10'", "error");
    }
  };

  // Shipping logic (Free if subtotal > 999, else 99)
  const shippingFee = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 99;
  const freeShippingThreshold = 999;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Final Total
  const finalTotal = Math.max(0, cartSubtotal - appliedDiscount + shippingFee);

  // Handle Checkout
  const handleProceedToCheckout = () => {
    navigate("/order", {
      state: {
        isCartOrder: true,
        cartItems: cart,
        subtotal: cartSubtotal,
        discount: appliedDiscount,
        shipping: shippingFee,
        total: finalTotal,
        quantity: cartCount,
      },
    });
  };

  // Empty Cart State
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50/60 flex flex-col justify-between">
        <div>
          <Navbar />
          <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center">
            <div className="w-28 h-28 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6 text-5xl shadow-inner">
              <i className="bi bi-cart-x"></i>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Your Cart is Currently Empty
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Explore our top trending gadgets and tech essentials!
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/product"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
              >
                <i className="bi bi-bag"></i>
                <span>Start Shopping Now</span>
              </Link>
              <Link
                to="/trends"
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-2xl transition-all"
              >
                <span>View Trending Deals</span>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
        <Toast />
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/60 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Header */}
        <section className="bg-white border-b border-gray-100 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                <span>Shopping Cart</span>
                <span className="text-sm font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                  {cartCount} {cartCount === 1 ? "Item" : "Items"}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Review your items and proceed to secure checkout
              </p>
            </div>

            <button
              onClick={clearCart}
              className="text-xs sm:text-sm font-semibold text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <i className="bi bi-trash3"></i> Clear Cart
            </button>
          </div>
        </section>

        {/* Free Shipping Progress Indicator */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm">
              <i
                className={`bi ${
                  amountToFreeShipping === 0
                    ? "bi-check-circle-fill text-emerald-500 text-lg"
                    : "bi-truck text-blue-600 text-lg"
                }`}
              ></i>
              <span className="text-gray-700">
                {amountToFreeShipping === 0 ? (
                  <strong className="text-emerald-600">
                    Congratulations! You qualify for Free Express Shipping 🎉
                  </strong>
                ) : (
                  <>
                    Add{" "}
                    <strong className="text-blue-600">
                      ₹{amountToFreeShipping.toLocaleString("en-IN")}
                    </strong>{" "}
                    more to unlock <strong>Free Express Shipping</strong>!
                  </>
                )}
              </span>
            </div>

            <div className="w-full sm:w-48 bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    (cartSubtotal / freeShippingThreshold) * 100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Cart Layout: 2 Columns */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Cart Items (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
                >
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${item.id}`}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gray-50 p-2 shrink-0 flex items-center justify-center border border-gray-100 overflow-hidden group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = defaultIcon;
                      }}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {item.category || "Gadget"}
                    </span>
                    <Link
                      to={`/product/${item.id}`}
                      className="block font-bold text-gray-900 text-sm sm:text-base mt-1 hover:text-blue-600 transition truncate"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Unit Price: ₹{item.price.toLocaleString("en-IN")}
                    </p>

                    {/* Mobile Price */}
                    <p className="sm:hidden text-blue-600 font-extrabold text-base mt-2">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Decrease quantity"
                      className="w-8 h-8 rounded-lg hover:bg-white text-gray-700 flex items-center justify-center transition cursor-pointer"
                    >
                      <i className="bi bi-dash font-bold"></i>
                    </button>
                    <span className="w-9 text-center font-bold text-sm text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item, 1)}
                      aria-label="Increase quantity"
                      className="w-8 h-8 rounded-lg hover:bg-white text-gray-700 flex items-center justify-center transition cursor-pointer"
                    >
                      <i className="bi bi-plus font-bold"></i>
                    </button>
                  </div>

                  {/* Subtotal for Item */}
                  <div className="hidden sm:block text-right min-w-[90px]">
                    <span className="text-xs text-gray-400 block">Total</span>
                    <span className="text-base font-extrabold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItemFromCart(item.id)}
                    aria-label="Remove item"
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                    title="Remove item"
                  >
                    <i className="bi bi-trash text-lg"></i>
                  </button>
                </div>
              ))}

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <Link
                  to="/product"
                  className="text-xs sm:text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1.5"
                >
                  <i className="bi bi-arrow-left"></i> Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right: Order Summary (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 pb-4 border-b border-gray-100">
                Order Summary
              </h2>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="mt-5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Have a Promo Code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Try ECART10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs uppercase font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1.5 flex items-center gap-1">
                    <i className="bi bi-check-circle-fill"></i> Coupon applied: -₹{appliedDiscount}
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="mt-6 pt-5 border-t border-gray-100 space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-semibold text-gray-900">
                    ₹{cartSubtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{appliedDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase text-xs">
                        FREE
                      </span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                  <span className="text-base font-bold text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-2xl font-black text-blue-600">
                    ₹{finalTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Checkout CTA Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full mt-6 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <i className="bi bi-arrow-right font-bold"></i>
              </button>

              {/* Security & Payment Badges */}
              <div className="mt-5 pt-4 border-t border-gray-100 text-center">
                <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                  <i className="bi bi-shield-lock-fill text-emerald-500"></i>
                  <span>256-Bit SSL Encrypted & Secure Checkout</span>
                </p>
                <div className="flex items-center justify-center gap-3 mt-3 text-gray-400 text-lg">
                  <i className="bi bi-credit-card-2-front"></i>
                  <i className="bi bi-wallet2"></i>
                  <i className="bi bi-bank"></i>
                  <i className="bi bi-cash-stack"></i>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <Toast />
      <ScrollToTop />
    </div>
  );
}

export default Cart;
