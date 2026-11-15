import { useContext, useEffect } from "react";
import { CartContext } from "../CartContext";

export default function Toast() {
  const { toast, closeToast } = useContext(CartContext);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      closeToast();
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast, closeToast]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm w-full transition-all duration-300">
      <div
        className={`flex items-center gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md text-sm font-medium ${
          isSuccess
            ? "bg-gray-900/95 text-white border-blue-500/30"
            : isError
            ? "bg-red-900/95 text-white border-red-500/30"
            : "bg-gray-900/95 text-white border-gray-700"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            isSuccess
              ? "bg-emerald-500/20 text-emerald-400"
              : isError
              ? "bg-red-500/20 text-red-400"
              : "bg-blue-500/20 text-blue-400"
          }`}
        >
          <i
            className={`bi ${
              isSuccess
                ? "bi-check-circle-fill text-lg"
                : isError
                ? "bi-exclamation-triangle-fill text-lg"
                : "bi-info-circle-fill text-lg"
            }`}
          ></i>
        </div>

        <p className="flex-1 leading-snug">{toast.message}</p>

        <button
          onClick={closeToast}
          aria-label="Close notification"
          className="text-gray-400 hover:text-white p-1 rounded-lg transition"
        >
          <i className="bi bi-x text-xl"></i>
        </button>
      </div>
    </div>
  );
}
