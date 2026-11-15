import { useEffect } from "react";
import ecartLogo from "./assets/eCart-icon.PNG";

function Loading({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 700);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 transition-opacity duration-300">
      {/* Brand Icon */}
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-2xl shadow-blue-500/30 animate-pulse">
        <i className="bi bi-bag-check-fill text-3xl"></i>
      </div>

      {/* Website Name */}
      <h1 className="text-3xl font-black mt-4 text-gray-900 tracking-tight">
        e<span className="text-blue-600">-Cart</span>
      </h1>

      <p className="text-xs text-gray-400 font-medium tracking-wide mt-1">
        Next-Gen Electronics & Lifestyle
      </p>

      {/* Loading Spinner */}
      <div className="mt-6 w-8 h-8 border-3 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
