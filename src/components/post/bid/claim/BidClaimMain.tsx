import React, { useEffect, useState } from "react";
import WinnerAddress from "./WinnerAddress";
import { getUserPostDetails } from "@/api/product";
import { Link, useLocation } from "react-router-dom";
import { ProductInterface } from "@/types/product";
import SlideCurosal from "../../SlideCurosal";
import { getClaimBidDetails } from "@/api/bid";
import {
  ClaimerAddress,
  ShipmentStatus,
  UserParticipatingBid,
} from "@/types/bid";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { IoLocationSharp } from "react-icons/io5";
import ClaimerAddressDialogue from "./ClaimerAddressDialogue";
import { SiRazorpay } from "react-icons/si";
import { useAppSelector } from "@/utils/hooks/reduxHooks";
import { capturePayment, createPaymentOrder } from "@/api/payment";
import useExternalScripts from "@/utils/hooks/useExternalScripts";
import { toast } from "react-toastify";
import Loader from "@/components/loader/Loader";
import UserCard from "@/components/user/SuggestedUserCard";
import { ImHammer2 } from "react-icons/im";
import OrderTracking from "../orderTrack/OrderTracking";
import BidResultProgressBar from "../orderTrack/BidResultProgressBar";
import { Transaction } from "@/types/admin/transaction";
// import OrderTracking from "../orderTrack/OrderTracking";
// import ProgressBar from "../orderTrack/OrderTracking";
function BidClaimMain() {
  const fromUserId = useAppSelector((state) => state.auth.user?._id);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [bidData, setBidData] = useState<UserParticipatingBid | null>(null);
  const [isAddressAdded, setIsAddressAdded] = useState(false);
  const [bidClaimerAddress, setClaimerAddress] =
    useState<ClaimerAddress | null>(null);
  const [isClaimerAddressDialogueOpen, setClaimerAddressDialogueOpen] =
    useState(false);
  const [isProductClaimed, setIsProductClaimed] = useState<Boolean>(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const location = useLocation();
  const [transactionShipmentStatus, setTransactionShipmentStatus] =
    useState<ShipmentStatus | null>(null);
  const { productId } = location.state;

  const handleShowAddressForm = () => {
    setShowAddressForm(true);
  };

  const fetchPostDetails = async (productId: string) => {
    const { bidData } = await getClaimBidDetails(productId);
    console.log("bidData ", bidData);

    if (bidData) {
      setBidData(bidData);
      setIsAddressAdded(bidData.isClaimerAddressAdded);
      setClaimerAddress(bidData.claimerAddress ? bidData.claimerAddress : null);
      setIsProductClaimed(
        bidData.isBidAmountPaid && bidData.claimedUserId == fromUserId
          ? true
          : false
      );
      setTransactionShipmentStatus(
        bidData.transactionData.shipmentStatus
          ? bidData.transactionData.shipmentStatus
          : null
      );
      // bidData.isBidAmountPaid && bidData.claimedUserId == fromUserId ? true : false
    }
  };

  useEffect(() => {
    fetchPostDetails(productId);
  }, []);

  const handleSubmitAddress = (bidClaimerAddress: ClaimerAddress) => {
    setIsAddressAdded(true);
    setShowAddressForm(false);
    setClaimerAddress(bidClaimerAddress);
  };

  useExternalScripts({ url: "https://checkout.razorpay.com/v1/checkout.js" });
  const handlePayment = async () => {
    if (!bidData) return;
    const toUserId = bidData.userId;
    const { order } = await createPaymentOrder({
      amount: bidData.highestBidAmount,
      currency: "INR",
      receipt: `receipt_${bidData.productId}`,
      notes: {
        fromUserId,
        toUserId,
      },
    });

    console.log("order ", order);

    if (!order) {
      toast.error("something went wrong try payment later");
      return;
    }

    const options = {
      key: "rzp_test_xgAbYbKWLNZHR0",
      amount: order.amount,
      currency: order.currency,
      name: "Used Market Zone",
      description: "Claim Bid Transaction",
      order_id: order.id,
      handler: async (response: any) => {
        try {
          setLoading(true);
          const paymentCaptureResponse = await capturePayment({
            payment_id: response.razorpay_payment_id,
            fromUserId,
            toUserId,
            amount: order.amount,
            currency: order.currency,
            productId: bidData.productId,
            bidId: bidData.bidId,
          });

          if (paymentCaptureResponse.captureStatus == "captured") {
            setStatusMessage("Payment successful");
            setIsProductClaimed(true);
            setTransactionShipmentStatus(
              paymentCaptureResponse.transactionData.shipmentStatus
                ? paymentCaptureResponse.transactionData.shipmentStatus
                : null
            );
            // await handleClaimProduct(paymentCaptureResponse.data.transactionId);
          } else {
            setStatusMessage("Payment failed");
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        name: "Used Market Zone",
        email: "umzauth@gmail.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
  };
  return (
    <>
      {bidData != null && (
        <div className="container mx-auto p-6">
          <h1 className="font-bold text-xl"> claim Your Product</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:flex md:space-x-6">
            <div className="md:w-1/2">
              <SlideCurosal slides={bidData.productImageUrls} />
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Bid Owner
              </h1>
              <UserCard userData={bidData.ownerData} />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {bidData.productName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                {bidData.description}
              </p>
              <div className="mt-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  &#8377; {bidData.highestBidAmount}
                </span>
              </div>
              <Link
                to={"/post/post-details"}
                state={{ pId: bidData.productId }}
              >
                <Button className="bg-blue-500 hover:bg-blue-700 m-2">
                  <p className="mr-2"> bid details</p>
                  <ImHammer2 />
                </Button>
              </Link>
              {isAddressAdded ? (
                <>
                  {isProductClaimed ? (
                    <>
                      <button className="mt-6 md:w-auto bg-green-600 dark:bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 pb-2 flex">
                        Payment Done
                      </button>

                      {/* <ProgressBar status={"Delivery"}/> */}
                    </>
                  ) : (
                    <>
                      <button
                        className="mt-6  md:w-auto bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 pb-2 flex"
                        onClick={() => handlePayment()}
                      >
                        make payment <SiRazorpay className="h-5 w-5 ml-2" />
                      </button>
                    </>
                  )}
                  <div>
                    {!isProductClaimed && (
                      <>
                        <h1 className="text-red-400">
                          Please click the button to complete your payment
                          before claiming your product.
                        </h1>
                        {/* <h1 className="text-red-400">
                          Note: For your safety, make the payment only after
                          meeting and verifying the product with the owner.
                        </h1> */}
                      </>
                    )}

                    <h1 className="text-green-400 font-bold text-xl">
                      {" "}
                      <IoMdCheckmarkCircle className="bg-green-400 text-white h-10 w-10 rounded-full mt-2" />
                      Your Address Added{" "}
                      <Button
                        className="bg-white hover:bg-gray-300 border-2 border-gray-200"
                        onClick={() => setClaimerAddressDialogueOpen(true)}
                      >
                        {" "}
                        <IoLocationSharp className="text-red-600 h-5 w-5" />
                      </Button>
                    </h1>
                  </div>
                </>
              ) : (
                <button
                  onClick={handleShowAddressForm}
                  className="mt-6 w-full md:w-auto bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Add Address to Claim Product
                </button>
              )}
              {showAddressForm && bidData && (
                <WinnerAddress
                  bidId={bidData.bidId}
                  handleSubmitAddress={handleSubmitAddress}
                />
              )}
            </div>

            {isProductClaimed && transactionShipmentStatus && (
              <BidResultProgressBar
                currentStep={transactionShipmentStatus}
                role={"forWinner"}
              />
            )}
          </div>
        </div>
      )}
      {bidClaimerAddress && isClaimerAddressDialogueOpen && (
        <ClaimerAddressDialogue
          isOpen={isClaimerAddressDialogueOpen}
          onClose={() => setClaimerAddressDialogueOpen(false)}
          details={bidClaimerAddress}
        />
      )}
      {loading && <Loader />}
    </>
  );
}

export default BidClaimMain;
