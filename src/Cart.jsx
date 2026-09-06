import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {CartContext} from "./CartContext";

function Cart() {
  const {cart, removeFromCart} = useContext(CartContext);

  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">Your Cart is Empty 🛒</h1>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart 🛒</h1>

      <div className="grid gap-5">
        {cart.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 flex flex-col md:flex-row items-center gap-5"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              className="w-40 h-40 object-cover rounded-lg"
            />

            {/* DETAILS */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-bold">{item.name}</h2>

              <p className="text-blue-600 font-bold mt-2">₹{item.price}</p>

              <p className="mt-2">Quantity: {item.quantity}</p>

              <p className="font-bold mt-2">
                Total: ₹{item.price * item.quantity}
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
              {/* DECREASE */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                −
              </button>

              {/* BUY */}
              <button
                onClick={() => {
                  console.log("Buying product:", item);

                  navigate("/order", {
                    state: item,
                  });
                }}
                className="bg-green-600 text-white px-5 py-2 rounded"
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
