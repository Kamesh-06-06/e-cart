import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, getTrendingProducts } from "./data/products";
import ProductCard from "./components/ProductCard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Toast from "./components/Toast";
import QuickViewModal from "./components/QuickViewModal";
import ScrollToTop from "./components/ScrollToTop";

function Trends() {
  const [selectedTab, setSelectedTab] = useState("all");

  const trendingList = useMemo(() => {
    const list = getTrendingProducts();
    if (selectedTab === "wearables") {
      return list.filter((p) => p.category === "Wearables");
    }
    if (selectedTab === "audio") {
      return list.filter((p) => p.category === "Audio");
    }
    if (selectedTab === "deals") {
      return list.filter((p) => p.originalPrice && p.price < p.originalPrice * 0.75);
    }
    return list;
  }, [selectedTab]);

  return (
    <div className="min-h-screen bg-gray-50/60 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Banner for Trends */}
        <section className="bg-gradient-to-r from-gray-950 via-blue-950 to-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-full mb-3">
                🔥 Hot & Trending This Week
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Top Trending Tech & Best Sellers 2026
              </h1>
              <p className="mt-3 text-sm sm:text-base text-gray-300">
                Discover the gadgets our customers are loving right now. High customer ratings, exclusive discounts, and limited-stock deals.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Filter Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedTab("all")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  selectedTab === "all"
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                All Trending ({getTrendingProducts().length})
              </button>

              <button
                onClick={() => setSelectedTab("wearables")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  selectedTab === "wearables"
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Smartwatches & Fitness
              </button>

              <button
                onClick={() => setSelectedTab("audio")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  selectedTab === "audio"
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Audio & Earphones
              </button>

              <button
                onClick={() => setSelectedTab("deals")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  selectedTab === "deals"
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Flash Discounts (30%+ OFF)
              </button>
            </div>

            <Link
              to="/product"
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Explore All Products</span>
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {trendingList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>

      <Footer />
      <Toast />
      <QuickViewModal />
      <ScrollToTop />
    </div>
  );
}

export default Trends;
