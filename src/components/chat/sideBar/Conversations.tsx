
import Conversation from "./Conversation";
import useGetConversations from "@/utils/hooks/chat/useConversation";
import { FollowingUser } from "@/types/chat";
import Loader from "@/components/loader/Loader";
function Conversations() {
  const { conversations, loading } = useGetConversations();
  return (
    <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
      {conversations.map((conversation: FollowingUser) => (
        <Conversation key={`${conversation.following._id}`} conversation={conversation} />
      ))}
      {loading ? <Loader /> : null}
    </div>
  );
}

export default Conversations;
