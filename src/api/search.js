import client from "./client";

export const search = (keyword) =>
    client.get("/search/sns-profiles", { params: { keyword } });

export const getHistory = () => client.get("/search/sns-profiles/histories");