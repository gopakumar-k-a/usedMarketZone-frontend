import { FollowingUser } from "@/types/chat";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
// import { useAppSelector } from "@/utils/hooks/reduxHooks";
import { setChatSelected } from "@/redux/reducers/chat/chatSlice";
import useGetMessage from "@/utils/hooks/chat/useGetMessage";
import { useSocketContext } from "@/context/SocketContext";
import { useEffect, useState } from "react";
import { changeReadStatus, getUnreadMessages } from "@/api/chat";
function Conversation({ conversation }: { conversation: FollowingUser }) {
  const dispatch = useAppDispatch();
  const { chatSelected } = useGetMessage();
  const isSelectedChat = chatSelected == conversation.following._id;
  const SocketContext = useSocketContext();
  const [unseenCount, setUnseenCount] = useState<number>(0);
  let isOnline = false;
  if (SocketContext) {
    const { onlineUsers, socket } = SocketContext;
    isOnline = onlineUsers.includes(conversation.following._id);
    if (socket) {
      socket.on("newMessage", (data) => {
        
        if (data.senderId == conversation.following._id) {
          setUnseenCount((prevCount) => prevCount + 1);
        }
      });
    }
  }

  useEffect(() => {
    const fetchUnseenMessagesCount = async () => {
      try {
        const res = await getUnreadMessages(conversation.following._id);
        if (res) {
          setUnseenCount(parseInt(res.unreadCount));
        }
      } catch (error) {
        console.error("Error fetching unseen messages count:", error);
      }
    };

    fetchUnseenMessagesCount();

    const { socket } = SocketContext;
    if (socket) {
      const handleNewMessage = (data) => {
        if (data.senderId == conversation.following._id) {
          setUnseenCount((prevCount) => prevCount + 1);
        }
      };

      socket.on("newMessage", handleNewMessage);

      // Cleanup to avoid multiple listeners
      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [SocketContext, conversation.following._id]);

  useEffect(() => {
    const fetchUnseenMessagesCount = async () => {
      try {
        const res = await getUnreadMessages(conversation.following._id);
        if (res) {
          setUnseenCount(parseInt(res.unreadCount));
        }
      } catch (error) {
        console.error("Error fetching unseen messages count:", error);
      }
    };

    fetchUnseenMessagesCount();
  },  [conversation.following._id]);

  const handleSelectConversation = async (
    senderId = conversation.following._id
  ) => {
    dispatch(setChatSelected({ selectedChatUserData: conversation.following }));
    await changeReadStatus(senderId).then(() => {
      setUnseenCount(0);
    });
  };

  // socket.on("newMessage", (data) => {
  //   if (data.senderId === conversation.following._id) {
  //     setUnseenCount((prevCount) => prevCount + 1);
  //   }
  // });

  return (
    <div
      className={`flex items-center cursor-pointer p-2 rounded-md ${isSelectedChat ? "bg-blue-300" : "hover:bg-gray-100 "}`}
      onClick={() => handleSelectConversation()}
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
      {unseenCount > 0 && (
        <span className="text-sm bg-red-500 rounded-full px-2 py-1 text-white">
          {unseenCount > 0 ? unseenCount : ""}
        </span>
      )}
    </div>
  );
}

export default Conversation;
