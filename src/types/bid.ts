import { NormalBackendRes } from "./login";

export interface BidHistoryOnProduct {
  _id: string;
  bidAmount: number;
  bidTime: string;
}

export interface BidHistoryResponse extends NormalBackendRes {
  bidHistory: BidHistoryOnProduct[];
}

export interface IBid {
  bidAmount: number;
  bidTime: string;
}

// Define the interface for the aggregated bid history data
export interface IBidHistoryAdmin {
  _id: string;
  bidderName: string;
  bids: IBid[];
  totalBidAmount: number;
  lastBidDate: string;
  bidderId: string;
}

export interface GetBidHistoryOfProductRes extends NormalBackendRes {
  bidHistory: IBidHistoryAdmin[];
}
export type ProductStatus =
  | "processing"
  | "not_shipped"
  | "shipped_to_admin"
  | "received_by_admin"
  | "shipped_to_buyer"
  | "Delivered";

export type UserProfileMyBids = {
  isAdminAccepted: boolean;
  _id: string;
  productName: string;
  basePrice: number;
  productImageUrls: string[];
  category: string;
  subCategory: string;
  bidEndTime: string;
  productStatus: ProductStatus;
};

export interface UserProfileBidRes extends NormalBackendRes {
  userBids: UserProfileMyBids[];
}

export interface ClaimerAddress {
  country: String;
  state: String;
  district: String;
  city: String;
  postalCode: String;
  phone: string;
}

export interface OwnerData {
  imageUrl: string;
  userName: string;
  _id: string;
  firstName: string;
  lastName: string;
}
export type ShipmentStatus =
  | "not_shipped"
  | "shipped_to_admin"
  | "received_by_admin"
  | "shipped_to_buyer"
  | "delivered";

export interface UserParticipatingBid {
  _id: string;
  totalBidAmount: number;
  productId: string;
  userId: string;
  productName: string;
  productBasePrice: number;
  productImageUrls: string[];
  isMyHighestBid: boolean;
  isBidEnded: boolean;
  // isAmountPaid: boolean;
  description: string;
  highestBidAmount: number;
  isBidAmountPaid: boolean;
  claimedUserId: string;
  isClaimerAddressAdded: boolean;
  bidId: string;
  claimerAddress: ClaimerAddress;
  ownerData: OwnerData;
  transactionData: {
    shipmentStatus: ShipmentStatus;
  };
}

export interface UserParticipatingRes extends NormalBackendRes {
  userParticipatingBids: UserParticipatingBid[];
}

export interface ClaimBidRes extends NormalBackendRes {
  bidData: UserParticipatingBid;
}

export interface AddClaimerAddressRes extends NormalBackendRes {
  newAddress: ClaimerAddress;
}
