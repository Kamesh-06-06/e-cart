import { useRouteError, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-xl mx-auto px-4 py-16 sm:py-24 text-center">
        <div className="w-24 h-24 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-4xl mb-6 shadow-inner">
          <i className="bi bi-compass"></i>
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          404 - Page Not Found
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 tracking-tight">
          Oops! We Can't Find That Page
        </h1>

        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          {error?.statusText ||
            error?.message ||
            "The page you're looking for might have been moved, renamed, or doesn't exist."}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition"
          >
            Return to Homepage
          </Link>
          <Link
            to="/product"
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold text-sm px-6 py-3 rounded-xl transition"
          >
            Explore Catalog
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ErrorPage;
