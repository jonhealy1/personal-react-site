import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import locations from "./Locations";


const MapLibreComponent = () => {
  const mapContainerRef = useRef(null);

  const calculateVisitedCircleSize = (days) => {
    const maxDays = 60; // Max days for visited
    const baseSize = window.innerWidth < 768 ? 9 : 11; // Smaller base for small screens
    const maxSize = window.innerWidth < 768 ? 14 : 19; // Smaller max size for small screens
    return Math.min(
      baseSize + (days / maxDays) * (maxSize - baseSize),
      maxSize
    );
  };

  const calculateLivedCircleSize = (years) => {
    const maxYears = 8; // Example maximum years for scaling
    const baseSize = window.innerWidth < 768 ? 13 : 14; // Smaller base for small screens
    const maxSize = window.innerWidth < 768 ? 28 : 29; // Smaller max size for small screens
    return Math.min(
      baseSize + (years / maxYears) * (maxSize - baseSize),
      maxSize
    );
  };

  const calculateVisitedGradientColor = (days) => {
    const maxDays = 50;
    const normalized = Math.min(days / maxDays, 1);

    const r = Math.round(150 * (1 - normalized)); // Reduced from 173
    const g = Math.round(200 * (1 - normalized)); // Reduced from 216
    const b = Math.round(220 + 25 * normalized); // Reduced from 230 for a slightly darker blue

    return `rgb(${r}, ${g}, ${b})`;
  };

  const calculateLivedGradientColor = (years) => {
    const minYears = 1;
    const maxYears = 12;
    const normalized = Math.min((years - minYears) / (maxYears - minYears), 1);

    const r = Math.round(0 + 50 * (1 - normalized));
    const g = Math.round(100 + 105 * (1 - normalized));
    const b = Math.round(0 + 50 * (1 - normalized));

    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      zoom: 1,
    });

    const bounds = locations.reduce(
      (acc, location) => {
        const [lng, lat] = location.coords;
        acc[0][0] = Math.min(acc[0][0], lng);
        acc[0][1] = Math.min(acc[0][1], lat);
        acc[1][0] = Math.max(acc[1][0], lng);
        acc[1][1] = Math.max(acc[1][1], lat);
        return acc;
      },
      [
        [Infinity, Infinity],
        [-Infinity, -Infinity],
      ]
    );

    map.fitBounds(bounds, { padding: 50 });

    locations.forEach((location) => {
      let circleSize, gradientColor;

      if (location.daysSpent !== undefined) {
        circleSize = calculateVisitedCircleSize(location.daysSpent);
        gradientColor = calculateVisitedGradientColor(location.daysSpent);
      } else if (location.yearsSpent !== undefined) {
        circleSize = calculateLivedCircleSize(location.yearsSpent);
        gradientColor = calculateLivedGradientColor(location.yearsSpent);
      } else {
        circleSize = 8;
        gradientColor = "#CCCCCC";
      }

      const markerEl = document.createElement("div");
      markerEl.className = "custom-marker";
      markerEl.style.width = `${circleSize}px`;
      markerEl.style.height = `${circleSize}px`;
      markerEl.style.borderRadius = "50%";
      markerEl.style.cursor = "pointer";
      markerEl.style.backgroundColor = gradientColor;

      new maplibregl.Marker({ element: markerEl })
        .setLngLat(location.coords)
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(
            `
              <div class="bg-white rounded-lg shadow-lg p-2 max-w-xs text-gray-500">
                <h3 class="mb-2 text-sm sm:text-md font-bold">${
                  location.name
                }</h3>
                ${
                  location.daysSpent !== undefined
                    ? `<p class="text-xs sm:text-sm">📅 Days Spent: <strong>${location.daysSpent}</strong></p>`
                    : `<p class="text-xs sm:text-sm">🗓️ Years Spent: <strong>${location.yearsSpent.toFixed(
                        1
                      )}</strong></p>`
                }
              </div>
            `
          )
        )
        .addTo(map);
    });

    return () => map.remove();
  }, []);

  return (
    <section
      id="map"
      className="bg-gray-100 py-24 px-4 sm:px-8 lg:px-16 shadow-lg rounded-lg"
    >
      <h2 className="text-xl sm:text-3xl font-lexend font-extrabold text-center mb-12 text-gray-800">
        My Places
      </h2>
      <p className="sm:text-lg text-center text-gray-600 mb-6">
        Explore the places I’ve traveled to around the world.
      </p>
      <div
        ref={mapContainerRef}
        className="w-full rounded-lg shadow-lg"
        style={{
          height: "50vh",
          maxHeight: "500px",
          minHeight: "300px",
        }}
      ></div>

      {/* Legend Section */}
      <div className="mt-4 flex flex-wrap justify-center space-x-4 sm:space-x-8 text-gray-700 font-lexend text-sm sm:text-base">
        <div className="flex flex-col items-center space-y-1">
          <span
            className="block w-16 h-4 rounded-md"
            style={{
              background:
                "linear-gradient(to right, rgb(173, 216, 230), rgb(0, 102, 204))",
            }}
          ></span>
          <span>Visited</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span
            className="block w-16 h-4 rounded-md"
            style={{
              background:
                "linear-gradient(to right, rgb(50, 205, 50), rgb(0, 100, 0))",
            }}
          ></span>
          <span>Lived</span>
        </div>
      </div>
    </section>
  );
};

export default MapLibreComponent;
