// razorpay.d.ts
import { Transaction } from "./admin/transaction";
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
  transactionData: Transaction;
}

export interface PaymentHistoryUser {
  _id: string;
  amount: number;
  productId: string;
  createdAt: string;
}

export interface PaymentHistoryRes extends NormalBackendRes {
  transactionHistory: PaymentHistoryUser[];
}
