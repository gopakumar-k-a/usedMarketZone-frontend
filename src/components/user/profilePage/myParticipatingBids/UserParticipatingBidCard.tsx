import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { UserParticipatingBid } from "@/types/bid";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/utils/hooks/reduxHooks";
interface UserParticipatingBidProps {
  bid: UserParticipatingBid;
}

// Define the component
const UserParticipatingBidCard: React.FC<UserParticipatingBidProps> = ({
  bid,
}) => {
  // const fromUserId
  const navigate = useNavigate();
  const fromUserId = useAppSelector((state) => state.auth.user?._id);

  const [isProductClaimed] = useState(
    bid.isBidAmountPaid && bid.claimedUserId == fromUserId ? true : false
  );

  const isProductClaimable = (productId = bid.productId) => {
    if (bid.isBidEnded && bid.isMyHighestBid) {
      navigate("/claim-bid", { state: { productId } });
    } else {
      return;
    }
  };
  return (
    <>
      <div
        className="w-full bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 dark:bg-gray-800 rounded-lg"
        onClick={() => isProductClaimable()}
      >
        <div className="flex p-4 gap-4 mb-2">
          <div className="ml-2 max-w-16 max-h-16">
            <img
              src={bid.productImageUrls[0]}
              alt={bid.productName}
              className="w-24 h-24 object-contain"
            />
          </div>
          <div className="p-2 flex-grow">
            <div className="flex justify-between items-start">
              <div className="text-sm">
                <h5 className="font-bold text-xl dark:text-white">
                  {bid.productName}
                </h5>
                <div className="dark:text-gray-300">
                  <span>Base Price:</span>
                  <span className="font-bold">₹ {bid.productBasePrice}</span>
                </div>
                <div className="dark:text-gray-300">
                  <span>Total Bid Placed:</span>
                  <span
                    className={`font-bold ${bid.isMyHighestBid ? "text-green-500" : "text-red-500"}`}
                  >
                    ₹ {bid.totalBidAmount}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div>
                  <span className="text-sm font-bold dark:text-white">
                    {" "}
                    highest bid:
                  </span>
                  <span
                    className={`text-xl font-bold ${bid.isMyHighestBid ? "text-green-500" : "text-red-500"}  `}
                  >
                    ₹ {bid.highestBidAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 flex justify-start items-center gap-2">
            <div className="flex items-center flex-col">
              {bid.isBidEnded ? (
                bid.isMyHighestBid ? (
                  isProductClaimed ? (
                    <Button className="bg-gray-500 hover:bg-gray-400 text-black">
                      Claimed
                    </Button>
                  ) : (
                    <Button className="bg-green-500 hover:bg-green-400">
                      Claim Product
                    </Button>
                  )
                ) : (
                  <Button>Ended</Button>
                )
              ) : bid.isMyHighestBid ? (
                <Link to={"/post/post-details"} state={{ pId: bid.productId }}>
                  <div className="bg-blue-400 hover:bg-blue-500 h-6 w-6 flex items-center justify-center rounded">
                    <FaEye className="h-4 w-4 text-white" />
                  </div>
                </Link>
              ) : (
                <div className="bg-gray-400 h-6 w-6 flex items-center justify-center rounded">
                  <span className="text-white">Not Highest</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserParticipatingBidCard;
