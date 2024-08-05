import { Notification } from "@/types/Notification";
import { FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { formatDate } from "@/utils/formatDate";

function BidLoseNotification({ notification }: { notification: Notification }) {
  return (
    <>
      <Link to={"/post/post-details"} state={{ pId: notification.postId?._id }}>
        <div className="sm:w-8/12 p-3 mt-4 bg-white rounded flex cursor-pointer">
          <div
            aria-label="post icon"
            role="img"
            className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center"
          >
            <FaWindowClose className="text-red-500" />
          </div>
          <div className="pl-3">
            <p className="focus:outline-none text-sm leading-none">
              {/* <span className="text-indigo-700">user name</span>\ */}
              You Have Lost Bid On Product
            </p>{" "}
            <span className="text-indigo-700 ">
              {notification?.postId?.productName}
            </span>
            <p className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">
              {notification.createdAt && formatDate(notification.createdAt)}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default BidLoseNotification;
