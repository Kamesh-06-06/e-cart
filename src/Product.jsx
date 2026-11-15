import { useContext, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CartContext } from "./CartContext";
import { PRODUCTS, CATEGORIES } from "./data/products";
import ProductCard from "./components/ProductCard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Toast from "./components/Toast";
import QuickViewModal from "./components/QuickViewModal";
import ScrollToTop from "./components/ScrollToTop";

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search, setSearch, wishlist } = useContext(CartContext);

  // Sync category or query from URL query params
  const categoryParam = searchParams.get("category") || "all";
  const filterParam = searchParams.get("filter") || "";
  const queryParam = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showWishlistOnly, setShowWishlistOnly] = useState(
    filterParam === "wishlist"
  );
  const [isLoading, setIsLoading] = useState(false);

  // Sync state if URL query params change
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (filterParam === "wishlist") {
      setShowWishlistOnly(true);
    } else {
      setShowWishlistOnly(false);
    }
    if (queryParam) {
      setSearch(queryParam);
    }
  }, [categoryParam, filterParam, queryParam, setSearch]);

  // Handle category change
  const handleCategoryChange = (catId) => {
    setIsLoading(true);
    setSelectedCategory(catId);
    setShowWishlistOnly(false);
    if (catId === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", catId);
    }
    searchParams.delete("filter");
    setSearchParams(searchParams);
    setTimeout(() => setIsLoading(false), 200);
  };

  // Filtered and sorted products calculation
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Wishlist only filter
    if (showWishlistOnly) {
      const wishlistIds = wishlist.map((w) => w.id);
      result = result.filter((p) => wishlistIds.includes(p.id));
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query
    const activeSearch = (search || queryParam || "").trim().toLowerCase();
    if (activeSearch) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(activeSearch) ||
          p.category.toLowerCase().includes(activeSearch) ||
          (p.description && p.description.toLowerCase().includes(activeSearch))
      );
    }

    // Price range filter
    if (selectedPriceRange === "under1000") {
      result = result.filter((p) => p.price < 1000);
    } else if (selectedPriceRange === "1000to3000") {
      result = result.filter((p) => p.price >= 1000 && p.price <= 3000);
    } else if (selectedPriceRange === "3000to5000") {
      result = result.filter((p) => p.price > 3000 && p.price <= 5000);
    } else if (selectedPriceRange === "above5000") {
      result = result.filter((p) => p.price > 5000);
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [
    selectedCategory,
    selectedPriceRange,
    sortBy,
    search,
    queryParam,
    showWishlistOnly,
    wishlist,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedPriceRange("all");
    setSortBy("featured");
    setShowWishlistOnly(false);
    setSearch("");
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedPriceRange !== "all" ||
    sortBy !== "featured" ||
    showWishlistOnly ||
    Boolean(search.trim());

  return (
    <div className="min-h-screen bg-gray-50/60 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Page Header / Breadcrumbs */}
        <section className="bg-white border-b border-gray-100 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <span>Home</span>
                <i className="bi bi-chevron-right text-[10px]"></i>
                <span className="text-gray-900 font-medium">
                  {showWishlistOnly ? "My Wishlist" : "Products"}
                </span>
                {selectedCategory !== "all" && (
                  <>
                    <i className="bi bi-chevron-right text-[10px]"></i>
                    <span className="text-blue-600 font-semibold">
                      {selectedCategory}
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {showWishlistOnly
                  ? "Saved In Wishlist ❤️"
                  : selectedCategory !== "all"
                  ? `${selectedCategory} Collection`
                  : "Explore All Products"}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Discover our curated selection of high-performance tech and gadgets.
              </p>
            </div>

            {/* Quick stats & Clear filter button */}
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-xl">
                Showing {filteredProducts.length} Products
              </span>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition flex items-center gap-1 cursor-pointer"
                >
                  <i className="bi bi-arrow-counterclockwise"></i> Reset Filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Filters and Product Catalog Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter Bar Controls */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-100 mb-8 space-y-4">
            {/* Category Pills Slider */}
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                Categories
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {CATEGORIES.map((cat) => {
                  const isActive =
                    !showWishlistOnly && selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition flex items-center gap-2 cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <i className={`bi ${cat.icon}`}></i>
                      <span>{cat.name}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}

                {/* Wishlist filter pill */}
                <button
                  onClick={() => setShowWishlistOnly(!showWishlistOnly)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition flex items-center gap-2 cursor-pointer ${
                    showWishlistOnly
                      ? "bg-rose-500 text-white shadow-sm shadow-rose-500/25"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <i className="bi bi-heart-fill text-rose-500"></i>
                  <span>Wishlist</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      showWishlistOnly
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {wishlist.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Secondary Filters: Price & Sorting */}
            <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              {/* Price Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">
                  Price:
                </span>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="bg-gray-50 border border-gray-200 text-gray-800 text-xs sm:text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">All Prices</option>
                  <option value="under1000">Under ₹1,000</option>
                  <option value="1000to3000">₹1,000 – ₹3,000</option>
                  <option value="3000to5000">₹3,000 – ₹5,000</option>
                  <option value="above5000">Above ₹5,000</option>
                </select>
              </div>

              {/* Sort By Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-200 text-gray-800 text-xs sm:text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="featured">Featured / Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name-asc">Alphabetical: A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Search Badge */}
          {search && (
            <div className="mb-6 flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2.5 rounded-xl text-xs sm:text-sm text-blue-900">
              <i className="bi bi-search text-blue-600"></i>
              <span>
                Search results for: <strong>"{search}"</strong>
              </span>
              <button
                onClick={() => setSearch("")}
                className="ml-auto text-blue-600 hover:text-blue-800 font-bold"
              >
                Clear
              </button>
            </div>
          )}

          {/* Loading Skeletons */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse space-y-4"
                >
                  <div className="w-full aspect-square bg-gray-200 rounded-xl"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-10 bg-gray-200 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 text-3xl">
                <i className="bi bi-search"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                No Products Found
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                We couldn't find any products matching your current search or filter criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition shadow-md cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            /* Product Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
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

export default Product;
