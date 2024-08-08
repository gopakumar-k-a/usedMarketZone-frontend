import { NormalBackendRes } from "./login";

export interface WalletHistory {
  productId: string;
  bidId: string;
  amount: number;
  type: "debit" | "credit";
}
export interface Wallet {
  userId: string;
  walletBalance: number;
  walletHistory: WalletHistory[];
}


export interface GetWalletRes extends NormalBackendRes{
    wallet:Wallet
}