import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types/login";


interface InitialState {
  isAuthenticated: boolean;
  user: User | null; // Adjust the type according to your actual User type
  accessToken: string | null;
  role: string | null;
}

const accessToken = localStorage.getItem("accessToken") || null;
const userString = localStorage.getItem("user") || null;
const role = localStorage.getItem("role") || null;

const initialState: InitialState = {
  isAuthenticated: !!accessToken,
  user: userString ? JSON.parse(userString) : null, // Parse the user string
  accessToken: accessToken || null,
  role: role || null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken: string; role: string }>
    ) => {
      const { user, accessToken, role } = action.payload;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      state.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);
      state.role = role;
      localStorage.setItem("role", role);
      state.isAuthenticated = true;
    },
    updateUserCredentials: (state, action) => {
      const updatedUser = action.payload;
      state.user = updatedUser;
      localStorage.setItem("user", JSON.stringify(updatedUser));
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.role = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
    },

    
  },
});

export const { setCredentials, updateUserCredentials, logOut } =
  authSlice.actions;

export default authSlice.reducer;
