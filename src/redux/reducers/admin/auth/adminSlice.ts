import { createSlice } from "@reduxjs/toolkit";
// import { User } from "../../../../../types/login";
// import { User } from "../../../../../types/login";
// import { logInThunk, LoginResponse } from "./logInThunk";

interface InitialState {
    isAuthenticated: boolean,
    admin: string | null,
    adminAccessToken: string | null,
}

const adminAccessToken = localStorage.getItem('adminAccessToken');
const admin = localStorage.getItem('admin');
// const role=localStorage.getItem('role')

const initialState: InitialState = {
    isAuthenticated: !!adminAccessToken, 
    admin: admin || null,
    adminAccessToken: adminAccessToken || null,
    // role:role || null

}

const AdminSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        setCredentialsAdmin: (state, action) => {
            const { admin, token } = action.payload
            state.admin = admin
            localStorage.setItem('admin', admin)
            state.adminAccessToken = token
            localStorage.setItem('adminAccessToken', token)
            // state.role=role
            // localStorage.setItem('role', role)
            state.isAuthenticated = true

        },
        logOutAdmin: (state) => {
            state.isAuthenticated = false
            state.admin = null
            state.adminAccessToken = null
            localStorage.removeItem('admin');
            localStorage.removeItem('adminAccessToken');
        }

    },
});

export const { setCredentialsAdmin, logOutAdmin } = AdminSlice.actions

export default AdminSlice.reducer;


