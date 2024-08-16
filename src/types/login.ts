export interface NormalBackendRes {
  status: boolean;
  message: string;
  success: boolean;
  totalDocuments: number;
  currentPage: number;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  confirmPassword?: string;
  imageUrl?: string;
  bio?: string;
  followers: string[];
  following: string[];
  numOfFollowing: number;
  numOfFollowers: number;
  isActive:boolean;
  updatedAt:string;
  createdAt:string;
}

export interface SendOtpResponseSignUp {
  status: string;
  message: string;
  userData: User;
}

export interface UserLogin {
  email: string;
  password: string;
  message?: string;
}

export interface ForgotPassword {
  email: string;
}

export interface UserLoginResponse extends NormalBackendRes {
  token: string;
  user: User;
  role: string;
  accessToken: string;
  
}

export interface RefreshAccessToken extends NormalBackendRes {
  accessToken: string;
}

export interface ForgotPasswordResponse extends NormalBackendRes {
  otpToken: string;
  email: string;
}
export interface VerifyOtpSignUp {
  userData: User;
  otp: number | string;
}

export interface verifyOtpSuccess extends NormalBackendRes {
  email: string;
}
