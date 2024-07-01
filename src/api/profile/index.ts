import axios from "axios";
import {
  axiosUserInstance,
  axiosRefreshInstance,
} from "../axiosInstance/axiosUserInstance.ts";
import { END_POINTS } from "../../constants/endPoints.ts";
import { UserNameCheckRes } from "../../types/user.ts";
import { Constants } from "../../constants/config.ts";
import { store } from "../../redux/app/store.ts";

const userId = store.getState().auth.user?._id;

const getUserData = async (id: string) => {
  const response = axiosUserInstance.get(`${END_POINTS.GET_USER_INFO}/${id}`);
};

export const userNameAvailabilty = async (userName: string, userId: string) => {
  console.log("user id is ", userId);

  const response = await axiosUserInstance.get<UserNameCheckRes>(
    `${END_POINTS.USER_NAME_AVILABILITY}/${userName}/${userId}`
  );
  console.log("response in USER_NAME_AVILABILITY ", response.data);

  return response.data.userAvailablity;
};

export const updateProfile = async (payload) => {
  console.log("payload inside update profile ", payload);
  console.log("user id ", userId);

  const response = await axiosUserInstance.put(
    `${END_POINTS.UPDATE_PROFILE}/${userId}`,
    payload
  );

  console.log("update profile response ", console.log(response.data));
  return response.data;
};

export const updateImageToCloudinary = async (imageBlob) => {
  const response = await axios.post(`${Constants.CLOUDINARY_URL}`, imageBlob);

  return response.data;
};

export const sendImageUrlToBackEnd = async (imageUrl: string) => {
  const response = await axiosUserInstance.put(
    `${END_POINTS.UPDATE_PROFILE_PIC}/${userId}`,
    { imageUrl }
  );

  console.log("response from sendImageUrlToBackEnd", response.data);
  return response.data;
};

export const updateUserPassword = async (payload) => {
  const response = await axiosUserInstance.put(
    `${END_POINTS.UPDATE_USER_PASSWORD}/${userId}`,
    payload
  );

  console.log("response from update user password");

  return response.data;
};

export const removeProfilePicture = async (userId: string) => {
  const response = await axiosUserInstance.put(
    `${END_POINTS.REMOVE_PROFILE_PIC}/${userId}`
  );

  console.log("response from remove profile picture ", removeProfilePicture);

  return response.data;
};

export const getOwnerPostsListImage = async () => {
  const response = await axiosUserInstance.get(
    END_POINTS.GET_OWNER_POSTS_IMAGE_LIST
  );
console.log('image urls ',response.data);

  return response.data;
};
