import { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { CustomAlertDialogue } from "@/components/alert/CustomAlertDialogue";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { acceptBidRequest } from "@/api/admin";
import { FaEye } from "react-icons/fa";
import { BidDuration } from "@/types/product";
import { useNavigate } from "react-router-dom";
import { BidRequest } from "@/types/admin/bidRequest";
function BidRequestCard({ request }:{request:BidRequest}) {
  const [isAcceptAlertOpen, setAcceptAlertOpen] = useState(false);
  const [isRejectAlertOpen, setRejectAlertOpen] = useState(false);
  const [selectedBidId, setSelectedBidId] = useState("");
  const [selectedBidDuration, setSelectedBidDuration] =
    useState<BidDuration | null>(null);
  const [isAdminAcceptedBid, setAdminAcceptedBid] = useState(
    request?.productData?.isAdminAccepted
  );

  const navigate = useNavigate();
  const acceptBid = async (bidId: string, bidDuration: BidDuration | null) => {
    console.log("id is ", bidId);
    console.log("bid duration is ", bidDuration);

    await acceptBidRequest(bidId, bidDuration).then(() => {
      setAdminAcceptedBid(true);
    });
  };

  const rejectBid = (bidId: string) => {
    console.log("reject  bid id is ", bidId);
  };

  const handleAcceptAlertOpen = (bidId: string, bidDuration: BidDuration) => {
    console.log("handleAcceptAlertOpen bidDuration", bidDuration);

    setSelectedBidId(bidId);
    setSelectedBidDuration(bidDuration);
    setAcceptAlertOpen(true);
  };

  const handleAcceptAlertClose = () => {
    setAcceptAlertOpen(false);
  };

  const handleRejectAlertOpen = (bidId: string) => {
    setRejectAlertOpen(true);
    setSelectedBidId(bidId);
  };
  const handleRejectAlertClose = () => {
    setRejectAlertOpen(false);
  };

  const acceptAlertTitle = "Do You Want To Accept the Bid";
  const acceptAlertDescription =
    "click continue to accept bid and with in the specific duration";

  const rejectAlertTitle = "Do You Want To Reject the Bid";
  const rejectAlertDescription = "click continue to reject bid of the user";
  return (
    <>
      {/* Card 1 */}
      <div className="bg-gray-800 text-white shadow-lg border rounded-lg overflow-hidden">
        <div className="flex">
          <div className="ml-2  max-w-16 max-h-16">
            <img
              src={request?.productData?.productImageUrls[0]}
              alt="Quant trident shirts"
              className="w-24 h-24 object-contain"
            />
          </div>
          {/* <img src={request?.productData?.productImageUrls[0]} alt="" /> */}

          <div className="p-2 flex-grow">
            <div className="flex justify-between items-start">
              <div className="text-sm">
                <h5 className="font-bold text-xl">
                  {request?.productData?.productName}
                </h5>
                <p>Category : {request?.productData?.category} </p>
                <p>Sub Category : {request?.productData?.subCategory} </p>
              </div>
              <div className="text-right">
                <h4 className="text-xl font-bold">
                  &#x20B9; {request?.productData?.basePrice}
                </h4>
                <span className="text-white-500 ">
                  bid Duration : {request?.productData?.bidDuration?.day} day{" "}
                  {request?.productData?.bidDuration?.hour} hour{" "}
                  {request?.productData?.bidDuration?.minute} minute
                </span>
                <h6 className="text-white">
                  Requested Time : {formatDate(request?.createdAt)}
                </h6>
              </div>
            </div>
          </div>
          <div className="p-4 flex  justify-start items-center gap-2">
            {isAdminAcceptedBid ? (
              <>
                <div
                  className="flex flex-col justify-center items-center"
                  onClick={() => navigate("/admin/bid-history",{state:{bidProductData:request.productData}})}
                >
                  <div className=" hover:bg-blue-600 w-8 h-8 bg-blue-500 flex items-center justify-center rounded-lg">
                    <FaEye className=" text-white rounded-lg w-5 h-5" />
                  </div>

                  <h1>accepted</h1>
                </div>
              </>
            ) : (
              <>
                {" "}
                <TiTick
                  onClick={() =>
                    handleAcceptAlertOpen(
                      request.productData._id as string,
                      request?.productData?.bidDuration
                    )
                  }
                  className="w-12 h-10 bg-green-500 hover:bg-green-600 rounded-lg "
                />
                <RxCross2
                  onClick={() =>
                    handleRejectAlertOpen(request.productData._id as string)
                  }
                  className="w-12 h-10  bg-red-500 hover:bg-red-600 rounded-lg "
                />
              </>
            )}
          </div>
        </div>
      </div>

      {isAcceptAlertOpen && (
        <CustomAlertDialogue
          isOpen={isAcceptAlertOpen}
          onClose={handleAcceptAlertClose}
          title={acceptAlertTitle}
          description={acceptAlertDescription}
          onContinue={() => acceptBid(selectedBidId, selectedBidDuration)}
        />
      )}
      {isRejectAlertOpen && (
        <CustomAlertDialogue
          isOpen={isRejectAlertOpen}
          onClose={handleRejectAlertClose}
          title={rejectAlertTitle}
          description={rejectAlertDescription}
          onContinue={() => rejectBid(selectedBidId)}
        />
      )}
    </>
  );
}

export default BidRequestCard;
