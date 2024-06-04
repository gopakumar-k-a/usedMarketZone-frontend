import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import authAxios from "../../../../api/authApi";
import { User } from "../../../../../types/login";
import { MyError } from "../../../../../types/myError";

export interface LoginResponse {
    status: boolean,
    message: string,
    token?: string,
    user?: User
}

export const logInThunk = createAsyncThunk<LoginResponse, User, { rejectValue: MyError }>(
    'api/login',
    async (payload: User, thunkApi) => {
        try {
            const response = await authAxios.post<LoginResponse>('/login', payload);
            return response.data;
        } catch (err) {
            let errorMsg = "Something went wrong";
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError<MyError>;
                if (axiosError.response && axiosError.response.data) {
                    errorMsg = axiosError.response.data.message;

                }

            }

            return thunkApi.rejectWithValue({ message: errorMsg, status: false });
        }
    }
);
