import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
import Testimonial from "./Testimonial";
import Loading from "./Loading";
import ProductCard from "./components/ProductCard";
import Toast from "./components/Toast";
import QuickViewModal from "./components/QuickViewModal";
import ScrollToTop from "./components/ScrollToTop";
import { CATEGORIES, getTrendingProducts, getBestSellingProducts } from "./data/products";
import { CartContext } from "./CartContext";

function App() {
  const [loading, setLoading] = useState(true);
  const { showToast } = useContext(CartContext);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Flash Sale Countdown Timer (Hours, Minutes, Seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    setNewsletterSubscribed(true);
    showToast("🎉 Thank you for subscribing! Your 15% discount code is ECART15", "success");
    setNewsletterEmail("");
  };

  if (loading) {
    return <Loading onFinish={() => setLoading(false)} />;
  }

  const trendingProducts = getTrendingProducts().slice(0, 4);
  const bestSellers = getBestSellingProducts().slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50/60 flex flex-col justify-between overflow-x-hidden">
      <div>
        {/* Sticky Navbar */}
        <Navbar />

        {/* Hero Section with Auto-rotation and interactive CTA */}
        <Hero />

        {/* Trust & Value Proposition Banners */}
        <section className="bg-white border-b border-gray-100 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-gray-50 transition">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl shrink-0">
                <i className="bi bi-truck"></i>
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-gray-900">
                  Free Express Shipping
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-400">
                  On all orders over ₹999
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-gray-50 transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shrink-0">
                <i className="bi bi-shield-check"></i>
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-gray-900">
                  1-Year Brand Warranty
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-400">
                  100% genuine guaranteed
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-gray-50 transition">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl shrink-0">
                <i className="bi bi-arrow-repeat"></i>
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-gray-900">
                  7 Days Easy Replacement
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-400">
                  Hassle-free return policy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-gray-50 transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl shrink-0">
                <i className="bi bi-headset"></i>
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-gray-900">
                  24/7 Dedicated Support
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-400">
                  Live phone & email assistance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Browse Collections
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
                Featured Categories
              </h2>
            </div>
            <Link
              to="/product"
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition"
            >
              <span>View All Categories</span>
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
              <Link
                key={cat.id}
                to={`/product?category=${cat.id}`}
                className="group relative bg-white rounded-3xl p-5 border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center overflow-hidden hover:-translate-y-1.5"
              >
                <div className="w-full h-36 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {cat.count} Items Available
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Products Showcase */}
        <section className="bg-white py-12 sm:py-16 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                  🔥 Trending Now
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
                  Most Popular Gadgets
                </h2>
              </div>
              <Link
                to="/trends"
                className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition"
              >
                <span>Explore All Trending</span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Special Offers & Flash Deals Banner with Live Countdown Timer */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="relative rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-gray-900 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-xl">
              <span className="bg-amber-400 text-gray-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-4 shadow-sm">
                ⚡ Limited Time Flash Sale
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Save Up To 45% On Next-Gen Smartwatches
              </h2>
              <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed">
                Upgrade your wrist with high-precision biometrics, AMOLED displays, and extended battery endurance before the deal expires.
              </p>

              {/* Countdown Timer Blocks */}
              <div className="mt-6 flex items-center gap-3">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 text-center min-w-[70px]">
                  <span className="block text-2xl sm:text-3xl font-black font-mono">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-blue-200">
                    Hours
                  </span>
                </div>
                <span className="text-2xl font-bold">:</span>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 text-center min-w-[70px]">
                  <span className="block text-2xl sm:text-3xl font-black font-mono">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-blue-200">
                    Mins
                  </span>
                </div>
                <span className="text-2xl font-bold">:</span>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 text-center min-w-[70px]">
                  <span className="block text-2xl sm:text-3xl font-black font-mono text-amber-400">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-blue-200">
                    Secs
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 flex items-center gap-4">
                <Link
                  to="/product?category=Wearables"
                  className="bg-white hover:bg-gray-100 text-gray-900 font-bold text-sm sm:text-base px-8 py-3.5 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  Shop Flash Sale Now
                </Link>
                <Link
                  to="/trends"
                  className="text-white hover:text-blue-200 font-semibold text-sm sm:text-base underline underline-offset-4"
                >
                  View All Offers
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Best-Selling Products Section */}
        <section className="bg-gray-50/50 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  Verified Top Rated
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
                  Best-Selling Products
                </h2>
              </div>
              <Link
                to="/product"
                className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition"
              >
                <span>View Full Catalog</span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Customer Testimonials Section */}
        <Testimonial />

        {/* Newsletter Subscription Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-gray-800 text-center relative overflow-hidden">
            <div className="max-w-xl mx-auto relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto text-2xl mb-4 border border-blue-500/20">
                <i className="bi bi-envelope-heart-fill"></i>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                Unlock 15% Off Your First Order
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                Join our VIP newsletter for private product drops, secret discounts, and early access to tech sales.
              </p>

              {newsletterSubscribed ? (
                <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center justify-center gap-2">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>You're subscribed! Use coupon code <strong>ECART15</strong> at checkout.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-4 py-3.5 bg-gray-800/80 border border-gray-700 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-600/30 transition active:scale-95 cursor-pointer shrink-0"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}

              <p className="text-[11px] text-gray-500 mt-3">
                No spam ever. Unsubscribe with one click at any time.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <Toast />
      <QuickViewModal />
      <ScrollToTop />
    </div>
  );
}

export default App;
