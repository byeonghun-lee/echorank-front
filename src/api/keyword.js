import client from "./client";

export const create = (keyword) => client.post("/keywords", { keyword });
export const getList = () => client.get("/keywords");
export const getScraingDetailImage = ({ uuid, date }) =>
    client.get(`/keywords/relations/${uuid}/image`, { params: { date } });
