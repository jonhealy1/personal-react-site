import React from "react";
import image from "../assets/athens-city-sea.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBluesky, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";

const Header = () => {
  return (
    <header className="relative w-screen h-[60vh] sm:h-[70vh] md:h-[80vh] min-h-[300px] overflow-hidden bg-gray-900">
      {/* Background Image */}
      <img
        src={image}
        alt="Athens City"
        className="absolute inset-0 w-full h-full object-cover object-top opacity-70"
      />
      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-gray-100 px-4">
        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-lexend font-extrabold drop-shadow-2xl text-center">
          Jonathan Healy
        </h1>
        <p className="text-xs sm:text-sm md:text-lg font-lexend mt-2 drop-shadow-md text-center">
          stacchain | Healy Hyperspatial
        </p>
        {/* Social Media Icons */}
        <div className="mt-4 bg-gray-900/70 rounded-full px-4 py-2 sm:px-6 sm:py-3 flex items-center gap-4 sm:gap-6">
          <a
            href="https://bsky.app/profile/jonhealy1.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 hover:text-gray-600 transition"
          >
            <FontAwesomeIcon
              icon={faBluesky}
              className="w-4 h-4 sm:w-6 sm:h-6"
            />
          </a>
          <a
            href="https://github.com/jonhealy1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 hover:text-gray-600 transition"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="w-4 h-4 sm:w-6 sm:h-6"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/jonathan-d-healy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 hover:text-gray-600 transition"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="w-4 h-4 sm:w-6 sm:h-6"
            />
          </a>
        </div>
      </div>
      {/* Decorative Bottom Curve */}
      <svg
        className="absolute bottom-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,288L48,272C96,256,192,224,288,208C384,192,480,192,576,208C672,224,768,256,864,256C960,256,1056,224,1152,224C1248,224,1344,256,1392,272L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </header>
  );
};

export default Header;
