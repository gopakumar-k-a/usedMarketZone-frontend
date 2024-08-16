import {
  axiosRefreshInstance,
  axiosUserInstance,
} from "../axiosInstance/axiosUserInstance.ts";
import { END_POINTS } from "../../constants/endPoints.ts";
import { RefreshAccessToken, User, UserLogin } from "../../types/login.ts";

import {
  SendOtpResponseSignUp,
  VerifyOtpSignUp,
  UserLoginResponse,
  verifyOtpSuccess,
} from "../../types/login.ts";
import { AxiosResponse } from "axios";

export const userOtpSignUp = async (
  payload: User
): Promise<SendOtpResponseSignUp> => {

  const response = await axiosRefreshInstance.post<SendOtpResponseSignUp>(
    END_POINTS.SEND_OTP_SIGNUP,
    payload
  );


  return response.data;
};

export const resendOtpSignUp = async (payload) => {
  const response = await axiosRefreshInstance.post(
    END_POINTS.RESEND_OTP,
    payload
  );

  return response;
};

export const verifyOtpsignUp = async (payload: VerifyOtpSignUp) => {

  const response = await axiosRefreshInstance.post<verifyOtpSuccess>(
    END_POINTS.VERFY_OTP_SIGNUP,
    payload
  );


  return response.data;
};

export const userLoginAuthenticate = async (payload: UserLogin) => {

  const response = await axiosRefreshInstance.post<UserLoginResponse>(
    END_POINTS.USER_LOG_IN,
    payload
  );


  return response.data;
};

export const refreshAccessToken = async () => {
  const response: AxiosResponse<RefreshAccessToken> =
    await axiosUserInstance.get(END_POINTS.REFRESH_ACCESS_TOKEN);
  return response.data;
};

export const googleAuthenticate = async (payload) => {

  const response = await axiosRefreshInstance.post<UserLoginResponse>(
    END_POINTS.GOOGLE_LOG_IN,
    payload
  );

  console.log(" googleAuthenticate api response is ", response.data);

  return response.data;
};

export const verifyOtpForgotPassword = async (payload) => {
  const response = await axiosRefreshInstance.post(
    END_POINTS.VERIFY_OTP_FORGOT_PASS,
    payload
  );

  console.log("payload ", payload);

  console.log("response in verifyOTp forgo password ", response.data);

  return response.data;
};

export const forgotPassword = async (payload) => {
  const response = await axiosRefreshInstance.post(
    END_POINTS.FORGOT_PASSWORD,
    payload
  );

  console.log("payload ", payload);

  console.log("response in verifyOTp forgo password ", response.data);

  return response.data;
};

export const submitNewPass = async (payload) => {
  const response = await axiosRefreshInstance.post(
    END_POINTS.RESET_PASSWORD,
    payload
  );

  console.log("payload ", response.data);

  return response.data;
};
