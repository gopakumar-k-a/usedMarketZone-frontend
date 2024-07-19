import { useState, Dispatch, SetStateAction, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { formatDate } from "@/utils/formatDate";

import { BidHistoryOnProduct } from "@/types/bid";
import { bidHistoryOfUser } from "@/api/bid";
import LoaderPost from "@/components/loader/LoaderPost";
function MyBidPlacedHistoryDialogue({
  isHistoryDialogueOpen,
  onHistoryDialogueClose,
  bidProductId,
}: {
  isHistoryDialogueOpen: boolean;
  onHistoryDialogueClose: Dispatch<SetStateAction<boolean>>;
  bidProductId: string;
}) {
  const [bidHistory, setBidHistory] = useState<BidHistoryOnProduct[]>([]);
  const [isLoading, setLoading] = useState(false);
  const fetchBidHistory = async () => {
    try {
      setLoading(true);
      const response = await bidHistoryOfUser(bidProductId);
      if (response) {
        setBidHistory(response.bidHistory);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBidHistory();
  }, []);

  return (
    <>
      <Dialog
        open={isHistoryDialogueOpen}
        onOpenChange={onHistoryDialogueClose}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>My Bid History On This Product</DialogTitle>
            <DialogDescription>
              Here is the history of your placed on This Product.
            </DialogDescription>
          </DialogHeader>

          <div className="relative overflow-x-auto">
            <div className="max-h-64 overflow-y-auto">
              {isLoading ? (
                <LoaderPost />
              ) : (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {bidHistory && bidHistory.length > 0 ? (
                      bidHistory.map((history) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            &#8377; {history.bidAmount}
                          </th>
                          <td className="px-6 py-4">
                            {formatDate(history.bidTime)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <div>no previos bids</div>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MyBidPlacedHistoryDialogue;
