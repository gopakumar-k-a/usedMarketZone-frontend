import { getFollowing } from "@/api/user";
import { AxiosError, isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NormalBackendRes } from "@/types/login";
import { useAppSelector } from "../reduxHooks";
import { useAppDispatch } from "../reduxHooks";
import { setConversations } from "@/redux/reducers/chat/chatSlice";
import { getConversationsWithUserData } from "@/api/chat";
import { addOneConversationToConversations } from "@/redux/reducers/chat/chatSlice";
import { ConversationData } from "@/types/chat";
const useGetConversations = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { conversations } = useAppSelector((state) => state.chat);

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        // const response = await getFollowing();
        const { conversations } = await getConversationsWithUserData();
        dispatch(setConversations({ conversations: conversations }));
      } catch (error) {
        if (isAxiosError(error)) {
          if (isAxiosError(error)) {
            const axiosError = error as AxiosError<NormalBackendRes>;
            if (axiosError.response && axiosError.response.data) {
              toast.error(axiosError.response.data.message);
            } else {
              toast.error("An unknown error occurred");
            }
          } else {
            toast.error("An unexpected error occurred");
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  const addOneConversation = (conversation: ConversationData) => {
    dispatch(addOneConversationToConversations({ conversation }));
  };

  return { loading, conversations, addOneConversation };
};

export default useGetConversations;
