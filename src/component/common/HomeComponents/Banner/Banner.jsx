import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Banner = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    customPaging: (i) => (
      <FontAwesomeIcon
        icon={i === currentSlide ? faCircleNotch : faCircle}
        className={i === currentSlide ? "text-teal-500" : "text-gray-400"}
      />
    ),
    appendDots: (dots) => (
      <div className="p-2">
        <ul className="flex space-x-2 justify-center">{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="w-full h-[60vh] mx-auto mb-8 overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-full">
            <img src={slide.image} alt={slide.alt} className="w-full h-[60vh] object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 px-4">
              <h2 className="text-white text-2xl font-bold mb-4 text-center">{slide.title}</h2>
              <button
                className="px-6 py-2 text-white bg-teal-500 rounded hover:bg-teal-600 focus:outline-none mt-4"
                onClick={() => alert(`Viewing ${slide.title}`)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
