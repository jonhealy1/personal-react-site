import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const locations = [
  { name: "Alanya, Turkey", coords: [31.9992, 36.5438], daysSpent: 8 },
  { name: "Antalya, Turkey", coords: [30.7133, 36.8969], daysSpent: 10 },
  { name: "Ankara, Turkey", coords: [32.8597, 39.9208], yearsSpent: 2 },
  { name: "Athens, Greece", coords: [23.7275, 37.9838], daysSpent: 6 },
  { name: "Bangkok, Thailand", coords: [100.5018, 13.7563], daysSpent: 2 },
  { name: "Bocas del Toro, Panama", coords: [-82.2516, 9.3339], daysSpent: 10 },
  {
    name: "Cabo San Lucas, Mexico",
    coords: [-109.9124, 22.8905],
    daysSpent: 15,
  },
  { name: "Calgary, Canada", coords: [-114.0719, 51.0447], daysSpent: 8 },
  { name: "Cancún, Mexico", coords: [-86.8475, 21.1619], daysSpent: 1 },
  { name: "Cartagena, Colombia", coords: [-75.4794, 10.391], daysSpent: 30 },
  { name: "Corfu Island, Greece", coords: [19.9211, 39.6243], daysSpent: 5 },
  { name: "Fethiye, Turkey", coords: [29.1168, 36.6219], daysSpent: 3 },
  {
    name: "Gabriola Island, Canada",
    coords: [-123.8197, 49.1576],
    yearsSpent: 6,
  },
  { name: "Halifax, Canada", coords: [-63.5752, 44.6488], daysSpent: 7 },
  { name: "Hoi An, Vietnam", coords: [108.3275, 15.8801], daysSpent: 7 },
  { name: "Istanbul, Turkey", coords: [28.9784, 41.0082], daysSpent: 6 },
  { name: "Izmir, Turkey", coords: [27.1428, 38.4237], daysSpent: 5 },
  { name: "Kalkan, Turkey", coords: [29.4183, 36.2641], daysSpent: 90 },
  { name: "Konya, Turkey", coords: [32.4845, 37.8746], daysSpent: 5 },
  { name: "Kota Kinabalu, Malaysia", coords: [116.0724, 5.978], daysSpent: 7 },
  { name: "Langkawi, Malaysia", coords: [99.7985, 6.3628], daysSpent: 12 },
  { name: "Macau, China", coords: [113.5439, 22.1987], yearsSpent: 1.5 },
  { name: "Malta", coords: [14.3754, 35.8997], daysSpent: 7 },
  { name: "Moalboal, Philippines", coords: [123.3983, 9.9472], daysSpent: 8 },
  { name: "Montreal, Canada", coords: [-73.5673, 45.5017], yearsSpent: 1 },
  { name: "Nanaimo, Canada", coords: [-123.9401, 49.1659], yearsSpent: 3 },
  { name: "Nelson, Canada", coords: [-117.2948, 49.4934], daysSpent: 40 },
  { name: "North Cyprus", coords: [33.3333, 35.3333], daysSpent: 14 },
  { name: "Ocos, Guatemala", coords: [-92.1903, 14.5058], daysSpent: 20 },
  { name: "Osoyoos, Canada", coords: [-119.4687, 49.0323], yearsSpent: 2 },
  { name: "Panama City, Panama", coords: [-79.5167, 8.9833], daysSpent: 10 },
  { name: "Phoenix, USA", coords: [-112.074, 33.4484], daysSpent: 6 },
  {
    name: "Prince Albert, Canada",
    coords: [-105.7495, 53.2033],
    daysSpent: 22,
  },
  {
    name: "Puerto Vallarta, Mexico",
    coords: [-105.2374, 20.6534],
    daysSpent: 15,
  },
  { name: "Regina, Canada", coords: [-104.6189, 50.4452], yearsSpent: 7 },
  { name: "San Diego, USA", coords: [-117.1611, 32.7157], daysSpent: 26 },
  {
    name: "San Blas Islands, Panama",
    coords: [-78.9767, 9.5721],
    daysSpent: 30,
  },
  {
    name: "Santa Teresa, Costa Rica",
    coords: [-85.1605, 9.6477],
    daysSpent: 7,
  },
  { name: "Sarandë, Albania", coords: [19.9836, 39.8757], daysSpent: 4 },
  { name: "Saskatoon, Canada", coords: [-106.6345, 52.1332], yearsSpent: 12 },
  { name: "Sofia, Bulgaria", coords: [23.3219, 42.6977], daysSpent: 4 },
  { name: "Toronto, Canada", coords: [-79.3832, 43.6532], daysSpent: 22 },
  { name: "Tulum, Mexico", coords: [-87.4667, 20.2117], daysSpent: 9 },
  { name: "Vancouver, Canada", coords: [-123.1216, 49.2827], yearsSpent: 10 },
  { name: "Victoria, Canada", coords: [-123.3656, 48.4284], yearsSpent: 5 },
  { name: "Winnipeg, Canada", coords: [-97.1375, 49.8951], daysSpent: 5 },
];

const MapLibreComponent = () => {
  const mapContainerRef = useRef(null);

  const calculateVisitedCircleSize = (days) => {
    const maxDays = 90; // Max days for visited
    const baseSize = window.innerWidth < 768 ? 7 : 10; // Smaller base for small screens
    const maxSize = window.innerWidth < 768 ? 14 : 20; // Smaller max size for small screens
    return Math.min(
      baseSize + (days / maxDays) * (maxSize - baseSize),
      maxSize
    );
  };

  const calculateLivedCircleSize = (years) => {
    const maxYears = 20; // Example maximum years for scaling
    const baseSize = window.innerWidth < 768 ? 11 : 13; // Smaller base for small screens
    const maxSize = window.innerWidth < 768 ? 25 : 40; // Smaller max size for small screens
    return Math.min(
      baseSize + (years / maxYears) * (maxSize - baseSize),
      maxSize
    );
  };

  const calculateVisitedGradientColor = (days) => {
    const maxDays = 90;
    const normalized = Math.min(days / maxDays, 1);

    const r = Math.round(173 * (1 - normalized));
    const g = Math.round(216 * (1 - normalized));
    const b = Math.round(230 + 25 * normalized);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const calculateLivedGradientColor = (years) => {
    const minYears = 1;
    const maxYears = 20;
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
