import {useEffect} from "react";
import ecartLogo from "/src/assets/eCart-icon.PNG";

function Loading({onFinish}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      {/* Logo */}
      <img
        src={ecartLogo}
        alt="e-Cart"
        className="w-28 h-28 object-contain animate-pulse"
      />

      {/* Website Name */}
      <h1 className="text-4xl font-bold mt-4">
        <span className="text-blue-600">e</span>-Cart
      </h1>

      <p className="text-gray-500 mt-2">Your shopping starts here...</p>

      {/* Loading Spinner */}
      <div className="mt-6 w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
