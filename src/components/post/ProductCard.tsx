import { useEffect, useState } from "react";
import { FaRegBookmark, FaCommentDots, FaShareAlt } from "react-icons/fa";
import { FaBookmark, FaHandshake } from "react-icons/fa6";
import DropdownMenuComponent from "./DropdownMenuComponent";
import { bookmarkPost } from "@/api/product";
import { format, isToday, isYesterday } from "date-fns";
import { formatAddress } from "@/utils/formatAddress";
import { Link, useNavigate } from "react-router-dom";
import { store } from "@/redux/app/store";
// import Carousel from "./Curosal";
import AskProductDialogue from "./AskProductDialogue";
import ProductInterface from "@/types/product";
import SlideCurosal from "./SlideCurosal";
import { Badge } from "../ui/badge";

const ProductCard = ({
  post,
  setShareModalOpen,
  postIdCallBack,
}: {
  post: ProductInterface;
  setShareModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postIdCallBack: (productId: string) => void;
}) => {
  const handleShareProductData = (productId: string) => {
    postIdCallBack(productId);
    setShareModalOpen(true);
  };
  const [slides, setSlides] = useState<string[]>([]);

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [bookmarkedCount, setBookmarkedCount] = useState(0);

  const [isAskProductModalOpen, setAskProductModalOpen] = useState(false);
  const [isDeActive, setDeActive] = useState(post.isDeactivatedPost);

  const ownerId = store.getState().auth.user?._id;
  const navigate=useNavigate()

  const formatDate = (dateString: string) => {
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
    setSlides(post?.productImageUrls);
    setIsBookmarked(post?.isBookmarked);
    setBookmarkedCount(post?.bookmarkedCount);
  }, []);

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
  const navigateToUserProfile = (id: string = post.userId) => {
    navigate("/user-profile", { state: { userId: id } });
  };
  return (
    // <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 mb-2 border-2 border-gray-200 dark:border-gray-700">
    // <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 mb-2 border-2 border-gray-200 dark:border-gray-700">
    <>
      <div className=" w-full h-full">
        <div className="max-w-sm sm:max-w-md  md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 mb-2 border-2 border-gray-200 dark:border-gray-700">
          {/* <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700"> */}
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden cursor-pointer"  onClick={()=>navigateToUserProfile()}>
                <img
                  src={post?.userDetails?.imageUrl}
                  alt="user profile image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <div className="text-lg font-bold dark:text-white cursor-pointer"  onClick={()=>navigateToUserProfile()}>
                  {post?.userDetails.userName}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {formatAddress(post?.address)}
                </div>
              </div>
            </div>
            <span>{isDeActive && <Badge>De-active Post</Badge>}</span>
            <div className="text-gray-600 dark:text-gray-400 text-sm ">
              {/* <div className="flex justify-end w-full" > */}
              <DropdownMenuComponent
                postId={post?._id}
                ownerId={post.userId}
                isDeActive={isDeActive}
                setDeActive={setDeActive}
                isBidding={post.isBidding}
              />
              {/* </div> */}
      

              {formatDate(post.createdAt)}
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
          <SlideCurosal slides={slides} />
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
                    title="bookmark"
                  />
                ) : (
                  <FaRegBookmark
                    title="bookmark"
                    className="h-6 w-6"
                    onClick={() => handleBookmark(post._id)}
                  />
                )}
                <span className="ml-2">{bookmarkedCount}</span>
              </button>
              <Link to={"/post/post-details"} state={{ pId: post?._id }}>
                <button className="flex items-center text-gray-600 dark:text-gray-400">
                  <FaCommentDots title="comment" className="h-6 w-6" />
                </button>
              </Link>
              {ownerId && ownerId != post.userId && (
                <button
                  className="flex items-center text-gray-600 dark:text-gray-400"
                  onClick={() => setAskProductModalOpen(true)}
                >
                  <FaHandshake className="h-7 w-7" title="ask to buy" />
                </button>
              )}
              <button className="flex items-center text-gray-600 dark:text-gray-400">
                <FaShareAlt
                  className="h-6 w-6"
                  onClick={() => handleShareProductData(post._id)}
                  title="share product"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isAskProductModalOpen && (
        <AskProductDialogue
          postId={post._id}
          isAskProductModalOpen={isAskProductModalOpen}
          setAskProductModalOpen={setAskProductModalOpen}
          postImageUrl={slides[0]}
          postOwnerId={post.userId}
        />
      )}
    </>
  );
};

export default ProductCard;
