import kamesh from '/src/assets/KAMESH.jpg'
function Testimonial() {
  return (
    <section className="mt-24 text-center max-w-5xl mx-auto p-8 pt-4 sm:pt-8">
      <h2 className="text-4xl font-bold">What Developers Say</h2>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Testimonial 1 */}
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg flex items-center gap-6 hover:scale-105 transition duration-300">
          <img
            src={kamesh}
            alt="Kamesh"
            className="w-[52px] h-[52px] rounded-full border-2 border-purple-400 object-cover"
          />
          <div className="text-left">
            <p className="text-gray-400 text-lg">
              "e-Cart made our online shopping experience simple and fast!"
            </p>

            <h4 className="text-lg font-semibold mt-4 text-white">Kamesh</h4>

            <p className="text-purple-400">Frontend Developer</p>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg hover:scale-105 flex items-center gap-6 transition duration-300">
          <img
            src={kamesh}
            alt="Kamesh"
            className="w-[52px] h-[52px] rounded-full border-2 border-purple-400 object-cover"
          />

          <div className="text-left">
            <p className="text-gray-400 text-lg">
              "e-Cart provides a smooth and user-friendly shopping experience."
            </p>

            <h4 className="text-lg font-semibold mt-4 text-white">Kamesh</h4>

            <p className="text-blue-400">React Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
