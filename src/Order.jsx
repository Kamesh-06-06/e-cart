import { useLocation, useNavigate, Link, useSearchParams } from "react-router-dom";
import { useState, useContext, useEffect, useMemo } from "react";
import { CartContext } from "./CartContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Toast from "./components/Toast";
import ScrollToTop from "./components/ScrollToTop";
import defaultIcon from "./assets/eCart-icon.PNG";

// Normalizes order objects from any historical or current format
function normalizeOrder(order, index) {
  if (!order) return null;

  // Extract items array
  const rawItems =
    order.items && Array.isArray(order.items) && order.items.length > 0
      ? order.items
      : order.product
      ? [order.product]
      : [];

  const items = rawItems.map((item, i) => ({
    id: item.id || `item-${i}`,
    name: item.name || "Gadget Item",
    price: Number(item.price) || 0,
    image: item.image || "/src/assets/eCart-icon.PNG",
    quantity: Number(item.quantity) || 1,
  }));

  // Calculate or extract total amount
  const totalAmount =
    order.totalAmount ??
    order.total ??
    order.product?.totalPrice ??
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Normalize order ID
  const orderId =
    order.orderId ||
    order.id ||
    `ORD-${100000 + (index !== undefined ? index * 13 : Math.floor(Math.random() * 90000))}`;

  // Normalize creation date
  const rawDate = order.createdAt || order.date;
  let formattedDate = "Recently Placed";
  if (rawDate && !isNaN(new Date(rawDate).getTime())) {
    formattedDate = new Date(rawDate).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Normalize customer details
  const customer = {
    name:
      order.customer?.name ||
      (typeof order.customer === "string" ? order.customer : "Valued Customer"),
    phone: order.customer?.phone || "N/A",
    address: order.customer?.address || "Address on File",
    city: order.customer?.city || "",
    pincode: order.customer?.pincode || "",
  };

  const status = order.status || "Confirmed";
  const paymentMethod = order.paymentMethod || "cod";

  return {
    ...order,
    orderId,
    formattedDate,
    items,
    totalAmount,
    customer,
    status,
    paymentMethod,
  };
}

function Order() {
  const { state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { removeItemFromCart, clearCart, addToCart, showToast, user } =
    useContext(CartContext);

  // Tab: 'checkout' or 'history'
  // If state is passed, default to checkout; otherwise default to history
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(
    tabParam || (state ? "checkout" : "history")
  );

  // Order history loaded from localStorage
  const [orders, setOrders] = useState([]);
  const [orderSearchQuery, setOrderSearchQuery] = useState("");

  const loadOrders = () => {
    try {
      const stored =
        JSON.parse(localStorage.getItem("ecart_orders")) ||
        JSON.parse(localStorage.getItem("orders")) ||
        [];
      const normalized = stored
        .map((o, idx) => normalizeOrder(o, idx))
        .filter(Boolean);
      setOrders(normalized);
    } catch {
      setOrders([]);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Sync tab with URL search parameter
  useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab === "history" || currentTab === "checkout") {
      setActiveTab(currentTab);
    } else if (!state) {
      setActiveTab("history");
    }
  }, [searchParams, state]);

  const switchTab = (tab) => {
    setActiveTab(tab);
    searchParams.set("tab", tab);
    setSearchParams(searchParams);
  };

  // Checkout form state
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "cod",
  });

  const [qty, setQty] = useState(state?.quantity || state?.qty || 1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderData, setPlacedOrderData] = useState(null);

  const isCartOrder = Boolean(state?.isCartOrder);
  const singleProduct = !isCartOrder ? state : null;

  const totalPrice = isCartOrder
    ? state.total
    : (singleProduct?.price || 0) * qty;

  const handleQtyChange = (delta) => {
    setQty((prev) => Math.max(1, prev + delta));
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      showToast("Please fill in all required shipping fields", "error");
      return;
    }

    const newOrderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const orderItems = isCartOrder
      ? state.cartItems
      : [
          {
            id: singleProduct.id,
            name: singleProduct.name,
            price: singleProduct.price,
            image: singleProduct.image,
            quantity: qty,
            totalPrice: totalPrice,
          },
        ];

    const newOrderRaw = {
      orderId: newOrderId,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
      customer: form,
      paymentMethod: form.paymentMethod,
      totalAmount: totalPrice,
      items: orderItems,
    };

    const newOrder = normalizeOrder(newOrderRaw, orders.length);

    // Save to localStorage
    try {
      const existing =
        JSON.parse(localStorage.getItem("ecart_orders")) ||
        JSON.parse(localStorage.getItem("orders")) ||
        [];
      const updated = [newOrder, ...existing];
      localStorage.setItem("ecart_orders", JSON.stringify(updated));
      localStorage.setItem("orders", JSON.stringify(updated));
      setOrders(updated);
    } catch (err) {
      console.error("Order storage error:", err);
    }

    // Clean up cart
    if (isCartOrder) {
      clearCart();
    } else if (singleProduct?.id) {
      removeItemFromCart(singleProduct.id);
    }

    setPlacedOrderData(newOrder);
    setOrderPlaced(true);
    showToast("🎉 Order placed successfully!", "success");
  };

  // Re-order past order items
  const handleReorder = (order) => {
    if (order.items && order.items.length > 0) {
      order.items.forEach((item) => {
        addToCart(item, item.quantity || 1);
      });
      showToast(`Items from order ${order.orderId} added to cart! 🛒`, "success");
      navigate("/cart");
    }
  };

  // Cancel order
  const handleCancelOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to cancel order ${orderId}?`)) {
      const updated = orders.map((o) =>
        o.orderId === orderId ? { ...o, status: "Cancelled" } : o
      );
      setOrders(updated);
      localStorage.setItem("ecart_orders", JSON.stringify(updated));
      localStorage.setItem("orders", JSON.stringify(updated));
      showToast(`Order ${orderId} has been cancelled.`, "info");
    }
  };

  // Filter orders by search
  const filteredOrders = useMemo(() => {
    if (!orderSearchQuery.trim()) return orders;
    const query = orderSearchQuery.toLowerCase();
    return orders.filter(
      (o) =>
        o.orderId?.toLowerCase().includes(query) ||
        o.customer?.name?.toLowerCase().includes(query) ||
        o.items?.some((i) => i.name?.toLowerCase().includes(query))
    );
  }, [orders, orderSearchQuery]);

  // Order Confirmation Screen
  if (orderPlaced && placedOrderData) {
    return (
      <div className="min-h-screen bg-gray-50/60 flex flex-col justify-between">
        <Navbar />
        <main className="max-w-xl mx-auto px-4 py-12 sm:py-20 text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xl animate-fade-in">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-4xl mb-5 shadow-inner">
              <i className="bi bi-check2-circle"></i>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Order Confirmed & Processing
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
              Thank You For Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Your order is placed. A confirmation SMS with tracking details will be sent to{" "}
              <strong>{placedOrderData.customer?.phone}</strong>.
            </p>

            <div className="my-6 p-5 bg-gray-50 rounded-2xl border border-gray-100 text-left text-xs sm:text-sm space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-mono font-bold text-gray-900 bg-white px-2 py-0.5 rounded border">
                  {placedOrderData.orderId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium text-gray-800">
                  {placedOrderData.formattedDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Amount:</span>
                <span className="font-extrabold text-blue-600">
                  ₹{placedOrderData.totalAmount?.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment:</span>
                <span className="font-semibold uppercase text-gray-800">
                  {placedOrderData.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : placedOrderData.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Address:</span>
                <span className="font-semibold text-gray-800 truncate max-w-[200px]">
                  {placedOrderData.customer?.address},{" "}
                  {placedOrderData.customer?.city}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setOrderPlaced(false);
                  navigate("/order?tab=history", { replace: true, state: null });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="bi bi-clock-history"></i>
                <span>View All My Orders</span>
              </button>

              <Link
                to="/product"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm px-6 py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                <i className="bi bi-bag"></i>
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
        <Toast />
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/60 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Page Top Header with Tab Switcher */}
        <section className="bg-white border-b border-gray-100 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {activeTab === "checkout" && state
                  ? "Checkout & Shipping"
                  : "My Orders & Tracking"}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {activeTab === "checkout" && state
                  ? "Enter your delivery details to complete your order"
                  : "Track, manage, and review all your previous purchases"}
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-2xl">
              {state && (
                <button
                  onClick={() => switchTab("checkout")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
                    activeTab === "checkout"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <i className="bi bi-credit-card-2-front"></i>
                  <span>Checkout</span>
                </button>
              )}

              <button
                onClick={() => switchTab("history")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
                  activeTab === "history" || !state
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <i className="bi bi-clock-history"></i>
                <span>Order History ({orders.length})</span>
              </button>
            </div>
          </div>
        </section>

        {/* TAB 1: ORDER HISTORY & TRACKING */}
        {(activeTab === "history" || !state) && (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search Orders Bar */}
            {orders.length > 0 && (
              <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
                <div className="relative w-full sm:w-80">
                  <input
                    type="text"
                    placeholder="Search by Order ID or item..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
                  />
                  <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                </div>

                <div className="text-xs text-gray-500 font-medium">
                  Showing <strong>{filteredOrders.length}</strong> of{" "}
                  <strong>{orders.length}</strong> orders
                </div>
              </div>
            )}

            {/* Empty State */}
            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 sm:p-16 text-center border border-gray-100 shadow-xs max-w-lg mx-auto">
                <div className="w-24 h-24 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-4xl mb-4 shadow-inner">
                  <i className="bi bi-bag-x"></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  No Orders Placed Yet
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                  You haven't placed any orders yet. Discover our top trending OTG adapters, USB hubs, Bluetooth speakers, and audio gear today!
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/product"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-md"
                  >
                    Start Shopping Now
                  </Link>
                  <Link
                    to="/trends"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition"
                  >
                    View Trending Deals
                  </Link>
                </div>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-xs max-w-md mx-auto">
                <i className="bi bi-search text-3xl text-gray-400 mb-2 block"></i>
                <h4 className="font-bold text-base text-gray-800">
                  No orders match "{orderSearchQuery}"
                </h4>
                <button
                  onClick={() => setOrderSearchQuery("")}
                  className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
                >
                  Clear search query
                </button>
              </div>
            ) : (
              /* Order List Cards */
              <div className="space-y-6">
                {filteredOrders.map((order) => {
                  const isCancelled = order.status === "Cancelled";

                  return (
                    <div
                      key={order.orderId}
                      className="bg-white rounded-3xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow overflow-hidden"
                    >
                      {/* Order Card Header */}
                      <div className="bg-gray-50/70 p-4 sm:p-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs sm:text-sm font-bold text-gray-900 bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                            {order.orderId}
                          </span>
                          <span className="text-xs text-gray-500">
                            Placed on {order.formattedDate}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                              isCancelled
                                ? "bg-red-50 text-red-600"
                                : "bg-emerald-50 text-emerald-600"
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isCancelled ? "bg-red-500" : "bg-emerald-500 animate-pulse"
                              }`}
                            ></span>
                            {order.status || "Confirmed"}
                          </span>

                          <span className="text-xs text-gray-600 font-bold uppercase bg-white px-2.5 py-1 rounded-lg border">
                            {order.paymentMethod === "cod"
                              ? "Cash On Delivery"
                              : order.paymentMethod}
                          </span>
                        </div>
                      </div>

                      {/* Visual Order Progress Tracker */}
                      {!isCancelled && (
                        <div className="px-5 py-4 border-b border-gray-100 bg-white/50">
                          <div className="max-w-2xl mx-auto flex items-center justify-between text-center relative">
                            {/* Line connecting steps */}
                            <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-gray-100 z-0">
                              <div className="h-full bg-emerald-500 w-1/3"></div>
                            </div>

                            <div className="relative z-10 flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                <i className="bi bi-check-lg"></i>
                              </div>
                              <span className="text-[11px] font-bold text-gray-900 mt-1">
                                Placed
                              </span>
                            </div>

                            <div className="relative z-10 flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm animate-pulse">
                                <i className="bi bi-box-seam"></i>
                              </div>
                              <span className="text-[11px] font-bold text-blue-600 mt-1">
                                Processing
                              </span>
                            </div>

                            <div className="relative z-10 flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-bold">
                                <i className="bi bi-truck"></i>
                              </div>
                              <span className="text-[11px] font-medium text-gray-400 mt-1">
                                Shipped
                              </span>
                            </div>

                            <div className="relative z-10 flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-bold">
                                <i className="bi bi-house-check"></i>
                              </div>
                              <span className="text-[11px] font-medium text-gray-400 mt-1">
                                Delivered
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Items Ordered List */}
                      <div className="p-5 sm:p-6 divide-y divide-gray-100">
                        {order.items?.map((item, i) => (
                          <div
                            key={item.id || i}
                            className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-4"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-gray-50 p-2 border border-gray-100 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-sm sm:text-base text-gray-900 truncate">
                                {item.name}
                              </h4>
                              <p className="text-xs text-gray-500 mt-0.5">
                                Qty: <strong>{item.quantity || 1}</strong> × ₹
                                {item.price?.toLocaleString("en-IN")}
                              </p>
                              {item.id && !String(item.id).startsWith("item-") && (
                                <Link
                                  to={`/product/${item.id}`}
                                  className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                                >
                                  View Product Details
                                </Link>
                              )}
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-400 block">
                                Item Total
                              </span>
                              <span className="font-black text-sm sm:text-base text-gray-900">
                                ₹
                                {(
                                  (item.price || 0) * (item.quantity || 1)
                                ).toLocaleString("en-IN")}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer & Actions */}
                      <div className="bg-gray-50/50 p-4 sm:p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-gray-600 text-center sm:text-left">
                          <span>Delivery to: </span>
                          <strong className="text-gray-900">
                            {order.customer?.name} ({order.customer?.phone})
                          </strong>
                          <span className="text-gray-400 block truncate max-w-sm">
                            {order.customer?.address}
                            {order.customer?.city ? `, ${order.customer.city}` : ""}
                            {order.customer?.pincode ? ` - ${order.customer.pincode}` : ""}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right mr-2">
                            <span className="text-[11px] text-gray-400 block">
                              Total Paid
                            </span>
                            <span className="text-lg font-black text-blue-600">
                              ₹{order.totalAmount?.toLocaleString("en-IN")}
                            </span>
                          </div>

                          <button
                            onClick={() => handleReorder(order)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                          >
                            <i className="bi bi-arrow-repeat"></i>
                            <span>Buy Again</span>
                          </button>

                          {!isCancelled && (
                            <button
                              onClick={() => handleCancelOrder(order.orderId)}
                              className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition cursor-pointer"
                              title="Cancel Order"
                            >
                              <i className="bi bi-x-circle text-lg"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        )}

        {/* TAB 2: ACTIVE CHECKOUT FORM (when state is passed) */}
        {activeTab === "checkout" && state && (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Shipping & Payment Form (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <i className="bi bi-geo-alt-fill text-blue-600"></i>
                  <span>1. Shipping & Contact Details</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. John Doe"
                        value={form.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. 9876543210"
                        value={form.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Email Address (For tracking & invoice)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. john@example.com"
                      value={form.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Delivery Address *
                    </label>
                    <textarea
                      name="address"
                      required
                      rows="3"
                      placeholder="House/Flat number, Street name, Landmark"
                      value={form.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="e.g. Mumbai"
                        value={form.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Postal Code / PIN *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        placeholder="e.g. 400001"
                        value={form.pincode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <i className="bi bi-credit-card text-blue-600"></i>
                      <span>2. Select Payment Method</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <label
                        className={`p-3.5 rounded-2xl border flex flex-col gap-1 cursor-pointer transition ${
                          form.paymentMethod === "cod"
                            ? "border-blue-600 bg-blue-50/50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={form.paymentMethod === "cod"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between">
                          <i className="bi bi-cash-stack text-lg text-emerald-600"></i>
                          {form.paymentMethod === "cod" && (
                            <i className="bi bi-check-circle-fill text-blue-600 text-xs"></i>
                          )}
                        </div>
                        <span className="font-bold text-xs text-gray-900">
                          Cash on Delivery
                        </span>
                        <span className="text-[10px] text-gray-500">
                          Pay upon arrival
                        </span>
                      </label>

                      <label
                        className={`p-3.5 rounded-2xl border flex flex-col gap-1 cursor-pointer transition ${
                          form.paymentMethod === "upi"
                            ? "border-blue-600 bg-blue-50/50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={form.paymentMethod === "upi"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between">
                          <i className="bi bi-qr-code-scan text-lg text-indigo-600"></i>
                          {form.paymentMethod === "upi" && (
                            <i className="bi bi-check-circle-fill text-blue-600 text-xs"></i>
                          )}
                        </div>
                        <span className="font-bold text-xs text-gray-900">
                          UPI / QR
                        </span>
                        <span className="text-[10px] text-gray-500">
                          GPay, PhonePe, Paytm
                        </span>
                      </label>

                      <label
                        className={`p-3.5 rounded-2xl border flex flex-col gap-1 cursor-pointer transition ${
                          form.paymentMethod === "card"
                            ? "border-blue-600 bg-blue-50/50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={form.paymentMethod === "card"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between">
                          <i className="bi bi-credit-card text-lg text-blue-600"></i>
                          {form.paymentMethod === "card" && (
                            <i className="bi bi-check-circle-fill text-blue-600 text-xs"></i>
                          )}
                        </div>
                        <span className="font-bold text-xs text-gray-900">
                          Card / NetBanking
                        </span>
                        <span className="text-[10px] text-gray-500">
                          Visa, Mastercard
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <i className="bi bi-check2-circle text-lg"></i>
                      <span>
                        Place Order (₹{totalPrice.toLocaleString("en-IN")})
                      </span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Order Items Summary (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 pb-4 border-b border-gray-100">
                  Your Order Items
                </h2>

                {/* Items List */}
                <div className="mt-4 divide-y divide-gray-100 max-h-96 overflow-y-auto pr-1">
                  {isCartOrder ? (
                    state.cartItems?.map((item) => (
                      <div
                        key={item.id}
                        className="py-3 flex items-center gap-3 text-sm"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-contain rounded-xl bg-gray-50 p-1 border"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            Qty: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                        <span className="font-bold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="py-4">
                      <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4 border border-gray-100">
                        <img
                          src={singleProduct.image}
                          alt={singleProduct.name}
                          className="w-20 h-20 object-contain rounded-xl bg-white p-2"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-gray-900">
                            {singleProduct.name}
                          </h4>
                          <p className="text-xs text-blue-600 font-extrabold mt-1">
                            ₹{singleProduct.price.toLocaleString("en-IN")} each
                          </p>

                          {/* Quantity selector */}
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-xs text-gray-500 font-medium">
                              Qty:
                            </span>
                            <div className="flex items-center border border-gray-200 rounded-lg bg-white p-0.5">
                              <button
                                type="button"
                                onClick={() => handleQtyChange(-1)}
                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-xs font-bold">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleQtyChange(1)}
                                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Summary Totals */}
                <div className="mt-6 pt-5 border-t border-gray-100 space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-bold text-emerald-600 uppercase text-xs">
                      FREE
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                    <span className="text-base font-bold text-gray-900">
                      Final Payable
                    </span>
                    <span className="text-2xl font-black text-blue-600">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>

      <Footer />
      <Toast />
      <ScrollToTop />
    </div>
  );
}

export default Order;
