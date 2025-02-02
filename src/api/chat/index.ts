import { axiosUserInstance } from "../axiosInstance/axiosUserInstance.ts";
import { END_POINTS } from "@/constants/endPoints.ts";
import { GetConversationsRes, SendMessageRes } from "@/types/chat.ts";
import { AxiosResponse } from "axios";
import { GetChatRes } from "@/types/chat.ts";

export const postMessage = async (message: string, recieverId: string) => {


  const response: AxiosResponse<SendMessageRes> = await axiosUserInstance.post(
    `${END_POINTS.SEND_MESSAGE}/${recieverId}`,
    { message }
  );
  return response.data;
};

export const sendPostAsMessage = async (
  productId: string,
  recieverId: string
) => {
  const response: AxiosResponse<SendMessageRes> = await axiosUserInstance.post(
    `${END_POINTS.SEND_POST_AS_MESSAGE}/${recieverId}`,
    { productId }
  );
  return response.data;
};

export const sendPostReplyAsMessage = async (
  message: string,
  productId: string,
  recieverId: string
) => {
  const response: AxiosResponse<SendMessageRes> = await axiosUserInstance.post(
    `${END_POINTS.SEND_POST_REPLY_AS_MESSAGE}/${recieverId}`,
    { message, productId }
  );
  return response.data;
};

export const getChat = async (recieverId: string) => {
  const response: AxiosResponse<GetChatRes> = await axiosUserInstance.get(
    `${END_POINTS.GET_CHAT}/${recieverId}`
  );

  return response.data;
};

export const getUnreadMessages = async (senderId: string) => {
  const response = await axiosUserInstance.get(
    `${END_POINTS.GET_UNREAD_MESSAGES}/${senderId}`
  );

  return response.data;
};

export const changeReadStatus = async (senderId: string) => {
  const response = await axiosUserInstance.patch(
    `${END_POINTS.CHANGE_READ_STATUS}/${senderId}`
  );

  return response.data;
};

export const getConversationsWithUserData = async () => {
  const response:AxiosResponse<GetConversationsRes> = await axiosUserInstance.get(END_POINTS.GET_CONVERSATIONS);

  return response.data;
};
