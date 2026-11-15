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
      title: "Discover Trendy Tech & Acoustics",
      subtitle:
        "Experience true studio-grade spatial acoustics with our 2026 wireless noise-canceling collection. Up to 40% OFF this week only.",
      primaryLink: "/product?category=Audio",
      primaryText: "Shop Audio Gear",
      secondaryLink: "/product",
      secondaryText: "Explore Catalog",
      tag: "Top Rated 4.9 ★",
    },
    {
      image: img2,
      badge: "SMART WEARABLES 2026",
      title: "Precision Smartwatches & Bands",
      subtitle:
        "Elevate your lifestyle with next-gen AMOLED smartwatches featuring 24/7 biometric tracking and multi-day battery endurance.",
      primaryLink: "/product?category=Wearables",
      primaryText: "Discover Watches",
      secondaryLink: "/trends",
      secondaryText: "Trending Deals",
      tag: "Best Seller 🔥",
    },
    {
      image: img3,
      badge: "PREMIUM TECH ESSENTIALS",
      title: "Ultra-Fast Storage & Wireless Hi-Fi",
      subtitle:
        "Upgrade your digital workflow with blazing-fast USB 3.2 memory drives and high-definition ergonomic sports neckbands.",
      primaryLink: "/product",
      primaryText: "Shop Now",
      secondaryLink: "/order?tab=history",
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
      className="relative w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden border-b border-gray-200/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Main Hero Card Container */}
        <div className="relative min-h-[460px] sm:min-h-[480px] md:min-h-[460px] lg:min-h-[480px] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50 border border-gray-200/70 shadow-xs flex items-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`w-full transition-opacity duration-700 ease-in-out ${
                index === current
                  ? "opacity-100 relative z-10"
                  : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
            >
              {/* Responsive Grid: Stacks cleanly on Mobile, Side-by-Side on Tablet/Desktop */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 sm:gap-8 p-6 sm:p-8 lg:p-12">
                {/* Column 1: Promotional Info (7 cols on desktop, order 2 on mobile so image is seen first or prominent) */}
                <div className="md:col-span-7 flex flex-col justify-center order-2 md:order-1 text-center md:text-left">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-3 py-1 rounded-full text-[11px] sm:text-xs tracking-wider uppercase mb-3 sm:mb-4 mx-auto md:mx-0 shadow-sm w-fit">
                    <span>{slide.badge}</span>
                    <span className="text-blue-200">•</span>
                    <span className="text-amber-300 font-extrabold">{slide.tag}</span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 sm:mt-3 leading-relaxed max-w-xl mx-auto md:mx-0">
                    {slide.subtitle}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <Link
                      to={slide.primaryLink}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 sm:px-8 py-3 rounded-2xl shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>{slide.primaryText}</span>
                      <i className="bi bi-arrow-right font-bold"></i>
                    </Link>

                    <Link
                      to={slide.secondaryLink}
                      className="bg-gray-900 hover:bg-black text-white font-semibold text-xs sm:text-sm px-5 sm:px-7 py-3 rounded-2xl active:scale-95 transition-all cursor-pointer shadow-xs"
                    >
                      <span>{slide.secondaryText}</span>
                    </Link>
                  </div>
                </div>

                {/* Column 2: 100% CLEAR Picture (5 cols on desktop, order 1 on mobile) */}
                <div className="md:col-span-5 flex items-center justify-center order-1 md:order-2">
                  <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-none h-48 sm:h-64 md:h-80 flex items-center justify-center p-2">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="max-h-full max-w-full object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Navigation Arrows - Clean & Accessible */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-4 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-gray-800 shadow-md border border-gray-200 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <i className="bi bi-chevron-left text-sm sm:text-base font-bold"></i>
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-2 sm:right-4 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-gray-800 shadow-md border border-gray-200 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <i className="bi bi-chevron-right text-sm sm:text-base font-bold"></i>
          </button>

          {/* Dots Pagination Indicators */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "w-7 bg-blue-600 shadow-sm"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
