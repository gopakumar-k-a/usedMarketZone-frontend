import { NormalBackendRes } from "./login";

export interface UserNameCheckRes extends NormalBackendRes {
  userAvailablity: boolean;
}

export interface MyKycData {
  _id: string;
  name: string;
  userId: string;
  dob: string;
  idType: string;
  idNumber: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  status: "pending" | "accepted" | "rejected";
  isAdminAccepted: boolean;
}

export interface MyKycDataRes extends NormalBackendRes {
  kycData: MyKycData;
}

export interface KycDataWithUserData extends MyKycData {
  userDetails: {
    firstName: string;
    lastName: string;
    imageUrl: string;
    userName: string;
  };
}
export interface KycDataAdmin extends NormalBackendRes {
  kycData: KycDataWithUserData[];
}

export interface KycAdminUpdatedData extends NormalBackendRes {
  kycData: KycDataWithUserData;
}
