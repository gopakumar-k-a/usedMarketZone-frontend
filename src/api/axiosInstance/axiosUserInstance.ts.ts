import axios from "axios";
import { store } from "../../redux/app/store";
import { Constants } from "../../constants/config";
import { toast } from "react-toastify";

import { logOut } from "@/redux/reducers/auth/authSlice";
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
    const { token } = store.getState().auth;
    console.log("token is ", token);

    if (token) {
      // config.headers.authorization = 'Bearer ' +token;
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosUserInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('error message from interceptor',error.message)
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
    }
  }
);
