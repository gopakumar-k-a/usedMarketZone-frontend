import { NormalBackendRes } from "../login";
import { BidDuration } from "../product";

export interface BidRequest {
    _id: string; 
    bidderId: string; 
    bidProductId: string; 
    createdAt: string;
    updatedAt: string;
    productData: {
      _id: string;
      productName: string;
      basePrice: number;
      productImageUrls: string[]; 
      category: string; 
      bidDuration: BidDuration;
      subCategory: string; 
      isAdminAccepted: boolean;
      bidEndTime: string;
    };
    userData: {
      firstName: string;
      lastName: string;
      email: string;
      userName: string;
    };
  };

  export interface BidRequestResponse extends NormalBackendRes{
    bidRequests:BidRequest[]
  }
  