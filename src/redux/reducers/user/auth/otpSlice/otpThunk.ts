import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import authAxios from "../../../../../api/axiosInstance/demo";
import { User } from "../../../../../types/login";
import { MyError } from "../../../../../types/myError";
import { END_POINTS } from "../../../../../constants/endPoints";
// createAsyncThunk<res data type,req data type ,err data type>

export interface resData {
  status: boolean,
  message: string,
  userData: User
}

//to otp reducer
export const userOtpSignUp = createAsyncThunk<resData, User, { rejectValue: MyError }>(
  END_POINTS.SEND_OTP_SIGNUP,
  async (payload: User, thunkApi) => {
    try {
      const response = await authAxios.post(END_POINTS.SEND_OTP_SIGNUP, payload);

      const data = response.data as resData;
      // Set userData to local storage here
      localStorage.setItem('userCredentials', JSON.stringify(data.userData));

      return data
    } catch (err) {
      let errorMsg = "Something went wrong";

      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<MyError>;
        if (axiosError.response && axiosError.response.data) {
          errorMsg = axiosError.response.data.message;
        }
      }

      return thunkApi.rejectWithValue({ message: errorMsg, status: false });
    }
  }
);
