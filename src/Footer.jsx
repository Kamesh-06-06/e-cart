import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-10 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                <i className="bi bi-bag-check-fill text-lg"></i>
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                e<span className="text-blue-500">-Cart</span>
              </span>
            </Link>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Your premier destination for high-performance audio gear, smart wearables, fast memory storage, and modern tech accessories.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/kamesh._.6/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-gray-900 hover:bg-rose-600 text-gray-300 hover:text-white flex items-center justify-center transition"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://linkedin.com/in/kameshkamalakannan"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-gray-900 hover:bg-blue-600 text-gray-300 hover:text-white flex items-center justify-center transition"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="https://github.com/Kamesh-06-06"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-gray-900 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center transition"
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href="mailto:support@ecart.com"
                aria-label="Email"
                className="w-9 h-9 rounded-xl bg-gray-900 hover:bg-emerald-600 text-gray-300 hover:text-white flex items-center justify-center transition"
              >
                <i className="bi bi-envelope-fill"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/product" className="hover:text-white transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/trends" className="hover:text-white transition">
                  Trending Deals
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/order?tab=history" className="hover:text-white transition">
                  Track Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/product?category=Wearables"
                  className="hover:text-white transition"
                >
                  Smartwatches
                </Link>
              </li>
              <li>
                <Link
                  to="/product?category=Audio"
                  className="hover:text-white transition"
                >
                  Audio & Headphones
                </Link>
              </li>
              <li>
                <Link
                  to="/product?category=Storage"
                  className="hover:text-white transition"
                >
                  Flash Drives & Storage
                </Link>
              </li>
              <li>
                <Link
                  to="/product?category=Accessories"
                  className="hover:text-white transition"
                >
                  OTG & Accessories
                </Link>
              </li>
              <li>
                <Link to="/trends" className="hover:text-white transition">
                  Flash Sales
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support & Security */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#help" className="hover:text-white transition">
                  Help Center & FAQ
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-white transition">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-white transition">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} e-Cart Store. All Rights Reserved.</p>

          {/* Payment Icons */}
          <div className="flex items-center gap-3 text-lg text-gray-400">
            <span className="text-xs text-gray-500 mr-1">Payment Partners:</span>
            <i className="bi bi-credit-card-2-front" title="Card"></i>
            <i className="bi bi-wallet2" title="Wallets"></i>
            <i className="bi bi-shield-check text-emerald-500" title="Secure"></i>
          </div>

          <p>
            Developed with ❤️ by{" "}
            <a
              href="https://github.com/Kamesh-06-06"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline font-semibold"
            >
              Kamesh
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
