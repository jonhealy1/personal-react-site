import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const locations = [
  { name: "Ankara, Turkey", coords: [32.8597, 39.9208] },
  { name: "Athens, Greece", coords: [23.7275, 37.9838] },
  { name: "Bangkok, Thailand", coords: [100.5018, 13.7563] },
  { name: "Calgary, Canada", coords: [-114.0719, 51.0447] },
  { name: "Cartagena, Colombia", coords: [-75.4794, 10.391] },
  { name: "Corfu Island, Greece", coords: [19.9211, 39.6243] },
  { name: "Fethiye, Turkey", coords: [29.1168, 36.6219] },
  { name: "Konya, Turkey", coords: [32.4845, 37.8746] },
  { name: "Langkawi, Malaysia", coords: [99.7985, 6.3628] },
  { name: "Macau, China", coords: [113.5439, 22.1987] },
  { name: "Phuket, Thailand", coords: [98.3394, 7.8804] },
  { name: "Saskatoon, Canada", coords: [-106.6345, 52.1332] },
  { name: "Sofia, Bulgaria", coords: [23.3219, 42.6977] },
  { name: "Toronto, Canada", coords: [-79.3832, 43.6532] },
  { name: "Vancouver, Canada", coords: [-123.1216, 49.2827] },
  { name: "Victoria, Canada", coords: [-123.3656, 48.4284] },
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
      const markerEl = document.createElement("div");
      markerEl.className = "custom-marker";
      markerEl.style.width = "14px";
      markerEl.style.height = "14px";
      markerEl.style.backgroundColor = "#007BFF";
      markerEl.style.borderRadius = "50%";
      markerEl.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      markerEl.style.cursor = "pointer";

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
    <section className="bg-gray-100 py-12 px-4 sm:px-8 lg:px-16 shadow-lg rounded-lg">
      <h2 className="text-2xl sm:text-3xl font-lexend font-extrabold text-center mb-12 text-gray-800">
        My Places
      </h2>
      <p className="text-lg text-center text-gray-600 mb-6">
        Explore the places I’ve traveled to around the world.
      </p>
      <div
        ref={mapContainerRef}
        className="w-full rounded-lg shadow-lg"
        style={{
          height: "50vh", // Height relative to viewport
          maxHeight: "500px", // Maximum height
          minHeight: "300px", // Minimum height for very narrow screens
        }}
      ></div>
    </section>
  );
};

export default MapLibreComponent;
