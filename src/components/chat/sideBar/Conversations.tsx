import Conversation from "./Conversation";
import useGetConversations from "@/utils/hooks/chat/useConversation";
import { ConversationData, FollowingUser } from "@/types/chat";
import Loader from "@/components/loader/Loader";
import { useState } from "react";

import { LuPlusCircle } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import FollowingUserDialogue from "@/components/user/following/FollowingDialogue";
function Conversations() {
  const { conversations, loading } = useGetConversations();

  const [search, setSearch] = useState("");
  const [isFollowingDialogueOpen, setFollowingDialogueOpen] =
    useState<boolean>(false);
  const filteredConversations = conversations.filter(
    (conversation: ConversationData) =>
      conversation.participantsData.some((participant) =>
        participant.userName.toLowerCase().includes(search.toLowerCase())
      )
  );

  const handleFollowingUserDialogueClose=()=>{
    setFollowingDialogueOpen(false)
  }

  return (
    <>
      <div className="overflow-y-auto h-screen p-3 mb-2 pb-2 pt-2">
        <header className="grid grid-cols-4">
          <input
            type="text"
            placeholder="Search conversations..."
            className="input shadow-lg border-gray-300 px-5  rounded-xl w-full col-span-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            className="flex justify-center items-center"
            onClick={() => setFollowingDialogueOpen(true)}
          >
            <LuPlusCircle className="  h-5 w-5 text-white cursor-pointer col-span-1" />
          </Button>
        </header>
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20 pt-2">
          {filteredConversations.map(
            (conversation: ConversationData, index) => (
              <Conversation key={index} conversation={conversation} />
            )
          )}
          {loading ? <Loader /> : null}
        </div>
      </div>
      <FollowingUserDialogue
        isFollowingDialogueOpen={isFollowingDialogueOpen}
        onFollowingDialogueClose={handleFollowingUserDialogueClose}
      />
    </>
  );
}

export default Conversations;
