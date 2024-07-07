import { FollowingUser } from "@/types/chat";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
// import { useAppSelector } from "@/utils/hooks/reduxHooks";
import { setChatSelected } from "@/redux/reducers/chat/chatSlice";
import useGetMessage from "@/utils/hooks/chat/useGetMessage";
import { useSocketContext } from "@/context/SocketContext";
function Conversation({ conversation }: { conversation: FollowingUser }) {
  const dispatch = useAppDispatch();
  const { chatSelected } = useGetMessage();
  const isSelectedChat = chatSelected == conversation.following._id;
  const SocketContext = useSocketContext();

  let isOnline = false;
  if (SocketContext) {
    const { onlineUsers } = SocketContext;
    isOnline = onlineUsers.includes(conversation.following._id);
  }

  return (
    <div
      className={`flex items-center cursor-pointer p-2 rounded-md ${isSelectedChat ? "bg-blue-300" : "hover:bg-gray-100 "}`}
      onClick={() =>
        dispatch(
          setChatSelected({ selectedChatUserData: conversation.following })
        )
      }
    >
  
      <div className="relative w-12 h-12 bg-gray-300 rounded-full mr-3">
        <img
          src={`${conversation.following.imageUrl ? conversation.following.imageUrl : "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"}`}
          alt="User Avatar"
          className="w-12 h-12 rounded-full"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">
          {conversation.following.userName}
        </h2>
        <p className="text-gray-600">Hoorayy!!</p>
      </div>
    </div>
  );
}

export default Conversation;
