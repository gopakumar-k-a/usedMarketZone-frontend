import { configureStore } from "@reduxjs/toolkit";

import otpReducer from '../reducers/user/auth/otpSlice/otpSlice'
import loginReducer from '../reducers/user/auth/userSlice/logInSlice'
// import flowReducer from '../reducers/user/auth/otpPageFlow/flowSlice'
import otpProtectReducer from '../reducers/user/auth/otpProtect/otpProtectSlice'
import adminReducer from '../reducers/admin/auth/adminSlice'
export const store=configureStore({
    reducer:{
        getOtp:otpReducer,
        auth:loginReducer,
        adminAuth:adminReducer,
        protectOtp:otpProtectReducer
    }
})

export type StoreType = ReturnType<typeof store.getState>;

export type AppStore=typeof store

export type RootState=ReturnType<AppStore['getState']>

export type AppDispatch=AppStore['dispatch']
