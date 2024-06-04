import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import authAxios from "../../../../api/authApi";
import { User } from "../../../../../types/login";
import { MyError } from "../../../../../types/myError";

// createAsyncThunk<res data type,req data type ,err data type>

export interface resData {
  status: boolean,
  message: string,
  userData: User
}

//to otp reducer
export const userOtpSignUp = createAsyncThunk<resData, User, { rejectValue: MyError }>(
  '/api/send-otp',
  async (payload: User, thunkApi) => {
    try {
      const response = await authAxios.post('/send-otp', payload);
      console.log('response data ', response.data);

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
