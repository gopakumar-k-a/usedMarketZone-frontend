import { axiosUserInstance } from "../axiosInstance/axiosUserInstance.ts";
import { END_POINTS } from "@/constants/endPoints.ts";

export const getSuggestedUsers = async () => {
  const response = await axiosUserInstance.get(END_POINTS.GET_SUGGESTED_USERS);

  console.log("response data getSuggesteUsers ", response.data);

  return response.data;
};

export const getUserById = async (userId: string) => {
  const response = await axiosUserInstance.get(
    `${END_POINTS.GET_USER_INFO}/${userId}`
  );
  return response.data;
};

export const followUser = async (userId: string) => {
  const response = await axiosUserInstance.patch(
    `${END_POINTS.FOLLOW_USER}/${userId}`
  );
  return response.data;
};
export const unFollowUser = async (userId: string) => {
  const response = await axiosUserInstance.patch(
    `${END_POINTS.UN_FOLLOW_USER}/${userId}`
  );
  return response.data;
};

export const getNumOfFollow=async(userId:string)=>{
    const response=await axiosUserInstance.get(`${END_POINTS.GET_NO_OF_FOLLOW}/${userId}`)

    console.log('response data get num of follow ',response.data);
    

    return response.data
}
