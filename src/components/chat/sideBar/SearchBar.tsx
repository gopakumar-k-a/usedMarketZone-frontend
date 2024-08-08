import useGetConversations from "@/utils/hooks/chat/useConversation";
import { useState } from "react";
import { setChatSelected } from "@/redux/reducers/chat/chatSlice";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { toast } from "react-toastify";
import { ConversationData } from "@/types/chat";

function SearchBar() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const { conversations } = useGetConversations();

  const handleSearch = () => {
    if (!search) return;
    if (search.length < 3) {
      return toast.error("search termn must be atleast 3 characters long");
    }
    // const conversation = conversations.find((c) =>
    //   c.following.userName.toLowerCase().includes(search.toLowerCase())
    // );
    const conversation = conversations.find((c: ConversationData) =>
      c.participantsData.some((p) =>
        p.userName.toLowerCase().includes(search.toLowerCase())
      )
    );

    if (conversation) {
      dispatch(
        setChatSelected({ selectedChatUserData: conversation.participantsData[0]._id })
      );
      setSearch("");
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div >
      <input
        placeholder="Search..."
        className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
        name="search"
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>
        <svg
          className="size-10 absolute top-3 right-3 rounded-lg bg-blue-600 hover:bg-blue-500  text-white"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;
