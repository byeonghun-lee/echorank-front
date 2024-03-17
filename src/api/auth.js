import client from "./client";

export const login = ({ email, password }) =>
    client.post("/auth/login", { email, password });

export const checkLogin = () => client.get("/auth/check");

export const signup = (signupData) => client.post("/auth/register", signupData);

export const verifyEmail = (email) =>
    client.post("/auth/verify-email", { email, isFolica: true });

export const checkVerificationCode = ({ email, code }) =>
    client.post("/auth/verification-code", { email, code });

export const checkNickname = (nickname) =>
    client.get(`/auth/nickname?value=${nickname}`);
