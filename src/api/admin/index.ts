import { BidDuration } from "@/types/product";
import { axiosAdminInstance } from "../axiosInstance/axiosAdminInstance";
import { END_POINTS } from "@/constants/endPoints";
import { PostReportRes } from "@/types/admin/postReport";
import { AxiosResponse } from "axios";
import { GetBidHistoryOfProductRes } from "@/types/bid";

export const getAllUsers = async (page: number, limit: number) => {
  const response = await axiosAdminInstance.get(
    `${END_POINTS.GET_ALL_USERS}/${page}/${limit}`
  );

  return response.data;
};

export const modifyUserAccess = async (userId: string) => {
  const response = await axiosAdminInstance.get(
    `${END_POINTS.UPDATE_USER_ACCESS}/${userId}`
  );

  console.log("response in modify user access api call ", response.data);

  return response.data;
};

export const getUserProfileInAdmin = async (userId: string) => {
  const response = await axiosAdminInstance.get(
    `${END_POINTS.GET_USER_PROFILE_IN_ADMIN}/${userId}`
  );

  console.log("getUserProfile response .data ", response.data);

  return response.data;
};

export const getUserPostsInAdmin = async (userId: string) => {
  const response = await axiosAdminInstance.get(
    `${END_POINTS.GET_USER_POSTS_IN_ADMIN}/${userId}`
  );

  return response.data;
};

export const getUserPostDetailsInAdmin = async (postId: string) => {
  const response = await axiosAdminInstance.get(
    `${END_POINTS.GET_USER_POST_DETAILS_IN_ADMIN}/${postId}`
  );
  return response.data;
};

export const getBidRequests = async () => {
  const response = await axiosAdminInstance.get(END_POINTS.GET_BID_REQUESTS);
  return response.data;
};

export const acceptBidRequest = async (
  bidId: string,
  bidDuration: BidDuration | null
) => {
  const response = await axiosAdminInstance.patch(
    `${END_POINTS.ACCEPT_BID_PRODUCT}/${bidId}`,
    { bidDuration: bidDuration }
  );

  return response.data;
};

export const getPostReports = async (): Promise<PostReportRes> => {
  const response = await axiosAdminInstance.get(END_POINTS.GET_POST_REPORTS);

  return response.data;
};

export const blockPostAdmin = async (productId: string) => {
  const response = await axiosAdminInstance.patch(
    `${END_POINTS.BLOCK_USER_POST}/${productId}`
  );

  return response.data;
};

export const getBidHistoryOfProduct = async (bidProductId: string) => {
  const response:AxiosResponse<GetBidHistoryOfProductRes> = await axiosAdminInstance.get(
    `${END_POINTS.GET_BID_HISTORY_ADMIN}/${bidProductId}`
  );
  return response.data;
};
