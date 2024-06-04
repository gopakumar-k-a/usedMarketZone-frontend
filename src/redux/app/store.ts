import { configureStore } from "@reduxjs/toolkit";

import otpReducer from '../reducers/user/auth/otpSlice/otpSlice'
import loginReducer from '../reducers/user/auth/userSlice/logInSlice'
import flowReducer from '../reducers/user/auth/otpPageFlow/flowSlice'
export const store=configureStore({
    reducer:{
        getOtp:otpReducer,
        auth:loginReducer,
        flow:flowReducer
    }
})

export type StoreType = ReturnType<typeof store.getState>;

export type AppStore=typeof store

export type RootState=ReturnType<AppStore['getState']>

export type AppDispatch=AppStore['dispatch']
