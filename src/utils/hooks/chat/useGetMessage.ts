import { NormalBackendRes } from "@/types/login";
import { AxiosError, isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../reduxHooks";
import { useAppDispatch } from "../reduxHooks";
import { getChat } from "@/api/chat";
import { toast } from "react-toastify";
import { setMessages } from "@/redux/reducers/chat/chatSlice";

const useGetMessage = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { chatSelected, messages } = useAppSelector((state) => state.chat);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await getChat(chatSelected);
        dispatch(setMessages({ messages: response.chats }));
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
    if (chatSelected) {
      fetchMessages();
    }
  }, [chatSelected]);

  return {
    loading,
    chatSelected,
    messages,
  };
};

export default useGetMessage;
