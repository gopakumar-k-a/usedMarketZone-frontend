
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';

export const handleAxiosErrorHelper = (error: unknown) => {
  if (axios.isAxiosError(error)) {

    const axiosError = error as AxiosError<any>;

    if (
      axiosError.response &&
      axiosError.response.data &&
      axiosError.response.data.message
    ) {
      const backendError = axiosError.response.data.message;
      toast.error(backendError);
    } else {
      toast.error("An unexpected error occurred");
    }
  } else {
    toast.error("An unknown error occurred");
  }
};
