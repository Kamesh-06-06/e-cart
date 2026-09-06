import img1 from "/src/assets/Herohead.png";
import img2 from "/src/assets/img4.png"
import img3 from "/src/assets/img2.png"

import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
function Hero() {
    

        const slides=[img1,img2,img3];
        const [current,setCurrent]=useState(0);
        useEffect(()=>{
            const timer=setInterval(()=>{
                setCurrent((prev)=>(prev+1) % slides.length);
            },3000);
           return()=>clearInterval(timer);
        },[]);
    
    
  return (
    <>
      <section className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] overflow-hidden">
        <img
          src={slides[current]}
          alt="image is not found"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="absolute top-1/2 left-16 -translate-y-1/2 text-white max-w-lg z-20">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
            Disover Trendy Products
          </h1>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg">
            Shop the latest fashion, electronics and liftestyle products at the
            best prices
          </p>
          <Link to="/trends">
            <button className="mt-4 sm:mt-6 hover:scale-120 hover:transition-all duration-300 ease-linear cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base">
              Shop Now
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
export default Hero;
