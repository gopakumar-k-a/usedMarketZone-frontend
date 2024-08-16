import PageHeading from "@/components/admin/PageHeading";
import { formatDate } from "@/utils/formatDate";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import SlideCurosal from "@/components/post/SlideCurosal";
import BidEndTimer from "@/components/post/BidEndTimer";
import BidHistoryProductCard from "./BidHistoryProductCard";

import BidsByUserTable from "./BidsByUserTable";
function BidHistory() {
  const location = useLocation();
  const { bidProductData } = location.state;
  const bidProductId = bidProductData._id;
  const [imageSlides] = useState<string[]>(
    bidProductData.productImageUrls &&
      bidProductData.productImageUrls.length > 0
      ? bidProductData.productImageUrls
      : []
  );

  return (
    <>
      <PageHeading heading={"Bid History"} Icon={FaHistory} />

      <div className="flex justify-center">
        <div className="w-8/12 ">
          <div className="bg-blue-400 w-full h-8 rounded-tl-md rounded-tr-md"></div>
          <div className="border-l-2  border-r-2 border-gray-200">
            {imageSlides.length > 0 && <SlideCurosal slides={imageSlides} />}
          </div>
          <div className="bg-blue-400 w-full h-8 rounded-bl-md rounded-br-md"></div>
        </div>
      </div>
      <div className="text-red-600 dark:text-red-400 text-sm font-bold col-span-1 p-2 ">
        {/* base price: 25,000 */}
        <div className="text-black dark:text-white pb-2">
          {bidProductData?.bidEndTime && (
            <BidEndTimer endDate={bidProductData?.bidEndTime} />
          )}
          {/* <span className="text-red-600 dark:text-red-400">23:45:01</span> */}
        </div>
        <div className="text-black dark:text-white">
          {/* {post?.bidEndTime} */}
          bid ends:{" "}
          {bidProductData?.bidEndTime && formatDate(bidProductData?.bidEndTime)}
        </div>
        <div>
          {/* <span className="text-black dark:text-white">bid winner:</span> */}
          <span></span>
        </div>
      </div>
      {bidProductData && (
        <BidHistoryProductCard bidProductData={bidProductData} />
      )}
      {bidProductId && <BidsByUserTable bidProductId={bidProductId} />}
    </>
  );
}

export default BidHistory;
