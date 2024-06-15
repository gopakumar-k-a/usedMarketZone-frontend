import { axiosAdminInstance } from "../axiosInstance/axiosAdminInstance";
import { END_POINTS } from "@/constants/endPoints";

export const getAllUsers = async (page:number, limit:number) => {
 
  const response = await axiosAdminInstance.get(`${END_POINTS.GET_ALL_USERS}/${page}/${limit}`);

  return response.data;
};


export const modifyUserAccess=async(userId:string)=>{
    const response=await axiosAdminInstance.get(`${END_POINTS.UPDATE_USER_ACCESS}/${userId}`)

    console.log('response in modify user access api call ',response.data);

    return response.data
    
}