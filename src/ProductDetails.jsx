import { useState, useContext, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { getProductById, PRODUCTS } from "./data/products";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Toast from "./components/Toast";
import QuickViewModal from "./components/QuickViewModal";
import ScrollToTop from "./components/ScrollToTop";
import ProductCard from "./components/ProductCard";
import defaultIcon from "./assets/eCart-icon.PNG";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInWishlist, toggleWishlist, showToast } =
    useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");
  const [added, setAdded] = useState(false);
  const [imageZoom, setImageZoom] = useState(false);

  // Find product by route parameter ID
  const product = useMemo(() => {
    return getProductById(id) || PRODUCTS[0];
  }, [id]);

  const isWishlisted = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  // Related products from same category or random
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4);
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    navigate("/order", {
      state: {
        ...product,
        quantity: quantity,
      },
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on e-Cart!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard! 📋", "info");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/60 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-100 py-3.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <i className="bi bi-chevron-right text-[10px]"></i>
            <Link to="/product" className="hover:text-blue-600 transition">
              Products
            </Link>
            <i className="bi bi-chevron-right text-[10px]"></i>
            <Link
              to={`/product?category=${product.category}`}
              className="hover:text-blue-600 transition"
            >
              {product.category}
            </Link>
            <i className="bi bi-chevron-right text-[10px]"></i>
            <span className="text-gray-900 font-medium truncate max-w-xs">
              {product.name}
            </span>
          </div>
        </div>

        {/* Product Details Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
            {/* Left: Product Visuals */}
            <div className="flex flex-col gap-4">
              <div
                className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl aspect-square flex items-center justify-center p-8 overflow-hidden border border-gray-100 group"
                onMouseEnter={() => setImageZoom(true)}
                onMouseLeave={() => setImageZoom(false)}
              >
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {discountPercent > 0 && (
                    <span className="bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {discountPercent}% OFF
                    </span>
                  )}
                  {product.trending && (
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      🔥 Trending
                    </span>
                  )}
                </div>

                {/* Wishlist & Share buttons */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                  <button
                    onClick={() => toggleWishlist(product)}
                    aria-label="Wishlist"
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition cursor-pointer ${
                      isWishlisted
                        ? "bg-rose-500 text-white"
                        : "bg-white text-gray-500 hover:text-rose-500"
                    }`}
                  >
                    <i
                      className={`bi text-lg ${
                        isWishlisted ? "bi-heart-fill" : "bi-heart"
                      }`}
                    ></i>
                  </button>

                  <button
                    onClick={handleShare}
                    aria-label="Share product"
                    className="w-10 h-10 rounded-full bg-white text-gray-500 hover:text-blue-600 flex items-center justify-center shadow-md transition cursor-pointer"
                  >
                    <i className="bi bi-share text-base"></i>
                  </button>
                </div>

                {/* Main Image with Zoom */}
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = defaultIcon;
                  }}
                  className={`w-full h-full object-contain transition-transform duration-500 ${
                    imageZoom ? "scale-115" : "scale-100"
                  }`}
                />
              </div>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-gray-50 rounded-2xl text-center border border-gray-100">
                  <i className="bi bi-truck text-xl text-blue-600 mb-1 inline-block"></i>
                  <p className="text-[11px] font-bold text-gray-800">
                    Free Shipping
                  </p>
                  <p className="text-[10px] text-gray-400">On ₹999+</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl text-center border border-gray-100">
                  <i className="bi bi-shield-check text-xl text-blue-600 mb-1 inline-block"></i>
                  <p className="text-[11px] font-bold text-gray-800">
                    1-Yr Warranty
                  </p>
                  <p className="text-[10px] text-gray-400">Official Brand</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl text-center border border-gray-100">
                  <i className="bi bi-arrow-repeat text-xl text-blue-600 mb-1 inline-block"></i>
                  <p className="text-[11px] font-bold text-gray-800">
                    7 Days Return
                  </p>
                  <p className="text-[10px] text-gray-400">Hassle Free</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl text-center border border-gray-100">
                  <i className="bi bi-patch-check-fill text-xl text-blue-600 mb-1 inline-block"></i>
                  <p className="text-[11px] font-bold text-gray-800">
                    100% Genuine
                  </p>
                  <p className="text-[10px] text-gray-400">Verified Stock</p>
                </div>
              </div>
            </div>

            {/* Right: Product Information & Purchase Flow */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    In Stock & Ready to Ship
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">
                  {product.name}
                </h1>

                {/* Ratings Row */}
                <div className="flex items-center gap-3 mt-3.5 pb-4 border-b border-gray-100">
                  <div className="flex items-center text-amber-400 text-sm">
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
                  <span className="text-sm font-bold text-gray-800">
                    {product.rating || 4.8} / 5.0
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-xs text-gray-500 font-medium">
                    {product.reviewsCount || 240} Verified Customer Reviews
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-5 bg-blue-50/50 p-4 rounded-2xl border border-blue-100/60 flex flex-wrap items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-blue-600">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        You Save ₹{savings.toLocaleString("en-IN")} ({discountPercent}%)
                      </span>
                    </>
                  )}
                  <p className="w-full text-[11px] text-gray-500 mt-1">
                    Inclusive of all taxes • EMI starts at ₹{(product.price / 3).toFixed(0)}/month
                  </p>
                </div>

                {/* Description */}
                <p className="mt-5 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Feature Bullets */}
                {product.features && (
                  <div className="mt-5 space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Key Highlights:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                      {product.features.map((feat, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <i className="bi bi-check-circle-fill text-blue-600 text-xs"></i>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Purchase Controls */}
              <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                {/* Quantity Control */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-700">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 rounded-lg hover:bg-white text-gray-700 font-bold flex items-center justify-center transition cursor-pointer"
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-9 rounded-lg hover:bg-white text-gray-700 font-bold flex items-center justify-center transition cursor-pointer"
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>

                  <span className="text-xs text-gray-500">
                    Subtotal:{" "}
                    <strong className="text-gray-900">
                      ₹{(product.price * quantity).toLocaleString("en-IN")}
                    </strong>
                  </span>
                </div>

                {/* Action Buttons: Add to Cart and Buy Now */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    onClick={handleAddToCart}
                    disabled={added}
                    className={`py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all duration-200 cursor-pointer ${
                      added
                        ? "bg-emerald-600 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/25 active:scale-95"
                    }`}
                  >
                    <i
                      className={`bi ${
                        added ? "bi-check2-circle text-lg" : "bi-cart-plus text-lg"
                      }`}
                    ></i>
                    <span>{added ? "Added to Cart!" : "Add to Cart"}</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base bg-gray-900 hover:bg-black text-white shadow-md hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <i className="bi bi-lightning-charge-fill text-amber-400"></i>
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications & Reviews Tabs */}
          <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100">
            {/* Tab Navigators */}
            <div className="flex border-b border-gray-100 gap-6">
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-3.5 text-sm sm:text-base font-bold transition-all relative cursor-pointer ${
                  activeTab === "specs"
                    ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Specifications & Features
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-3.5 text-sm sm:text-base font-bold transition-all relative cursor-pointer ${
                  activeTab === "reviews"
                    ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Customer Reviews ({product.reviewsCount || 120})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="pt-6">
              {activeTab === "specs" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specs ? (
                    Object.entries(product.specs).map(([key, val]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center p-3.5 bg-gray-50 rounded-xl text-sm"
                      >
                        <span className="font-semibold text-gray-500">
                          {key}
                        </span>
                        <span className="font-bold text-gray-900">{val}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Standard industry specifications apply.
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      A
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-gray-900">
                          Aravind S.
                        </h4>
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.2 rounded-full font-bold">
                          Verified Buyer
                        </span>
                      </div>
                      <div className="flex text-amber-400 text-xs my-1">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="bi bi-star-fill"></i>
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        Exceeded my expectations! Build quality is top-notch and battery performance easily matches the listed specs.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                      R
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-gray-900">
                          Rohit M.
                        </h4>
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.2 rounded-full font-bold">
                          Verified Buyer
                        </span>
                      </div>
                      <div className="flex text-amber-400 text-xs my-1">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="bi bi-star-fill"></i>
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        Super fast shipping and great customer service from e-Cart. Will definitely buy again!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-14">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Related Products
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Customers who viewed this item also loved these
                  </p>
                </div>
                <Link
                  to={`/product?category=${product.category}`}
                  className="text-xs sm:text-sm font-semibold text-blue-600 hover:underline"
                >
                  View All {product.category}
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
      <Toast />
      <QuickViewModal />
      <ScrollToTop />
    </div>
  );
}

export default ProductDetails;
