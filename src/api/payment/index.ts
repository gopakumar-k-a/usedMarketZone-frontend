import { AxiosResponse } from "axios";
import { axiosUserInstance } from "../axiosInstance/axiosUserInstance.ts";

import { END_POINTS } from "@/constants/endPoints.ts";
import { CapturePaymentRes, CreatePaymentOrderResponse } from "@/types/razorpay.ts";

export const createPaymentOrder = async (payload: any) => {
  const response: AxiosResponse<CreatePaymentOrderResponse> =
    await axiosUserInstance.post(END_POINTS.CREATE_PAYMENT_ORDER, payload);

  return response.data;
};

export const capturePayment = async (payload: any) => {
  const response:AxiosResponse<CapturePaymentRes> = await axiosUserInstance.post(
    END_POINTS.CAPTURE_PAYMENT,
    payload
  );

  return response.data;
};
