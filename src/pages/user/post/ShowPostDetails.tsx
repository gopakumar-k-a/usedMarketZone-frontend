import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductInterface from "@/types/product";
import { getUserPostDetails } from "@/api/product";
import Loader from "@/components/loader/Loader";
import BidCard from "@/components/post/BidCard";
import ProductCard from "@/components/post/ProductCard";
import Discussion from "../../../components/post/comment/Discussions";
import PlaceBid from "@/components/post/bid/PlaceBid";
import { ImHammer2 } from "react-icons/im";
function ShowPostDetails() {
  const location = useLocation();
  // const [postId, setPostId] = useState("");
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState<ProductInterface | null>(null);
  const { pId } = location.state;
  const isBidEnded = (bidEndTime: string) => {
    const currentTime = new Date().getTime();

    const bidEndTimeDate = new Date(bidEndTime).getTime();

    return currentTime < bidEndTimeDate;
  };
  // const getPostData = async () => {
  //   const postData = await getUserPostDetails(postId);
  //   setPostData(postData);
  // };
  // useEffect(() => {
  //   setPostId(pId);
  //   getPostData()
  //   // console.log("postData ", postData);
  // }, []);

  useEffect(() => {
    if (location.state && location.state.pId) {
      const getPostData = async () => {
        setLoading(true);
        try {
          const { postDetails } = await getUserPostDetails(pId);
          //   {
          //     "success": true,
          //     "message": "owner post image list retrived successfully",
          //     "postDetails": {
          //         "isBidding": false,
          //         "isAdminAccepted": false,
          //         "_id": "66790013c2739aea895a11da",
          //         "productName": "sdfdsf",
          //         "basePrice": 455563434,
          //         "userId": "666092075d83d5cf5b71f485",
          //         "productImageUrls": [
          //             "https://res.cloudinary.com/dwjw8biat/image/upload/v1719205906/t1kcr5gcbvvgkevfodv1.png",
          //             "https://res.cloudinary.com/dwjw8biat/image/upload/v1719205906/y18g48wzl7fu1qztwr1p.png",
          //             "https://res.cloudinary.com/dwjw8biat/image/upload/v1719205906/hyamf8mvwwqqmapt37bw.png"
          //         ],
          //         "category": "books",
          //         "subCategory": "Non-Fiction",
          //         "phone": 9388867491,
          //         "description": "dsfdsfsdf",
          //         "productCondition": "Good",
          //         "productAge": "2 year used",
          //         "address": "India, Kerala, Kanayannur, Thrippunithura, 682304",
          //         "bookmarkedUsers": [
          //             "666092075d83d5cf5b71f485"
          //         ],
          //         "bookmarkedCount": 1,
          //         "isBlocked": false,
          //         "isSold": false,
          //         "isOtpVerified": false,
          //         "postStatus": "draft",
          //         "createdAt": "2024-06-24T05:11:47.890Z",
          //         "updatedAt": "2024-06-24T05:16:55.051Z",
          //         "__v": 0,
          //         "bidHistory": []
          //     }
          // }
          // const postData = await getUserPostDetails(pId);
          console.log("post data ", postDetails);

          setPostData(postDetails[0]);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      };
      getPostData();
    }
  }, [location.state]);
  useEffect(() => {
    if (postData?.bidEndTime)
      console.log("  postData.bidEndTime ", postData.bidEndTime);
  }, []);

  return (
    <>
      {!loading && postData && (
        <div className="grid grid-cols-5  h-full w-full ">
          <div
            className="sm:col-span-3 
       col-span-5
          "
          >
            <div className="flex  justify-center ">
              <div className="w-5/6  h-screen  ">
                {postData.isBidding ? (
                  <BidCard post={postData} />
                ) : (
                  <ProductCard post={postData} />
                )}
              </div>
            </div>
          </div>
          <div className="sm:col-span-2 col-span-5 w-full flex justify-center-center border-gray-200 border-l-2 ">
            <div className="flex items-center justify-center w-full">
              {postData.isBidding ? (
                isBidEnded(postData?.bidEndTime) ? (
                  !loading &&
                  postData && (
                    <PlaceBid
                      pId={pId}
                      ownerId={postData.userId}
                      basePrice={postData.basePrice}
                      highestBid={postData.currentHighestBid}
                      previousBidSumOfUser={postData.previousBidSumOfUser}
              
                    />
                  )
                ) : (
                  <BiddingEnded />
                )
              ) : (
                <> {!loading && postData && <Discussion pId={pId} />}</>
              )}
            </div>

            {/* <div className=" fixed sm:bottom-2 sm:w-4/12 w-full bottom-10">
              <PostComment />
            </div> */}
          </div>
        </div>
      )}
      {loading && <Loader />}
    </>
  );
}

export default ShowPostDetails;

function BiddingEnded() {
  return (
    <>
      <div className="flex-1 sm-pb-0 pb-16">
        <div className="w-full h-full  flex items-center justify-center">
          <div className="flex flex-col gap-2 items-center justify-center">
            <ImHammer2 className="text-gray-400 h-20 w-20" />
            <h1 className="font-bold text-4xl"> Bid Ended</h1>
            <div className="w-full flex items-center justify-center">
              <h1 className="font-medium text-2xl w-4/5">
                Can't Place Bid On This Product, Bid has Ended
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
