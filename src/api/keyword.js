import client from "./client";

export const create = (keywords) => client.post("/keywords", { keywords });
export const getList = () => client.get("/keywords");
export const getKeywordDetail = (uuid) =>
    client.get(`/keywords/relations/${uuid}`);
export const getScraingDetailImage = ({ uuid, date }) =>
    client.get(`/keywords/relations/${uuid}/image`, { params: { date } });
export const updateKeywordBlogList = ({ uuid, blogList }) =>
    client.patch(`/keywords/relations/${uuid}/blog-list`, { blogList });
export const deleteKeyword = (uuid) =>
    client.delete(`/keywords/relations/${uuid}`);
