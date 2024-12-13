import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
// import { Navigation, Pagination } from "swiper/modules";
import alanya from "../assets/travel/alanya-castle-wall.jpg";
import alanya2 from "../assets/travel/alanya-lights-169.jpg";
import athens from "../assets/athens-city-sea.jpg";
import cenang from "../assets/travel/cenang-sunset-916.jpg";
import fetihye from "../assets/travel/ghost-town-rainbow.jpg";
import kalkan from "../assets/travel/kalkan-harbor-43.jpg";
import kaputas from "../assets/travel/kaputas-4.jpg";
import kaputas2 from "../assets/travel/kaputas-flowers.jpg";
import kas from "../assets/travel/kas-street.jpg";
import kas2 from "../assets/travel/kas-harbor.jpg";
import langkawi from "../assets/travel/langkawi-wfalls-12.jpg";
import macau from "../assets/travel/macao-green-plants.jpg";
import malta from "../assets/travel/gozo-gate-169.jpg";
import rhodes from "../assets/travel/rhodes-windmills.jpg";

const places = [
  {
    title: "Kalkan, Türkiye",
    image: kalkan,
  },
  {
    title: "Langkawi, Malaysia",
    image: langkawi,
  },
  {
    title: "Kaş, Türkiye",
    image: kas2,
  },
  {
    title: "Gozo, Malta",
    image: malta,
  },
  {
    title: "Kaş, Türkiye",
    image: kas,
  },
  {
    title: "Alanya, Türkiye",
    image: alanya,
  },
  {
    title: "Pantai Cenang, Langkawi",
    image: cenang,
  },
  {
    title: "Rhodes Island, Greece",
    image: rhodes,
  },
  {
    title: "Kaputaş, Türkiye",
    image: kaputas2,
  },
  {
    title: "Fethiye, Türkiye",
    image: fetihye,
  },
  {
    title: "Athens, Greece",
    image: athens,
  },
  {
    title: "Macau SAR, China",
    image: macau,
  },
  {
    title: "Kaputaş, Türkiye",
    image: kaputas,
  },
  {
    title: "Alanya, Türkiye",
    image: alanya2,
  },
];

const Travels = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openModal = (index) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  // Wrap handleNext in useCallback
  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % places.length);
    }
  }, [selectedIndex]);

  // Wrap handlePrevious in useCallback
  const handlePrevious = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        (prevIndex) => (prevIndex - 1 + places.length) % places.length
      );
    }
  }, [selectedIndex]);

  // Add event listener for keydown when modal is open
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedIndex !== null) {
        if (event.key === "ArrowRight") {
          handleNext();
        } else if (event.key === "ArrowLeft") {
          handlePrevious();
        } else if (event.key === "Escape") {
          closeModal();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, handleNext, handlePrevious]);

  return (
    <div className="w-full px-8 py-24 bg-gradient-to-b from-gray-200 via-white to-gray-100">
      <h2 className="text-2xl sm:text-3xl font-lexend font-extrabold text-center mb-12 text-gray-800">
        Travel Photos
      </h2>
      <Swiper
        slidesPerView={3} // Default number of slides visible
        centeredSlides={true}
        spaceBetween={30}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 70,
          stretch: 50,
          depth: 200,
          modifier: 1.5,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Navigation, Pagination]}
        className="mySwiper"
        breakpoints={{
          240: { slidesPerView: 1.5, spaceBetween: 10 }, // Phones in portrait mode
          480: { slidesPerView: 2.5, spaceBetween: 15 }, // Larger phones
          768: { slidesPerView: 2.5, spaceBetween: 20 }, // Tablets
          1024: { slidesPerView: 3.5, spaceBetween: 30 }, // Desktops
        }}
      >
        {places.map((place, index) => (
          <SwiperSlide
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={() => openModal(index)}
          >
            <img
              src={place.image}
              alt={place.title}
              className="w-full h-[50vh] object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-1 rounded-md text-sm sm:text-base">
              {place.title}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal for Enlarged Photo */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={closeModal}
        >
          <div
            className="relative flex items-center"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
          >
            <button
              onClick={handlePrevious}
              className="absolute left-4 text-white text-3xl font-bold hover:text-gray-400 z-10"
            >
              &#8592;
            </button>
            <img
              src={places[selectedIndex].image}
              alt={places[selectedIndex].title}
              className="w-auto h-auto max-w-[90vw] max-h-[90vh] rounded-lg"
            />
            <button
              onClick={handleNext}
              className="absolute right-4 text-white text-3xl font-bold hover:text-gray-400 z-10"
            >
              &#8594;
            </button>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-400"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Travels;
