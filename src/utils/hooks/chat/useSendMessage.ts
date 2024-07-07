import { useState } from "react";
import { postMessage } from "@/api/chat";
import { toast } from "react-toastify";
import { AxiosError, isAxiosError } from "axios";
import { NormalBackendRes } from "@/types/login";
import { setMessages } from "@/redux/reducers/chat/chatSlice";
import { useAppDispatch } from "../reduxHooks";
import useGetMessage from "./useGetMessage";
const useSendMessage = () => {
  const dispatch = useAppDispatch();
  const { chatSelected, messages } = useGetMessage();
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message: string) => {
    try {
      const response = await postMessage(message, chatSelected);

      if (!response) {
        throw new Error("cant send message");
      }

      dispatch(setMessages({ messages: [...messages, response.newMessage] }));
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

  return {
    sendMessage,
    loading,
  };
};

export default useSendMessage;
