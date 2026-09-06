import Product from "./Product";
import { useState } from "react";
import img1 from "/src/assets/Herohead.png";
import img2 from "/src/assets/img4.png";
import img3 from "/src/assets/img2.png";
 import wired from "/src/assets/wired.png";
 import wireless from "/src/assets/wireless1.png";
 import wireless1 from "/src/assets/wireless.jpg";
 import smartwatch from "/src/assets/smartwatch.png";
 import garmain from "/src/assets/garmin6.png";
 import smartwatch2 from "/src/assets/smart2.png";
 import earbuts from "/src/assets/earbuts1.webp";
 import {useContext} from "react";
 import {CartContext} from "./CartContext.jsx";

function Trends() {
    const {cart, addToCart} = useContext(CartContext);


  const products = [
    {
      id: 7,
      name: "Smart Watch",
      price: 5999,
      image: smartwatch2,
    },
    {
      id: 5,
      name: "Smart Watch",
      price: 4999,
      image: smartwatch,
    },
    {
      id: 3,
      name: " Headphone",
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
      id: 6,
      name: "Wired Headphone",
      price: 199,
      image: wired,
    },
    
  ];
     const Trendprod = [
       {
         id: 11,
         name: "Earphone",
         image: img1,
         price: 1999,
       },
       {
         id: 12,
         name: "Smart watch",
         image: img2,
         price: 2999,
       },
       {
         id: 13,
         name: "Ear phone",
         image: img3,
         price: 1599,
       },
       {
         id: 1,
         name: "Fitness Watch",
         price: 40000,
         image: garmain,
       },
       {
         id: 2,
         name: "Earphone",
         price: 2999,
         image: wireless,
       },
   
     ];
 
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-10 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Trends Products</h1>
          <p className="text-sm sm:text-lg font-semibold">
            Cart: {cart.length}
          </p>
        </div>

        <div
          className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        gap-4 sm:gap-6
      "
        >
          {Trendprod.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="w-full h-48 sm:h-56 md:h-60 overflow-hidden rounded-t-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-3 sm:p-4">
                <h2 className="text-sm sm:text-lg font-semibold line-clamp-1">
                  {item.name}
                </h2>

                <p className="text-blue-600 text-base sm:text-xl font-bold mt-1 sm:mt-2">
                  ₹{item.price}
                </p>

                <button
                  onClick={() => addToCart(item)}
                  className="
                  mt-3 sm:mt-4 
                  w-full 
                  bg-blue-600 
                  text-white 
                  py-2 
                  text-sm sm:text-base 
                  rounded-lg 
                  hover:bg-blue-700
                "
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="w-full h-48 sm:h-56 md:h-60 overflow-hidden rounded-t-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-3 sm:p-4">
                <h2 className="text-sm sm:text-lg font-semibold line-clamp-1">
                  {item.name}
                </h2>

                <p className="text-blue-600 text-base sm:text-xl font-bold mt-1 sm:mt-2">
                  ₹{item.price}
                </p>

                <button
                  onClick={() => addToCart(item)}
                  className="
                  mt-3 sm:mt-4 
                  w-full 
                  bg-blue-600 
                  text-white 
                  py-2 
                  text-sm sm:text-base 
                  rounded-lg 
                  hover:bg-blue-700
                "
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    
    </>
  );
}
export default Trends;
