// razorpay.d.ts
import { NormalBackendRes } from "./login";
export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: {
    fromUserId: string;
    toUserId: string;
  };
  created_at: number;
}

export interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface CreatePaymentOrderResponse extends NormalBackendRes {
  order: RazorpayOrder;
}

export interface CapturePaymentRes extends NormalBackendRes {
    captureStatus: "captured" | "failed";
}
