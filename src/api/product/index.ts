import { axiosUserInstance } from "../axiosInstance/axiosUserInstance.ts";
import { END_POINTS } from "@/constants/endPoints.ts";

export const postProduct=async(payload)=>{
     
    const response=await axiosUserInstance.post(`${END_POINTS.POST_PRODUCT}`,payload)

    return response.data
}

export const getAllPosts=async()=>{
    const response=await axiosUserInstance.get(END_POINTS.GET_ALL_POSTS)

    return response.data
}