import axios from "axios";
import { store } from "../../redux/app/store";
import { Constants } from "../../constants/config";
import { toast } from "react-toastify";

import { logOut } from "@/redux/reducers/auth/authSlice";
import { handleAxiosErrorHelper } from "@/utils/helpers/handleAxiosErrorHelper";
import { setCredentials } from "@/redux/reducers/auth/authSlice";
import { refreshAccessToken } from "../auth";
// import { useAppDispatch } from "@/utils/hooks/reduxHooks";

// const dispatch = useAppDispatch();

export const axiosUserInstance = axios.create({
  baseURL: Constants.BASE_URL,
  withCredentials: true,
});

export const axiosRefreshInstance = axios.create({
  baseURL: Constants.BASE_URL,
  withCredentials: true,
});

axiosUserInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().auth;

    if (accessToken) {

      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosRefreshInstance.interceptors.response.use(
  (response) => response,
  async (error) => {

    handleAxiosErrorHelper(error);

    return Promise.reject(error);
  }
);

axiosUserInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Prevents infinite loop
      if (error.response.data.message === "User is blocked") {
        toast.dismiss();
        toast.error("Your account has been blocked. Please contact admin.");
        store.dispatch(logOut());
        return Promise.reject(error);
      }
      try {
        const { user, role } = store.getState().auth;
        const { accessToken } = await refreshAccessToken();
        if (!accessToken || !user || !role) {
          throw new Error("Refresh token failed.");
        }

        store.dispatch(setCredentials({ user, accessToken, role }));
        originalRequest.headers.authorization = `Bearer ${accessToken}`;
        return axiosUserInstance(originalRequest);
      } catch (refreshError) {
        toast.error("refresh token expired");
        store.dispatch(logOut());
        return Promise.reject(refreshError);
      }

    }
    handleAxiosErrorHelper(error);

    return Promise.reject(error);
  }
);
