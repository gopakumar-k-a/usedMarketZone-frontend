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

export type UserProfileMyBids = {
  isAdminAccepted: boolean;
  _id: string;
  productName: string;
  basePrice: number;
  productImageUrls: string[];
  category: string;
  subCategory: string;
};

export interface UserProfileBidRes extends NormalBackendRes {
  userBids: UserProfileMyBids[];
}

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
  highestBidAmount: number;
  isBidAmountPaid: boolean;
  claimedUserId: string;
}

export interface UserParticipatingRes extends NormalBackendRes {
  userParticipatingBids: UserParticipatingBid[];
}
