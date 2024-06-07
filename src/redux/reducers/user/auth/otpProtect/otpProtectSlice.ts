
import { createSlice } from '@reduxjs/toolkit';

const otpProtect = createSlice({
  name: 'auth',
  initialState: {
    isAuthorized: false,
  },
  reducers: {
    authorizeUserOtpPage: (state) => {
      state.isAuthorized = true;
    },
    deauthorizeUserOtpPage: (state) => {
      state.isAuthorized = false;
    },
  },
});

export const { authorizeUserOtpPage, deauthorizeUserOtpPage } = otpProtect.actions;

export default otpProtect.reducer;
