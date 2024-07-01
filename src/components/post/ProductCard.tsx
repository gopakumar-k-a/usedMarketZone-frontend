import React, { useEffect, useState } from "react";
import {
  FaRegBookmark,
  FaCommentDots,
  FaInfoCircle,
  FaShareAlt,
  FaGreaterThan,
  FaLessThan,
} from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import DropdownMenuComponent from "./DropdownMenuComponent";
import { bookmarkPost } from "@/api/product";
import { format, isToday, isYesterday } from "date-fns";
import { formatAddress } from "@/utils/formatAddress";
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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkedCount, setBookmarkedCount] = useState(0);
  const [postedDate, setPostedDate] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return `Today, ${format(date, "h:mm a")}`;
    } else if (isYesterday(date)) {
      return `Yesterday, ${format(date, "h:mm a")}`;
    } else {
      return format(date, "MMMM d, yyyy, h:mm a");
    }
  };
  useEffect(() => {
    setSlides(post.productImageUrls);
    setSlideLength(post.productImageUrls.length - 1);
    setIsBookmarked(post?.isBookmarked);
    setBookmarkedCount(post?.bookmarkedCount);
    setPostedDate(formatDate(post.createdAt));
  }, []);
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

  const handleBookmark = async (postId: string) => {
    try {
      await bookmarkPost(postId).then((response) => {
        const { action } = response;
        if (action == "added") {
          setIsBookmarked(true);
          setBookmarkedCount((prevCount) => (prevCount += 1));
        } else if (action == "removed") {
          setIsBookmarked(false);
          setBookmarkedCount((prevCount) => (prevCount -= 1));
        }
      });
    } catch (error) {
      console.error("Error while bookmarking:", error);
      alert("Failed to update bookmark. Please try again.");
    }
  };

  return (
    // <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 mb-2 border-2 border-gray-200 dark:border-gray-700">
    // <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 mb-2 border-2 border-gray-200 dark:border-gray-700">
    <div className="bg-red-600 w-full h-full">
      <div className="max-w-sm sm:max-w-md  md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 mb-2 border-2 border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
              <img
                src={post?.userDetails?.imageUrl}
                alt="user profile image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4">
              <div className="text-lg font-bold dark:text-white">
                {post?.userDetails.userName}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {formatAddress(post?.address)}
              </div>
            </div>
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            <DropdownMenuComponent postId={post?._id} />
            {/* Today, 8:35 am */}
            {postedDate}
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="text-lg font-semibold dark:text-white">
            <h1 className="text-gray-500"> {post?.productAge} </h1>
            <h1>{post?.productName}</h1>
          </div>
          <div className="flex justify-end">
            <span className="text-black dark:text-white font-bold px-2 py-1 text-xs border border-black dark:border-white rounded-full">
              SALE
            </span>
          </div>
        </div>
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
                className="bg-gray-400 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white p-2 rounded-full"
                onClick={() => arrowLeftClick()}
              >
                <FaLessThan />
              </button>
            ) : (
              <div className="w-8 h-8"></div>
            )}
            {slideIndex !== slideLength ? (
              <button
                className="bg-gray-400 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white p-2 rounded-full"
                onClick={() => arrowRightClick()}
              >
                <FaGreaterThan />
              </button>
            ) : (
              <div className="w-8 h-8"></div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${
                  slideIndex === index
                    ? "bg-gray-300 dark:bg-gray-500"
                    : "bg-gray-700 dark:bg-gray-900"
                }`}
              ></div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="text-blue-600 dark:text-blue-400 text-lg font-bold">
            price: {post?.basePrice}
          </div>
          <div className="flex justify-around mt-4">
            <button className="flex items-center text-gray-600 dark:text-gray-400">
              {isBookmarked ? (
                <FaBookmark
                  className="h-6 w-6 text-blue-500 dark:text-blue-300"
                  onClick={() => handleBookmark(post._id)}
                />
              ) : (
                <FaRegBookmark
                  className="h-6 w-6"
                  onClick={() => handleBookmark(post._id)}
                />
              )}
              <span className="ml-2">{bookmarkedCount}</span>
            </button>
            <button className="flex items-center text-gray-600 dark:text-gray-400">
              <FaCommentDots className="h-6 w-6" />
            </button>
            <button className="flex items-center text-gray-600 dark:text-gray-400">
              <FaInfoCircle className="h-6 w-6" />
            </button>
            <button className="flex items-center text-gray-600 dark:text-gray-400">
              <FaShareAlt className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
