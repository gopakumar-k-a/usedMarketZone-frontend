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
import { SharePostDialogue } from "@/components/post/SharePostModal";
function ShowPostDetails() {
  const location = useLocation();
  // const [postId, setPostId] = useState("");
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState<ProductInterface | null>(null);
  const [selectedPostIdShare, setSelectedPostIdShare] = useState<string>("");
  const [isShareModalOpen, setShareModalOpen] = useState<boolean>(false);
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
  const postIdCallBack = (postId: string) => {
    console.log(" postIdCallBack", postId);
    setSelectedPostIdShare(postId);
  };
  const handleShareModalClose = () => {
    setShareModalOpen(false);
  };
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
                  <BidCard
                    key={postData._id}
                    post={postData}
                    postIdCallBack={postIdCallBack}
                    setShareModalOpen={setShareModalOpen}
                  />
                ) : (
                  <ProductCard
                    key={postData._id}
                    post={postData}
                    postIdCallBack={postIdCallBack}
                    setShareModalOpen={setShareModalOpen}
                  />
                )}
              </div>
              {/* <ProductCard
                key={post._id}
                post={post}
                setShareModalOpen={setShareModalOpen}
                postIdCallBack={postIdCallBack}

              /> */}
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
      {isShareModalOpen && selectedPostIdShare && (
        <SharePostDialogue
          isOpen={isShareModalOpen}
          onClose={handleShareModalClose}
          selectedPostIdShare={selectedPostIdShare}
        />
      )}
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
