import { axiosRefreshInstance } from "../axiosInstance/axiosUserInstance.ts";
import { END_POINTS } from "../../constants/endPoints.ts";
import { User, UserLogin } from "../../types/login.ts";

import {
  SendOtpResponseSignUp,
  VerifyOtpSignUp,
  UserLoginResponse,
  verifyOtpSuccess,
} from "../../types/login.ts";

export const userOtpSignUp = async (
  payload: User
): Promise<SendOtpResponseSignUp> => {
  console.log("inside userOtpSignUp");

  const response = await axiosRefreshInstance.post<SendOtpResponseSignUp>(
    END_POINTS.SEND_OTP_SIGNUP,
    payload
  );

  console.log("response.data", response.data);

  localStorage.setItem("userData", JSON.stringify(response.data.userData));
  return response.data;
};

export const verifyOtpsignUp = async (payload: VerifyOtpSignUp) => {
  console.log("payload ", payload);

  const response = await axiosRefreshInstance.post<verifyOtpSuccess>(
    END_POINTS.VERFY_OTP_SIGNUP,
    payload
  );

  console.log("response.data", response.data);

  return response.data;
};

export const userLoginAuthenticate = async (payload: UserLogin) => {
  console.log("user log in ", payload);

  const response = await axiosRefreshInstance.post<UserLoginResponse>(
    END_POINTS.USER_LOG_IN,
    payload
  );

  console.log("response user login ", response.data);

  return response.data;
};

export const googleAuthenticate = async (payload) => {
  console.log("payload fireBaseAuthenticate", payload);

  const response = await axiosRefreshInstance.post<UserLoginResponse>(
    END_POINTS.GOOGLE_LOG_IN,
    payload
  );

  console.log(" googleAuthenticate api response is ", response.data);

  return response.data;
};
