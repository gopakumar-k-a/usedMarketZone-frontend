import { axiosUserInstance } from "../axiosInstance/axiosUserInstance.ts";
import { END_POINTS } from "../../constants/endPoints.ts";
import { UserNameCheckRes } from "../../types/user.ts";

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
console.log('user id ',userId);

  const response = await axiosUserInstance.put(`${END_POINTS.UPDATE_PROFILE}/${userId}`,payload);

  console.log("update profile response ", console.log(response.data));
  return response.data;
};
