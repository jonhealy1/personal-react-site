import React from "react";
import image from "../assets/athens-city-sea.jpg";

const Header = () => {
  return (
    <header className="relative w-screen h-[60vh] overflow-hidden bg-gray-900">
      {/* Background Image */}
      <img
        src={image}
        alt="Athens City"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          Jonathan Healy
        </h1>
        <p className="text-xl mt-2 drop-shadow-md">
          Geospatial | Blockchain | Developer
        </p>
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
