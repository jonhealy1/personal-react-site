import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import hhlogo from "../assets/healy-hyper-smalllogo.png";
import stacchainLogo from "../assets/stacchain-smalllogo.jpg";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";

const Bio = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left Column: Bio */}
      <div className="col-span-2">
        <h2 className="font-lexend text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4">
          Hello. Nice to meet you!
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          My name is Jonathan Healy and I'm a software developer specializing in
          geospatial technologies and blockchain. I love being a dad, husband,
          and traveling. I'm currently working on{" "}
          <a
            href="https://stacchain.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            stacchain
          </a>{" "}
          and other open-source tools like{" "}
          <a
            href="https://github.com/stac-utils/stac-fastapi-elasticsearch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            SFEOS (stac-fastapi-elasticsearch-opensearch)
          </a>
          .
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Recognizing a need for honest and cost-effective software development
          services, I started{" "}
          <a
            href="https://github.com/Healy-Hyperspatial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            Healy Hyperspatial
          </a>
          . We focus on providing technically sound and innovative solutions for
          a wide range of backend and frontend software development needs.
        </p>
        <p className="text-gray-700 text-lg mb-6">
          Check out my work on{" "}
          <a
            href="https://github.com/jonhealy1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            GitHub
          </a>{" "}
          or learn more about{" "}
          <a
            href="https://stacchain.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            stacchain
          </a>
          .
        </p>
        <div className="flex gap-4 mb-6">
          <a
            href="https://github.com/jonhealy1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg shadow hover:shadow-md hover:bg-blue-100 transition"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="text-gray-800 text-xl"
            />
            <span className="text-gray-800 font-semibold">GitHub</span>
          </a>
          <a
            href="https://stacchain.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg shadow hover:shadow-md hover:bg-blue-100 transition"
          >
            <FontAwesomeIcon
              icon={faBoltLightning}
              className="text-gray-800 text-xl"
            />
            <span className="text-gray-800 font-semibold">stacchain</span>
          </a>
        </div>
      </div>

      {/* Right Column: Logos */}
      <div className="flex flex-wrap md:flex-col justify-center items-center gap-7">
        <a
          href="https://stacchain.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center"
        >
          <img
            src={stacchainLogo}
            alt="Stacchain Logo"
            className="h-28 max-w-full w-auto hover:scale-110 transition-transform"
          />
        </a>
        <a
          href="https://github.com/Healy-Hyperspatial"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center"
        >
          <img
            src={hhlogo}
            alt="Healy Hyperspatial Logo"
            className="h-28 max-w-full w-auto hover:scale-110 transition-transform"
          />
        </a>
      </div>
    </div>
  );
};

export default Bio;
