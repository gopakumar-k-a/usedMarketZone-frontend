import { BidDuration, GetAllProductPostsAdminRes } from "@/types/product";
import { axiosAdminInstance } from "../axiosInstance/axiosAdminInstance";
import { END_POINTS } from "@/constants/endPoints";
import { PostReportRes } from "@/types/admin/postReport";
import { AxiosResponse } from "axios";
import { GetBidHistoryOfProductRes } from "@/types/bid";
import { KycAdminUpdatedData, KycDataAdmin } from "@/types/user";
import { AdminStatisticsRes } from "@/types/admin/dashboard";
import { TransactionRes } from "@/types/admin/transaction";
import {
  DashboardTransactionStatisticsRes,
} from "@/types/transactions";
import { BidRequestResponse } from "@/types/admin/bidRequest";

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


  return response.data;
};

export const getUserProfileInAdmin = async (userId: string) => {
  const response = await axiosAdminInstance.get(
    `${END_POINTS.GET_USER_PROFILE_IN_ADMIN}/${userId}`
  );


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

export const getBidRequests = async (
  page: number = 1,
  search: string | null = "",
  sort: string | null,
  limit: number = 5
) => {
  const response:AxiosResponse<BidRequestResponse> = await axiosAdminInstance.get(END_POINTS.GET_BID_REQUESTS, {
    params: {
      page,
      limit,
      searchQuery: search,
      sort,
    },
  });
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
  const response: AxiosResponse<GetBidHistoryOfProductRes> =
    await axiosAdminInstance.get(
      `${END_POINTS.GET_BID_HISTORY_ADMIN}/${bidProductId}`
    );
  return response.data;
};

export const getKycDataAdmin = async (
  page: number = 1,
  search: string | null = "",
  sort: string | null,
  limit: number = 5
) => {
  const response: AxiosResponse<KycDataAdmin> = await axiosAdminInstance.get(
    `${END_POINTS.GET_ALL_BID_REQUESTS_ADMIN}`,
    {
      params: {
        page,
        limit,
        searchQuery: search,
        sort,
      },
    }
  );

  return response.data;
};

export const handleKycRequest = async (
  kycId: string,
  type: "accept" | "reject"
) => {
  const response: AxiosResponse<KycAdminUpdatedData> =
    await axiosAdminInstance.patch(
      `${END_POINTS.HANDLE_KYC_REQUEST}/${kycId}`,
      { type }
    );

  return response.data;
};

export const handleGetAllProductPostsAdmin = async (
  page: number = 1,
  limit: number = 5,
  search: string | null,
  sort: string | null
) => {
  const response: AxiosResponse<GetAllProductPostsAdminRes> =
    await axiosAdminInstance.get(END_POINTS.GET_ALL_PRODUCT_POSTS_ADMIN, {
      params: {
        page,
        limit,
        searchQuery: search,
        sort,
      },
    });

  return response.data;
};

export const getDashboardStatistics = async () => {
  const response: AxiosResponse<AdminStatisticsRes> =
    await axiosAdminInstance.get(END_POINTS.GET_DASHBOARD_STATISTICS);

  return response.data;
};

export const getTransactionStatisctics = async () => {
  const response: AxiosResponse<DashboardTransactionStatisticsRes> =
    await axiosAdminInstance.get(END_POINTS.GET_TRANSACTION_STATISTICS);
  return response.data;
};

export const getBidTransactions = async (
  page: number = 1,
  search: string | null = "",
  sort: string | null,
  limit: number = 5,
  shipmentStatus: string,
  paymentStatus: string,
  toDate: string = "",
  fromDate: string = ""
) => {
  const response: AxiosResponse<TransactionRes> = await axiosAdminInstance.get(
    END_POINTS.GET_BID_TRANSACTIONS_ADMIN,
    {
      params: {
        page,
        limit,
        searchQuery: search,
        sort,
        shipmentStatus,
        paymentStatus,
        toDate,
        fromDate,
      },
    }
  );
  return response.data;
};

export const changeTransactionStatusToAdminRecieved = async (trId: string) => {
  const response = await axiosAdminInstance.patch(
    `${END_POINTS.CHANGE_TR_STATUS_ADMIN_RECIEVED}/${trId}`
  );

  return response.data;
};

export const sendProductToWinner = async (
  trId: string,
  winnerTrackingNumber: string
) => {
  const response = await axiosAdminInstance.patch(
    `${END_POINTS.CHANGE_TR_STATUS_ADMIN_SEND_PRODUCT_WINNER}/${trId}`,
    { winnerTrackingNumber }
  );

  return response.data;
};

export const markProductAsDelivered = async (
  trId: string,
  productOwnerId: string,
  productId: string,
  bidId: string
) => {
  const response = await axiosAdminInstance.patch(
    `${END_POINTS.CHANGE_TR_STATUS_ADMIN_PRODUCT_DELIVERED}/${trId}`,
    { productOwnerId, productId, bidId }
  );

  return response.data;
};
