import {createContext, useState} from "react";

export const CartContext = createContext();

export function CartProvider({children}) {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      }

      return [...prevCart, {...product, quantity: 1}];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? {...item, quantity: item.quantity - 1} : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <CartContext.Provider
      value={{cart, addToCart, removeFromCart, search, setSearch}}
    >
      {children}
    </CartContext.Provider>
  );
}
