import { createSlice } from "@reduxjs/toolkit";

const authState = {
    info: null,
    isAuthenticated: false,
    loginError: null,
    // needLogin: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: authState,
    reducers: {
        login() {},
        loginSuccess(state, action) {
            const { nickname } = action.payload;
            state.isAuthenticated = true;
            state.info = { nickname };
        },
        loginFail(state, action) {
            const error = action.payload;
            state.isAuthenticated = false;
            state.loginError = error;
        },
        checkLogin() {},
        checkLoginFail(state, action) {
            state.isAuthenticated = false;
        },
    },
});

export const { login, loginSuccess, loginFail, checkLogin, checkLoginFail } =
    authSlice.actions;

export const authReducer = authSlice.reducer;
