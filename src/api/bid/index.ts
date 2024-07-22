import { NormalBackendRes } from "@/types/login.ts";
import { axiosUserInstance } from "../axiosInstance/axiosUserInstance.ts";
import { END_POINTS } from "@/constants/endPoints.ts";
import { BidHistoryResponse, UserProfileBidRes } from "@/types/bid.ts";
import { AxiosResponse } from "axios";
export const bidProductPost = async (payload) => {
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
  console.log("response .data bidProductPOst", response.data);

  return response.data;
};

export const bidHistoryOfUser = async (bidProductId: string) => {
  const response: AxiosResponse<BidHistoryResponse> =
    await axiosUserInstance.get<BidHistoryResponse>(
      `${END_POINTS.GET_BID_HISTORY_ON_PRODUCT}/${bidProductId}`
    );

  console.log("response.data bid  history of user ", response.data);

  return response.data;
};

export const getUserWistBid = async () => {
  const response: AxiosResponse<UserProfileBidRes> =
    await axiosUserInstance.get(END_POINTS.GET_USER_BIDS);

  console.log("getUserWistBid response data ", response.data);

  return response.data;
};
