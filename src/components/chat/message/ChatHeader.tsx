import { useAppSelector } from "@/utils/hooks/reduxHooks";

function ChatHeader() {
  const { selectedChatUserData } = useAppSelector((state) => state.chat);
  return (
    <header>
      <div className="flex items-center cursor-pointer  bg-gray-100 p-2 rounded-md">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
          <img
            src={`${selectedChatUserData.imageUrl ? selectedChatUserData.imageUrl : "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"}`}
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">
            {" "}
            {selectedChatUserData.userName
              ? selectedChatUserData.userName
              : "Loading..."}
          </h2>
          <p className="text-gray-600">Hoorayy!!</p>
        </div>
      </div>
    </header>
  );
}

export default ChatHeader;