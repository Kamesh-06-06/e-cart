import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import "./App.css";

import App from "./App.jsx";
import Product from "./Product.jsx";
import ProductDetails from "./ProductDetails.jsx";
import Trends from "./Trends.jsx";
import Cart from "./Cart.jsx";
import Order from "./Order.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Notfound from "./Notfound.jsx";
import Footer from "./Footer.jsx";
import Testimonial from "./Testimonial.jsx";
import Loading from "./Loading.jsx";
import { CartProvider } from "./CartContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Notfound />,
  },
  {
    path: "/products",
    element: <Product />,
    errorElement: <Notfound />,
  },
  {
    path: "/product",
    element: <Product />,
    errorElement: <Notfound />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
    errorElement: <Notfound />,
  },
  {
    path: "/trends",
    element: <Trends />,
    errorElement: <Notfound />,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <Notfound />,
  },
  {
    path: "/order",
    element: <Order />,
    errorElement: <Notfound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Notfound />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <Notfound />,
  },
  {
    path: "/testimonial",
    element: <Testimonial />,
    errorElement: <Notfound />,
  },
  {
    path: "/footer",
    element: <Footer />,
    errorElement: <Notfound />,
  },
  {
    path: "/loading",
    element: <Loading onFinish={() => {}} />,
    errorElement: <Notfound />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
