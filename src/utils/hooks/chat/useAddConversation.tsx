import { ConversationData } from "@/types/chat";
import { useAppDispatch } from "../reduxHooks";
import { addOneConversationToConversations } from "@/redux/reducers/chat/chatSlice";
function useUpdateConversation() {
  const dispatch = useAppDispatch();
  const addOneConversation = (conversation: ConversationData) => {
    dispatch(addOneConversationToConversations({ conversation }));
  };
  return { addOneConversation };
}

export default useUpdateConversation;
