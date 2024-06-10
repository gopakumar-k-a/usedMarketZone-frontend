import axios from 'axios'
import { store } from '../../redux/app/store';
import { Constants } from '../../constants/config';

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
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
        console.log('config.headers.authorization in interseptor ',config.headers.authorization);
        
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );



