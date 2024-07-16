import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { store } from "@/redux/app/store";

import { placeBidOnProduct } from "@/api/bid";
import { toast } from "react-toastify";

function PlaceBid({
  pId,
  ownerId,
  highestBid,
  basePrice,
  previousBidSumOfUser,
}: {
  pId: string;
  ownerId: string;
  highestBid: string;
  basePrice: string;
  previousBidSumOfUser: string;
}) {
  const [bid, setBid] = useState("");
  const userId = store.getState().auth.user?._id;
  // const handleBidChange = (event) => {
  //   setBid(event.target.value);
  // };

  const placeBid = async () => {
    console.log(`Bid placed: ₹${bid}`);
    console.log("product id ", pId);
    try {
      const res = await placeBidOnProduct(bid, pId);
      setBid(String(res.totalBidAmount));
      toast.success("bid placed successfully ");
    } catch (error) {
      console.log(error);
    } finally {
      setBid("");
    }
    // Add logic to handle bid placement
  };

  return (
    <>
      <div className="grid grid-cols-2 bg-gray-200 w-full p-2 sm:mb-0 mb-16">
        <div className="min-h-48 w-full">
          <div className="col-span-2  w-full flex">
            <h1 className="font-bold  text-lg w-full h-full flex items-center justify-start">
              highest bid-{" "}
              <span className="font-bold  text-lg text-red-500">
                {highestBid ? highestBid : "no bids placed"}
              </span>
            </h1>
          </div>
          {previousBidSumOfUser && (
            <div className="col-span-2  w-full flex">
              <h1 className="font-bold  text-lg w-full h-full flex items-center justify-start">
                my bid-{" "}
                <span className="font-bold  text-lg text-red-500">
                  {previousBidSumOfUser
                    ? previousBidSumOfUser
                    : "no bids placed"}
                </span>
              </h1>
            </div>
          )}

          <div className="col-span-2 ">
            <h1 className="font-bold text-lg">base price-</h1>
            <span className="font-bold  text-lg text-red-500">{basePrice}</span>
          </div>
        </div>
        {userId && userId != ownerId && (
          <div className="col-span-2 w-full ">
            <div className="flex flex-col">
              <div className="col-span-1 mb-2">
                <Input
                  type="number"
                  className="w-2/3"
                  placeholder="place your bid amount"
                  value={bid}
                  onChange={(e) => setBid(e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <Button onClick={placeBid} className="w-1/3">
                  place bid
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PlaceBid;
