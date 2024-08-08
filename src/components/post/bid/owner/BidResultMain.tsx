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
import BidResultProgressBar from "../orderTrack/BidResultProgressBar";
function BidResultMain({ bidId }: { bidId: string }) {
  const [bidData, setBidData] = useState<any | null>(null);
  const [isProductClaimed, setProductClaimed] = useState(false);
  const [isDispatchToAdminDialogueOpen, setDispatchToAdminDialogueOpen] =
    useState(false);
  const [shipmentStatus, setShipmentStatus] = useState<
    | "not_shipped"
    | "shipped_to_admin"
    | "received_by_admin"
    | "shipped_to_buyer"
    | "delivered"
  >("not_shipped");
  const fetchBidResultForOwner = async () => {
    const result: any = await getOwnerBidResult(bidId);
    console.log("result is ", result);

    if (result) {
      setBidData(result.bidResult);
      setProductClaimed(result.bidResult.isBidAmountPaid);
      setShipmentStatus(result.bidResult.transactionData.shipmentStatus);
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
    }).then(() => {
      setShipmentStatus("shipped_to_admin");
    });
    // Add your API call or logic here to handle the submission
  };

  useEffect(() => {
    fetchBidResultForOwner();
  }, []);
  const renderActionButton = () => {
    if (!isProductClaimed) {
      return (
        <button className="mt-6 md:w-auto bg-red-600 dark:bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 pb-2 flex">
          Payment not Done By Winner
        </button>
      );
    }

    switch (shipmentStatus) {
      case "not_shipped":
        return (
          <button
            className="mt-6 md:w-auto bg-yellow-600 dark:bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 pb-2 flex"
            onClick={() => setDispatchToAdminDialogueOpen(true)}
          >
            Dispatch Product
          </button>
        );
      case "shipped_to_admin":
        return (
          <button className="mt-6 md:w-auto bg-yellow-600 dark:bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 pb-2 flex">
            shipped to admin
          </button>
        );
      case "received_by_admin":
        return (
          <button className="mt-6 md:w-auto bg-orange-600 dark:bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 pb-2 flex">
            Admin Processing
          </button>
        );
      case "shipped_to_buyer":
        return (
          <button className="mt-6 md:w-auto bg-orange-600 dark:bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 pb-2 flex">
            shipped to buyer
          </button>
        );
      case "delivered":
        return (
          <button className="mt-6 md:w-auto bg-green-600 dark:bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 pb-2 flex">
            Delivered and payment recieved in wallet
          </button>
        );
      default:
        return (
          <button className="mt-6 md:w-auto bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 pb-2 flex">
            waiting for bid winner to make payment
          </button>
        );
    }
  };
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
                      {/* <button className="mt-6  md:w-auto bg-green-600 dark:bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 pb-2 flex">
                        Payment Done to Admin By Winner
                      </button> */}
                      {renderActionButton()}
                      {/* <button
                        className="mt-6  md:w-auto bg-yellow-600 dark:bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 pb-2 flex"
                        onClick={() => setDispatchToAdminDialogueOpen(true)}
                      >
                        Dispatch Product
                      </button>
                      <button className="mt-6  md:w-auto bg-orange-600 dark:bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 pb-2 flex">
                        Admin Processing
                      </button> */}
                    </div>
                  </>
                ) : (
                  <button className="mt-6  md:w-auto bg-red-600 dark:bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 pb-2 flex">
                    payment not Done By Winner
                  </button>
                )}
                <div className="w-full"></div>
              </div>
              {isProductClaimed ? (
                <BidResultProgressBar currentStep={shipmentStatus} role={"forSeller"} />
              ) : (
                <p>waiting for winner to make payment</p>
              )}
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
