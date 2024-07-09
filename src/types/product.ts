interface ProductInterface {
  _id?: string;
  productName?: string;
  basePrice: string;
  userId?: string;
  productImageUrls?: string[];
  category?: string;
  subCategory?: string;
  phone?: number;
  description?: string;
  createdAt?: Date;
  productCondition?: string;
  productAge?: string;
  address?: string;
  bookmarkedUsers?: string[];
  bookmarkedCount?: number;
  isBlocked?: boolean;
  isSold?: boolean;
  isOtpVerified?: boolean;
  postStatus?: "draft" | "active" | "deactivated";
  isBidding?: boolean;
  updatedAt?: Date;

  userDetails?: {
    imageUrl?: string;
    userName: string;
  };
  isBookmarked?: boolean;

  bidEndTime: string;
  bidAcceptedTime?: string;
  currentHighestBid:string;
}
export default ProductInterface;

export interface BidDuration {
  day: number;
  hour: number;
  minute: number;
}
