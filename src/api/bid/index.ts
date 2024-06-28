import { axiosUserInstance } from "../axiosInstance/axiosUserInstance.ts";
import { END_POINTS } from "@/constants/endPoints.ts";

export const bidProductPost=async(payload)=>{

    const response=await axiosUserInstance.post(END_POINTS.POST_BID_PRODUCT,payload)
    return response.data
}