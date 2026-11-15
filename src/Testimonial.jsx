import kamesh from "./assets/KAMESH.jpg";

function Testimonial() {
  const reviews = [
    {
      id: 1,
      name: "Kamesh Kamalakannan",
      role: "Lead Frontend Engineer",
      avatar: kamesh,
      rating: 5,
      verified: true,
      comment:
        "e-Cart was designed with performance, sleek ergonomics, and seamless UI/UX in mind. Finding and purchasing gadgets has never felt faster or smoother!",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Tech Reviewer & Creator",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      verified: true,
      comment:
        "The audio quality of the earbuds I ordered was phenomenal! Fast delivery within 48 hours and genuine manufacturer warranty included.",
    },
    {
      id: 3,
      name: "Vikram Rathore",
      role: "Fitness Coach",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      verified: true,
      comment:
        "The Garmin smartwatch purchased from e-Cart has transformed my daily marathon training. Accurate GPS, excellent battery life, and unbeatable price.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full">
            Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
            Loved by 50,000+ Happy Shoppers
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Read what our customers and developers have to say about their experience with e-Cart.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-gray-50/70 hover:bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 hover:border-gray-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                {/* Star Ratings */}
                <div className="flex items-center gap-1 text-amber-400 text-sm mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill"></i>
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-gray-200/60">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                  onError={(e) => {
                    e.currentTarget.src = kamesh;
                  }}
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-sm text-gray-900">
                      {rev.name}
                    </h4>
                    {rev.verified && (
                      <i
                        className="bi bi-patch-check-fill text-blue-600 text-xs"
                        title="Verified Purchase"
                      ></i>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 font-medium">
                    {rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
