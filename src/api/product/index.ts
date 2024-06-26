import { ReportPost } from "@/components/post/ReportPostDialogue.tsx";
import { axiosUserInstance } from "../axiosInstance/axiosUserInstance.ts";
import { END_POINTS } from "@/constants/endPoints.ts";
import { isAxiosError } from "axios";

export const postProduct = async (payload) => {
  const response = await axiosUserInstance.post(
    `${END_POINTS.POST_PRODUCT}`,
    payload
  );

  return response.data;
};

export const getAllPosts = async () => {
  const response = await axiosUserInstance.get(END_POINTS.GET_ALL_POSTS);

  return response.data;
};

export const bookmarkPost = async (postId: string) => {
  const reponse = await axiosUserInstance.patch(
    `${END_POINTS.BOOKMARK_POST}/${postId}`
  );

  return reponse.data;
};

export const postReport = async (payload: ReportPost) => {
  const response = await axiosUserInstance.post(
    END_POINTS.REPORT_POST,
    payload
  );
  return response.data;
};

export const getUserPostDetails = async (postId: string) => {
  console.log("post id ", postId);

  const response = await axiosUserInstance.get(
    `${END_POINTS.GET_POST_DETAILS}/${postId}`
  );
  return response.data;
};

export const addNewComment = async (payload: any) => {
  const response = await axiosUserInstance.post(
    END_POINTS.ADD_NEW_COMMENT,
    payload
  );

  return response.data;
};
export const replyComment = async (payload: any) => {
  const response = await axiosUserInstance.patch(
    END_POINTS.REPLY_COMMENT,
    payload
  );

  return response.data;
};

export const getPostComments = async (postId: string) => {
  const response = await axiosUserInstance.get(
    `${END_POINTS.GET_POST_COMMENTS}/${postId}`
  );

  return response.data;
};
export const getReplyComments = async (commentId: string) => {
  const response = await axiosUserInstance.get(
    `${END_POINTS.GET_REPLY_COMMENTS}/${commentId}`
  );

  return response.data;
};
