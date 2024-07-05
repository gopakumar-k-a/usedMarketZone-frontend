import { useState } from "react";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

function MessageContainer() {
  const [chatSelected, setChatSelected] = useState(false);
  return <>{chatSelected ? <> <div className="w-3/4 max-h-screen bg-red-200 flex flex-col">
    {/* <!-- Main Chat Area --> */}
    <div className="flex-1">
      {/* <!-- Chat Header --> */}
      <ChatHeader />
      <Messages />
    </div>
  </div></> : <><NoChatSelected/></>}</>;
}

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="flex-1">
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
    <div className="flex flex-col gap-2">
    <h1 className="font-bold text-4xl"> no chat selected</h1>
    <h1 className="font-medium text-2xl">  Start Chat  By Clicking A Message</h1> 
    </div>
    </div>
    </div>
  );
};
