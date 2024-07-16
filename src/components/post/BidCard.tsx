import { useEffect, useState } from "react";
import { FaRegBookmark, FaInfoCircle, FaShareAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { bookmarkPost } from "@/api/product";
import { formatDate } from "@/utils/formatDate";
import BidEndTimer from "./BidEndTimer";
import DropdownMenuComponent from "./DropdownMenuComponent";
import { formatAddress } from "@/utils/formatAddress";
import { Link } from "react-router-dom";
import { ImHammer2 } from "react-icons/im";
import ProductInterface from "@/types/product";
import { store } from "@/redux/app/store";
// Define the interface for the post prop
import React from "react";

import SlideCurosal from "./SlideCurosal";
export interface BidCardProps {
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
    currentHighestBid: string;
  };
}

const BidCard = ({
  post,
  setShareModalOpen,
  postIdCallBack,
}: {
  post: ProductInterface;
  setShareModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postIdCallBack: (productId: string) => void;
}) => {
  const [slides, setSlides] = useState<string[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkedCount, setBookmarkedCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const ownerId = store.getState().auth.user?._id;
  // const [isShareModalOpen, setShareModalOpen] = useState(false);
  // const [postedDate, setPostedDate] = useState("");

  // const handleShareModalClose = () => {
  //   setShareModalOpen(false);
  // };

  const handleShareProductData = (productId: string) => {
    postIdCallBack(productId);
    setShareModalOpen(true);
  };

  useEffect(() => {
    setSlides(post.productImageUrls || []);
    // if (post.productImageUrls) {
    //   setSlideLength((post.productImageUrls.length || 1) - 1);
    // } else {
    //   setSlideLength(0);
    // }

    setIsBookmarked(post?.isBookmarked || false);
    setBookmarkedCount(post?.bookmarkedCount || 0);
    // setPostedDate(formatDate(post.createdAt));
  }, [post]);

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
  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   nextArrow: <><div>next</div></>,
  //   prevArrow: <><div>prev</div></>
  // };

  return (
    // <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 mb-2 border-2 border-gray-200 dark:border-gray-700">
    <>
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
                {post?.userDetails?.userName}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {formatAddress(post?.address)}
              </div>
            </div>
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            <DropdownMenuComponent
              postId={post?._id}
              ownerId={post.userId}
              isDeActive={isActive}
              setDeActive={setIsActive}
              isBidding={post.isBidding}
            />

            {formatDate(post.createdAt)}
          </div>
          {/* <DropdownMenuComponent postId={post?._id} />
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            {post.bidAcceptedTime && formatDate(post?.bidAcceptedTime)}
          </div> */}
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
        <SlideCurosal slides={slides} />

        <div className="px-6 py-4">
          <div className="grid grid-cols-2">
            <div className="text-black dark:text-white text-lg font-bold col-span-1">
              <div>
                highest bid:
                <span className="text-red-600 dark:text-red-400">
                  {post?.currentHighestBid
                    ? post?.currentHighestBid
                    : "no bids placed"}
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
                {/* {post?.bidEndTime} */}
                bid ends: {post?.bidEndTime && formatDate(post?.bidEndTime)}
              </div>
            </div>
          </div>

          <div className="flex justify-around mt-4">
            <button className="flex items-center text-gray-600 dark:text-gray-400">
              {/* {isBookmarked ? (
              <FaBookmark
                className="h-6 w-6 text-blue-500 dark:text-blue-300"
                onClick={() => handleBookmark(post._id)}
              />
            ) : (
              <FaRegBookmark
                className="h-6 w-6"
                onClick={() => handleBookmark(post._id)}
              />
            )} */}
              <div>
                {post._id &&
                  (isBookmarked ? (
                    <FaBookmark
                      className="h-6 w-6 text-blue-500 dark:text-blue-300"
                      onClick={() => handleBookmark(post._id!)}
                    />
                  ) : (
                    <FaRegBookmark
                      className="h-6 w-6"
                      onClick={() => handleBookmark(post._id!)}
                    />
                  ))}
              </div>
              <span className="ml-2">{bookmarkedCount}</span>
            </button>
            <Link to={"/post/post-details"} state={{ pId: post?._id }}>
              {/* {userId && userId != post.userId && (
             
              )} */}
              <button className="flex items-center text-gray-600 dark:text-gray-400">
                <ImHammer2 className="h-6 w-6" />
              </button>
            </Link>
            <button className="flex items-center text-gray-600 dark:text-gray-400">
              <FaInfoCircle className="h-6 w-6" />
            </button>
            <button className="flex items-center text-gray-600 dark:text-gray-400">
              <FaShareAlt
                className="h-6 w-6"
                onClick={() => handleShareProductData(post._id)}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BidCard;
