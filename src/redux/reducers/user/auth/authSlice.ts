import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../../types/login";
// import { User } from "../../../../../types/login";
// import { logInThunk, LoginResponse } from "./logInThunk";

interface InitialState {
    isAuthenticated: boolean,
    user: string | null,
    token: string | null,
    role:string | null
}

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const role=localStorage.getItem('role')

const initialState: InitialState = {
    isAuthenticated: !!token, 
    user: user || null,
    token: token || null,
    role:role || null

}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token,role } = action.payload
            state.user = user
            localStorage.setItem('user', JSON.stringify(user))
            state.token = token
            localStorage.setItem('token', JSON.stringify(token))
            state.role=role
            localStorage.setItem('role', JSON.stringify(role))
            state.isAuthenticated = true

        },
        logOut: (state) => {
            state.isAuthenticated = false
            state.user = null
            state.token = null
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }

    },
});

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer;


