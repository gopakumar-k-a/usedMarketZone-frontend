import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { useState } from "react";

function SlideCurosal({ slides }: { slides: string[] }) {
  const [isHovered, setIsHovered] = useState(false);
  const settings = {
    dots: slides.length > 1,
    infinite: slides.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: slides.length > 1 && isHovered ? <NextArrow /> : undefined,
    prevArrow: slides.length > 1 && isHovered ? <PrevArrow /> : undefined,
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="max-h-80">
            <img
              style={{
                maxHeight: "20rem",
                height: "20rem",
                objectFit: "contain",
              }}
              src={slide}
              alt="uploaded pic"
              className="w-full h-full object-cover bg-white max-h-80"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SlideCurosal;
interface ArrowProps {
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 right-5 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full cursor-pointer z-10"
    >
      <FaGreaterThan />
    </div>
  );
};

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 left-5 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full cursor-pointer z-10"
    >
      <FaLessThan />
    </div>
  );
};
