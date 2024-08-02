import { useEffect, useState } from "react";
import { getOwnerBidResult } from "@/api/bid";
import { ImHammer2 } from "react-icons/im";
import SlideCurosal from "../../SlideCurosal";
import UserCard from "@/components/user/SuggestedUserCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DispatchToAdminTrackingIdDialogue from "./DispatchToAdminTrackingIdDialogue";
import { shipProductToAdmin } from "@/api/payment";
function BidResultMain({ bidId }: { bidId: string }) {
  const [bidData, setBidData] = useState<any | null>(null);
  const [isProductClaimed, setProductClaimed] = useState(false);
  const [isDispatchToAdminDialogueOpen, setDispatchToAdminDialogueOpen] =
    useState(false);
  const fetchBidResultForOwner = async () => {
    const result: any = await getOwnerBidResult(bidId);
    console.log("result is ", result);

    if (result) {
      setBidData(result.bidResult);
      setProductClaimed(result.bidResult.isBidAmountPaid);
    }
  };

  const uploadTrackingNumberOfProductToAdmin = async (
    trackingNumber: string,
    productId: string
  ) => {
    console.log("trackingNumber ", trackingNumber);
    console.log("productId ", productId);
    await shipProductToAdmin({
      productId,
      trackingNumber,
    });
    // Add your API call or logic here to handle the submission
  };

  useEffect(() => {
    fetchBidResultForOwner();
  }, []);
  return (
    <>
      {bidData != null && (
        <>
          <p>{bidData?.productData?.productName}</p>
          <div className="container mx-auto p-6">
            <h1 className="font-bold text-xl"> Check Bid Results</h1>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:flex md:space-x-6">
              <div className="md:w-1/2">
                <SlideCurosal slides={bidData.productData.productImageUrls} />
              </div>
              <div className="md:w-1/2 mt-6 md:mt-0">
                {bidData.winnerData ? (
                  <>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      Bid Winner
                    </h1>
                    <UserCard userData={bidData.winnerData} />
                  </>
                ) : (
                  <h1 className="font-bold "> no Bids Were Placed</h1>
                )}

                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {bidData.productName}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-4">
                  {bidData.description}
                </p>
                <div className="mt-6">
                  {bidData.currentHighestBid ? (
                    <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      &#8377; {bidData.currentHighestBid}
                    </span>
                  ) : (
                    <Badge className="m-2" variant="destructive">
                      no bids
                    </Badge>
                  )}
                </div>
                <Link
                  to={"/post/post-details"}
                  state={{ pId: bidData.productData._id }}
                >
                  <Button className="bg-blue-500 hover:bg-blue-700">
                    <p className="mr-2"> bid details</p>
                    <ImHammer2 />
                  </Button>
                </Link>
                {isProductClaimed ? (
                  <>
                    <div className="flex gap-2">
                      <button className="mt-6  md:w-auto bg-green-600 dark:bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 pb-2 flex">
                        Payment Done
                      </button>
                      <button
                        className="mt-6  md:w-auto bg-yellow-600 dark:bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 pb-2 flex"
                        onClick={() => setDispatchToAdminDialogueOpen(true)}
                      >
                        Dispatch Product
                      </button>
                    </div>
                  </>
                ) : (
                  <button className="mt-6  md:w-auto bg-red-600 dark:bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 pb-2 flex">
                    payment not Done By Winner
                  </button>
                )}
              </div>
            </div>
          </div>
          {isDispatchToAdminDialogueOpen && (
            <DispatchToAdminTrackingIdDialogue
              isOpen={isDispatchToAdminDialogueOpen}
              onClose={() => setDispatchToAdminDialogueOpen(false)}
              productId={bidData.productData._id}
              uploadTrackingNumberOfProductToAdmin={
                uploadTrackingNumberOfProductToAdmin
              }
            />
          )}
        </>
      )}
    </>
  );
}

export default BidResultMain;
