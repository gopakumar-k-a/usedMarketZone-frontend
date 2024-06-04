import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../../../types/login";
import { logInThunk, LoginResponse } from "./logInThunk";

interface InitialState {
    isLoggedIn: boolean,
    user: User | null,
    token: string | null,
    error: string | null
}

const initialState: InitialState = {
    isLoggedIn: false,
    user: null,
    token: null,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logInThunk.pending, (state) => {
                state.error = null; 
            })
            .addCase(logInThunk.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.isLoggedIn = true;
                state.user = action.payload.user || null; 
                state.token = action.payload.token || null; 
            })
            .addCase(logInThunk.rejected, (state, action) => {
                state.error = action.payload ? action.payload.message : action.error.message || 'Unknown error';
            });
    },
});

export default userSlice.reducer;
