import { useEffect } from "react";
import useGetMessage from "./useGetMessage";
import { useAppDispatch } from "../reduxHooks";
import { setMessages } from "@/redux/reducers/chat/chatSlice";
import { useSocketContext } from "@/context/SocketContext";

function useListenMessages() {
  const context = useSocketContext();
  const dispatch = useAppDispatch();

  const { messages } = useGetMessage();

  useEffect(() => {
    if (!context) {
      console.error(
        "useListenMessages must be used within a SocketContextProvider"
      );
      return;
    }

    const { socket } = context;

    socket?.on("newMessage", (newMessage: string) => {
  

        dispatch(setMessages({ messages: [...messages, newMessage] }));
      
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [context, messages, dispatch]);
}

export default useListenMessages;
