import { NormalBackendRes } from "@/types/login.ts";
import { axiosUserInstance } from "../axiosInstance/axiosUserInstance.ts";
import { END_POINTS } from "@/constants/endPoints.ts";
import {
  AddClaimerAddressRes,
  BidHistoryResponse,
  ClaimBidRes,
  UserParticipatingRes,
  UserProfileBidRes,
} from "@/types/bid.ts";
import { AxiosResponse } from "axios";
import { BidProductPayload } from "@/pages/user/post/BidProductPost.tsx";
export const bidProductPost = async (payload:BidProductPayload) => {
  const response = await axiosUserInstance.post(
    END_POINTS.POST_BID_PRODUCT,
    payload
  );
  return response.data;
};

export const placeBidOnProduct = async (
  bidAmount: string,
  bidProductId: string
) => {
  interface PlaceBidOnProductRes extends NormalBackendRes {
    totalBidAmount: number;
  }
  const response = await axiosUserInstance.post<PlaceBidOnProductRes>(
    `${END_POINTS.PLACE_BID_ON_PRODUCT}/${bidProductId}`,
    { bidAmount }
  );

  return response.data;
};

export const bidHistoryOfUser = async (bidProductId: string) => {
  const response: AxiosResponse<BidHistoryResponse> =
    await axiosUserInstance.get<BidHistoryResponse>(
      `${END_POINTS.GET_BID_HISTORY_ON_PRODUCT}/${bidProductId}`
    );


  return response.data;
};

export const getUserWistBid = async () => {
  const response: AxiosResponse<UserProfileBidRes> =
    await axiosUserInstance.get(END_POINTS.GET_USER_BIDS);


  return response.data;
};

export const getParticipatingBids = async () => {
  const response: AxiosResponse<UserParticipatingRes> =
    await axiosUserInstance.get(END_POINTS.GET_USER_PARTICIPATING_BIDS);

  return response.data;
};

export const getClaimBidDetails = async (productId: string) => {
  const response: AxiosResponse<ClaimBidRes> = await axiosUserInstance.get(
    `${END_POINTS.GET_CLAIM_BID_DETAILS}/${productId}`
  );

  return response.data;
};

export const addBidClaimerAddress = async (
  address: {
    country: string;
    state: string;
    district: string;
    city: string;
    postalCode: string;
    phone: string;
  },
  bidId: string
) => {
  const response: AxiosResponse<AddClaimerAddressRes> =
    await axiosUserInstance.post(
      `${END_POINTS.ADD_BID_CLAIMER_ADDRESS}/${bidId}`,
      address
    );
  return response.data;
};

export const getOwnerBidResult = async (bidId: string) => {
  const response = await axiosUserInstance.get(
    `${END_POINTS.GET_BID_RESULT_OWNER}/${bidId}`
  );

  return response.data;
};
