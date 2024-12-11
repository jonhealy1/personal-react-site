import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const locations = [
  { name: "Sofia, Bulgaria", coords: [23.3219, 42.6977] },
  { name: "Athens, Greece", coords: [23.7275, 37.9838] },
  { name: "Corfu Island, Greece", coords: [19.9211, 39.6243] },
  { name: "Fethiye, Turkey", coords: [29.1168, 36.6219] },
];

const MapLibreComponent = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Initialize the map
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [23.7275, 37.9838], // Centered near Athens
      zoom: 4,
    });

    // Add custom markers for each location
    locations.forEach((location) => {
      // Create custom marker element
      const markerEl = document.createElement("div");
      markerEl.className = "custom-marker";
      markerEl.style.width = "20px";
      markerEl.style.height = "20px";
      markerEl.style.backgroundColor = "#007BFF";
      markerEl.style.borderRadius = "50%";
      markerEl.style.border = "2px solid white";
      markerEl.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.2)";

      // Add marker to the map
      new maplibregl.Marker({ element: markerEl })
        .setLngLat(location.coords)
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(
            `<h3>${location.name}</h3>`
          )
        ) // Optional popup
        .addTo(map);
    });

    // Cleanup on unmount
    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-screen"
      style={{ height: "400px" }}
    ></div>
  );
};

export default MapLibreComponent;
