import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { store } from "@/redux/app/store";
import { FaHistory } from "react-icons/fa";
import { placeBidOnProduct } from "@/api/bid";
import { toast } from "react-toastify";
import MyBidPlacedHistoryDialogue from "./MyBidPlacedHistory";
import { CustomAlertDialogue } from "@/components/alert/CustomAlertDialogue";

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
  // isOpen, onClose, title, description,onContinue

  const [isConfirmPlaceBidDialogueOpen, setConfirmPlaceBidDialogueOpen] =
    useState(false);

  function onPlaceBidDialogueClose() {
    setConfirmPlaceBidDialogueOpen(false);
  }

  const [bidInput, setBidInput] = useState("");
  const [highestBidPlaced, setHighestBidPlaced] = useState(
    highestBid ? highestBid : ""
  );
  const [myBid, setMyBid] = useState(
    previousBidSumOfUser ? previousBidSumOfUser : ""
  );

  const [isMyBidHistoryDialogueOpen, setMyBidHistoryDialogue] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = store.getState().auth.user?._id;

  const placeBid = async (amount = bidInput) => {
    try {
      setLoading(true);
      const res = await placeBidOnProduct(amount, pId);
      setMyBid(String(res.totalBidAmount));
      setHighestBidPlaced(String(res.totalBidAmount));
      toast.success("bid placed successfully ");
    } catch (error) {
      console.log(error);
    } finally {
      setBidInput("");
      setLoading(false);
    }
    // Add logic to handle bid placement
  };

  const confirmPlaceBidTitle = `Are sure Place Bid ${bidInput} this can't be unDone`;
  const confirmPlaceBidDescription = `Clicking Confirming will place Bid Amount of ${bidInput} and Can't be UnDone Click Confirm To Continue`;

  return (
    <>
      <div className="grid grid-cols-2 bg-gray-200 w-full p-2 sm:mb-0 mb-16">
        <div className="min-h-48 w-full">
          <div className="col-span-2  w-full flex">
            <h1 className="font-bold  text-lg w-full h-full flex items-center justify-start">
              highest bid-{" "}
              <span className="font-bold  text-lg text-red-500">
                {highestBidPlaced ? (
                  <div>&#8377; {highestBidPlaced}</div>
                ) : (
                  "no bids placed"
                )}
              </span>
            </h1>
          </div>
          {previousBidSumOfUser && (
            <div className="col-span-2  w-full flex">
              <h1 className="font-bold  text-lg w-full h-full flex items-center justify-start">
                my bid-{" "}
                <span
                  className={`font-bold  text-lg ${myBid >= highestBid ? "text-green-500" : "text-red-500"}`}
                >
                  {myBid ? <div>&#8377; {myBid}</div> : "no bids placed"}
                </span>
              </h1>
            </div>
          )}

          <div className="col-span-2 ">
            <h1 className="font-bold text-lg">base price-</h1>
            <span className="font-bold  text-lg text-blue-500">
              &#8377; {basePrice}
            </span>
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
                  value={bidInput}
                  onChange={(e) => setBidInput(e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <Button
                  onClick={() => setConfirmPlaceBidDialogueOpen(true)}
                  className="w-1/3"
                  disabled={!bidInput || loading}
                >
                  place bid
                </Button>
              </div>
              {myBid && (
                <>
                  <div className="col-span-2 w-full flex justify-end">
                    <Button
                      className="w-1/4 bg-green-500 text-white hover:bg-green-600"
                      onClick={() => setMyBidHistoryDialogue(true)}
                    >
                      My Bid History <FaHistory className="ml-2" />
                    </Button>
                  </div>

                  {isMyBidHistoryDialogueOpen && (
                    <MyBidPlacedHistoryDialogue
                      isHistoryDialogueOpen={isMyBidHistoryDialogueOpen}
                      onHistoryDialogueClose={() =>
                        setMyBidHistoryDialogue(false)
                      }
                      bidProductId={pId}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {isConfirmPlaceBidDialogueOpen && (
        <CustomAlertDialogue
          isOpen={isConfirmPlaceBidDialogueOpen}
          onClose={onPlaceBidDialogueClose}
          title={confirmPlaceBidTitle}
          description={confirmPlaceBidDescription}
          onContinue={() => placeBid()}
        />
      )}
    </>
  );
}

export default PlaceBid;
