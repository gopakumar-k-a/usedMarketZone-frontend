import { useAppSelector } from "@/utils/hooks/reduxHooks";
import { Chat } from "@/types/chat";
import { formatDate } from "@/utils/formatDate";
import ChatPostSmall from "./ChatPostSmall";
import { Link } from "react-router-dom";
function PostMessage({ message }: { message: Chat }) {
  const { selectedChatUserData } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.auth);
  const isMessageFromMe = user?._id == message?.senderId;
  // const isMessageFromMe = true;
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

      {/* from me pic end 

        <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
          <p className="">{message.message}</p>
          <div className="text-gray-300 text-sm">{formatDate(message.createdAt)}</div>
        </div> */}
      <div className="flex-col">
        <div
          className={`flex flex-col max-w-96 ${isMessageFromMeBg} ${isMessageFromMeText} rounded-lg p-3 gap-3`}
        >
          {/* <p className="text-wrap break-words max-w-96 ">{message.message}</p> */}
          <Link to={"/post/post-details"} state={{ pId: message.postId }}>
            <ChatPostSmall
              author={message.postOwnerUserName}
              description={message.postDescription}
              imageUrl={message.postImageUrl[0]}
              createdAt={message.postCreatedAt}
              isBidding={message.postIsBidding}
            />




            
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

export default PostMessage;
