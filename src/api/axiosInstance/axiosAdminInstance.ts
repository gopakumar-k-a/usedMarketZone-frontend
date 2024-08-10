import axios from 'axios'
import { store } from '../../redux/app/store';
import { Constants } from '../../constants/config';
import { handleAxiosErrorHelper } from '@/utils/helpers/handleAxiosErrorHelper';
import { toast } from 'react-toastify';
import { logOut, setCredentials } from '@/redux/reducers/auth/authSlice';
import { refreshAccessToken } from '../auth';
import { axiosUserInstance } from './axiosUserInstance.ts';


export const axiosAdminInstance = axios.create({
    baseURL: `${Constants.BASE_URL}`,
    withCredentials: true,
});

export const axiosRefreshInstanceAdmin = axios.create({
    baseURL: Constants.BASE_URL,
    withCredentials: true,
});

axiosAdminInstance.interceptors.request.use(
    (config) => {

      const { accessToken } = store.getState().auth;  
      console.log('accessToken is ',accessToken);
      
      
      if (accessToken) {
        // config.headers.authorization = 'Bearer ' +accessToken; 
        config.headers.authorization = `Bearer ${accessToken}`; 
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // axiosAdminInstance.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {
  //     console.log('error message from interceptor',error.message)
  //     handleAxiosErrorHelper(error);
  //     return Promise.reject(error);
  //   }
  // );

  axiosAdminInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log("error message from interceptor", error.message);
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


