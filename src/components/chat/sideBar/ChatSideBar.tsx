
import SearchBar from "./SearchBar";

import Conversations from "./Conversations";
import useGetMessage from "@/utils/hooks/chat/useGetMessage";
function ChatSideBar() {
  const {chatSelected}=useGetMessage()
  return (
    <div className={`${!chatSelected?"w-full":"hidden"} md:block  md:w-1/4     bg-white border-r border-gray-300 flex flex-col`}>
      {/* <header className="fixed top-16 md:top-0 z-50 ">
        <SearchBar />
      </header> */}

      {/* <!-- Contact List --> */}
      <Conversations />
    </div>
  );
}

export default ChatSideBar;
