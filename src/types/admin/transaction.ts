import { NormalBackendRes } from "../login";
import ProductInterface from "../product";

interface Address {
  country: string;
  state: string;
  district: string;
  city: string;
  postalCode: string;
  phone: string;
}

interface TrackingNumbers {
  shippedToAdminTrackingNumber: string | null;
  shippedToBuyerTrackingNumber: string | null;
}

export interface Transaction {
  bidId: string;
  productId: string;
  ownerId: string;
  claimerAddress: Address;
  transactionStatus: string;
  shipmentStatus: string;
  trackingNumbers: TrackingNumbers;
  wonPrice: number;
  bidWinnerId: string;
  baseBidPrice:number;
  transactionId:string;
  productData:ProductInterface;
}



export interface TransactionRes extends NormalBackendRes {
  transactions: Transaction[];
}

export interface TransactionStatusChangeRes extends NormalBackendRes{
  updatedTransaction:Transaction
}
