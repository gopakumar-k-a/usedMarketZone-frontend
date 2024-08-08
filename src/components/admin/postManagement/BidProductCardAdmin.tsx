import { formatDate } from "@/utils/formatDate";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProductInterface from "@/types/product";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useBlockPost from "@/utils/hooks/admin/useBlockPost";
import { CustomAlertDialogue } from "@/components/alert/CustomAlertDialogue";

const BidProductCardAdmin = ({ product }: { product: ProductInterface }) => {
  const navigate = useNavigate();
  const { blockPost, isBlocked } = useBlockPost(product.isBlocked);

  const [showDialogue, setShowDialogue] = useState(false);
  const [actionType, setActionType] = useState<"block" | "unblock" | null>(
    null
  );

  const handleBlockUnblock = (action: "block" | "unblock") => {
    setActionType(action);
    setShowDialogue(true);
  };

  const confirmAction = () => {
    if (actionType === "block") {
      blockPost(product._id);
    } else if (actionType === "unblock") {
      blockPost(product._id);
    }
    setShowDialogue(false);
  };

  const cancelAction = () => {
    setShowDialogue(false);
  };

  return (
    <>
      <div className="bg-gray-800 text-white shadow-lg border rounded-lg overflow-hidden mb-4">
        <div className="flex">
          <div className="ml-2 max-w-16 max-h-16">
            <img
              src={product.productImageUrls[0] || "default-image-url.jpg"}
              alt={product.productName}
              className="w-24 h-24 object-contain"
            />
          </div>

          <div className="p-2 flex-grow">
            <div className="flex justify-between items-start">
              <div className="text-sm">
                <h5 className="font-bold text-xl">{product.productName}</h5>

                <p>
                  User Name:{" "}
                  <span
                    className="text-blue-600 cursor-pointer hover:text-blue-500"
                    onClick={() =>
                      navigate("/admin/user-profile", {
                        state: { userId: product.userId },
                      })
                    }
                  >
                    {product.userDetails.userName}
                  </span>
                </p>
                <p>Category: {product.category}</p>
                <p>Sub Category: {product.subCategory}</p>
                <p>Price: ₹{product.basePrice}</p>
              </div>
              <div className="text-right">
                <p>
                  Bid Duration: {formatDate(product.bidAcceptedTime)} to{" "}
                  {formatDate(product.bidEndTime)}
                </p>
                <h6 className="text-white">
                  Posted On: {formatDate(product.createdAt)}
                </h6>
              </div>
            </div>
          </div>

          <div className="p-4 flex flex-col justify-start items-center gap-2">
            <FaEye
              onClick={() =>
                navigate("/admin/bid-history", {
                  state: { bidProductData: product },
                })
              }
              className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
            />
            {isBlocked ? (
              <Button
                className="bg-green-700 text-white hover:bg-green-600"
                onClick={() => handleBlockUnblock("unblock")}
              >
                UnBlock
              </Button>
            ) : (
              <Button
                className="bg-red-700 text-white hover:bg-red-600"
                onClick={() => handleBlockUnblock("block")}
              >
                Block
              </Button>
            )}
          </div>
        </div>
      </div>

      {showDialogue && (
        <CustomAlertDialogue
          isOpen={showDialogue}
          title={actionType === "block" ? "Confirm Block" : "Confirm Unblock"}
          description={
            actionType === "block"
              ? "Are you sure you want to block this product?"
              : "Are you sure you want to unblock this product?"
          }
          onContinue={confirmAction}
          onClose={cancelAction}
        />
      )}
    </>
  );
};

export default BidProductCardAdmin;
