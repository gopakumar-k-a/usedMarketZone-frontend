import React, { useEffect, useState } from "react";
import {
  FaBookmark,
  FaCommentDots,
  FaInfoCircle,
  FaShareAlt,
  FaGreaterThan,
  FaLessThan,
} from "react-icons/fa";

// {
//   "_id": "66765c46f5504a614190e4aa",
//   "productName": "dsfds",
//   "basePrice": 23142,
//   "userId": "666092075d83d5cf5b71f485",
//   "productImageUrls": [
//       "https://res.cloudinary.com/dwjw8biat/image/upload/v1719032901/nrbrnzcnnbom2pmjwfzz.jpg",
//       "https://res.cloudinary.com/dwjw8biat/image/upload/v1719032902/trukghtgfa23uydzshis.jpg"
//   ],
//   "category": "vehicles",
//   "subCategory": "Motorcycles",
//   "phone": 3435,
//   "description": "dsfdsf",
//   "productCondition": "veryGood",
//   "bookmarkedCount": 0,
//   "userDetails": {
//       "imageUrl": "https://res.cloudinary.com/dwjw8biat/image/upload/v1719044266/ln1r91tabpuuafwfgeiv.jpg",
//       "userName": "gopa_kumar"
//   }
// }
const ProductCard = ({ post }) => {
  const [slides, setSlides] = useState([]);

  const [slideIndex, setSlideIndex] = useState(0);
  const [slideLength, setSlideLength] = useState(0);

  useEffect(() => {
    setSlides(post.productImageUrls);
    setSlideLength(post.productImageUrls.length - 1);
  }, []);

  // let indexValue = 0; // Initial slide index value
  // let currentSlide = slides[indexValue]; // variable index value we can reference later

  // Index value moves up, but doesn't update the image. Why???
  const arrowRightClick = () => {
    if (slideLength > 0 && slideIndex < slideLength) {
      setSlideIndex((currentIndex) => currentIndex + 1);

      console.log(slideIndex);
    }
  };
  const arrowLeftClick = () => {
    if (slideLength > 0 && slideIndex > 0) {
      setSlideIndex((currentIndex) => currentIndex - 1);
      console.log(slideIndex);
    }
  };
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white mb-2 border-2 border-gray-200 ">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img
              src={post?.userDetails?.imageUrl}
              alt="user profile image"
              className="w-full h-full object-cover"
            />
          </div>



          <div className="ml-4">
            <div className="text-lg font-bold">
              {post?.userDetails.userName}
            </div>
            <div className="text-sm text-gray-600">kochi, kerala</div>
          </div>
        </div>
        <div className="text-gray-600 text-sm">Today, 8:35 am</div>
      </div>
      <div className="px-6 py-4">
        <div className="text-lg font-semibold">
          {post?.productName}
          <span className="text-gray-500">{post?.productAge}</span>
        </div>
        <div className="flex justify-end">
          <span className="text-black font-bold px-2 py-1 text-xs border border-black rounded-full">
            SALE
          </span>
        </div>
      </div>
      {/* Replace with actual product image URL */}
      <div className="relative w-full">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              className="w-full"
              src={slide}
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex justify-between items-center px-4">
          {slideIndex !== 0 ? (
            <button
              className="bg-gray-400 hover:bg-gray-700 text-white p-2 rounded-full"
              onClick={() => arrowLeftClick()}
            >
              <FaLessThan />
            </button>
          ) : (
            <div className="w-8 h-8"></div> // Placeholder
          )}
          {slideIndex !== slideLength ? (
            <button
              className="bg-gray-400 hover:bg-gray-700 text-white p-2 rounded-full"
              onClick={() => arrowRightClick()}
            >
              <FaGreaterThan />
            </button>
          ) : (
            <div className="w-8 h-8"></div> // Placeholder
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                slideIndex === index ?  "bg-gray-300":"bg-gray-700"
              }`}
            ></div>
          ))}
        </div>
      </div>
   
      <div className="px-6 py-4">
        <div className="text-blue-600 text-lg font-bold">
          price: {post?.basePrice}
        </div>
        <div className="flex justify-around mt-4">
          <button className="flex items-center text-gray-600">
            <FaBookmark className="h-6 w-6" />
            <span className="ml-2">{post?.bookmarkedCount}</span>
          </button>
          <button className="flex items-center text-gray-600">
            <FaCommentDots className="h-6 w-6" />
          </button>
          <button className="flex items-center text-gray-600">
            <FaInfoCircle className="h-6 w-6" />
          </button>
          <button className="flex items-center text-gray-600">
            <FaShareAlt className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
