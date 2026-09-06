import {useContext} from "react";
import {CartContext} from "./CartContext.jsx";

import wired from "/src/assets/wired.png";
import wireless from "/src/assets/wireless1.png";
import wireless1 from "/src/assets/wireless.jpg";
import smartwatch from "/src/assets/smartwatch.png";
import garmain from "/src/assets/garmin6.png";
import smartwatch2 from "/src/assets/smart2.png";
import earbuts from "/src/assets/earbuts1.webp";
import pendrive from "/src/assets/pendrive.webp";
import pendrive2 from "/src/assets/pendrive3.jpg"
import otg from "/src/assets/otg.jpg"
function Product() {
  const {cart, addToCart, search} = useContext(CartContext);

  const products = [
    {
      id: 1,
      name: "Fitness Watch",
      price: 4000,
      image: garmain,
    },
    {
      id: 2,
      name: "Earphone",
      price: 2999,
      image: wireless,
    },
    {
      id: 3,
      name: "Headphone",
      price: 999,
      image: wireless1,
    },
    {
      id: 4,
      name: "Earbuts",
      price: 2999,
      image: earbuts,
    },
    {
      id: 5,
      name: "Smart Watch",
      price: 4999,
      image: smartwatch,
    },
    {
      id: 6,
      name: "Wired Headphone",
      price: 199,
      image: wired,
    },
    {
      id: 7,
      name: "Smart Watch",
      price: 5999,
      image: smartwatch2,
    },
    {
      id: 8,
      name: "Pendrive 128 GB",
      price: 699,
      image: pendrive,
    },
    {
      id: 9,
      name: "OTG",
      price: 299,
      image: otg,
    },
    {
      id: 10,
      name: "pendrive 256 GB",
      price: 1199,
      image: pendrive2,
    },
  ];

  // Search
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes((search || "").toLowerCase()),
  );

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Products</h1>

        <p className="text-sm sm:text-lg font-semibold">Cart: {cart.length}</p>
      </div>

      {/* Search result */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-bold">No Product Found ❌</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {/* IMPORTANT: filteredProducts */}
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="w-full h-48 sm:h-56 md:h-60 overflow-hidden rounded-t-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              {/* Details */}
              <div className="p-3 sm:p-4">
                <h2 className="text-sm sm:text-lg font-semibold">
                  {item.name}
                </h2>

                <p className="text-blue-600 text-base sm:text-xl font-bold mt-2">
                  ₹{item.price}
                </p>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Product;
