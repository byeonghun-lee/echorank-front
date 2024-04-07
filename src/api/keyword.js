import client from "./client";

export const create = (keyword) => client.post("/keywords", { keyword });
export const getList = () => client.get("/keywords");
