import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import defaultIcon from "../assets/eCart-icon.PNG";

export default function ProductCard({ product }) {
  const { addToCart, isInWishlist, toggleWishlist, openQuickView } =
    useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const isWishlisted = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    openQuickView(product);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl border border-gray-100/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1.5"
    >
      {/* Top Badges & Actions */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm tracking-wide">
            {discountPercent}% OFF
          </div>
        )}

        {/* Trending / Bestseller Badge */}
        {product.trending && !discountPercent && (
          <div className="absolute top-3 left-3 z-10 bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
            <span>🔥</span> Trending
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer ${
            isWishlisted
              ? "bg-rose-500 text-white scale-105"
              : "bg-white/90 backdrop-blur-sm text-gray-500 hover:text-rose-500 hover:bg-white"
          }`}
        >
          <i
            className={`bi text-base transition-transform active:scale-125 ${
              isWishlisted ? "bi-suit-heart-fill text-white" : "bi-suit-heart"
            }`}
          ></i>
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = defaultIcon;
          }}
          className="w-full h-full object-contain p-2 group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Quick View Hover Button */}
        <div
          className={`absolute inset-x-4 bottom-3 transition-all duration-300 flex justify-center ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          <button
            type="button"
            onClick={handleQuickView}
            className="w-full bg-white/95 backdrop-blur-md text-gray-900 text-xs font-semibold py-2 px-3 rounded-xl shadow-lg border border-gray-200/60 hover:bg-gray-900 hover:text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <i className="bi bi-eye"></i> Quick View
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category Tag */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <span className="font-medium text-blue-600 bg-blue-50/80 px-2 py-0.5 rounded-md">
              {product.category || "Gadgets"}
            </span>

            {/* Star Rating */}
            <div className="flex items-center gap-1 text-xs">
              <i className="bi bi-star-fill text-amber-400 text-[11px]"></i>
              <span className="font-bold text-gray-700">
                {product.rating || 4.5}
              </span>
              <span className="text-gray-400">
                ({product.reviewsCount || 100})
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 min-h-[2.75rem] group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg sm:text-xl font-extrabold text-gray-900">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-xs ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 active:scale-95 text-white hover:shadow-blue-500/20"
            }`}
          >
            <i
              className={`bi ${
                added ? "bi-check2-circle text-base" : "bi-cart-plus text-base"
              }`}
            ></i>
            <span>{added ? "Added!" : "Add to Cart"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
