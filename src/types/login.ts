


export interface NormalBackendRes {
    status: string,
    message: string
}

export interface User {
    _id?: string,
    firstName: string,
    lastName: string,
    userName:string,
    email: string,
    phone: string,
    role:string,
    password: string,
    confirmPassword?: string,
    imageUrl?:string,

}

export interface SendOtpResponseSignUp {
    status: string,
    message: string,
    userData: User,

}


export interface UserLogin {
    email: string;
    password: string;
    message?:string
}

export interface UserLoginResponse extends NormalBackendRes {
    token: string;
    user:User;
    role:string
}
export interface VerifyOtpSignUp {
    userData: User,
    otp: number | string
}

export interface verifyOtpSuccess extends NormalBackendRes {
    email: string
}