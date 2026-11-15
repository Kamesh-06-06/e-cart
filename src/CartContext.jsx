import { createContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Load initial cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("ecart_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Load wishlist from localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("ecart_wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
      return [];
    }
  });

  // Global search input
  const [search, setSearch] = useState("");

  // Toast notification state
  const [toast, setToast] = useState(null);

  // Quick View modal state
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // User auth state
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("ecart_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ecart_cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to save cart to localStorage", err);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ecart_wishlist", JSON.stringify(wishlist));
    } catch (err) {
      console.error("Failed to save wishlist to localStorage", err);
    }
  }, [wishlist]);

  // Toast helper
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  // Quick View modal helpers
  const openQuickView = useCallback((product) => {
    setQuickViewProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  // ADD TO CART
  const addToCart = useCallback((product, qty = 1) => {
    const addQuantity = Math.max(1, Number(qty) || 1);

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + addQuantity }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: addQuantity,
        },
      ];
    });

    showToast(`Added "${product.name}" to cart! 🛒`, "success");
  }, [showToast]);

  // DECREASE QUANTITY
  const removeFromCart = useCallback((id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  // REMOVE COMPLETE PRODUCT
  const removeItemFromCart = useCallback((id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    showToast("Item removed from cart", "info");
  }, [showToast]);

  // UPDATE SPECIFIC QUANTITY
  const updateQuantity = useCallback((id, quantity) => {
    const targetQty = Number(quantity);
    if (targetQty <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
      showToast("Item removed from cart", "info");
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: targetQty } : item
      )
    );
  }, [showToast]);

  // CLEAR ALL CART
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // TOGGLE WISHLIST
  const toggleWishlist = useCallback((product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`, "info");
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        showToast(`Added "${product.name}" to wishlist ❤️`, "success");
        return [...prevWishlist, product];
      }
    });
  }, [showToast]);

  const isInWishlist = useCallback(
    (id) => wishlist.some((item) => item.id === id),
    [wishlist]
  );

  // AUTH HELPERS
  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem("ecart_user", JSON.stringify(userData));
    showToast(`Welcome back, ${userData.name || "Shopper"}! 👋`, "success");
  }, [showToast]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("ecart_user");
    showToast("Logged out successfully", "info");
  }, [showToast]);

  // CALCULATIONS
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );
  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        removeItemFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        wishlist,
        wishlistCount,
        toggleWishlist,
        isInWishlist,
        search,
        setSearch,
        toast,
        showToast,
        closeToast,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        user,
        login,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
