import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../../../types/login";
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

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token,role } = action.payload
            state.user = user
            localStorage.setItem('user', user)
            state.token = token
            localStorage.setItem('token', token)
            state.role=role
            localStorage.setItem('role', role)
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

export const { setCredentials, logOut } = userSlice.actions

export default userSlice.reducer;


