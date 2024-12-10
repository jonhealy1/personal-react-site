import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import athens from "../assets/athens-city-sea.jpg";

const places = [
  {
    title: "Athens, Greece",
    image: athens,
  },
  //   {
  //     title: "Tokyo, Japan",
  //     image: "../assets/tokyo.jpg",
  //   },
  //   {
  //     title: "Paris, France",
  //     image: "../assets/paris.jpg",
  //   },
  //   {
  //     title: "New York, USA",
  //     image: "../assets/newyork.jpg",
  //   },
];

const Travels = () => {
  return (
    <div className="w-full px-4 py-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">
        Places I've Traveled
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {places.map((place, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center">
            <img
              src={place.image}
              alt={place.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <h3 className="text-xl font-semibold mt-4">{place.title}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Travels;
