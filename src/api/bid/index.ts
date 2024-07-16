import { NormalBackendRes } from "@/types/login.ts";
import { axiosUserInstance } from "../axiosInstance/axiosUserInstance.ts";
import { END_POINTS } from "@/constants/endPoints.ts";

export const bidProductPost=async(payload)=>{

    const response=await axiosUserInstance.post(END_POINTS.POST_BID_PRODUCT,payload)
    return response.data
}

export const placeBidOnProduct = async (
    bidAmount: string,
    bidProductId: string
  ) => {
    interface PlaceBidOnProductRes extends NormalBackendRes{
        totalBidAmount:number
    }
    const response = await axiosUserInstance.post<PlaceBidOnProductRes>(
      `${END_POINTS.PLACE_BID_ON_PRODUCT}/${bidProductId}`,
      {bidAmount}
    );
    console.log("response .data bidProductPOst", response.data);
  
    return response.data;
  };