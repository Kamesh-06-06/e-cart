import {useState,useContext} from "react";
import Login from "./Login";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {CartContext} from "./CartContext";
import Cart from "./Cart";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {search, setSearch} = useContext(CartContext);

  return (
    <header className="w-full shadow-md bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-4">
        {/* Logo */}
        <div className="flex items-center ">
          <h1 className="text-blue-600 text-xl font-bold">e</h1>
          <h1 className="text-xl font-semibold">-Card</h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-lg">
          <Link to="/product" className="hover:text-blue-600">
            Shop
          </Link>
          <a href="#" className="hover:text-blue-600">
            New Arrivals
          </a>
          <a href="#" className="hover:text-blue-600">
            About
          </a>
          <a href="#" className="hover:text-blue-600">
            Contact
          </a>
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search */}
          <div className="flex items-center border rounded-lg px-2 w-64">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none px-2 py-1 w-full"
            />
            <i className="bi bi-search text-lg transition cursor-pointer"></i>
          </div>
          {/* Icons */}

          <button onClick={() => navigate("/cart")}>
            <i className="bi bi-cart text-xl cursor-pointer"></i>
          </button>

          <button>
            <i className="bi bi-suit-heart-fill text-xl text-red-500"></i>
          </button>

          {/* Login */}
          <Link to="/login">
            <button className="bg-blue-600 text-white px-4 py-1 rounded-md hover:scale-115 hover:transition-all duration-300 ease-linear cursor-pointer">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          <i className="bi bi-list"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          <nav className="flex flex-col gap-3">
            <Link to="/product" className="hover:text-blue-600">
              Shop
            </Link>
            <a href="#">New Arrivals</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>

          {/* Search */}
          <div className="flex items-center border rounded-lg px-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none px-2 py-1 w-full"
            />
            <i className="bi bi-search"></i>
          </div>

          {/* Icons + Login */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
            <button onClick={() => navigate("/cart")}>
                  <i className="bi bi-cart text-xl cursor-pointer"></i>
          </button>

              <button>
                <i className="bi bi-suit-heart-fill text-xl text-red-500"></i>
              </button>
            </div>

            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-1 rounded-md hover:scale-115 hover:transition-all duration-300 ease-linear cursor-pointer">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
