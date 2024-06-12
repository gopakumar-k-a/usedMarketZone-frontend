import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../../types/login";

interface InitialState {
    isAuthenticated: boolean,
    user: User | null, // Adjust the type according to your actual User type
    token: string | null,
    role: string | null
}

const token = localStorage.getItem('token') || null;
const userString = localStorage.getItem('user') || null;
const role = localStorage.getItem('role') || null;


const initialState: InitialState = {
    isAuthenticated: !!token,
    user: userString ? JSON.parse(userString) : null, // Parse the user string
    token: token || null,
    role: role || null
};

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User, token: string, role: string }>) => {
            const { user, token, role } = action.payload;
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            state.token = token;
            localStorage.setItem('token', token);
            state.role = role;
            localStorage.setItem('role', role);
            state.isAuthenticated = true;
        },
        updateUserCredentials:(state,action)=>{
            const updatedUser=action.payload
            state.user = updatedUser;
            localStorage.setItem('user', JSON.stringify(updatedUser));
        },
        logOut: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.role = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        }
    },
});

export const { setCredentials,updateUserCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
