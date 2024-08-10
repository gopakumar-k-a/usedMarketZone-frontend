import { NormalBackendRes } from "./login";

export interface WalletHistory {
  productId: string;
  bidId: string;
  amount: number;
  type: "debit" | "credit";
}
export interface WalletHistoryItem {
  productId: {
    _id: string;
    productName: string;
  } | null;
  bidId: {
    _id: string;
  } | null;
  type: "debit" | "credit";
  amount: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Wallet {
  userId: string;
  walletBalance: number;
  walletHistory: WalletHistoryItem[];
}

export interface GetWalletRes extends NormalBackendRes {
  wallet: Wallet;
}

