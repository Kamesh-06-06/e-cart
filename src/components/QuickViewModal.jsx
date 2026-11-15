import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, isInWishlist, toggleWishlist } =
    useContext(CartContext);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setAdded(false);
  }, [quickViewProduct]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeQuickView();
      }
    };
    if (quickViewProduct) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [quickViewProduct, closeQuickView]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition cursor-pointer"
        >
          <i className="bi bi-x-lg text-sm"></i>
        </button>

        {/* Product Image Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center relative">
          {discountPercent > 0 && (
            <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/src/assets/eCart-icon.PNG";
            }}
            className="w-full max-h-72 object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info Section */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                {product.category || "Gadget"}
              </span>
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                <i className="bi bi-check-circle-fill"></i> In Stock
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              {product.name}
            </h3>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`bi ${
                      i < Math.floor(product.rating || 4.5)
                        ? "bi-star-fill"
                        : i < (product.rating || 4.5)
                        ? "bi-star-half"
                        : "bi-star"
                    }`}
                  ></i>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {product.rating || 4.8}
              </span>
              <span className="text-xs text-gray-400">
                ({product.reviewsCount || 120} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="text-base text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-3 text-sm text-gray-600 line-clamp-3 leading-relaxed">
              {product.description ||
                "High quality premium technology product engineered for performance and durability."}
            </p>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              {/* Quantity */}
              <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-700 transition"
                >
                  <i className="bi bi-dash"></i>
                </button>
                <span className="w-8 text-center font-bold text-sm text-gray-800">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-700 transition"
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>

              {/* Wishlist toggle */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition cursor-pointer ${
                  isWishlisted
                    ? "border-rose-200 bg-rose-50 text-rose-500"
                    : "border-gray-200 hover:border-gray-300 text-gray-500 hover:text-rose-500"
                }`}
                title="Wishlist"
              >
                <i
                  className={`bi text-lg ${
                    isWishlisted ? "bi-heart-fill" : "bi-heart"
                  }`}
                ></i>
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
                  added
                    ? "bg-emerald-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/25 active:scale-95"
                }`}
              >
                <i className={`bi ${added ? "bi-check2" : "bi-cart-plus"}`}></i>
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>

              <Link
                to={`/product/${product.id}`}
                onClick={closeQuickView}
                className="py-3 px-4 rounded-xl font-semibold text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition"
              >
                Details <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
