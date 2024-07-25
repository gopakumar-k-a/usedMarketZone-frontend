import MessageContainer from "@/components/chat/message/MessageContainer";
import ChatSideBar from "@/components/chat/sideBar/ChatSideBar";
import useGetMessage from "@/utils/hooks/chat/useGetMessage";

function ChatPage() {
  const { chatSelected } = useGetMessage();
  return (
    <div className="flex w-full max-h-screen">

    
      <ChatSideBar/>

      <MessageContainer />
    </div>
  );
}

export default ChatPage;
