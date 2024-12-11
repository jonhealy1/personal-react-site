import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const locations = [
  { name: "Ankara, Turkey", coords: [32.8597, 39.9208] },
  { name: "Athens, Greece", coords: [23.7275, 37.9838] },
  { name: "Bangkok, Thailand", coords: [100.5018, 13.7563] },
  { name: "Bocas del Toro, Panama", coords: [-82.2516, 9.3339] },
  { name: "Ocos, Guatemala", coords: [-92.1903, 14.5058] },
  { name: "Cancún, Mexico", coords: [-86.8475, 21.1619] },
  { name: "Tulum, Mexico", coords: [-87.4667, 20.2117] },
  { name: "Cabo San Lucas, Mexico", coords: [-109.9124, 22.8905] },
  { name: "Calgary, Canada", coords: [-114.0719, 51.0447] },
  { name: "Cartagena, Colombia", coords: [-75.4794, 10.391] },
  { name: "Corfu Island, Greece", coords: [19.9211, 39.6243] },
  { name: "Fethiye, Turkey", coords: [29.1168, 36.6219] },
  { name: "Halifax, Canada", coords: [-63.5752, 44.6488] },
  { name: "Hoi An, Vietnam", coords: [108.3275, 15.8801] },
  { name: "Istanbul, Turkey", coords: [28.9784, 41.0082] },
  { name: "Izmir, Turkey", coords: [27.1428, 38.4237] },
  { name: "Kalkan, Turkey", coords: [29.4183, 36.2641] },
  { name: "Konya, Turkey", coords: [32.4845, 37.8746] },
  { name: "Kota Kinabalu, Malaysia", coords: [116.0724, 5.978] },
  { name: "Langkawi, Malaysia", coords: [99.7985, 6.3628] },
  { name: "Macau, China", coords: [113.5439, 22.1987] },
  { name: "Malta", coords: [14.3754, 35.8997] },
  { name: "Moalboal, Philippines", coords: [123.3983, 9.9472] },
  { name: "Montreal, Canada", coords: [-73.5673, 45.5017] },
  { name: "Nelson, Canada", coords: [-117.2948, 49.4934] },
  { name: "North Cyprus", coords: [33.3333, 35.3333] },
  { name: "Panama City, Panama", coords: [-79.5167, 8.9833] },
  { name: "Phoenix, USA", coords: [-112.074, 33.4484] },
  { name: "Prince Albert, Canada", coords: [-105.7495, 53.2033] },
  { name: "Puerto Vallarta, Mexico", coords: [-105.2374, 20.6534] },
  { name: "Regina, Canada", coords: [-104.6189, 50.4452] },
  { name: "San Diego, USA", coords: [-117.1611, 32.7157] },
  { name: "San Blas Islands, Panama", coords: [-78.9767, 9.5721] },
  { name: "Santa Teresa, Costa Rica", coords: [-85.1605, 9.6477] },
  { name: "Sarandë, Albania", coords: [19.9836, 39.8757] },
  { name: "Saskatoon, Canada", coords: [-106.6345, 52.1332] },
  { name: "Sofia, Bulgaria", coords: [23.3219, 42.6977] },
  { name: "St. John's, New Brunswick, Canada", coords: [-66.0762, 45.2733] },
  { name: "Toronto, Canada", coords: [-79.3832, 43.6532] },
  { name: "Vancouver, Canada", coords: [-123.1216, 49.2827] },
  { name: "Victoria, Canada", coords: [-123.3656, 48.4284] },
  { name: "Winnipeg, Canada", coords: [-97.1375, 49.8951] },
];

const livedPlaces = [
  "Regina, Canada",
  "Saskatoon, Canada",
  "Victoria, Canada",
  "Vancouver, Canada",
  "Macau, China",
  "Ankara, Turkey",
  "Montreal, Canada",
];

const MapLibreComponent = () => {
  const mapContainerRef = useRef(null);

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
      let markerEl;

      if (location.name === "Regina, Canada") {
        markerEl = document.createElement("div");
        markerEl.innerHTML = "★"; // Star icon
        markerEl.style.color = "black";
        markerEl.style.fontSize = "20px";
        markerEl.style.cursor = "pointer";
      } else {
        markerEl = document.createElement("div");
        markerEl.className = "custom-marker";
        markerEl.style.width = "14px";
        markerEl.style.height = "14px";
        markerEl.style.borderRadius = "50%";
        markerEl.style.cursor = "pointer";
        markerEl.style.backgroundColor = livedPlaces.includes(location.name)
          ? "#00AA00" // green
          : "#007BFF"; // blue
      }

      new maplibregl.Marker({ element: markerEl })
        .setLngLat(location.coords)
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(
            `<h3>${location.name}</h3>`
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
      <div className="mt-4 flex justify-center space-x-8 text-gray-700 font-lexend">
        <div className="flex items-center space-x-2">
          <span
            className="inline-block w-4 h-4 rounded-full"
            style={{ backgroundColor: "#00AA00" }}
          ></span>
          <span>Places I Lived</span>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className="inline-block w-4 h-4 rounded-full"
            style={{ backgroundColor: "#007BFF" }}
          ></span>
          <span>Places I Visited</span>
        </div>
        <div className="flex items-center space-x-2">
          <span style={{ color: "black", fontSize: "20px" }}>★</span>
          <span>Birthplace (Regina)</span>
        </div>
      </div>
    </section>
  );
};

export default MapLibreComponent;
