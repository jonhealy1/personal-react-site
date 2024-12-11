import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBluesky,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Links Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Title */}
          <div className="text-lg font-bold font-lexend mb-4 md:mb-0">
            Jonathan Healy
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href="https://github.com/jonhealy1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-blue-500 transition"
            >
              <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/jonathan-d-healy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-blue-500 transition"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
            </a>
            <a
              href="https://bsky.app/profile/jonhealy1.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-blue-500 transition"
            >
              <FontAwesomeIcon icon={faBluesky} className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 text-center text-md text-gray-400">
          © {new Date().getFullYear()} Jonathan Healy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
