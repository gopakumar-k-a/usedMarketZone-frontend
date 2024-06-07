import axios from 'axios'
import { Constants } from '../../constants/config';

const axiosUserInstance = axios.create({
    baseURL: `${Constants.BASE_URL}/admin`,
    withCredentials: true,
});

export const axiosRefreshInstance = axios.create({
    baseURL: Constants.BASE_URL,
    withCredentials: true,
});



