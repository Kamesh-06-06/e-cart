import {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";

import img1 from "./assets/Herohead.png";
import img2 from "./assets/img4.png";
import img3 from "./assets/img2.png";

function Hero() {
  const slides = [
    {
      image: img1,
      primaryLink: "/product?category=Audio",
      primaryText: "Shop Now",
      secondaryLink: "/product",
      secondaryText: "Explore Products",
    },
    {
      image: img2,
      primaryLink: "/product?category=Wearables",
      primaryText: "Shop Now",
      secondaryLink: "/trends",
      secondaryText: "Explore Deals",
    },
    {
      image: img3,
      primaryLink: "/product",
      primaryText: "Shop Now",
      secondaryLink: "/trends",
      secondaryText: "Explore Products",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 3000);
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
      className="relative w-full overflow-hidden bg-white"
      // onMouseEnter={() => setIsPaused(true)}
      // onMouseLeave={() => setIsPaused(false)}
    >
      {/* Full Width Hero Slider */}
      <div className="relative w-full h-[420px] sm:h-[500px] md:h-[600px] lg:h-[680px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Full Size Image */}
            <img
              src={slide.image}
              alt="E-commerce promotional banner"
              className="w-full h-full object-cover object-center"
            />

            {/* Buttons Only */}
            <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-3 w-full px-4">
              <Link
                to={slide.primaryLink}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base px-7 sm:px-9 py-3 sm:py-4 rounded-xl shadow-lg hover:scale-105 transition-all"
              >
                {slide.primaryText}
                <i className="bi bi-arrow-right ml-2"></i>
              </Link>

              <Link
                to={slide.secondaryLink}
                className="bg-white hover:bg-gray-100 text-gray-900 font-bold text-sm sm:text-base px-7 sm:px-9 py-3 sm:py-4 rounded-xl shadow-lg hover:scale-105 transition-all"
              >
                {slide.secondaryText}
              </Link>
            </div>
          </div>
        ))}

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all"
        >
          <i className="bi bi-chevron-left text-gray-900 text-lg"></i>
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all"
        >
          <i className="bi bi-chevron-right text-gray-900 text-lg"></i>
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === i ? "w-8 bg-blue-600" : "w-2 bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
