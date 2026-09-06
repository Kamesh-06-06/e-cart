import { useState } from 'react'
import Login from './Login'

import reactLogo from './assets/react.svg'

import './App.css'
import './index.css'
import Navbar from './Navbar'

import Hero from './Hero'
import Product from './Product'
import Footer from './Footer'
import Testimonial from './Testimonial'
import Loading from "./Loading";

function App() {
    const [loading, setLoading] = useState(true);

    if (loading) {
      return <Loading onFinish={() => setLoading(false)} />;
    }
  return (
    <>
      <Navbar />
      <Hero />
 
      <Product/>
      <Testimonial/>
      <Footer/>
    </>
  );
}

export default App
