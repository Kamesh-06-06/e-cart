import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Notfound from './Notfound.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
    import {CartProvider} from "./CartContext";
import Product from './Product.jsx'
import Trends from './Trends.jsx'
import Cart from "./Cart.jsx";
import Order from './Order.jsx'
import Footer from './Footer.jsx'
import Testimonial from './Testimonial.jsx'
import Loading from './Loading.jsx'

const router=createBrowserRouter([
  {
  path:'/',
  element:<App/>,
  errorElement:<Notfound/>
}
,{
  path:'/login',
  element:<Login/>
},
{
  path:'/signup',
  element:<Signup/>
},
{
  path:'/product',
  element:<Product/>
}
,
{
  path:'/trends',
  element:<Trends/>
},
{
  path:'/cart',
  element:<Cart/>
},
{
  path:'/order',
  element:<Order/>
}
,{
  path:'/testimonial',
  element:<Testimonial/>
},{
  path:'/footer',
  element:<Footer/>
},{
  path:'loading',
  element:<Loading/>
}

]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
