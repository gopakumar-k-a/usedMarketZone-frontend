import axios from 'axios'
import { store } from '../../redux/app/store';
import { Constants } from '../../constants/config';


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

      const { token } = store.getState().auth;  
      console.log('token is ',token);
      
      
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



