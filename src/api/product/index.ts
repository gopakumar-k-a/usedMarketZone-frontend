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
    
        const response = await axiosUserInstance.post(END_POINTS.REPORT_POST, payload);
        return response.data;

    
};
