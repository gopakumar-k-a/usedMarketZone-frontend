import { MdOutlineMessage } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Notification } from "@/types/Notification";
import Messages from "@/components/chat/message/Messages";
import { formatDate } from "@/utils/formatDate";
function MessageNotification({
  notification
}: {  
  notification:Notification
}) {
  const navigate = useNavigate();
  const navigateToMessages = () => {
    navigate("/messages");
  };
  return (
    <>
      <div className="sm:w-8/12 p-3 mt-4 bg-white rounded flex cursor-pointer" onClick={()=>navigateToMessages()}>
        <div
          aria-label="post icon"
          role="img"
          className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center"
        >
          <MdOutlineMessage className="text-blue-600" />
        </div>
        <div className="pl-3" >
          <p className="focus:outline-none text-sm leading-none">
            <span className="text-indigo-700 cursor-pointer">{notification.senderId.userName ? notification.senderId.userName : ""}</span>{" "}
            sended you a message:{" "}
            <span className="text-indigo-700">{notification.messageId.message ? notification.messageId.message : ""}</span>
          </p>
          <p className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">
            {notification.createdAt && formatDate(notification.createdAt)}
          </p>
        </div>
      </div>
    </>
  );
}

export default MessageNotification;
