import React, { useEffect, useState } from "react";
import {
  FaRegBookmark,
  FaCommentDots,
  FaInfoCircle,
  FaShareAlt,
  FaGreaterThan,
  FaLessThan,
  FaHammer,
} from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { bookmarkPost } from "@/api/product";
import { formatDate } from "@/utils/formatDate";
import BidEndTimer from "./BidEndTimer";
import DropdownMenuComponent from "./DropdownMenuComponent";
import { formatAddress } from "@/utils/formatAddress";
import { Link } from "react-router-dom";

// Define the interface for the post prop
interface BidCardProps {
  post: {
    _id?: string;
    productName?: string;
    basePrice?: number;
    userId?: string;
    productImageUrls?: string[];
    category?: string;
    subCategory?: string;
    phone?: number;
    description?: string;
    productCondition?: string;
    bookmarkedCount?: number;
    address?: string;
    userDetails?: {
      imageUrl?: string;
      userName?: string;
    };
    isBookmarked?: boolean;
    createdAt?: string;
    productAge?: string;
    bidEndTime?: string;
    bidAcceptedTime?: string;
  };
}

const BidCard = ({ post }: BidCardProps) => {
  const [slides, setSlides] = useState<string[]>([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideLength, setSlideLength] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkedCount, setBookmarkedCount] = useState(0);
  // const [postedDate, setPostedDate] = useState("");

  useEffect(() => {
    setSlides(post.productImageUrls || []);
    setSlideLength((post.productImageUrls.length || 1) - 1);
    setIsBookmarked(post?.isBookmarked || false);
    setBookmarkedCount(post?.bookmarkedCount || 0);
    // setPostedDate(formatDate(post.createdAt));
  }, [post]);

  const arrowRightClick = () => {
    if (slideLength > 0 && slideIndex < slideLength) {
      setSlideIndex((currentIndex) => currentIndex + 1);
    }
  };

  const arrowLeftClick = () => {
    if (slideLength > 0 && slideIndex > 0) {
      setSlideIndex((currentIndex) => currentIndex - 1);
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
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 mb-2 border-2 border-gray-200 dark:border-gray-700">
    {/* <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800  border-2 border-gray-200 dark:border-gray-700"> */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
            <img
              src={post?.userDetails?.imageUrl}
              alt="user profile image"
              className="w-full h-full object-cover bg-white"
              //  className="w-full h-full object-contain bg-white"
            />
          </div>
          <div className="ml-4">
            <div className="text-lg font-bold dark:text-white ">
              {post?.userDetails.userName}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {formatAddress(post?.address)}
            </div>
          </div>
        </div>
        <DropdownMenuComponent postId={post?._id} />
        <div className="text-gray-600 dark:text-gray-400 text-sm">
          {post.bidAcceptedTime && formatDate(post?.bidAcceptedTime)}
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="text-lg font-semibold dark:text-white">
          <h1 className="text-gray-500"> {post?.productAge} </h1>
          <h1>{post?.productName}</h1>
        </div>
        <div className="flex justify-end">
          <span className="text-red-500 dark:text-red-500 font-bold px-2 py-1 text-xs border border-red-500 dark:border-red-500 rounded-full">
            BID
          </span>
        </div>
      </div>
      <div className="relative w-full">
        <div
          className="flex items-center transition-transform duration-500 "
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex justify-center items-center w-full h-full"
            >
              <img
                key={index}
                // className="w-full"
                className="w-full h-full object-cover  bg-white"
                src={slide}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex justify-between items-center px-4">
          {slideIndex !== 0 ? (
            <button
              className="bg-gray-400 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white p-2 rounded-full"
              onClick={arrowLeftClick}
            >
              <FaLessThan />
            </button>
          ) : (
            <div className="w-8 h-8"></div>
          )}
          {slideIndex !== slideLength ? (
            <button
              className="bg-gray-400 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white p-2 rounded-full"
              onClick={arrowRightClick}
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
        <div className="grid grid-cols-2">
          <div className="text-black dark:text-white text-lg font-bold col-span-1">
            <div>
              highest bid:
              <span className="text-red-600 dark:text-red-400">
                25000-dummyContent
              </span>
            </div>
            <div>
              base price:
              <span className="text-blue-600 dark:text-blue-400">
                {post?.basePrice}
              </span>
            </div>
          </div>
          <div className="text-red-600 dark:text-red-400 text-sm font-bold col-span-1 p-2 ">
            {/* base price: 25,000 */}
            <div className="text-black dark:text-white pb-2">
              {post?.bidEndTime && <BidEndTimer endDate={post?.bidEndTime} />}
              {/* <span className="text-red-600 dark:text-red-400">23:45:01</span> */}
            </div>
            <div className="text-black dark:text-white">
              bid ends: {post?.bidEndTime && formatDate(post?.bidEndTime)}
            </div>
          </div>
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
          <Link to={"/post/post-details"} state={{ pId: post?._id }}>
            <button className="flex items-center text-gray-600 dark:text-gray-400">
              <FaHammer className="h-6 w-6" />
            </button>
          </Link>
          <button className="flex items-center text-gray-600 dark:text-gray-400">
            <FaInfoCircle className="h-6 w-6" />
          </button>
          <button className="flex items-center text-gray-600 dark:text-gray-400">
            <FaShareAlt className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidCard;
