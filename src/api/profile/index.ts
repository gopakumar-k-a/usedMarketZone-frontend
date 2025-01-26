import axios from "axios";
import {
  axiosUserInstance,
} from "../axiosInstance/axiosUserInstance.ts";
import { END_POINTS } from "../../constants/endPoints.ts";
import { UserNameCheckRes } from "../../types/user.ts";
import { Constants } from "../../constants/config.ts";
import { store } from "../../redux/app/store.ts";
import { User } from "@/types/login.ts";
import { PasswordFormValues } from "@/components/user/PasswordUpdateDialogue.tsx";

const userId = store.getState().auth.user?._id;



export const userNameAvailabilty = async (userName: string, userId: string) => {

  const response = await axiosUserInstance.get<UserNameCheckRes>(
    `${END_POINTS.USER_NAME_AVILABILITY}/${userName}/${userId}`
  );

  return response.data.userAvailablity;
};

export const updateProfile = async (payload:User) => {

  const response = await axiosUserInstance.put(
    `${END_POINTS.UPDATE_PROFILE}/${userId}`,
    payload
  );

  return response.data;
};

export const updateImageToCloudinary = async (imageBlob:any) => {
  const response = await axios.post(`${Constants.CLOUDINARY_URL}`, imageBlob);

  return response.data;
};

export const sendImageUrlToBackEnd = async (imageUrl: string) => {
  const response = await axiosUserInstance.put(
    `${END_POINTS.UPDATE_PROFILE_PIC}/${userId}`,
    { imageUrl }
  );

  return response.data;
};

export const updateUserPassword = async (payload:PasswordFormValues) => {
  const response = await axiosUserInstance.put(
    `${END_POINTS.UPDATE_USER_PASSWORD}/${userId}`,
    payload
  );

  return response.data;
};

export const removeProfilePicture = async (userId: string) => {
  const response = await axiosUserInstance.put(
    `${END_POINTS.REMOVE_PROFILE_PIC}/${userId}`
  );

  return response.data;
};

export const getOwnerPostsListImage = async () => {
  const response = await axiosUserInstance.get(
    END_POINTS.GET_OWNER_POSTS_IMAGE_LIST
  );

  return response.data;
};

export const getBookmarkImageList = async () => {
  const response = await axiosUserInstance.get(
    END_POINTS.GET_BOOKMARK_IMAGE_LIST
  );

  return response.data;
};

