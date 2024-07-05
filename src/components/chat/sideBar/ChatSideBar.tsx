import React from "react";

import SearchBar from "./SearchBar";

import Conversations from "./Conversations";

function ChatSideBar() {
  return (
    <div className="w-1/4  bg-white border-r border-gray-300 flex flex-col">
      <header>
        <SearchBar />
      </header>

      {/* <!-- Contact List --> */}
      <Conversations />
    </div>
  );
}

export default ChatSideBar;
