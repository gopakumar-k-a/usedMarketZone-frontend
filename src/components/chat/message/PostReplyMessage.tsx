import { Badge } from "@/components/ui/badge";
import { Chat } from "@/types/chat";
import { formatDate } from "@/utils/formatDate";
import { useAppSelector } from "@/utils/hooks/reduxHooks";
import { Link } from "react-router-dom";
import ChatPostSmall from "./ChatPostSmall";

function PostReplyMessage({ message }: { message: Chat }) {
  const { selectedChatUserData } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.auth);
  const isMessageFromMe = user?._id == message?.senderId;
  const isMessageFromMeBg = isMessageFromMe ? "bg-indigo-500 " : "bg-gray-400";
  const isMessageFromMeText = isMessageFromMe ? "text-white" : "text-gray-900";
  const parentFlexPosition = isMessageFromMe ? "justify-start" : "justify-end";
  return (
    <div className={`flex ${parentFlexPosition} mb-4 cursor-pointer`}>
      {/* form me pic  */}

      {isMessageFromMe && (
        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
          <img
            src={`${user?.imageUrl ? user?.imageUrl : "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"}`}
            alt="My Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      )}
      <div className="flex-col">
        <div
          className={`flex flex-col max-w-96 ${isMessageFromMeBg} ${isMessageFromMeText} rounded-lg p-3 gap-3`}
        >
          <Link to={"/post/post-details"} state={{ pId: message.postId }}>
            <div className="flex flex-col space-y-2 p-4  rounded-lg max-w-sm mx-auto w-72">
              <h1 className="text-black">replied :</h1>
              <div className="bg-gray-100 bg-opacity-50">
                <ChatPostSmall
                  author={message.postOwnerUserName}
                  description={message.postDescription}
                  imageUrl={message.postImageUrl[0]}
                  createdAt={message.postCreatedAt}
                  isBidding={message.postIsBidding}
                />
              </div>

              <div className="flex items-start space-x-2  ">
                <div className="text-md text-gray-800 break-words max-w-56">
                  <div className="bg-gray-300 dark:bg-gray-800 p-3 rounded-lg shadow-md w-64">
                    <div className="text-sm text-gray-800 dark:text-gray-200">
                      {message.message}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* <div
        className={`flex flex-col  ${isMessageFromMeText} rounded-lg p-3 gap-3`}
      > */}
        <div className={`text-black text-sm`}>
          {formatDate(message.createdAt)}
        </div>
        {/* </div> */}
      </div>

      {!isMessageFromMe && (
        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
          <img
            src={`${selectedChatUserData.imageUrl ? selectedChatUserData.imageUrl : "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"}`}
            alt="My Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      )}
    </div>
  );
}

export default PostReplyMessage;
