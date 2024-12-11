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
