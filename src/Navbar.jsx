import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "./CartContext";
import { PRODUCTS, CATEGORIES } from "./data/products";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);

  const { search, setSearch, cartCount, wishlistCount, user, logout, showToast } =
    useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const catMenuRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
      if (catMenuRef.current && !catMenuRef.current.contains(e.target)) {
        setCategoryDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoryDropdown(false);
    setUserDropdown(false);
  }, [location.pathname]);

  // Copy coupon code helper
  const handleCopyCode = (e) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText("ECART10");
      setCopiedCode(true);
      showToast("Coupon ECART10 copied to clipboard! 📋", "success");
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      showToast("Code: ECART10", "info");
    }
  };

  // Live search suggestions (up to 5 items)
  const searchResults = search.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/product?q=${encodeURIComponent(search.trim())}`);
      setSearchFocused(false);
    } else {
      navigate("/product");
    }
  };

  const handleSelectSuggestion = (product) => {
    navigate(`/product/${product.id}`);
    setSearchFocused(false);
  };

  return (
    <>
      {/* Top Announcement Bar - Optimized for Mobile & Desktop */}
      {bannerVisible && (
        <div className="bg-gray-950 text-gray-300 text-[11px] sm:text-xs py-2 px-3 sm:px-4 border-b border-gray-800/80 select-none overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            {/* Mobile View */}
            <div className="flex sm:hidden items-center justify-between w-full">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="bg-blue-600 text-white font-extrabold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider shrink-0">
                  Sale
                </span>
                <span className="text-[11px] text-gray-200 truncate">
                  ⚡ 10% OFF with code
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="bg-gray-800 hover:bg-gray-700 text-amber-300 font-mono font-bold text-[10px] px-2 py-0.5 rounded border border-gray-700 active:scale-95 transition shrink-0 cursor-pointer"
                  title="Click to copy code"
                >
                  {copiedCode ? "Copied! ✓" : "ECART10"}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setBannerVisible(false)}
                aria-label="Dismiss banner"
                className="text-gray-400 hover:text-white p-1 text-xs shrink-0 cursor-pointer"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>

            {/* Tablet & Desktop View */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                Special Offer
              </span>
              <span className="text-gray-200">
                ⚡ Flash Sale: Get 10% OFF on all tech gear with coupon{" "}
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="bg-gray-800 hover:bg-gray-700 text-amber-300 font-mono font-bold text-xs px-2 py-0.5 rounded border border-gray-700 ml-1 inline-flex items-center gap-1 cursor-pointer active:scale-95 transition"
                  title="Click to copy coupon code"
                >
                  <span>ECART10</span>
                  <i
                    className={`bi ${
                      copiedCode ? "bi-check2 text-emerald-400" : "bi-copy"
                    }`}
                  ></i>
                </button>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-gray-400 text-xs">
              <span className="flex items-center gap-1">
                <i className="bi bi-truck text-blue-400"></i> Free Express Delivery on ₹999+
              </span>
              <span className="text-gray-700">|</span>
              <a
                href="tel:+919876543210"
                className="hover:text-white transition flex items-center gap-1"
              >
                <i className="bi bi-telephone-fill text-emerald-400"></i> +91 98765 43210
              </a>
              <button
                type="button"
                onClick={() => setBannerVisible(false)}
                aria-label="Dismiss banner"
                className="text-gray-500 hover:text-white ml-2 text-sm cursor-pointer"
              >
                <i className="bi bi-x-lg text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 shrink-0 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <i className="bi bi-bag-check-fill text-lg"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 leading-none">
                  e<span className="text-blue-600">-Cart</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                  Tech Store
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-gray-700">
              <Link
                to="/"
                className={`transition-colors py-1 hover:text-blue-600 ${
                  location.pathname === "/" ? "text-blue-600 font-bold" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/product"
                className={`transition-colors py-1 hover:text-blue-600 ${
                  location.pathname === "/product" ? "text-blue-600 font-bold" : ""
                }`}
              >
                Products
              </Link>
              <Link
                to="/trends"
                className={`transition-colors py-1 flex items-center gap-1.5 hover:text-blue-600 ${
                  location.pathname === "/trends" ? "text-blue-600 font-bold" : ""
                }`}
              >
                <span>Trends</span>
                <span className="bg-rose-100 text-rose-600 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  HOT
                </span>
              </Link>
              <Link
                to="/order?tab=history"
                className={`transition-colors py-1 hover:text-blue-600 ${
                  location.pathname === "/order" ? "text-blue-600 font-bold" : ""
                }`}
              >
                My Orders
              </Link>

              {/* Categories Dropdown */}
              <div className="relative" ref={catMenuRef}>
                <button
                  type="button"
                  onClick={() => setCategoryDropdown(!categoryDropdown)}
                  className="flex items-center gap-1 hover:text-blue-600 py-1 transition-colors focus:outline-none cursor-pointer"
                >
                  <span>Categories</span>
                  <i
                    className={`bi bi-chevron-down text-xs transition-transform duration-200 ${
                      categoryDropdown ? "rotate-180" : ""
                    }`}
                  ></i>
                </button>

                {categoryDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-fade-in">
                    {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/product?category=${cat.id}`}
                        onClick={() => setCategoryDropdown(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-blue-600">
                          <i className={`bi ${cat.icon}`}></i>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{cat.name}</p>
                          <p className="text-xs text-gray-400">
                            {cat.count} Items
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Live Search Bar */}
            <div
              ref={searchRef}
              className="relative flex-1 max-w-md hidden md:block"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search OTG, USB hubs, speakers, wearables..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full pl-10 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <i className="bi bi-x-circle-fill text-sm"></i>
                  </button>
                )}
              </form>

              {/* Live Search Dropdown Suggestions */}
              {searchFocused && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-2 border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3">
                    Matching Products
                  </div>
                  <div className="divide-y divide-gray-50">
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectSuggestion(item)}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-contain rounded-lg bg-gray-50 p-1"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-blue-600 font-bold">
                            ₹{item.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={`/product?q=${encodeURIComponent(search)}`}
                    onClick={() => setSearchFocused(false)}
                    className="block p-2.5 text-center text-xs font-semibold text-blue-600 hover:bg-blue-50 transition border-t border-gray-100"
                  >
                    View all matching results <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              )}
            </div>

            {/* Right Action Icons & Auth */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Wishlist Button */}
              <Link
                to="/product?filter=wishlist"
                aria-label="Wishlist"
                className="relative p-2.5 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition duration-200"
              >
                <i className="bi bi-heart text-xl"></i>
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <Link
                to="/cart"
                aria-label="Shopping Cart"
                className="relative p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition duration-200"
              >
                <i className="bi bi-cart3 text-xl"></i>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Authentication Menu */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdown(!userDropdown)}
                    className="flex items-center gap-2 p-1.5 pl-2 pr-3 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition focus:outline-none cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                      {user.name ? user.name.charAt(0) : "U"}
                    </div>
                    <span className="text-xs font-semibold text-gray-800 hidden sm:inline max-w-[80px] truncate">
                      {user.name || "User"}
                    </span>
                    <i className="bi bi-chevron-down text-[10px] text-gray-500"></i>
                  </button>

                  {userDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-bold text-gray-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/order?tab=history"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        <i className="bi bi-clock-history text-blue-600"></i> My Orders & Tracking
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdown(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition"
                      >
                        <i className="bi bi-box-arrow-right"></i> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl transition duration-200 shadow-sm hover:shadow-blue-500/20 active:scale-95 flex items-center gap-1.5"
                >
                  <i className="bi bi-person"></i>
                  <span className="hidden sm:inline">Login</span>
                </Link>
              )}

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-xl transition cursor-pointer"
              >
                <i
                  className={`bi text-2xl ${
                    mobileMenuOpen ? "bi-x-lg" : "bi-list"
                  }`}
                ></i>
              </button>
            </div>
          </div>

          {/* Mobile Search Input */}
          <div className="pb-3 md:hidden">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search OTG, USB hubs, audio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <i className="bi bi-x-circle-fill text-xs"></i>
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 shadow-xl px-4 py-4 space-y-4 animate-fade-in">
            <nav className="flex flex-col gap-2 font-medium text-sm text-gray-700">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 hover:text-blue-600"
              >
                <i className="bi bi-house-door text-lg text-blue-600"></i> Home
              </Link>
              <Link
                to="/product"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 hover:text-blue-600"
              >
                <i className="bi bi-grid text-lg text-blue-600"></i> All Products ({PRODUCTS.length})
              </Link>
              <Link
                to="/trends"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 hover:text-blue-600"
              >
                <div className="flex items-center gap-3">
                  <i className="bi bi-fire text-lg text-amber-500"></i> Trending Deals
                </div>
                <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  HOT
                </span>
              </Link>
              <Link
                to="/order?tab=history"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 hover:text-blue-600"
              >
                <i className="bi bi-clock-history text-lg text-blue-600"></i> My Orders
              </Link>
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 hover:text-blue-600"
              >
                <div className="flex items-center gap-3">
                  <i className="bi bi-cart text-lg text-blue-600"></i> Cart
                </div>
                {cartCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </nav>

            {/* Mobile Categories Accordion */}
            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
                Popular Categories
              </p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/product?category=${cat.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <i className={`bi ${cat.icon} text-blue-600`}></i>
                    <span className="truncate">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth Button in Mobile Menu */}
            <div className="pt-2 border-t border-gray-100">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-red-50 text-red-600 font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <i className="bi bi-box-arrow-right"></i> Sign Out ({user.name})
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 text-white font-semibold text-xs text-center shadow-sm"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-800 font-semibold text-xs text-center"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
