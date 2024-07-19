import LoaderPost from "@/components/loader/LoaderPost";
import React, { useEffect, useState } from "react";
import { getBidHistoryOfProduct } from "@/api/admin";
import { IBid, IBidHistoryAdmin } from "@/types/bid";
import { formatDate } from "@/utils/formatDate";
import { BsThreeDots } from "react-icons/bs";
import BidUserHistoryDialogue from "./BidUserHistoryDialogue";
function BidsByUserTable({ bidProductId }: { bidProductId: string }) {
  const [isLoading, setLoading] = useState(false);
  const [histories, setHistories] = useState<IBidHistoryAdmin[]>([]);
  const [isIndividualUserBidHistoryOpen, setIndividualUserBidHistoryOpen] =
    useState(false);
  const [individualBidHistory, setIndividualBidHistory] = useState<IBid[]>([]);
  const [individualSelectedUserName, setIndividualSelectedUser] = useState("");
  // isHistoryDialogueOpen,
  // onHistoryDialogueClose,
  // userBidHistory,
  // userName,

  const fetchBidHistory = async (bId = bidProductId) => {
    try {
      setLoading(true);
      const res = await getBidHistoryOfProduct(bId);
      if (res && res.bidHistory) {
        setHistories(res.bidHistory);
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

  const handleOpenIndividualUserBidHistory = (
    userName: string,
    individualBidHistory: IBid[]
  ) => {
    setIndividualBidHistory(individualBidHistory);
    setIndividualSelectedUser(userName);
    setIndividualUserBidHistoryOpen(true);
  };
  return (
    <>
      {/* <div>{bidProductId}</div> */}
      <div className="relative overflow-x-auto pt-5">
        <div className="max-h-64 min-h-screen overflow-y-auto">
          {isLoading ? (
            <LoaderPost />
          ) : (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    bidder
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bid Total Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    history
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {histories && histories.length > 0 ? (
                  histories.map((history, index) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={index}
                    >
                      <td className="px-6 py-4">
                        {/* {formatDate(history.bidTime)} */}
                        {history.bidderName}
                      </td>
                      <td className="px-6 py-4">
                        {/* {formatDate(history.bidTime)} */}
                        {history.totalBidAmount}
                      </td>
                      <td className="px-6 py-4">
                        {/* {formatDate(history.bidTime)} */}
                        {formatDate(history.lastBidDate)}
                      </td>
                      <td className="px-6 py-4">
                        {/* {formatDate(history.bidTime)} */}
                        <div
                          className="rounded-sm h-7 w-7 border-2 border-gray-200 hover:border-gray-400 flex justify-center items-center"
                          onClick={() =>
                            handleOpenIndividualUserBidHistory(
                              history.bidderName,
                              history.bids
                            )
                          }
                        >
                          <BsThreeDots className="h-5 w-5 text-black" />
                        </div>
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
      {individualSelectedUserName &&
        individualBidHistory &&
        isIndividualUserBidHistoryOpen && (
          <BidUserHistoryDialogue
            isHistoryDialogueOpen={isIndividualUserBidHistoryOpen}
            onHistoryDialogueClose={() =>
              setIndividualUserBidHistoryOpen(false)
            }
            userBidHistory={individualBidHistory}
            userName={individualSelectedUserName}
          />
        )}
    </>
  );
}

export default BidsByUserTable;
