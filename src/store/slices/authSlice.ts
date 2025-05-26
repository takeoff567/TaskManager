import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse, AuthState } from "../../types";


const initialState: AuthState = {
    isLoggedIn: false
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setupLoginUser: (state, action: PayloadAction<AuthResponse>) => {
            state.isLoggedIn = true;
            state.loggedInUserInfo = action.payload;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.loggedInUserInfo = undefined;
        }
    }
})

export const {setupLoginUser, logoutUser} = authSlice.actions;
export default authSlice.reducer;