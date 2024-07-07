import { axiosUserInstance } from "../axiosInstance/axiosUserInstance.ts";
import { END_POINTS } from "@/constants/endPoints.ts";
import { ConversationsRes, SendMessageRes } from "@/types/chat.ts";
import { AxiosResponse } from "axios";
import { GetChatRes } from "@/types/chat.ts";
export const getConversations = async (): Promise<ConversationsRes> => {
  const response: AxiosResponse<ConversationsRes> = await axiosUserInstance.get(
    END_POINTS.GET_FOLLOWING
  );

  return response.data;
};

export const postMessage = async (message: string, recieverId: string) => {
  console.log(
    "postMessage message: string, recieverId: string",
    message,
    recieverId
  );

  const response: AxiosResponse<SendMessageRes> = await axiosUserInstance.post(
    `${END_POINTS.SEND_MESSAGE}/${recieverId}`,
    { message }
  );
  return response.data;
};

export const getChat = async (recieverId: string) => {
  const response:AxiosResponse<GetChatRes> = await axiosUserInstance.get(`${END_POINTS.GET_CHAT}/${recieverId}`);

  console.log('response get chat ',response.data);
  
  return response.data;
};
