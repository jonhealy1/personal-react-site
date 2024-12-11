import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapLibreComponent = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Initialize Map
    const map = new maplibregl.Map({
      container: mapContainerRef.current, // Container ID
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json", // Map Style URL
      center: [38, 35], // Initial center of the map [Longitude, Latitude]
      zoom: 1.5, // Initial zoom level
    });

    // Cleanup on unmount
    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-screen"
      style={{ height: "400px" }} // Set a height for the map
    ></div>
  );
};

export default MapLibreComponent;
