import { RiUserFollowFill } from "react-icons/ri";
import { formatDate } from "@/utils/formatDate";
import { useNavigate } from "react-router-dom";
import { Notification } from "@/types/Notification";
function FollowingNotification({
  notification,
}: {
  notification: Notification;
}) {
  const navigate = useNavigate();
  const navigateToUserProfile = (id: string = notification.senderId._id) => {
    navigate("/user-profile", { state: { userId: id } });
  };
  return (
    <>
      <div className="sm:w-8/12 p-3 mt-4 bg-white rounded flex">
        <div
          aria-label="post icon"
          role="img"
          className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center"
        >
          <RiUserFollowFill className="text-green-600" />
        </div>
        <div className="pl-3">
          <p className="focus:outline-none text-sm leading-none">
            <span
              className="text-indigo-700 cursor-pointer"
              onClick={() => navigateToUserProfile()}
            >
              {" "}
              {notification.senderId.userName && notification.senderId.userName}
            </span>{" "}
            Started Following You
          </p>
          <p className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">
            {notification.createdAt && formatDate(notification.createdAt)}
          </p>
        </div>
      </div>
    </>
  );
}

export default FollowingNotification;
