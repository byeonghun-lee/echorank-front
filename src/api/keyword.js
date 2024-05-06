import client from "./client";

export const create = (keywords) => client.post("/keywords", { keywords });
export const getList = () => client.get("/keywords");
export const getScraingDetailImage = ({ uuid, date }) =>
    client.get(`/keywords/relations/${uuid}/image`, { params: { date } });
