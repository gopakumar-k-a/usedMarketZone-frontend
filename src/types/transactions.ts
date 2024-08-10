import { NormalBackendRes } from "./login";

export interface TrackingNumbers {
  shippedToAdminTrackingNumber: string | null;
  shippedToBuyerTrackingNumber: string | null;
}

export interface ITransaction {
  _id: string;
  fromUserId: string;
  toUserId: string | null;
  amount: number;
  status: "captured" | "failed" | "escrow" | "released";
  transactionType: "debit" | "credit";
  createdAt: string;
  updatedAt: string;
  productId: string;
  bidId: string;
  shipmentStatus:
    | "not_shipped"
    | "shipped_to_admin"
    | "received_by_admin"
    | "shipped_to_buyer"
    | "delivered";
  trackingNumbers: TrackingNumbers;
}

export interface RecentTransactions {
  _id: string;
  fromUserId: string;
  amount: number;
  productId: string;
  createdAt: string;
  fromUserName:string;
}
export interface DashboardTransactionStatisticsRes extends NormalBackendRes {
  transactions: ITransaction[];
  lastTransactions: RecentTransactions[];
}

export interface TransactionCount {
  captured: number;
  failed: number;
  escrow: number;
  released: number;
}

export interface ShipmentCount {
  not_shipped: number;
  shipped_to_admin: number;
  received_by_admin: number;
  shipped_to_buyer: number;
  delivered: number;
}
