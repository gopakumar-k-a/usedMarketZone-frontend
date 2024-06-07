import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userOtpSignUp } from "./otpThunk";
import { User } from "../../../../../types/login";
import { resData } from "./otpThunk";

export interface OtpState {
  userData: User | null;
  isLoading: boolean;
  error: string | null;
  otpStatus: boolean
}

const initialState: OtpState = {
  userData: null,
  isLoading: false,
  error: null,
  otpStatus: false
};

const otpSlice = createSlice({
  name: "otpSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userOtpSignUp.pending, (state: OtpState) => {
        state.isLoading = true;
        state.otpStatus = false
        state.error = null; 
      })
      .addCase(userOtpSignUp.fulfilled, (state: OtpState, action: PayloadAction<resData>) => {
        state.isLoading = false;
        state.userData = action.payload.userData;
        state.otpStatus = true
       
      })
      .addCase(userOtpSignUp.rejected, (state: OtpState, action) => {
        state.isLoading = false;
        if (action.payload) {
          // Accessing error message from the payload
          state.error = action.payload.message;
        } else {
          state.error = action.error.message || "Unknown error occurred";
        }
      });
  },
});

export default otpSlice.reducer;
