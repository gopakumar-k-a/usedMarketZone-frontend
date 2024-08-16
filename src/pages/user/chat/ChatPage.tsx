import MessageContainer from "@/components/chat/message/MessageContainer";
import ChatSideBar from "@/components/chat/sideBar/ChatSideBar";

function ChatPage() {
  return (
    <div className="flex w-full max-h-screen">
      <ChatSideBar />

      <MessageContainer />
    </div>
  );
}

export default ChatPage;
