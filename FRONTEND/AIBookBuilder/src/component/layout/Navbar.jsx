import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-purple-600 font-bold text-xl flex items-center gap-2">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7v15h20V7L12 2zM12 4.2l7 3.25v1.05l-7-3.25-7 3.25V7.45l7-3.25zM4 9.7l7 3.25v7.8L4 17.5v-7.8zm9 11.05v-7.8l7-3.25v7.8l-7 3.25z"></path>
              </svg>
              AI eBook Creator
            </span>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex space-x-6 mx-auto">
            <a href="#features" className="text-gray-700 hover:text-purple-600">
              Features
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-purple-600">
              Testimonials
            </a>
          </div>

          {/* Right Buttons */}
          <div className="hidden md:flex space-x-4 items-center">
            <a
              href="/login"
              className="text-gray-700 hover:text-purple-600 px-6 py-2 rounded-lg border border-gray-300 hover:border-purple-600 transition-colors"
            >
              Login
            </a>
            <a
              href="/signup"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <a
            href="#features"
            className="block px-6 py-3 text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Features
          </a>
          <a
            href="#testimonials"
            className="block px-6 py-3 text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Testimonials
          </a>
          <a
            href="/login"
            className="block px-6 py-3 text-black  hover:bg-gray-100 text-center bg-purple-400 mx-4 my-2 rounded-lg" 
            onClick={toggleMenu}
          >
            Login
          </a>
          <a
            href="/signup"
            className="block px-6 py-3 bg-purple-600 text-white rounded-lg mx-4 my-2 text-center hover:bg-purple-700"
            onClick={toggleMenu}
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
