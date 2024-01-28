import client from "./client";

export const login = ({ email, password }) =>
    client.post("/auth/login", { email, password });

export const checkLogin = () => client.get("/auth/check");