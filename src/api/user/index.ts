import { axiosUserInstance } from "../axiosInstance/axiosUserInstance.ts";
import { END_POINTS } from "@/constants/endPoints.ts";
import { ConversationsRes, FollowUserRes } from "@/types/chat.ts";
import { NormalBackendRes } from "@/types/login.ts";
import { NotificationRes } from "@/types/Notification.ts";
import { MyKycDataRes } from "@/types/user.ts";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
export const getSuggestedUsers = async () => {
  const response = await axiosUserInstance.get(END_POINTS.GET_SUGGESTED_USERS);

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

export const getNumOfFollow = async (userId: string) => {
  const response = await axiosUserInstance.get(
    `${END_POINTS.GET_NO_OF_FOLLOW}/${userId}`
  );

  return response.data;
};

export const getFollowing = async (): Promise<ConversationsRes> => {
  const response: AxiosResponse<ConversationsRes> = await axiosUserInstance.get(
    END_POINTS.GET_FOLLOWING
  );

  return response.data;
};

export const getFollowers = async () => {
  const response: AxiosResponse<FollowUserRes> = await axiosUserInstance.get(
    END_POINTS.GET_FOLLOWERS
  );

  return response.data;
};

export const submitKycRequest = async (kycData: {
  name: string;
  dob: string;
  idType: string;
  idNumber: string;
  phone: string;
}) => {
  try {
    const response: AxiosResponse<NormalBackendRes> =
      await axiosUserInstance.post(END_POINTS.SUBMIT_KYC_REQUEST, kycData);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;

      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.message
      ) {

        const backendError = axiosError.response.data.message;
        toast.error(backendError);
      }
    }
  }
};

export const searchOnApp = async (
  query: string,
  filter: string,
  subFilter: string | null = ""
) => {

  const response = await axiosUserInstance.get(END_POINTS.SEARCH_ON_APP, {
    params: {
      query: query,
      filter: filter,
      subFilter: subFilter,
    },
  });

  return response.data;
};

export const getNotifications = async () => {
  const response: AxiosResponse<NotificationRes> = await axiosUserInstance.get(
    END_POINTS.GET_NOTIFICATIONS
  );

  return response.data;
};

export const changeNotificationUnreadStatus = async () => {
  const response = await axiosUserInstance.patch(
    END_POINTS.CHANGE_NOTIFICATION_STATUS
  );

  return response.data;
};

export const getMyKycData = async () => {
  const response: AxiosResponse<MyKycDataRes> = await axiosUserInstance.get(
    END_POINTS.MY_KYC_DATA
  );

  return response.data;
};
