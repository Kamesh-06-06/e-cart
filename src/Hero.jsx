import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import img1 from "./assets/Herohead.png";
import img2 from "./assets/img4.png";
import img3 from "./assets/img2.png";

function Hero() {
  const slides = [
    {
      image: img1,
      badge: "NEW GENERATION AUDIO",
      title: "Immersive Sound. Pure Freedom.",
      subtitle:
        "Experience true studio-grade spatial acoustics with our 2026 noise-canceling collection. Up to 40% OFF this week only.",
      primaryLink: "/product?category=Audio",
      primaryText: "Shop Audio Collection",
      secondaryLink: "/product",
      secondaryText: "Explore All Products",
      tag: "Top Rated 4.9 ★",
    },
    {
      image: img2,
      badge: "SMART WEARABLES 2026",
      title: "Precision Tracking. Peak Performance.",
      subtitle:
        "Elevate your lifestyle with next-gen AMOLED smartwatches featuring 24/7 biometric tracking and all-day endurance.",
      primaryLink: "/product?category=Wearables",
      primaryText: "Discover Watches",
      secondaryLink: "/trends",
      secondaryText: "View Trending Deals",
      tag: "Best Seller 🔥",
    },
    {
      image: img3,
      badge: "PREMIUM TECH ESSENTIALS",
      title: "Ultra-Fast Storage & High-Fi Gear.",
      subtitle:
        "Upgrade your digital workflow with blazing-fast USB 3.2 memory drives and high-definition ergonomic neckbands.",
      primaryLink: "/product",
      primaryText: "Shop Mega Deals",
      secondaryLink: "/order",
      secondaryText: "Special Offers",
      tag: "Save Up to 50%",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused, slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      className="relative w-full bg-gray-950 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      <div className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image with Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent z-10"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-90 transform scale-102 transition-transform duration-700"
            />

            {/* Slide Content Overlay */}
            <div className="relative z-20 max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
              <div className="max-w-2xl py-12">
                {/* Badge Tag */}
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                  <span>{slide.badge}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-amber-400">{slide.tag}</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-xl">
                  {slide.subtitle}
                </p>

                {/* Call-to-Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to={slide.primaryLink}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <span>{slide.primaryText}</span>
                    <i className="bi bi-arrow-right font-bold"></i>
                  </Link>

                  <Link
                    to={slide.secondaryLink}
                    className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 font-semibold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-2xl hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <span>{slide.secondaryText}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-4 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <i className="bi bi-chevron-left text-lg"></i>
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <i className="bi bi-chevron-right text-lg"></i>
        </button>

        {/* Dots Pagination Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === current ? "w-8 bg-blue-500" : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
