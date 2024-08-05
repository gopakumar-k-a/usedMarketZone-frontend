import { Notification } from "@/types/Notification";
import { formatDate } from "@/utils/formatDate";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function BidWinNotification({ notification }: { notification: Notification }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="sm:w-8/12 p-3 mt-4 bg-white rounded flex cursor-pointer"
        onClick={() =>
          navigate("/claim-bid", {
            state: { productId: notification.postId?._id },
          })
        }
      >
        <div
          aria-label="post icon"
          role="img"
          className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center"
        >
          <FaCrown className="text-yellow-300" />
        </div>
        <div className="pl-3">
          <p className="focus:outline-none text-sm leading-none">
            {/* <span className="text-indigo-700">user name</span>\ */}
            You Have Won Bid On Product
          </p>{" "}
          <span className="text-indigo-700 ">
            {notification?.postId?.productName}
          </span>
          <p className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">
            {notification.createdAt && formatDate(notification.createdAt)}
          </p>
        </div>
      </div>
    </>
  );
}

export default BidWinNotification;
