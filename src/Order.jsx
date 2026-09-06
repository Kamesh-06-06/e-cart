import {useLocation, useNavigate} from "react-router-dom";
import {useState, useContext} from "react";
import {CartContext} from "./CartContext";

function Order() {
  const {state} = useLocation();
  const navigate = useNavigate();

  const {removeItemFromCart} = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [qty, setQty] = useState(state?.quantity || state?.qty || 1);

  // No product
  if (!state) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl">No product selected ❌</p>
      </div>
    );
  }

  const increase = () => {
    setQty((prev) => prev + 1);
  };

  const decrease = () => {
    setQty((prev) => {
      if (prev > 1) {
        return prev - 1;
      }

      return prev;
    });
  };

  // Calculate total
  const totalPrice = state.price * qty;

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      product: {
        id: state.id,
        name: state.name,
        price: state.price,
        image: state.image,
        quantity: qty,
        totalPrice: totalPrice,
      },

      customer: form,
    };

    // Get old orders
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Add new order
    const updatedOrders = [...existingOrders, orderData];

    // Save order
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // ⭐ REMOVE PRODUCT FROM CART
    removeItemFromCart(state.id);

    // ⭐ SHOW ALERT
    alert("Order Placed Successfully! ✅");

    // ⭐ GO TO CART
    navigate("/cart");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Order</h1>

      {/* PRODUCT */}
      <div className="border p-4 mb-5 rounded-lg shadow">
        <img
          src={state.image}
          alt={state.name}
          className="mx-auto w-48 h-48 md:w-56 md:h-56 object-cover rounded-lg"
        />

        <h2 className="text-xl font-bold mt-4 text-center">{state.name}</h2>

        <p className="text-center text-gray-600 mt-2">Price: ₹{state.price}</p>

        {/* QUANTITY */}
        <div className="flex justify-center items-center gap-5 mt-5">
          <button
            type="button"
            onClick={decrease}
            className="bg-red-500 text-white px-4 py-1 rounded text-lg"
          >
            −
          </button>

          <span className="text-xl font-bold">{qty}</span>

          <button
            type="button"
            onClick={increase}
            className="bg-green-500 text-white px-4 py-1 rounded text-lg"
          >
            +
          </button>
        </div>

        {/* TOTAL */}
        <div className="text-center mt-5 border-t pt-4">
          <p className="text-gray-600">Quantity: {qty}</p>

          <p className="text-2xl font-bold text-blue-600 mt-2">
            Total: ₹{totalPrice}
          </p>
        </div>
      </div>

      {/* CUSTOMER FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name"
          required
          value={form.name}
          className="border p-2 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Address"
          required
          value={form.address}
          className="border p-2 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              address: e.target.value,
            })
          }
        />

        <input
          type="tel"
          placeholder="Phone"
          required
          value={form.phone}
          className="border p-2 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Order;
