import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className="w-full fixed top-0 z-50 shadow-lg"
      style={{
        background:
          "linear-gradient(to right, rgba(156, 163, 175, 0.5), rgba(209, 213, 219, 0.5))",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4 text-gray-600">
          {/* Logo */}
          <div className="sm:text-xl font-bold">
            <a href="#bio">Welcome to my website</a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <a
              href="#bio"
              className="hover:text-gray-600 transition duration-200 border-b-2 border-transparent hover:border-gray-800"
            >
              Bio
            </a>
            <a
              href="#photos"
              className="hover:text-gray-600 transition duration-200 border-b-2 border-transparent hover:border-gray-800"
            >
              Photos
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </button>
        </div>

        {/* Mobile Links */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 py-4">
            <a
              href="#bio"
              className="hover:text-gray-600 transition duration-200 border-b-2 border-transparent hover:border-gray-800"
              onClick={toggleMenu}
            >
              Bio
            </a>
            <a
              href="#photos"
              className="hover:text-gray-600 transition duration-200 border-b-2 border-transparent hover:border-gray-800"
              onClick={toggleMenu}
            >
              Photos
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
